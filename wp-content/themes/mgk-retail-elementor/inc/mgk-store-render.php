<?php
/**
 * S10 Store Locator — registers [mgk_store_locator] shortcode.
 * DATA: CPT mgk_store when available; static Singapore demo fallback.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/** Build the store list (DATA). CPT first; static fallback for fresh installs. */
function mgk_get_stores() {
	$stores = array();

	if ( post_type_exists( 'mgk_store' ) ) {
		$posts = get_posts( array(
			'post_type'      => 'mgk_store',
			'posts_per_page' => 20,
			'post_status'    => 'publish',
		) );
		foreach ( $posts as $p ) {
			$stores[] = array(
				'name'   => $p->post_title,
				'mall'   => (string) get_post_meta( $p->ID, '_mgk_store_mall',   true ),
				'floor'  => (string) get_post_meta( $p->ID, '_mgk_store_floor',  true ),
				'phone'  => (string) get_post_meta( $p->ID, '_mgk_store_phone',  true ),
				'hours'  => (string) get_post_meta( $p->ID, '_mgk_store_hours',  true ),
				'region' => (string) get_post_meta( $p->ID, '_mgk_store_region', true ),
				'open'   => (bool)   get_post_meta( $p->ID, '_mgk_store_open',   true ),
			);
		}
	}

	if ( empty( $stores ) ) {
		$stores = array(
			array( 'name' => 'RETAIL_SG Orchard Flagship', 'mall' => 'ION Orchard',    'floor' => 'B1-01',   'phone' => '+65 6123 0001', 'hours' => '10:00 – 22:00', 'region' => 'Central', 'open' => true  ),
			array( 'name' => 'RETAIL_SG Bishan',           'mall' => 'Junction 8',     'floor' => '#03-01',  'phone' => '+65 6123 0005', 'hours' => '10:00 – 22:00', 'region' => 'Central', 'open' => true  ),
			array( 'name' => 'RETAIL_SG Tampines',         'mall' => 'Tampines Mall',  'floor' => '#03-22',  'phone' => '+65 6123 0002', 'hours' => '10:00 – 21:30', 'region' => 'East',    'open' => true  ),
			array( 'name' => 'RETAIL_SG Bedok',            'mall' => 'Bedok Mall',     'floor' => '#B1-42',  'phone' => '+65 6123 0006', 'hours' => '10:00 – 21:30', 'region' => 'East',    'open' => true  ),
			array( 'name' => 'RETAIL_SG Jurong',           'mall' => 'JEM',            'floor' => '#02-18',  'phone' => '+65 6123 0003', 'hours' => '10:00 – 21:30', 'region' => 'West',    'open' => true  ),
			array( 'name' => 'RETAIL_SG Woodlands',        'mall' => 'Causeway Point', 'floor' => '#01-09',  'phone' => '+65 6123 0004', 'hours' => '11:00 – 21:00', 'region' => 'North',   'open' => false ),
		);
	}

	return $stores;
}

add_shortcode( 'mgk_store_locator', function ( $atts ) {
	$a = shortcode_atts( array(
		'heading' => 'Find a Store Near You',
		'sub'     => 'Pick up your order or visit us in person.',
	), $atts, 'mgk_store_locator' );

	$stores = mgk_get_stores();

	return mgk_render_part( 'store/locator', array( 'a' => $a, 'stores' => $stores ), false );
} );
