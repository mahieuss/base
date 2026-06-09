/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import MetadataHeader from './components/MetadataHeader';
import SpecControlBar from './components/SpecControlBar';
import WireframeRenderer from './components/WireframeRenderer';
import AnnotationsSidebar from './components/AnnotationsSidebar';
import { SCREENS_DATA } from './data/screensData';
import { BreakpointId } from './types';
import { generateHtmlSpec } from './utils/exportHtml';

interface ViewportContainerProps {
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  baseWidth: number;
  screen: any;
  showGrid: boolean;
  showPins: boolean;
  activePinId: number | null;
  onPinClick: (pinId: number) => void;
}

const ViewportContainer: React.FC<ViewportContainerProps> = ({
  breakpoint,
  baseWidth,
  screen,
  showGrid,
  showPins,
  activePinId,
  onPinClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(breakpoint === 'desktop' ? 0.32 : breakpoint === 'tablet' ? 0.55 : 0.95);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateZoom = () => {
      const rect = el.getBoundingClientRect();
      const parentWidth = rect.width - 12; // offset for some padding and border spacing
      if (parentWidth > 0) {
        // Calculate dynamic zoom to perfectly fill parent width
        let calculatedZoom = parentWidth / baseWidth;
        
        // Cap the zoom limit to prevent oversized elements
        if (breakpoint === 'mobile') {
          calculatedZoom = Math.min(calculatedZoom, 1.25);
        } else if (breakpoint === 'tablet') {
          calculatedZoom = Math.min(calculatedZoom, 1.0);
        } else {
          calculatedZoom = Math.min(calculatedZoom, 0.85); // Allow desktop to scale nicely up to 85% width
        }
        
        setZoom(Math.max(calculatedZoom, 0.15));
      }
    };

    updateZoom();

    const observer = new ResizeObserver(() => {
      updateZoom();
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [baseWidth, breakpoint]);

  return (
    <div ref={containerRef} className="overflow-x-auto overflow-y-auto h-[560px] border border-zinc-200 rounded-xs bg-zinc-100/50 p-1 relative scrollbar-thin">
      <div style={{ zoom: zoom, width: `${baseWidth}px` }} className="relative mx-auto transition-all duration-150 origin-top">
        <WireframeRenderer
          screen={screen}
          breakpoint={breakpoint}
          showGrid={showGrid}
          showPins={showPins}
          activePinId={activePinId}
          onPinClick={onPinClick}
          isComparative={true}
        />
      </div>
    </div>
  );
};

export default function App() {
  // Application Workspace State
  const [activeScreenId, setActiveScreenId] = useState<string>('home'); // Base desktop defaults to Home (S01)
  const [activeBreakpoint, setActiveBreakpoint] = useState<BreakpointId>('desktop');
  const [viewMode, setViewMode] = useState<'comparative' | 'single'>('comparative');
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showPins, setShowPins] = useState<boolean>(true);
  const [activePinId, setActivePinId] = useState<number | null>(null);

  // Retrieve current active screen configurations
  const currentScreen = SCREENS_DATA.find(s => s.id === activeScreenId) || SCREENS_DATA[0];

  const handleScreenChange = (screenId: string) => {
    setActiveScreenId(screenId);
    setActivePinId(null); // Reset active annotation references on navigation
  };

  const handleBreakpointChange = (bp: BreakpointId) => {
    setActiveBreakpoint(bp);
    setViewMode('single'); // Switch to single mode when clicking specific breakpoint button for focus
  };

  const handleToggleGrid = () => {
    setShowGrid(prev => !prev);
  };

  const handleTogglePins = () => {
    setShowPins(prev => !prev);
  };

  const handlePinClick = (pinId: number) => {
    setActivePinId(pinId);
  };

  // Standalone offline HTML compilation and rapid download execution
  const handleExportHtml = () => {
    try {
      const htmlContent = generateHtmlSpec();
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SG_K12_Tutoring_UX_Specification_Audit_${activeScreenId}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate HTML payload compilation:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-zinc-900 flex flex-col antialiased font-sans">
      {/* 1. Global Project Intro & Parameters Audit Ticker with live S01 - S09 actions */}
      <MetadataHeader 
        activeScreenId={activeScreenId}
        onScreenChange={handleScreenChange}
      />

      {/* 2. Sticky Core specification configuration bar */}
      <SpecControlBar
        screens={SCREENS_DATA}
        activeScreenId={activeScreenId}
        activeBreakpoint={activeBreakpoint}
        showGrid={showGrid}
        showPins={showPins}
        onScreenChange={handleScreenChange}
        onBreakpointChange={handleBreakpointChange}
        onToggleGrid={handleToggleGrid}
        onTogglePins={handleTogglePins}
        onExportHtml={handleExportHtml}
      />

      {/* 3. Main Interactive Workspace Full Page Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-140px)] bg-[#F4F4F5] scrollbar-thin">
        {/* Top Part: Screens Preview Row (Row containing only screens of the 3 devices) */}
        <div className="w-full bg-[#FAFAFA] p-6 border-b border-zinc-200">
          <div className="w-full max-w-full flex flex-col gap-4">
            
            {/* Header Bar for presentation layout controller */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] font-mono font-bold text-zinc-400 uppercase mb-4 pb-2 border-b border-zinc-200">
              <span className="flex items-center gap-1.5 uppercase font-black text-zinc-500">
                <span className="w-1.5 h-1.5 bg-[#E11D48] rounded-full animate-pulse"></span>
                <span>Responsive Specification Matrix Preview</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-zinc-400">LAYOUT STYLE:</span>
                <div className="flex bg-zinc-200/80 rounded-xs p-0.5 border border-zinc-300">
                  <button 
                    onClick={() => setViewMode('comparative')}
                    className={`px-2.5 py-0.5 text-[9.5px] uppercase font-bold text-xs rounded-xs cursor-pointer transition-all ${
                      viewMode === 'comparative' 
                        ? 'bg-zinc-950 text-white font-extrabold shadow-sm' 
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-150'
                    }`}
                  >
                    3 Columns (Comparative)
                  </button>
                  <button 
                    onClick={() => setViewMode('single')}
                    className={`px-2.5 py-0.5 text-[9.5px] uppercase font-bold text-xs rounded-xs cursor-pointer transition-all ${
                      viewMode === 'single' 
                        ? 'bg-zinc-950 text-white font-extrabold shadow-sm' 
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-150'
                    }`}
                  >
                    Single View
                  </button>
                </div>
              </div>
            </div>

            {viewMode === 'comparative' ? (
              /* COMPONENT PRESENTATION AS ILLUSTRATED: 3 columns comparative viewports side-by-side */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
                
                {/* Column 1: Desktop View */}
                <div className="flex flex-col gap-2 bg-white border border-zinc-250 p-3 rounded-sm shadow-xs min-w-0">
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono border-b border-zinc-150 pb-2 mb-1.5 font-bold text-zinc-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full border border-zinc-400 bg-white inline-block"></span>
                      DESKTOP VIEWPORT
                    </span>
                    <span className="bg-zinc-100 text-zinc-600 px-1.5 py-0.2 rounded-xs">1440 × ~2400</span>
                  </div>
                  <ViewportContainer
                    breakpoint="desktop"
                    baseWidth={1440}
                    screen={currentScreen}
                    showGrid={showGrid}
                    showPins={showPins}
                    activePinId={activePinId}
                    onPinClick={handlePinClick}
                  />
                </div>

                {/* Column 2: Tablet View */}
                <div className="flex flex-col gap-2 bg-white border border-zinc-250 p-3 rounded-sm shadow-xs min-w-0">
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono border-b border-zinc-150 pb-2 mb-1.5 font-bold text-zinc-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-1.5 rounded-sm border border-zinc-400 bg-white inline-block"></span>
                      TABLET VIEWPORT
                    </span>
                    <span className="bg-zinc-100 text-zinc-600 px-1.5 py-0.2 rounded-xs">768 × ~2800</span>
                  </div>
                  <ViewportContainer
                    breakpoint="tablet"
                    baseWidth={768}
                    screen={currentScreen}
                    showGrid={showGrid}
                    showPins={showPins}
                    activePinId={activePinId}
                    onPinClick={handlePinClick}
                  />
                </div>

                {/* Column 3: Mobile View */}
                <div className="flex flex-col gap-2 bg-white border border-zinc-250 p-3 rounded-sm shadow-xs min-w-0">
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono border-b border-zinc-150 pb-2 mb-1.5 font-bold text-zinc-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-3 rounded-sm border border-zinc-400 bg-white inline-block"></span>
                      MOBILE VIEWPORT
                    </span>
                    <span className="bg-zinc-100 text-zinc-600 px-1.5 py-0.2 rounded-xs">390 × ~3400</span>
                  </div>
                  <ViewportContainer
                    breakpoint="mobile"
                    baseWidth={390}
                    screen={currentScreen}
                    showGrid={showGrid}
                    showPins={showPins}
                    activePinId={activePinId}
                    onPinClick={handlePinClick}
                  />
                </div>

              </div>
            ) : (
              /* Focus full resolution mode */
              <div className="w-full flex flex-col items-center">
                <div className="w-full text-[9px] font-mono text-zinc-400 text-right uppercase tracking-wider mb-2">
                  Focused Viewport: {activeBreakpoint} // Scale: 100% Detail Mode
                </div>
                <div className="w-full overflow-x-auto flex justify-center border border-zinc-200 p-4 rounded-sm bg-zinc-100">
                  <WireframeRenderer
                    screen={currentScreen}
                    breakpoint={activeBreakpoint}
                    showGrid={showGrid}
                    showPins={showPins}
                    activePinId={activePinId}
                    onPinClick={handlePinClick}
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Bottom Part: Detailed Specifications Ledger (Moved down under the devices) */}
        <div className="w-full bg-[#F4F4F5] p-6 md:p-8">
          <div className="max-w-[1400px] mx-auto select-none">
            <AnnotationsSidebar
              screen={currentScreen}
              activePinId={activePinId}
              onPinClick={handlePinClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
