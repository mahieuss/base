<?php
/**
 * S04 SEC4/SEC5 — cart totals sidebar. Amounts/tax/coupons = WooCommerce.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }
?>
<div class="mgk-totals cart_totals">
	<h2 class="mgk-totals__title">Order summary</h2>

	<div class="mgk-totals__row">
		<span>Subtotal</span>
		<span><?php wc_cart_totals_subtotal_html(); ?></span>
	</div>

	<?php foreach ( WC()->cart->get_coupons() as $code => $coupon ) : ?>
		<div class="mgk-totals__row mgk-totals__row--coupon">
			<span><?php wc_cart_totals_coupon_label( $coupon ); ?></span>
			<span><?php wc_cart_totals_coupon_html( $coupon ); ?></span>
		</div>
	<?php endforeach; ?>

	<div class="mgk-totals__row">
		<span>Delivery</span>
		<span class="mgk-totals__muted">Calculated at checkout</span>
	</div>

	<?php if ( wc_tax_enabled() && ! WC()->cart->display_prices_including_tax() ) : ?>
		<?php foreach ( WC()->cart->get_tax_totals() as $code => $tax ) : ?>
			<div class="mgk-totals__row">
				<span><?php echo esc_html( $tax->label ); ?></span>
				<span><?php echo wp_kses_post( $tax->formatted_amount ); ?></span>
			</div>
		<?php endforeach; ?>
	<?php endif; ?>

	<div class="mgk-totals__row mgk-totals__row--grand">
		<span>Total</span>
		<span><?php wc_cart_totals_order_total_html(); ?></span>
	</div>

	<div class="mgk-totals__cta">
		<?php do_action( 'woocommerce_proceed_to_checkout' ); ?>
	</div>

	<p class="mgk-totals__secure"><span aria-hidden="true">&#128274;</span> Secure SSL checkout &middot; PayNow, Visa, Mastercard</p>
</div>
