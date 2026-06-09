<?php
/**
 * Core shared helpers — the single HTML-source loader + small utilities.
 * Loaded BEFORE render files and the widget engine.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Render a template-part with args (the ONE place HTML comes from).
 * Mirrors the mgk-edu-elementor `mgk_render_part()` pattern.
 *
 * @param string $slug Relative path under template-parts/ without extension, e.g. 'sections/hero'.
 * @param array  $args Variables exposed to the partial as $args.
 * @param bool   $echo Echo (true) or return (false).
 * @return string
 */
function mgk_render_part( $slug, array $args = array(), $echo = true ) {
	$file = MGK_RETAIL_DIR . '/template-parts/' . ltrim( $slug, '/' ) . '.php';
	if ( ! file_exists( $file ) ) {
		if ( $echo ) { return ''; }
		return '';
	}
	if ( ! $echo ) { ob_start(); }
	// $args is available inside the partial.
	include $file;
	if ( ! $echo ) { return ob_get_clean(); }
	return '';
}

/**
 * Site setting with default fallback (keeps "looks like the original" before user edits).
 * Backed by theme_mods so it is presentation, never data.
 */
function mgk_site_setting( $key, $default = '' ) {
	$val = get_theme_mod( 'mgk_' . $key, null );
	return ( null === $val || '' === $val ) ? $default : $val;
}

/** Sanitize an attribute coming from an Elementor control (shell text only). */
function mgk_clean( $v ) {
	return is_string( $v ) ? wp_kses_post( $v ) : $v;
}

/** Render 5-star presentation markup from a float rating (DATA = read-only). */
function mgk_stars( $rating ) {
	$rating = max( 0, min( 5, (float) $rating ) );
	$full   = (int) round( $rating );
	$out    = '<span class="mgk-stars" aria-label="' . esc_attr( number_format( $rating, 1 ) ) . ' out of 5">';
	for ( $i = 1; $i <= 5; $i++ ) {
		$cls  = $i <= $full ? '' : ' mgk-star-empty';
		$out .= '<span class="mgk-star' . $cls . '" aria-hidden="true">&#9733;</span>';
	}
	$out .= '</span>';
	return $out;
}

/**
 * Format a price in the store currency (SGD). Falls back to wc_price when Woo present.
 *
 * @param float $amount
 * @return string
 */
function mgk_price( $amount ) {
	if ( function_exists( 'wc_price' ) ) {
		return wc_price( (float) $amount );
	}
	return 'S$' . number_format( (float) $amount, 2 );
}

/**
 * Builder-mode detector (playbook §1): is this post laid out by Elementor data?
 */
function mgk_is_built_with_elementor( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	if ( ! $post_id ) { return false; }
	if ( did_action( 'elementor/loaded' ) && class_exists( '\Elementor\Plugin' ) ) {
		$doc = \Elementor\Plugin::$instance->documents->get( $post_id );
		if ( $doc && $doc->is_built_with_elementor() ) { return true; }
	}
	return (bool) get_post_meta( $post_id, '_elementor_edit_mode', true );
}
