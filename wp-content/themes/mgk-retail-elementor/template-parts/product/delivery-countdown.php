<?php
/**
 * S03 SEC4 — next-day SGP delivery countdown (DARK box, matches wireframe).
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$cutoff = (int) ( $args['cutoff'] ?? 0 );
if ( ! $cutoff ) { return; }
?>
<div class="mgk-delivery">
	<span class="mgk-delivery__ico" aria-hidden="true">&#9201;</span>
	<div class="mgk-delivery__body">
		<span class="mgk-delivery__title">Next-day SGP delivery timelines active</span>
		<p class="mgk-delivery__line">Order in
			<span class="mgk-delivery__clock" data-mgk-countdown="<?php echo esc_attr( $cutoff ); ?>" data-expired="Cutoff reached — ships next working day">--:--:--</span>
			to receive tomorrow.
		</p>
	</div>
</div>
