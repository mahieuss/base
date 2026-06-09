<?php
/**
 * S11 Wishlist — [mgk_wishlist] shortcode + AJAX toggle.
 * DATA: product IDs stored in user meta _mgk_wishlist.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/** Return wishlist product IDs for a user. */
function mgk_get_wishlist( $user_id = 0 ) {
	$uid = $user_id ? (int) $user_id : get_current_user_id();
	if ( ! $uid ) { return array(); }
	$ids = get_user_meta( $uid, '_mgk_wishlist', true );
	return is_array( $ids ) ? array_map( 'absint', $ids ) : array();
}

/** Toggle a product in / out of the current user's wishlist. Returns new saved state. */
function mgk_toggle_wishlist( $product_id ) {
	$uid = get_current_user_id();
	if ( ! $uid ) { return false; }
	$ids = mgk_get_wishlist( $uid );
	$idx = array_search( (int) $product_id, $ids, true );
	if ( false !== $idx ) {
		array_splice( $ids, $idx, 1 );
		$state = false;
	} else {
		$ids[] = (int) $product_id;
		$state = true;
	}
	update_user_meta( $uid, '_mgk_wishlist', array_values( $ids ) );
	return $state;
}

/** AJAX: toggle wishlist item (logged-in only). */
add_action( 'wp_ajax_mgk_toggle_wishlist', function () {
	check_ajax_referer( 'mgk_wishlist', 'nonce' );
	$pid = isset( $_POST['product_id'] ) ? absint( $_POST['product_id'] ) : 0;
	if ( ! $pid ) { wp_send_json_error(); }
	$saved = mgk_toggle_wishlist( $pid );
	wp_send_json_success( array( 'saved' => $saved, 'count' => count( mgk_get_wishlist() ) ) );
} );

add_shortcode( 'mgk_wishlist', function ( $atts ) {
	$a = shortcode_atts( array(
		'heading'     => 'My Wishlist',
		'sub'         => 'Items you\'ve saved for later.',
		'rec_heading' => 'Recommended for You',
	), $atts, 'mgk_wishlist' );

	$ids      = mgk_get_wishlist();
	$products = array();
	if ( ! empty( $ids ) && function_exists( 'wc_get_product' ) ) {
		foreach ( $ids as $id ) {
			$p = wc_get_product( $id );
			if ( $p ) { $products[] = $p; }
		}
	}

	$rec_products = function_exists( 'mgk_query_products' )
		? mgk_query_products( array( 'limit' => 4, 'orderby' => 'popularity', 'exclude' => $ids ) )
		: array();

	return mgk_render_part( 'wishlist/grid', array( 'a' => $a, 'products' => $products, 'rec_products' => $rec_products ), false );
} );
