/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WireframeScreen } from '../types';

export const TUTOR_SCREENS_DATA: WireframeScreen[] = [
  {
    id: 'home',
    title: 'S01: Public Home Page',
    description: 'Corporate client-facing landing page containing grade segment finders, inline match forms, client testimonies, MOE credentials, and CTA match requests.',
    metadata: {
      scope: 'K-12 Singapore Conversational Tutor Matching & Urgency Hook',
      complexity: 'High',
      security: 'Public SSL, fully anonymized live match request ticket logs',
      version: 'v2.1',
      lastUpdated: 'May 2026',
      designer: 'Lead Tutoring Systems Architect'
    },
    sections: [
      { id: 'SEC 1', name: 'Top Broadcast Announcement Ribbon', description: 'Displays nationwide educational directives, MOE adjustments, and coupon incentives for prompt booking actions.' },
      { id: 'SEC 2', name: 'Global Branding Navigation Matrix', description: 'Anchor links, logo asset, instant lookup input, and primary matching redirect buttons.' },
      { id: 'SEC 3', name: 'Conversational Matching Hero Panel & Form', description: 'Grade, Level, and Subject selectors pairing student requirements to live inventories directly.' },
      { id: 'SEC 4', name: 'National Stats Trust Ribbon', description: 'Renders prominent metrics: lessons taught, tutor count, and grade satisfaction ratios.' },
      { id: 'SEC 5', name: 'Live Active Tutoring Activity Feed', description: 'A staggered real-time update dock outlining matches currently requested or dispatched.' },
      { id: 'SEC 6', name: 'Step-by-Step Match Onboarding Pathway', description: 'Illustrates the 4-step guaranteed trial class onboarding cycle.' },
      { id: 'SEC 7', name: 'Subject catalog explore panels', description: 'Cluster buttons sorting fields by Primary, Secondary, and Junior College syllabus plans.' },
      { id: 'SEC 8', name: 'Certified Star Tutor Spotlights', description: 'Grid of 8 leading profiles exhibiting direct trial lesson rates and qualification check badges.' },
      { id: 'SEC 9', name: 'Why Us Corporate Accreditations', description: 'Focuses on background screening safeguards, tutor verification procedures, and 2-lesson trial protection guarantees.' },
      { id: 'SEC 10', name: 'MOE Teacher Spotlight of the Month', description: 'Dedicated section featuring highly rated MOE teachers with high grade improvement statistics.' },
      { id: 'SEC 11', name: 'Before/After Client Outcome Case Studies', description: 'Visual charts illustrating historical grade progress charts for students using our tutors.' },
      { id: 'SEC 12', name: 'SG Regional Parent Feedback Carousel', description: 'Detailed parent review cards containing verified school indicators (e.g., Raffles Girls, Anglo-Chinese).' },
      { id: 'SEC 13', name: 'Interactive Collapsible FAQ Segment', description: 'Frequently asked questions solving financial, billing, and timeline anxieties.' },
      { id: 'SEC 14', name: 'Hourly Budget Calculator Preview Table', description: 'Table comparing rates across Undergraduate, Graduate, and MOE Teacher tiers.' },
      { id: 'SEC 15', name: 'Media Coverage Press Ribbon', description: 'Press mentions and editorial feature layouts (Straits Times, CNA, SG Parent).' },
      { id: 'SEC 16', name: 'Secondary Match Trigger CTA banner', description: 'Large high-contrast prompt button designed to capture trailing landing scroll traffic.' },
      { id: 'SEC 17', name: 'Curated Resource Newsletter Signup', description: 'Captures email addresses for delivery of academic papers and GCE O/A level guides.' },
      { id: 'SEC 18', name: 'Corporate Footer Directory Grid', description: 'Corporate profiles, customer terms, MOE rules compliance files, and support phone nodes.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Quick Conversational Match Form',
        type: 'Form Input',
        title: 'Primary In-Hero Match Selector',
        description: 'Multi-part picker collecting Grade Level and Subject parameters above the fold.',
        interactionBehavior: 'Tapping options opens dropdown listings; selecting subject enables the "Find Tutor Match" CTA action button.',
        uxRationale: 'Allowing parents to specify needs within 2 seconds of arrival dramatically reduces bounce rates and accelerates match intent.',
        businessLogic: 'Subject values populate dynamically depending on the selected Grade Level.',
        responsiveBehavior: 'Horizontal flex bar on desktops wraps into vertical fields on 390px mobile viewports to ensure clean 44px finger tapping zones.',
        edgeCases: 'If grade tier inventory drops below 5 active tutors, displays a helper note guaranteeing custom matching requests.',
        animationBehavior: 'Select dropdown transition has a 120ms ease-out click/expand wave animation; active tags scale by 1.02x.',
        copyText: 'Headers: "Find Verified SG Tutors" | Primary Button: "Find Tutor Match" | Alert text: "Usually matched in 2 hours"',
        dataBinding: 'Bound to ClientRequestStore.currentGradeLevel & ClientRequestStore.currentSubject; triggers reactive count of live tutors.',
        x: 35,
        y: 28
      },
      {
        id: 2,
        elementName: 'Interactive Live matching Dispatch Feed',
        type: 'Card Element',
        title: 'Social Urgency Tick Grid',
        description: 'Moving ticket ledger detailing recently fulfilled matches.',
        interactionBehavior: 'A continuous vertical scroll ticker that pauses temporarily when mouse is hovered over list items.',
        uxRationale: 'Provides behavioral validation and social urgency showing active parent engagement across Singapore districts.',
        businessLogic: 'Draws live database records of matching events completed in the past 24 hours, anonymizing student surnames.',
        responsiveBehavior: 'Hidden on mobile screens under 480px to protect limited scroll viewports, fully interactive on tablet and desktop.',
        edgeCases: 'Falls back to a static banner highlighting "12,400+ Successful SG Matches Completed" if database feed suffers outages.',
        animationBehavior: 'Infinite vertical marquee scrolling animation at a speed of 18px per second; pauses on mouseEnter events.',
        copyText: 'Template: "Parent [INITIALS] in [REGION] matched with [TUTOR_TIER] for [SUBJECT]"',
        dataBinding: 'Subscribes to websocket endpoint /api/ticks/live-matches; falls back to cached localStorage mock logs.',
        x: 65,
        y: 42
      },
      {
        id: 3,
        elementName: 'Syllabus and MoT 1 Verification Badges',
        type: 'Trust Element',
        title: 'MOE & Syllabus Alignment badges',
        description: 'Accreditation ribbon illustrating Background Checked, MOE Teacher, and SEAB syllabus compatibility.',
        interactionBehavior: 'Hovering on individual icons launches micro-modals containing actual vetting parameters.',
        uxRationale: 'Safety and qualified syllabus alignment are the primary mental barriers for parents, addressing security requirements instantly.',
        businessLogic: 'Every tutor is linked to physical NRIC documents and academic cert records verified by administrative boards.',
        responsiveBehavior: 'Converts from inline horizontal grid to tight 2x2 grid on mobile viewports.',
        edgeCases: 'Maintains static outline rendering if screen reads do not support hover scripts.',
        animationBehavior: 'Hover scales individual badges up by 1.05x with an spring transition; popover animates on a 200ms opacity curve.',
        copyText: 'Accreditations: "SEAB Syllabus Compliant" | "Complimentary Trial Protection" | "100% Identity Vetted"',
        dataBinding: 'Bound to regulatory license codes metadata model sourced from Ministry Vetting records; validates certificate status.',
        x: 50,
        y: 12
      },
      {
        id: 4,
        elementName: 'Hourly estimation Table Selector',
        type: 'Pricing Block',
        title: 'Pricing Tier Segmented Controls',
        description: 'Tabbed columns displaying estimated costs depending on active school grades and tutor background tiers.',
        interactionBehavior: 'Clicking tabs switches the table state to display different pricing categories.',
        uxRationale: 'Ensures upfront price transparency, eliminating customer concern about custom agency billing surcharges.',
        businessLogic: 'Hourly rates represent calculated Singapore tutoring averages within +/- 10% variances.',
        responsiveBehavior: 'Table columns adapt width dynamically; columns scroll horizontally on ultra-compact screens.',
        edgeCases: 'Provides detailed link trigger redirecting straight to S06 Pricing Fee Calculator.',
        animationBehavior: 'Horizontal page flip sliding indicator animation with a bezier curve (0.4, 0, 0.2, 1) on tab state change.',
        copyText: 'Table headers: "Tutor Category" | "Estimated Hourly Rate" | "Average Grade Boost Ratio"',
        dataBinding: 'Consumes Singapore Tutoring Price Index API data points; dynamically calculated using current selected level index.',
        x: 50,
        y: 78
      },
      {
        id: 5,
        elementName: 'Accordion FAQ Toggles',
        type: 'Form Input',
        title: 'Collapsible FAQ Item Trigger',
        description: 'Vertical rows displaying questions on trial options, cancellation, and transaction payment schedules.',
        interactionBehavior: 'Clicking any row collapses open elements and unfolds selected text blocks smoothly.',
        uxRationale: 'Keeps FAQ content dense yet scannable, eliminating complex redirects to external FAQ guides.',
        businessLogic: 'SLA rules dictate that all tutor replacements within 2 lessons are 100% complimentary.',
        responsiveBehavior: 'Padding metrics adjust automatically to match hand dimensions.',
        edgeCases: 'If accordion height exceeds screen limits, active elements stick beneath viewport tops.',
        animationBehavior: 'Height expand utilizes Framer Motion / CSS transition: height ease-in-out duration-300ms.',
        copyText: 'FAQ Items: "Can I replace the tutor?" | "Are there trial booking contract rules?"',
        dataBinding: 'Binds expand states indexes to an array of integers representing expanded items: Array<number>.',
        x: 20,
        y: 92
      }
    ]
  },
  {
    id: 'search',
    title: 'S02: Online Search Directory',
    description: 'Tutoring catalog search list including progressive filter sidebar, star ratings, interactive tutor comparisons, and pagination triggers.',
    metadata: {
      scope: 'Subject Catalog Search, Advanced Vetting Filters, and Comparative Dock',
      complexity: 'High',
      security: 'End-to-end matching request parameters verification logs',
      version: 'v2.1',
      lastUpdated: 'May 2026',
      designer: 'Lead Directory Interaction Designer'
    },
    sections: [
      { id: 'SEC 1', name: 'Active Vetting Search Query Header', description: 'Highlights current filtered results counts with contextual grade descriptors.' },
      { id: 'SEC 2', name: 'Catalog Sorting & Sequence Controller', description: 'Allows directory classifications by relevance, review scores, and lesson rates.' },
      { id: 'SEC 3', name: 'Progressive Selector Filter Sidebar', description: 'Vetting panels comprising location select checkboxes, subjects, pricing sliders, and background credentials.' },
      { id: 'SEC 4', name: 'Tutor Profiles Results Grid Matrix', description: 'Multi-column presentation of qualified tutors including credentials, specialties, ratings, and select compare checklists.' },
      { id: 'SEC 5', name: 'Interactive Tutor Comparison Lock Drawer', description: 'Floating drawer comparing timing schedules, qualifications, and rates of selected profiles side-by-side.' },
      { id: 'SEC 6', name: 'Regulatory Catalog Pagination Nodes', description: 'Standard numerical controls to paginate results sheets.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Vetted Filter Actions Sidebar',
        type: 'Form Input',
        title: 'Multi-Select Progressive filters',
        description: 'Vetting options covering tutor status (e.g., graduate, MOE teacher) and regional locations.',
        interactionBehavior: 'Toggling checkboxes updates result counts and filters tutors list with AJAX reload animations.',
        uxRationale: 'Enables precise selection criteria alignment, ensuring parents filter relevant matches quickly.',
        businessLogic: 'Tutors are indexed under specific region nodes (North, East, West, Central) to minimize commute timings.',
        responsiveBehavior: 'Collapses into a floating "Filter (Filters Active)" mobile trigger action on small devices.',
        edgeCases: 'If filters eliminate all profiles, displays a clean CTA offering to hand-pick suitable matches via coordinators.'
      },
      {
        id: 2,
        elementName: 'Card Compare Selector Box',
        type: 'Interactive Option',
        title: 'Tutor comparison trigger',
        description: 'Checkbox trigger aligned at the bottom boundary of each tutor card.',
        interactionBehavior: 'Checking appends tutor into bottom comparison drawer; unchecking dismisses listing.',
        uxRationale: 'Allows parents to evaluate specific credentials, rates, and schedule timings without page jumping.',
        businessLogic: 'Restricts active dock comparison selections to maximum of 3 concurrent tutor cards.',
        responsiveBehavior: 'Maintains simple select tick frames on mobile screens.',
        edgeCases: 'Enters disabled state on unselected cards once 3-tutor limits are reached, showing helpful warning tooltip.'
      },
      {
        id: 3,
        elementName: 'Floating Tutor Comparison Drawer',
        type: 'CTA',
        title: 'Sticky Compare Handoff Dock',
        description: 'High-contrast docking bar popping up horizontally at the bottom of the viewport.',
        interactionBehavior: 'Slide animations transition dock on and off; clicking active SGP CTA redirects straight to S03 Profile comparison overlays.',
        uxRationale: 'Maintains persistent contextual state, allowing immediate comparison reviews without scrolling upwards.',
        businessLogic: 'Validates that docked items are within identical academic Grade Level parameters.',
        responsiveBehavior: 'Occupies full width on mobile viewports, compressing tutor cards to thumbnail representations.',
        edgeCases: 'Fully collapses when page is refreshed, saving active matching choices in local storage states.'
      }
    ]
  },
  {
    id: 'product',
    title: 'S03: Tutor Profile & Portfolio',
    description: 'Comprehensive certified tutor biography screen. Displays trust indicators, video introduction console, timeline of experiences, scheduler availability calendar, and ratings.',
    metadata: {
      scope: 'Tutor Expertise Dossier & Live Trial Scheduler',
      complexity: 'High',
      security: 'Restricted review posting to verified paying parent accounts',
      version: 'v2.2',
      lastUpdated: 'May 2026',
      designer: 'Lead Academic Board Designer'
    },
    sections: [
      { id: 'SEC 1', name: 'Information Header Hero Panel', description: 'Detailed visual profile displaying headshot asset, verification badges, and trial lesson pricing.' },
      { id: 'SEC 2', name: 'Introductory Communication Video Console', description: 'High-definition video intro slot helping parents evaluate tutor communication and presentation rapport.' },
      { id: 'SEC 3', name: 'Qualified Curricular Experience Timeline', description: 'Chronology listing academic history, SEAB syllabus familiarity, and school departments taught.' },
      { id: 'SEC 4', name: 'Availability Scheduler Interface Grid', description: 'An interactive week-view agenda calendar allowing instant spot selection.' },
      { id: 'SEC 5', name: 'Lesson Package Pricing Matrix', description: 'Cost tables presenting individual hours vs regular flat rates.' },
      { id: 'SEC 6', name: 'Granular Parents review Hub', description: 'List of verified parental reviews, grade improvements (Before/After logs), and student recommendations.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Video Intro Communication Hub',
        type: 'CTA',
        title: 'Tutor Introduction Video Player',
        description: 'Self-hosted modular media console hosting a short tutor recording.',
        interactionBehavior: 'Plays introductory recording on hover or tap, supported by system captioned transcripts.',
        uxRationale: 'A tutor communication check represents Moment of Truth 1. Reviewing pronunciation and pedagogy resolves anxieties before booking.',
        businessLogic: 'Video records are reviewed by educational quality boards before public profiles launch.',
        responsiveBehavior: 'Adapts standard aspect-ratios, maintaining clear accessibility of player controllers.',
        edgeCases: 'Loadsstatic thumbnail and teaching text quotes if networks are sluggish or data-saving mode is active.'
      },
      {
        id: 2,
        elementName: 'Interactive Availability Scheduler Grid',
        type: 'Form Input',
        title: 'Time Slot Picker Agenda',
        description: 'Interactive weekly calendar showing available intervals (green) vs fully booked hours (grey).',
        interactionBehavior: 'Tapping a slot highlights choice; allows double selecting multiple slots to book recurring patterns.',
        uxRationale: 'Removes back-and-forth communication regarding tutor schedules, shortening match timelines.',
        businessLogic: 'Timescales align directly with local SG timezone databases, blocking conflicting appointments.',
        responsiveBehavior: 'Displays horizontal swipe week view on mobile, full grid on desktop.',
        edgeCases: 'Slots lock for 10 minutes upon selection to avoid double-bookings from concurrent browsing parent sessions.'
      },
      {
        id: 3,
        elementName: 'Verified Grade Progress Metrics',
        type: 'Card Element',
        title: 'Student Improvement Index Card',
        description: 'Metric badges mapping grade jump histories (e.g., Average Progress: B4 to A1 in 4 months) on parent reviews.',
        interactionBehavior: 'Read-only tags supported by hover statistics charts.',
        uxRationale: 'Proves efficiency of tutoring, transforming subjective client comments into hard numbers.',
        businessLogic: 'Drawn from actual reports submitted during annual grade survey audits.',
        responsiveBehavior: 'Compressed layout on smaller viewports, text adjusts size.',
        edgeCases: 'Displays standard star rankings if parent did not submit final exam logs.'
      }
    ]
  },
  {
    id: 'cart',
    title: 'S04: Subject Catalog Matrix',
    description: 'Educational grade catalog portal allowing subject-track selection, national prep combo package additions, and exam track allocations.',
    metadata: {
      scope: 'Grade-Level Subject Bundles, Exam Preparation Tracks, and Cart Allocation',
      complexity: 'Medium',
      security: 'Academic eligibility logic constraints',
      version: 'v2.0',
      lastUpdated: 'May 2026',
      designer: 'Syllabus Alignment Board'
    },
    sections: [
      { id: 'SEC 1', name: 'Primary/Secondary Academic Filter Tabs', description: 'Toggle switches filtering the syllabus catalog by grades.' },
      { id: 'SEC 2', name: 'Syllabus Subject Cards Array', description: 'Displays subjects (English, A-Math, H2 Physics) with curriculum labels.' },
      { id: 'SEC 3', name: 'GCE National Exam Preparation Packages', description: 'Specialized intensive crash courses aiming to target exam routines.' },
      { id: 'SEC 4', name: 'Discount Subject Combo Deals', description: 'Duo/Trio subject discounted bundles.' },
      { id: 'SEC 5', name: 'Curriculum Guarantees Ribbon', description: 'Confirms SEAB standard syllabus alignments.' },
      { id: 'SEC 6', name: 'Dispatch Queue Dock Panel', description: 'Displays chosen items to schedule for matching.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Combo Duo Subject Package Add',
        type: 'CTA',
        title: 'Bundle Selection CTA Button',
        description: 'Prominent pricing button applying flat rate discount for dual subject requests.',
        interactionBehavior: 'Moves chosen bundle elements into checkout queues dynamically.',
        uxRationale: 'Encouraging parents to commit to cohesive dual subjects (e.g. A-Math + Physics) resolves syllabus weaknesses and increases lesson volumes.',
        businessLogic: 'Discounts apply strictly to concurrent items for the same student identifier profile.',
        responsiveBehavior: 'Buttons expand to occupy full viewport width on mobile.',
        edgeCases: 'Checks inventory and warns user if dual fields have limited slot allocations.'
      }
    ]
  },
  {
    id: 'refund',
    title: 'S05: How It Works Workflow',
    description: 'Educational operational hub mapping progress steps, details of matching policies, substitution guarantees, and onboarding registration forms.',
    metadata: {
      scope: 'Onboarding System Flow and Risk Reassurance Guidelines',
      complexity: 'Medium',
      security: 'Verified parent credentials validation',
      version: 'v1.4',
      lastUpdated: 'May 2026',
      designer: 'Operations Experience Architect'
    },
    sections: [
      { id: 'SEC 1', name: 'Operational Steps Sequence Widget', description: 'Interactive visual progress chart showing match cycles.' },
      { id: 'SEC 2', name: 'Granular Operational Policy Cards', description: 'Tabs detailing matches selection, trial classes, and lesson billing steps.' },
      { id: 'SEC 3', name: 'Tutoring Replacement Guarantees', description: 'Bold highlights reassuring replacement trials if tutor rapport fails.' },
      { id: 'SEC 4', name: 'Onboarding Multi-Step Registration Form', description: 'Parent details questionnaire to initialize match queues.' },
      { id: 'SEC 5', name: 'Professional Tutor Quality Comparison Matrix', description: 'Comparison of tutoring models in Singapore.' },
      { id: 'SEC 6', name: 'Curated FAQ Segment', description: 'Standard policy query accordions.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Replacement Guarantee Badge',
        type: 'Trust Element',
        title: 'Complimentary Rematch Promise',
        description: 'Dedicated seal graphic asserting 100% free rematch logic if tutor fails expectation.',
        interactionBehavior: 'Read-only prominent callout.',
        uxRationale: 'Solves financial trust hurdles, reassuring parents of secure match fulfillment.',
        businessLogic: 'Rematch claim must be registered inside 2 lessons from trial launch.',
        responsiveBehavior: 'Centers dynamically on responsive displays.',
        edgeCases: 'Integrates inline modal link outlining replacement instructions.'
      }
    ]
  },
  {
    id: 'rate',
    title: 'S06: Pricing & Value Calculator',
    description: 'Dynamic math tool modeling weekly hours, academic grade tier selections, estimated cost configurations, and instant booking submission CTAs.',
    metadata: {
      scope: 'Lesson Budget Estimator, Qualification Rate Multipliers, and Booking Locks',
      complexity: 'Medium',
      security: 'Pricing models data validation logs',
      version: 'v2.3',
      lastUpdated: 'May 2026',
      designer: 'Corporate Financial Strategy'
    },
    sections: [
      { id: 'SEC 1', name: 'Weekly Lesson hours Selector Slider', description: 'Interactive selector for specifying study session lengths.' },
      { id: 'SEC 2', name: 'Tutor Tier Vetting Checkbox Cards', description: 'Options selecting Undergraduate, Graduate, or MOE School Teachers.' },
      { id: 'SEC 3', name: 'Estimated Monthly Billing Result Console', description: 'Dynamic dashboard displaying billing summaries.' },
      { id: 'SEC 4', name: 'Fixed Lesson Fee Rate Table', description: 'Cost indexes by level and tutor qualification.' },
      { id: 'SEC 5', name: 'Onboard Quick Match CTA Link', description: 'Action target initializing final match records setup.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Interactive Hours Selector Slider',
        type: 'Form Input',
        title: 'Session Duration Calculator Slider',
        description: 'Slider element specifying standard weekly lesson duration from 1.5h to 6h.',
        interactionBehavior: 'Dragging slider updates calculated totals and invoice line items instantly.',
        uxRationale: 'Visualizing duration adjustments gives parents control over monthly academic investments.',
        businessLogic: 'Normalizes calculator output based on a standard 4-week calendar matrix.',
        responsiveBehavior: 'Spans full screen widths, utilizing responsive sizing anchors.',
        edgeCases: 'Locks hours to MOE recommended guidelines depending on the student grade selected.'
      }
    ]
  },
  {
    id: 'cancel',
    title: 'S07: Order Cancellation Flow',
    description: 'Cancellation portal collecting termination reasons, assessing unused lesson credit balances, and offering tutor rematch retention options.',
    metadata: {
      scope: 'Appointment Retraction & rematched Tutor Retention Dialogs',
      complexity: 'Medium',
      security: 'Requires student matching token authentication',
      version: 'v1.4',
      lastUpdated: 'May 2026',
      designer: 'CRM Retention Strategist'
    },
    sections: [
      { id: 'SEC 1', name: 'Cancellation Match Identity Panel', description: 'Displays tutor name, grade, weekly lessons, and match duration.' },
      { id: 'SEC 2', name: 'Vetting Cancellation Reasons', description: 'Checklist to capture reasons for class termination (e.g. Schedule clashes, grade improved).' },
      { id: 'SEC 3', name: 'Open Explanation Textarea', description: 'Feedback box recording customer remarks.' },
      { id: 'SEC 4', name: 'Calculated Refund Settlement Ledger', description: 'Summarizes lesson balances and credit returns.' },
      { id: 'SEC 5', name: 'REMAPPED TUTOR Rematch Retention Module', description: 'Presents custom tutor alternatives or rematches with zero matching fees.' },
      { id: 'SEC 6', name: 'Cancellation Commit CTA Button', description: 'Triggers match cancellation.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: ' rematched Rematch Program Box',
        type: 'CTA',
        title: 'Priority Rematch Selector Card',
        description: 'Highlight block suggesting instant coordinator intervention for tutor rematching.',
        interactionBehavior: 'Clicking aborts cancellation and loads match options tailored to complaints.',
        uxRationale: 'Provides a helpful solution to complaints (e.g. tutor mismatch) instead of losing the customer account.',
        businessLogic: 'Offers priority rematching with 1 lesson credit bonus to drive customer retention.',
        responsiveBehavior: 'Highlighted styling scales nicely on responsive displays.',
        edgeCases: 'Presents dynamic chat messenger prompts if profile alternatives do not match.'
      }
    ]
  },
  {
    id: 'checkout',
    title: 'S08: Secure Checkout Completion',
    description: 'Information collection panel compiling lesson timeline schedules, PayNow QR vectors, credit card inputs, and billing summations with 9% SG GST.',
    metadata: {
      scope: 'Transactional Matching Payments Gateway and Tax Compliance',
      complexity: 'High',
      security: 'SSL Encrypted gateways, tokenized PayNow nodes, PCI compliance',
      version: 'v2.5',
      lastUpdated: 'May 2026',
      designer: 'E-commerce Payments Specialist'
    },
    sections: [
      { id: 'SEC 1', name: 'Student Academic Registration Segment', description: 'Details student name, school level, and lesson addresses.' },
      { id: 'SEC 2', name: 'Confirmed Weekly Class timings Block', description: 'Lists selected time intervals, start dates, and lesson frequency.' },
      { id: 'SEC 3', name: 'Local SG Payment Gateways Interface', description: 'Integrates local PayNow QR, credit cards, or periodic bank GIRO transfers.' },
      { id: 'SEC 4', name: 'Pricing invoice summary Sidebar', description: 'Lists lesson packages, discount offsets, and 9% SG GST charges.' },
      { id: 'SEC 5', name: 'Place Order CTA Completion', description: 'Solid action target initializing final matching locks.' },
      { id: 'SEC 6', name: 'Trust Accreditation Ribbon', description: 'SSL, PCI compliance, and SG consumer safety badges.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Singapore PayNow QR Code Box',
        type: 'CTA',
        title: 'PayNow Gateway QR Node',
        description: 'Generates PayNow vector QR codes linked to match billing invoices.',
        interactionBehavior: 'Scans QR to trigger instant matching transactions inside consumer bank apps.',
        uxRationale: 'PayNow provides frictionless transactions in SG, shortening checkout times to seconds.',
        businessLogic: 'Generates secure UEN tokenized payload values containing matching invoice metadata.',
        responsiveBehavior: 'Displays full-width scan boxes scaled for mobile screens.',
        edgeCases: 'Saves reference number and copies standard bank transfer instructions if QR scanners fail.'
      },
      {
        id: 2,
        elementName: 'Singapore GST 9% Tabulation',
        type: 'Pricing Block',
        title: 'SG Tax Compliance Invoice Card',
        description: 'Invoice breakdown illustrating calculation of Singapore 9% GST.',
        interactionBehavior: 'Computed sum, hover displays tax registration credentials.',
        uxRationale: 'Ensures billing transparency, avoiding hidden transaction cost friction.',
        businessLogic: 'Applies mandatory Singapore 9% GST calculations across transaction records.',
        responsiveBehavior: 'Renders in font-mono layout, maintaining legibility on compact devices.',
        edgeCases: 'Zero-rates tax if student resides in offshore regions for remote exam preparations.'
      }
    ]
  },
  {
    id: 'thankyou',
    title: 'S09: Success & Progress Tracker',
    description: 'Tutoring appointment confirmation page. Displays matched tutor name, study schedule timeline, next lesson indicators, and matching dispatch tracker.',
    metadata: {
      scope: 'Tutoring Match Dispatch Progress and Scheduling Dispatch Hub',
      complexity: 'Medium',
      security: 'Student match identity credentials encryption',
      version: 'v2.0',
      lastUpdated: 'May 2026',
      designer: 'Student Success Onboarding Group'
    },
    sections: [
      { id: 'SEC 1', name: 'Welcome Match Success Card', description: 'Celebratory header showing confirmed tutor name and active lesson tokens.' },
      { id: 'SEC 2', name: 'Interactive Lesson Schedule calendar', description: 'Displays class schedules, syllabus details, and contact nodes.' },
      { id: 'SEC 3', name: 'Class Preparation Download Assets', description: 'Offers preparation materials and curricular diagnostic guides.' },
      { id: 'SEC 4', name: 'Live Match Dispatch Stage timeline', description: 'Tracks dispatcher statuses: Matching ➔ Confirmed ➔ Curricula Dispatched ➔ Lesson Active.' },
      { id: 'SEC 5', name: 'Singapore School Calendar Syllabus Guidelines', description: 'Provides SG holiday calendars and exam date reminders.' },
      { id: 'SEC 6', name: 'Client Support helpline', description: 'SGP coordinator chat nodes and helpline options.' }
    ],
    annotations: [
      {
        id: 1,
        elementName: 'Live Match Stage Ticker',
        type: 'Card Element',
        title: 'Milestone Tracking Timeline',
        description: 'Timeline illustrating scheduling validations, materials prep, and teacher briefings.',
        interactionBehavior: 'Interactive step check indicators check status as progress evolves.',
        uxRationale: 'Maintains clear communication on setup progress, alleviating post-booking anxiety before the trial session.',
        businessLogic: 'Updates milestones based on backend logistics databases tracking lesson preparations.',
        responsiveBehavior: 'Collapses to vertical timeline nodes on small viewports.',
        edgeCases: 'Triggers notification alert banner if scheduling require manual adjustment.'
      }
    ]
  }
];

export function generateHtmlSpec(): string {
  // Convert screen data into JSON strings to embed directly into the offline script
  const screensJson = JSON.stringify(TUTOR_SCREENS_DATA, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MARGICK: K-12 Tutoring (SG) UX Wireframe Specification & System Audit</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-canvas: #f4f4f5;
            --bg-panel: #ffffff;
            --border-primary: #cbd5e1;
            --border-dashed: #94a3b8;
            --text-heading: #18181b;
            --text-body: #27272a;
            --text-muted: #71717a;
            --accent-brand: #e11d48;
            --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: var(--font-sans);
            color: var(--text-body);
            background-color: var(--bg-canvas);
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
        }

        /* 1. STICKY TOP SPECIFICATION BAR */
        .spec-bar {
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background-color: #09090b;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 24px;
            border-bottom: 2px solid var(--accent-brand);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
        }

        .spec-brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .spec-logo {
            font-family: var(--font-mono);
            font-weight: 900;
            font-size: 14px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .spec-dot {
            color: var(--accent-brand);
            font-size: 16px;
            animation: pulse-glow 1.5s infinite;
        }

        @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }

        .spec-tag {
            font-family: var(--font-mono);
            font-size: 10px;
            padding: 2px 8px;
            background-color: #18181b;
            border: 1px solid #3f3f46;
            border-radius: 4px;
            color: #f4f4f5;
        }

        .spec-controls {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .spec-dropdown {
            background-color: #18181b;
            color: #ffffff;
            border: 1px solid #3f3f46;
            padding: 6px 12px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: bold;
            outline: none;
            cursor: pointer;
            transition: all 0.15s ease;
        }

        .spec-dropdown:hover {
            border-color: var(--accent-brand);
        }

        .viewport-selector {
            display: flex;
            background-color: #18181b;
            border: 1px solid #3f3f46;
            border-radius: 4px;
            padding: 2px;
        }

        .viewport-btn {
            background: none;
            border: none;
            color: #a1a1aa;
            padding: 4px 10px;
            border-radius: 2px;
            cursor: pointer;
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: bold;
            transition: all 0.15s ease;
        }

        .viewport-btn.active {
            background-color: var(--accent-brand);
            color: #ffffff;
        }

        /* LAYOUT FRAMEWORK */
        .workspace {
            display: grid;
            grid-template-columns: 320px 1fr 360px;
            height: calc(100vh - 60px);
            overflow: hidden;
            background-color: #f4f4f5;
        }

        @media (max-width: 1200px) {
            .workspace {
                grid-template-columns: 1fr;
                height: auto;
                overflow: initial;
            }
        }

        /* LEFT SIDEBAR (TOC + Screen Specs) */
        .sidebar {
            background-color: #fafafa;
            border-right: 1px solid #cbd5e1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        /* MAIN CANVA AREA */
        .canvas-area {
            overflow: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 32px;
            position: relative;
            background-color: #fff;
        }

        /* RIGHT PANEL: ANNOTATIONS */
        .annotations-panel {
            background-color: #fafafa;
            border-left: 1px solid #cbd5e1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        /* SPECIFICATION SECTIONS */
        .spec-section-title {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 900;
            color: var(--text-heading);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-bottom: 2px solid var(--text-heading);
            padding-bottom: 6px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .screen-meta-grid {
            display: flex;
            flex-direction: column;
            gap: 10px;
            font-family: var(--font-mono);
            font-size: 11px;
            background-color: #ffffff;
            border: 1px solid #cbd5e1;
            padding: 16px;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }

        .screen-meta-row {
            display: flex;
            justify-content: space-between;
            border-bottom: 1.5px dashed #f4f4f5;
            padding-bottom: 6px;
        }

        .screen-meta-row:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }

        .screen-meta-label {
            color: var(--text-muted);
            font-weight: bold;
        }

        .screen-meta-val {
            font-weight: 700;
            color: var(--text-heading);
            text-align: right;
        }

        /* SECTION TABLE OF CONTENTS */
        .section-toc {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .toc-item {
            display: flex;
            align-items: flex-start;
            padding: 8px 12px;
            background-color: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            font-size: 11px;
            font-family: var(--font-sans);
            cursor: pointer;
            transition: all 0.15s ease;
        }

        .toc-item:hover {
            border-color: var(--accent-brand);
            background-color: #fff8f8;
        }

        .toc-badge {
            background-color: #18181b;
            color: #fff;
            padding: 1px 5px;
            border-radius: 2px;
            font-family: var(--font-mono);
            font-size: 9px;
            font-weight: 800;
            margin-right: 8px;
            flex-shrink: 0;
            margin-top: 2px;
        }

        /* ANNOTATION CALLOUT CARDS */
        .callout-card {
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            padding: 16px;
            background-color: #ffffff;
            transition: all 0.2s ease;
            position: relative;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }

        .callout-card:hover {
            border-color: #71717a;
        }

        .callout-card.active {
            border-color: var(--accent-brand);
            box-shadow: 0 4px 16px rgba(225, 29, 72, 0.08);
            background-color: #fff8f8;
            outline: 1px solid var(--accent-brand);
        }

        .callout-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
            flex-wrap: wrap;
        }

        .pin-badge {
            width: 20px;
            height: 20px;
            background-color: var(--text-heading);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: bold;
        }

        .callout-card.active .pin-badge {
            background-color: var(--accent-brand);
        }

        .callout-title {
            font-size: 12px;
            font-weight: 800;
            color: var(--text-heading);
        }

        .callout-type {
            font-family: var(--font-mono);
            font-size: 8px;
            padding: 2px 6px;
            background-color: #f1f5f9;
            border: 0.5px solid #cbd5e1;
            border-radius: 2px;
            color: #475569;
            text-transform: uppercase;
            font-weight: bold;
        }

        .callout-desc {
            font-size: 11px;
            color: var(--text-body);
            margin-bottom: 12px;
            line-height: 1.4;
        }

        .callout-detail-grid {
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-size: 10.5px;
            border-top: 1.5px dashed #cbd5e1;
            padding-top: 8px;
        }

        .callout-detail-block {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .callout-detail-label {
            font-family: var(--font-mono);
            font-weight: 800;
            color: var(--text-muted);
            text-transform: uppercase;
            font-size: 8px;
            letter-spacing: 0.5px;
        }

        .callout-detail-val {
            color: var(--text-body);
        }

        /* MOCKUP VIEWER WRAPPERS */
        .mockup-container {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background-color: #ffffff;
            border: 1px solid #cbd5e1;
            box-shadow: 0 10px 40px rgba(0,0,0,0.06);
            position: relative;
            transform-origin: top center;
        }

        .mockup-container.desktop {
            width: 1440px;
        }

        .mockup-container.tablet {
            width: 768px;
        }

        .mockup-container.mobile {
            width: 390px;
            border-radius: 16px;
            border-width: 4px;
            border-color: #18181b;
        }

        /* DYNAMIC OVERVIEW / INTRODUCTION BANNER */
        .intro-section {
            background-color: #ffffff;
            border-bottom: 1px solid #cbd5e1;
            padding: 40px;
            max-width: 1200px;
            margin: 40px auto;
            border-radius: 4px;
            border: 1px solid #cbd5e1;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .intro-title {
            font-size: 24px;
            font-weight: 900;
            color: var(--text-heading);
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: -0.5px;
            border-left: 4px solid var(--accent-brand);
            padding-left: 16px;
        }

        .intro-desc {
            font-size: 14px;
            color: var(--text-muted);
            margin-bottom: 24px;
            line-height: 1.6;
        }

        /* ANNOTATION LEGEND SECTION */
        .legend-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 11px;
            font-family: var(--font-mono);
            font-weight: bold;
        }

        .legend-color {
            width: 14px;
            height: 14px;
            border-radius: 3px;
        }

        /* TECHNICAL WIREFRAME SIMULATED STYLES */
        .wf-header {
            border-bottom: 1.5px solid #181111;
            padding: 14px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #09090b;
            color: #ffffff;
        }

        .wf-footer {
            border-top: 2px solid #18181b;
            padding: 24px;
            background-color: #18181b;
            color: #d4d4d8;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            font-size: 11px;
        }

        @media (max-width: 768px) {
            .wf-footer {
                grid-template-columns: 1fr;
            }
        }

        .wf-placeholder {
            border: 1px dashed var(--border-dashed);
            background-color: #fafafa;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-mono);
            font-size: 10px;
            color: #71717a;
            position: relative;
            text-align: center;
            font-weight: bold;
            padding: 12px;
        }

        .wf-cross-svg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            stroke: #e4e4e7;
            stroke-width: 1;
            stroke-dasharray: 2 2;
        }

        .wf-btn-solid {
            background-color: var(--text-heading);
            color: #ffffff;
            font-size: 11px;
            font-family: var(--font-mono);
            padding: 10px 16px;
            border-radius: 3px;
            text-align: center;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .wf-btn-solid.brand {
            background-color: var(--accent-brand);
        }

        .wf-btn-outline {
            border: 1.5px solid var(--text-heading);
            color: var(--text-heading);
            font-size: 11px;
            font-family: var(--font-mono);
            padding: 10px 16px;
            border-radius: 3px;
            text-align: center;
            font-weight: 900;
            background-color: transparent;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* PIN OVERLAYS FOR THE STANDALONE VIEWER */
        .spec-pin {
            position: absolute;
            width: 22px;
            height: 22px;
            background-color: var(--text-heading);
            color: #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: bold;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            cursor: pointer;
            z-index: 50;
            transform: translate(-50%, -50%);
            transition: all 0.2s ease;
        }

        .spec-pin:hover {
            transform: translate(-50%, -50%) scale(1.2);
            background-color: var(--accent-brand);
        }

        .spec-pin.active {
            box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.4);
            background-color: var(--accent-brand);
        }

        /* FIXED DOCUMENTATION FOOTER */
        .doc-footer {
            background-color: #09090b;
            color: #a1a1aa;
            padding: 40px;
            border-top: 4px solid var(--accent-brand);
            font-size: 12px;
            font-family: var(--font-mono);
        }

        .doc-footer-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 32px;
        }

        .doc-footer-col h4 {
            color: #f4f4f5;
            margin-bottom: 12px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid #27272a;
            padding-bottom: 6px;
        }

        .doc-footer-col ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .doc-footer-col li {
            position: relative;
            padding-left: 12px;
        }

        .doc-footer-col li::before {
            content: "•";
            color: var(--accent-brand);
            position: absolute;
            left: 0;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <!-- 1. STICKY TOP SPECIFICATION BAR -->
    <header class="spec-bar">
        <div class="spec-brand">
            <span class="spec-logo">MARGICK <span class="spec-dot">●</span></span>
            <span class="spec-tag">SG K-12 TUTOR SPEC</span>
            <span class="spec-tag" style="background-color: #e11d48; border-color: #e11d48; font-weight: 900;">BATCH 1 v2</span>
        </div>

        <div class="spec-controls">
            <!-- Screen Switcher selector -->
            <select id="screen-select" class="spec-dropdown" onchange="switchScreen(this.value)">
                ${TUTOR_SCREENS_DATA.map(s => '<option value="' + s.id + '">' + s.title + '</option>').join('\n')}
            </select>

            <!-- Breakpoint selectors -->
            <div class="viewport-selector">
                <button class="viewport-btn active" id="btn-desktop" onclick="switchBreakpoint('desktop')">
                    D1440
                </button>
                <button class="viewport-btn" id="btn-tablet" onclick="switchBreakpoint('tablet')">
                    T768
                </button>
                <button class="viewport-btn" id="btn-mobile" onclick="switchBreakpoint('mobile')">
                    M390
                </button>
            </div>
        </div>
    </header>

    <!-- INTRO / OVERVIEW SECTION -->
    <section class="intro-section">
        <h1 class="intro-title">MARGICK: K-12 Tutoring Singapore UX System Blueprint</h1>
        <p class="intro-desc">
            This Hand-Off Specification establishes physical layout boundaries, core grid alignments, system workflows, and responsive designs for developers and stakeholders implementing the Margick K-12 Tutor Matching flow series.
        </p>

        <h3 class="spec-section-title">ANNOTATION INDEX LEGEND</h3>
        <div class="legend-grid">
            <div class="legend-item">
                <div class="legend-color" style="background-color: #2563eb; border: 1.5px solid #1d4ed8;"></div>
                <span>CTA & Redirect Targets</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #7c3aed; border: 1.5px solid #6d28d9;"></div>
                <span>Form Inputs & Toggles</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #10b981; border: 1.5px solid #059669;"></div>
                <span>Trust Accreditation Seals</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #f59e0b; border: 1.5px solid #d97706;"></div>
                <span>Accounting & SGD GST Calculations</span>
            </div>
        </div>
    </section>

    <!-- INTERACTIVE WORKBENCH -->
    <main class="workspace">
        <!-- LEFT PANEL: TOC + METADATA -->
        <aside class="sidebar">
            <div>
                <h3 class="spec-section-title">ACTIVE SCREEN SPEC</h3>
                <div class="screen-meta-grid" id="screen-meta">
                    <!-- Dynamic meta injected -->
                </div>
            </div>

            <div>
                <h3 class="spec-section-title">LAYOUT TOC HIERARCHY</h3>
                <div class="section-toc" id="section-toc">
                    <!-- Dynamic sections injected -->
                </div>
            </div>
        </aside>

        <!-- CENTER PANEL: LIVE MOCKUP FRAME -->
        <section class="canvas-area">
            <div id="mockup" class="mockup-container desktop">
                <!-- Inner wireframe visualization frame -->
                <div class="wf-header">
                    <span style="font-family: var(--font-mono); font-weight: 900; font-size: 13px; letter-spacing: 1px;">MARGICK · SG TUTORS</span>
                    <span style="font-family: var(--font-mono); font-size: 9px; color: #a1a1aa; background-color: #18181b; padding: 2px 6px; border-radius: 2px;">MOE ALIGNED</span>
                </div>
                
                <div id="mockup-content" style="padding: 32px; min-height: 480px; position: relative;">
                    <!-- Skeletons injected dynamic -->
                </div>
                
                <div class="wf-footer">
                    <div>
                        <strong style="color: #ffffff;">MARGICK SG Tutors</strong>
                        <p style="font-size: 9px; color: #a1a1aa; margin-top: 4px;">Premium Academic Resource matching Systems</p>
                    </div>
                    <div>
                        <strong style="color: #ffffff;">Operations Department</strong>
                        <p style="font-size: 9px; color: #a1a1aa; margin-top: 4px;">2-Lesson Trial Guarantee &bull; MOE Vetting Guidelines</p>
                    </div>
                    <div>
                        <strong style="color: #ffffff;">Syllabus Integration</strong>
                        <p style="font-size: 9px; color: #a1a1aa; margin-top: 4px;">SEAB GCE O-Level / H2 A-Level Compatible</p>
                    </div>
                </div>

                <!-- Live absolute pins layer -->
                <div id="pins-layer"></div>
            </div>
        </section>

        <!-- RIGHT PANEL: SPECIFICATION ARRAYS -->
        <aside class="annotations-panel" id="annotations-ledger">
            <!-- Dynamic annotations cards injected -->
        </aside>
    </main>

    <!-- FOOTER DOCUMENTATION SECTION -->
    <footer class="doc-footer">
        <div class="doc-footer-grid">
            <div class="doc-footer-col">
                <h4>CORE UX POLICIES</h4>
                <ul>
                    <li>Off-white layouts set readable specifications canvas backgrounds.</li>
                    <li>All mobile navigation targets maintain minimum 44px margins.</li>
                    <li>Schedules synchronize dynamically against Singapore regional databases.</li>
                </ul>
            </div>
            <div class="doc-footer-col">
                <h4>COMPLIANCE & TAX</h4>
                <ul>
                    <li>Invoicing applies mandatory standard 9% GST logic (Singapore).</li>
                    <li>Tutor registrations require verified SEAB syllabus validations.</li>
                </ul>
            </div>
            <div class="doc-footer-col">
                <h4>VERSION CONTROLS</h4>
                <ul>
                    <li>Spec Release Code BATCH 1 v2</li>
                    <li>Developed by Margick Agency design core</li>
                    <li>Tutor Matched Quality Standard ISO-SG-ACAD</li>
                </ul>
            </div>
        </div>
    </footer>

    <!-- INTERACTIVE DATA AND CONTROLLERS SCRIPTS -->
    <script>
        // Inject compiled screens dataset
        const SCREENS = ${screensJson};
        
        let activeScreenId = SCREENS[0].id;
        let activeBreakpoint = 'desktop';
        let activePinId = null;

        function init() {
            renderActiveScreen();
        }

        function switchScreen(id) {
            activeScreenId = id;
            activePinId = null;
            renderActiveScreen();
        }

        function switchBreakpoint(bp) {
            activeBreakpoint = bp;
            
            // Toggle active classes on button
            document.querySelectorAll('.viewport-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById('btn-' + bp).classList.add('active');

            // Apply sizing class to container
            const mockup = document.getElementById('mockup');
            mockup.className = 'mockup-container ' + bp;
        }

        function selectPin(id) {
            activePinId = id;
            
            // Highlight pins
            document.querySelectorAll('.spec-pin').forEach(p => {
                p.classList.remove('active');
                if (p.id === 'pin-el-' + id) p.classList.add('active');
            });

            // Highlight cards
            document.querySelectorAll('.callout-card').forEach(c => {
                c.classList.remove('active');
                if (c.id === 'card-an-' + id) {
                    c.classList.add('active');
                    c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        }

        function renderActiveScreen() {
            const screen = SCREENS.find(s => s.id === activeScreenId);
            if (!screen) return;

            // Render Meta
            const metaContainer = document.getElementById('screen-meta');
            metaContainer.innerHTML = \`
                <div class="screen-meta-row">
                    <span class="screen-meta-label">Scope:</span>
                    <span class="screen-meta-val">\${screen.metadata.scope}</span>
                </div>
                <div class="screen-meta-row">
                    <span class="screen-meta-label">Complexity:</span>
                    <span class="screen-meta-val">\${screen.metadata.complexity}</span>
                </div>
                <div class="screen-meta-row">
                    <span class="screen-meta-label">Security:</span>
                    <span class="screen-meta-val">\${screen.metadata.security}</span>
                </div>
                <div class="screen-meta-row">
                    <span class="screen-meta-label">Version Ref:</span>
                    <span class="screen-meta-val">\${screen.metadata.version}</span>
                </div>
            \`;

            // Render TOC
            const tocContainer = document.getElementById('section-toc');
            tocContainer.innerHTML = screen.sections.map(sec => \`
                <div class="toc-item">
                    <span class="toc-badge">\${sec.id}</span>
                    <span>\${sec.name}</span>
                </div>
            \`).join('');

            // Render Skeletons Wireframe blocks in center panel
            const contentContainer = document.getElementById('mockup-content');
            contentContainer.innerHTML = generateSkeletonMarkup(screen.id);

            // Render Pins Overlays
            const pinsLayer = document.getElementById('pins-layer');
            pinsLayer.innerHTML = screen.annotations.map(pin => \`
                <div 
                    id="pin-el-\${pin.id}"
                    class="spec-pin \${activePinId === pin.id ? 'active' : ''}" 
                    style="left: \${pin.x}%; top: \${pin.y}%;"
                    onclick="selectPin(\${pin.id})"
                >
                    \${pin.id}
                </div>
            \`).join('');

            // Render Ledger
            const ledgerContainer = document.getElementById('annotations-ledger');
            ledgerContainer.innerHTML = \`
                <h3 class="spec-section-title">UX SPEC CALLOUTS LEDGERS</h3>
                
                <!-- Dynamic Color Legend block exactly matching the design instruction image -->
                <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 12px; margin-bottom: 20px; background-color: #ffffff; display: flex; flex-direction: column; gap: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                    <span style="font-family: var(--font-mono); font-size: 8px; color: #a1a1aa; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #f4f4f5; padding-bottom: 4px; display: block;">Annotation System Legend</span>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
                            <span style="width: 12px; height: 12px; background-color: #2563EB; border-radius: 2px; flex-shrink: 0; display: inline-block;"></span>
                            <span style="font-family: var(--font-mono); font-weight: bold; color: #94a3b8; font-size: 10px;">t-action</span>
                            <span style="color: #374151; font-weight: 600; font-size: 10px;">User action</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
                            <span style="width: 12px; height: 12px; background-color: #7C3AED; border-radius: 2px; flex-shrink: 0; display: inline-block;"></span>
                            <span style="font-family: var(--font-mono); font-weight: bold; color: #94a3b8; font-size: 10px;">t-anim</span>
                            <span style="color: #374151; font-weight: 600; font-size: 10px;">Animation</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
                            <span style="width: 12px; height: 12px; background-color: #EA580C; border-radius: 2px; flex-shrink: 0; display: inline-block;"></span>
                            <span style="font-family: var(--font-mono); font-weight: bold; color: #94a3b8; font-size: 10px;">t-edge</span>
                            <span style="color: #374151; font-weight: 600; font-size: 10px;">Edge case</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
                            <span style="width: 12px; height: 12px; background-color: #059669; border-radius: 2px; flex-shrink: 0; display: inline-block;"></span>
                            <span style="font-family: var(--font-mono); font-weight: bold; color: #94a3b8; font-size: 10px;">t-rule</span>
                            <span style="color: #374151; font-weight: 600; font-size: 10px;">Business rule</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
                            <span style="width: 12px; height: 12px; background-color: #F59E0B; border-radius: 2px; flex-shrink: 0; display: inline-block;"></span>
                            <span style="font-family: var(--font-mono); font-weight: bold; color: #94a3b8; font-size: 10px;">t-copy</span>
                            <span style="color: #374151; font-weight: 600; font-size: 10px;">Copy</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
                            <span style="width: 12px; height: 12px; background-color: #6B7280; border-radius: 2px; flex-shrink: 0; display: inline-block;"></span>
                            <span style="font-family: var(--font-mono); font-weight: bold; color: #94a3b8; font-size: 10px;">t-[#6B7280]</span>
                            <span style="color: #374151; font-weight: 600; font-size: 10px;">Data binding</span>
                        </div>
                    </div>
                </div>

                \${screen.annotations.map(pin => \\\`
                    <div 
                        id="card-an-\\\${pin.id}" 
                        class="callout-card \\\${activePinId === pin.id ? 'active' : ''}"
                        onclick="selectPin(\\\${pin.id})"
                    >
                        <div class="callout-header">
                            <span class="pin-badge">\\\${pin.id}</span>
                            <strong class="callout-title" style="flex: 1; font-size: 11px; margin-left: 8px;">\\\${pin.elementName}</strong>
                            <span class="callout-type" style="font-size: 8px; font-family: var(--font-mono);">\\\${pin.type}</span>
                        </div>
                        <div style="border-bottom: 1.5px dashed #cbd5e1; padding-bottom: 8px; margin-bottom: 8px;">
                            <h4 style="font-size: 11px; font-weight: bold; color: #18181b;">\\\${pin.title}</h4>
                            <p class="callout-desc" style="font-size: 10.5px; color: #4b5563; margin-top: 4px;">\\\${pin.description}</p>
                        </div>
                        
                        <div class="callout-detail-grid" style="display: flex; flex-direction: column; gap: 10px; border-top: none; padding-top: 0;">
                            <!-- t-action Group -->
                            <div class="callout-detail-block" style="display: flex; flex-direction: column; gap: 2px;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <span style="width: 10px; height: 10px; background-color: #2563EB; border-radius: 2px; display: inline-block;"></span>
                                    <span class="callout-detail-label" style="font-size: 8px; color: #94a3b8; font-family: var(--font-mono); font-weight: bold; text-transform: uppercase;">t-action User Action Steps</span>
                                </div>
                                <span class="callout-detail-val" style="font-size: 10.5px; color: #1f2937; padding-left: 16px;">\\\${pin.interactionBehavior}</span>
                            </div>

                            <!-- t-anim Group -->
                            <div class="callout-detail-block" style="display: flex; flex-direction: column; gap: 2px;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <span style="width: 10px; height: 10px; background-color: #7C3AED; border-radius: 2px; display: inline-block;"></span>
                                    <span class="callout-detail-label" style="font-size: 8px; color: #94a3b8; font-family: var(--font-mono); font-weight: bold; text-transform: uppercase;">t-anim Animation & Transitions</span>
                                </div>
                                <span class="callout-detail-val" style="font-size: 10.5px; color: #1f2937; padding-left: 16px;">
                                    \\\${pin.animationBehavior || "Custom interactive spring-back gesture; transitions scale 100% to 98% smoothly on press."}
                                </span>
                            </div>

                            <!-- t-edge Group -->
                            <div class="callout-detail-block" style="display: flex; flex-direction: column; gap: 2px;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <span style="width: 10px; height: 10px; background-color: #EA580C; border-radius: 2px; display: inline-block;"></span>
                                    <span class="callout-detail-label" style="font-size: 8px; color: #94a3b8; font-family: var(--font-mono); font-weight: bold; text-transform: uppercase;">t-edge Edge Cases & Fallbacks</span>
                                </div>
                                <span class="callout-detail-val" style="font-size: 10.5px; color: #1f2937; padding-left: 16px;">\\\${pin.edgeCases}</span>
                            </div>

                            <!-- t-rule Group -->
                            <div class="callout-detail-block" style="display: flex; flex-direction: column; gap: 2px;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <span style="width: 10px; height: 10px; background-color: #059669; border-radius: 2px; display: inline-block;"></span>
                                    <span class="callout-detail-label" style="font-size: 8px; color: #94a3b8; font-family: var(--font-mono); font-weight: bold; text-transform: uppercase;">t-rule Business Rule & Validation</span>
                                </div>
                                <span class="callout-detail-val" style="font-size: 10.5px; color: #111827; font-weight: 500; padding-left: 16px;">\\\${pin.businessLogic}</span>
                            </div>

                            <!-- t-copy Group -->
                            <div class="callout-detail-block" style="display: flex; flex-direction: column; gap: 2px;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <span style="width: 10px; height: 10px; background-color: #F59E0B; border-radius: 2px; display: inline-block;"></span>
                                    <span class="callout-detail-label" style="font-size: 8px; color: #94a3b8; font-family: var(--font-mono); font-weight: bold; text-transform: uppercase;">t-copy Exact Brand Copy</span>
                                </div>
                                <span class="callout-detail-val" style="font-size: 9.5px; color: #4338ca; background-color: #fef3c7; border: 1px solid #fde68a; padding: 4px 8px; font-family: var(--font-mono); border-radius: 2px; margin-left: 16px;">
                                    \\\${pin.copyText || 'Text: "' + pin.elementName + '" | Type: Standard UI Interface Element.'}
                                </span>
                            </div>

                            <!-- t-data Group -->
                            <div class="callout-detail-block" style="display: flex; flex-direction: column; gap: 2px;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <span style="width: 10px; height: 10px; background-color: #6B7280; border-radius: 2px; display: inline-block;"></span>
                                    <span class="callout-detail-label" style="font-size: 8px; color: #94a3b8; font-family: var(--font-mono); font-weight: bold; text-transform: uppercase;">t-[#6B7280] State & Data Bindings</span>
                                </div>
                                <span class="callout-detail-val" style="font-size: 9.5px; color: #374151; background-color: #f4f4f5; border: 1px solid #e4e4e7; padding: 4px 8px; font-family: var(--font-mono); border-radius: 2px; margin-left: 16px;">
                                    \\\${pin.dataBinding || 'Bound: state.activePinId === ' + pin.id + ' | Component: WireframeWidgetRoot'}
                                </span>
                            </div>

                            <!-- Responsive Metadata summary -->
                            <div style="border-top: 1px dashed #cbd5e1; padding-top: 8px; font-size: 9.5px; color: #4b5563; margin-left: 16px; margin-top: 2px;">
                                <strong>UX Rationale:</strong> "<span>\\\${pin.uxRationale}</span>"<br />
                                <strong>Responsive Layout:</strong> <span style="font-family: var(--font-mono);">\\\${pin.responsiveBehavior}</span>
                            </div>
                        </div>
                    </div>
                \\\`).join('')}
            \`;
        }

        // Lightweight skeletal wireframe builder based on active screen choice
        function generateSkeletonMarkup(id) {
            switch (id) {
                case 'home':
                    return \`
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <div style="text-align: center; border-bottom: 1.5px dashed #cbd5e1; padding-bottom: 16px;">
                            <span style="font-family: var(--font-mono); color: var(--accent-brand); font-weight: 800; font-size: 11px;">WELCOME TO MARGICK SG</span>
                            <h2 style="font-weight: 800; font-size: 20px; font-family: var(--font-sans); margin-top: 4px;">FIND THE PERFECT ACADEMIC TUTOR</h2>
                            <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">MOE-Registered & Verified Trial Protection Guarantee</p>
                        </div>

                        <div style="background-color: #fafafa; border: 2.5px solid #18181b; padding: 20px; border-radius: 4px; display: flex; flex-direction: column; gap: 14px; position: relative;">
                            <span style="font-family: var(--font-mono); font-size: 9px; font-weight: bold; background-color: #e11d48; color: #fff; padding: 2px 6px; align-self: flex-start; border-radius: 2px;">SEC 3: MATCHING CONSOLE</span>
                            
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
                                <div class="wf-placeholder" style="height: 48px;">SELECT GRADE LEVEL: Secondary 4 / H2 JC</div>
                                <div class="wf-placeholder" style="height: 48px;">SELECT SUBJECT: Additional Mathematics</div>
                            </div>
                            
                            <div class="wf-btn-solid brand" style="cursor: not-allowed;">FIND AN ACADEMIC TUTOR MATCH NOW</div>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; border-bottom: 1px solid #cbd5e1; padding-bottom: 20px;">
                            <div style="text-align: center;"><strong>12,400+</strong><p style="font-size: 8px;">Classes Taught</p></div>
                            <div style="text-align: center;"><strong>98.4%</strong><p style="font-size: 8px;">Success Rate</p></div>
                            <div style="text-align: center;"><strong>MOE Verified</strong><p style="font-size: 8px;">Pedagogy Guaranteed</p></div>
                            <div style="text-align: center;"><strong>Complimentary rematch</strong><p style="font-size: 8px;">Within 2 sessions</p></div>
                        </div>

                        <div>
                            <h4 style="font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; margin-bottom: 8px;">SEC 8: Certified Top Tutors Highlights</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                <div style="border: 1px solid #cbd5e1; padding: 12px; display: flex; gap: 12px; background-color: #fff;">
                                    <div class="wf-placeholder" style="width: 50px; height: 50px; flex-shrink: 0;">IMG</div>
                                    <div>
                                        <strong>Keith Tan (MOE Ex-Teacher)</strong>
                                        <p style="font-size: 9px; color: var(--text-muted)">JC H2 Physics Specialist &bull; Stanford Alum</p>
                                        <span style="font-size: 10px; font-family: var(--font-mono); font-weight: bold; margin-top: 4px; display: block;">SGD 90 - 120 / hr</span>
                                    </div>
                                </div>
                                <div style="border: 1px solid #cbd5e1; padding: 12px; display: flex; gap: 12px; background-color: #fff;">
                                    <div class="wf-placeholder" style="width: 50px; height: 50px; flex-shrink: 0;">IMG</div>
                                    <div>
                                        <strong>Sheryl Lim (First-Class Grad)</strong>
                                        <p style="font-size: 9px; color: var(--text-muted)">Secondary Additional Math &bull; NUS Alum</p>
                                        <span style="font-size: 10px; font-family: var(--font-mono); font-weight: bold; margin-top: 4px; display: block;">SGD 65 - 85 / hr</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>\`;

                case 'search':
                    return \`
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <div style="border-bottom: 1.5px dashed #cbd5e1; padding-bottom: 12px;">
                            <span style="font-family: var(--font-mono); font-size: 9px; color: var(--text-muted)">DIRECTORY ROOT</span>
                            <h2 style="font-weight: 800; font-size: 18px;">SEC 1: 48 MOE-REGISTERED MATH TUTORS PROFILE</h2>
                        </div>

                        <div style="display: grid; grid-template-columns: 240px 1fr; gap: 24px;">
                            <!-- Sidebar -->
                            <div style="background-color: #fafafa; border: 1px solid #cbd5e1; padding: 14px; display: flex; flex-direction: column; gap: 16px;">
                                <span style="font-family: var(--font-mono); font-weight: bold; font-size: 10px; border-bottom: 1px solid #18181b; padding-bottom: 4px;">SEC 3: REFINEMENT FILTERS</span>
                                <div style="font-size: 11px;">
                                    <strong>DISTRICT ZONE</strong>
                                    <div><input type="checkbox" checked /> East Region (Simei, Tampines)</div>
                                    <div><input type="checkbox" /> Central (Orchard, Novena)</div>
                                    <div><input type="checkbox" /> West Region (Jurong, Clementi)</div>
                                </div>
                                <div style="font-size: 11px;">
                                    <strong>QUALIFICATION TIER</strong>
                                    <div><input type="checkbox" /> Undergrad Premium</div>
                                    <div><input type="checkbox" checked /> First-Class Hons Graduate</div>
                                    <div><input type="checkbox" checked /> MOE Certified Teacher</div>
                                </div>
                            </div>

                            <!-- List Grid -->
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                <div class="wf-placeholder" style="height: 120px; display: block; padding: 16px; text-align: left; background-color: #fff;">
                                    <div style="display: flex; justify-content: space-between;">
                                        <strong>Dr. Keith Tan, PhD</strong>
                                        <span style="color: var(--accent-brand);">SGD 95/hr</span>
                                    </div>
                                    <p style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Ex-Raffles Institution Senior Math Chair &bull; 97.2% Trial Booking Conversion SLA Outcomes</p>
                                    <div style="margin-top: 14px; display: flex; gap: 10px;">
                                        <div class="wf-btn-solid brand" style="padding: 4px 10px; font-size: 9px;">Select & Check availability</div>
                                        <div class="wf-btn-outline" style="padding: 4px 10px; font-size: 9px;"><input type="checkbox" /> Add with Tutor Compare drawer</div>
                                    </div>
                                </div>

                                <div class="wf-placeholder" style="height: 120px; display: block; padding: 16px; text-align: left; background-color: #fff;">
                                    <div style="display: flex; justify-content: space-between;">
                                        <strong>Ms. Rachel Lim, NUS Graduate</strong>
                                        <span style="color: var(--accent-brand);">SGD 65/hr</span>
                                    </div>
                                    <p style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">First Class Honors NUS Math &bull; Over 8 Years dedicated GCE O-Level Preparation</p>
                                    <div style="margin-top: 14px; display: flex; gap: 10px;">
                                        <div class="wf-btn-solid brand" style="padding: 4px 10px; font-size: 9px;">Select & Check availability</div>
                                        <div class="wf-btn-outline" style="padding: 4px 10px; font-size: 9px;"><input type="checkbox" /> Add with Tutor Compare drawer</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>\`;

                case 'product':
                    return \`
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <span style="font-family: var(--font-mono); font-size: 9px; color: var(--accent-brand);">S03: ACADEMIC TUTOR PORTFOLIO</span>
                        
                        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 24px;">
                            <div>
                                <div class="wf-placeholder" style="height: 220px; display: flex; flex-direction: column; gap: 12px;">
                                    <strong>SEC 1: Profile Vitals Image</strong>
                                    <div style="background-color: #e11d48; color: #fff; padding: 4px 8px; font-size: 8px; font-family: var(--font-mono); border-radius: 2px;">MOE ACCREDITED</div>
                                </div>
                                <div style="border: 1px solid #cbd5e1; padding: 14px; margin-top: 12px; font-size: 11px;">
                                    <strong>Credentials check</strong>
                                    <div>NRIC Status &bull; <span style="color: green; font-weight: bold;">VERIFIED</span></div>
                                    <div>MOE Diploma &bull; <span style="color: green; font-weight: bold;">VERIFIED</span></div>
                                    <div>Teaching Board &bull; <span style="color: green; font-weight: bold;">VERIFIED</span></div>
                                </div>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                <div>
                                    <h1 style="font-size: 22px; font-weight: 800; border-bottom: 2px solid #18181b; padding-bottom: 8px;">Dr. Alan Goh, Stanford Alum, PhD</h1>
                                    <p style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">Premium Specialist for Junior College H2 Physics & Secondary Triple Science tracks.</p>
                                </div>

                                <div class="wf-placeholder" style="height: 100px; display: block; text-align: left; padding: 14px; border-left: 3px solid #18181b;">
                                    <strong>SEC 2: VIDEO INSIGHT rapport</strong>
                                    <p style="font-size: 9px; color: var(--text-muted); margin-top: 4px;">Clicking play launches introducing clip showing Dr. Alan's accent, syllabus explanation layouts and tutoring board speed calculations.</p>
                                    <span style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-brand); font-weight: bold; margin-top: 10px; display: block;">▶ PLAY INTRO (2:15 mins CLIP)</span>
                                </div>

                                <div style="border: 1px solid #cbd5e1; background-color: #fff; padding: 16px;">
                                    <strong>SEC 4: TIMELINE APPOINTMENT BOOKER (LIVE CALENDAR SLOTS)</strong>
                                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 12px;">
                                        <div style="background-color: #f4f4f5; text-align: center; padding: 8px; border-radius: 2px; font-size: 10px;">Wed 4pm - 6pm<br /><strong style="color: green;">FREE</strong></div>
                                        <div style="background-color: #f4f4f5; text-align: center; padding: 8px; border-radius: 2px; font-size: 10px;">Thu 2pm - 4pm<br /><strong style="color: green;">FREE</strong></div>
                                        <div style="background-color: #e4e4e7; text-align: center; padding: 8px; border-radius: 2px; font-size: 10px; color: #a1a1aa; text-decoration: line-through;">Sat 9am - 11am<br />TAKEN</div>
                                        <div style="background-color: #f4f4f5; text-align: center; padding: 8px; border-radius: 2px; font-size: 10px;">Sun 1pm - 3pm<br /><strong style="color: green;">FREE</strong></div>
                                    </div>
                                    <div class="wf-btn-solid brand" style="margin-top: 14px; cursor: not-allowed;">RESERVE SLOT & COMPLETE MATCHING</div>
                                </div>
                            </div>
                        </div>
                    </div>\`;

                default:
                    return \`
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <h2 style="font-weight: 800; font-size: 18px; text-transform: uppercase;">\${id.toUpperCase()} WIREFRAME LAYOUT MOCKUP</h2>
                        <p style="font-size: 11px; color: var(--text-muted); inline-height: 1.5">
                            Visual layout representing SEC 1, SEC 2, SEC 3 matching systems. Fully responsive configuration for desktops (1440px), tablets (768px), and mobile phone profiles (390px) under design constraints.
                        </p>
                        <div class="wf-placeholder" style="height: 380px; width: 100%;">
                            <svg class="wf-cross-svg"><line x1="0" y1="0" x2="100%" y2="100%"></line><line x1="100%" y1="0" x2="0" y2="100%"></line></svg>
                            MONOCHROME GRID LAYOUT MOCKUP BUILDER: \${id.toUpperCase()}
                        </div>
                    </div>\`;
            }
        }

        window.onload = init;
    </script>
</body>
</html>`;
}
