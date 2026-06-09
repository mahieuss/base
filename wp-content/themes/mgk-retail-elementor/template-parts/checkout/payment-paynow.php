<?php
/**
 * S08 SEC3 — PayNow QR (DARK box, matches wireframe). Amount live from cart.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$uen    = $args['uen'] ?? '';
$amount = (float) ( $args['amount'] ?? 0 );
?>
<div class="mgk-paynow">
	<div class="mgk-paynow__qr" aria-hidden="true">
		<svg viewBox="0 0 100 100" role="img" aria-label="PayNow QR placeholder">
			<rect width="100" height="100" fill="#fff"/>
			<?php
			$seed = crc32( $uen . '|' . $amount );
			for ( $y = 0; $y < 10; $y++ ) {
				for ( $x = 0; $x < 10; $x++ ) {
					if ( ( ( $seed >> ( ( $x * 3 + $y * 7 ) % 31 ) ) & 1 ) ) {
						printf( '<rect x="%d" y="%d" width="10" height="10" fill="#09090b"/>', $x * 10, $y * 10 );
					}
				}
			}
			?>
			<rect x="0" y="0" width="30" height="30" fill="none" stroke="#09090b" stroke-width="6"/>
			<rect x="70" y="0" width="30" height="30" fill="none" stroke="#09090b" stroke-width="6"/>
			<rect x="0" y="70" width="30" height="30" fill="none" stroke="#09090b" stroke-width="6"/>
		</svg>
		<span class="mgk-paynow__qrtag">PayNow</span>
	</div>
	<div class="mgk-paynow__info">
		<strong class="mgk-paynow__brand">Frictionless Scan &amp; Pay Now</strong>
		<p>Scan with DBS PayLah, OCBC Digital or UOB TMRW to pay <strong><?php echo wp_kses_post( mgk_price( $amount ) ); ?></strong> and lock your stock instantly.</p>
		<span class="mgk-paynow__uen">UEN Merchant Lock: <?php echo esc_html( $uen ); ?></span>
	</div>
</div>
