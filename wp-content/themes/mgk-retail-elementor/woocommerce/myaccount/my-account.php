<?php
/**
 * S12 — My Account / Membership Hub page wrapper.
 * Navigation uses standard WooCommerce endpoint links.
 * The dashboard endpoint content is replaced by our profile-header +
 * order-status-grid + utilities partials via the woocommerce_account_dashboard
 * hook registered in mgk-profile-render.php.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?>
<div class="mgk-container mgk-account">
	<nav class="mgk-account__nav" aria-label="Account navigation">
		<?php do_action( 'woocommerce_account_navigation' ); ?>
	</nav>
	<div class="mgk-account__content">
		<?php do_action( 'woocommerce_account_content' ); ?>
	</div>
</div>
