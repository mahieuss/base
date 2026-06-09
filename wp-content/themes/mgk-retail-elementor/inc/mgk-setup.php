<?php
/**
 * Theme setup: supports, menus, WooCommerce, Elementor CPT support.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'align-wide' );

	// WooCommerce + product gallery zoom/lightbox/slider.
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'mgk-retail' ),
		'footer'  => __( 'Footer Menu', 'mgk-retail' ),
	) );
}, 11 );

/**
 * GOTCHA (playbook §2.1): Elementor only opens the editor for post types listed
 * in the `elementor_cpt_support` option. Make sure 'page' + our CPTs are in it.
 */
add_action( 'init', function () {
	$support = get_option( 'elementor_cpt_support' );
	if ( ! is_array( $support ) ) {
		$support = array( 'page', 'post' );
	}
	$needed = array( 'page', 'post', 'mg_store' );
	$merged = array_values( array_unique( array_merge( $support, $needed ) ) );
	if ( $merged !== $support ) {
		update_option( 'elementor_cpt_support', $merged );
	}
}, 20 );

/**
 * Constants used across the theme.
 */
if ( ! defined( 'MGK_RETAIL_DIR' ) ) {
	define( 'MGK_RETAIL_DIR', get_stylesheet_directory() );
	define( 'MGK_RETAIL_URI', get_stylesheet_directory_uri() );
	define( 'MGK_RETAIL_VER', '0.1.0' );
}
