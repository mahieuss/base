<?php
/**
 * Product card (DATA card) — matches the UIandpromt wireframe card exactly:
 * image · (title + stock) · price line · [Quick View full-width] [Add icon].
 * Presentation only; content from WooCommerce. $args['product'] = WC_Product.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

$product = isset( $args['product'] ) ? $args['product'] : null;
if ( ! $product instanceof WC_Product ) { return; }

$pid     = $product->get_id();
$link    = get_permalink( $pid );
$on_sale = $product->is_on_sale();

$state = 'in';
if ( ! $product->is_in_stock() ) {
	$state = 'out';
} elseif ( $product->managing_stock() ) {
	$qty = $product->get_stock_quantity();
	$low = (int) get_option( 'woocommerce_notify_low_stock_amount', 2 );
	if ( null !== $qty && $qty <= max( 1, $low ) ) { $state = 'low'; }
}
$state_label = array( 'in' => 'in stock', 'low' => 'low in stock', 'out' => 'out of stock' );

$pct = 0;
if ( $on_sale ) {
	$reg = (float) $product->get_regular_price();
	$sal = (float) $product->get_sale_price();
	if ( $reg > 0 && $sal > 0 ) { $pct = (int) round( ( ( $reg - $sal ) / $reg ) * 100 ); }
}
?>
<article class="mgk-card<?php echo 'out' === $state ? ' is-out' : ''; ?>" data-product-id="<?php echo esc_attr( $pid ); ?>">
	<div class="mgk-card__media">
		<a href="<?php echo esc_url( $link ); ?>" class="mgk-card__imglink"><?php echo $product->get_image( 'woocommerce_thumbnail', array( 'class' => 'mgk-card__img', 'loading' => 'lazy' ) ); ?></a>
		<?php if ( $pct > 0 ) : ?><span class="mgk-card__flag">-<?php echo esc_html( $pct ); ?>%</span><?php endif; ?>
		<button type="button" class="mgk-card__fav" data-mgk-fav="<?php echo esc_attr( $pid ); ?>" aria-label="Add to wishlist">&#9825;</button>
	</div>

	<div class="mgk-card__body">
		<div class="mgk-card__titlerow">
			<h3 class="mgk-card__title"><a href="<?php echo esc_url( $link ); ?>"><?php echo esc_html( $product->get_name() ); ?></a></h3>
			<span class="mgk-stock mgk-stock--<?php echo esc_attr( $state ); ?>"><i></i><?php echo esc_html( $state_label[ $state ] ); ?></span>
		</div>

		<span class="mgk-price mgk-card__price"><?php echo wp_kses_post( $product->get_price_html() ); ?></span>

		<div class="mgk-card__actions">
			<button type="button" class="mgk-card__quick" data-mgk-quickview="<?php echo esc_attr( $pid ); ?>">Quick view</button>
			<?php
			$mgk_prev = isset( $GLOBALS['product'] ) ? $GLOBALS['product'] : null;
			$GLOBALS['product'] = $product;
			woocommerce_template_loop_add_to_cart();
			$GLOBALS['product'] = $mgk_prev;
			?>
		</div>
	</div>
</article>
