import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Eye, 
  Search, 
  Filter, 
  Radio, 
  Bell, 
  ChevronDown, 
  Star, 
  Check, 
  Activity,
  Layers,
  ArrowRight,
  TrendingUp,
  Download
} from 'lucide-react';
import { AerospaceButton, GlassCard, MetricCard, PollutionBadge } from '../common/UIComponents';
import { LOCATIONS_DATA } from '../../data/mockData';

export const DesignSystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'analytics'>('overview');
  const [selectedSort, setSelectedSort] = useState('Best Quality');
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="p-4 lg:p-8 space-y-10 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="border-b border-slate-800/80 pb-5">
        <div className="text-xs uppercase font-mono tracking-widest text-sky-400 mb-1">
          Component Architecture & Specification
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
          Aero Clear Design System & Components
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Aerospace-grade dark theme system engineered with high contrast, mathematical optical spacing, glassmorphism, and telemetry-focused functional accents.
        </p>
      </div>

      {/* 1. Buttons */}
      <section className="space-y-3 bg-[#0a0f1d] border border-slate-800 rounded-xl p-5">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
          Buttons & Controls
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <AerospaceButton variant="primary" size="md">
            Primary Action
          </AerospaceButton>
          <AerospaceButton variant="secondary" size="md">
            Secondary Action
          </AerospaceButton>
          <AerospaceButton variant="outline" size="md">
            Outline Action
          </AerospaceButton>
          <AerospaceButton variant="ghost" size="md">
            Ghost Action
          </AerospaceButton>
          <AerospaceButton variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Small with Icon
          </AerospaceButton>
          <AerospaceButton variant="secondary" size="lg" icon={<Download className="w-4 h-4" />}>
            Large Action
          </AerospaceButton>
        </div>
      </section>

      {/* 2. Badges & Status Indicators */}
      <section className="space-y-3 bg-[#0a0f1d] border border-slate-800 rounded-xl p-5">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
          Status Indicators & Pollution Badges
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <PollutionBadge level="Low" />
          <PollutionBadge level="Moderate" />
          <PollutionBadge level="High" />
          <PollutionBadge level="Very High" />
          <PollutionBadge variant="blue" text="Telemetry Online" />
          <PollutionBadge variant="blue" text="Sensor Calibrated" />
        </div>
      </section>

      {/* 3. Search & Filters & Dropdowns */}
      <section className="space-y-3 bg-[#0a0f1d] border border-slate-800 rounded-xl p-5">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
          Search, Filters & Dropdowns
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              readOnly
              value="Taba, South Sinai..."
              className="w-full bg-[#0d1424] border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200"
            />
          </div>

          <div className="flex items-center justify-between bg-[#0d1424] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200">
            <span className="flex items-center gap-2 text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter: Low Pollution</span>
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="flex items-center justify-between bg-[#0d1424] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200">
            <span className="flex items-center gap-2 text-slate-400">
              <span>Sort: {selectedSort}</span>
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </section>

      {/* 4. Map Markers */}
      <section className="space-y-3 bg-[#0a0f1d] border border-slate-800 rounded-xl p-5">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
          Map Marker Telemetry Archetypes
        </div>
        <div className="flex flex-wrap items-center gap-8 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-600 border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.8)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-white">Active Dark Sky</div>
              <div className="text-[10px] text-slate-400 font-mono">Bortle 1-2</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-600 border-2 border-amber-300 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.8)]">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-white">Moderate Skyglow</div>
              <div className="text-[10px] text-slate-400 font-mono">Bortle 3-4</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-700 border-2 border-rose-300 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.8)]">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-white">High Pollution Zone</div>
              <div className="text-[10px] text-slate-400 font-mono">Bortle 8-9</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tabs */}
      <section className="space-y-3 bg-[#0a0f1d] border border-slate-800 rounded-xl p-5">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
          Segmented Navigation Tabs
        </div>
        <div className="inline-flex p-1 rounded-lg bg-[#0e162b] border border-slate-800 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'overview' ? 'bg-slate-900 text-sky-200 border border-sky-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'details' ? 'bg-slate-900 text-sky-200 border border-sky-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'analytics' ? 'bg-slate-900 text-sky-200 border border-sky-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Analytics
          </button>
        </div>
      </section>

      {/* 6. Modal / Dialog Preview Trigger */}
      <section className="space-y-3 bg-[#0a0f1d] border border-slate-800 rounded-xl p-5">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
          Modal / Dialog Component
        </div>
        <div className="pt-2">
          <AerospaceButton
            variant="secondary"
            size="sm"
            onClick={() => setShowDemoModal(true)}
          >
            Open Sample Confirmation Dialog
          </AerospaceButton>
        </div>
      </section>

      {/* Sample Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b101e] border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Confirm Target Recalibration</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to recalculate the Bortle sky brightness index using the latest VIIRS night orbital pass?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <AerospaceButton
                variant="primary"
                size="sm"
                onClick={() => setShowDemoModal(false)}
              >
                Recalibrate
              </AerospaceButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
