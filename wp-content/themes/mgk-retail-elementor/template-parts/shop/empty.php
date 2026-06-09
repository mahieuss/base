<?php
/**
 * S02 — empty results / no matches state.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$has_filters = ! empty( $args['has_filters'] );
$shop        = $args['shop'] ?? '';
?>
<div class="mgk-shop__empty">
	<h2>No matches found</h2>
	<?php if ( $has_filters ) : ?>
		<p>Try widening your filters &mdash; your current selection is a little too specific.</p>
		<a class="mgk-btn mgk-btn--primary" href="<?php echo esc_url( $shop ); ?>">Clear all filters</a>
	<?php else : ?>
		<p>There are no products to show here yet.</p>
		<a class="mgk-btn mgk-btn--primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">Back to home</a>
	<?php endif; ?>
</div>
