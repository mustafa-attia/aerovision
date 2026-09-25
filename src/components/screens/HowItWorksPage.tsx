import React, { useState } from 'react';
import {
  Database,
  Cpu,
  Activity,
  MapPin,
  Telescope,
  ArrowDown,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react';
import { PIPELINE_STEPS, BORTLE_SCALE_INFO } from '../../data/mockData';
import { ScreenType } from '../../types';

interface HowItWorksPageProps {
  onNavigate?: (screen: ScreenType) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const [selectedBortle, setSelectedBortle] = useState<number>(1);

  const getStepIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Satellite':
        return Database;
      case 'Cpu':
        return Cpu;
      case 'Activity':
        return Activity;
      case 'MapPin':
        return MapPin;
      case 'Telescope':
        return Telescope;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0F1424] border border-slate-800 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700/80 text-sky-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Scientific Methodology & Architecture</span>
        </div>
        <h2 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
          How Aero Clear Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          From space data to better stargazing. Here is how our aerospace intelligence pipeline transforms multi-spectral satellite imagery and environmental data into personalized observation recommendations.
        </p>
      </div>

      {/* Complete Visual Flow Section (Matching Prompt Requirements):
          DATA COLLECTION
          ↓
          DATA PROCESSING
          ↓
          LIGHT POLLUTION ANALYSIS
          ↓
          LOCATION ANALYSIS
          ↓
          OBSERVATION RECOMMENDATION
      */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1424] border border-slate-700/80 shadow-2xl space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
            Step-by-Step Aerospace Architecture
          </span>
          <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">
            End-to-End Analysis Workflow
          </h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {PIPELINE_STEPS.map((step, idx) => {
            const Icon = getStepIcon(step.icon);
            const isLast = idx === PIPELINE_STEPS.length - 1;

            return (
              <React.Fragment key={step.step}>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-5 group transition-all">
                  {/* Step Number & Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-600/20 to-blue-600/20 border border-sky-500/40 flex items-center justify-center text-sky-300 shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/80">
                        {step.tag}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Stage 0{step.step}</span>
                    </div>

                    <h4 className="text-base font-bold text-white font-['Plus_Jakarta_Sans'] group-hover:text-sky-300 transition-colors">
                      {step.step}. {step.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>

                    <div className="pt-1 text-[11px] text-sky-300/80 font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>{step.detail}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow connector between stages */}
                {!isLast && (
                  <div className="flex justify-center py-1 text-sky-400/60">
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Bortle Dark-Sky Scale Interactive Scientific Reference */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1424] border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
              Astronomical Classification
            </span>
            <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans'] mt-0.5">
              The Bortle Dark-Sky Scale Reference
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Standardized 9-level numerical scale measuring night sky brightness and star visibility.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span>Selected Class:</span>
            <span className="text-sky-300 font-bold">Class {selectedBortle}</span>
          </div>
        </div>

        {/* 1-9 Number Selector Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
          {BORTLE_SCALE_INFO.map((b) => (
            <button
              key={b.class}
              onClick={() => setSelectedBortle(b.class)}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedBortle === b.class
                  ? 'bg-slate-800 border-sky-500 text-white font-bold shadow-lg shadow-sky-600/20 scale-105'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-1.5"
                style={{ backgroundColor: b.color }}
              />
              <div className="text-xs font-mono font-bold">Class {b.class}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 truncate">{b.nakedEyeMag}</div>
            </button>
          ))}
        </div>

        {/* Selected Bortle Class Detail View */}
        {(() => {
          const info = BORTLE_SCALE_INFO.find((b) => b.class === selectedBortle) || BORTLE_SCALE_INFO[0];
          return (
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full shadow-lg"
                  style={{ backgroundColor: info.color }}
                />
                <h4 className="text-base font-bold text-white">
                  Bortle Class {info.class}: {info.title}
                </h4>
                <span className="ml-auto text-xs font-mono text-cyan-300 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/30">
                  Naked Eye Limit: {info.nakedEyeMag} mag
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {info.desc}
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
