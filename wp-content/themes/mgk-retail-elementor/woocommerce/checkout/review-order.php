<?php
/**
 * S08 SEC4/SEC5 — order review (sticky). Item thumbnails + GST 9% + place order.
 * Amounts/shipping/tax/payment = WooCommerce.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }
?>
<div class="mgk-review">
	<ul class="mgk-review__items">
		<?php
		do_action( 'woocommerce_review_order_before_cart_contents' );
		foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
			$_product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
			if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_checkout_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
				?>
				<li class="mgk-review__item">
					<span class="mgk-review__thumb"><?php echo $_product->get_image( 'woocommerce_gallery_thumbnail' ); ?><em class="mgk-review__qty"><?php echo esc_html( $cart_item['quantity'] ); ?></em></span>
					<span class="mgk-review__name"><?php echo wp_kses_post( $_product->get_name() ); ?></span>
					<span class="mgk-review__price"><?php echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); ?></span>
				</li>
				<?php
			}
		}
		do_action( 'woocommerce_review_order_after_cart_contents' );
		?>
	</ul>

	<div class="mgk-review__totals">
		<div class="mgk-totals__row"><span>Subtotal</span><span><?php wc_cart_totals_subtotal_html(); ?></span></div>

		<?php foreach ( WC()->cart->get_coupons() as $code => $coupon ) : ?>
			<div class="mgk-totals__row mgk-totals__row--coupon"><span><?php wc_cart_totals_coupon_label( $coupon ); ?></span><span><?php wc_cart_totals_coupon_html( $coupon ); ?></span></div>
		<?php endforeach; ?>

		<?php if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() ) : ?>
			<?php wc_cart_totals_shipping_html(); ?>
		<?php endif; ?>

		<?php foreach ( WC()->cart->get_fees() as $fee ) : ?>
			<div class="mgk-totals__row"><span><?php echo esc_html( $fee->name ); ?></span><span><?php wc_cart_totals_fee_html( $fee ); ?></span></div>
		<?php endforeach; ?>

		<?php if ( wc_tax_enabled() && ! WC()->cart->display_prices_including_tax() ) : ?>
			<?php foreach ( WC()->cart->get_tax_totals() as $code => $tax ) : ?>
				<div class="mgk-totals__row"><span><?php echo esc_html( $tax->label ); ?></span><span><?php echo wp_kses_post( $tax->formatted_amount ); ?></span></div>
			<?php endforeach; ?>
		<?php endif; ?>

		<div class="mgk-totals__row mgk-totals__row--grand"><span>Total</span><span><?php wc_cart_totals_order_total_html(); ?></span></div>
	</div>
	<?php // Payment methods + Place Order are rendered by woocommerce_checkout_payment() (priority 20). ?>
</div>
