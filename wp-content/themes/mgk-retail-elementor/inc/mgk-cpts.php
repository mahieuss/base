<?php
/**
 * Custom post types for non-Woo data (DATA CORE, edited in wp-admin).
 * mg_store powers the later Store Locator (S10); registered now as foundation.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

add_action( 'init', function () {
	register_post_type( 'mg_store', array(
		'labels'       => array(
			'name'          => __( 'Stores', 'mgk-retail' ),
			'singular_name' => __( 'Store', 'mgk-retail' ),
			'add_new_item'  => __( 'Add New Store', 'mgk-retail' ),
			'edit_item'     => __( 'Edit Store', 'mgk-retail' ),
		),
		'public'       => true,
		'show_in_menu' => true,
		'menu_icon'    => 'dashicons-store',
		'supports'     => array( 'title', 'editor', 'thumbnail' ),
		'has_archive'  => false,
		'rewrite'      => array( 'slug' => 'stores' ),
		'show_in_rest' => true,
	) );
} );
