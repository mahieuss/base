<?php
/**
 * S06 Rate Order — registers [mgk_rate_form] shortcode.
 * Shell text from atts; DATA (order) queried here, passed to partial.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

add_shortcode( 'mgk_rate_form', function ( $atts ) {
	$a = shortcode_atts( array(
		'heading' => 'Rate Your Order',
		'sub'     => 'Your feedback helps us serve you better. It only takes 2 minutes.',
	), $atts, 'mgk_rate_form' );

	$order    = null;
	$order_id = isset( $_GET['order_id'] ) ? absint( $_GET['order_id'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification
	if ( $order_id && function_exists( 'wc_get_order' ) ) {
		$o = wc_get_order( $order_id );
		if ( $o && ( is_super_admin() || (int) $o->get_customer_id() === get_current_user_id() ) ) {
			$order = $o;
		}
	}

	return mgk_render_part( 'account/rate-form', array( 'a' => $a, 'order' => $order ), false );
} );
