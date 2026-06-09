<?php
/**
 * S01 SEC5 — Top products carousel. Label = CONTENT, products = DATA.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a        = isset( $args['a'] ) ? $args['a'] : array();
$products = isset( $args['products'] ) ? $args['products'] : array();
if ( ! $products ) { return; }
?>
<section class="mgk-section mgk-toppicks">
	<div class="mgk-container">
		<h3 class="mgk-label mgk-toppicks__label"><?php echo esc_html( $a['heading'] ?? 'Top Products Carousel' ); ?></h3>
		<div class="mgk-grid mgk-grid--3">
			<?php foreach ( $products as $p ) : ?>
				<?php mgk_render_part( 'components/product-card', array( 'product' => $p ) ); ?>
			<?php endforeach; ?>
		</div>
	</div>
</section>
