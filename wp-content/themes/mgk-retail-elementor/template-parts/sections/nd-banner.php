<?php
/**
 * S01 SEC4 — National Day super-sale banner (CONTENT).
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a = isset( $args['a'] ) ? $args['a'] : array();
?>
<section class="mgk-section mgk-ndbanner">
	<div class="mgk-container">
		<div class="mgk-ndbanner__card">
			<?php if ( ! empty( $a['eyebrow'] ) ) : ?><span class="mgk-eyebrow mgk-ndbanner__eyebrow"><?php echo esc_html( $a['eyebrow'] ); ?></span><?php endif; ?>
			<h2 class="mgk-ndbanner__title"><?php echo esc_html( $a['heading'] ?? '' ); ?></h2>
			<?php if ( ! empty( $a['sub'] ) ) : ?><p class="mgk-ndbanner__sub"><?php echo esc_html( $a['sub'] ); ?></p><?php endif; ?>
			<?php if ( ! empty( $a['cta_text'] ) ) : ?>
				<a class="mgk-btn mgk-btn--accent mgk-ndbanner__cta" href="<?php echo esc_url( $a['cta_url'] ?? '#' ); ?>"><?php echo esc_html( $a['cta_text'] ); ?></a>
			<?php endif; ?>
		</div>
	</div>
</section>
