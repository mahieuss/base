/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WireframeScreen } from '../types';

export const SCREENS_DATA: WireframeScreen[] = [
  {
    id: 'home',
    title: 'S01: Singapore National Day Sale Home Page',
    description: 'RETAIL_SG brand landing page highlighting Singapore National Day Sale (Up to 58% Off), featured premium laptops, top product picks grid, active banner ads, and hourly flash items with direct quick additions.',
    metadata: {
      scope: 'RETAIL_SG Deals Discovery Hub & Click-to-Detail Funnel',
      complexity: 'High',
      security: 'End-to-end active session authentication SSL',
      version: 'v1.0',
      lastUpdated: 'May 2026',
      designer: 'Lead RETAIL_SG UX Designer'
    },
    sections: [
      { id: 'SEC 1', name: 'Header Notification & Support Bar', description: 'Displays regional support coordinates (e.g., Helpline: 1800 1234) and cart items count badges.' },
      { id: 'SEC 2', name: 'Seasonal Sale Interactive Hero Space', description: 'National Day Special promotion card offering up to 58% Off, paired with a shop collection active CTA.' },
      { id: 'SEC 3', name: 'New Arrivals bento showcase', description: 'Showcases Featured High Performance Laptop Ultra Pro X1, with side compartments illustrating Slim Tech products and rates.' },
      { id: 'SEC 4', name: 'Singapore National Day Super Sale Banner', description: 'High-contrast center advertisement card with quick discover hyperlinks.' },
      { id: 'SEC 5', name: 'Curated Top Picks Gallery', description: 'Horizontal scroll cards previewing premium technical items accompanied by instant quick view options.' },
      { id: 'SEC 6', name: 'Active Flash Sale items grid', description: 'Grid layout of 4 discount products with pricing and direct cart additions.' },
      { id: 'SEC 7', name: 'E-commerce Brand Footer directory', description: 'Lists customer service points, privacy legal compliance codes, and PayNow/Visa/Mastercard securing badges.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Shop Seasonal Collection CTA Trigger',
        type: 'CTA',
        title: 'Hero Promo Click Target',
        description: 'Tapping redirects the search query directly into filtered Electronics lists with discounted items highlighted.',
        interactionBehavior: 'Hovering scales by 1.05x; tapping triggers a 150ms slide transition to S02 Search Lists.',
        uxRationale: 'A clear, above-the-fold CTA reduces user search friction and instantly channels landing traffic into active deals.',
        businessLogic: 'Tracks click source parameters (campaigncode=ND58SGP) for analytics.',
        responsiveBehavior: 'Full-width on mobile viewports; fits neatly into a left-aligned 220px desktop button.',
        edgeCases: 'Falls back to general category list if specific active seasonal stock is completely sold out.',
        animationBehavior: 'Subtle green focus ring on keyboard tab; gentle scale-up transition on hover.',
        copyText: 'Shop the Collection',
        dataBinding: 'Bound to campaignStore.activePromo; tracks user click events.',
        x: 32,
        y: 28
      },
      {
        id: 2,
        elementName: 'Quick view Item modal toggle',
        type: 'Interactive Option',
        title: 'Quick view Modal preview',
        description: 'Enables catalog explorers to review technical details and image galleries inside of current views without loading S03 Detail pages.',
        interactionBehavior: 'Tapping launches absolute centered preview lightbox showing product rates and short summaries.',
        uxRationale: 'Lets users quickly compare items in standard grids without losing scroll positions or interrupting discovery.',
        businessLogic: 'Requires active item payload records; pulls real-time inventory levels to verify product availability.',
        responsiveBehavior: 'Hidden on screen viewports under 400px; expands to a full viewport modal sheet on tablet/desktop.',
        edgeCases: 'Triggers fallback to standard navigation to S03 Detail pages if dynamic overlay loading fails.',
        animationBehavior: 'Fades in overlay background in 100ms; scales preview drawer upwards from center.',
        copyText: 'Quick view',
        dataBinding: 'Bound to catalogStore.selectedPreviewItemId; triggers API queries to /api/products/:id.',
        x: 48,
        y: 65
      },
      {
        id: 3,
        elementName: 'Instant Cart Addition Cart Icon',
        type: 'CTA',
        title: 'Grid Instant cart Trigger',
        description: 'Primary visual shopping cart icon attached to product card grids in bento and flash views.',
        interactionBehavior: 'Clicking inserts item into basket; increases header indicator badge count. Displays mini toast "Item added!"',
        uxRationale: 'Lowers interaction hurdles, converting visual interest into secure cart items within one simple click.',
        businessLogic: 'Validates instant stock level check; if stock is 0, disables trigger and translates copy to "Sold Out".',
        responsiveBehavior: 'Maintains touch targets of 44px on smaller screens.',
        edgeCases: 'Prompts item option choice overlay (e.g. Noir color or sizes) if item possesses mandatory parameters.',
        animationBehavior: 'Icon triggers an elastic shrink and pop animation; badge count has standard increment slide.',
        copyText: 'Cart icon',
        dataBinding: 'Triggers cartStore.addItem(product_id, qty=1); updates state.cartCount.',
        x: 85,
        y: 84
      }
    ]
  },
  {
    id: 'search',
    title: 'S02: Search Results for "Electronics"',
    description: 'RETAIL_SG Electronics search results view. Outlines results summary (Showing 1-12 of 48 results), sort option selectors, Advanced progressive filters sidebar (SGD price fields, TechPro/Nexus brand ticks, 5-Star counts, spec checklists), and a 12card catalog product grid.',
    metadata: {
      scope: 'Advanced Progressive Filtration & Search Pagination',
      complexity: 'Medium',
      security: 'DDoS filter mitigations & automated rate limit active',
      version: 'v1.2',
      lastUpdated: 'May 2026',
      designer: 'Lead Search UX Architect'
    },
    sections: [
      { id: 'SEC 1', name: 'Search Header & Results summary', description: 'Renders the active search parameter (Electronics) with responsive result counters and sorting dropdowns.' },
      { id: 'SEC 2', name: 'Advanced Vetting Filters Sidebar', description: 'Lists price range fields, brand checkboxes (Nexus, TechPro), 5-Star reviews selector, and product category check boxes.' },
      { id: 'SEC 3', name: 'Electronics products grid layout', description: 'An adaptive multi-column grid displaying laptop bento, ultra slim tech cards, checkout rates, ratings, and active additions buttons.' },
      { id: 'SEC 4', name: 'E-commerce Catalog Pagination', description: 'Horizontal page select block containing back/forth arrows (< 1 2 3 ... 12 >).' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Advanced Progressive Filter Drawer',
        type: 'Form Input',
        title: 'Sidebar Filter panel',
        description: 'Multi-part vetting form checking price thresholds, brands and ratings to filter e-commerce results pages.',
        interactionBehavior: 'Tapping brand checks or ratings immediately refilters active results cards; custom input fields update on focus-loss.',
        uxRationale: 'Enables users to filter through large catalogs in seconds, finding products tailored to budget constraints.',
        businessLogic: 'Filters combine values dynamically using AND logic (Brand AND PriceRange AND Rating).',
        responsiveBehavior: 'Collapses into an absolute horizontal "Fit Filter Details" drawer at top header on 380px screens.',
        edgeCases: 'Returns "No matches found" with an invite to clear all active filters if parameters are too restrictive.',
        x: 18,
        y: 35
      },
      {
        id: 2,
        elementName: 'Sort Options Dropdown Indicator',
        type: 'Form Input',
        title: 'Pricing & Relevance sorting selector',
        description: 'Dropdown displaying current sorting criteria. Options: Relevance, Price (Low to High), Rating.',
        interactionBehavior: 'Toggles drop expansion list; selection triggers sorting reload of active product list layout cards.',
        uxRationale: 'Allows users to sort items by prioritize elements like cheapest cost or highest parent customer reviews.',
        businessLogic: 'Default sorted by Relevance values calculated by customer engagement scores.',
        responsiveBehavior: 'Aligns neatly to the right on desktop, wraps comfortably beneath header labels on compact screens.',
        edgeCases: 'No results are re-sorted if sorting parameters crash; defaults back smoothly to Relevance indexes.',
        x: 82,
        y: 15
      }
    ]
  },
  {
    id: 'product',
    title: 'S03: AERO-X Pro Wireless PDP',
    description: 'RETAIL_SG product detail page highlighting the AERO-X Pro Wireless headset. Features high-res preview galleries (Noir edition selected), product descriptions, pricing panel, next-day SGP delivery countdown timer, detailed headphone specifications grid, and verified user reviews.',
    metadata: {
      scope: 'Product Evaluation, Urgency Clock, & Tech Specifications Vetting',
      complexity: 'High',
      security: 'Restricts review creation parameters to validated item buyer accounts',
      version: 'v2.0',
      lastUpdated: 'May 2026',
      designer: 'Lead RETAIL_SG Product PDP Designer'
    },
    sections: [
      { id: 'SEC 1', name: 'E-commerce Breadcrumb Navigation', description: 'Displays route path (Home > Electronics > AERO-X Pro Headphones) with rapid parent category navigation.' },
      { id: 'SEC 2', name: 'Active product gallery space', description: 'Large main image showcase with slide controls illustrating Noir headset edition, alongside thumbnail lists below.' },
      { id: 'SEC 3', name: 'Product metadata & checkout controls', description: 'Displays product name, share triggers, pricing SGD499.00, Buy Now, and Add to Cart action buttons.' },
      { id: 'SEC 4', name: 'SGP Next Day Delivery urgency Box', description: 'Highlight block displaying Next-Day shipping details and dynamic countdown timer (Order in hh:mm:ss to receive tomorrow).' },
      { id: 'SEC 5', name: 'Acoustic & Technical Specifications', description: 'Table outlining detailed specifications including driver size (40mm), responses, connectivity, battery, and weights.' },
      { id: 'SEC 6', name: 'Validated buyer reviews list', description: 'Renders verified buyer feedback records (4.9 out of 5 across 1,240 ratings) with average score displays and summaries.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Dynamic Next Day SGP Delivery clock',
        type: 'Alert/Notification',
        title: 'Next-day SGP Shipment Countdown',
        description: 'Calculates active hours, minutes, and seconds remaining in current schedules to guarantee next-day delivery across Singapore.',
        interactionBehavior: 'A continuous ticking timer that updates real-time. Displays prompt delivery estimates on success.',
        uxRationale: 'Urgency metrics motivate direct buying decisions on checking timeslots, improving conversion ratios.',
        businessLogic: 'Calculates countdown relative to warehouse shipping cutoff schedules (daily at 4:30 PM SG timezone).',
        responsiveBehavior: 'Stretches horizontally across check controls on desktop/mobile.',
        edgeCases: 'Clocks hide and display "Same Day Delivery Cutoff Reached" if cutoff hours have passed, replacing with day-after delivery dates.',
        animationBehavior: 'Continuous count update in a monospace design font; pulses gently as target cutoff closes (under 1 hour).',
        copyText: 'Order in 04:22:10 to receive by tomorrow.',
        dataBinding: 'Bound to dynamic interval ticks; checks browser clock system to synchronize schedules.',
        x: 75,
        y: 42
      },
      {
        id: 2,
        elementName: 'Noir / Edition Selector Options',
        type: 'Interactive Option',
        title: 'Product Edition color swatch',
        description: 'Swatches selecting between available color editions of the headset (Noir Edition, Silver Edition).',
        interactionBehavior: 'Tapping a color updates the main product showcase image and resets the thumbnail galleries.',
        uxRationale: 'Implements a smooth selection for variations, ensuring shoppers verify the exact asset color they buy.',
        businessLogic: 'Each edition maintains separate SKU identifier codes and active inventory count levels.',
        responsiveBehavior: 'Swatches occupy touch areas of at least 44x44px for easy thumb selections.',
        edgeCases: 'Defaults options dynamically back to primary Noir if active Silver inventory count drops to zero.',
        x: 65,
        y: 20
      },
      {
        id: 3,
        elementName: 'Acoustic specifications table rows',
        type: 'Card Element',
        title: 'Specifications matrix spreadsheet',
        description: 'Grid detailing technical parameters (Driver Type: 40mm Dynamic, Frequency: 10Hz-40kHz, Battery: 48h ANC on).',
        interactionBehavior: 'Scrollable read-only grid; hovering elements highlights line details for quick cross-referencing.',
        uxRationale: 'Caters to tech-savvy customers verifying technical compatibility before committing to premium audio investments.',
        businessLogic: 'Sourced from verified manufacturer datasheets verified by hardware compliance boards.',
        responsiveBehavior: 'Collapses from 2-column layout on standard desktop into responsive block tables on phone screens.',
        edgeCases: 'Hides optional fields like "Composite elements" dynamically if specifications value arrays render empty.',
        x: 24,
        y: 65
      }
    ]
  },
  {
    id: 'cart',
    title: 'S04: Your Cart Review Drawer',
    description: 'Your Cart checklist page. Lists active product item rows (Ultra-Quiet Keyboard, Vertical Mouse with quantity selectors, Laptop Sleeve showing red "Sold out" badge), voucher codes input frame (FIRST10 coupon applied, with locked SG_NATIONAL_DAY option), subtotal invoices calculated with 9% SG GST, and "Pairs well with your cart" recommendation blocks.',
    metadata: {
      scope: 'Active Basket Audit, Voucher Validations, & Cross-sell Accessories',
      complexity: 'Medium',
      security: 'In-app item calculations verified on server-side before pay',
      version: 'v1.5',
      lastUpdated: 'May 2026',
      designer: 'Lead Cart & Checkout UX Architect'
    },
    sections: [
      { id: 'SEC 1', name: 'Order header title & item total count', description: 'Displays basket header (Your Cart) accompanied by item counts and descriptions of checkout status.' },
      { id: 'SEC 2', name: 'Basket items horizontal list', description: 'Lists active items with detail swatches (Color: Space Grey), checkout quantities, item totals in SGD, and Delete trash triggers.' },
      { id: 'SEC 3', name: 'Transaction Voucher code entry block', description: 'Voucher field to type coupons, displaying applied coupon blocks (FIRST10 active check) and locked options.' },
      { id: 'SEC 4', name: 'Order calculations & invoices details', description: 'Invoice rows for Subtotal, estimated 9% SGP GST tax, delivery calculations (Calculated at checkout), and Grand Totals.' },
      { id: 'SEC 5', name: 'Secure checkout action CTA', description: 'Action button (Proceed to Checkout) with encryption security guarantees listed below.' },
      { id: 'SEC 6', name: 'Cross sell "Pairs well with" slider', description: 'Lists 4 accessories matching items in the basket (Felt Desk Pad, Braided USB-C Cable, Headphone Stands) for quick add.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Red Sold out stock badge',
        type: 'Alert/Notification',
        title: 'Out of stock indicator',
        description: 'A red status badge attached to Laptop Sleeve identifying that available quantity has hit 0.',
        interactionBehavior: 'Blocks checkout for this specific item; displays notice "Remove sold-out items to proceed with secure checkouts".',
        uxRationale: 'Prevents checkout errors, informing users upfront of stock bounds before payment processors launch.',
        businessLogic: 'Checks real-time backend warehouse inventory; if item stock is 0, blocks "Proceed to Checkout" until removed or quantity is 0.',
        responsiveBehavior: 'Draws red alert labels adjacent to product titles.',
        edgeCases: 'Blocks general "Proceed to checkout" action button if sold out components elements occupy active basket.',
        x: 35,
        y: 35
      },
      {
        id: 2,
        elementName: 'Active voucher "APPLY" submit',
        type: 'CTA',
        title: 'Promo coupon apply action',
        description: 'Submit button validating voucher codes inputted into codes field (e.g., FIRST10).',
        interactionBehavior: 'Tapping validates coupon on server; updates pricing, displays applied tags with successful checkmarks.',
        uxRationale: 'Encourages purchases via discounts; provides clear error statuses (e.g. "This voucher is unavailable") to prevent checkout confusion.',
        businessLogic: 'Validates code expiration date and subtotal limits; error screens block invalid campaign combinations.',
        responsiveBehavior: 'Voucher field wraps horizontally into column stacks on small mobile viewports.',
        edgeCases: 'Returns specific error prompts if users insert a code that crossed global campaign click thresholds.',
        x: 82,
        y: 48
      },
      {
        id: 3,
        elementName: 'Singapore 9% GST calculated row',
        type: 'Pricing Block',
        title: 'Singapore GST 9% Taxation ledger',
        description: 'Horizontal invoice item illustrating GST calculated precisely at the standard 9% Singapore rate.',
        interactionBehavior: 'Displays calculated sum; hovering over tax labels displays IRAS regulatory credentials.',
        uxRationale: 'Ensures compliance with national taxation rules, removing billing surprises during payout steps.',
        businessLogic: 'Calcs are calculated dynamically: Subtotal * 0.09; displayed to the cent digits.',
        responsiveBehavior: 'Standard right aligned positioning, wraps underneath totals block safely on mobile screens.',
        edgeCases: 'Recalculates GST with 0.00 limits for international shipping (outside SGP tax jurisdictions).',
        x: 82,
        y: 30
      }
    ]
  },
  {
    id: 'refund',
    title: 'S05: Refund Request Form',
    description: 'Post-purchase Refund Request form. Contains order reference details (Ergonomic Desk Chair V2, SGD189.00), return motives radio checklists (Defective, Change of Mind), defect photo upload placeholder grids, refund channels selectors (Original visa Card vs instant Account token balance), and NinjaVan pick instructions.',
    metadata: {
      scope: 'Post-purchase Returns Handling & Reverse Logistics',
      complexity: 'High',
      security: 'Order confirmation token checked; strict image file checks',
      version: 'v1.1',
      lastUpdated: 'May 2026',
      designer: 'E-commerce Ops Integrity Group'
    },
    sections: [
      { id: 'SEC 1', name: 'Refund order reference detail block', description: 'Lists order ID (#SP-2026-9931), item title, pricing, quantity, and button options to add other items.' },
      { id: 'SEC 2', name: 'Return motive radio list', description: 'Checkbox choices selecting return motives (Defective Product, Not as described, Change of mind) with explanation textarea.' },
      { id: 'SEC 3', name: 'Product labels photo upload grids', description: 'Interactive image boxes prompting users to upload clear evidence (Upload at least 2 photos clearly showing labels).' },
      { id: 'SEC 4', name: 'Refund destination selector cards', description: 'Choices between visa original payment card returns (3-5 days) and instant Store Balance credits.' },
      { id: 'SEC 5', name: 'NinjaVan Singapore collection guidelines', description: 'Dark warning box containing return warehouse logistics locations and packing checklist instructions.' },
      { id: 'SEC 6', name: 'Submit request action control', description: 'Submission summary displaying total refund ($189.00), checkout commits, and policy agreements.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Defect label photos upload block',
        type: 'Form Input',
        title: 'Defect media upload box',
        description: 'Camera placeholder file uploader requiring clear captures of product conditions before return submissions.',
        interactionBehavior: 'Clicking triggers device cameras or opens file explorers. Displays image miniatures once upload succeeds.',
        uxRationale: 'Pre-screens return requests to avoid logistics billing on false returns; streamlines approvals within 24 hours.',
        businessLogic: 'Requires at least 2 uploaded images; file sizes capped to 15MB, supported formats: JPEG/PNG.',
        responsiveBehavior: 'Image grids stack row-by-row on mobile screens; aligns side-by-side on desktop viewports.',
        edgeCases: 'Throws validation alert banners if any file uploaded possesses matching malware signatures or has a corrupt metadata header.',
        x: 48,
        y: 42
      },
      {
        id: 2,
        elementName: 'Instant Store Balance choice card',
        type: 'Interactive Option',
        title: 'Store Balance payout selector',
        description: 'Selected card option routing refunds instantly into RETAIL_SG active balance wallets.',
        interactionBehavior: 'Tapping swaps selected option tick; displays instant payout values vs standard card delays.',
        uxRationale: 'Offers immediate payouts to keep customer funds inside the e-commerce system, encouraging future purchases.',
        businessLogic: 'Adds credits to core wallet ledger instantly on request approval, bypassing card systems.',
        responsiveBehavior: 'Swaps into full columns layout blocks on narrow 390px elements screens.',
        edgeCases: 'Blocks store balances options if the purchase was strictly made using cash on delivery systems.',
        x: 32,
        y: 62
      },
      {
        id: 3,
        elementName: 'NinjaVan Singapore pickup address',
        type: 'Trust Element',
        title: 'NinjaVan drop-off address info block',
        description: 'Logistics address (Warehouse 42, Precision Logistics Center, SG 638210) for NinjaVan return drops.',
        interactionBehavior: 'Read-only highlighted bubble card; tapping copies direct coordinates details onto clipboards.',
        uxRationale: 'Clear drop-off instructions prevent lost return packages, speeding up refund times.',
        businessLogic: 'Verifies postcode boundaries against official logistics coordinate limits before showing standard hubs.',
        responsiveBehavior: 'Wraps text layouts fluidly inside of small screen parameters.',
        edgeCases: 'Calculates home-pickup options automatically if postcode distances exceed 20km.',
        x: 48,
        y: 78
      }
    ]
  },
  {
    id: 'rate',
    title: 'S06: Order Rating & Feedback Form',
    description: 'Shopping evaluation form. Features overall satisfaction stars (5 outline indicators), textual comment area with anonymity privacy tips, product rating blocks for Desk Chairs, image upload grids, and a final submit feedback button.',
    metadata: {
      scope: 'Post-purchase Review Collection & Sentiment Analysis',
      complexity: 'Medium',
      security: 'Submits only from validated, completed delivery orders',
      version: 'v1.0',
      lastUpdated: 'May 2026',
      designer: 'Lead Loyalty CRM Designer'
    },
    sections: [
      { id: 'SEC 1', name: 'Rate Order header & introduction subtitles', description: 'Thank-you text reassuring the purpose of customer critiques to help service improvements.' },
      { id: 'SEC 2', name: 'Overall shopping experience stars', description: 'Interactive star rating bar (How did you feel?) displaying 5 outline/filled star shapes.' },
      { id: 'SEC 3', name: 'Written review comment box', description: 'Text reply box alongside helpful tips outlining anonymity and account settings.' },
      { id: 'SEC 4', name: 'Product performance evaluation details', description: 'Desk Chair row displaying sub-rating options (Product Quality) and custom media uploader frames.' },
      { id: 'SEC 5', name: 'Review dispatch action CTA', description: 'Checkout button (Send Review ->) to dispatch completed rating sets.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Overall satisfaction rating star items',
        type: 'Form Input',
        title: 'Overall rating star bar',
        description: 'Interactive row of 5 star outline shapes that change to filled state on hover or click.',
        interactionBehavior: 'Tapping a star highlights stars up to selection; triggers visual labels (e.g. Excellent).',
        uxRationale: 'Standard visual rating controls simplify the critique process, improving review completion rates.',
        businessLogic: 'Converts selections into integer values {1..5} to post to rating databases.',
        responsiveBehavior: 'Star shapes scale larger on mobile to support touch dimensions.',
        edgeCases: 'Prevents empty stars submissions by enforcing prefilled defaults on user hover actions.',
        x: 25,
        y: 28
      },
      {
        id: 2,
        elementName: 'Anonymity privacy options check',
        type: 'Form Input',
        title: 'Review anonymity info tag',
        description: 'Information tip text detailing how details are kept private: "Your feedback will be anonymous if you choose privacy in your account settings.".',
        interactionBehavior: 'Read-only highlighted notice; click routes to profile privacy configurations.',
        uxRationale: 'Addresses user privacy concerns, encouraging honest feedback on delivery and product issues.',
        businessLogic: 'Stores rating record payload with has_anonymity=true indicator tags in databases.',
        responsiveBehavior: 'Repositions below comments text blocks fluidly.',
        edgeCases: 'Defaults automatically to anonymous state if the order was flagged with sensitive credentials.',
        x: 48,
        y: 52
      },
      {
        id: 3,
        elementName: 'Submit feedback dispatch CTA',
        type: 'CTA',
        title: 'Review submit trigger button',
        description: 'Final solid action button that posts completed stars and text responses to CRM servers.',
        interactionBehavior: 'Clicking triggers feedback validations and navigates users smoothly back to dashboard screens on success.',
        uxRationale: 'Standard direct trigger completing the review loop clearly.',
        businessLogic: 'Submits payload records to /api/reviews endpoints, updating average rating variables.',
        responsiveBehavior: 'Spans full-width across bottom cards on small viewports.',
        edgeCases: 'Holds submission and displays loading overlay state if network latency averages above 1500ms.',
        x: 82,
        y: 85
      }
    ]
  },
  {
    id: 'cancel',
    title: 'S07: Order Cancellation Page',
    description: 'Order Cancellation form for order #SPR-992104. Offers cancellation reasons checkbox, open text field notes, secure billing calculations summary (Precision Chrono Watch, refund sub-elements), and a layout cancellation submission action panel.',
    metadata: {
      scope: 'Order Cancellation Verification & Refund Ledger Calculations',
      complexity: 'Medium',
      security: 'Cancellation tokens checked; double check to avoid accidental clicks',
      version: 'v1.0',
      lastUpdated: 'May 2026',
      designer: 'Transactional Flows Security Board'
    },
    sections: [
      { id: 'SEC 1', name: 'Order cancellation details header', description: 'Outputs current order token identifier and date details (Order #SPR-992104, Order Date: 24/05/2026).' },
      { id: 'SEC 2', name: 'Cancellation reasons checkboxes checklist', description: 'Lists 4 checkboxes (I changed my mind, Incorrect address, Price cheaper elsewhere) to categorize reasons.' },
      { id: 'SEC 3', name: 'Open review comments entry text block', description: 'Textarea allowing shoppers to provide details to help improve delivery.' },
      { id: 'SEC 4', name: 'Calculated refund ledger summaries sidebar', description: 'Calculates active refunds (Subtotal SGD535, Delivery standard, Total Refund SGD535) and tax reversals.' },
      { id: 'SEC 5', name: 'Double check cancellation actions', description: 'Primary cancel button (ORDER CANCELLATION CONFIRMATION) and cancellation retract triggers (KEEP ORDER).' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Reason for cancellation option',
        type: 'Form Input',
        title: 'Motive selection radio element',
        description: 'Selection list specifying cancellations motives to evaluate reasons behind order cancellations.',
        interactionBehavior: 'Tapping checkboxes updates checked state; selecting "Cheaper price elsewhere" opens pricing competitor fields.',
        uxRationale: 'Collects structured cancellation reasons to improve inventory pricing and delivery routes.',
        businessLogic: 'Maps selection codes directly onto analytics dashboard payload packages.',
        responsiveBehavior: 'Columns stack cleanly into a single vertical checkbox stream on phone viewports.',
        edgeCases: 'Enforces optional input checks if users select competitors cheaper rates.',
        x: 32,
        y: 28
      },
      {
        id: 2,
        elementName: 'Confirm cancellation primary CTA banner',
        type: 'CTA',
        title: 'Order cancellation commit trigger',
        description: 'High contrast button that finalizes order cancellation, triggers refund calculations, and sends confirmation emails.',
        interactionBehavior: 'Triggers a double-confirm modal dialog; clicking OK cancels matching orders.',
        uxRationale: 'Allows users to self-cancel orders before fulfillment begins, reducing customer support tickets.',
        businessLogic: 'Only enabled if order shipping status is "Processing" and has not shipped yet.',
        responsiveBehavior: 'Floats stickily across viewport bottoms on mobile screens.',
        edgeCases: 'Deactivates and throws warning banners if logistics API reports cargo has already left sorting depots.',
        x: 82,
        y: 65
      }
    ]
  },
  {
    id: 'checkout',
    title: 'S08: Secure Checkout Settlement',
    description: 'Financial checkout settlement view. Implements delivery address blocks (Jonathan Tan Orchards Singapore), delivery method selection checkboxes (Standard Click vs Click & Collect), local PayNow QR payments modules, checkout calculators sidebar (Estimated GST 9%, Sub-details), and secure Place Order buttons.',
    metadata: {
      scope: 'Financial Checkout Settlement, Tax Calculations & PayNow QR Pay',
      complexity: 'High',
      security: 'UEN tokenized PayNow QR Generation, fully PCI-DSS compliant SSL',
      version: 'v2.0',
      lastUpdated: 'May 2026',
      designer: 'Financial Checkout Lead'
    },
    sections: [
      { id: 'SEC 1', name: 'Shipping Address details block', description: 'Displays customer name, address coordinates, telephone details, and Change button options.' },
      { id: 'SEC 2', name: 'Delivery option selections', description: 'Checkbox matrices selecting Standard standard (FREE) vs local Click & Collect (Store pickup SGD12.0) schedules.' },
      { id: 'SEC 3', name: 'Secure SG Payment Methods', description: 'Payment selectors (PayNow QR code, Visa, Mastercard) displaying interactive PayNow scan QR code nodes.' },
      { id: 'SEC 4', name: 'Sticky Calculations summarize sidebar', description: 'Summary panels totaling invoices: Subtotal SGD1,240.0, Free standard shipping, Estimated GST 9% SGD111.60, Grand Payout SGD1,351.60.' },
      { id: 'SEC 5', name: 'Sticky cart item thumbnail list', description: 'Small item images displayed in summaries to double-check cart items before payouts.' },
      { id: 'SEC 6', name: 'Transaction commit click CTA', description: 'Place Order button accompanied by safety guarantees SSL badges below.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Jonathan Tan SGP shipping Coordinates',
        type: 'Card Element',
        title: 'Addresses select row card',
        description: 'Displays current shipping destination details: Name, Address (88 Orchard Rd, Singapore), and telephone numbers.',
        interactionBehavior: 'Tapping "Change" launches address picker overlays displaying alternate user addresses.',
        uxRationale: 'upfront addresses confirm ensures zero delivery typos, ensuring fast fulfillment.',
        businessLogic: 'Filters delivery options dynamically based on postcodes (e.g., Click & Collect store options).',
        responsiveBehavior: 'Wraps nicely on card borders; stacks information tags cleanly.',
        edgeCases: 'Blocks proceeding actions if coordinates fail to validate against SGP Postcode databases.',
        x: 24,
        y: 20
      },
      {
        id: 2,
        elementName: 'Singapore PayNow QR Code block',
        type: 'Interactive Option',
        title: 'PayNow Transaction Scan code',
        description: 'Generates secure UEN PayNow QR codes linked to checkout sums dynamically.',
        interactionBehavior: 'Scan code icon displays checkout sums; scans in local banks to pay balances immediately.',
        uxRationale: 'Allows Singapore shoppers to scan and pay in seconds, bypassing credit cards.',
        businessLogic: 'Generates unique transaction token payloads containing invoice references.',
        responsiveBehavior: 'QR scales larger for mobile screens to ensure fast camera scans.',
        edgeCases: 'Generates refresh prompts dynamically if payment window ticks down past 15-minute locks.',
        x: 42,
        y: 54
      },
      {
        id: 3,
        elementName: 'Place Order secure commit CTA',
        type: 'CTA',
        title: 'Order settlement launch trigger',
        description: 'Solid dark checkout button committing shopping balances ($1,351.60) to payment processing gateways.',
        interactionBehavior: 'Tapping processes payment; locks item stock, and redirects to S09 Thank-you progress guides.',
        uxRationale: 'Clear, high-contrast CTA button prevents confusion during final payment steps.',
        businessLogic: 'Launches full merchant credit card auth chains or finalizes PayNow handshake API integrations.',
        responsiveBehavior: 'Occupies full width on mobile viewports; fits beautifully in sticky right calculations card on desktop.',
        edgeCases: 'Aborts payment sequence gracefully if checkout stock quantities drop mid-transaction.',
        x: 82,
        y: 78
      }
    ]
  },
  {
    id: 'thankyou',
    title: 'S09: Success & Progress Order Status Tracker',
    description: 'Order confirmation screen mapping active item lists, delivery coordinates, SingPost tracker timelines, and summer collections promotional banners.',
    metadata: {
      scope: 'SLA tracker & shipment milestones timeline',
      complexity: 'Medium',
      security: 'Order tracking token authentication security locks',
      version: 'v1.2',
      lastUpdated: 'May 2026',
      designer: 'Customer Happiness Experience Group'
    },
    sections: [
      { id: 'SEC 1', name: 'Celebratory Payment Confirmed banner (ID #SG-99284-2026)', description: 'Displays payment success confirmations paired with a unique Order tracking ID code.' },
      { id: 'SEC 2', name: 'Shipments Invoice tracking button triggers', description: 'Horizontal buttons to track packages or download secure receipts.' },
      { id: 'SEC 3', name: 'Completed order summary list', description: 'Compact list displaying item details (Chair, Lamps), quantities, and totals paid.' },
      { id: 'SEC 4', name: 'Jonathan Tan SGP Delivery location', description: 'Displays recipient coordinates (Marcus Tan, Tower 1 Asia Square Tower).' },
      { id: 'SEC 5', name: 'SingPost Logistics carrier timeline status', description: 'Live vertical timeline displaying tracking milestones: Processing, Shipped, Delivered.' },
      { id: 'SEC 6', name: 'Loyalty redirection banner ad', description: 'Redirect links (Continue Shopping ->) referencing seasonal items and customer supports.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'SingPost logistics track milestones',
        type: 'Alert/Notification',
        title: 'SingPost Global live tracking timeline',
        description: 'Live delivery stage tracker detailing processing, shipping, and delivery milestones from SingPost Logistics.',
        interactionBehavior: 'Milestone checkpoints turn black and display ticks as the package moves; displays map options.',
        uxRationale: 'Detailed tracking info alleviates post-purchase anxiety, reducing support query volumes.',
        businessLogic: 'Subscribes to SingPost API hooks and updates milestone ticks automatically.',
        responsiveBehavior: 'Timeline stacks vertically on mobile, layout conforms cleanly to right sidebar panels.',
        edgeCases: 'Falls back gracefully if external carrier systems crash, showing the last validated offline progress cache.',
        x: 82,
        y: 35
      },
      {
        id: 2,
        elementName: 'Continue Shopping promotion link',
        type: 'CTA',
        title: 'Collection discover CTA target',
        description: 'Prompt link at the bottom of the success screens redirecting back to S01 Home pages.',
        interactionBehavior: 'Tapping returns search focus back to catalogs and updates the promotion cookie records.',
        uxRationale: 'Maintains user flow, guiding users to explore more collections instead of dead-ending them.',
        businessLogic: 'Clears active cart items parameters and caches successful transaction counters.',
        responsiveBehavior: 'Wraps underneath support block details nicely.',
        edgeCases: 'Maintains transaction cookies to avoid double-payout loops if customers hit browser back keys.',
        x: 82,
        y: 72
      }
    ]
  },
  {
    id: 'store',
    title: 'S10: Store Locator & Collection Points',
    description: 'Find RETAIL_SG store locations and picking-up counters. Filter locations by regional zones, proximity distances, and shopping mall complexes with active status indicators. Features localized coordinate maps pins linking lists.',
    metadata: {
      scope: 'Offline Collection & Physical Store Discovery Map',
      complexity: 'Medium',
      security: 'End-to-end SSL coordinate transmission protection',
      version: 'v1.0',
      lastUpdated: 'May 2026',
      designer: 'Lead Retail Channel Planner'
    },
    sections: [
      { id: 'SEC 1', name: 'Proximity Distance & Region filter bar', description: 'Interactive dropdowns to select distance radii (e.g. within 5km), regions (North, East, West, Central), and major malls.' },
      { id: 'SEC 2', name: 'Matched stores list column', description: 'Lists operating hours, exact floor units, phone details, and digital stock collection slots availability.' },
      { id: 'SEC 3', name: 'Live interactive map canvas panel', description: 'Graphic layout representing physical Singapore regions labeled with location pins.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Proximity criteria selector dropdown',
        type: 'Interactive Option',
        title: 'Geographic Search Radii Filters',
        description: 'Multi-tiered dropdown filters to search stores by Distance (2km, 5km, 10km), Mall types, and Singapore postal sectors.',
        interactionBehavior: 'Tapping options updates store list cards instantly; centres map view on filtered store coordinates.',
        uxRationale: 'Avoids user layout scrolling overload, offering rapid localized pickup points.',
        businessLogic: 'Sorts results dynamically by actual GPS distance calculations using Haversine formula.',
        responsiveBehavior: 'Single stacked full-width dropdown lists on mobile; side-by-side horizontal row on desktop.',
        edgeCases: 'Falls back to Central flagship outlet if no operating stores exist inside chosen radii.',
        x: 20,
        y: 22
      },
      {
        id: 2,
        elementName: 'Singapore interactive map pin markers',
        type: 'Navigation',
        title: 'Dynamic Map geographic coordinate pins',
        description: 'Interactive graphical point icons signifying physical RETAIL_SG storefronts in malls.',
        interactionBehavior: 'Tapping a point zooms map to coordinates; triggers highlighting active store cards on the left with bounce animation.',
        uxRationale: 'Visualizing store coordinates relative to subway lines reduces navigation confusion.',
        businessLogic: 'Synchronizes item stock checks with physical stores database to display instant store-pickup eligibility.',
        responsiveBehavior: 'Hidden or displays below list on screens under 500px, rendering list above maps; side-by-side on desktop.',
        edgeCases: 'Falls back to standard static list view if client coordinates or web canvas fails to load.',
        x: 75,
        y: 45
      }
    ]
  },
  {
    id: 'wishlist',
    title: 'S11: Wishlist & Personalized Picks',
    description: 'RETAIL_SG Saved Items Hub. Tracks live warehouse inventories highlighting stock statuses (In Stock, Low In Stock, Out of Stock). Formats disabled disabled checkout triggers for depleted products. Includes curated recommends for you sections based on past browsing behaviors.',
    metadata: {
      scope: 'Active Interest retention with personalized cross-selling widgets',
      complexity: 'Medium',
      security: 'User private lists protection encrypted vaults authentication',
      version: 'v1.0',
      lastUpdated: 'May 2026',
      designer: 'CRM Engagement Director'
    },
    sections: [
      { id: 'SEC 1', name: 'Saved Wishlist Items Grid', description: 'Displays item thumbnails, titles, unit costs, and real-time stock levels.' },
      { id: 'SEC 2', name: 'Conditional Action states', description: 'Disables cart insertion for empty-stock items while keeping product remove options active.' },
      { id: 'SEC 3', name: 'Recommends for you section', description: 'Adaptive product recommendation carousel based on previous category affinity tags.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Empty stock cart addition block',
        type: 'Trust Element',
        title: 'Out of Stock state handling',
        description: 'Conditional disabling system on checkout CTA button controls for items whose stock count is zero.',
        interactionBehavior: 'Disables buttons entirely, dimming opacity; provides helpful "Remove" or "Notify when back in stock" buttons.',
        uxRationale: 'Prevents checkout friction from ordering out-of-stock items, set expectations early.',
        businessLogic: 'Checks real-time inventory level. If stock <= 0, marks buttons as inactive.',
        responsiveBehavior: 'Retains visual status markers across all break widths.',
        edgeCases: 'Prompt secondary backorder forms if store activates stock reservation permissions.',
        x: 35,
        y: 35
      },
      {
        id: 2,
        elementName: 'Browsing behavior recommendations list',
        type: 'Card Element',
        title: 'Adaptive cross-sell recommendations',
        description: 'Curated products footer grid dynamically populated using previous categories search tokens.',
        interactionBehavior: 'Tapping catalog card navigates to PDP page; includes direct add shortcut button.',
        uxRationale: 'Leverages affinity metrics to drive click-through rates and average basket size.',
        businessLogic: 'Sorts recommended records using buyer transaction affinity and categories similarity indices.',
        responsiveBehavior: 'Horizontal swipe carousel on mobile panels, multi-column grid on desktop.',
        edgeCases: 'Falls back to standard high-rating National Day sale picks if purchase histories are empty.',
        x: 50,
        y: 75
      }
    ]
  },
  {
    id: 'profile',
    title: 'S12: Membership Hub & Orders Dashboard',
    description: 'Detailed user account profile. Showcases avatar, telephone contact indexes, current membership tier badges, live orders statuses progression tracking (purchase processing, pickup, delivery, to rate), and shop utilities (loyalty score, store wallets, voucher archives).',
    metadata: {
      scope: 'Post-purchase loyalty hub and self-service status tracker',
      complexity: 'High',
      security: 'Full session OAuth verified credentials encryption',
      version: 'v1.1',
      lastUpdated: 'May 2026',
      designer: 'Loyalty Retention Lead'
    },
    sections: [
      { id: 'SEC 1', name: 'User information header block', description: 'Displays user avatar, display names, cellular index details, and tier status badge.' },
      { id: 'SEC 2', name: 'Order status indicators grid', description: 'Renders order state totals (Pending, Pick-up, Delivery, Ratings) with live progress counts.' },
      { id: 'SEC 3', name: 'User Digital utilities dashboard', description: 'Displays store balance wallet values, loyalty point ledger, and active coupons archives.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Order status badges tracking',
        type: 'Card Element',
        title: 'Interactive Order Process tracker',
        description: 'Categorized orders indicators displaying item status: Pending Payment, Processing Delivery, Pending Store Pickup, and Reviews.',
        interactionBehavior: 'Clicking any state reloads orders listing filtered down by selected state.',
        uxRationale: 'Allows users to instantly verify fulfillment progress without tracking number audits.',
        businessLogic: 'Hooks directly to ERP deliveries API to aggregate transaction state counters.',
        responsiveBehavior: 'Equal 4-column row layout across mobile, tablet, and desktop.',
        edgeCases: 'Displays empty status vectors if customer has no current open or past bookings.',
        x: 25,
        y: 45
      },
      {
        id: 2,
        elementName: 'Digital wallets and voucher keys',
        type: 'Pricing Block',
        title: 'Utilities balance ledger',
        description: 'Displays current Store Credit values (PayNow balances, refund bank credits), Loyalty point counts, and voucher vaults folders.',
        interactionBehavior: 'Clicking components launches respective ledger panels or available promo catalog drawers.',
        uxRationale: 'Consolidates all stored financial customer values into one accessible dashboard.',
        businessLogic: 'Integrates loyalty point reward program rules; 100 points matches SGD1.00 checkout discount.',
        responsiveBehavior: 'Folds from vertical stack blocks on mobile to horizontal row cards on wide screens.',
        edgeCases: 'Securely hides balances when privacy eye-icon deactivates.',
        x: 75,
        y: 75
      }
    ]
  },
  {
    id: 'auth',
    title: 'S13: Secure Login & Registration Portal',
    description: 'The secure gateway for RETAIL_SG. Features responsive password validation, email/phone credentials entry, live interactive OTP timers, and a slick slide toggle between log-in and reg-in forms.',
    metadata: {
      scope: 'User Onboarding, OTP Verification, SSL Sign-In Gateway',
      complexity: 'High',
      security: 'SHA-256 Hashing, SSL Encryption, Secure Recaptcha V3',
      version: 'v1.0',
      lastUpdated: 'June 2026',
      designer: 'Lead UX Security Architect'
    },
    sections: [
      { id: 'SEC 1', name: 'Unified Authentication Swapper Segment', description: 'Dual sliding visual option segment for Quick Login / Register tabs.' },
      { id: 'SEC 2', name: 'Interactive Credentials Area', description: 'Form fields for Email, Password, rating/strength markers, and password visibility eye switches.' },
      { id: 'SEC 3', name: 'Singapore Mobile OTP Verification Box', description: 'SMS OTP countdown segment broadcasting to valid SGP cell network prefixes.' },
      { id: 'SEC 4', name: 'Third-Party Social Sign-In CTAs', description: 'Includes secure Google Workspace and Apple secure sign-in triggers.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Sign In vs Sign Up Tab Option',
        type: 'Interactive Option',
        title: 'Form Mode Swapper Switch',
        description: 'Swaps between Login inputs layout and fresh Register signups screens inside of 150ms.',
        interactionBehavior: 'Tapping swaps active layout and slides bottom background highlighting borders.',
        uxRationale: 'Lowers onboarding threshold for active product checkouts.',
        businessLogic: 'Saves campaign reference points to track click-to-registration targets.',
        responsiveBehavior: 'Full screen scale transitions across smaller mobile dimensions.',
        edgeCases: 'Locks toggle state during password hashing sequences.',
        x: 50,
        y: 15
      },
      {
        id: 2,
        elementName: 'Mobile OTP Verification button',
        type: 'Form Input',
        title: 'Singapore +65 OTP broadcaster module',
        description: 'Verifies Singapore +65 numbers and validates interactive numerical login credentials.',
        interactionBehavior: 'Tapping triggered OTP countdown timer states; blocks inputs unless numerical entries are entered.',
        uxRationale: 'Avoids complex credentials rememberings by letting shoppers use mobile verifications.',
        businessLogic: 'Logs rate-limiting states; max 3 code broadcasts per shopper per day.',
        responsiveBehavior: 'Scale spacing coordinates gracefully to thin 390px screens.',
        edgeCases: 'Triggers manual validation links if SingPost delivery coordinates fail.',
        x: 50,
        y: 65
      }
    ]
  }
];
