import React from 'react';
import {
  Compass,
  Map as MapIcon,
  MapPin,
  Satellite,
  BarChart3,
  HelpCircle,
  Settings,
  Layers,
  Sparkles,
  ArrowLeft,
  Radio,
} from 'lucide-react';
import { ScreenType } from '../types';

interface SidebarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  onOpenSettings?: () => void;
  onOpenAbout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenSettings,
  onOpenAbout,
}) => {
  const navItems = [
    { id: 'overview' as ScreenType, label: 'Overview', icon: Compass },
    { id: 'map' as ScreenType, label: 'Light Pollution Map', icon: MapIcon },
    { id: 'locations' as ScreenType, label: 'Observation Locations', icon: MapPin },
    { id: 'satellite-data' as ScreenType, label: 'Satellite Data', icon: Satellite },
    { id: 'analytics' as ScreenType, label: 'Analytics', icon: BarChart3 },
    { id: 'how-it-works' as ScreenType, label: 'How It Works', icon: HelpCircle },
    { id: 'design-system' as ScreenType, label: 'Design System', icon: Layers },
  ];

  return (
    <aside
      id="sidebar-navigation"
      className="w-64 bg-[#0B0F19]/90 border-r border-slate-800/80 backdrop-blur-md flex flex-col h-full select-none z-30 shrink-0 transition-all duration-300"
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/60 flex items-center justify-between">
        <button
          onClick={() => onSelectScreen('landing')}
          className="flex items-center gap-3 text-left group transition-all"
          title="Go to Aero Clear Landing Page"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 ring-1 ring-sky-400/30 group-hover:scale-105 transition-transform">
            <Radio className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-sky-300 transition-colors font-['Plus_Jakarta_Sans']">
                Aero Clear
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-slate-700/80">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Space Observation Platform
            </p>
          </div>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Mission Control
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onSelectScreen(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600/30 to-blue-600/20 text-white border border-sky-500/40 shadow-sm shadow-sky-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-300'
                }`}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#a855f7]" />
              )}
            </button>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Preferences & Docs
        </div>
        <button
          onClick={onOpenAbout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-slate-400" />
          <span>About Project</span>
        </button>
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </button>
      </div>

      {/* Return to Public Landing Page Button */}
      <div className="p-3 border-t border-slate-800/60 space-y-2">
        <button
          onClick={() => onSelectScreen('landing')}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Landing Page</span>
        </button>

        {/* Satellite Telemetry Status Badge */}
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </div>
          <div className="truncate">
            <span className="text-slate-200 font-medium">VIIRS-DNB:</span> Synced
          </div>
          <span className="ml-auto text-[10px] text-slate-400 font-mono">0.02s</span>
        </div>
      </div>
    </aside>
  );
};
