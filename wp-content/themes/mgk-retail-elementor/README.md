# MGK Retail Elementor — RETAIL_SG master template

Child of **Hello Elementor**. Built on the MGK Template Factory architecture
(*Elementor controls presentation · wp-admin controls data · PHP controls logic*).
WooCommerce Singapore: SGD, GST 9%, PayNow, next-day delivery.

UI source of truth: `../../../UIandpromt/src/data/screensData.ts` (13 screens).

## Architecture (3 layers)

```
template-parts/**.php   HTML lives ONCE here (single source)
        ↑ do_shortcode()
inc/mgk-*-render.php     DATA-SHELL: shortcodes wrap partials, forward safe atts + Style
        ↑ registered as widgets
inc/mgk-elementor.php    config-driven MGK_Elementor_Section_Widget + per-element Style
inc/mgk-sections.php     section configs (controls + style_targets)
inc/mgk-generator.php    seeds _elementor_data on activate (guard _mgk_layout_seeded)
DATA CORE = WooCommerce + inc/*.php (query, cart, GST, PayNow, orders) — LOCKED
```

## Build status

| Screen | Status | Where |
|---|---|---|
| S01 Home | ✅ done | `inc/mgk-home-render.php`, `template-parts/sections/*`, Elementor-seeded front page |
| S02 Search/Shop | ✅ done | `woocommerce/archive-product.php` + `inc/mgk-search-render.php` (filter = DATA CORE) |
| S03 Product (PDP) | ✅ done | `woocommerce/content-single-product.php` + `inc/mgk-product-render.php` (swatch/countdown/specs) |
| S04 Cart | ✅ done | `woocommerce/cart/*` (voucher, GST, cross-sell, sold-out) |
| S08 Checkout | ✅ done | `woocommerce/checkout/*` + `inc/mgk-paynow.php` (PayNow gateway + SG shipping) |
| S09 Thank-you | ✅ done | `woocommerce/checkout/thankyou.php` + `inc/mgk-thankyou-render.php` (SingPost tracker) |
| S05 Refund, S06 Rate, S07 Cancel, S10 Store, S11 Wishlist, S12 Profile, S13 Auth | ⏳ designed, not built | next batch |

## Environment

- WordPress (Docker, port **8080**), `wp-content` bind-mounted → edit files directly (no SOURCE→RUNTIME copy).
- WP-CLI: `docker compose run --rm wpcli wp <args>` (service `wpcli`, profile `cli`).
- Cart & Checkout pages use the **classic shortcodes** (`[woocommerce_cart]` / `[woocommerce_checkout]`),
  forced on activation by `inc/mgk-checkout-render.php`, so PHP template overrides apply (not the block UI).
- Pretty permalinks need `.htaccess` rewrite rules in the web root (set once).

## Dev commands

```bash
# (re)seed demo catalogue (products, brands, reviews, cross-sells, coupon FIRST10)
docker compose run --rm wpcli wp mgk-demo --force
# (re)seed Elementor layouts (idempotent; --force overrides guard)
docker compose run --rm wpcli wp mgk seed --force
# snapshot computed layouts to seed/seed-layouts.php
docker compose run --rm wpcli wp mgk gen_layouts
# lint a file
docker exec wordpress_app php -l /var/www/html/wp-content/themes/mgk-retail-elementor/<file>
```

## Surface rules (when opening edits to users)
- **CONTENT** (hero, banners) → text + full Style.
- **DATA-SHELL** (filter labels, headings, card layout) → safe controls + Style, no records.
- **DATA-CORE** (products, query, cart, GST, PayNow, orders, reviews) → wp-admin / PHP only.

## Known follow-ups
- PayNow QR is a styled placeholder carrying the live amount; wire a real UEN/EMVCo payload in the gateway for production.
- Edition swatches (PDP) are presentation-only; convert the headset to a variable product for per-edition SKU/stock.
- Build remaining 7 screens (S05–S07, S10–S13).
- Bridge `mgk-tokens.css` ↔ Elementor Global Colors/Fonts for multi-brand variants.
