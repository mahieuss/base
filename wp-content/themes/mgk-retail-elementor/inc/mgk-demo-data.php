<?php
/**
 * Demo data seeder (DATA CORE). Creates WooCommerce products / categories / reviews
 * that match the RETAIL_SG wireframes. Run via: wp mgk-demo [--force]
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/** The demo catalogue (presentation-neutral data). */
function mgk_demo_catalogue() {
	return array(
		array( 'sku' => 'AEROX-PRO', 'name' => 'AERO-X Pro Wireless Headphones', 'price' => 499, 'cat' => 'Audio', 'brand' => 'Nexus', 'featured' => true, 'editions' => array( 'Noir', 'Silver' ),
			'short' => 'Premium active-noise-cancelling over-ear headphones. 48h battery, 40mm dynamic drivers.',
			'specs' => array( 'Driver' => '40mm Dynamic', 'Frequency' => '10Hz – 40kHz', 'Battery' => '48h (ANC on)', 'Connectivity' => 'Bluetooth 5.3', 'Weight' => '278g' ),
			'rating' => 4.9, 'reviews' => 7 ),
		array( 'sku' => 'ULTRA-PRO-X1', 'name' => 'Laptop Ultra Pro X1', 'price' => 2399, 'sale' => 1999, 'cat' => 'Laptops', 'brand' => 'TechPro', 'featured' => true,
			'short' => 'High-performance 14" laptop. OLED display, 32GB RAM, 1TB SSD.',
			'specs' => array( 'Display' => '14" OLED 3K', 'CPU' => 'Core Ultra 9', 'RAM' => '32GB', 'Storage' => '1TB SSD' ),
			'rating' => 4.8, 'reviews' => 5 ),
		array( 'sku' => 'KBD-QUIET', 'name' => 'Ultra-Quiet Mechanical Keyboard', 'price' => 159, 'sale' => 111, 'cat' => 'Accessories', 'brand' => 'Nexus',
			'short' => 'Silent tactile switches, aluminium frame, USB-C.', 'rating' => 4.7, 'reviews' => 3 ),
		array( 'sku' => 'MOUSE-VERT', 'name' => 'Vertical Ergonomic Mouse', 'price' => 79, 'sale' => 55, 'cat' => 'Accessories', 'brand' => 'TechPro',
			'short' => 'Wrist-friendly vertical design, wireless.', 'rating' => 4.6, 'reviews' => 2 ),
		array( 'sku' => 'SLEEVE-14', 'name' => 'Laptop Sleeve 14"', 'price' => 39, 'cat' => 'Accessories', 'brand' => 'Nexus', 'stock' => 0,
			'short' => 'Water-resistant felt sleeve.', 'rating' => 4.5, 'reviews' => 1 ),
		array( 'sku' => 'DESKPAD', 'name' => 'Felt Desk Pad', 'price' => 29, 'sale' => 20, 'cat' => 'Accessories', 'brand' => 'Nexus',
			'short' => 'Large felt desk mat.', 'rating' => 4.6, 'reviews' => 1 ),
		array( 'sku' => 'CABLE-USBC', 'name' => 'Braided USB-C Cable', 'price' => 19, 'cat' => 'Accessories', 'brand' => 'TechPro',
			'short' => '2m braided fast-charge cable.', 'rating' => 4.8, 'reviews' => 2 ),
		array( 'sku' => 'HP-STAND', 'name' => 'Aluminium Headphone Stand', 'price' => 45, 'cat' => 'Accessories', 'brand' => 'Nexus',
			'short' => 'Minimal aluminium headphone holder.', 'rating' => 4.7, 'reviews' => 1 ),
		array( 'sku' => 'CHAIR-V2', 'name' => 'Ergonomic Desk Chair V2', 'price' => 189, 'cat' => 'Furniture', 'brand' => 'TechPro',
			'short' => 'Mesh-back ergonomic office chair.', 'rating' => 4.4, 'reviews' => 2 ),
		array( 'sku' => 'CHRONO-WATCH', 'name' => 'Precision Chrono Watch', 'price' => 535, 'cat' => 'Accessories', 'brand' => 'Nexus',
			'short' => 'Stainless chronograph, sapphire glass.', 'rating' => 4.9, 'reviews' => 3 ),
	);
}

/** Ensure a product category term exists (child of Electronics where relevant). */
function mgk_demo_term( $name, $parent = 0 ) {
	$t = term_exists( $name, 'product_cat' );
	if ( ! $t ) { $t = wp_insert_term( $name, 'product_cat', array( 'parent' => $parent ) ); }
	return is_wp_error( $t ) ? 0 : (int) $t['term_id'];
}

/** Seed everything. Returns array of created/updated product IDs. */
function mgk_seed_demo_products( $force = false ) {
	if ( ! function_exists( 'wc_get_product' ) ) { return array(); }

	$electronics = mgk_demo_term( 'Electronics' );
	$created     = array();

	foreach ( mgk_demo_catalogue() as $row ) {
		// Idempotent by SKU.
		$existing = wc_get_product_id_by_sku( $row['sku'] );
		if ( $existing && ! $force ) { $created[] = $existing; continue; }

		$cat_id = mgk_demo_term( $row['cat'], $electronics );

		$product = $existing ? wc_get_product( $existing ) : new WC_Product_Simple();
		$product->set_name( $row['name'] );
		$product->set_sku( $row['sku'] );
		$product->set_status( 'publish' );
		$product->set_catalog_visibility( 'visible' );
		$product->set_regular_price( (string) $row['price'] );
		if ( isset( $row['sale'] ) ) { $product->set_sale_price( (string) $row['sale'] ); }
		$product->set_short_description( isset( $row['short'] ) ? $row['short'] : '' );
		$product->set_description( ( isset( $row['short'] ) ? $row['short'] : '' ) . ' Backed by RETAIL_SG next-day delivery.' );
		$product->set_featured( ! empty( $row['featured'] ) );
		$product->set_category_ids( array_filter( array( $electronics, $cat_id ) ) );

		// Stock.
		if ( isset( $row['stock'] ) ) {
			$product->set_manage_stock( true );
			$product->set_stock_quantity( (int) $row['stock'] );
			$product->set_stock_status( $row['stock'] > 0 ? 'instock' : 'outofstock' );
		} else {
			$product->set_stock_status( 'instock' );
		}

		$pid = $product->save();

		// Presentation/specs as meta read by the PDP shell (DATA, edited in wp-admin).
		if ( isset( $row['specs'] ) ) { update_post_meta( $pid, '_mgk_specs', wp_json_encode( $row['specs'] ) ); }
		if ( isset( $row['editions'] ) ) { update_post_meta( $pid, '_mgk_editions', wp_json_encode( $row['editions'] ) ); }

		// Brand → native product_brand taxonomy (filter options come from here, not hardcoded).
		if ( isset( $row['brand'] ) && taxonomy_exists( 'product_brand' ) ) {
			$bt = term_exists( $row['brand'], 'product_brand' );
			if ( ! $bt ) { $bt = wp_insert_term( $row['brand'], 'product_brand' ); }
			if ( ! is_wp_error( $bt ) ) { wp_set_object_terms( $pid, (int) $bt['term_id'], 'product_brand' ); }
			update_post_meta( $pid, '_mgk_brand', $row['brand'] ); // convenience mirror for card display
		}

		// Demo reviews → drive the average rating.
		if ( ! empty( $row['reviews'] ) ) {
			mgk_demo_reviews( $pid, $row['name'], isset( $row['rating'] ) ? $row['rating'] : 5, (int) $row['reviews'] );
		}

		$created[] = $pid;
	}

	// Cross-sells ("Pairs well with your cart") — accessories paired to big-ticket items.
	$by_sku = array();
	foreach ( array( 'AEROX-PRO', 'ULTRA-PRO-X1', 'KBD-QUIET', 'HP-STAND', 'DESKPAD', 'CABLE-USBC', 'MOUSE-VERT', 'SLEEVE-14' ) as $sku ) {
		$by_sku[ $sku ] = wc_get_product_id_by_sku( $sku );
	}
	$pairs = array(
		'AEROX-PRO'    => array( 'HP-STAND', 'CABLE-USBC' ),
		'ULTRA-PRO-X1' => array( 'SLEEVE-14', 'MOUSE-VERT', 'CABLE-USBC' ),
		'KBD-QUIET'    => array( 'DESKPAD', 'MOUSE-VERT' ),
	);
	foreach ( $pairs as $sku => $cross ) {
		if ( empty( $by_sku[ $sku ] ) ) { continue; }
		$p = wc_get_product( $by_sku[ $sku ] );
		if ( ! $p ) { continue; }
		$ids = array_values( array_filter( array_map( function ( $s ) use ( $by_sku ) { return $by_sku[ $s ] ?? 0; }, $cross ) ) );
		$p->set_cross_sell_ids( $ids );
		$p->save();
	}

	// Demo coupon FIRST10 (10% off) seen in the cart wireframe.
	if ( ! wc_get_coupon_id_by_code( 'FIRST10' ) ) {
		$coupon = new WC_Coupon();
		$coupon->set_code( 'FIRST10' );
		$coupon->set_discount_type( 'percent' );
		$coupon->set_amount( 10 );
		$coupon->set_description( 'First order 10% off' );
		$coupon->save();
	}

	return $created;
}

/** Create N approved reviews to reach an average close to $target. */
function mgk_demo_reviews( $product_id, $name, $target, $count ) {
	// Avoid duplicating on re-run.
	$have = get_comments( array( 'post_id' => $product_id, 'type' => 'review', 'count' => true ) );
	if ( $have >= $count ) { return; }

	$blurbs = array( 'Excellent build quality, exactly as described.', 'Fast next-day delivery in Singapore. Very happy.', 'Great value during the National Day sale.', 'Works perfectly, would recommend.', 'Premium feel, worth every cent.', 'Solid performance and clean design.', 'Impressed with the experience overall.' );
	$names  = array( 'Jonathan Tan', 'Mei Ling', 'Arjun K.', 'Siti R.', 'Wei Jie', 'Priya N.', 'Marcus Tan' );

	for ( $i = $have; $i < $count; $i++ ) {
		$stars = max( 1, min( 5, (int) round( $target ) - ( 0 === $i % 4 ? 1 : 0 ) ) );
		$cid   = wp_insert_comment( array(
			'comment_post_ID'      => $product_id,
			'comment_author'       => $names[ $i % count( $names ) ],
			'comment_author_email' => 'reviewer' . $i . '@example.sg',
			'comment_content'      => $blurbs[ $i % count( $blurbs ) ],
			'comment_type'         => 'review',
			'comment_approved'     => 1,
		) );
		if ( $cid ) {
			add_comment_meta( $cid, 'rating', $stars );
			add_comment_meta( $cid, 'verified', 1 );
		}
	}
	if ( function_exists( 'WC' ) ) {
		WC_Comments::clear_transients( $product_id );
	}
}

/* WP-CLI: wp mgk-demo [--force] */
if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command( 'mgk-demo', function ( $args, $assoc ) {
		$ids = mgk_seed_demo_products( isset( $assoc['force'] ) );
		WP_CLI::success( 'Seeded ' . count( $ids ) . ' products: ' . implode( ', ', $ids ) );
	} );
}
