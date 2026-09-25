import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Bell,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ScreenType } from '../types';
import { LOCATIONS } from '../data/mockData';

interface TopBarProps {
  currentLocationName: string;
  onSelectLocationByName: (name: string) => void;
  onSearch: (query: string) => void;
  onToggleNotifications: () => void;
  unreadCount: number;
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLocationName,
  onSelectLocationByName,
  onSearch,
  onToggleNotifications,
  unreadCount,
  currentScreen,
  onSelectScreen,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isScreenNavOpen, setIsScreenNavOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  const screens: { id: ScreenType; label: string }[] = [
    { id: 'overview', label: '1. Main Dashboard (Overview)' },
    { id: 'map', label: '2. Dedicated Light Pollution Map' },
    { id: 'locations', label: '3. Observation Locations' },
    { id: 'location-details', label: '4. Location Details' },
    { id: 'analytics', label: '5. Analytics & Comparison' },
    { id: 'methodology', label: '6. Data & Methodology' },
    { id: 'responsible-lighting', label: '7. Responsible Lighting' },
    { id: 'satellite-data', label: '8. Satellite Data Pipeline' },
    { id: 'how-it-works', label: '9. How Aero Clear Works' },
    { id: 'landing', label: '10. Public Landing Page' },
    { id: 'design-system', label: '• Design System Components' },
  ];

  return (
    <header
      id="topbar-navigation"
      className="h-16 bg-[#070D1E] border-b border-slate-800/80 backdrop-blur-md px-6 flex items-center justify-between z-20 shrink-0"
    >
      {/* Left: Location Selector Pill */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            id="location-selector-button"
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-700 hover:bg-slate-800/60 transition-all shadow-inner"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{currentLocationName || 'Cairo, Egypt'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {isLocationDropdownOpen && (
            <div className="absolute left-0 mt-2 w-56 rounded-xl bg-[#091224] border border-slate-800 shadow-2xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Select Base Coordinates
              </div>
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    onSelectLocationByName(loc.name);
                    setIsLocationDropdownOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    currentLocationName === loc.name
                      ? 'bg-slate-800 text-white font-medium border border-sky-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{loc.name}, {loc.country}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      loc.pollutionLevel === 'Low'
                        ? 'bg-blue-500/20 text-blue-300'
                        : loc.pollutionLevel === 'Moderate'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {loc.pollutionLevel}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hackathon Screen Switcher Quick Access */}
        <div className="relative hidden md:block">
          <button
            id="screen-selector-dropdown-btn"
            onClick={() => setIsScreenNavOpen(!isScreenNavOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-[11px] font-medium text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span className="truncate max-w-[140px] lg:max-w-none">
              View: {screens.find((s) => s.id === currentScreen)?.label.split(' ')[1] || 'Dashboard'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {isScreenNavOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl bg-[#091224] border border-slate-700 shadow-2xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-300 tracking-wider flex items-center justify-between">
                <span>Hackathon Screen Index</span>
                <Sparkles className="w-3 h-3 text-sky-400" />
              </div>
              {screens.map((scr) => (
                <button
                  key={scr.id}
                  onClick={() => {
                    onSelectScreen(scr.id);
                    setIsScreenNavOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center transition-colors text-[11px] ${
                    currentScreen === scr.id
                      ? 'bg-slate-800 text-white font-medium border border-sky-500/40'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  {scr.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: Search location field */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-6 hidden sm:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="topbar-search-input"
            type="text"
            placeholder="Search observation locations, coordinates, observatories..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              onSearch(e.target.value);
            }}
            className="w-full bg-[#050A17] border border-slate-800 text-xs text-slate-200 placeholder-slate-400 pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 transition-all font-sans"
          />
        </div>
      </form>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-3">
        {/* Notification Button */}
        <button
          id="notifications-button"
          onClick={onToggleNotifications}
          className="relative p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          title="Telemetry alerts & satellite pass notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[#0B0F19]">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User / Profile Area */}
        <div
          id="user-profile-badge"
          className="flex items-center gap-3 pl-2 border-l border-slate-800"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-700 via-slate-800 to-sky-900 border border-slate-600 p-0.5 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Alex Carter"
                className="w-full h-full rounded-[6px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0F19]" />
          </div>

          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-white tracking-tight">Alex Carter</div>
            <div className="text-[10px] text-slate-400 font-medium">Space Explorer</div>
          </div>
        </div>
      </div>
    </header>
  );
};
