<?php
/**
 * S09 — Order received / thank-you override. Banner + summary + SingPost tracker.
 * Order data = WooCommerce; layout/tracker = ours.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

$order_id = isset( $order ) && $order ? $order->get_id() : 0;
?>
<div class="mgk-container mgk-thankyou">

	<?php if ( $order ) : ?>
		<div class="mgk-ty__banner">
			<span class="mgk-ty__check" aria-hidden="true">&#10003;</span>
			<h1>Payment Confirmed</h1>
			<p>Thank you, <?php echo esc_html( $order->get_billing_first_name() ); ?>! Your order is in good hands.</p>
			<p class="mgk-ty__id">Order ID <strong>#<?php echo esc_html( $order->get_order_number() ); ?></strong></p>
			<div class="mgk-ty__actions">
				<a class="mgk-btn mgk-btn--primary" href="<?php echo esc_url( $order->get_view_order_url() ); ?>">Track package</a>
				<a class="mgk-btn mgk-btn--ghost" href="<?php echo esc_url( $order->get_view_order_url() ); ?>">Download receipt</a>
			</div>
		</div>

		<div class="mgk-ty__grid">
			<div class="mgk-ty__col">
				<section class="mgk-ty__card">
					<h2>Order summary</h2>
					<?php woocommerce_order_details_table( $order ); ?>
				</section>

				<section class="mgk-ty__card">
					<h2>Delivery address</h2>
					<address class="mgk-ty__address"><?php echo wp_kses_post( $order->get_formatted_shipping_address() ? $order->get_formatted_shipping_address() : $order->get_formatted_billing_address() ); ?></address>
				</section>
			</div>

			<aside class="mgk-ty__col">
				<section class="mgk-ty__card mgk-ty__tracker">
					<h2>SingPost tracking</h2>
					<ol class="mgk-track">
						<?php foreach ( mgk_order_milestones( $order ) as $m ) : ?>
							<li class="mgk-track__step<?php echo $m['done'] ? ' is-done' : ''; ?>">
								<span class="mgk-track__dot" aria-hidden="true"><?php echo $m['done'] ? '&#10003;' : ''; ?></span>
								<span class="mgk-track__body">
									<strong><?php echo esc_html( $m['label'] ); ?></strong>
									<em><?php echo esc_html( $m['desc'] ); ?></em>
								</span>
							</li>
						<?php endforeach; ?>
					</ol>
				</section>
			</aside>
		</div>

		<div class="mgk-ty__continue">
			<a class="mgk-btn mgk-btn--accent" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>">Continue Shopping &rarr;</a>
		</div>

	<?php else : ?>
		<div class="mgk-ty__banner"><h1>Thank you</h1><p>Your order has been received.</p></div>
	<?php endif; ?>
</div>
