<?php
/**
 * S08 — PayNow QR payment gateway (DATA CORE) + Singapore shipping setup.
 * The QR shown here is a styled placeholder carrying the live order amount; wiring a
 * real UEN/EMVCo PayNow payload is a config-level extension, not a template change.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }
if ( ! class_exists( 'WooCommerce' ) ) { return; }

/* ---- Define the gateway class. Themes load AFTER `plugins_loaded`, so WooCommerce
 *      is already available — define now (with a woocommerce_init fallback). ---- */
function mgk_define_paynow_gateway() {
	if ( ! class_exists( 'WC_Payment_Gateway' ) || class_exists( 'MGK_Gateway_PayNow' ) ) { return; }

	class MGK_Gateway_PayNow extends WC_Payment_Gateway {
		public function __construct() {
			$this->id                 = 'mgk_paynow';
			$this->method_title       = 'PayNow QR';
			$this->method_description = 'Singapore PayNow QR — scan to pay with any local bank app.';
			$this->title              = 'PayNow QR';
			$this->has_fields         = true;
			$this->icon               = '';
			$this->init_form_fields();
			$this->init_settings();
			$this->enabled = 'yes';
			add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );
		}

		public function init_form_fields() {
			$this->form_fields = array(
				'enabled' => array( 'title' => 'Enable', 'type' => 'checkbox', 'label' => 'Enable PayNow QR', 'default' => 'yes' ),
				'uen'     => array( 'title' => 'UEN / PayNow ID', 'type' => 'text', 'default' => '201912345A', 'description' => 'Merchant UEN the QR resolves to.' ),
			);
		}

		/** Checkout payment area: scan-to-pay QR with the live amount. */
		public function payment_fields() {
			$total = WC()->cart ? WC()->cart->get_total( 'raw' ) : 0;
			mgk_render_part( 'checkout/payment-paynow', array(
				'uen'    => $this->get_option( 'uen', '201912345A' ),
				'amount' => $total,
			), true );
		}

		public function process_payment( $order_id ) {
			$order = wc_get_order( $order_id );
			$order->update_status( 'on-hold', __( 'Awaiting PayNow transfer confirmation.', 'mgk-retail' ) );
			wc_reduce_stock_levels( $order_id );
			WC()->cart->empty_cart();
			return array( 'result' => 'success', 'redirect' => $this->get_return_url( $order ) );
		}
	}
}
mgk_define_paynow_gateway();
add_action( 'woocommerce_init', 'mgk_define_paynow_gateway' );

add_filter( 'woocommerce_payment_gateways', function ( $gateways ) {
	if ( class_exists( 'MGK_Gateway_PayNow' ) ) { $gateways[] = 'MGK_Gateway_PayNow'; }
	return $gateways;
} );

/* ---- Singapore shipping: Standard (free) + Click & Collect (S$12), idempotent ---- */
add_action( 'after_switch_theme', function () {
	if ( ! class_exists( 'WC_Shipping_Zones' ) ) { return; }
	if ( get_option( 'mgk_shipping_seeded' ) ) { return; }

	$zone = new WC_Shipping_Zone();
	$zone->set_zone_name( 'Singapore' );
	$zone->add_location( 'SG', 'country' );
	$zone->save();

	$free = $zone->add_shipping_method( 'free_shipping' );
	if ( $free ) {
		$inst = new WC_Shipping_Free_Shipping( $free );
		$inst->init_instance_settings();
		$opt = $inst->get_instance_option_key();
		update_option( $opt, array_merge( $inst->instance_settings, array(
			'title'      => 'Standard Delivery (Next-day)',
			'requires'   => '',
		) ) );
	}

	$flat = $zone->add_shipping_method( 'flat_rate' );
	if ( $flat ) {
		$inst = new WC_Shipping_Flat_Rate( $flat );
		$inst->init_instance_settings();
		$opt = $inst->get_instance_option_key();
		update_option( $opt, array_merge( $inst->instance_settings, array(
			'title' => 'Click & Collect (Store pickup)',
			'cost'  => '12',
		) ) );
	}

	update_option( 'mgk_shipping_seeded', '1' );
}, 25 );
