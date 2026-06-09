<?php
/**
 * S01 SEC3 — New Arrivals bento. Label = CONTENT, products = DATA.
 * Big horizontal card (col-span-2) + side card. Matches wireframe SEC3.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a        = isset( $args['a'] ) ? $args['a'] : array();
$products = isset( $args['products'] ) ? $args['products'] : array();
if ( ! $products ) { return; }

$big  = array_shift( $products );
$side = $products ? array_shift( $products ) : null;

$mgk_stock = function ( $p ) {
	if ( ! $p->is_in_stock() ) { return array( 'out', 'out of stock' ); }
	if ( $p->managing_stock() && null !== $p->get_stock_quantity() && $p->get_stock_quantity() <= 2 ) { return array( 'low', 'low in stock' ); }
	return array( 'in', 'in stock' );
};
$cat_name = function ( $p ) {
	$terms = get_the_terms( $p->get_id(), 'product_cat' );
	return ( $terms && ! is_wp_error( $terms ) ) ? strtoupper( end( $terms )->name ) : '';
};
?>
<section class="mgk-section mgk-bento">
	<div class="mgk-container">
		<h3 class="mgk-label mgk-label--accent mgk-bento__label"><?php echo esc_html( $a['heading'] ?? 'New Arrivals For You' ); ?></h3>
		<div class="mgk-bento__grid">

			<article class="mgk-bento__big">
				<button type="button" class="mgk-card__fav mgk-bento__fav" data-mgk-fav="<?php echo esc_attr( $big->get_id() ); ?>" aria-label="Wishlist">&#9825;</button>
				<div class="mgk-bento__big-row">
					<a href="<?php echo esc_url( get_permalink( $big->get_id() ) ); ?>" class="mgk-bento__big-img"><?php echo $big->get_image( 'woocommerce_thumbnail' ); ?></a>
					<div class="mgk-bento__big-info">
						<span class="mgk-card__brand"><?php echo esc_html( $cat_name( $big ) ); ?></span>
						<div class="mgk-bento__titlerow">
							<h4><a href="<?php echo esc_url( get_permalink( $big->get_id() ) ); ?>"><?php echo esc_html( $big->get_name() ); ?></a></h4>
							<?php $s = $mgk_stock( $big ); ?><span class="mgk-stock mgk-stock--<?php echo esc_attr( $s[0] ); ?>"><i></i><?php echo esc_html( $s[1] ); ?></span>
						</div>
						<p class="mgk-bento__desc"><?php echo esc_html( wp_trim_words( $big->get_short_description(), 16 ) ); ?></p>
					</div>
				</div>
				<div class="mgk-bento__big-foot">
					<span class="mgk-price"><?php echo wp_kses_post( $big->get_price_html() ); ?></span>
					<div class="mgk-card__actions">
						<button type="button" class="mgk-card__quick" data-mgk-quickview="<?php echo esc_attr( $big->get_id() ); ?>">Quick view</button>
						<?php $mgk_prev = $GLOBALS['product'] ?? null; $GLOBALS['product'] = $big; woocommerce_template_loop_add_to_cart(); $GLOBALS['product'] = $mgk_prev; ?>
					</div>
				</div>
			</article>

			<?php if ( $side ) : ?>
				<?php mgk_render_part( 'components/product-card', array( 'product' => $side ) ); ?>
			<?php endif; ?>
		</div>
	</div>
</section>
