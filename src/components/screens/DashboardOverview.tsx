import React from 'react';
import {
  Flame,
  Eye,
  Clock,
  Star,
  MapPin,
  ArrowRight,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  Compass,
  Satellite,
  Info,
} from 'lucide-react';
import { InteractiveMap } from '../InteractiveMap';
import { LocationObservation, ScreenType } from '../../types';
import { LOCATIONS } from '../../data/mockData';

interface DashboardOverviewProps {
  currentLocation: LocationObservation;
  onSelectLocation: (location: LocationObservation) => void;
  onNavigateToDetails: (locationId: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentLocation,
  onSelectLocation,
  onNavigateToDetails,
  onNavigate,
}) => {
  // Recommended top dark sky area from the catalogue (e.g. Taba or Al Wakan)
  const recommendedArea = LOCATIONS.find((l) => l.id === 'taba-egypt') || LOCATIONS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Ticker: Mission Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-900/60 via-slate-900/60 to-blue-950/40 border border-slate-800/80 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-950/60 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Satellite className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Orbit Telemetry Synchronized: VIIRS-DNB Pass</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Grid Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Selected Ground Station: <strong className="text-slate-200">{currentLocation.name}, {currentLocation.country}</strong> ({currentLocation.lat.toFixed(2)}°N, {currentLocation.lng.toFixed(2)}°E)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('map')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <span>Full Map View</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map (Left/Center) + Recommended Area Card (Right in large screens, or side-by-side) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Central Map Canvas */}
        <div className="xl:col-span-8 2xl:col-span-9 flex flex-col">
          <InteractiveMap
            selectedLocationId={currentLocation.id}
            onSelectLocation={onSelectLocation}
            compact={false}
          />
        </div>

        {/* Right Column: "Recommended Observation Area" Card & Quick Telemetry */}
        <div className="xl:col-span-4 2xl:col-span-3 space-y-6 flex flex-col">
          {/* Recommended Observation Area Card */}
          <div
            id="recommended-observation-card"
            className="p-5 rounded-2xl bg-[#0F1424] border border-slate-700/80 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:border-sky-400/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Recommended Observation Area
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                Top Rated
              </span>
            </div>

            {/* Thumbnail Preview */}
            <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-slate-800">
              <img
                src={recommendedArea.image}
                alt={recommendedArea.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-2.5 left-3">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-black/70 backdrop-blur-md text-white border border-white/10">
                  Bortle {recommendedArea.bortleClass} · {recommendedArea.elevationMeters}m MSL
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                  {recommendedArea.name}, {recommendedArea.country}
                </h3>
                <span className="text-xs font-semibold text-emerald-400 font-mono">
                  {recommendedArea.qualityScore}/10 Score
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Low light pollution · Excellent atmospheric visibility · {recommendedArea.cloudCoverage}% clouds
              </p>
            </div>

            {/* CTA Button */}
            <button
              id="recommended-view-details-btn"
              onClick={() => onNavigateToDetails(recommendedArea.id)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stargazing Prime Window Quick Widget */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <span>Tonight's Moon & Sky Window</span>
              <Clock className="w-3 h-3 text-sky-400" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-bold text-sm">Waxing Crescent (12%)</div>
                <div className="text-slate-400 text-[11px]">Moonset at 21:18 Local Time</div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-bold text-sm">6h 15m</div>
                <div className="text-slate-400 text-[11px]">Prime Dark Window</div>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full w-[82%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards Row (Matching Screenshot):
          1. Light Pollution Level
          2. Sky Visibility
          3. Best Observation Time
          4. Observation Quality
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Light Pollution Level */}
        <div
          id="summary-card-pollution"
          className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800/80 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-sky-500/40 transition-all"
        >
          <div className="flex items-center justify-between mb-3 text-slate-400 text-xs font-semibold">
            <span>Light Pollution Level</span>
            <Flame
              className={`w-4 h-4 ${
                currentLocation.pollutionLevel === 'Low'
                  ? 'text-blue-400'
                  : currentLocation.pollutionLevel === 'Moderate'
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}
            />
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span
              className={`text-2xl font-extrabold font-['Plus_Jakarta_Sans'] ${
                currentLocation.pollutionLevel === 'Low'
                  ? 'text-blue-400'
                  : currentLocation.pollutionLevel === 'Moderate'
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}
            >
              {currentLocation.pollutionLevel}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {currentLocation.pollutionScore} / 10
            </span>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
            <div className="flex items-center justify-between">
              <span>Bortle Scale Class:</span>
              <span className="font-semibold text-slate-200">Class {currentLocation.bortleClass}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  currentLocation.pollutionLevel === 'Low'
                    ? 'bg-blue-500 w-[25%]'
                    : currentLocation.pollutionLevel === 'Moderate'
                    ? 'bg-amber-500 w-[55%]'
                    : 'bg-red-500 w-[85%]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Sky Visibility */}
        <div
          id="summary-card-visibility"
          className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800/80 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-sky-500/40 transition-all"
        >
          <div className="flex items-center justify-between mb-3 text-slate-400 text-xs font-semibold">
            <span>Sky Visibility</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-extrabold text-cyan-300 font-['Plus_Jakarta_Sans']">
              {currentLocation.visibilityScore >= 9
                ? 'Superb'
                : currentLocation.visibilityScore >= 7.5
                ? 'Good'
                : currentLocation.visibilityScore >= 5
                ? 'Moderate'
                : 'Poor'}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {currentLocation.visibilityScore} / 10
            </span>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
            <div className="flex items-center justify-between">
              <span>Cloud Transparency:</span>
              <span className="font-semibold text-slate-200">{100 - currentLocation.cloudCoverage}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full"
                style={{ width: `${currentLocation.visibilityScore * 10}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Best Observation Time */}
        <div
          id="summary-card-time"
          className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800/80 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-sky-500/40 transition-all"
        >
          <div className="flex items-center justify-between mb-3 text-slate-400 text-xs font-semibold">
            <span>Best Observation Time</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>

          <div className="mb-2">
            <span className="text-xl font-extrabold text-sky-300 font-['Plus_Jakarta_Sans'] block leading-tight">
              {currentLocation.bestObservationTime}
            </span>
            <span className="text-[11px] text-slate-400">Tonight's optimal window</span>
          </div>

          <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Conditions:</span>
            <span className="font-semibold text-slate-200">{currentLocation.weatherCondition}</span>
          </div>
        </div>

        {/* Card 4: Observation Quality */}
        <div
          id="summary-card-quality"
          className="p-5 rounded-2xl bg-[#0F1424] border border-slate-800/80 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-sky-500/40 transition-all"
        >
          <div className="flex items-center justify-between mb-3 text-slate-400 text-xs font-semibold">
            <span>Observation Quality</span>
            <Star className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-extrabold text-emerald-300 font-['Plus_Jakarta_Sans']">
              {currentLocation.qualityScore >= 9
                ? 'Superb'
                : currentLocation.qualityScore >= 7.5
                ? 'Good'
                : 'Fair'}
            </span>
            <span className="text-xs font-mono text-slate-400">
              ★ {currentLocation.qualityScore} / 10
            </span>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
            <div className="flex items-center justify-between">
              <span>Site Elevation:</span>
              <span className="font-semibold text-slate-200">{currentLocation.elevationMeters}m MSL</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full"
                style={{ width: `${currentLocation.qualityScore * 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
