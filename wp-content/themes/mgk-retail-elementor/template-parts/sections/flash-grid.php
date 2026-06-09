<?php
/**
 * S01 SEC6 — Active flash-sale grid (4 cards) with live countdown. Matches wireframe SEC6.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a        = isset( $args['a'] ) ? $args['a'] : array();
$products = isset( $args['products'] ) ? $args['products'] : array();
if ( ! $products ) { return; }
// Countdown to end of today (SGT) for the "ENDS IN" ticker.
$end = function_exists( 'mgk_delivery_cutoff_ts' ) ? mgk_delivery_cutoff_ts() : ( time() + 3600 );
?>
<section class="mgk-section mgk-flash">
	<div class="mgk-container">
		<div class="mgk-flash__head">
			<h3 class="mgk-label mgk-label--accent mgk-label--bare">&#9889; <?php echo esc_html( $a['heading'] ?? 'Flashsale Deals (Ticking Active)' ); ?></h3>
			<span class="mgk-flash__timer">Ends in: <span data-mgk-countdown="<?php echo esc_attr( $end ); ?>" data-expired="Ended">--:--:--</span></span>
		</div>
		<div class="mgk-grid mgk-grid--4">
			<?php foreach ( $products as $p ) : ?>
				<?php mgk_render_part( 'components/product-card', array( 'product' => $p ) ); ?>
			<?php endforeach; ?>
		</div>
	</div>
</section>
