<?php
/**
 * S01 Home — shortcodes that wrap partials (single HTML source).
 * Shell text comes from atts (Elementor) with sensible defaults; DATA (products)
 * is queried here and passed to the partial. Never editable in Elementor.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/** SEC1 — support / notification top bar. */
add_shortcode( 'mgk_topbar', function ( $atts ) {
	$a = shortcode_atts( array(
		'message'  => 'Free next-day delivery across Singapore on orders over S$60',
		'helpline' => 'Helpline: 1800 1234',
	), $atts, 'mgk_topbar' );
	return mgk_render_part( 'sections/topbar', array( 'a' => $a ), false );
} );

/** SEC2 — National Day hero (dark block). */
add_shortcode( 'mgk_hero', function ( $atts ) {
	$a = shortcode_atts( array(
		'badge'    => 'Seasonal Special',
		'heading'  => 'Singapore National Day Sale: Up to 58% Off',
		'sub'      => 'Celebrate our grand national milestone with premium catalog specials, tech bundles, and free delivery across Singapore. Limited time only.',
		'cta_text' => 'Shop the Collection',
		'cta_url'  => '',
	), $atts, 'mgk_hero' );
	if ( '' === $a['cta_url'] ) {
		$a['cta_url'] = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
	}
	return mgk_render_part( 'sections/hero', array( 'a' => $a ), false );
} );

/** SEC3 — New Arrivals bento (featured products = DATA). */
add_shortcode( 'mgk_bento', function ( $atts ) {
	$a = shortcode_atts( array(
		'heading' => 'New Arrivals For You',
	), $atts, 'mgk_bento' );
	$products = mgk_query_products( array( 'featured' => true, 'limit' => 2 ) );
	if ( count( $products ) < 2 ) { $products = mgk_query_products( array( 'limit' => 2 ) ); }
	return mgk_render_part( 'sections/bento', array( 'a' => $a, 'products' => $products ), false );
} );

/** SEC-extra — Mega campaign voucher banner (FIRST10). */
add_shortcode( 'mgk_campaign_banner', function ( $atts ) {
	$a = shortcode_atts( array(
		'tag'      => 'Mega Campaign Voucher',
		'expiry'   => 'Expires in 12h',
		'heading'  => 'Upgrade your tech ecosystem to the ultimate level today',
		'code'     => 'FIRST10',
		'sub'      => 'for an instant 10% discount on all orders from SGD 100.00. Next-day Orchard dispatch enabled.',
		'cta_text' => 'Shop Now',
		'cta_url'  => '',
	), $atts, 'mgk_campaign_banner' );
	if ( '' === $a['cta_url'] ) {
		$a['cta_url'] = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
	}
	return mgk_render_part( 'sections/campaign-banner', array( 'a' => $a ), false );
} );

/** SEC5 — Curated top picks (DATA: query, presentation: heading). */
add_shortcode( 'mgk_top_picks', function ( $atts ) {
	$a = shortcode_atts( array(
		'heading' => 'Top Products Carousel',
	), $atts, 'mgk_top_picks' );
	$products = mgk_query_products( array( 'limit' => 3, 'orderby' => 'popularity' ) );
	return mgk_render_part( 'sections/top-picks', array( 'a' => $a, 'products' => $products ), false );
} );

/** SEC6 — Flash sale grid (DATA: on-sale products). */
add_shortcode( 'mgk_flash_grid', function ( $atts ) {
	$a = shortcode_atts( array(
		'eyebrow' => 'Hurry — Limited Stock',
		'heading' => 'Active Flash Sale',
		'sub'     => 'New deals every hour.',
	), $atts, 'mgk_flash_grid' );
	$ids = function_exists( 'wc_get_product_ids_on_sale' ) ? wc_get_product_ids_on_sale() : array();
	$products = $ids ? mgk_query_products( array( 'include' => $ids, 'limit' => 4 ) ) : mgk_query_products( array( 'limit' => 4 ) );
	return mgk_render_part( 'sections/flash-grid', array( 'a' => $a, 'products' => $products ), false );
} );
