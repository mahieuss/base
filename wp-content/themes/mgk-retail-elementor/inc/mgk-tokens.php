<?php
/**
 * Asset enqueue (CSS tokens + components, JS behaviours).
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

add_action( 'wp_enqueue_scripts', function () {
	$ver = MGK_RETAIL_VER;
	$css = MGK_RETAIL_URI . '/assets/css/';
	$js  = MGK_RETAIL_URI . '/assets/js/';

	// Fonts: Inter + JetBrains Mono (spec).
	wp_enqueue_style( 'mgk-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap', array(), null );

	// Parent Hello Elementor stylesheet first, then ours.
	wp_enqueue_style( 'mgk-tokens', $css . 'mgk-tokens.css', array( 'mgk-fonts' ), $ver );
	wp_enqueue_style( 'mgk-retail', $css . 'mgk-retail.css', array( 'mgk-tokens' ), $ver );

	if ( class_exists( 'WooCommerce' ) ) {
		wp_enqueue_style( 'mgk-woo', $css . 'mgk-woo.css', array( 'mgk-retail' ), $ver );
	}

	wp_enqueue_script( 'mgk-retail', $js . 'mgk-retail.js', array(), $ver, true );
	wp_localize_script( 'mgk-retail', 'MGK_RETAIL', array(
		'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
		'nonce'    => wp_create_nonce( 'mgk_retail' ),
		'currency' => function_exists( 'get_woocommerce_currency_symbol' ) ? get_woocommerce_currency_symbol() : 'S$',
	) );
}, 20 );

/**
 * Enqueue front-end CSS inside the Elementor editor preview too, so the
 * server-rendered widgets look right while editing.
 */
add_action( 'elementor/preview/enqueue_styles', function () {
	$css = MGK_RETAIL_URI . '/assets/css/';
	wp_enqueue_style( 'mgk-tokens', $css . 'mgk-tokens.css', array(), MGK_RETAIL_VER );
	wp_enqueue_style( 'mgk-retail', $css . 'mgk-retail.css', array( 'mgk-tokens' ), MGK_RETAIL_VER );
	wp_enqueue_style( 'mgk-woo', $css . 'mgk-woo.css', array( 'mgk-retail' ), MGK_RETAIL_VER );
} );
