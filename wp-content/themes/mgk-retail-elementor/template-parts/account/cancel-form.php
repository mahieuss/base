<?php
/**
 * S07 — Order Cancellation Form.
 * Shell: $args['a']. DATA: $args['order'] (WC_Order|null).
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a     = isset( $args['a'] )     ? $args['a']     : array();
$order = isset( $args['order'] ) ? $args['order'] : null;

$reasons = array(
	'mind_change'   => 'I changed my mind',
	'wrong_address' => 'Incorrect delivery address',
	'cheaper'       => 'Found a cheaper price elsewhere',
	'duplicate'     => 'Accidental duplicate order',
);

$account_url = function_exists( 'wc_get_account_endpoint_url' )
	? wc_get_account_endpoint_url( 'orders' )
	: home_url( '/my-account/orders/' );

$can_cancel = false;
if ( $order ) {
	$can_cancel = in_array( $order->get_status(), array( 'pending', 'on-hold', 'processing' ), true );
}
?>
<div class="mgk-container mgk-cancel">
	<header class="mgk-page-header">
		<h1><?php echo esc_html( isset( $a['heading'] ) ? $a['heading'] : '' ); ?></h1>
		<p><?php echo esc_html( isset( $a['sub'] ) ? $a['sub'] : '' ); ?></p>
	</header>

	<?php if ( $order ) : ?>
		<!-- SEC1 — Order details header -->
		<section class="mgk-cancel__card">
			<div class="mgk-cancel__order-meta">
				<span class="mgk-cancel__order-num">Order #<?php echo esc_html( $order->get_order_number() ); ?></span>
				<span class="mgk-cancel__order-date">
					Order Date: <?php echo esc_html( $order->get_date_created() ? $order->get_date_created()->date_i18n( 'd/m/Y' ) : '' ); ?>
				</span>
				<span class="mgk-cancel__order-status">
					Status: <strong><?php echo esc_html( wc_get_order_status_name( $order->get_status() ) ); ?></strong>
				</span>
			</div>
			<?php if ( ! $can_cancel ) : ?>
				<div class="mgk-cancel__shipped-warn" role="alert">
					<span aria-hidden="true">&#9888;</span>
					This order has already shipped and cannot be cancelled.
					<a href="<?php echo esc_url( add_query_arg( 'order_id', $order->get_id(), home_url( '/refund/' ) ) ); ?>">Request a refund instead.</a>
				</div>
			<?php endif; ?>
		</section>

		<form class="mgk-cancel__form" method="post" novalidate>
			<?php wp_nonce_field( 'mgk_cancel_submit', 'mgk_cancel_nonce' ); ?>
			<input type="hidden" name="order_id" value="<?php echo esc_attr( $order->get_id() ); ?>">

			<!-- SEC2 — Cancellation reasons -->
			<section class="mgk-cancel__card">
				<h2>Reason for Cancellation</h2>
				<ul class="mgk-cancel__reasons">
					<?php foreach ( $reasons as $val => $label ) : ?>
						<li>
							<label class="mgk-cancel__reason-label">
								<input type="radio" name="cancel_reason" value="<?php echo esc_attr( $val ); ?>">
								<?php echo esc_html( $label ); ?>
							</label>
						</li>
					<?php endforeach; ?>
				</ul>
			</section>

			<!-- SEC3 — Open review comment textarea -->
			<section class="mgk-cancel__card">
				<h2>Additional Notes</h2>
				<textarea class="mgk-cancel__notes" name="cancel_notes" rows="4" maxlength="500"
						  placeholder="Help us improve by sharing more details…"></textarea>
			</section>

			<!-- SEC4 — Refund ledger -->
			<section class="mgk-cancel__card mgk-cancel__ledger">
				<h2>Estimated Refund</h2>
				<table class="mgk-cancel__ledger-table">
					<tbody>
						<tr>
							<td>Subtotal</td>
							<td><?php echo wp_kses_post( wc_price( $order->get_subtotal() ) ); ?></td>
						</tr>
						<tr>
							<td>Delivery</td>
							<td>
								<?php if ( $order->get_total_shipping() > 0 ) : ?>
									<?php echo wp_kses_post( wc_price( $order->get_total_shipping() ) ); ?>
								<?php else : ?>
									<em>Standard (refunded)</em>
								<?php endif; ?>
							</td>
						</tr>
						<?php if ( $order->get_total_tax() > 0 ) : ?>
							<tr>
								<td>GST (9%)</td>
								<td><?php echo wp_kses_post( wc_price( $order->get_total_tax() ) ); ?></td>
							</tr>
						<?php endif; ?>
					</tbody>
					<tfoot>
						<tr class="mgk-cancel__ledger-total">
							<td><strong>Total Refund</strong></td>
							<td><strong><?php echo wp_kses_post( $order->get_formatted_order_total() ); ?></strong></td>
						</tr>
					</tfoot>
				</table>
				<p class="mgk-cancel__ledger-note">Refund will be processed to your original payment method within 3–5 business days.</p>
			</section>

			<!-- SEC5 — Double-check action buttons -->
			<section class="mgk-cancel__card mgk-cancel__actions">
				<?php if ( $can_cancel ) : ?>
					<button type="submit" name="mgk_cancel_action" value="confirm" class="mgk-btn mgk-btn--danger"
							onclick="return confirm('Are you sure you want to cancel this order? This cannot be undone.')">
						ORDER CANCELLATION CONFIRMATION
					</button>
				<?php else : ?>
					<button type="button" class="mgk-btn mgk-btn--danger" disabled aria-disabled="true">
						ORDER CANCELLATION CONFIRMATION
					</button>
				<?php endif; ?>
				<a class="mgk-btn mgk-btn--primary" href="<?php echo esc_url( $account_url ); ?>">KEEP ORDER</a>
			</section>
		</form>

	<?php else : ?>
		<div class="mgk-cancel__no-order">
			<p>No order found. <a href="<?php echo esc_url( $account_url ); ?>">View your orders</a>.</p>
		</div>
	<?php endif; ?>
</div>
