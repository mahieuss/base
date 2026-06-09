<?php
/**
 * S02 SEC1 — results summary + sort. Sort uses Woo's orderby (DATA CORE).
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$term  = $args['term'] ?? '';
$first = (int) ( $args['first'] ?? 0 );
$last  = (int) ( $args['last'] ?? 0 );
$total = (int) ( $args['total'] ?? 0 );
?>
<div class="mgk-shop__toolbar">
	<div class="mgk-shop__summary">
		<h1 class="mgk-shop__title"><?php echo esc_html( $term ); ?></h1>
		<p class="mgk-shop__count">Showing <strong><?php echo esc_html( $first ); ?>&ndash;<?php echo esc_html( $last ); ?></strong> of <strong><?php echo esc_html( $total ); ?></strong> results</p>
	</div>
	<div class="mgk-shop__sort">
		<?php woocommerce_catalog_ordering(); ?>
	</div>
</div>
