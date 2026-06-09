<?php
/**
 * S12 Membership Hub — helper functions + woocommerce_account_dashboard hook.
 * Replaces the default "Hello, username" dashboard block with our profile layout.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }
if ( ! class_exists( 'WooCommerce' ) ) { return; }

/** Order counts for the 4 dashboard indicator cells. */
function mgk_order_status_counts( $user_id = 0 ) {
	$uid = $user_id ? (int) $user_id : get_current_user_id();
	if ( ! $uid ) {
		return array( 'pending' => 0, 'pickup' => 0, 'delivery' => 0, 'to_rate' => 0 );
	}
	$base     = array( 'customer' => $uid, 'limit' => -1, 'return' => 'ids' );
	$pending  = count( wc_get_orders( array_merge( $base, array( 'status' => array( 'pending', 'on-hold' ) ) ) ) );
	$delivery = count( wc_get_orders( array_merge( $base, array( 'status' => array( 'processing' ) ) ) ) );
	$pickup   = count( wc_get_orders( array_merge( $base, array( 'status' => array( 'ready-for-pickup' ) ) ) ) );
	$done_ids = wc_get_orders( array_merge( $base, array( 'status' => array( 'completed' ) ) ) );
	$to_rate  = 0;
	foreach ( $done_ids as $oid ) {
		if ( ! get_post_meta( $oid, '_mgk_reviewed', true ) ) { $to_rate++; }
	}
	return compact( 'pending', 'pickup', 'delivery', 'to_rate' );
}

/** Membership tier from total spend (SGD). */
function mgk_membership_tier( $user_id = 0 ) {
	$uid   = $user_id ? (int) $user_id : get_current_user_id();
	if ( ! $uid ) { return 'Guest'; }
	$spend = (float) wc_get_customer_total_spent( $uid );
	if ( $spend >= 2000 ) { return 'Platinum'; }
	if ( $spend >= 500 )  { return 'Gold'; }
	if ( $spend >= 100 )  { return 'Silver'; }
	return 'Member';
}

/** Loyalty points balance (user meta _mgk_loyalty_points; 100 pts = SGD 1). */
function mgk_loyalty_points( $user_id = 0 ) {
	$uid = $user_id ? (int) $user_id : get_current_user_id();
	return $uid ? (int) get_user_meta( $uid, '_mgk_loyalty_points', true ) : 0;
}

/** Store credit balance (user meta _mgk_store_credit). */
function mgk_store_credit( $user_id = 0 ) {
	$uid = $user_id ? (int) $user_id : get_current_user_id();
	return $uid ? (float) get_user_meta( $uid, '_mgk_store_credit', true ) : 0.0;
}

/** Replace the default WooCommerce dashboard greeting with S12 layout. */
add_action( 'woocommerce_account_dashboard', function () {
	$uid    = get_current_user_id();
	$user   = $uid ? get_userdata( $uid ) : null;
	$tier   = mgk_membership_tier( $uid );
	$counts = mgk_order_status_counts( $uid );
	$points = mgk_loyalty_points( $uid );
	$credit = mgk_store_credit( $uid );

	mgk_render_part( 'account/profile-header',    array( 'user' => $user, 'tier' => $tier ),              true );
	mgk_render_part( 'account/order-status-grid', array( 'counts' => $counts ),                            true );
	mgk_render_part( 'account/utilities',         array( 'points' => $points, 'credit' => $credit ),       true );
}, 5 );
