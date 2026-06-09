<?php
/**
 * S13 — Login / Register page override.
 * Delegates to template-parts/auth/form-login.php which owns all HTML.
 * WooCommerce before/after hooks are preserved for plugin compatibility.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$redirect = function_exists( 'wc_get_page_permalink' )
	? wc_get_page_permalink( 'myaccount' )
	: home_url( '/my-account/' );
?>
<div class="mgk-container mgk-auth-page">
	<?php do_action( 'woocommerce_before_customer_login_form' ); ?>
	<?php mgk_render_part( 'auth/form-login', array( 'redirect' => $redirect ), true ); ?>
	<?php do_action( 'woocommerce_after_customer_login_form' ); ?>
</div>
