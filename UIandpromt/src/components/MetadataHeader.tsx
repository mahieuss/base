/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle, Layers, Shield, HelpCircle, ArrowRight,
  Sparkles, Award, Star, ListCollapse, Bookmark, Activity
} from 'lucide-react';

interface MetadataHeaderProps {
  activeScreenId: string;
  onScreenChange: (screenId: string) => void;
}

export const SE_TUTOR_MAP: Record<string, {
  code: string;
  title: string;
  sectionsCount: string;
  summary: string;
  persona: string;
  priority: string;
  stage: string;
  purpose: string;
  primaryCta: string;
  goal: string;
}> = {
  home: {
    code: 'S01',
    title: 'Singapore National Day Sale Home Page',
    sectionsCount: '7 interactive modules',
    summary: 'Seasonal promotion hero banner, new arrivals bento, National Day sale teaser, curated top picks carousel, active flash sales grid, and e-commerce footer.',
    persona: 'General Shoppers, Deal Hunters',
    priority: 'P0',
    stage: 'Home Discovery / Landing',
    purpose: 'Expose seasonal active e-commerce promotions and guide users into product lists or item details.',
    primaryCta: '"Shop the Collection" & "Quick view" actions',
    goal: 'Expose hot electronic items, lowering bounce rates below 30%'
  },
  search: {
    code: 'S02',
    title: 'SearchResults: "Electronics"',
    sectionsCount: '4 layout zones',
    summary: 'Results summary, progressive filters sidebar (price, brands, reviews), electronics catalog grid, and custom footer pagination.',
    persona: 'Targeted Searchers, Tech Buyers',
    priority: 'P0',
    stage: 'Category Vetting & Sourcing',
    purpose: 'Search and filter down high-performance tech inventory based on budget, rating, and brand options.',
    primaryCta: '"Add to Cart" and filters checkboxes',
    goal: 'Drive high-relevancy item discovery, channeling shoppers into detail reviews'
  },
  product: {
    code: 'S03',
    title: 'AERO-X Pro Wireless PDP',
    sectionsCount: '6 details sections',
    summary: 'Breadcrumbs, hi-res headphone gallery, Noir swatches, Buy / Add to Cart, Next-Day Delivery countdown, detailed specifications spreadsheet, and buyer comments.',
    persona: 'Audiophiles, Detail Vetting Buyers',
    priority: 'P0',
    stage: 'Product Evaluation / Decision',
    purpose: 'Reinforce acoustical precision details, battery capacities, and next-day shipping countdown guarantees.',
    primaryCta: '"BUY NOW" & "ADD TO CART" buttons',
    goal: '65%+ Add-to-Cart click-through for active PDP browsers'
  },
  cart: {
    code: 'S04',
    title: 'Your Cart Review Drawer',
    sectionsCount: '6 panels',
    summary: 'Basket item list (with sold-out laptop sleeve), coupon voucher code apply row (FIRST10 active), subtotal ledger with 9% GST, and "Pairs well with" cross-sell slider.',
    persona: 'Active Checkout Reviewers',
    priority: 'P0',
    stage: 'Basket Audit & Promotion Apply',
    purpose: 'Audit active shopping basket quantities, validate promotional vouchers, and calculate Singapore 9% GST tax.',
    primaryCta: '"PROCEED TO CHECKOUT" confirmation',
    goal: 'Increase average order values (AOV) via strategic cross-sells'
  },
  refund: {
    code: 'S05',
    title: 'Refund Request Form',
    sectionsCount: '6 input segments',
    summary: 'Order references (Office Chair), return motive radio list, photo uploads drop zone, original visa card vs store credits selectors, and NinjaVan instructions.',
    persona: 'Post-purchase returning clients',
    priority: 'P1',
    stage: 'Support / Reverse Logistics',
    purpose: 'Provide frictionless return channels with verified evidence uploads to resolve complaints in under 24 hours.',
    primaryCta: '"SUBMIT REQUEST" action button',
    goal: 'Build trust post-purchase, redirecting refunds into store credits'
  },
  rate: {
    code: 'S06',
    title: 'Order Rating & Feedback Form',
    sectionsCount: '5 modules',
    summary: 'Overall experience stars, text comment box with privacy controls, item condition reviewers (Chair quality), media uploads box, and submit CTA switches.',
    persona: 'Post-deliver feedback reviewers',
    priority: 'P2',
    stage: 'Loyalty & Customer Retention',
    purpose: 'Collect validated rating parameters and product photography records from actual buyer accounts.',
    primaryCta: '"Send Review ->" arrow transition',
    goal: 'Build authentic buyer commentary, driving brand social proofing'
  },
  cancel: {
    code: 'S07',
    title: 'Order Cancellation Page',
    sectionsCount: '5 panel units',
    summary: 'Order #SPR-992104 headers, cancellation motives checklists, notes textarea, secure refund ledgers, and cancellation double commits.',
    persona: 'Post-order accidental buyers',
    priority: 'P2',
    stage: 'Pre-fulfillment Retraction',
    purpose: 'Process self-service cancellations gracefully before fulfillment begins, logging structured feedback.',
    primaryCta: '"ORDER CANCELLATION CONFIRMATION"',
    goal: 'Minimize administrative support tickets for cancelled shipments'
  },
  checkout: {
    code: 'S08',
    title: 'Secure Checkout Settlement',
    sectionsCount: '6 modules',
    summary: 'Shipping address cards (Jonathan Tan Orchards), click & collect/standard delivery options, PayNow scan QR code node, and total payment summary sidebar with 9% GST.',
    persona: 'Settled Purchasing Clients',
    priority: 'P0',
    stage: 'Financial Settlement / Checkout',
    purpose: 'Verify Singapore delivery postcodes, select fulfillment speeds, and complete instant cashless PayNow QR scans.',
    primaryCta: '"Place Order" (SGD 1,351.60)',
    goal: '98%+ checkout completion with secure tax calculations'
  },
  thankyou: {
    code: 'S09',
    title: 'Success & Progress Order Tracker',
    sectionsCount: '6 tracking elements',
    summary: '#SG-99284-2026 payment successful tick, invoice PDF downloads, item summary lists, and SingPost live carrier milestone timelines.',
    persona: 'Post-purchase tracking carriers',
    priority: 'P0',
    stage: 'Onboarding / Fulfillment Track',
    purpose: 'Confirm payment validation success and communicate shipping progress via live logistics checkpoints.',
    primaryCta: '"Track Shipment" & "Continue Shopping" links',
    goal: '100% clarity on shipment timelines, reducing "Where Is My Order" queries'
  },
  store: {
    code: 'S10',
    title: 'Store Locator & Pick-Up Points',
    sectionsCount: '3 spatial modules',
    summary: 'Proximity distance filter selections, matching Singapore outlet listing columns, and visual map pin navigation coordinates.',
    persona: 'Omnichannel Shoppers, Self-Pickup Buyers',
    priority: 'P1',
    stage: 'Fulfillment Point Selection',
    purpose: 'Filter operating outlets across Singapore based on geographic distances, regions, or shopping malls.',
    primaryCta: '"Search dropdowns" and coordinate mapping pins',
    goal: 'Drive offline pickup conversions, saving 15%+ standard delivery carriage fees'
  },
  wishlist: {
    code: 'S11',
    title: 'User Wishlist & Saved Products',
    sectionsCount: '3 listing modules',
    summary: 'Grid displaying saved products, conditional disabled triggers on depleted stocks, and user personality recommends.',
    persona: 'Repetitive Shoppers, Value Waiters',
    priority: 'P1',
    stage: 'Pre-purchase Interest Retaining',
    purpose: 'Enable users to track product stock health and directly clear lists to active shopping baskets.',
    primaryCta: '"Add to Cart" and "Remove product" triggers',
    goal: 'Expose secondary related affinity items, maximizing cross-order volumes'
  },
  profile: {
    code: 'S12',
    title: 'My RETAIL_SG Membership Hub',
    sectionsCount: '3 details panels',
    summary: 'Avatar metadata coordinates tier points, status indicators tracker grids (pickup, delivery, reviews), and wallets ledgers folders.',
    persona: 'Registered Accounts, Repeat Customers',
    priority: 'P1',
    stage: 'Customer Account & Loyalty Management',
    purpose: 'Consolidate customer reward tiers, loyalty scores points, digital active coupons, and historical delivery processes.',
    primaryCta: '"Order trackers" and "Utilities buttons"',
    goal: 'Achieve 45%+ monthly customer retention and profile detail completion'
  },
  auth: {
    code: 'S13',
    title: 'Secure Login & Registration Portal',
    sectionsCount: '4 layout zones',
    summary: 'Unified authentication swapper, interactive email/password input mode, Singapore SMS OTP mobile timer, and Google/Singpass social checkout logins.',
    persona: 'Unauthenticated Visitors, Returning Customers',
    priority: 'P0',
    stage: 'Authentication & Session Entry',
    purpose: 'Verify customer credentials or quickly create verified Singapore marketplace profile accounts.',
    primaryCta: '"ADD TO CART", "SMS OTP BROADCASTER"',
    goal: 'Expose elegant login options, minimizing registration drop-offs below 5%'
  }
};

export default function MetadataHeader({ activeScreenId, onScreenChange }: MetadataHeaderProps) {
  // Find current mapped spec
  const currentKey = activeScreenId in SE_TUTOR_MAP ? activeScreenId : 'home';
  const currentMap = SE_TUTOR_MAP[currentKey];

  return (
    <div className="flex flex-col bg-[#F4F4F5] border-b border-zinc-300">
      
      {/* 1. Black Topmost Brand Navigation strip */}
      <div className="bg-[#09090B] text-white px-6 py-2.5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-tight z-10 shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-mono font-black tracking-widest text-[#E11D48] text-[11px] animate-pulse">●</span>
          <span className="font-mono uppercase font-black tracking-widest text-[11px] text-zinc-100">
            RETAIL_SG WIREFRAME · BATCH 2 S01-S13 COMPLETE · ONLINE MARKETPLACE (SG)
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'home', code: 'S01', label: 'Home' },
            { id: 'search', code: 'S02', label: 'Listing' },
            { id: 'product', code: 'S03', label: 'PDP' },
            { id: 'cart', code: 'S04', label: 'Cart' },
            { id: 'refund', code: 'S05', label: 'Refund' },
            { id: 'rate', code: 'S06', label: 'Review' },
            { id: 'cancel', code: 'S07', label: 'Cancel' },
            { id: 'checkout', code: 'S08', label: 'Checkout' },
            { id: 'thankyou', code: 'S09', label: 'Status' },
            { id: 'store', code: 'S10', label: 'Store' },
            { id: 'wishlist', code: 'S11', label: 'Wishlist' },
            { id: 'profile', code: 'S12', label: 'Profile' },
            { id: 'auth', code: 'S13', label: 'Auth' }
          ].map((item) => {
            const isActive = activeScreenId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 border transition-all cursor-pointer rounded-xs h-6.5 ${
                  isActive 
                    ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-sm' 
                    : 'bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
                }`}
              >
                {item.code} {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Large Centered Title Information Block */}
      <div className="py-7 px-6 text-center flex flex-col items-center justify-center">
        <h1 className="font-mono text-[22px] md:text-[25px] font-black text-zinc-900 uppercase tracking-tight leading-none mb-2">
          RETAIL_SG UX Specification Viewer
        </h1>
        <p className="font-mono text-[10px] md:text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-4">
          13 SGP WIREFRAMES × 3 BREAKPOINTS = 39 WIREFRAME ARTIFACTS · 64+ SECTIONS · 32+ HIGH-FIDELITY CALLOUTS
        </p>

        {/* Dynamic highlighted pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
          {[
            'E-commerce Specs',
            'Performance-first',
            '9% GST Calculated',
            'PayNow QR Integrated',
            '3 breakpoints'
          ].map((pill, idx) => (
            <span 
              key={idx}
              className="px-2.5 py-1 bg-[#E11D48] text-white font-mono text-[10px] font-black uppercase tracking-tight rounded-xs shadow-2xs"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* 3. Horizontal Color Annotation Legend Strip */}
        <div className="w-full max-w-4xl py-2 px-4 bg-white border border-zinc-250 rounded-sm flex flex-wrap justify-between items-center gap-3 shadow-xs">
          {[
            { tag: 't-action', label: 'User action', color: 'bg-blue-600' },
            { tag: 't-anim', label: 'Animation', color: 'bg-violet-600' },
            { tag: 't-edge', label: 'Edge case', color: 'bg-orange-600' },
            { tag: 't-rule', label: 'Business rule', color: 'bg-emerald-600' },
            { tag: 't-copy', label: 'Copy', color: 'bg-amber-500' },
            { tag: 't-[#6B7280]', label: 'Data binding', color: 'bg-zinc-500' }
          ].map((leg, idx) => (
            <div key={idx} className="flex items-center gap-2 font-mono text-[10px] font-extrabold text-zinc-700">
              <span className={`w-3.5 h-3.5 ${leg.color} rounded-xs flex items-center justify-center text-white text-[8px]`}></span>
              <span>
                <span className="text-zinc-400">{leg.tag}</span> {leg.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Large Dark Interactive Overview Dashboard Grid */}
      <div className="px-6 pb-6">
        <div className="max-w-7xl mx-auto bg-[#18181B] rounded-sm p-4 text-white shadow-md border border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Activity size={80} className="text-zinc-100" />
          </div>

          <div className="text-[9px] font-mono text-[#E11D48] font-black uppercase tracking-widest mb-3 border-b border-zinc-800 pb-2 flex justify-between items-center">
            <span>RETAIL_SG SPECIFICATION OVERVIEW</span>
            <span>Interactive Hub Navigation Panel</span>
          </div>

          {/* Row of Screen Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Screen 1 */}
            <div 
              onClick={() => onScreenChange('home')}
              className={`p-3 border rounded-xs transition-all duration-150 cursor-pointer flex flex-col gap-1.5 ${
                activeScreenId === 'home' 
                  ? 'border-[#E11D48] bg-zinc-900/90 shadow-xs ring-1 ring-[#E11D48]' 
                  : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/70'
              }`}
            >
              <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
                <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeScreenId === 'home' ? 'bg-[#E11D48]' : 'bg-zinc-600'}`}></span>
                  S01 Home Page
                </span>
                <span className="text-[8px] font-mono text-zinc-500">7 SECTIONS</span>
              </div>
              <p className="text-[10.5px] font-sans text-zinc-400 font-medium leading-normal">
                National Day Promotion banner, arrivals, top picks and discount grids.
              </p>
            </div>

            {/* Screen 2 */}
            <div 
              onClick={() => onScreenChange('search')}
              className={`p-3 border rounded-xs transition-all duration-150 cursor-pointer flex flex-col gap-1.5 ${
                activeScreenId === 'search' 
                  ? 'border-[#E11D48] bg-zinc-900/90 shadow-xs ring-1 ring-[#E11D48]' 
                  : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/70'
              }`}
            >
              <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
                <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeScreenId === 'search' ? 'bg-[#E11D48]' : 'bg-zinc-600'}`}></span>
                  S02 Search results
                </span>
                <span className="text-[8px] font-mono text-zinc-500">4 SECTIONS</span>
              </div>
              <p className="text-[10.5px] font-sans text-zinc-400 font-medium leading-normal">
                Electronics directory with price fields, brand ticks, and catalog grid.
              </p>
            </div>

            {/* Screen 3 */}
            <div 
              onClick={() => onScreenChange('product')}
              className={`p-3 border rounded-xs transition-all duration-150 cursor-pointer flex flex-col gap-1.5 ${
                activeScreenId === 'product' 
                  ? 'border-[#E11D48] bg-zinc-900/90 shadow-xs ring-1 ring-[#E11D48]' 
                  : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/70'
              }`}
            >
              <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
                <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeScreenId === 'product' ? 'bg-[#E11D48]' : 'bg-zinc-600'}`}></span>
                  S03 Product PDP
                </span>
                <span className="text-[8px] font-mono text-zinc-500">6 SECTIONS</span>
              </div>
              <p className="text-[10.5px] font-sans text-zinc-400 font-medium leading-normal">
                Audio headset specifications table with shipping clocks check and reviews.
              </p>
            </div>

            {/* Screen 4 */}
            <div 
              onClick={() => onScreenChange('cart')}
              className={`p-3 border rounded-xs transition-all duration-150 cursor-pointer flex flex-col gap-1.5 ${
                activeScreenId === 'cart' 
                  ? 'border-[#E11D48] bg-zinc-900/90 shadow-xs ring-1 ring-[#E11D48]' 
                  : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/70'
              }`}
            >
              <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
                <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeScreenId === 'cart' ? 'bg-[#E11D48]' : 'bg-zinc-600'}`}></span>
                  S04 Your Cart
                </span>
                <span className="text-[8px] font-mono text-zinc-500">6 SECTIONS</span>
              </div>
              <p className="text-[10.5px] font-sans text-zinc-400 font-medium leading-normal">
                Items audit, voucher fields validations, 9% GST calculated and cross-sells.
              </p>
            </div>

            {/* Screen 5 */}
            <div 
              onClick={() => onScreenChange('refund')}
              className={`p-3 border rounded-xs transition-all duration-150 cursor-pointer flex flex-col gap-1.5 ${
                activeScreenId === 'refund' 
                  ? 'border-[#E11D48] bg-zinc-900/90 shadow-xs ring-1 ring-[#E11D48]' 
                  : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/70'
              }`}
            >
              <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
                <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeScreenId === 'refund' ? 'bg-[#E11D48]' : 'bg-zinc-600'}`}></span>
                  S05 Refund Request
                </span>
                <span className="text-[8px] font-mono text-zinc-500">6 SECTIONS</span>
              </div>
              <p className="text-[10.5px] font-sans text-zinc-400 font-medium leading-normal">
                Return reasons checklist, photo files upload and NinjaVan locations instructions.
              </p>
            </div>

            {/* Screen 6 */}
            <div 
              onClick={() => onScreenChange('rate')}
              className={`p-3 border rounded-xs transition-all duration-150 cursor-pointer flex flex-col gap-1.5 ${
                activeScreenId === 'rate' 
                  ? 'border-[#E11D48] bg-zinc-900/90 shadow-xs ring-1 ring-[#E11D48]' 
                  : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/70'
              }`}
            >
              <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
                <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeScreenId === 'rate' ? 'bg-[#E11D48]' : 'bg-zinc-600'}`}></span>
                  S06 Rate the Order
                </span>
                <span className="text-[8px] font-mono text-zinc-500">5 SECTIONS</span>
              </div>
              <p className="text-[10.5px] font-sans text-zinc-400 font-medium leading-normal">
                Overall stars feedback, product specifics rating, and user image drops.
              </p>
            </div>

          </div>

          {/* S07 - S12 Secondary Selector Tier */}
          <div className="mt-3 pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[9px] text-[#E11D48] uppercase font-black tracking-widest">Advanced Hubs:</span>
            {[
              { id: 'cancel', code: 'S07', label: 'Cancellation' },
              { id: 'checkout', code: 'S08', label: 'Checkout' },
              { id: 'thankyou', code: 'S09', label: 'Fulfillment' },
              { id: 'store', code: 'S10', label: 'Store Locator' },
              { id: 'wishlist', code: 'S11', label: 'Wishlist' },
              { id: 'profile', code: 'S12', label: 'Profile Hub' },
              { id: 'auth', code: 'S13', label: 'Auth Portal' }
            ].map((ext) => (
              <button
                key={ext.id}
                onClick={() => onScreenChange(ext.id)}
                className={`font-mono text-[9.5px] uppercase font-bold px-2 py-0.5 border rounded-xs cursor-pointer transition-colors ${
                  activeScreenId === ext.id 
                    ? 'bg-white text-zinc-950 border-white' 
                    : 'bg-transparent text-zinc-500 border-zinc-850 hover:text-zinc-300 hover:border-zinc-700'
                }`}
              >
                {ext.code} {ext.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 5. SPECIFICATION META HEADER (Large Dark Bar) */}
      <div className="px-6 pb-2.5">
        <div className="max-w-7xl mx-auto flex flex-col">
          
          {/* Header main black strip */}
          <div className="bg-[#121214] text-white px-4 py-2.5 rounded-t-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border border-zinc-800 z-10 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="bg-[#E11D48] px-2 py-0.5 rounded-xs font-mono font-black text-xs text-white">
                {currentMap.code}
              </span>
              <h2 className="font-mono text-xs font-black uppercase text-zinc-100 pl-1">
                {currentMap.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono text-zinc-400">
              <span className="hover:text-white transition-colors">
                <span className="font-black text-[#E11D48] mr-1">Persona:</span> {currentMap.persona}
              </span>
              <span className="text-zinc-700">|</span>
              <span className="hover:text-white transition-colors">
                <span className="font-black text-[#E11D48] mr-1">Priority:</span> {currentMap.priority}
              </span>
              <span className="text-zinc-700">|</span>
              <span className="hover:text-white transition-colors">
                <span className="font-black text-[#E11D48] mr-1">Stage:</span> {currentMap.stage}
              </span>
            </div>
          </div>

          {/* Under specification segment strip: light gray with purpose/goal */}
          <div className="bg-white border-x border-b border-zinc-300 p-3 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 text-[10.5px] font-mono text-zinc-500 rounded-b-xs shadow-xs">
            <div className="flex flex-col gap-1 flex-1">
              <span className="leading-snug">
                <span className="font-extrabold text-zinc-800 uppercase">Purpose: </span> 
                <span className="text-zinc-650">{currentMap.purpose}</span>
              </span>
              <span className="leading-snug">
                <span className="font-extrabold text-zinc-800 uppercase">Primary CTA: </span> 
                <span className="text-zinc-650">{currentMap.primaryCta}</span>
              </span>
            </div>

            <div className="lg:text-right border-t lg:border-t-0 border-zinc-200 pt-1 lg:pt-0 max-w-xl">
              <span className="leading-snug">
                <span className="font-extrabold text-zinc-800 uppercase">Conversion goal: </span>
                <span className="bg-[#FAFAFA] border border-zinc-200 text-zinc-750 font-sans px-1.5 py-0.5 rounded-xs font-bold">
                  {currentMap.goal}
                </span>
              </span>
            </div>
          </div>

          {/* Sequence list of sections inside flow */}
          <div className="bg-zinc-100/90 border-x border-b border-zinc-250 py-1.5 px-3 rounded-b-xs text-[10px] text-zinc-500 font-mono tracking-wide leading-relaxed">
            <span className="font-bold text-zinc-800 uppercase mr-1">{currentMap.sectionsCount}:</span>
            {SE_TUTOR_MAP[currentKey as keyof typeof SE_TUTOR_MAP] ? (
              // Use generic list of matching wireframe's actual elements
              <span>
                {currentKey === 'home' && '1.Top utility bar · 2.Main nav · 3.Hero + inline search · 4.Trust bar 4 stats · 5.Live activity feed · 6.How it works 4 steps · 7.Browse by subject · 8.Featured tutors 8 cards · 9.Why choose us · 10.Tutor of the month · 11.Success stories · 12.Reviews carousel · 13.FAQ inline · 14.Pricing teaser · 15.Press logos · 16.Final CTA · 17.Newsletter · 18.Footer'}
                {currentKey === 'search' && '1.Search query header · 2.Sorting selector · 3.Progressive filters sidebar · 4.Interactive catalog grid · 5.SEO pagination footer'}
                {currentKey === 'product' && '1.Header gallery carousel · 2.Information title block · 3.Checkout transaction panel · 4.Delivery countdown ticker · 5.Technical specification matrix · 6.Verified buyer reviews'}
                {currentKey === 'cart' && '1.Shopping item grid · 2.Quantity manager · 3.Order subtotal calculations · 4.Voucher form · 5.Trust details · 6.Cross-sell accessories grid'}
                {currentKey === 'refund' && '1.Order selector · 2.Reason checkboxes · 3.Notes text form · 4.Refund routing cards · 5.Logistics collection instructions · 6.Submission CTA summary'}
                {currentKey === 'rate' && '1.Star sentiment rating · 2.Written feedback Area · 3.Product specific reviews · 4.Verified media attachment block · 5.Success submission trigger'}
                {currentKey === 'cancel' && '1.Order identifier · 2.Cancellation motives questionnaire · 3.Detailed context text input · 4.Refund calculator summary · 5.Double confirmation triggers · 6.Timeline expectation banner'}
                {currentKey === 'checkout' && '1.Shipping information block · 2.Delivery speed selection matrix · 3.Secure payment gateways grid · 4.Sticky summary cart · 5.Order launch confirmation · 6.Security seals'}
                {currentKey === 'thankyou' && '1.Success confirmation card · 2.Fulfillment timeline status tracking · 3.Action buttons · 4.Delivery validation details · 5.Purchased receipt summary · 6.Customer support portal link'}
                {currentKey === 'store' && '1.Region, distance & complex filter selectors dropdowns · 2.Singapore outlets results indexing directory · 3.Responsive vector map locator coordinate pins'}
                {currentKey === 'wishlist' && '1.Saved wishlist items grid · 2.Conditional out-of-stock disabled CTA markers · 3.Adaptive matching affinity recommended-for-you slider'}
                {currentKey === 'profile' && '1.Avatar cellular identity coordinates tier badges · 2.Order logs indicators (pending, pickup, delivery, to-rate) · 3.Stored financial value loyalty point ledgers & wallets'}
                {currentKey === 'auth' && '1.Unified Authentication Swapper Segment · 2.Interactive Credentials Area with strength indicators · 3.Singapore +65 Mobile OTP countdown widget · 4.Secure Google/Singpass one-click sign-in CTAs'}
              </span>
            ) : (
              <span>Dynamic layout components loaded sequentially.</span>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
