/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BreakpointId = 'desktop' | 'tablet' | 'mobile';

export interface BreakpointConfig {
  id: BreakpointId;
  name: string;
  width: number;
  height: number;
}

export interface ScreenMetadata {
  scope: string;
  complexity: 'Low' | 'Medium' | 'High';
  security: string;
  version: string;
  lastUpdated: string;
  designer: string;
}

export interface SectionSpec {
  id: string; // e.g., "SEC 1"
  name: string; // e.g., "Global Navigation Header"
  description: string;
}

export interface AnnotationPin {
  id: number;
  elementName: string;
  type: 'CTA' | 'Navigation' | 'Form Input' | 'Card Element' | 'Trust Element' | 'Pricing Block' | 'Interactive Option' | 'Alert/Notification';
  title: string;
  description: string;
  interactionBehavior: string; // t-action User action
  uxRationale: string;
  businessLogic: string;       // t-rule Business rule
  responsiveBehavior: string;
  edgeCases: string;           // t-edge Edge case
  animationBehavior?: string;  // t-anim Animation
  copyText?: string;           // t-copy Copy
  dataBinding?: string;        // t-[#6B7280] Data binding
  // Pin coordinate percentage on wireframe container mapping (0 to 100)
  x?: number; // horizontal % (Desktop calibration)
  y?: number; // vertical % (Desktop calibration)
}

export interface WireframeScreen {
  id: string; // e.g. "refund", "product", "rate", "cart", "home", "cancel", "checkout", "search", "thankyou"
  title: string;
  description: string;
  imageUrl?: string; // Reference image path if any, but we implement high fidelity SVGs/renderers
  metadata: ScreenMetadata;
  sections: SectionSpec[];
  annotations: AnnotationPin[];
}
