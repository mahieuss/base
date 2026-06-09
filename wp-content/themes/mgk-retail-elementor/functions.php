<?php
/**
 * MGK Retail Elementor — child of Hello Elementor.
 * Load order matters: core helpers + render files (shortcodes) BEFORE the Elementor
 * widget engine, so do_shortcode() targets exist. Config (sections) before engine too.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

$mgk_inc = array(
	// 1. Foundation
	'inc/mgk-core.php',
	'inc/mgk-setup.php',
	'inc/mgk-tokens.php',
	'inc/mgk-cpts.php',
	'inc/mgk-woo.php',
	'inc/mgk-demo-data.php',

	// 2. Render files (register shortcodes that wrap partials) — BEFORE the engine
	'inc/mgk-home-render.php',
	'inc/mgk-search-render.php',
	'inc/mgk-product-render.php',
	'inc/mgk-cart-render.php',
	'inc/mgk-checkout-render.php',
	'inc/mgk-thankyou-render.php',
	'inc/mgk-paynow.php',

	// 3. Section config + widget engine + generator
	'inc/mgk-sections.php',
	'inc/mgk-elementor.php',
	'inc/mgk-generator.php',
);

foreach ( $mgk_inc as $rel ) {
	$path = get_stylesheet_directory() . '/' . $rel;
	if ( file_exists( $path ) ) { require_once $path; }
}

/** Enqueue parent + child stylesheet handle for Hello Elementor. */
add_action( 'wp_enqueue_scripts', function () {
	if ( ! wp_style_is( 'hello-elementor', 'enqueued' ) ) {
		wp_enqueue_style( 'hello-elementor', get_template_directory_uri() . '/style.css', array(), null );
	}
}, 5 );
