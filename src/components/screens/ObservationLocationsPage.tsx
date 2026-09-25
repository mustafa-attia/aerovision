import React, { useState } from 'react';
import {
  Search,
  ArrowUpDown,
  Eye,
  Cloud,
  MapPin,
  Star,
  Flame,
  ArrowRight,
  Compass,
  Sparkles,
  Mountain
} from 'lucide-react';
import { LocationObservation, ScreenType } from '../../types';
import { LOCATIONS } from '../../data/mockData';
import { PollutionBadge, AerospaceButton } from '../common/UIComponents';

interface ObservationLocationsPageProps {
  onSelectLocation: (location: LocationObservation) => void;
  onNavigateToDetails?: (locationId: string) => void;
  onNavigate?: (screen: ScreenType) => void;
}

export const ObservationLocationsPage: React.FC<ObservationLocationsPageProps> = ({
  onSelectLocation,
  onNavigateToDetails,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'quality' | 'pollution' | 'distance' | 'visibility'>('quality');
  const [filterCategory, setFilterCategory] = useState<'All' | 'Low Pollution' | 'Optimal Weather'>('All');

  // Filter & sort locations
  const filtered = LOCATIONS.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.region.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterCategory === 'Low Pollution' && loc.pollutionLevel !== 'Low') return false;
    if (filterCategory === 'Optimal Weather' && loc.cloudCoverage > 10) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'quality') return b.qualityScore - a.qualityScore;
    if (sortBy === 'pollution') return a.pollutionScore - b.pollutionScore;
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'visibility') return b.visibilityScore - a.visibilityScore;
    return 0;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200 p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header and Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-6 rounded-3xl bg-[#060c1e]/90 backdrop-blur-2xl border border-sky-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white font-telemetry flex items-center gap-2.5">
              <span>CERTIFIED DARK-SKY CORRIDORS</span>
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-sky-950/80 text-sky-300 font-mono font-bold border border-sky-500/40 shadow-[0_0_10px_rgba(56,189,248,0.25)]">
              {filtered.length} SITES VERIFIED
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Satellite-calibrated astronomical sanctuaries optimized for optical seeing, atmospheric transparency, and pristine darkness.
          </p>
        </div>

        {/* Sort & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sanctuaries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#091124] border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 transition-all font-sans"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 bg-[#091124] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px] text-slate-400 font-mono">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-semibold"
            >
              <option value="quality" className="bg-[#091124]">Best Quality Score</option>
              <option value="pollution" className="bg-[#091124]">Lowest Light Pollution</option>
              <option value="visibility" className="bg-[#091124]">Highest Visibility</option>
              <option value="distance" className="bg-[#091124]">Nearest Distance</option>
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#091124] border border-slate-700/80 text-xs">
            {(['All', 'Low Pollution', 'Optimal Weather'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((location) => (
          <div
            key={location.id}
            id={`location-card-${location.id}`}
            className="rounded-3xl bg-[#070d1e]/85 backdrop-blur-2xl border border-slate-800/90 hover:border-sky-500/50 shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(14,165,233,0.15)]"
          >
            <div>
              {/* Image Preview & Badges */}
              <div className="relative h-48 overflow-hidden border-b border-slate-800/80">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d1e] via-[#070d1e]/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <PollutionBadge level={location.pollutionLevel} />

                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/80 text-sky-300 border border-sky-400/30 backdrop-blur-md shadow-md">
                    Bortle Class {location.bortleClass}
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">{location.region}, {location.country}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 font-mono font-bold text-sm bg-black/60 px-2 py-0.5 rounded-lg border border-emerald-500/30 backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                    <span>{location.qualityScore}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white font-telemetry group-hover:text-sky-300 transition-colors">
                  {location.name}, {location.country}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {location.description}
                </p>

                {/* 4 Essential Stats Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-800/80 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2 bg-[#091124] p-2 rounded-xl border border-slate-800">
                    <Eye className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-slate-400">Seeing:</span>
                    <span className="font-bold text-white ml-auto">{location.visibilityScore}/10</span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#091124] p-2 rounded-xl border border-slate-800">
                    <Cloud className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Clouds:</span>
                    <span className="font-bold text-white ml-auto">{location.cloudCoverage}%</span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#091124] p-2 rounded-xl border border-slate-800">
                    <Compass className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="text-slate-400">Dist:</span>
                    <span className="font-bold text-white ml-auto">{location.distanceKm} km</span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#091124] p-2 rounded-xl border border-slate-800">
                    <Mountain className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="text-slate-400">Elev:</span>
                    <span className="font-bold text-white ml-auto">{location.elevationMeters}m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-6 pt-0">
              <button
                id={`btn-view-details-${location.id}`}
                onClick={() => {
                  onSelectLocation(location);
                  onNavigateToDetails?.(location.id);
                  onNavigate?.('location-details');
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-slate-900 to-[#0c1630] hover:from-sky-600 hover:to-indigo-600 border border-slate-700/80 hover:border-sky-400/50 text-slate-200 hover:text-white font-bold text-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-indigo-600 group-hover:text-white cursor-pointer"
              >
                <span>Inspect Observation Site</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
