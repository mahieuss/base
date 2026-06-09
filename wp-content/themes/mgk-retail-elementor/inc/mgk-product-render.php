<?php
/**
 * Product rendering: shared quick-view AJAX (used from S01 cards) + PDP shells (S03).
 * Quick-view is presentation of WooCommerce data — never editable.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/** AJAX: render a product quick-view card. */
function mgk_ajax_quickview() {
	$id = isset( $_GET['id'] ) ? absint( $_GET['id'] ) : 0;
	$product = $id ? wc_get_product( $id ) : null;
	if ( ! $product ) { wp_die( '', '', array( 'response' => 404 ) ); }
	mgk_render_part( 'product/quickview', array( 'product' => $product ), true );
	wp_die();
}
add_action( 'wp_ajax_mgk_quickview', 'mgk_ajax_quickview' );
add_action( 'wp_ajax_nopriv_mgk_quickview', 'mgk_ajax_quickview' );

/* ---- S03 PDP shells (presentation around WooCommerce data) ---- */

/** Edition swatches (presentation). Reads _mgk_editions; never changes data. */
function mgk_render_pdp_swatches( $product ) {
	$json     = get_post_meta( $product->get_id(), '_mgk_editions', true );
	$editions = $json ? json_decode( $json, true ) : array();
	if ( empty( $editions ) || ! is_array( $editions ) ) { return; }
	mgk_render_part( 'product/swatches', array( 'editions' => $editions ), true );
}

/** Next-day delivery countdown box (cutoff from inc/mgk-woo.php). */
function mgk_render_pdp_delivery() {
	$cutoff = function_exists( 'mgk_delivery_cutoff_ts' ) ? mgk_delivery_cutoff_ts() : 0;
	mgk_render_part( 'product/delivery-countdown', array( 'cutoff' => $cutoff ), true );
}

/** Specs table from _mgk_specs (DATA edited in wp-admin). */
function mgk_render_pdp_specs( $product ) {
	$json  = get_post_meta( $product->get_id(), '_mgk_specs', true );
	$specs = $json ? json_decode( $json, true ) : array();
	if ( empty( $specs ) || ! is_array( $specs ) ) { return; }
	mgk_render_part( 'product/specs-table', array( 'specs' => $specs ), true );
}
