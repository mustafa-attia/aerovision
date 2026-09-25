import React, { useState } from 'react';
import {
  ArrowLeft,
  Flame,
  Eye,
  Cloud,
  Clock,
  Star,
  Compass,
  Telescope,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { LocationObservation, ScreenType } from '../../types';
import { InteractiveMap } from '../InteractiveMap';
import { ObservationPlanModal } from '../ObservationPlanModal';

interface LocationDetailsPageProps {
  location: LocationObservation;
  onBack: () => void;
  onSelectAnotherLocation?: (loc: LocationObservation) => void;
  onNavigate?: (screen: ScreenType) => void;
}

export const LocationDetailsPage: React.FC<LocationDetailsPageProps> = ({
  location,
  onBack,
  onSelectAnotherLocation,
  onNavigate,
}) => {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState<'pollution' | 'visibility'>('pollution');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800/60"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" />
          <span>Back to Observation Locations</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>COORDINATES:</span>
          <span className="text-white font-medium">{location.lat.toFixed(4)}° N, {location.lng.toFixed(4)}° E</span>
        </div>
      </div>

      {/* Hero Banner with Panoramic Night Sky Visual & Badge (Matching Screenshot 5) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-[#0F1424]">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-[#0A0D18]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D18] via-transparent to-transparent" />

          {/* Location Title & Badges Overlay */}
          <div className="absolute bottom-6 left-6 sm:left-8 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Excellent for Stargazing</span>
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-black/60 text-sky-300 border border-slate-700/80 backdrop-blur-md">
                  Bortle Class {location.bortleClass} · {location.elevationMeters}m Elevation
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
                {location.name}, {location.country}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {location.description}
              </p>
            </div>

            {/* Quick Score Ribbon */}
            <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-center shrink-0">
              <div className="text-[10px] uppercase font-bold text-slate-400">Quality Index</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                {location.qualityScore} <span className="text-xs text-slate-400">/ 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key Conditions Metric Cards Row (Matching Screenshot 5) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Metric 1: Light Pollution */}
        <div className="p-4 rounded-xl bg-[#0F1424] border border-slate-800/80 shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-blue-400" />
            <span>Light Pollution</span>
          </div>
          <div className="text-base font-bold text-blue-300 font-['Plus_Jakarta_Sans']">
            {location.pollutionLevel}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            {location.pollutionScore} / 10 index
          </div>
        </div>

        {/* Metric 2: Sky Visibility */}
        <div className="p-4 rounded-xl bg-[#0F1424] border border-slate-800/80 shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sky Visibility</span>
          </div>
          <div className="text-base font-bold text-cyan-300 font-['Plus_Jakarta_Sans']">
            {location.visibilityScore >= 9 ? 'Excellent' : 'Good'}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            {location.visibilityScore} / 10
          </div>
        </div>

        {/* Metric 3: Cloud Coverage */}
        <div className="p-4 rounded-xl bg-[#0F1424] border border-slate-800/80 shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
            <Cloud className="w-3.5 h-3.5 text-slate-400" />
            <span>Cloud Coverage</span>
          </div>
          <div className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
            {location.cloudCoverage}%
          </div>
          <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
            Clear sky canopy
          </div>
        </div>

        {/* Metric 4: Weather & Temp */}
        <div className="p-4 rounded-xl bg-[#0F1424] border border-slate-800/80 shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            <span>Weather</span>
          </div>
          <div className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
            {location.temperature}°C
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5 truncate">
            {location.weatherCondition}
          </div>
        </div>

        {/* Metric 5: Best Observation Time */}
        <div className="p-4 rounded-xl bg-[#0F1424] border border-slate-800/80 shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Best Window</span>
          </div>
          <div className="text-xs font-bold text-sky-300 font-['Plus_Jakarta_Sans'] truncate">
            {location.bestObservationTime}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Tonight's prime
          </div>
        </div>

        {/* Metric 6: Observation Quality */}
        <div className="p-4 rounded-xl bg-[#0F1424] border border-slate-800/80 shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-emerald-400" />
            <span>Quality Rating</span>
          </div>
          <div className="text-base font-bold text-emerald-400 font-['Plus_Jakarta_Sans']">
            ★ {location.qualityScore}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            High optical rating
          </div>
        </div>
      </div>

      {/* Main Content Split: Historical Charts + Sky Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Light Pollution & Sky Visibility Charts (Matching Screenshot 5) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0F1424] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                  Historical Telemetry Trends
                </h3>
                <p className="text-xs text-slate-400">
                  Monthly artificial nocturnal radiance & atmospheric transparency
                </p>
              </div>

              {/* Chart Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveChartTab('pollution')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    activeChartTab === 'pollution'
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Light Pollution
                </button>
                <button
                  onClick={() => setActiveChartTab('visibility')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    activeChartTab === 'visibility'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sky Visibility
                </button>
              </div>
            </div>

            {/* Interactive SVG Chart matching aerospace dark UI */}
            <div className="h-60 w-full pt-4">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={activeChartTab === 'pollution' ? '#A855F7' : '#38BDF8'}
                      stopOpacity="0.4"
                    />
                    <stop
                      offset="100%"
                      stopColor={activeChartTab === 'pollution' ? '#A855F7' : '#38BDF8'}
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                {/* Grid horizontal lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />

                {/* Path calculation based on history */}
                {(() => {
                  const points = location.history.map((h, i) => {
                    const x = (i / (location.history.length - 1)) * 480 + 10;
                    // value mapped to 0-10 score
                    const val = activeChartTab === 'pollution' ? h.pollution : h.visibility;
                    const y = 170 - (val / 10) * 140;
                    return { x, y, month: h.month, val };
                  });

                  const dPath = points.reduce(
                    (acc, pt, idx) => (idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`),
                    ''
                  );
                  const dArea = `${dPath} L ${points[points.length - 1].x},180 L ${points[0].x},180 Z`;

                  return (
                    <>
                      <path d={dArea} fill="url(#chartGrad)" />
                      <path
                        d={dPath}
                        fill="none"
                        stroke={activeChartTab === 'pollution' ? '#C084FC' : '#38BDF8'}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Data Dots & Labels */}
                      {points.map((pt, i) => (
                        <g key={i}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="4.5"
                            fill="#0F172A"
                            stroke={activeChartTab === 'pollution' ? '#C084FC' : '#38BDF8'}
                            strokeWidth="2.5"
                          />
                          <text
                            x={pt.x}
                            y="195"
                            textAnchor="middle"
                            fill="#94A3B8"
                            fontSize="10"
                            fontWeight="500"
                            fontFamily="Plus Jakarta Sans, sans-serif"
                          >
                            {pt.month}
                          </text>
                          <text
                            x={pt.x}
                            y={pt.y - 8}
                            textAnchor="middle"
                            fill="#F1F5F9"
                            fontSize="9"
                            fontWeight="bold"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            {pt.val.toFixed(1)}
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Hourly Seeing & Atmospheric Forecast */}
          <div className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Tonight's Hourly Astronomical Seeing Forecast</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              {location.hourlyForecast.map((h, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1">
                  <div className="font-mono text-sky-300 font-semibold text-[11px]">{h.time}</div>
                  <div className="text-white font-bold text-xs">{h.visibility}/10 Vis</div>
                  <div className="text-[10px] text-slate-400">Clouds: {h.clouds}%</div>
                  <div className="text-[10px] text-emerald-400 font-mono font-medium truncate">{h.seeing}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Stargazing Recommendations & Primary CTA */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recommendation Box (Matching Screenshot 5) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#13192B] to-[#0D1220] border border-slate-700/80 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 text-sky-400">
              <Telescope className="w-5 h-5" />
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                Aero Clear Recommendation
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>{location.name}</strong> offers pristine conditions for astronomical observation with minimal artificial light pollution, dry air columns, and high optical contrast.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/80 space-y-2 text-xs">
              <div className="font-semibold text-sky-200">Optimal Observation Targets:</div>
              <ul className="space-y-1 text-slate-300">
                {(location.recommendedTargets || location.celestialTargets || []).map((target, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{target}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Large Primary Action Button: "Start Observation Planning" (Matching Prompt Requirement) */}
            <button
              id="start-observation-planning-btn"
              onClick={() => setIsPlanModalOpen(true)}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
            >
              <Telescope className="w-4 h-4" />
              <span>Start Observation Planning</span>
            </button>
          </div>

          {/* Satellite Telemetry Footprint Card */}
          <div className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800 shadow-xl space-y-3 text-xs text-slate-300">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider text-slate-400">
              Satellite Sensor Telemetry
            </div>
            <div className="space-y-2 divide-y divide-slate-800/80">
              <div className="flex justify-between pt-1.5">
                <span className="text-slate-400">NOAA-20 VIIRS Radiance:</span>
                <span className="font-mono text-white">0.014 nW·cm⁻²·sr⁻¹</span>
              </div>
              <div className="flex justify-between pt-1.5">
                <span className="text-slate-400">Copernicus Aerosol Index:</span>
                <span className="font-mono text-emerald-400">0.08 AOD (Clear)</span>
              </div>
              <div className="flex justify-between pt-1.5">
                <span className="text-slate-400">SRTM Mountain Barrier:</span>
                <span className="text-sky-300 font-medium">South Ridge Shielding 92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Observation Planning Modal */}
      <ObservationPlanModal
        location={location}
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />
    </div>
  );
};
