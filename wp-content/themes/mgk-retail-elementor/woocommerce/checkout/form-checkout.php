<?php
/**
 * S08 — Checkout override. Two-column: customer details | sticky order review.
 * Fields, shipping, tax, payment, order creation = WooCommerce (DATA CORE).
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

do_action( 'woocommerce_before_checkout_form', $checkout );

if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
	return;
}
?>
<div class="mgk-container mgk-checkout">
	<header class="mgk-checkout__head">
		<h1>Secure Checkout</h1>
		<p><span aria-hidden="true">&#128274;</span> SSL encrypted &middot; PCI-DSS compliant</p>
	</header>

	<form name="checkout" method="post" class="checkout woocommerce-checkout mgk-checkout__form" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data">
		<div class="mgk-checkout__layout">
			<div class="mgk-checkout__main">
				<?php if ( $checkout->get_checkout_fields() ) : ?>
					<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>
					<div class="mgk-checkout__details" id="customer_details">
						<div class="mgk-checkout__col"><?php do_action( 'woocommerce_checkout_billing' ); ?></div>
						<div class="mgk-checkout__col"><?php do_action( 'woocommerce_checkout_shipping' ); ?></div>
					</div>
					<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>
				<?php endif; ?>
			</div>

			<aside class="mgk-checkout__aside">
				<h2 id="order_review_heading" class="mgk-checkout__review-title">Your order</h2>
				<?php do_action( 'woocommerce_checkout_before_order_review' ); ?>
				<div id="order_review" class="woocommerce-checkout-review-order">
					<?php do_action( 'woocommerce_checkout_order_review' ); ?>
				</div>
				<?php do_action( 'woocommerce_checkout_after_order_review' ); ?>
			</aside>
		</div>
	</form>
</div>
<?php
do_action( 'woocommerce_after_checkout_form', $checkout );
