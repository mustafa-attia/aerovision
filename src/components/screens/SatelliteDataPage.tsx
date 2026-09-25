import React from 'react';
import {
  Satellite,
  Database,
  Cpu,
  Layers,
  Activity,
  Radio,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { SATELLITE_SOURCES, PIPELINE_STEPS } from '../../data/mockData';
import { ScreenType } from '../../types';

interface SatelliteDataPageProps {
  onNavigate?: (screen: ScreenType) => void;
}

export const SatelliteDataPage: React.FC<SatelliteDataPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title & Introduction Banner Matching Screenshot 7 */}
      <div className="p-6 rounded-2xl bg-[#0F1424] border border-slate-800 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700/80 text-sky-300 text-xs font-semibold">
          <Satellite className="w-3.5 h-3.5 text-sky-400" />
          <span>Spacecraft Telemetry & Remote Sensing Systems</span>
        </div>
        <h2 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
          Satellite Data & Environmental Information
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          We use multiple satellite and environmental data streams to analyze light pollution and provide accurate observation recommendations with calibrated nocturnal radiometry.
        </p>
      </div>

      {/* 5 Core Environmental & Satellite Data Cards Matching Prompt & Screenshot 7 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SATELLITE_SOURCES.map((source) => (
          <div
            key={source.id}
            className="p-6 rounded-2xl bg-[#0F1424] border border-slate-800/80 hover:border-sky-500/40 shadow-xl flex flex-col justify-between group transition-all"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800/20 border border-slate-700/80 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                  <Satellite className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      source.status === 'Online'
                        ? 'bg-emerald-400'
                        : 'bg-amber-400 animate-pulse'
                    }`}
                  />
                  <span>{source.status}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 font-mono block">
                  {source.dataType}
                </span>
                <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans'] mt-0.5">
                  {source.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  {source.agency}
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {source.description}
              </p>

              {/* Data Specifications List */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sensor:</span>
                  <span className="text-slate-200 truncate max-w-[170px]">{source.sensor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Resolution:</span>
                  <span className="text-cyan-300">{source.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Primary Metric:</span>
                  <span className="text-sky-300 truncate max-w-[170px]">{source.dataMetric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cadence:</span>
                  <span className="text-emerald-400">{source.updateFrequency}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/60 mt-4 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-sky-400" />
                <span>Last Telemetry: {source.lastPass}</span>
              </span>
              <span className="text-slate-400 font-mono">{source.orbit.split(' ')[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Satellite-Data Processing Pipeline (Matching Prompt & Screenshot 7):
          Satellite Data → Processing → Analysis → Pollution Map → Observation Recommendation
      */}
      <div className="p-8 rounded-3xl bg-[#0F1424] border border-slate-700/80 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
            Pipeline Architecture
          </span>
          <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans'] mt-0.5">
            Satellite Data Processing Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end transformation from raw satellite radiance into calibrated dark-sky recommendations.
          </p>
        </div>

        {/* 5-Step Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {[
            {
              step: '01',
              title: 'Satellite Data',
              sub: 'Raw Nocturnal Ingestion',
              desc: 'VIIRS-DNB radiance, MODIS IR clouds, and Sentinel-5P aerosols.',
              icon: Satellite,
            },
            {
              step: '02',
              title: 'Processing',
              sub: 'Radiometric Calibration',
              desc: 'Lunar phase removal, cloud masking, and aerosol correction.',
              icon: Cpu,
            },
            {
              step: '03',
              title: 'Analysis',
              sub: 'Scatter & Skyglow Modeling',
              desc: 'Rayleigh scatter modeling across terrain and mountain barriers.',
              icon: Activity,
            },
            {
              step: '04',
              title: 'Pollution Map',
              sub: 'Bortle Scale Grid',
              desc: 'High-resolution surface sky brightness visualization.',
              icon: Layers,
            },
            {
              step: '05',
              title: 'Observation Recommendation',
              sub: 'Astronomical Quality Index',
              desc: 'Actionable stargazing sites with target optimization.',
              icon: Radio,
            },
          ].map((node, i) => {
            const Icon = node.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 shadow-lg relative flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-sky-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/80">
                      STEP {node.step}
                    </span>
                    <Icon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{node.title}</h4>
                  <div className="text-[10px] font-semibold text-sky-300 mb-2">{node.sub}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{node.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
