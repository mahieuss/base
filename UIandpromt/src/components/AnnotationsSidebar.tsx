/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { 
  FileText, ShieldCheck, HelpCircle, ArrowRight,
  Layers, Settings, BookmarkCheck, ListTodo, AlertTriangle, Scale
} from 'lucide-react';
import { WireframeScreen, AnnotationPin } from '../types';

interface AnnotationsSidebarProps {
  screen: WireframeScreen;
  activePinId: number | null;
  onPinClick: (pinId: number) => void;
}

export default function AnnotationsSidebar({
  screen,
  activePinId,
  onPinClick,
}: AnnotationsSidebarProps) {
  // Array of card refs to scroll focused layouts into intermediate viewport view
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (activePinId && cardRefs.current[activePinId]) {
      cardRefs.current[activePinId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activePinId]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Upper Grid: Metadata & Systems on left; TOC Hierarchy on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: 1. Screen Metadata and Legend (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* 1. SCREEN LEVEL METADATA */}
          <div className="border border-zinc-300 rounded-sm p-4 bg-white flex flex-col gap-3.5 shadow-xs flex-1">
            <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-2">
              <BookmarkCheck size={13} className="text-zinc-900" />
              <h3 className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-900">1. Screen Metadata</h3>
            </div>
            
            <div className="flex flex-col gap-1.5 font-mono text-[9.5px] flex-1 justify-center">
              <div className="flex justify-between hover:bg-zinc-55 p-1 rounded-xs">
                <span className="text-zinc-400 font-bold uppercase">Flow Scope:</span>
                <span className="font-bold text-zinc-800 text-right max-w-[200px] truncate" title={screen.metadata.scope}>{screen.metadata.scope}</span>
              </div>
              <div className="flex justify-between hover:bg-zinc-55 p-1 rounded-xs">
                <span className="text-zinc-400 font-bold uppercase">Complexity:</span>
                <span className={`font-bold px-1.5 py-0.2 rounded-xs ${
                  screen.metadata.complexity === 'High' 
                    ? 'bg-rose-100 text-rose-800' 
                    : screen.metadata.complexity === 'Medium' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>{screen.metadata.complexity}</span>
              </div>
              <div className="flex justify-between hover:bg-zinc-55 p-1 rounded-xs">
                <span className="text-zinc-400 font-bold uppercase">Security Gate:</span>
                <span className="font-bold text-zinc-800 text-right max-w-[200px] truncate" title={screen.metadata.security}>{screen.metadata.security}</span>
              </div>
              <div className="flex justify-between hover:bg-zinc-55 p-1 rounded-xs">
                <span className="text-zinc-400 font-bold uppercase">Build Ref:</span>
                <span className="font-bold text-zinc-800">{screen.metadata.version}</span>
              </div>
              <div className="flex justify-between hover:bg-zinc-55 p-1 rounded-xs">
                <span className="text-zinc-400 font-bold uppercase">Last Updated:</span>
                <span className="font-bold text-zinc-500">{screen.metadata.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Color Legend block exactly matching the design instruction image */}
          <div className="border border-zinc-300 rounded-sm p-4 bg-white flex flex-col gap-2.5 shadow-xs">
            <h4 className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-150 pb-1.5">Annotation System Legend</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#2563EB] rounded-[2px] shrink-0 border border-[#1E40AF]/20"></span>
                <div className="flex items-baseline gap-1 select-all">
                  <span className="font-mono text-[10px] text-zinc-400 font-bold">t-action</span>
                  <span className="text-[10px] font-bold text-zinc-700">User action</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#7C3AED] rounded-[2px] shrink-0 border border-[#5B21B6]/20"></span>
                <div className="flex items-baseline gap-1 select-all">
                  <span className="font-mono text-[10px] text-zinc-400 font-bold">t-anim</span>
                  <span className="text-[10px] font-bold text-zinc-700">Animation</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#EA580C] rounded-[2px] shrink-0 border border-[#9A3412]/20"></span>
                <div className="flex items-baseline gap-1 select-all">
                  <span className="font-mono text-[10px] text-zinc-400 font-bold">t-edge</span>
                  <span className="text-[10px] font-bold text-zinc-700">Edge case</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#059669] rounded-[2px] shrink-0 border border-[#065F46]/20"></span>
                <div className="flex items-baseline gap-1 select-all">
                  <span className="font-mono text-[10px] text-zinc-400 font-bold">t-rule</span>
                  <span className="text-[10px] font-bold text-zinc-700">Business rule</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#F59E0B] rounded-[2px] shrink-0 border border-[#92400E]/20"></span>
                <div className="flex items-baseline gap-1 select-all">
                  <span className="font-mono text-[10px] text-zinc-400 font-bold">t-copy</span>
                  <span className="text-[10px] font-bold text-zinc-700">Copy</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#6B7280] rounded-[2px] shrink-0 border border-[#374151]/20"></span>
                <div className="flex items-baseline gap-1 select-all">
                  <span className="font-mono text-[10px] text-zinc-400 font-bold">t-[#6B7280]</span>
                  <span className="text-[10px] font-bold text-zinc-700">Data binding</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Layout TOC Hierarchy (8 cols on lg) */}
        <div className="lg:col-span-8 border border-zinc-300 rounded-sm p-4 bg-white flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-2">
            <ListTodo size={13} className="text-zinc-900" />
            <h3 className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-900 font-extrabold">2. Layout TOC Hierarchy</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {screen.sections.map((sec) => (
              <div 
                key={sec.id} 
                className="group border border-zinc-200 p-3 rounded-sm bg-[#FAFAFA] hover:bg-white hover:border-zinc-400 hover:shadow-2xs transition-all flex flex-col gap-0.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 bg-zinc-900 text-white rounded-xs">
                    {sec.id}
                  </span>
                  <span className="text-xs font-bold text-zinc-800 group-hover:text-zinc-950 leading-none">{sec.name}</span>
                </div>
                <p className="text-[10px] text-zinc-550 leading-normal font-sans pt-1">
                  {sec.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. DETAILED ANNOTATIONS PIN LISTS */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1.5 border-b border-zinc-300 pb-2 mt-2">
          <Layers size={13} className="text-zinc-900" />
          <h3 className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-900 font-black">3. Spec Callouts Ledger</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {screen.annotations.map((pin) => {
            const isActive = activePinId === pin.id;

            return (
              <div
                key={pin.id}
                ref={(el) => {
                  cardRefs.current[pin.id] = el;
                }}
                onClick={() => onPinClick(pin.id)}
                className={`border text-left rounded-sm p-4 transition-all duration-200 cursor-pointer flex flex-col gap-3 relative overflow-hidden
                  ${isActive 
                    ? 'border-zinc-900 bg-zinc-50/90 shadow-xs ring-1 ring-zinc-500' 
                    : 'border-zinc-250 bg-white hover:border-zinc-400 hover:shadow-2xs'
                  }`}
              >
                {/* Header Block highlights */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full font-mono text-[10px] font-bold flex items-center justify-center transition-all duration-200
                      ${isActive 
                        ? 'bg-zinc-900 text-white' 
                        : 'bg-zinc-100 text-zinc-805 border border-zinc-350'
                      }`}>
                      {pin.id}
                    </span>
                    <span className="font-sans text-[11px] font-bold text-zinc-900 leading-none">{pin.elementName}</span>
                  </div>
                  <span className="text-[8px] font-mono uppercase px-2 py-0.5 rounded-xs bg-zinc-100 text-zinc-500 font-bold border border-zinc-200">
                    {pin.type}
                  </span>
                </div>

                <div className="border-b border-zinc-150 pb-2.5">
                  <h4 className="font-sans text-[11px] font-bold text-zinc-800 mb-0.5">{pin.title}</h4>
                  <p className="text-[10.5px] text-zinc-600 leading-relaxed font-sans">
                    {pin.description}
                  </p>
                </div>

                {/* Behavioral checklists and systems criteria */}
                <div className="flex flex-col gap-3.5 pt-0.5 text-[10px] font-sans">
                  
                  {/* Aspect 1: Core interaction (t-action) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="w-2.5 h-2.5 bg-[#2563EB] rounded-[2px] shrink-0"></span>
                      <span className="font-mono text-[8px] text-zinc-400 font-bold">t-action</span>
                      <span className="text-[8px] font-black uppercase text-zinc-500 tracking-wider">User Action Steps</span>
                    </div>
                    <span className="text-zinc-750 leading-normal pl-4">{pin.interactionBehavior}</span>
                  </div>

                  {/* Aspect 2: Animation Behavior (t-anim) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="w-2.5 h-2.5 bg-[#7C3AED] rounded-[2px] shrink-0"></span>
                      <span className="font-mono text-[8px] text-zinc-400 font-bold">t-anim</span>
                      <span className="text-[8px] font-black uppercase text-zinc-500 tracking-wider">Animation & Transitions</span>
                    </div>
                    <span className="text-zinc-750 leading-normal pl-4">
                      {pin.animationBehavior || "Custom interactive spring-back gesture; transitions scale 100% to 98% smoothly on press."}
                    </span>
                  </div>

                  {/* Aspect 3: Edge cases (t-edge) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="w-2.5 h-2.5 bg-[#EA580C] rounded-[2px] shrink-0"></span>
                      <span className="font-mono text-[8px] text-zinc-400 font-bold">t-edge</span>
                      <span className="text-[8px] font-black uppercase text-zinc-500 tracking-wider">Edge Cases & Fallbacks</span>
                    </div>
                    <span className="text-zinc-750 leading-normal pl-4">{pin.edgeCases}</span>
                  </div>

                  {/* Aspect 4: Business Rules (t-rule) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="w-2.5 h-2.5 bg-[#059669] rounded-[2px] shrink-0"></span>
                      <span className="font-mono text-[8px] text-zinc-400 font-bold">t-rule</span>
                      <span className="text-[8px] font-black uppercase text-zinc-500 tracking-wider">Business Rule & Validation</span>
                    </div>
                    <span className="text-zinc-800 leading-normal pl-4 font-medium">{pin.businessLogic}</span>
                  </div>

                  {/* Aspect 5: Copy Specifications (t-copy) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-[2px] shrink-0"></span>
                      <span className="font-mono text-[8px] text-zinc-400 font-bold">t-copy</span>
                      <span className="text-[8px] font-black uppercase text-zinc-500 tracking-wider">Exact Brand Copy</span>
                    </div>
                    <span className="text-zinc-750 leading-normal pl-4 font-mono text-[9px] italic bg-amber-50/50 p-1.5 border border-amber-100 rounded-sm">
                      {pin.copyText || `Text: "${pin.elementName}" | Type: Standard UI Interface Element.`}
                    </span>
                  </div>

                  {/* Aspect 6: Data Binding (t-[#6B7280]) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="w-2.5 h-2.5 bg-[#6B7280] rounded-[2px] shrink-0"></span>
                      <span className="font-mono text-[8px] text-zinc-400 font-bold">t-[#6B7280]</span>
                      <span className="text-[8px] font-black uppercase text-zinc-500 tracking-wider">State & Data Bindings</span>
                    </div>
                    <span className="text-zinc-700 leading-normal pl-4 font-mono text-[9px] bg-zinc-50 p-1.5 border border-zinc-200 rounded-sm">
                      {pin.dataBinding || `Bound: state.activePinId === ${pin.id} | Component: WireframeWidgetRoot`}
                    </span>
                  </div>

                  {/* Aspect 7: Rationale & Mobile View */}
                  <div className="flex flex-col gap-1 border-t border-dashed border-zinc-200 pt-2 text-[9px] text-zinc-500">
                    <div className="hover:text-zinc-700 transition-colors">
                      <strong className="uppercase">UX Rationale:</strong> "{pin.uxRationale}"
                    </div>
                    <div className="font-mono mt-1 hover:text-zinc-700 transition-colors leading-normal">
                      <strong className="uppercase">Responsive:</strong> {pin.responsiveBehavior}
                    </div>
                  </div>

                </div>

                {/* High contrast left stripe indicating focus state */}
                {isActive && (
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-zinc-900"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
