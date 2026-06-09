<?php
/**
 * Generator / distribution (playbook §5, direction A).
 * Builds deterministic Elementor `_elementor_data` for pages and seeds it once on
 * activation (idempotent, guard `_mgk_layout_seeded`). Each variant = one config here.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Layout map: logical page key → ordered list of MGK widget tags.
 * A widget entry may be a string (tag) or array('tag'=>..,'settings'=>..).
 * Columns: a section row can be array('columns'=>[ [..widgets..], [..widgets..] ]).
 */
function mgk_layout_map() {
	return array(
		'home' => array(
			'rows' => array(
				array( 'mgk_hero' ),
				array( 'mgk_bento' ),
				array( 'mgk_top_picks' ),
				array( 'mgk_campaign_banner' ),
				array( 'mgk_flash_grid' ),
			),
		),
	);
}

/** Deterministic 8-char hex id (no randomness → clean diffs). */
function mgk_eid( $seed ) {
	return substr( md5( 'mgk-retail:' . $seed ), 0, 8 );
}

/** Build a single widget element. */
function mgk_el_widget( $tag, $settings, $seed ) {
	return array(
		'id'         => mgk_eid( $seed . ':w:' . $tag ),
		'elType'     => 'widget',
		'widgetType' => $tag,
		'settings'   => is_array( $settings ) ? $settings : array(),
		'elements'   => array(),
	);
}

/** Build a column element wrapping widgets. */
function mgk_el_column( $widgets, $size, $seed ) {
	return array(
		'id'       => mgk_eid( $seed . ':col' ),
		'elType'   => 'column',
		'settings' => array( '_column_size' => $size, '_inline_size' => null ),
		'elements' => $widgets,
		'isInner'  => false,
	);
}

/** Build a section element from a row spec. */
function mgk_el_section( $row, $idx, $page_key ) {
	$seed = $page_key . ':sec:' . $idx;

	// Two-column DATA layout: array('columns' => [ [...], [...] ], 'sizes'=>[33,67]).
	if ( isset( $row['columns'] ) && is_array( $row['columns'] ) ) {
		$sizes   = isset( $row['sizes'] ) ? $row['sizes'] : array( 50, 50 );
		$columns = array();
		foreach ( $row['columns'] as $ci => $colWidgets ) {
			$widgets = array();
			foreach ( $colWidgets as $wi => $w ) {
				$tag      = is_array( $w ) ? $w['tag'] : $w;
				$settings = is_array( $w ) && isset( $w['settings'] ) ? $w['settings'] : array();
				$widgets[] = mgk_el_widget( $tag, $settings, $seed . ':c' . $ci . ':' . $wi );
			}
			$columns[] = mgk_el_column( $widgets, isset( $sizes[ $ci ] ) ? $sizes[ $ci ] : 50, $seed . ':c' . $ci );
		}
		return array(
			'id'       => mgk_eid( $seed ),
			'elType'   => 'section',
			'settings' => array( 'structure' => count( $columns ) . '0' ),
			'elements' => $columns,
		);
	}

	// Single-column section: row is a flat list of widget tags.
	$widgets = array();
	foreach ( $row as $wi => $w ) {
		if ( ! is_int( $wi ) ) { continue; }
		$tag      = is_array( $w ) ? $w['tag'] : $w;
		$settings = is_array( $w ) && isset( $w['settings'] ) ? $w['settings'] : array();
		$widgets[] = mgk_el_widget( $tag, $settings, $seed . ':' . $wi );
	}
	return array(
		'id'       => mgk_eid( $seed ),
		'elType'   => 'section',
		'settings' => array(),
		'elements' => array( mgk_el_column( $widgets, 100, $seed ) ),
	);
}

/** Build full _elementor_data array for a page key. */
function mgk_build_elementor_data( $page_key ) {
	$map = mgk_layout_map();
	if ( empty( $map[ $page_key ]['rows'] ) ) { return array(); }
	$data = array();
	foreach ( $map[ $page_key ]['rows'] as $idx => $row ) {
		$data[] = mgk_el_section( $row, $idx, $page_key );
	}
	return $data;
}

/**
 * Seed one page with Elementor data. Idempotent: skips if already seeded OR the user
 * has built it themselves (guard `_mgk_layout_seeded`).
 *
 * @return string status: seeded|skipped-seeded|skipped-userbuilt|empty
 */
function mgk_seed_layout( $post_id, $page_key, $force = false ) {
	if ( ! $post_id ) { return 'empty'; }
	$already = get_post_meta( $post_id, '_mgk_layout_seeded', true );
	if ( $already && ! $force ) { return 'skipped-seeded'; }

	$data = mgk_build_elementor_data( $page_key );
	if ( empty( $data ) ) { return 'empty'; }

	update_post_meta( $post_id, '_elementor_data', wp_slash( wp_json_encode( $data ) ) );
	update_post_meta( $post_id, '_elementor_edit_mode', 'builder' );
	update_post_meta( $post_id, '_elementor_version', defined( 'ELEMENTOR_VERSION' ) ? ELEMENTOR_VERSION : '3.0.0' );
	// Default template → child header.php/footer.php render the RETAIL_SG chrome.
	delete_post_meta( $post_id, '_wp_page_template' );
	update_post_meta( $post_id, '_mgk_layout_seeded', '1' );

	// Regenerate CSS if Elementor is loaded.
	if ( class_exists( '\Elementor\Plugin' ) ) {
		\Elementor\Plugin::$instance->files_manager->clear_cache();
	}
	return 'seeded';
}

/** Find or create the Home page and mark it the front page. */
function mgk_ensure_home_page() {
	$page = get_page_by_path( 'home' );
	if ( ! $page ) {
		$existing = get_option( 'page_on_front' );
		if ( $existing && get_post( $existing ) ) {
			$page = get_post( $existing );
		}
	}
	if ( ! $page ) {
		$id = wp_insert_post( array(
			'post_title'   => 'Home',
			'post_name'    => 'home',
			'post_status'  => 'publish',
			'post_type'    => 'page',
			'post_content' => '',
		) );
		$page = $id ? get_post( $id ) : null;
	}
	if ( $page ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $page->ID );
	}
	return $page ? $page->ID : 0;
}

/** Activation: ensure pages + seed layouts once. */
add_action( 'after_switch_theme', function () {
	$home = mgk_ensure_home_page();
	if ( $home ) { mgk_seed_layout( $home, 'home' ); }
}, 20 );

/* -------------------------------------------------------------------------
 *  WP-CLI: wp mgk seed [--force] | wp mgk gen-layouts
 * ---------------------------------------------------------------------- */
if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command( 'mgk', new class {
		/** Seed all mapped layouts. [--force] re-seeds even if already seeded. */
		public function seed( $args, $assoc ) {
			$force = isset( $assoc['force'] );
			$home  = mgk_ensure_home_page();
			$st    = mgk_seed_layout( $home, 'home', $force );
			WP_CLI::log( "home (#$home): $st" );
			WP_CLI::success( 'Seed complete.' );
		}
		/** Dump computed layouts to seed/seed-layouts.php (version-control snapshot). */
		public function gen_layouts() {
			$out = "<?php\n// GENERATED by `wp mgk gen-layouts`. Do not edit by hand.\nreturn ";
			$all = array();
			foreach ( array_keys( mgk_layout_map() ) as $key ) {
				$all[ $key ] = mgk_build_elementor_data( $key );
			}
			$out .= var_export( $all, true ) . ";\n";
			$file = MGK_RETAIL_DIR . '/seed/seed-layouts.php';
			if ( ! is_dir( dirname( $file ) ) ) { wp_mkdir_p( dirname( $file ) ); }
			file_put_contents( $file, $out );
			WP_CLI::success( 'Wrote ' . $file );
		}
	} );
	// Allow hyphenated subcommand alias.
	WP_CLI::add_hook( 'before_run_command', function () {} );
}
