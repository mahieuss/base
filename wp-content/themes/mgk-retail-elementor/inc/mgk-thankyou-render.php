<?php
/**
 * S09 thank-you helpers. Maps WooCommerce order status → SingPost milestone timeline.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/** Build the delivery milestone timeline from order status (presentation of DATA). */
function mgk_order_milestones( $order ) {
	$status = $order ? $order->get_status() : 'pending';
	// Order of progress. processing/on-hold => Shipped soon; completed => Delivered.
	$reached = array(
		'confirmed' => true,
		'processing' => in_array( $status, array( 'processing', 'on-hold', 'completed' ), true ),
		'shipped'    => in_array( $status, array( 'completed' ), true ) || ( 'processing' === $status ),
		'delivered'  => 'completed' === $status,
	);
	return array(
		array( 'key' => 'confirmed', 'label' => 'Order Confirmed', 'desc' => 'Payment received', 'done' => $reached['confirmed'] ),
		array( 'key' => 'processing', 'label' => 'Processing', 'desc' => 'Packed at warehouse', 'done' => $reached['processing'] ),
		array( 'key' => 'shipped', 'label' => 'Shipped', 'desc' => 'Handed to SingPost', 'done' => $reached['shipped'] ),
		array( 'key' => 'delivered', 'label' => 'Delivered', 'desc' => 'Arrived at your address', 'done' => $reached['delivered'] ),
	);
}
