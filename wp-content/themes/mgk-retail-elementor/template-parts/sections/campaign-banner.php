<?php
/**
 * S01 SEC-extra — Mega campaign voucher banner (CONTENT). Matches wireframe campaign-promo.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a = isset( $args['a'] ) ? $args['a'] : array();
?>
<section class="mgk-section mgk-campaign">
	<div class="mgk-container">
		<div class="mgk-campaign__card">
			<div class="mgk-campaign__art" aria-hidden="true">&#10024;</div>
			<div class="mgk-campaign__copy">
				<div class="mgk-campaign__tags">
					<span class="mgk-campaign__tag"><?php echo esc_html( $a['tag'] ?? 'Mega Campaign Voucher' ); ?></span>
					<?php if ( ! empty( $a['expiry'] ) ) : ?><span class="mgk-campaign__expiry"><?php echo esc_html( $a['expiry'] ); ?></span><?php endif; ?>
				</div>
				<h4 class="mgk-campaign__title"><?php echo esc_html( $a['heading'] ?? '' ); ?></h4>
				<p class="mgk-campaign__sub">Use code <strong class="mgk-campaign__code"><?php echo esc_html( $a['code'] ?? 'FIRST10' ); ?></strong> <?php echo esc_html( $a['sub'] ?? '' ); ?></p>
			</div>
			<a class="mgk-btn mgk-btn--dark mgk-campaign__cta" href="<?php echo esc_url( $a['cta_url'] ?? ( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : '#' ) ); ?>"><?php echo esc_html( $a['cta_text'] ?? 'Shop Now' ); ?></a>
		</div>
	</div>
</section>
