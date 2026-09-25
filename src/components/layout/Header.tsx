import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Search, 
  Bell, 
  ChevronDown, 
  Home, 
  Loader2,
  Globe,
  X
} from 'lucide-react';

import { LOCATIONS_DATA } from '../../data/mockData';
import { ObservationLocation, ScreenType, GeocodingResult } from '../../types';
import { searchLocation } from '../../api/geocoding';

interface HeaderProps {
  currentLocationName: string;
  onSelectCurrentLocation: (name: string) => void;
  onSearchSelectLocation: (loc: ObservationLocation) => void;
  onSelectGeocodedLocation?: (res: GeocodingResult) => void;
  onOpenNotifications: () => void;
  onNavigateHome: () => void;
  unreadCount?: number;
  isWeatherLoading?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocationName,
  onSelectCurrentLocation,
  onSearchSelectLocation,
  onSelectGeocodedLocation,
  onOpenNotifications,
  onNavigateHome,
  unreadCount = 2,
  isWeatherLoading = false,
}) => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [geocodingResults, setGeocodingResults] = useState<GeocodingResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search on input change
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) {
      setGeocodingResults([]);
      setIsSearching(false);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(false);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(async () => {
      try {
        const results = await searchLocation(trimmed, 6);
        setGeocodingResults(results);
      } catch (err) {
        console.warn('Geocoding search failed:', err);
        setGeocodingResults([]);
      } finally {
        setIsSearching(false);
        setHasSearched(true);
      }
    }, 280);

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchQuery]);

  // Curated dark sky reserves
  const matchingMockLocations = searchQuery.trim() === ''
    ? []
    : LOCATIONS_DATA.filter(loc =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.region.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const availableCities = [
    { name: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357 },
    { name: 'Alexandria, Egypt', lat: 31.2001, lng: 29.9187 },
    { name: 'Siwa, Egypt', lat: 29.2032, lng: 25.5195 },
    { name: 'Marsa Matruh, Egypt', lat: 31.3543, lng: 27.2373 },
    { name: 'Aswan, Egypt', lat: 24.0889, lng: 32.8998 },
    { name: 'Taba, Egypt', lat: 29.4925, lng: 34.8967 },
    { name: 'Wadi Rum, Jordan', lat: 29.5734, lng: 35.4206 },
  ];

  const handleSelectPreset = (city: { name: string; lat: number; lng: number }) => {
    onSelectCurrentLocation(city.name);
    const mockMatch = LOCATIONS_DATA.find(l => l.name.toLowerCase().includes(city.name.split(',')[0].toLowerCase()));
    if (mockMatch) {
      onSearchSelectLocation(mockMatch);
    } else {
      if (onSelectGeocodedLocation) {
        onSelectGeocodedLocation({
          id: Date.now(),
          name: city.name.split(',')[0],
          latitude: city.lat,
          longitude: city.lng,
          country: city.name.split(',')[1]?.trim() || 'Global',
          country_code: 'EG',
        });
      }
    }
    setIsLocationDropdownOpen(false);
  };

  const handleSelectGeocodedItem = (item: GeocodingResult) => {
    if (onSelectGeocodedLocation) {
      onSelectGeocodedLocation(item);
    }
    setSearchQuery('');
    setGeocodingResults([]);
    setIsSearchFocused(false);
  };

  return (
    <header
      className="h-16 px-4 lg:px-6 flex items-center justify-between gap-4 sticky top-0 z-20"
      style={{
        background: 'rgba(4, 8, 19, 0.92)',
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(56,189,248,0.04)',
      }}
    >
      {/* Left: Observer Reference Location Pill */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-100 transition-all cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(12,20,43,0.9) 0%, rgba(7,12,30,0.9) 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.3)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
            title="Switch observer ground station"
          >
            <div
              className="p-1.5 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(8,47,73,0.6)', border: '1px solid rgba(14,165,233,0.3)' }}
            >
              <MapPin className="w-3 h-3 text-sky-400" />
            </div>
            <div className="text-left">
              <div className="text-[9px] text-slate-500 font-mono uppercase tracking-widest leading-none">Observer Base</div>
              <span className="max-w-[140px] sm:max-w-none truncate block mt-0.5 text-white font-semibold">{currentLocationName}</span>
            </div>
            {isWeatherLoading ? (
              <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin ml-1" />
            ) : (
              <ChevronDown className="w-3 h-3 text-slate-500 ml-1" />
            )}
          </button>

          {isLocationDropdownOpen && (
            <div
              className="absolute top-full left-0 mt-2 w-64 rounded-2xl py-1.5 z-50 text-xs overflow-hidden animate-fade-in"
              style={{
                background: 'rgba(5,9,24,0.97)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(56,189,248,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 0 0.5px rgba(56,189,248,0.08)',
              }}
            >
              <div className="px-3.5 py-2.5 text-[9px] uppercase font-mono tracking-widest text-sky-400 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span>Astronomical Stations</span>
                <span className="text-slate-600">Open-Meteo</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {availableCities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => handleSelectPreset(city)}
                    className={`w-full text-left px-3.5 py-2.5 hover:bg-sky-950/40 hover:text-sky-300 transition-colors flex items-center justify-between ${
                      currentLocationName.includes(city.name.split(',')[0]) ? 'text-sky-300 font-semibold bg-sky-950/60 border-l-2 border-sky-400' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">{city.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
                      </div>
                    </div>
                    {currentLocationName.includes(city.name.split(',')[0]) && (
                      <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,1)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Live Geocoding Search */}
      <div className="relative flex-1 max-w-lg hidden md:block">
        <div className="relative group">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-sky-400 transition-colors pointer-events-none" />
          <input
            type="text"
            placeholder="Search site, city, or coordinates (Cairo, Siwa, Wadi Rum)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
            className="w-full rounded-xl pl-10 pr-9 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all font-sans"
            style={{
              background: 'rgba(6,9,26,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
            }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.4), 0 0 0 2px rgba(56,189,248,0.1)'; }}
            onBlur={(e) => { setTimeout(() => setIsSearchFocused(false), 250); (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.4)'; }}
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setGeocodingResults([]); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {isSearchFocused && searchQuery.trim().length >= 2 && (
          <div
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl py-2 z-50 max-h-84 overflow-y-auto animate-fade-in"
            style={{
              background: 'rgba(5,9,24,0.98)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(56,189,248,0.2)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.9)',
            }}
          >
            {isSearching && (
              <div className="px-4 py-3 text-xs text-slate-300 flex items-center gap-2.5">
                <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                <span>Interrogating satellite geocoding directory...</span>
              </div>
            )}

            {!isSearching && geocodingResults.length > 0 && (
              <div>
                <div className="px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-sky-400 border-b border-slate-800 flex items-center justify-between">
                  <span>Geocoded Satellite Targets</span>
                  <span className="text-slate-400">{geocodingResults.length} found</span>
                </div>
                {geocodingResults.map((item) => (
                  <button
                    key={`geo-${item.id}`}
                    onMouseDown={() => handleSelectGeocodedItem(item)}
                    className="w-full text-left px-3.5 py-2.5 hover:bg-sky-950/40 transition-colors flex items-center justify-between text-xs group border-b border-slate-900/60 last:border-b-0"
                  >
                    <div>
                      <div className="font-semibold text-slate-200 group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{item.name}</span>
                        {item.admin1 && (
                          <span className="text-slate-400 font-normal">({item.admin1})</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {item.country} • {item.latitude.toFixed(4)}°N, {item.longitude.toFixed(4)}°E
                        {item.elevation !== undefined && ` • ${item.elevation}m alt`}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-sky-950 text-sky-300 border border-sky-700/50 group-hover:bg-sky-900 transition-colors">
                      Track Site →
                    </span>
                  </button>
                ))}
              </div>
            )}

            {!isSearching && matchingMockLocations.length > 0 && (
              <div className="border-t border-slate-800/80 mt-1">
                <div className="px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                  <span>Certified Dark-Sky Sanctuaries</span>
                </div>
                {matchingMockLocations.map((loc) => (
                  <button
                    key={`mock-${loc.id}`}
                    onMouseDown={() => {
                      onSearchSelectLocation(loc);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3.5 py-2.5 hover:bg-slate-800/60 transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{loc.name}</div>
                      <div className="text-[10px] text-slate-400">{loc.region}, {loc.country} • Bortle Class {loc.bortleClass}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      loc.pollutionLevel === 'Low' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}>
                      {loc.pollutionLevel}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {!isSearching && hasSearched && geocodingResults.length === 0 && matchingMockLocations.length === 0 && (
              <div className="px-4 py-4 text-xs text-slate-400 text-center">
                <span>No celestial stations found matching your query.</span>
                <p className="text-[11px] text-slate-400 mt-1">Try searching major dark-sky sites like Siwa, Wadi Rum, Aswan, or Alexandria.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Actions, Live Telemetry Pulse & Profile */}
      <div className="flex items-center gap-2.5">
        {/* Landing Home button */}
        <button
          onClick={onNavigateHome}
          title="Return to Public Portal"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-all cursor-pointer"
          style={{ background: 'rgba(6,9,26,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'; }}
        >
          <Home className="w-3.5 h-3.5 text-slate-500" />
          <span>Portal</span>
        </button>

        {/* Notifications Icon with Glow Badge */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer"
          style={{ background: 'rgba(6,9,26,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.3)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'; }}
          title="Space Telemetry Alerts"
        >
          <Bell className="w-4 h-4 text-sky-400" />
          {unreadCount > 0 && (
            <span
              className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-sky-400 animate-ping"
              style={{ boxShadow: '0 0 8px rgba(56,189,248,1)' }}
            />
          )}
        </button>

        {/* User / Profile Area */}
        <div
          className="flex items-center gap-2.5 pl-2.5"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="relative">
            <div
              className="w-8 h-8 rounded-xl p-0.5"
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #4f46e5)',
                boxShadow: '0 0 12px rgba(14,165,233,0.35)',
              }}
            >
              <div
                className="w-full h-full rounded-[10px] flex items-center justify-center"
                style={{ background: 'rgba(5,9,24,0.95)' }}
              >
                <span className="text-xs font-black text-sky-300" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '10px' }}>AC</span>
              </div>
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2"
              style={{ borderColor: 'rgba(4,8,19,1)', boxShadow: '0 0 6px rgba(52,211,153,0.9)' }}
            />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-white tracking-tight leading-none font-telemetry">
              Alex Carter
            </div>
            <div className="text-[10px] text-sky-400 font-mono mt-0.5 leading-none">
              Mission Specialist
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
