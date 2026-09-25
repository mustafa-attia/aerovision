import React from 'react';
import {
  Orbit,
  LayoutDashboard,
  Map,
  Compass,
  Satellite,
  BarChart3,
  HelpCircle,
  Layers,
  ExternalLink,
  Database,
  Lightbulb,
  Radio,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ScreenType } from '../../types';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  collapsed?: boolean;
}

const NAV_ITEMS = [
  { id: 'overview', label: 'Mission Overview', badge: 'LIVE', icon: LayoutDashboard, badgeColor: 'emerald' },
  { id: 'map', label: 'Light Pollution Map', badge: 'VIIRS', icon: Map, badgeColor: 'sky' },
  { id: 'locations', label: 'Dark Sky Corridors', badge: 'GPS', icon: Compass, badgeColor: 'sky' },
  { id: 'satellite', label: 'Satellite Telemetry', badge: 'ORBIT', icon: Satellite, badgeColor: 'violet' },
  { id: 'analytics', label: 'Atmos. Analytics', icon: BarChart3 },
  { id: 'methodology', label: 'Data & Methodology', icon: Database },
  { id: 'responsible-lighting', label: 'Responsible Lighting', icon: Lightbulb },
  { id: 'how-it-works', label: 'Architecture', icon: HelpCircle },
  { id: 'design-system', label: 'UI Design System', icon: Layers },
] as const;

const BADGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  emerald: {
    bg: 'rgba(6,78,59,0.5)',
    text: '#6ee7b7',
    border: 'rgba(52,211,153,0.35)',
  },
  sky: {
    bg: 'rgba(8,47,73,0.5)',
    text: '#7dd3fc',
    border: 'rgba(56,189,248,0.35)',
  },
  violet: {
    bg: 'rgba(91,33,182,0.3)',
    text: '#c4b5fd',
    border: 'rgba(167,139,250,0.35)',
  },
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  collapsed = false
}) => {
  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col justify-between z-30 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      style={{
        background: 'linear-gradient(180deg, rgba(4,8,19,0.98) 0%, rgba(5,9,24,0.98) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '4px 0 32px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* ── Logo / Brand ── */}
      <div>
        <div
          onClick={() => onNavigate('landing')}
          className="h-16 flex items-center gap-3 px-4 cursor-pointer transition-all group overflow-hidden relative"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          {/* Logo glow */}
          <div className="absolute inset-0 bg-sky-500/3 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Icon */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #4f46e5)',
              boxShadow: '0 0 16px rgba(14,165,233,0.4), 0 0 32px rgba(99,102,241,0.2)',
            }}
          >
            <Orbit className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-500" />
          </div>

          {!collapsed && (
            <div className="overflow-hidden">
              <div
                className="font-black text-sm text-white uppercase tracking-widest"
                style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.12em' }}
              >
                AERO<span className="text-sky-400"> CLEAR</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                  style={{ boxShadow: '0 0 6px rgba(52,211,153,0.9)' }}
                />
                <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                  Orbital Telemetry
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        <div className="py-4 px-2 space-y-0.5">
          {!collapsed && (
            <div className="px-3 pb-3 text-[9px] font-mono uppercase tracking-[0.2em] text-slate-600 font-bold">
              Navigation Console
            </div>
          )}

          {NAV_ITEMS.map(({ id, label, badge, icon: Icon, badgeColor }) => {
            const isActive =
              currentScreen === id ||
              (id === 'locations' && currentScreen === 'location-details');

            return (
              <button
                key={id}
                onClick={() => onNavigate(id as ScreenType)}
                title={collapsed ? label : undefined}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer relative group ${
                  isActive ? 'nav-item-active' : 'nav-item'
                }`}
              >
                {/* Active indicator line */}
                {isActive && (
                  <span className="sidebar-active-indicator" />
                )}

                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-all duration-200 ${
                      isActive
                        ? 'text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]'
                        : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-110'
                    }`}
                  />
                  {!collapsed && (
                    <span className={`truncate tracking-wide ${isActive ? 'text-white font-semibold' : ''}`}>
                      {label}
                    </span>
                  )}
                </div>

                {!collapsed && badge && (() => {
                  const bc = BADGE_COLORS[(badgeColor as string) || 'sky'];
                  return (
                    <span
                      className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wider shrink-0"
                      style={{
                        background: isActive ? bc.bg : 'rgba(255,255,255,0.03)',
                        color: isActive ? bc.text : '#475569',
                        border: `1px solid ${isActive ? bc.border : 'rgba(255,255,255,0.05)'}`,
                      }}
                    >
                      {badge}
                    </span>
                  );
                })()}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className="p-3 space-y-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(2,4,9,0.5)' }}
      >
        <button
          onClick={() => onNavigate('landing')}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          {!collapsed && <span className="font-medium">Landing Portal</span>}
        </button>

        {/* Telemetry sync pill */}
        {!collapsed && (
          <div
            className="rounded-xl p-3 relative overflow-hidden"
            style={{
              background: 'rgba(3,7,18,0.8)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-slate-600">
                Telemetry Sync
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                style={{ boxShadow: '0 0 6px rgba(52,211,153,0.9)' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold text-emerald-400">
                NOAA-20 / VIIRS
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                99.8% READY
              </span>
            </div>
            <div
              className="mt-2 h-1 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: '99.8%',
                  background: 'linear-gradient(90deg, #34d399, #38bdf8)',
                  boxShadow: '0 0 8px rgba(52,211,153,0.5)',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
