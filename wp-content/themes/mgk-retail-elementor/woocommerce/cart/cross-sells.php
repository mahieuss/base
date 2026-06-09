<?php
/**
 * S04 SEC6 — "Pairs well with your cart" cross-sells, rendered with the MGK card.
 * Computes the cross-sell list the same way WooCommerce core does.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

$cross_sells = WC()->cart->get_cross_sells();
if ( empty( $cross_sells ) ) { return; }

$orderby  = isset( $orderby ) ? $orderby : 'rand';
$order    = isset( $order ) ? $order : 'desc';
$per_page = isset( $posts_per_page ) ? $posts_per_page : 4;

$products = array_filter( array_map( 'wc_get_product', $cross_sells ) );
$products = wc_products_array_orderby( $products, $orderby, $order );
$products = $per_page > 0 ? array_slice( $products, 0, $per_page ) : $products;
if ( empty( $products ) ) { return; }
?>
<section class="cross-sells mgk-crosssell">
	<h2>Pairs well with your cart</h2>
	<div class="mgk-prod-grid mgk-crosssell__grid">
		<?php foreach ( $products as $mgk_p ) :
			if ( $mgk_p instanceof WC_Product ) { mgk_render_part( 'components/product-card', array( 'product' => $mgk_p ) ); }
		endforeach; ?>
	</div>
</section>
