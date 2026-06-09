<?php
/**
 * Section configs consumed by the widget engine (inc/mgk-elementor.php).
 * CONTENT sections expose text + full style. DATA-shell sections expose heading/labels
 * + style only — never the records (those come from WooCommerce/wp-admin).
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

function mgk_elementor_sections() {
	$T = 'text'; $A = 'textarea';

	return array(

		/* SEC2 — Hero (CONTENT, dark block) */
		array(
			'tag' => 'mgk_hero', 'title' => 'MGK · Hero', 'icon' => 'eicon-banner',
			'controls' => array(
				'badge'    => array( 'type' => $T, 'label' => 'Badge', 'default' => 'Seasonal Special' ),
				'heading'  => array( 'type' => $A, 'label' => 'Heading', 'default' => 'Singapore National Day Sale: Up to 58% Off' ),
				'sub'      => array( 'type' => $A, 'label' => 'Sub-heading', 'default' => 'Celebrate our grand national milestone with premium catalog specials, tech bundles, and free delivery across Singapore. Limited time only.' ),
				'cta_text' => array( 'type' => $T, 'label' => 'Button text', 'default' => 'Shop the Collection' ),
				'cta_url'  => array( 'type' => 'url', 'label' => 'Button link', 'default' => '' ),
			),
			'style_targets' => array(
				'block' => mgk_style_box( 'Block', '.mgk-hero__block' ),
				'badge' => mgk_style_text( 'Badge', '.mgk-hero__badge' ),
				'title' => mgk_style_text( 'Heading', '.mgk-hero__title' ),
				'sub'   => mgk_style_text( 'Sub-heading', '.mgk-hero__sub' ),
				'cta'   => mgk_style_button( 'Button', '.mgk-hero__cta' ),
			),
		),

		/* SEC3 — Bento new arrivals (DATA-shell) */
		array(
			'tag' => 'mgk_bento', 'title' => 'MGK · New Arrivals', 'icon' => 'eicon-gallery-grid',
			'controls' => array(
				'heading' => array( 'type' => $T, 'label' => 'Label', 'default' => 'New Arrivals For You', 'block' => true ),
			),
			'style_targets' => array(
				'label' => mgk_style_text( 'Label', '.mgk-bento__label' ),
			),
		),

		/* SEC5 — Top picks carousel (DATA-shell) */
		array(
			'tag' => 'mgk_top_picks', 'title' => 'MGK · Top Picks', 'icon' => 'eicon-slider-push',
			'controls' => array(
				'heading' => array( 'type' => $T, 'label' => 'Label', 'default' => 'Top Products Carousel', 'block' => true ),
			),
			'style_targets' => array(
				'label' => mgk_style_text( 'Label', '.mgk-toppicks__label' ),
			),
		),

		/* SEC-extra — Campaign voucher banner (CONTENT) */
		array(
			'tag' => 'mgk_campaign_banner', 'title' => 'MGK · Campaign Banner', 'icon' => 'eicon-price-table',
			'controls' => array(
				'tag'      => array( 'type' => $T, 'label' => 'Tag', 'default' => 'Mega Campaign Voucher' ),
				'expiry'   => array( 'type' => $T, 'label' => 'Expiry', 'default' => 'Expires in 12h' ),
				'heading'  => array( 'type' => $A, 'label' => 'Heading', 'default' => 'Upgrade your tech ecosystem to the ultimate level today' ),
				'code'     => array( 'type' => $T, 'label' => 'Promo code', 'default' => 'FIRST10' ),
				'sub'      => array( 'type' => $A, 'label' => 'Sub-text', 'default' => 'for an instant 10% discount on all orders from SGD 100.00. Next-day Orchard dispatch enabled.' ),
				'cta_text' => array( 'type' => $T, 'label' => 'Button text', 'default' => 'Shop Now' ),
				'cta_url'  => array( 'type' => 'url', 'label' => 'Button link', 'default' => '' ),
			),
			'style_targets' => array(
				'card'  => mgk_style_box( 'Card', '.mgk-campaign__card' ),
				'title' => mgk_style_text( 'Heading', '.mgk-campaign__title' ),
				'cta'   => mgk_style_button( 'Button', '.mgk-campaign__cta' ),
			),
		),

		/* SEC6 — Flash grid (DATA-shell) */
		array(
			'tag' => 'mgk_flash_grid', 'title' => 'MGK · Flash Sale Grid', 'icon' => 'eicon-products-archive',
			'controls' => array(
				'heading' => array( 'type' => $T, 'label' => 'Label', 'default' => 'Flashsale Deals (Ticking Active)', 'block' => true ),
			),
			'style_targets' => array(
				'label' => mgk_style_text( 'Label', '.mgk-flash .mgk-label' ),
			),
		),

	);
}
