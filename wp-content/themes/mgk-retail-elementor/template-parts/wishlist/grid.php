<?php
/**
 * S11 — Wishlist grid + recommendations.
 * Shell: $args['a']. DATA: $args['products'] = WC_Product[]. $args['rec_products'] = WC_Product[].
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a            = isset( $args['a'] )            ? $args['a']            : array();
$products     = isset( $args['products'] )     ? $args['products']     : array();
$rec_products = isset( $args['rec_products'] ) ? $args['rec_products'] : array();

$nonce    = wp_create_nonce( 'mgk_wishlist' );
$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$ajax_url = admin_url( 'admin-ajax.php' );
?>
<div class="mgk-container mgk-wishlist"
	 data-mgk-wishlist
	 data-nonce="<?php echo esc_attr( $nonce ); ?>"
	 data-ajax="<?php echo esc_url( $ajax_url ); ?>">

	<header class="mgk-page-header">
		<h1><?php echo esc_html( isset( $a['heading'] ) ? $a['heading'] : '' ); ?></h1>
		<p><?php echo esc_html( isset( $a['sub'] ) ? $a['sub'] : '' ); ?></p>
	</header>

	<!-- SEC1 + SEC2 — Saved items grid with conditional action states -->
	<?php if ( empty( $products ) ) : ?>
		<div class="mgk-wishlist__empty">
			<span aria-hidden="true">&#9825;</span>
			<p>Your wishlist is empty.</p>
			<a class="mgk-btn mgk-btn--primary" href="<?php echo esc_url( $shop_url ); ?>">Start Shopping</a>
		</div>
	<?php else : ?>
		<ul class="mgk-wishlist__grid">
			<?php foreach ( $products as $product ) :
				if ( ! $product instanceof WC_Product ) { continue; }
				$pid  = $product->get_id();
				$link = get_permalink( $pid );

				$state = 'in';
				if ( ! $product->is_in_stock() ) {
					$state = 'out';
				} elseif ( $product->managing_stock() ) {
					$qty = $product->get_stock_quantity();
					$low = (int) get_option( 'woocommerce_notify_low_stock_amount', 2 );
					if ( null !== $qty && $qty <= max( 1, $low ) ) { $state = 'low'; }
				}
				$stock_labels = array( 'in' => 'In Stock', 'low' => 'Low Stock', 'out' => 'Out of Stock' );
			?>
				<li class="mgk-wishlist__item" data-product-id="<?php echo esc_attr( $pid ); ?>">
					<div class="mgk-wishlist__media">
						<a href="<?php echo esc_url( $link ); ?>">
							<?php echo $product->get_image( 'woocommerce_thumbnail', array( 'class' => 'mgk-wishlist__img', 'loading' => 'lazy' ) ); ?>
						</a>
					</div>
					<div class="mgk-wishlist__info">
						<h3 class="mgk-wishlist__name">
							<a href="<?php echo esc_url( $link ); ?>"><?php echo esc_html( $product->get_name() ); ?></a>
						</h3>
						<span class="mgk-stock mgk-stock--<?php echo esc_attr( $state ); ?>">
							<i></i><?php echo esc_html( $stock_labels[ $state ] ); ?>
						</span>
						<span class="mgk-price"><?php echo wp_kses_post( $product->get_price_html() ); ?></span>
					</div>
					<div class="mgk-wishlist__actions">
						<?php if ( 'out' !== $state ) : ?>
							<?php
							$mgk_prev = isset( $GLOBALS['product'] ) ? $GLOBALS['product'] : null;
							$GLOBALS['product'] = $product;
							woocommerce_template_loop_add_to_cart( array( 'class' => 'mgk-btn mgk-btn--primary mgk-btn--sm' ) );
							$GLOBALS['product'] = $mgk_prev;
							?>
						<?php else : ?>
							<button type="button" class="mgk-btn mgk-btn--primary mgk-btn--sm" disabled aria-disabled="true">Out of Stock</button>
							<a class="mgk-btn mgk-btn--ghost mgk-btn--sm"
							   href="<?php echo esc_url( add_query_arg( 'notify', $pid, $link ) ); ?>">Notify Me</a>
						<?php endif; ?>
						<button type="button"
								class="mgk-wishlist__remove"
								data-mgk-wishlist-remove="<?php echo esc_attr( $pid ); ?>"
								aria-label="Remove <?php echo esc_attr( $product->get_name() ); ?> from wishlist">
							&#215;
						</button>
					</div>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>

	<!-- SEC3 — Recommended for You -->
	<?php if ( ! empty( $rec_products ) ) : ?>
		<section class="mgk-wishlist__recs">
			<h2><?php echo esc_html( isset( $a['rec_heading'] ) ? $a['rec_heading'] : 'Recommended for You' ); ?></h2>
			<div class="mgk-wishlist__rec-grid">
				<?php foreach ( $rec_products as $rp ) :
					if ( $rp instanceof WC_Product ) {
						mgk_render_part( 'components/product-card', array( 'product' => $rp ), true );
					}
				endforeach; ?>
			</div>
		</section>
	<?php endif; ?>

</div>
