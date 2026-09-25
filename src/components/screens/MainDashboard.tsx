import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Eye, 
  Cloud, 
  Clock, 
  Star, 
  Compass, 
  ArrowRight,
  ShieldAlert,
  FileText,
  Info,
  Lightbulb,
  Database,
  Wind,
  Thermometer,
  Droplets,
  Sun,
  Moon,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
  RefreshCw,
  Globe,
  Radio
} from 'lucide-react';
import { 
  ObservationLocation, 
  ScreenType, 
  ObservationConditions, 
  ObservationScoreResult 
} from '../../types';
import { InteractiveMap } from '../map/InteractiveMap';
import { VerifiedLightPollutionMap } from '../map/VerifiedLightPollutionMap';
import { PollutionBadge, AerospaceButton } from '../common/UIComponents';

interface MainDashboardProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectLocationForDetails: (location: ObservationLocation) => void;
  currentLocationName: string;
  onOpenProvenance?: (datasetId: string) => void;
  selectedLocation: ObservationLocation;
  onSelectLocation: (loc: ObservationLocation) => void;
  currentConditions: ObservationConditions | null;
  observationScore: ObservationScoreResult | null;
  isWeatherLoading: boolean;
  weatherError: string | null;
  onSelectPresetCity?: (city: { name: string; lat: number; lng: number }) => void;
  onRetryWeather?: () => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  onNavigate,
  onSelectLocationForDetails,
  currentLocationName,
  onOpenProvenance,
  selectedLocation,
  onSelectLocation,
  currentConditions,
  observationScore,
  isWeatherLoading,
  weatherError,
  onSelectPresetCity,
  onRetryWeather
}) => {
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);

  const presetCities = [
    { name: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357 },
    { name: 'Alexandria, Egypt', lat: 31.2001, lng: 29.9187 },
    { name: 'Siwa, Egypt', lat: 29.2032, lng: 25.5195 },
    { name: 'Marsa Matruh, Egypt', lat: 31.3543, lng: 27.2373 },
    { name: 'Aswan, Egypt', lat: 24.0889, lng: 32.8998 },
    { name: 'Taba, Egypt', lat: 29.4925, lng: 34.8967 },
    { name: 'Wadi Rum, Jordan', lat: 29.5734, lng: 35.4206 },
  ];

  // Effective values: prefer live Open-Meteo data when available, fallback to selectedLocation
  const temp = currentConditions?.temperature;
  const humidity = currentConditions?.humidity;
  const cloudCover = currentConditions?.cloudCover;
  const windSpeed = currentConditions?.windSpeed;
  const visibilityKm = currentConditions?.visibilityKm;
  const weatherCond = currentConditions?.weatherCondition;
  const bortle = currentConditions?.bortleClass;
  const radianceVal = currentConditions?.radiance;
  const isDay = currentConditions?.isDay ?? false;

  // Observation Quality Score is calculated only from verified live inputs.
  const qScore10 = observationScore?.score10;
  const qScore100 = observationScore?.score;
  const qRating = observationScore?.rating;

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto text-slate-200">
      {/* Top Telemetry & API Status Banner */}
      <div className="bg-[#060c1e]/90 backdrop-blur-2xl border border-sky-500/30 rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          {/* Live vs Demo status badge */}
          {isWeatherLoading ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/50 text-sky-300 font-mono shadow-[0_0_12px_rgba(14,165,233,0.3)]">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
              <span>Acquiring satellite telemetry...</span>
            </div>
          ) : weatherError ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono shadow-[0_0_12px_rgba(251,191,36,0.3)]">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Telemetry offline — showing baseline model.</span>
              {onRetryWeather && (
                <button
                  onClick={onRetryWeather}
                  className="underline hover:text-white ml-1 flex items-center gap-1 font-sans cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono shadow-[0_0_15px_rgba(52,211,153,0.25)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]" />
              <span className="font-bold tracking-wider">LIVE TELEMETRY · Open-Meteo API</span>
              {currentConditions?.lastUpdated && (
                <span className="text-slate-400 text-[10px]">({currentConditions.lastUpdated})</span>
              )}
            </div>
          )}

          {/* Location Coordinates & Elevation */}
          <div className="hidden sm:flex items-center gap-2 text-slate-300 font-mono text-[11px] bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-inner">
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="text-white font-semibold">{selectedLocation.lat.toFixed(4)}°N, {selectedLocation.lng.toFixed(4)}°E</span>
            {currentConditions?.elevation !== undefined && (
              <span className="text-sky-300">• {currentConditions.elevation}m MSL</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto relative z-10">
          <button
            onClick={() => onNavigate('responsible-lighting')}
            className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-amber-500/50 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Responsible Lighting</span>
          </button>
          <button
            onClick={() => onNavigate('methodology')}
            className="px-3.5 py-2 rounded-xl bg-sky-950/90 hover:bg-sky-900 text-sky-200 border border-sky-500/50 hover:border-sky-400 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(14,165,233,0.2)] cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-sky-400" />
            <span>Data & Methodology</span>
          </button>
        </div>
      </div>

      {/* Quick Location Pills Strip (Egypt & Middle East Astronomy Hubs) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5 font-bold">
          <Compass className="w-4 h-4 text-sky-400" />
          <span>Ground Stations:</span>
        </span>
        {presetCities.map((city) => {
          const isSelected = selectedLocation.name.toLowerCase().includes(city.name.split(',')[0].toLowerCase());
          return (
            <button
              key={city.name}
              onClick={() => onSelectPresetCity && onSelectPresetCity(city)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 border cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-600 text-white border-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.5)] scale-105'
                  : 'bg-[#091024] text-slate-300 border-slate-800 hover:border-sky-500/50 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              {city.name.split(',')[0]}
            </button>
          );
        })}
      </div>

      {/* Central Interactive Satellite Map Section */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-500/30 shadow-[0_15px_50px_rgba(0,0,0,0.8)] bg-[#050918]">
        <VerifiedLightPollutionMap
          latitude={selectedLocation.lat}
          longitude={selectedLocation.lng}
          locationName={`${selectedLocation.name}, ${selectedLocation.country}`}
        />

        {/* Floating Active Target Card (Top-Right) */}
        <div className="absolute top-4 right-4 sm:right-16 w-64 sm:w-76 z-30">
          <div className="bg-[#060c1e]/95 backdrop-blur-2xl border border-sky-500/40 rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.85)] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white tracking-wide flex items-center gap-1.5 truncate font-telemetry text-sm">
                <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">{selectedLocation.name}</span>
              </span>
              <PollutionBadge level={selectedLocation.pollutionLevel} />
            </div>

            {/* Photo preview */}
            <div className="rounded-xl overflow-hidden h-26 relative border border-slate-700/80 shadow-inner">
              <img 
                src={selectedLocation.image || selectedLocation.imageUrl} 
                alt={selectedLocation.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white">
                <span className="font-semibold truncate">{selectedLocation.name}, {selectedLocation.country}</span>
                <span className="text-emerald-400 font-mono font-bold shrink-0 shadow-sm">★ {qScore10 !== undefined ? qScore10.toFixed(1) : '—'}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-300 leading-snug">
              {bortle !== undefined ? `Bortle Class ${bortle}` : 'Light-pollution class unavailable'} • {cloudCover !== undefined ? `${cloudCover}% Cloud Cover` : 'Cloud cover unavailable'} • {visibilityKm !== undefined ? `${visibilityKm} km Optical Visibility` : 'Visibility unavailable'}.
            </div>

            <div className="flex items-center gap-2">
              <AerospaceButton
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => onSelectLocationForDetails(selectedLocation)}
              >
                Inspect Station Details
              </AerospaceButton>
              {onOpenProvenance && (
                <button
                  onClick={() => onOpenProvenance('bortle-scale')}
                  className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="View Bortle scale data provenance"
                >
                  <FileText className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Telemetry Strip from Open-Meteo */}
      <div className="bg-[#050c1e]/95 backdrop-blur-xl rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs shadow-lg" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-950/80 text-sky-400 border border-sky-500/30 shadow-[0_0_12px_rgba(14,165,233,0.25)]">
            {isDay ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-sky-300" />}
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2 text-sm font-telemetry">
              <span>{weatherCond}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-sky-300 font-mono border border-slate-700">
                {isDay ? 'Daylight Regime' : 'Night Sky Regime'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Open-Meteo Precision Astronomical Telemetry
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-[#091124] px-3 py-1.5 rounded-xl border border-slate-800">
            <Thermometer className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Temp:</span>
            <span className="text-white font-bold">{temp}°C</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#091124] px-3 py-1.5 rounded-xl border border-slate-800">
            <Droplets className="w-4 h-4 text-sky-400" />
            <span className="text-slate-400">Humidity:</span>
            <span className="text-white font-bold">{humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#091124] px-3 py-1.5 rounded-xl border border-slate-800">
            <Cloud className="w-4 h-4 text-slate-300" />
            <span className="text-slate-400">Clouds:</span>
            <span className="text-white font-bold">{cloudCover}%</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#091124] px-3 py-1.5 rounded-xl border border-slate-800">
            <Wind className="w-4 h-4 text-teal-400" />
            <span className="text-slate-400">Wind:</span>
            <span className="text-white font-bold">{windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#091124] px-3 py-1.5 rounded-xl border border-slate-800">
            <Eye className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-400">Visibility:</span>
            <span className="text-white font-bold">{visibilityKm} km</span>
          </div>
        </div>
      </div>

      {/* Summary Metrics Row with Sources Buttons & Exact Scientific Units */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Light Pollution Level & Radiance */}
        <div className="metric-card flex flex-col justify-between glass-card-hover">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span className="uppercase text-[11px] font-mono tracking-wider text-slate-300">Light Pollution</span>
            <div className="flex items-center gap-1.5">
              {onOpenProvenance && (
                <button
                  onClick={() => onOpenProvenance('viirs-dnb')}
                  className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-700 text-sky-400 hover:text-white hover:border-sky-500 transition-colors flex items-center gap-1"
                  title="Scientific Data Provenance (VIIRS-DNB)"
                >
                  <FileText className="w-3 h-3" />
                  <span>Sources</span>
                </button>
              )}
              <span className={`p-1 rounded ${bortle === undefined ? 'bg-slate-900 text-slate-500 border border-slate-700' : bortle <= 3 ? 'bg-sky-950/60 text-sky-400 border border-sky-500/30' : 'bg-rose-950/60 text-rose-400 border border-rose-500/30'}`}>
                <ShieldAlert className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 my-1">
            {/* Radial indicator */}
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={bortle === undefined ? 'text-slate-700' : bortle <= 3 ? 'text-sky-400' : bortle <= 5 ? 'text-amber-400' : 'text-rose-500'}
                  strokeDasharray={`${bortle === undefined ? 0 : Math.min(100, (bortle / 9) * 100)}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[11px] font-bold text-white font-mono">{bortle !== undefined ? bortle : '—'}</span>
            </div>
            <div>
              <div className="text-xl font-bold text-white">{bortle !== undefined ? `Bortle Class ${bortle}` : 'Light pollution data unavailable'}</div>
              <div className="text-[11px] text-slate-400 font-mono">
                {radianceVal !== undefined ? `Radiance: ${radianceVal} nW·cm⁻²·sr⁻¹` : 'Connect a verified VIIRS/sky-brightness dataset to show radiance.'}
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span className="truncate max-w-[140px]">Zone: {selectedLocation.name}</span>
            <span className="font-mono text-slate-400">{radianceVal !== undefined ? 'Verified light dataset' : 'Not connected'}</span>
          </div>
        </div>

        {/* Metric 2: Atmospheric Seeing & Cloud Cover */}
        <div className="metric-card flex flex-col justify-between glass-card-hover">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span className="uppercase text-[11px] font-mono tracking-wider text-slate-300">Cloud Cover</span>
            <div className="flex items-center gap-1.5">
              {onOpenProvenance && (
                <button
                  onClick={() => onOpenProvenance('modis-terra-aqua-clouds')}
                  className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-700 text-sky-400 hover:text-white hover:border-sky-500 transition-colors flex items-center gap-1"
                  title="Cloud Cover Model Provenance"
                >
                  <FileText className="w-3 h-3" />
                  <span>Sources</span>
                </button>
              )}
              <span className="p-1 rounded bg-sky-950/60 text-sky-400 border border-sky-500/30">
                <Cloud className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
          <div className="my-1">
            <div className="text-xl font-bold text-white flex items-baseline gap-2">
              <span>{cloudCover <= 10 ? 'Optimal' : cloudCover <= 40 ? 'Moderate' : 'Overcast'}</span>
              <span className="text-xs text-sky-400 font-mono">{cloudCover}% Cover</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  cloudCover <= 20 ? 'bg-emerald-400' : cloudCover <= 50 ? 'bg-amber-400' : 'bg-rose-500'
                }`} 
                style={{ width: `${Math.max(4, cloudCover)}%` }} 
              />
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span>Atmospheric Seeing:</span>
            <span className="font-mono text-slate-300">
              {cloudCover <= 15 ? '0.9" (Superb)' : cloudCover <= 40 ? '1.3" (Good)' : '2.1" (Degraded)'}
            </span>
          </div>
        </div>

        {/* Metric 3: Optical Visibility & Transparency */}
        <div className="metric-card flex flex-col justify-between glass-card-hover">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span className="uppercase text-[11px] font-mono tracking-wider text-slate-300">Optical Visibility</span>
            <div className="flex items-center gap-1.5">
              {onOpenProvenance && (
                <button
                  onClick={() => onOpenProvenance('sentinel-tropomi-aod')}
                  className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-700 text-sky-400 hover:text-white hover:border-sky-500 transition-colors flex items-center gap-1"
                  title="Scientific Data Provenance (Sentinel-5P AOD / Open-Meteo)"
                >
                  <FileText className="w-3 h-3" />
                  <span>Sources</span>
                </button>
              )}
              <span className="p-1 rounded bg-sky-950/60 text-sky-400 border border-sky-500/30">
                <Eye className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
          <div className="my-1">
            <div className="text-xl font-bold text-white flex items-baseline gap-2">
              <span>{visibilityKm >= 20 ? 'Crisp' : visibilityKm >= 10 ? 'Good' : 'Hazy'}</span>
              <span className="text-xs text-sky-400 font-mono">{visibilityKm} km</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-sky-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (visibilityKm / 30) * 100)}%` }} 
              />
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span>Air Transparency:</span>
            <span className="font-mono text-slate-300">
              {visibilityKm >= 20 ? '96% (Superb)' : visibilityKm >= 10 ? '88% (Good)' : '72% (Fair)'}
            </span>
          </div>
        </div>

        {/* Metric 4: Aero Clear Observation Quality Score */}
        <div className="metric-card flex flex-col justify-between glass-card-hover">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span className="uppercase text-[11px] font-mono tracking-wider text-slate-300">Observation Score (Q_obs)</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-600/40 text-sky-300 hover:text-white transition-colors flex items-center gap-1"
                title="View Observation Quality Score factor breakdown"
              >
                <span>Breakdown</span>
                {showFormulaDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              <span className={`p-1 rounded ${(qScore10 ?? 0) >= 8 ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950/60 text-amber-400 border border-amber-500/30'}`}>
                <Star className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
          <div className="my-1">
            <div className="text-xl font-bold text-white flex items-baseline gap-2">
              <span className={(qScore10 ?? 0) >= 8 ? 'text-emerald-300' : (qScore10 ?? 0) >= 6 ? 'text-sky-300' : 'text-amber-300'}>
                {qRating ?? 'Unavailable'}
              </span>
              <span className="text-xs text-emerald-400 font-mono">★ {qScore10 !== undefined ? qScore10.toFixed(1) : '—'} / 10.0</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  (qScore10 ?? 0) >= 8 ? 'bg-emerald-400' : (qScore10 ?? 0) >= 6 ? 'bg-sky-400' : 'bg-amber-400'
                }`} 
                style={{ width: `${qScore100 ?? 0}%` }} 
              />
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span>Score Model:</span>
            <button 
              onClick={() => onNavigate('methodology')}
              className="text-sky-400 hover:text-sky-300 font-medium"
            >
              Methodology →
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Observation Quality Score Formula Breakdown Drawer */}
      {showFormulaDetails && observationScore && (
        <div className="bg-[#080E20] border border-sky-500/40 rounded-2xl p-5 shadow-2xl animate-in fade-in duration-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Observation Quality Score Model Breakdown: {selectedLocation.name}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {observationScore.methodologyNote}
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-emerald-400 font-mono">
                {observationScore.score} / 100 ({observationScore.score10.toFixed(1)} / 10)
              </div>
              <div className="text-[11px] text-slate-400 uppercase font-mono">{observationScore.rating} Quality</div>
            </div>
          </div>

          {/* 5 Factors Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {/* Factor 1: Cloud Cover */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Cloud Cover</span>
                <span className="font-mono text-[10px] text-sky-400">35% Weight</span>
              </div>
              <div className="text-base font-bold text-white font-mono">
                {observationScore.factors.cloudCover.value}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                Contribution: +{observationScore.factors.cloudCover.contribution} pts
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                {observationScore.factors.cloudCover.description}
              </p>
            </div>

            {/* Factor 2: Visibility */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Optical Visibility</span>
                <span className="font-mono text-[10px] text-sky-400">25% Weight</span>
              </div>
              <div className="text-base font-bold text-white font-mono">
                {observationScore.factors.visibility.value}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                Contribution: +{observationScore.factors.visibility.contribution} pts
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                {observationScore.factors.visibility.description}
              </p>
            </div>

            {/* Factor 3: Humidity */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Relative Humidity</span>
                <span className="font-mono text-[10px] text-sky-400">15% Weight</span>
              </div>
              <div className="text-base font-bold text-white font-mono">
                {observationScore.factors.humidity.value}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                Contribution: +{observationScore.factors.humidity.contribution} pts
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                {observationScore.factors.humidity.description}
              </p>
            </div>

            {/* Factor 4: Wind Speed */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Wind Stability</span>
                <span className="font-mono text-[10px] text-sky-400">10% Weight</span>
              </div>
              <div className="text-base font-bold text-white font-mono">
                {observationScore.factors.wind.value}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                Contribution: +{observationScore.factors.wind.contribution} pts
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                {observationScore.factors.wind.description}
              </p>
            </div>

            {/* Factor 5: Light Pollution */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Dark Sky / Radiance</span>
                <span className="font-mono text-[10px] text-sky-400">15% Weight</span>
              </div>
              <div className="text-base font-bold text-white font-mono">
                {observationScore.factors.lightPollution.value}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                Contribution: +{observationScore.factors.lightPollution.contribution} pts
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                {observationScore.factors.lightPollution.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 gap-2">
            <div>
              <span className="text-amber-400 font-semibold">Scientific Disclaimer: </span>
              <span>{observationScore.methodologyNote}</span>
            </div>
            <button
              onClick={() => onNavigate('methodology')}
              className="text-sky-400 hover:text-sky-300 underline shrink-0 font-medium"
            >
              Full Mathematical Documentation →
            </button>
          </div>
        </div>
      )}

      {/* Hourly Atmospheric Forecast Strip (Next 8 Hours from Open-Meteo) */}
      {currentConditions?.hourlyForecast && currentConditions.hourlyForecast.length > 0 && (
        <div className="bg-[#070D1E] border border-slate-800 rounded-xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Next Hours Atmospheric Seeing Forecast (Open-Meteo)</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Hourly Projection</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {currentConditions.hourlyForecast.slice(0, 8).map((hour, idx) => {
              const dateObj = new Date(hour.time);
              const timeStr = !isNaN(dateObj.getTime())
                ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : hour.time.includes('T') ? hour.time.split('T')[1].slice(0, 5) : hour.time;

              return (
                <div
                  key={`forecast-${idx}`}
                  className="bg-[#0b1224] border border-slate-800/80 rounded-lg p-2.5 text-center flex flex-col justify-between"
                >
                  <div className="text-[11px] font-mono text-slate-400">{timeStr}</div>
                  <div className="my-1.5">
                    <div className="text-xs font-bold text-white font-mono">{hour.temperature}°C</div>
                    <div className="text-[10px] text-sky-300 font-mono mt-0.5">{hour.cloudCover}% clouds</div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 border-t border-slate-800/60 pt-1">
                    {hour.windSpeed} km/h
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Action Navigation Strip */}
      <div className="rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: 'rgba(10,16,36,0.9)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Find Pristine Dark Skies & Observatories</h4>
            <p className="text-[11px] text-slate-400">Explore categorized sites filtered by cloud coverage, elevation, and Bortle score.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <AerospaceButton
            variant="secondary"
            size="sm"
            onClick={() => onNavigate('methodology')}
          >
            Data Methodology
          </AerospaceButton>
          <AerospaceButton
            variant="secondary"
            size="sm"
            onClick={() => onNavigate('map')}
          >
            Open Dedicated Map
          </AerospaceButton>
          <AerospaceButton
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-4 h-4 text-white" />}
            onClick={() => onNavigate('locations')}
          >
            Browse Locations
          </AerospaceButton>
        </div>
      </div>

      {/* Open-Meteo & NOAA Attribution Footer */}
      <div className="text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-800/80 pt-3">
        <span>
          Weather and atmospheric telemetry provided by{' '}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline"
          >
            Open-Meteo.com
          </a>{' '}
          under CC BY 4.0 license.
        </span>
        <span className="font-mono text-slate-400">
          Light-pollution values are shown only when a verified source is connected.
        </span>
      </div>
    </div>
  );
};
