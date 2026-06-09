<?php
/**
 * S03 — edition/colour variant selector (bordered buttons, active = dark).
 * Presentation only; per-edition SKU/stock is a DATA CORE extension.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$editions = $args['editions'] ?? array();
if ( ! $editions ) { return; }
?>
<div class="mgk-swatch" role="radiogroup" aria-label="Edition">
	<span class="mgk-swatch__label">Color Variant: <strong data-mgk-swatch-name><?php echo esc_html( $editions[0] ); ?></strong></span>
	<div class="mgk-swatch__opts">
		<?php foreach ( $editions as $i => $ed ) : ?>
			<button type="button" class="mgk-swatch__opt<?php echo 0 === $i ? ' is-active' : ''; ?>" data-mgk-swatch="<?php echo esc_attr( $ed ); ?>" role="radio" aria-checked="<?php echo 0 === $i ? 'true' : 'false'; ?>"><?php echo esc_html( $ed ); ?></button>
		<?php endforeach; ?>
	</div>
</div>
