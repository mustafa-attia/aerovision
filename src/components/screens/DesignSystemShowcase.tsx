import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Compass,
  Flame,
  Star,
  Eye,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'analytics'>('overview');
  const [dropdownValue, setDropdownValue] = useState('Best Quality');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0F1424] border border-slate-800 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700/80 text-sky-300 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span>Aero Clear Component Design Tokens</span>
        </div>
        <h2 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
          Design System & Components
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Standardized UI library built for aerospace telemetry and mission-control dark interfaces. High-contrast typography, mathematical spacing, and ergonomic interactive states.
        </p>
      </div>

      {/* Components Gallery Grid Matching Mockup Bottom Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Buttons */}
        <div className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800 space-y-4 shadow-lg">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            1. Buttons
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all">
              Primary Button
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 font-semibold text-xs transition-all">
              Secondary
            </button>
            <button className="px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 text-xs font-medium transition-all">
              Ghost Button
            </button>
          </div>
        </div>

        {/* 2. Navigation Items */}
        <div className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800 space-y-4 shadow-lg">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            2. Navigation Links
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gradient-to-r from-sky-600/30 to-blue-600/20 text-white border border-sky-500/40 text-xs font-medium">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Overview (Active State)</span>
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#a855f7]" />
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/40 text-xs font-medium">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Light Pollution Map (Default)</span>
            </div>
          </div>
        </div>

        {/* 3. Search & Filter Input */}
        <div className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800 space-y-4 shadow-lg">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            3. Search & Filter Fields
          </div>
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search coordinates..."
                readOnly
                value="Taba, South Sinai"
                className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 pl-8 pr-3 py-1.5 rounded-lg font-mono"
              />
            </div>
            <div className="flex gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Pollution: Low ▾
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Clouds: &lt;10% ▾
              </span>
            </div>
          </div>
        </div>

        {/* 4. Status Indicators */}
        <div className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800 space-y-4 shadow-lg">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            4. Status Indicators
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span>Online</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Syncing</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-red-300">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>Critical</span>
            </div>
          </div>
        </div>

        {/* 5. Map Markers */}
        <div className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800 space-y-4 shadow-lg">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            5. Map Markers
          </div>
          <div className="flex items-center gap-6 justify-center py-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_#38bdf8]">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-slate-400">Low</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_12px_#34d399]">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-slate-400">Moderate</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center text-sky-300 shadow-[0_0_12px_#c084fc]">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-slate-400">Selected</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center text-red-300 shadow-[0_0_12px_#f87171]">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-slate-400">High</span>
            </div>
          </div>
        </div>

        {/* 6. Tabs & Dropdown */}
        <div className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800 space-y-4 shadow-lg">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            6. Segmented Tabs & Dropdowns
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              {(['overview', 'details', 'analytics'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1 rounded-md capitalize font-semibold transition-colors ${
                    activeTab === tab
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white">
              <span className="text-slate-400">Sort By:</span>
              <span className="font-semibold text-sky-300 flex items-center gap-1">
                {dropdownValue}
                <ChevronDown className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
