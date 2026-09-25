import React, { useState } from 'react';
import {
  Search,
  RotateCcw,
  Sparkles,
  MapPin,
  Compass,
  Database,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ObservationLocation, FilterState, ScreenType } from '../../types';
import { LOCATIONS_DATA } from '../../data/mockData';
import { VerifiedLightPollutionMap } from '../map/VerifiedLightPollutionMap';
import { AerospaceButton } from '../common/UIComponents';

interface LightPollutionMapPageProps {
  selectedLocation?: ObservationLocation;
  onSelectLocation?: (location: ObservationLocation) => void;
  onSelectLocationForDetails?: (loc: ObservationLocation) => void;
  onViewLocationDetails?: (locationId: string) => void;
  onNavigate?: (screen: ScreenType) => void;
}

export const LightPollutionMapPage: React.FC<LightPollutionMapPageProps> = ({
  selectedLocation: propSelectedLocation,
  onSelectLocation: propOnSelectLocation,
  onSelectLocationForDetails,
  onViewLocationDetails,
  onNavigate,
}) => {
  const [internalSelectedLocation, setInternalSelectedLocation] = useState<ObservationLocation>(
    propSelectedLocation || LOCATIONS_DATA[0]
  );

  const selectedLoc = propSelectedLocation || internalSelectedLocation;

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    pollutionLevel: 'All',
    cloudCoverage: 'All',
    visibility: 'All',
    distance: 'All',
    timeOfObservation: 'All',
  });

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      pollutionLevel: 'All',
      cloudCoverage: 'All',
      visibility: 'All',
      distance: 'All',
      timeOfObservation: 'All',
    });
  };

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-7xl mx-auto text-slate-200">
      {/* Top Filter Bar */}
      <div className="p-4.5 rounded-3xl bg-[#060c1e]/90 backdrop-blur-2xl border border-sky-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex flex-wrap items-center gap-3.5">
        {/* Search */}
        <div className="relative min-w-[220px] flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="map-filter-search"
            type="text"
            placeholder="Search celestial coordinates, city, or corridor..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="w-full bg-[#091124] border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 transition-all font-sans"
          />
        </div>

        {/* Pollution Level Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-mono font-semibold uppercase">Skyglow:</span>
          <select
            id="map-filter-pollution"
            value={filters.pollutionLevel}
            onChange={(e) => setFilters({ ...filters, pollutionLevel: e.target.value })}
            className="bg-[#091124] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer font-medium"
          >
            <option value="All">All Regimes</option>
            <option value="Low">Pristine Dark (Bortle 1–2)</option>
            <option value="Moderate">Rural / Suburb (Bortle 3–4)</option>
            <option value="High">Suburban Skyglow (Bortle 5–6)</option>
            <option value="Very High">Urban Saturation (Bortle 7–9)</option>
          </select>
        </div>

        {/* Cloud Coverage Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-mono font-semibold uppercase">Clouds:</span>
          <select
            id="map-filter-clouds"
            value={filters.cloudCoverage}
            onChange={(e) => setFilters({ ...filters, cloudCoverage: e.target.value })}
            className="bg-[#091124] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer font-medium"
          >
            <option value="All">Any Cloud Fraction</option>
            <option value="Under 10%">&lt; 10% (Pristine Clear)</option>
            <option value="Under 25%">&lt; 25% (Mostly Clear)</option>
          </select>
        </div>

        {/* Visibility Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-mono font-semibold uppercase">Seeing:</span>
          <select
            id="map-filter-vis"
            value={filters.visibility}
            onChange={(e) => setFilters({ ...filters, visibility: e.target.value })}
            className="bg-[#091124] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer font-medium"
          >
            <option value="All">Any Seeing</option>
            <option value="Excellent (9+)">Superb (Score 9+)</option>
            <option value="Good (7.5+)">Good (Score 7.5+)</option>
          </select>
        </div>

        {/* Reset Button */}
        <button
          id="map-filter-reset"
          onClick={resetFilters}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto flex items-center gap-1.5 text-xs font-semibold border border-transparent hover:border-slate-700 cursor-pointer"
          title="Reset Filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 xl:col-span-9 rounded-3xl overflow-hidden border border-sky-500/30 shadow-[0_15px_50px_rgba(0,0,0,0.8)] bg-[#050918]">
          <VerifiedLightPollutionMap
            latitude={selectedLoc.lat}
            longitude={selectedLoc.lng}
            locationName={`${selectedLoc.name}, ${selectedLoc.country}`}
          />
        </div>

        <aside className="lg:col-span-4 xl:col-span-3 space-y-4">
          <div className="bg-[#060c1e]/90 backdrop-blur-2xl border border-sky-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
                <span>Selected Coordinates</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white font-telemetry tracking-wide">{selectedLoc.name}</h3>
              <p className="text-xs text-sky-300 font-mono mt-0.5">{selectedLoc.country}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#091124] border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Latitude:</span>
                <span className="text-white font-bold">{selectedLoc.lat.toFixed(5)}°N</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Longitude:</span>
                <span className="text-white font-bold">{selectedLoc.lng.toFixed(5)}°E</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-amber-500/40 bg-amber-950/25 text-[11px] text-amber-200 leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Verified Light-Pollution Mapping</span>
              </div>
              <p className="text-slate-300">
                Aero Clear projects direct VIIRS / NASA Black Marble raster layers. We do not invent or interpolate numerical Bortle estimates without verified instrument feeds.
              </p>
            </div>
          </div>

          <div className="bg-[#060c1e]/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-6 shadow-xl space-y-3">
            <h4 className="text-sm font-bold text-white font-telemetry uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-400" />
              <span>Scientific Traceability</span>
            </h4>
            <div className="space-y-2.5 text-[11px] text-slate-300 leading-relaxed font-sans">
              <div className="p-2.5 rounded-xl bg-[#091124] border border-slate-800">
                <span className="text-sky-300 font-semibold">Location Geocoding: </span>
                <span>Open-Meteo Geocoding API → WGS84 coordinates.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#091124] border border-slate-800">
                <span className="text-sky-300 font-semibold">Atmospheric Optics: </span>
                <span>Open-Meteo Forecast API real-time cloud and visibility telemetry.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#091124] border border-slate-800">
                <span className="text-sky-300 font-semibold">Observation Scoring: </span>
                <span>Multi-factor normalized model based strictly on verified inputs.</span>
              </div>
            </div>

            <AerospaceButton
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => onNavigate?.('methodology')}
            >
              Examine Full Methodology
            </AerospaceButton>
          </div>
        </aside>
      </div>
    </div>
  );
};
