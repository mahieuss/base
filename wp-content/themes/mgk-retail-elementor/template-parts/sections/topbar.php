<?php
/**
 * S01 SEC1 — support / notification bar.
 * Shell text from $args['a']; cart count from Woo (DATA).
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a = isset( $args['a'] ) ? $args['a'] : array();
$count = ( function_exists( 'WC' ) && WC()->cart ) ? WC()->cart->get_cart_contents_count() : 0;
$cart_url = function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : home_url( '/cart/' );
?>
<div class="mgk-topbar">
	<div class="mgk-container mgk-topbar__row">
		<p class="mgk-topbar__msg"><?php echo esc_html( $a['message'] ?? '' ); ?></p>
		<div class="mgk-topbar__aside">
			<span class="mgk-topbar__help"><?php echo esc_html( $a['helpline'] ?? '' ); ?></span>
			<a class="mgk-topbar__cart" href="<?php echo esc_url( $cart_url ); ?>">
				<span class="mgk-topbar__cart-ico" aria-hidden="true">&#128722;</span>
				<span class="mgk-topbar__cart-label">Cart</span>
				<span class="mgk-topbar__cart-count" data-mgk-cart-count><?php echo esc_html( $count ); ?></span>
			</a>
		</div>
	</div>
</div>
