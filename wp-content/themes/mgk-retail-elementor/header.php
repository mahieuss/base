<?php
/**
 * Global header chrome (overrides Hello Elementor): National Day ribbon + RETAIL_SG bar.
 * Matches the UIandpromt wireframe (renderTopNotificationRibbon + renderGlobalHeader).
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

$cart_count = ( function_exists( 'WC' ) && WC()->cart ) ? WC()->cart->get_cart_contents_count() : 0;
$cart_url   = function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : home_url( '/cart/' );
$shop_url   = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$account    = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : home_url( '/my-account/' );
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'mgk-body' ); ?>>
<?php wp_body_open(); ?>

<div class="mgk-ribbon">
	<div class="mgk-container mgk-ribbon__row">
		<span class="mgk-ribbon__msg">&#10024; Singapore National Day Special Sale: Up to 58% Off</span>
		<span class="mgk-ribbon__aside">
			<span>Secure Encrypted Checkouts Active</span>
			<span>Support: 1800 1234 (SGP-Zone)</span>
		</span>
	</div>
</div>

<header class="mgk-header">
	<div class="mgk-container mgk-header__row">
		<div class="mgk-header__brand-wrap">
			<a class="mgk-header__brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<span class="mgk-header__logo" aria-hidden="true">&#128722;</span>
				<span class="mgk-header__name"><?php echo esc_html( get_bloginfo( 'name' ) ? 'RETAIL_SG' : 'RETAIL_SG' ); ?></span>
				<span class="mgk-header__tag">SGP-OUTLET</span>
			</a>
			<nav class="mgk-header__nav">
				<a href="<?php echo esc_url( $shop_url ); ?>">Electronics</a>
				<a href="<?php echo esc_url( $shop_url ); ?>">Fashion</a>
				<a class="is-sale" href="<?php echo esc_url( add_query_arg( 'on_sale', '1', $shop_url ) ); ?>">Sale</a>
			</nav>
		</div>

		<form role="search" method="get" class="mgk-header__search" action="<?php echo esc_url( home_url( '/' ) ); ?>">
			<span class="mgk-header__search-ico" aria-hidden="true">&#128269;</span>
			<input type="search" name="s" placeholder="Search products&hellip;" value="<?php echo esc_attr( get_search_query() ); ?>">
			<input type="hidden" name="post_type" value="product">
		</form>

		<div class="mgk-header__actions">
			<span class="mgk-header__loc"><span aria-hidden="true">&#128205;</span> Singapore Hub</span>
			<a class="mgk-header__ico" href="<?php echo esc_url( $account ); ?>" title="Account" aria-label="Account">&#128100;</a>
			<a class="mgk-header__cart" href="<?php echo esc_url( $cart_url ); ?>" title="Cart">
				<span aria-hidden="true">&#128722;</span>
				<span class="mgk-header__cart-count" data-mgk-cart-count><?php echo esc_html( $cart_count ); ?></span>
			</a>
		</div>
	</div>
</header>

<main id="mgk-main" class="mgk-main">
