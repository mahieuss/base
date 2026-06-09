<?php
/**
 * S02 SEC2 — advanced filter sidebar (DATA-SHELL).
 * Labels are static (editable upstream); OPTIONS come from taxonomies. The form
 * submits GET params consumed by the locked query filter.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$labels = $args['labels'] ?? array();
$brands = $args['brands'] ?? array();
$cats   = $args['cats'] ?? array();
$sel    = $args['sel'] ?? array();
$shop   = $args['shop'] ?? '';
?>
<form class="mgk-filter" method="get" action="<?php echo esc_url( $shop ); ?>">
	<div class="mgk-filter__head">
		<h2 class="mgk-filter__title"><?php echo esc_html( $labels['title'] ); ?></h2>
		<a class="mgk-filter__clear" href="<?php echo esc_url( $shop ); ?>"><?php echo esc_html( $labels['clear'] ); ?></a>
	</div>

	<div class="mgk-filter__group">
		<h3><?php echo esc_html( $labels['price'] ); ?></h3>
		<div class="mgk-filter__price">
			<input type="number" name="min_price" inputmode="numeric" min="0" placeholder="Min" value="<?php echo esc_attr( $sel['min_price'] ?? '' ); ?>">
			<span>&ndash;</span>
			<input type="number" name="max_price" inputmode="numeric" min="0" placeholder="Max" value="<?php echo esc_attr( $sel['max_price'] ?? '' ); ?>">
		</div>
	</div>

	<?php if ( $brands ) : ?>
	<div class="mgk-filter__group">
		<h3><?php echo esc_html( $labels['brand'] ); ?></h3>
		<?php foreach ( $brands as $b ) : ?>
			<label class="mgk-filter__check">
				<input type="checkbox" name="brand[]" value="<?php echo esc_attr( $b->slug ); ?>" <?php checked( in_array( $b->slug, (array) ( $sel['brand'] ?? array() ), true ) ); ?>>
				<span><?php echo esc_html( $b->name ); ?></span>
				<em><?php echo esc_html( $b->count ); ?></em>
			</label>
		<?php endforeach; ?>
	</div>
	<?php endif; ?>

	<div class="mgk-filter__group">
		<h3><?php echo esc_html( $labels['rating'] ); ?></h3>
		<?php for ( $r = 5; $r >= 3; $r-- ) : ?>
			<label class="mgk-filter__check">
				<input type="radio" name="min_rating" value="<?php echo esc_attr( $r ); ?>" <?php checked( (int) ( $sel['min_rating'] ?? 0 ), $r ); ?>>
				<span class="mgk-stars"><?php echo str_repeat( '&#9733;', $r ) . str_repeat( '<span class="mgk-star-empty">&#9733;</span>', 5 - $r ); ?></span>
				<em>&amp; up</em>
			</label>
		<?php endfor; ?>
	</div>

	<?php if ( $cats ) : ?>
	<div class="mgk-filter__group">
		<h3><?php echo esc_html( $labels['cat'] ); ?></h3>
		<?php foreach ( $cats as $c ) : ?>
			<a class="mgk-filter__cat" href="<?php echo esc_url( get_term_link( $c ) ); ?>"><?php echo esc_html( $c->name ); ?> <em><?php echo esc_html( $c->count ); ?></em></a>
		<?php endforeach; ?>
	</div>
	<?php endif; ?>

	<button type="submit" class="mgk-btn mgk-btn--primary mgk-btn--block mgk-filter__apply"><?php echo esc_html( $labels['apply'] ); ?></button>
</form>
