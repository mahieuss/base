<?php
/**
 * S03 — Single product (PDP) content override. Layout shell; price / variations /
 * stock / cart / reviews stay WooCommerce (DATA CORE).
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

global $product;
if ( empty( $product ) || ! $product->is_visible() ) { return; }
?>
<div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'mgk-pdp', $product ); ?>>

	<nav class="mgk-pdp__breadcrumb"><?php woocommerce_breadcrumb(); ?></nav>

	<div class="mgk-pdp__top">
		<div class="mgk-pdp__gallery">
			<?php
			// Sale / sold-out flags + Woo gallery (zoom/lightbox/slider).
			do_action( 'woocommerce_before_single_product_summary' );
			?>
		</div>

		<div class="summary entry-summary mgk-pdp__summary">
			<?php $brand = get_post_meta( $product->get_id(), '_mgk_brand', true ); ?>
			<?php if ( $brand ) : ?><span class="mgk-pcard__brand"><?php echo esc_html( $brand ); ?></span><?php endif; ?>

			<?php woocommerce_template_single_title(); ?>
			<?php woocommerce_template_single_rating(); ?>
			<?php woocommerce_template_single_price(); ?>
			<?php woocommerce_template_single_excerpt(); ?>

			<?php mgk_render_pdp_swatches( $product ); ?>

			<?php woocommerce_template_single_add_to_cart(); ?>

			<?php mgk_render_pdp_delivery(); ?>

			<?php woocommerce_template_single_meta(); ?>
		</div>
	</div>

	<div class="mgk-pdp__lower">
		<div class="mgk-pdp__details">
			<?php mgk_render_pdp_specs( $product ); ?>
		</div>
		<div class="mgk-pdp__reviews">
			<?php
			if ( comments_open() || get_comments_number() ) {
				comments_template(); // WooCommerce swaps in its product reviews template.
			}
			?>
		</div>
	</div>

	<?php
	// Related / up-sells via standard hook (kept, styled by our grid).
	do_action( 'woocommerce_after_single_product_summary' );
	?>
</div>
