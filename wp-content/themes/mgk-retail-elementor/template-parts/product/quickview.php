<?php
/**
 * Quick-view modal content (DATA presentation from WooCommerce).
 * Expects $args['product'] = WC_Product.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$product = isset( $args['product'] ) ? $args['product'] : null;
if ( ! $product instanceof WC_Product ) { return; }
$pid = $product->get_id();
?>
<div class="mgk-qv">
	<div class="mgk-qv__media"><?php echo $product->get_image( 'woocommerce_single' ); ?></div>
	<div class="mgk-qv__body">
		<?php $brand = get_post_meta( $pid, '_mgk_brand', true ); if ( $brand ) : ?>
			<span class="mgk-card__brand"><?php echo esc_html( $brand ); ?></span>
		<?php endif; ?>
		<h3 class="mgk-qv__title"><?php echo esc_html( $product->get_name() ); ?></h3>
		<div class="mgk-qv__rating"><?php echo mgk_stars( $product->get_average_rating() ); ?> <span><?php echo esc_html( number_format( (float) $product->get_average_rating(), 1 ) ); ?></span></div>
		<div class="mgk-qv__price"><?php echo wp_kses_post( $product->get_price_html() ); ?></div>
		<p class="mgk-qv__desc"><?php echo esc_html( wp_trim_words( $product->get_short_description(), 30 ) ); ?></p>
		<div class="mgk-qv__actions">
			<?php
			$mgk_prev_global = isset( $GLOBALS['product'] ) ? $GLOBALS['product'] : null;
			$GLOBALS['product'] = $product;
			woocommerce_template_loop_add_to_cart( array( 'class' => 'button alt' ) );
			$GLOBALS['product'] = $mgk_prev_global;
			?>
			<a class="mgk-btn mgk-btn--ghost" href="<?php echo esc_url( get_permalink( $pid ) ); ?>">Full details</a>
		</div>
	</div>
</div>
<style>
.mgk-qv{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.mgk-qv__media img{border-radius:var(--mgk-radius)}
.mgk-qv__title{margin:6px 0;font-size:1.3rem;color:var(--mgk-ink)}
.mgk-qv__price{font-weight:800;font-size:1.2rem;margin:8px 0}
.mgk-qv__desc{color:var(--mgk-fg-muted);font-size:.92rem}
.mgk-qv__actions{display:flex;gap:10px;align-items:center;margin-top:12px;flex-wrap:wrap}
@media(max-width:560px){.mgk-qv{grid-template-columns:1fr}}
</style>
