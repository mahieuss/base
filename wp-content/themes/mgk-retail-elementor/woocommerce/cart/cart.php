<?php
/**
 * S04 — Cart override. Two-column: item list + voucher | totals sidebar.
 * Quantities, removal, coupons, totals = WooCommerce (DATA CORE). Shell = ours.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

do_action( 'woocommerce_before_cart' );

$cart  = WC()->cart;
$count = $cart->get_cart_contents_count();
?>
<div class="mgk-container mgk-cart">
	<header class="mgk-cart__head">
		<h1>Your Cart</h1>
		<p><?php echo esc_html( $count ); ?> item<?php echo 1 === $count ? '' : 's'; ?> ready for secure checkout</p>
	</header>

	<div class="mgk-cart__layout">
		<div class="mgk-cart__main">
			<form class="woocommerce-cart-form mgk-cart__form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
				<?php do_action( 'woocommerce_before_cart_table' ); ?>

				<ul class="mgk-cart__items">
					<?php do_action( 'woocommerce_before_cart_contents' ); ?>
					<?php
					foreach ( $cart->get_cart() as $cart_item_key => $cart_item ) {
						$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
						$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
						if ( ! $_product || ! $_product->exists() || $cart_item['quantity'] <= 0 || ! apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
							continue;
						}
						$in_stock    = $_product->is_in_stock();
						$product_url = $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '';
						$remove_url  = wc_get_cart_remove_url( $cart_item_key );
						?>
						<li class="mgk-cart__item<?php echo $in_stock ? '' : ' is-sold'; ?>">
							<div class="mgk-cart__thumb">
								<?php echo $_product->get_image( 'woocommerce_thumbnail' ); ?>
							</div>
							<div class="mgk-cart__info">
								<a class="mgk-cart__name" href="<?php echo esc_url( $product_url ); ?>"><?php echo wp_kses_post( $_product->get_name() ); ?></a>
								<div class="mgk-cart__meta"><?php echo wc_get_formatted_cart_item_data( $cart_item ); ?></div>
								<?php if ( ! $in_stock ) : ?>
									<span class="mgk-badge mgk-badge--sold">Sold Out</span>
									<p class="mgk-cart__soldnote">Remove sold-out items to proceed with secure checkout.</p>
								<?php endif; ?>
								<a class="mgk-cart__remove" href="<?php echo esc_url( $remove_url ); ?>" aria-label="Remove item">Remove</a>
							</div>
							<div class="mgk-cart__qty">
								<?php
								if ( $_product->is_sold_individually() ) {
									$qty = sprintf( '1 <input type="hidden" name="cart[%s][qty]" value="1" />', $cart_item_key );
								} else {
									$qty = woocommerce_quantity_input( array(
										'input_name'  => "cart[{$cart_item_key}][qty]",
										'input_value' => $cart_item['quantity'],
										'max_value'   => $_product->get_max_purchase_quantity(),
										'min_value'   => '0',
									), $_product, false );
								}
								echo $qty;
								?>
							</div>
							<div class="mgk-cart__price"><?php echo apply_filters( 'woocommerce_cart_item_subtotal', $cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); ?></div>
						</li>
						<?php
					}
					do_action( 'woocommerce_cart_contents' );
					?>
					<?php do_action( 'woocommerce_after_cart_contents' ); ?>
				</ul>

				<div class="mgk-cart__actions">
					<?php if ( wc_coupons_enabled() ) : ?>
						<div class="mgk-cart__coupon">
							<label for="coupon_code">Voucher code</label>
							<div class="mgk-cart__coupon-row">
								<input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="e.g. FIRST10" />
								<button type="submit" class="mgk-btn mgk-btn--ghost" name="apply_coupon" value="<?php esc_attr_e( 'Apply', 'woocommerce' ); ?>">Apply</button>
							</div>
							<p class="mgk-cart__coupon-locked">SG_NATIONAL_DAY &mdash; auto-applies during the National Day sale.</p>
						</div>
					<?php endif; ?>
					<button type="submit" class="mgk-btn mgk-btn--ghost" name="update_cart" value="Update cart">Update cart</button>
					<?php do_action( 'woocommerce_cart_actions' ); ?>
					<?php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ); ?>
				</div>

				<?php do_action( 'woocommerce_after_cart_table' ); ?>
			</form>

			<?php woocommerce_cross_sell_display(); ?>
		</div>

		<aside class="mgk-cart__aside">
			<?php woocommerce_cart_totals(); ?>
		</aside>
	</div>
</div>
<?php do_action( 'woocommerce_after_cart' ); ?>
