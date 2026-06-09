<?php
/**
 * S08 checkout glue. Forces the Cart/Checkout pages to the classic shortcodes so our
 * PHP template overrides (locked shell) take effect instead of the block UI.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }
if ( ! class_exists( 'WooCommerce' ) ) { return; }

add_action( 'after_switch_theme', function () {
	$map = array(
		(int) get_option( 'woocommerce_cart_page_id' )     => '[woocommerce_cart]',
		(int) get_option( 'woocommerce_checkout_page_id' ) => '[woocommerce_checkout]',
	);
	foreach ( $map as $page_id => $shortcode ) {
		if ( ! $page_id ) { continue; }
		$post = get_post( $page_id );
		if ( ! $post ) { continue; }
		if ( false === strpos( $post->post_content, $shortcode ) ) {
			wp_update_post( array( 'ID' => $page_id, 'post_content' => $shortcode ) );
		}
	}
}, 30 );

/** Default the checkout country to Singapore for a clean first render. */
add_filter( 'default_checkout_billing_country', function ( $c ) { return $c ? $c : 'SG'; } );
add_filter( 'default_checkout_shipping_country', function ( $c ) { return $c ? $c : 'SG'; } );

/** Place Order button label + SSL trust note (SEC6). */
add_filter( 'woocommerce_order_button_text', function () { return 'Place Order'; } );
add_action( 'woocommerce_review_order_after_submit', function () {
	echo '<p class="mgk-review__secure"><span aria-hidden="true">&#128274;</span> Payments secured with SSL &middot; PayNow, Visa, Mastercard</p>';
} );
