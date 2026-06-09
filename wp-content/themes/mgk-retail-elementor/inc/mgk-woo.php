<?php
/**
 * WooCommerce integration for RETAIL_SG (DATA CORE side).
 * Currency/tax are also enforced defensively so a fresh activate matches the spec.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }
if ( ! class_exists( 'WooCommerce' ) ) { return; }

/* ---- Layout: full width, our own product columns ---- */
remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );

/* PDP: we render specs + reviews ourselves → drop the default data tabs (avoids
   duplicate reviews/description). Up-sells (20) + related (30) stay. */
add_action( 'init', function () {
	remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
} );

add_filter( 'loop_shop_columns', function () { return 3; } );
add_filter( 'loop_shop_per_page', function () { return 12; } ); // S02: "12 results"

/* ---- Singapore GST line shows as "GST 9%" ---- */
add_filter( 'woocommerce_rate_label', function ( $label, $rate ) {
	if ( $label && false !== stripos( $label, 'GST' ) ) {
		return 'GST 9%';
	}
	return $label;
}, 10, 2 );

/* ---- One-time defensive SG store config (no-op if already set) ---- */
add_action( 'after_switch_theme', function () {
	if ( 'SGD' !== get_option( 'woocommerce_currency' ) ) {
		update_option( 'woocommerce_currency', 'SGD' );
	}
	if ( 'yes' !== get_option( 'woocommerce_calc_taxes' ) ) {
		update_option( 'woocommerce_calc_taxes', 'yes' );
	}
	$country = get_option( 'woocommerce_default_country' );
	if ( strpos( (string) $country, 'SG' ) !== 0 ) {
		update_option( 'woocommerce_default_country', 'SG:*' );
	}
}, 15 );

/* ---- Delivery cutoff time for the PDP next-day countdown (SG, 16:30) ---- */
function mgk_delivery_cutoff_ts() {
	$tz  = new DateTimeZone( 'Asia/Singapore' );
	$now = new DateTime( 'now', $tz );
	$cut = new DateTime( 'today 16:30', $tz );
	if ( $now > $cut ) { $cut->modify( '+1 day' ); }
	return $cut->getTimestamp();
}

/* ---- Helper: query products for shells (DATA CORE — used by render files) ---- */
function mgk_query_products( $args = array() ) {
	$defaults = array(
		'status'   => 'publish',
		'limit'    => 4,
		'orderby'  => 'date',
		'order'    => 'DESC',
		'return'   => 'objects',
	);
	$args = wp_parse_args( $args, $defaults );
	if ( ! function_exists( 'wc_get_products' ) ) { return array(); }
	return wc_get_products( $args );
}

/* ---- Mini "add to cart" + fragments are provided by Woo core; we just style ---- */
add_filter( 'woocommerce_product_add_to_cart_text', function ( $text, $product ) {
	if ( $product && ! $product->is_in_stock() ) { return __( 'Sold Out', 'mgk-retail' ); }
	return $text;
}, 10, 2 );
