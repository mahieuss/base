<?php
/**
 * S07 Cancel Order — registers [mgk_cancel_form] shortcode.
 * Also handles the cancellation POST before template render.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/** Process the cancellation form POST. */
add_action( 'template_redirect', function () {
	if ( empty( $_POST['mgk_cancel_nonce'] ) ) { return; }
	if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['mgk_cancel_nonce'] ) ), 'mgk_cancel_submit' ) ) {
		wp_die( 'Security check failed.' );
	}
	if ( ! isset( $_POST['mgk_cancel_action'] ) || 'confirm' !== $_POST['mgk_cancel_action'] ) { return; }

	$order_id = isset( $_POST['order_id'] ) ? absint( $_POST['order_id'] ) : 0;
	if ( ! $order_id || ! function_exists( 'wc_get_order' ) ) { return; }

	$order = wc_get_order( $order_id );
	if ( ! $order || (int) $order->get_customer_id() !== get_current_user_id() ) { return; }

	$cancellable = array( 'pending', 'on-hold', 'processing' );
	if ( ! in_array( $order->get_status(), $cancellable, true ) ) { return; }

	$reason = isset( $_POST['cancel_reason'] ) ? sanitize_key( $_POST['cancel_reason'] ) : '';
	$notes  = isset( $_POST['cancel_notes'] ) ? sanitize_textarea_field( wp_unslash( $_POST['cancel_notes'] ) ) : '';

	$order->update_status( 'cancelled', sprintf( 'Customer cancelled. Reason: %s. Notes: %s', $reason, $notes ) );

	$orders_url = function_exists( 'wc_get_account_endpoint_url' )
		? wc_get_account_endpoint_url( 'orders' )
		: home_url( '/my-account/orders/' );
	wp_safe_redirect( add_query_arg( 'mgk_cancelled', '1', $orders_url ) );
	exit;
} );

add_shortcode( 'mgk_cancel_form', function ( $atts ) {
	$a = shortcode_atts( array(
		'heading' => 'Cancel Your Order',
		'sub'     => 'Cancellations are only possible before your order has shipped.',
	), $atts, 'mgk_cancel_form' );

	$order    = null;
	$order_id = isset( $_GET['order_id'] ) ? absint( $_GET['order_id'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification
	if ( $order_id && function_exists( 'wc_get_order' ) ) {
		$o = wc_get_order( $order_id );
		if ( $o && ( is_super_admin() || (int) $o->get_customer_id() === get_current_user_id() ) ) {
			$order = $o;
		}
	}

	return mgk_render_part( 'account/cancel-form', array( 'a' => $a, 'order' => $order ), false );
} );
