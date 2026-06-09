<?php
/**
 * S13 Auth — presentation layer on top of WooCommerce login/register.
 * The bulk of the HTML lives in woocommerce/myaccount/form-login.php (our override)
 * and template-parts/auth/form-login.php. This file handles ancillary hooks only.
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }
if ( ! class_exists( 'WooCommerce' ) ) { return; }

/** Branded page title on the unauthenticated My Account screen (SEC1). */
add_filter( 'the_title', function ( $title, $id ) {
	if ( ! in_the_loop() ) { return $title; }
	$login_id = (int) get_option( 'woocommerce_myaccount_page_id' );
	if ( $login_id && (int) $id === $login_id && ! is_user_logged_in() ) {
		return 'Sign In to RETAIL_SG';
	}
	return $title;
}, 10, 2 );
