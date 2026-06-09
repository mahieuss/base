/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { 
  Laptop, Tablet, Smartphone, FileDown, 
  Grid, Eye, EyeOff, Layers, Settings 
} from 'lucide-react';
import { WireframeScreen, BreakpointId } from '../types';

interface SpecControlBarProps {
  screens: WireframeScreen[];
  activeScreenId: string;
  activeBreakpoint: BreakpointId;
  showGrid: boolean;
  showPins: boolean;
  onScreenChange: (screenId: string) => void;
  onBreakpointChange: (bp: BreakpointId) => void;
  onToggleGrid: () => void;
  onTogglePins: () => void;
  onExportHtml: () => void;
}

export default function SpecControlBar({
  screens,
  activeScreenId,
  activeBreakpoint,
  showGrid,
  showPins,
  onScreenChange,
  onBreakpointChange,
  onToggleGrid,
  onTogglePins,
  onExportHtml,
}: SpecControlBarProps) {
  return (
    <div className="bg-white text-zinc-800 border-b border-zinc-300 flex flex-col md:flex-row items-stretch md:items-center justify-between px-5 py-2.5 md:h-[52px] gap-4 z-30 relative shadow-sm">
      {/* Brand Group */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-zinc-950 flex items-center justify-center text-white select-none">
          <Settings size={15} className="animate-spin-slow text-white" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold tracking-tight uppercase text-zinc-900">RETAIL_SG UX COMPILER</span>
          </div>
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider leading-none">Enterprise Specification Suite</span>
        </div>
      </div>

      {/* Workspace Controls */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4 flex-1 justify-start md:justify-center">
        {/* Screen Selector Dropdown */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="screen-selector" className="text-[9px] font-mono text-zinc-400 uppercase whitespace-nowrap font-bold">Select Screen:</label>
          <select
            id="screen-selector"
            value={activeScreenId}
            onChange={(e) => onScreenChange(e.target.value)}
            className="bg-[#FAFAFA] hover:bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-sm px-2.5 py-1 text-[11px] font-mono font-bold focus:outline-none focus:ring-1 focus:ring-zinc-400 cursor-pointer min-w-[210px] h-7.5"
          >
            {screens.map((s) => (
              <option key={s.id} value={s.id} className="font-mono text-[11px] text-zinc-900">
                {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* Breakpoint buttons */}
        <div className="h-5 w-[1px] bg-zinc-250 hidden sm:block"></div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono text-zinc-400 uppercase hidden lg:inline mr-1 font-bold">Viewport:</span>
          <div className="flex bg-[#FAFAFA] p-0.5 rounded-sm border border-zinc-300 overflow-hidden font-mono text-[10px] font-bold h-7.5">
            {[
              { id: 'desktop', label: 'D1440', Icon: Laptop },
              { id: 'tablet', label: 'T768', Icon: Tablet },
              { id: 'mobile', label: 'M390', Icon: Smartphone },
            ].map((bp) => {
              const Icon = bp.Icon;
              const isActive = activeBreakpoint === bp.id;
              return (
                <button
                  key={bp.id}
                  onClick={() => onBreakpointChange(bp.id as BreakpointId)}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-xs transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-zinc-950 text-white font-bold' 
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                  title={`Toggle ${bp.id} Viewport dimensions`}
                >
                  <Icon size={11} className={isActive ? 'text-white' : 'text-zinc-500'} />
                  <span className="hidden sm:inline">{bp.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Guide overlays togglers */}
        <div className="h-5 w-[1px] bg-zinc-250 hidden md:block"></div>
        <div className="flex items-center gap-2">
          {/* Spacing alignment lines toggle */}
          <button
            onClick={onToggleGrid}
            className={`flex items-center gap-1.5 h-7.5 px-2.5 rounded-sm text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
              showGrid 
                ? 'bg-zinc-950 border-zinc-950 text-white' 
                : 'bg-white border-zinc-300 text-zinc-650 hover:bg-zinc-50 hover:text-zinc-950'
            }`}
            title="Toggle 12-Column Grid Layout rules"
          >
            <Grid size={11} />
            <span className="hidden lg:inline">COLUMN RULES</span>
          </button>

          {/* High visibility pins toggle */}
          <button
            onClick={onTogglePins}
            className={`flex items-center gap-1.5 h-7.5 px-2.5 rounded-sm text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
              showPins 
                ? 'bg-zinc-950 border-zinc-950 text-white' 
                : 'bg-white border-zinc-300 text-zinc-650 hover:bg-zinc-50 hover:text-zinc-950'
            }`}
            title="Toggle interactive numbered callout pins overlay"
          >
            {showPins ? <Eye size={11} /> : <EyeOff size={11} />}
            <span className="hidden lg:inline">ANNOTATION PINS</span>
          </button>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={onExportHtml}
        className="bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-[10px] font-bold h-7.5 px-3.5 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all shrink-0 uppercase tracking-tight"
        title="Compile and download exact complete offline-ready single HTML spec file"
      >
        <FileDown size={12} />
        <span>EXPORT OFFLINE SPEC</span>
      </button>
    </div>
  );
}
