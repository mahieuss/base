<?php
/**
 * S12 SEC3 — Digital utilities dashboard (store balance, loyalty points, vouchers).
 * $args['points'] = int. $args['credit'] = float.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$points = (int)   ( isset( $args['points'] ) ? $args['points'] : 0 );
$credit = (float) ( isset( $args['credit'] ) ? $args['credit'] : 0.0 );

$uid      = get_current_user_id();
$vouchers = $uid ? (array) get_user_meta( $uid, '_mgk_vouchers', true ) : array();
$vcount   = count( array_filter( $vouchers ) );
?>
<section class="mgk-utilities" aria-label="My utilities">
	<h2 class="mgk-section-heading">My Utilities</h2>
	<div class="mgk-utilities__row">

		<!-- Store balance / wallet -->
		<div class="mgk-utilities__card">
			<span class="mgk-utilities__icon" aria-hidden="true">&#128179;</span>
			<div class="mgk-utilities__info">
				<span class="mgk-utilities__label">Store Balance</span>
				<strong class="mgk-utilities__value"><?php echo wp_kses_post( mgk_price( $credit ) ); ?></strong>
			</div>
			<a class="mgk-btn mgk-btn--ghost mgk-btn--sm"
			   href="<?php echo esc_url( home_url( '/my-account/store-credit/' ) ); ?>">Top Up</a>
		</div>

		<!-- Loyalty points (100 pts = SGD 1) -->
		<div class="mgk-utilities__card">
			<span class="mgk-utilities__icon" aria-hidden="true">&#127775;</span>
			<div class="mgk-utilities__info">
				<span class="mgk-utilities__label">Loyalty Points</span>
				<strong class="mgk-utilities__value"><?php echo esc_html( number_format( $points ) ); ?> pts</strong>
				<span class="mgk-utilities__sub">= <?php echo wp_kses_post( mgk_price( $points / 100 ) ); ?></span>
			</div>
			<a class="mgk-btn mgk-btn--ghost mgk-btn--sm"
			   href="<?php echo esc_url( home_url( '/my-account/loyalty/' ) ); ?>">View History</a>
		</div>

		<!-- Vouchers -->
		<div class="mgk-utilities__card">
			<span class="mgk-utilities__icon" aria-hidden="true">&#127987;</span>
			<div class="mgk-utilities__info">
				<span class="mgk-utilities__label">Vouchers</span>
				<strong class="mgk-utilities__value"><?php echo esc_html( $vcount ); ?> available</strong>
			</div>
			<a class="mgk-btn mgk-btn--ghost mgk-btn--sm"
			   href="<?php echo esc_url( home_url( '/my-account/vouchers/' ) ); ?>">View All</a>
		</div>

	</div>
</section>
