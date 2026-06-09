<?php
/**
 * S01 SEC2 — Seasonal hero promo block (DARK). Matches wireframe renderHomeScreen SEC2.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a = isset( $args['a'] ) ? $args['a'] : array();
?>
<section class="mgk-section mgk-hero">
	<div class="mgk-container">
		<div class="mgk-hero__block">
			<?php if ( ! empty( $a['badge'] ) ) : ?><span class="mgk-hero__badge"><?php echo esc_html( $a['badge'] ); ?></span><?php endif; ?>
			<h1 class="mgk-hero__title"><?php echo esc_html( $a['heading'] ?? '' ); ?></h1>
			<?php if ( ! empty( $a['sub'] ) ) : ?><p class="mgk-hero__sub"><?php echo esc_html( $a['sub'] ); ?></p><?php endif; ?>
			<?php if ( ! empty( $a['cta_text'] ) ) : ?>
				<a class="mgk-btn mgk-btn--light mgk-hero__cta" href="<?php echo esc_url( $a['cta_url'] ?? '#' ); ?>"><?php echo esc_html( $a['cta_text'] ); ?></a>
			<?php endif; ?>
		</div>
	</div>
</section>
