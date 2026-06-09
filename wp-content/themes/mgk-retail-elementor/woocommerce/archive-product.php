<?php
/**
 * S02 — Shop / search archive override. Two-column: filter sidebar | results grid.
 * Query + filtering = DATA CORE (inc/mgk-search-render.php). This file is the shell.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

get_header( 'shop' );
?>
<div class="mgk-container mgk-shop">

	<?php if ( function_exists( 'mgk_render_shop_toolbar' ) ) { mgk_render_shop_toolbar(); } ?>

	<div class="mgk-shop__layout">
		<aside class="mgk-shop__side">
			<?php if ( function_exists( 'mgk_render_shop_sidebar' ) ) { mgk_render_shop_sidebar(); } ?>
		</aside>

		<div class="mgk-shop__results">
			<?php if ( woocommerce_product_loop() ) : ?>
				<div class="mgk-prod-grid">
					<?php
					while ( have_posts() ) {
						the_post();
						$mgk_p = wc_get_product( get_the_ID() );
						if ( $mgk_p ) { mgk_render_part( 'components/product-card', array( 'product' => $mgk_p ) ); }
					}
					?>
				</div>
				<?php woocommerce_pagination(); ?>
			<?php else : ?>
				<?php
				mgk_render_part( 'shop/empty', array(
					'has_filters' => function_exists( 'mgk_shop_has_filters' ) ? mgk_shop_has_filters() : false,
					'shop'        => wc_get_page_permalink( 'shop' ),
				) );
				?>
			<?php endif; ?>
		</div>
	</div>
</div>
<?php
get_footer( 'shop' );
