<?php
/**
 * S05 — Refund Request Form.
 * Shell: $args['a']. DATA: $args['order'] (WC_Order|null).
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a     = isset( $args['a'] )     ? $args['a']     : array();
$order = isset( $args['order'] ) ? $args['order'] : null;

$reasons = array(
	'defective'   => 'Defective product',
	'not_as_desc' => 'Not as described',
	'mind_change' => 'Change of mind',
	'wrong_item'  => 'Wrong item received',
);

$account_url = function_exists( 'wc_get_account_endpoint_url' )
	? wc_get_account_endpoint_url( 'orders' )
	: home_url( '/my-account/orders/' );
?>
<div class="mgk-container mgk-refund">
	<header class="mgk-page-header">
		<h1><?php echo esc_html( isset( $a['heading'] ) ? $a['heading'] : '' ); ?></h1>
		<p><?php echo esc_html( isset( $a['sub'] ) ? $a['sub'] : '' ); ?></p>
	</header>

	<form class="mgk-refund__form" method="post" enctype="multipart/form-data" novalidate>
		<?php wp_nonce_field( 'mgk_refund_submit', 'mgk_refund_nonce' ); ?>

		<!-- SEC1 — Order reference -->
		<section class="mgk-refund__card">
			<h2>Order Details</h2>
			<?php if ( $order ) : ?>
				<div class="mgk-refund__order-row">
					<span class="mgk-refund__order-id">Order #<?php echo esc_html( $order->get_order_number() ); ?></span>
					<span class="mgk-refund__order-date"><?php echo esc_html( $order->get_date_created() ? $order->get_date_created()->date_i18n( 'd M Y' ) : '' ); ?></span>
				</div>
				<ul class="mgk-refund__items">
					<?php foreach ( $order->get_items() as $item ) : ?>
						<li class="mgk-refund__item">
							<label class="mgk-refund__item-check">
								<input type="checkbox" name="refund_items[]" value="<?php echo esc_attr( $item->get_id() ); ?>">
								<span><?php echo esc_html( $item->get_name() ); ?></span>
							</label>
							<span class="mgk-refund__item-price"><?php echo wp_kses_post( mgk_price( $item->get_total() ) ); ?></span>
						</li>
					<?php endforeach; ?>
				</ul>
			<?php else : ?>
				<p class="mgk-refund__no-order">No order found. <a href="<?php echo esc_url( $account_url ); ?>">View your orders</a>.</p>
			<?php endif; ?>
		</section>

		<!-- SEC2 — Return motive -->
		<section class="mgk-refund__card">
			<h2>Reason for Return</h2>
			<ul class="mgk-refund__reasons">
				<?php foreach ( $reasons as $val => $label ) : ?>
					<li>
						<label class="mgk-refund__reason-label">
							<input type="radio" name="refund_reason" value="<?php echo esc_attr( $val ); ?>">
							<?php echo esc_html( $label ); ?>
						</label>
					</li>
				<?php endforeach; ?>
			</ul>
			<textarea class="mgk-refund__notes" name="refund_notes" rows="4" maxlength="500"
					  placeholder="Please describe the issue in detail…"></textarea>
		</section>

		<!-- SEC3 — Photo upload grid -->
		<section class="mgk-refund__card">
			<h2>Upload Photos</h2>
			<p class="mgk-refund__upload-tip">Upload at least 2 photos clearly showing labels and the defect. Max 15 MB each (JPEG / PNG).</p>
			<div class="mgk-refund__upload-grid">
				<label class="mgk-refund__upload-slot">
					<input type="file" name="refund_photos[]" accept="image/jpeg,image/png" multiple>
					<span class="mgk-refund__upload-placeholder" aria-hidden="true">&#128247;</span>
					<span>Add Photo</span>
				</label>
			</div>
		</section>

		<!-- SEC4 — Refund destination selector -->
		<section class="mgk-refund__card">
			<h2>Refund Method</h2>
			<div class="mgk-refund__methods">
				<label class="mgk-refund__method-card">
					<input type="radio" name="refund_method" value="original" checked>
					<span class="mgk-refund__method-title">Original Payment Method</span>
					<span class="mgk-refund__method-desc">3–5 business days back to your Visa / Mastercard.</span>
				</label>
				<label class="mgk-refund__method-card">
					<input type="radio" name="refund_method" value="store_credit">
					<span class="mgk-refund__method-title">Store Balance</span>
					<span class="mgk-refund__method-desc">Instant credit added to your RETAIL_SG wallet.</span>
				</label>
			</div>
		</section>

		<!-- SEC5 — NinjaVan logistics / collection instructions -->
		<section class="mgk-refund__card mgk-refund__logistics">
			<h2>Return Logistics</h2>
			<div class="mgk-refund__ninjavan-box">
				<strong>&#128666; NinjaVan Singapore Drop-off</strong>
				<address>Warehouse 42, Precision Logistics Center<br>Singapore 638210</address>
				<ul class="mgk-refund__checklist">
					<li>Pack items in original packaging where possible.</li>
					<li>Include a printed copy of this refund request.</li>
					<li>Seal the parcel securely before drop-off.</li>
				</ul>
				<button type="button" class="mgk-btn mgk-btn--ghost"
						onclick="navigator.clipboard && navigator.clipboard.writeText('Warehouse 42, Precision Logistics Center, Singapore 638210')">
					Copy Address
				</button>
			</div>
		</section>

		<!-- SEC6 — Submit -->
		<section class="mgk-refund__card mgk-refund__submit-panel">
			<?php if ( $order ) : ?>
				<div class="mgk-refund__total-row">
					<span>Total Refund Amount:</span>
					<strong><?php echo wp_kses_post( $order->get_formatted_order_total() ); ?></strong>
				</div>
			<?php endif; ?>
			<p class="mgk-refund__policy">
				By submitting you agree to our <a href="<?php echo esc_url( home_url( '/returns-policy/' ) ); ?>">Returns Policy</a>.
			</p>
			<div class="mgk-refund__submit-row">
				<button type="submit" class="mgk-btn mgk-btn--primary"<?php echo $order ? '' : ' disabled'; ?>>Submit Refund Request</button>
				<a class="mgk-btn mgk-btn--ghost" href="<?php echo esc_url( $account_url ); ?>">Cancel</a>
			</div>
		</section>
	</form>
</div>
