<?php
/**
 * S02 Search / Shop — DATA CORE filtering + DATA-SHELL sidebar/toolbar render.
 * Filter logic (query) is locked in PHP; the shell (labels, which filters show) is
 * presentation. Filter OPTIONS come from taxonomies (never hardcoded).
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ---- DATA CORE: apply filters to the shop product query ---- */
add_action( 'woocommerce_product_query', function ( $q ) {
	$tax  = (array) $q->get( 'tax_query' );
	$meta = (array) $q->get( 'meta_query' );

	if ( ! empty( $_GET['brand'] ) ) {
		$brands = array_map( 'sanitize_title', (array) $_GET['brand'] );
		$tax[]  = array( 'taxonomy' => 'product_brand', 'field' => 'slug', 'terms' => $brands );
	}
	$min = isset( $_GET['min_price'] ) && '' !== $_GET['min_price'] ? floatval( $_GET['min_price'] ) : null;
	$max = isset( $_GET['max_price'] ) && '' !== $_GET['max_price'] ? floatval( $_GET['max_price'] ) : null;
	if ( null !== $min ) { $meta[] = array( 'key' => '_price', 'value' => $min, 'compare' => '>=', 'type' => 'NUMERIC' ); }
	if ( null !== $max ) { $meta[] = array( 'key' => '_price', 'value' => $max, 'compare' => '<=', 'type' => 'NUMERIC' ); }
	if ( ! empty( $_GET['min_rating'] ) ) {
		$meta[] = array( 'key' => '_wc_average_rating', 'value' => floatval( $_GET['min_rating'] ), 'compare' => '>=', 'type' => 'DECIMAL' );
	}

	if ( $tax ) { $q->set( 'tax_query', $tax ); }
	if ( $meta ) { $q->set( 'meta_query', $meta ); }
} );

/** Are any filters active? (drives the "Clear all" / empty-state copy.) */
function mgk_shop_has_filters() {
	foreach ( array( 'brand', 'min_price', 'max_price', 'min_rating' ) as $k ) {
		if ( isset( $_GET[ $k ] ) && '' !== $_GET[ $k ] ) { return true; }
	}
	return false;
}

/** DATA-SHELL: filter sidebar (options from taxonomies). */
function mgk_render_shop_sidebar( $labels = array() ) {
	$labels = wp_parse_args( $labels, array(
		'title'  => 'Vetting Filters',
		'price'  => 'Price Range (SGD)',
		'brand'  => 'Corporate Brand',
		'rating' => 'Customer Reviews',
		'cat'    => 'Category',
		'apply'  => 'Apply Filters',
		'clear'  => 'Clear all',
	) );

	$brands = get_terms( array( 'taxonomy' => 'product_brand', 'hide_empty' => true ) );
	$cats   = get_terms( array( 'taxonomy' => 'product_cat', 'hide_empty' => true, 'exclude' => array( get_option( 'default_product_cat' ) ) ) );

	mgk_render_part( 'shop/filter-sidebar', array(
		'labels'  => $labels,
		'brands'  => is_wp_error( $brands ) ? array() : $brands,
		'cats'    => is_wp_error( $cats ) ? array() : $cats,
		'shop'    => wc_get_page_permalink( 'shop' ),
		'sel'     => array(
			'brand'      => isset( $_GET['brand'] ) ? array_map( 'sanitize_title', (array) $_GET['brand'] ) : array(),
			'min_price'  => isset( $_GET['min_price'] ) ? esc_attr( $_GET['min_price'] ) : '',
			'max_price'  => isset( $_GET['max_price'] ) ? esc_attr( $_GET['max_price'] ) : '',
			'min_rating' => isset( $_GET['min_rating'] ) ? (int) $_GET['min_rating'] : 0,
		),
	), true );
}

/** DATA-SHELL: results header + sort. */
function mgk_render_shop_toolbar() {
	global $wp_query;
	$total   = (int) $wp_query->found_posts;
	$per     = (int) $wp_query->get( 'posts_per_page' );
	$paged   = max( 1, (int) $wp_query->get( 'paged' ) );
	$first   = $total ? ( ( $paged - 1 ) * $per ) + 1 : 0;
	$last    = min( $total, $paged * $per );
	$term    = is_search() ? get_search_query() : ( is_tax() ? single_term_title( '', false ) : 'All products' );

	mgk_render_part( 'shop/toolbar', array(
		'term'  => $term,
		'first' => $first,
		'last'  => $last,
		'total' => $total,
	), true );
}
