<?php
/**
 * S06 — Order Rating & Feedback Form.
 * Shell: $args['a']. DATA: $args['order'] (WC_Order|null).
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a     = isset( $args['a'] )     ? $args['a']     : array();
$order = isset( $args['order'] ) ? $args['order'] : null;

$account_url = function_exists( 'wc_get_account_endpoint_url' )
	? wc_get_account_endpoint_url( 'orders' )
	: home_url( '/my-account/orders/' );
?>
<div class="mgk-container mgk-rate">
	<header class="mgk-page-header">
		<h1><?php echo esc_html( isset( $a['heading'] ) ? $a['heading'] : '' ); ?></h1>
		<p><?php echo esc_html( isset( $a['sub'] ) ? $a['sub'] : '' ); ?></p>
	</header>

	<form class="mgk-rate__form" method="post" novalidate>
		<?php wp_nonce_field( 'mgk_rate_submit', 'mgk_rate_nonce' ); ?>
		<?php if ( $order ) : ?>
			<input type="hidden" name="order_id" value="<?php echo esc_attr( $order->get_id() ); ?>">
		<?php endif; ?>

		<!-- SEC2 — Overall satisfaction stars -->
		<section class="mgk-rate__card">
			<h2>Overall Shopping Experience</h2>
			<p class="mgk-rate__question">How did you feel about this order?</p>
			<div class="mgk-rate__stars" role="group" aria-label="Overall rating" data-mgk-stars>
				<?php for ( $i = 1; $i <= 5; $i++ ) : ?>
					<label class="mgk-rate__star-label" title="<?php echo esc_attr( $i ); ?> star<?php echo $i > 1 ? 's' : ''; ?>">
						<input type="radio" name="overall_rating" value="<?php echo esc_attr( $i ); ?>" class="mgk-sr-only">
						<span class="mgk-rate__star" data-value="<?php echo esc_attr( $i ); ?>" aria-hidden="true">&#9733;</span>
					</label>
				<?php endfor; ?>
			</div>
			<div class="mgk-rate__star-labels" aria-hidden="true">
				<span>Terrible</span><span>Poor</span><span>Okay</span><span>Good</span><span>Excellent</span>
			</div>
		</section>

		<!-- SEC3 — Written comment + anonymity tip -->
		<section class="mgk-rate__card">
			<h2>Write a Review</h2>
			<textarea class="mgk-rate__textarea" name="review_text" rows="5" maxlength="1000"
					  placeholder="Share details about your experience — delivery speed, packaging, product quality…"></textarea>
			<p class="mgk-rate__anon-tip">
				<span aria-hidden="true">&#128274;</span>
				Your feedback will be anonymous if you choose privacy in your
				<a href="<?php echo esc_url( home_url( '/my-account/' ) ); ?>">account settings</a>.
			</p>
		</section>

		<!-- SEC4 — Product-level ratings -->
		<?php if ( $order && $order->get_items() ) : ?>
			<section class="mgk-rate__card">
				<h2>Rate Each Product</h2>
				<?php foreach ( $order->get_items() as $item ) :
					$pid  = $item->get_product_id();
					$name = $item->get_name();
				?>
					<div class="mgk-rate__product-row">
						<span class="mgk-rate__product-name"><?php echo esc_html( $name ); ?></span>
						<div class="mgk-rate__stars mgk-rate__stars--sm" role="group"
							 aria-label="<?php echo esc_attr( $name ); ?> rating" data-mgk-stars>
							<?php for ( $i = 1; $i <= 5; $i++ ) : ?>
								<label class="mgk-rate__star-label">
									<input type="radio" name="product_rating[<?php echo esc_attr( $pid ); ?>]"
										   value="<?php echo esc_attr( $i ); ?>" class="mgk-sr-only">
									<span class="mgk-rate__star" data-value="<?php echo esc_attr( $i ); ?>" aria-hidden="true">&#9733;</span>
								</label>
							<?php endfor; ?>
						</div>
						<label class="mgk-rate__upload-label">
							<input type="file" name="product_photo[<?php echo esc_attr( $pid ); ?>]"
								   accept="image/jpeg,image/png" class="mgk-sr-only">
							<span class="mgk-btn mgk-btn--ghost mgk-btn--sm">&#128247; Add Photo</span>
						</label>
					</div>
				<?php endforeach; ?>
			</section>
		<?php endif; ?>

		<!-- SEC5 — Submit CTA -->
		<section class="mgk-rate__card mgk-rate__submit-panel">
			<div class="mgk-rate__submit-row">
				<button type="submit" class="mgk-btn mgk-btn--primary">Send Review &rarr;</button>
				<a class="mgk-btn mgk-btn--ghost" href="<?php echo esc_url( $account_url ); ?>">Skip</a>
			</div>
		</section>
	</form>
</div>
