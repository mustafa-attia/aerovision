import React, { useState, useEffect } from 'react';
import {
  Compass,
  Radio,
  ArrowRight,
  Database,
  Cpu,
  MapPin,
  Telescope,
  Sparkles,
  ChevronRight,
  Activity,
  Globe,
  Star,
  Menu,
  X
} from 'lucide-react';
import { ScreenType } from '../../types';


interface LandingPageProps {
  onNavigate: (screen: ScreenType) => void;
  onExploreSky?: () => void;
}

/* Small animated star component */
const StarParticle: React.FC<{ x: number; y: number; size: number; delay: number; color: string }> = ({
  x, y, size, delay, color
}) => (
  <div
    className="absolute rounded-full star pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      '--duration': `${2 + Math.random() * 3}s`,
      '--delay': `${delay}s`,
      boxShadow: `0 0 ${size * 2}px ${color}`,
    } as React.CSSProperties}
  />
);

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 0.8 + Math.random() * 1.6,
  delay: Math.random() * 4,
  color: ['#ffffff', '#bae6fd', '#c4b5fd', '#a5f3fc'][Math.floor(Math.random() * 4)],
}));

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onExploreSky }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleExplore = () => {
    if (onExploreSky) onExploreSky();
    else onNavigate('overview');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 flex flex-col select-none overflow-x-hidden relative">

      {/* ── Star Field ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {STARS.map((s) => <StarParticle key={s.id} {...s} />)}
        {/* Large nebula glows */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-sky-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[400px] bg-violet-600/7 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* ── Header / Navigation ── */}
      <header
        className={`sticky top-0 z-50 px-6 lg:px-12 h-18 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-[#020408]/90 backdrop-blur-3xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
            : 'bg-transparent'
        }`}
        style={{ height: '4.5rem' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3.5 relative z-10">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center relative shrink-0"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #4f46e5)',
              boxShadow: '0 0 20px rgba(14,165,233,0.45), 0 0 40px rgba(99,102,241,0.2)',
            }}
          >
            <Radio className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-2xl border border-sky-400/30" />
          </div>
          <div>
            <div className="font-black text-lg tracking-widest text-white uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.12em' }}
            >
              AERO<span className="text-sky-400"> CLEAR</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-wider">
              Orbital Telemetry Platform
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {[
            { label: 'Dashboard', screen: 'overview' as ScreenType },
            { label: 'Pollution Map', screen: 'map' as ScreenType },
            { label: 'Architecture', screen: 'how-it-works' as ScreenType },
            { label: 'Satellite Data', screen: 'satellite-data' as ScreenType },
            { label: 'Analytics', screen: 'analytics' as ScreenType },
          ].map(({ label, screen }) => (
            <button
              key={screen}
              onClick={() => onNavigate(screen)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* CTA Group */}
        <div className="hidden lg:flex items-center gap-3 relative z-10">
          <button
            onClick={handleExplore}
            className="btn-primary text-sm"
            id="header-launch-btn"
          >
            <Sparkles className="w-4 h-4" />
            Launch Console
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer relative z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[4.5rem] z-40 glass-panel-elevated border-t border-white/5 animate-fade-in">
          <div className="p-4 space-y-1">
            {[
              { label: 'Mission Dashboard', screen: 'overview' as ScreenType },
              { label: 'Light Pollution Map', screen: 'map' as ScreenType },
              { label: 'Architecture', screen: 'how-it-works' as ScreenType },
              { label: 'Satellite Data', screen: 'satellite-data' as ScreenType },
              { label: 'Analytics', screen: 'analytics' as ScreenType },
            ].map(({ label, screen }) => (
              <button
                key={screen}
                onClick={() => { onNavigate(screen); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {label}
              </button>
            ))}
            <button
              onClick={handleExplore}
              className="btn-primary w-full justify-center mt-3"
            >
              <Sparkles className="w-4 h-4" />
              Launch Console
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* HERO SECTION */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 flex-1 flex items-center px-6 lg:px-16 pt-12 pb-24 min-h-[92vh]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Hero Copy */}
          <div className="space-y-8 animate-slide-up">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              <span className="text-xs font-mono font-bold text-sky-300 tracking-widest uppercase">
                Live · NOAA-20 / VIIRS Constellation
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                CLEANER
                <br />
                <span className="shimmer-text">SKIES.</span>
                <br />
                <span className="text-slate-300">BRIGHTER</span>
                <br />
                <span
                  className="text-transparent"
                  style={{
                    background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                  }}
                >
                  DISCOVERIES.
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg">
              Aero Clear fuses{' '}
              <span className="text-sky-300 font-semibold">NASA Black Marble satellite radiance</span>
              {' '}feeds with{' '}
              <span className="text-indigo-300 font-semibold">real-time Open-Meteo</span>
              {' '}atmospheric optics, guiding astronomers to pristine dark sky corridors and optimal observation windows.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="hero-launch-btn"
                onClick={handleExplore}
                className="btn-primary text-sm px-7 py-3.5"
              >
                <Compass className="w-4.5 h-4.5" />
                Launch Mission Console
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              <button
                id="hero-architecture-btn"
                onClick={() => onNavigate('how-it-works')}
                className="btn-secondary text-sm px-6 py-3.5"
              >
                Mission Architecture
                <ChevronRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>

            {/* Live status strip */}
            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                <span>NOAA-20 / VIIRS Active</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.9)]" />
                <span>Bortle 1–9 Grid Calibrated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.9)]" />
                <span>Open-Meteo Real-Time Sync</span>
              </div>
            </div>
          </div>

          {/* RIGHT: 3D Globe Visual */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-[480px] h-[480px]">

              {/* Outer orbit rings */}
              <div
                className="absolute inset-0 rounded-full border border-sky-500/20 animate-orbit-slow"
                style={{ transform: 'rotateX(75deg) rotateZ(0deg)', transformStyle: 'preserve-3d' }}
              />
              <div
                className="absolute inset-[-20px] rounded-full border border-indigo-500/15 animate-orbit"
                style={{ transform: 'rotateX(65deg) rotateZ(30deg)', transformStyle: 'preserve-3d' }}
              />

              {/* Core globe */}
              <div
                className="absolute inset-[60px] rounded-full overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #0c1a3a 0%, #050811 60%, #02050e 100%)',
                  boxShadow: '0 0 80px rgba(14,165,233,0.35), 0 0 160px rgba(99,102,241,0.15), inset 0 0 80px rgba(56,189,248,0.05)',
                  border: '1px solid rgba(56,189,248,0.25)',
                }}
              >
                {/* Night lights heatmap */}
                <div className="absolute w-48 h-36 top-4 right-6 bg-amber-500/50 blur-3xl rounded-full animate-pulse-subtle" />
                <div className="absolute w-32 h-24 top-20 left-8 bg-yellow-500/40 blur-2xl rounded-full" />
                <div className="absolute w-40 h-32 bottom-8 right-10 bg-sky-400/40 blur-3xl rounded-full" />
                <div className="absolute w-24 h-20 bottom-16 left-16 bg-cyan-400/30 blur-2xl rounded-full" />
                {/* Atmospheric rim */}
                <div className="absolute inset-0 rounded-full border-[8px] border-sky-400/20 blur-[3px]" />
                <div className="absolute inset-0 rounded-full border-[20px] border-blue-500/10 blur-[8px]" />
                {/* Land masses suggestion */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    background: `
                      radial-gradient(ellipse 30% 15% at 25% 40%, rgba(34,197,94,0.3) 0, transparent 100%),
                      radial-gradient(ellipse 25% 20% at 65% 55%, rgba(34,197,94,0.2) 0, transparent 100%),
                      radial-gradient(ellipse 20% 12% at 45% 30%, rgba(34,197,94,0.25) 0, transparent 100%)
                    `,
                  }}
                />
              </div>

              {/* Orbiting Satellite Chip */}
              <div
                className="absolute top-10 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold text-sky-200 shadow-lg animate-float"
                style={{
                  background: 'rgba(6,9,26,0.9)',
                  border: '1px solid rgba(56,189,248,0.4)',
                  boxShadow: '0 0 16px rgba(56,189,248,0.2)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                VIIRS · NOAA-20
              </div>

              {/* Quality Score floating chip */}
              <div
                className="absolute bottom-16 left-4 px-3 py-2 rounded-xl text-xs font-mono shadow-lg"
                style={{
                  background: 'rgba(6,9,26,0.9)',
                  border: '1px solid rgba(52,211,153,0.35)',
                  boxShadow: '0 0 16px rgba(52,211,153,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Observation Score</div>
                <div className="text-xl font-black text-emerald-400 font-telemetry">9.4 <span className="text-xs text-slate-500">/10</span></div>
              </div>

              {/* Bortle class chip */}
              <div
                className="absolute bottom-10 right-6 px-3 py-2 rounded-xl text-xs font-mono shadow-lg"
                style={{
                  background: 'rgba(6,9,26,0.9)',
                  border: '1px solid rgba(139,92,246,0.35)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Bortle Class</div>
                <div className="text-base font-black text-violet-300 font-telemetry">1 — Pristine</div>
              </div>

              {/* Center planet label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-sky-400 opacity-70">
                    Nocturnal Survey
                  </div>
                  <div
                    className="text-lg font-black text-white tracking-wider mt-0.5 opacity-60"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    EARTH AT NIGHT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Scroll</div>
          <div className="w-px h-10 bg-gradient-to-b from-sky-500 to-transparent" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* DARK SKY CORRIDORS STRIP */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 section-divider" />
      <section className="relative z-10 px-6 lg:px-16 py-6 bg-[#020408]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-widest shrink-0">
            <Telescope className="w-3.5 h-3.5 text-sky-400" />
            <span>Featured Dark Sky Corridors</span>
          </div>
          <div className="flex-1 flex flex-wrap items-center gap-2">
            {[
              { name: 'Siwa Oasis, Egypt', bortle: '2', quality: '9.4' },
              { name: 'Wadi Rum, Jordan', bortle: '1', quality: '9.8' },
              { name: 'Saint Catherine, Sinai', bortle: '2', quality: '9.1' },
              { name: 'White Desert, Egypt', bortle: '1', quality: '9.7' },
            ].map((site) => (
              <button
                key={site.name}
                onClick={handleExplore}
                className="group flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs cursor-pointer transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: 'rgba(10,16,36,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.35)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(14,165,233,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <span className="font-semibold text-white">{site.name}</span>
                <span className="font-mono text-sky-400 text-[10px]">Bortle {site.bortle}</span>
                <span
                  className="px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold"
                  style={{ background: 'rgba(6,78,59,0.5)', border: '1px solid rgba(52,211,153,0.3)', color: '#6ee7b7' }}
                >
                  {site.quality}/10
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className="relative z-10 section-divider" />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* PROBLEM & SOLUTION */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 lg:px-16 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Problem */}
          <div
            className="group p-8 rounded-3xl relative overflow-hidden transition-all duration-500 cursor-default"
            style={{
              background: 'linear-gradient(135deg, rgba(15,5,5,0.9) 0%, rgba(10,9,26,0.85) 100%)',
              border: '1px solid rgba(251,113,133,0.12)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(251,113,133,0.35)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 60px rgba(239,68,68,0.12)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(251,113,133,0.12)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div className="absolute top-0 right-0 w-56 h-56 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(127,29,29,0.5)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  boxShadow: '0 0 16px rgba(239,68,68,0.2)',
                }}
              >
                <Activity className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest mb-2">The Crisis</div>
                <h2
                  className="text-2xl font-black text-white tracking-tight mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.4rem' }}
                >
                  ACCELERATING SKYGLOW
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Artificial light at night (ALAN) washes out the stars, disrupts nocturnal ecosystems, and limits humanity's view of the cosmos. Over{' '}
                  <span className="text-rose-300 font-semibold">80% of the global population</span>{' '}
                  lives under heavily light-polluted skies — the Milky Way is now invisible to them.
                </p>
              </div>
              <div className="h-44 rounded-2xl overflow-hidden relative border border-rose-900/40">
                <img
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80"
                  alt="City light pollution washing night sky"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0505]/95 via-[#0f0505]/40 to-transparent" />
                <span
                  className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold text-rose-200"
                  style={{ background: 'rgba(127,29,29,0.9)', border: '1px solid rgba(239,68,68,0.4)' }}
                >
                  Urban Skyglow: Bortle Class 8–9
                </span>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div
            className="group p-8 rounded-3xl relative overflow-hidden transition-all duration-500 cursor-default"
            style={{
              background: 'linear-gradient(135deg, rgba(3,12,30,0.9) 0%, rgba(5,9,26,0.85) 100%)',
              border: '1px solid rgba(56,189,248,0.12)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.35)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 60px rgba(14,165,233,0.12)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.12)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div className="absolute top-0 right-0 w-56 h-56 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(8,47,73,0.6)',
                  border: '1px solid rgba(14,165,233,0.3)',
                  boxShadow: '0 0 16px rgba(14,165,233,0.2)',
                }}
              >
                <Telescope className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-2">The Solution</div>
                <h2
                  className="text-2xl font-black text-white tracking-tight mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.4rem' }}
                >
                  PRECISION OBSERVATION
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  By fusing{' '}
                  <span className="text-sky-300 font-semibold">NASA Black Marble satellite radiance</span>{' '}
                  feeds with high-resolution{' '}
                  <span className="text-indigo-300 font-semibold">Open-Meteo atmospheric optics</span>{' '}
                  forecasts, Aero Clear charts pristine dark sky corridors and guides observers to optimal discovery windows.
                </p>
              </div>
              <div className="h-44 rounded-2xl overflow-hidden relative border border-sky-900/40">
                <img
                  src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80"
                  alt="Pristine starry night sky Milky Way"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030c1e]/95 via-[#030c1e]/40 to-transparent" />
                <span
                  className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold text-sky-200"
                  style={{ background: 'rgba(8,47,73,0.9)', border: '1px solid rgba(14,165,233,0.4)' }}
                >
                  Dark-Sky Reserve: Bortle Class 1–2
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* HOW IT WORKS — 3-STEP PIPELINE */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 lg:px-16 py-24 bg-[#020408]/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/25 bg-sky-500/5 text-[11px] font-mono font-bold text-sky-400 uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5" />
              Scientific Pipeline
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black text-white"
              style={{ fontFamily: "'Orbitron', sans-serif' " }}
            >
              END-TO-END
              <br />
              <span className="shimmer-text">TELEMETRY ARCHITECTURE</span>
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
              A high-precision pipeline translating raw Earth observation satellites into actionable astronomical intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector lines on desktop */}
            <div className="hidden md:block absolute top-[3.5rem] left-1/3 right-1/3 h-px z-0"
              style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.4), rgba(99,102,241,0.4), rgba(52,211,153,0.4))' }}
            />

            {[
              {
                phase: '01', color: 'sky', Icon: Database,
                title: 'SATELLITE INGESTION',
                desc: 'Ingest calibrated multispectral feeds: VIIRS Day/Night Band radiance, MODIS cloud fractions, and digital surface elevation models to map nocturnal skyglow at 750-meter resolution.',
                iconBg: 'rgba(8,47,73,0.6)', iconBorder: 'rgba(14,165,233,0.3)', iconShadow: 'rgba(14,165,233,0.2)',
                iconColor: 'text-sky-400', textColor: 'text-sky-400', hoverBorder: 'rgba(56,189,248,0.35)',
              },
              {
                phase: '02', color: 'indigo', Icon: Cpu,
                title: 'OPTICAL SYNTHESIS',
                desc: 'Process real-time atmospheric optics: cloud ceiling, atmospheric visibility, relative humidity, wind, and seeing conditions to calculate the multi-dimensional Observation Quality Score.',
                iconBg: 'rgba(49,46,129,0.4)', iconBorder: 'rgba(99,102,241,0.3)', iconShadow: 'rgba(99,102,241,0.2)',
                iconColor: 'text-indigo-400', textColor: 'text-indigo-400', hoverBorder: 'rgba(99,102,241,0.35)',
              },
              {
                phase: '03', color: 'emerald', Icon: MapPin,
                title: 'SANCTUARY DISCOVERY',
                desc: 'Identify prime observation windows, pinpoint dark sky corridors with terrain shielding, and recommend optimal celestial targets for deep-sky astrophotography.',
                iconBg: 'rgba(6,78,59,0.4)', iconBorder: 'rgba(52,211,153,0.3)', iconShadow: 'rgba(52,211,153,0.2)',
                iconColor: 'text-emerald-400', textColor: 'text-emerald-400', hoverBorder: 'rgba(52,211,153,0.35)',
              },
            ].map(({ phase, Icon, title, desc, iconBg, iconBorder, iconShadow, iconColor, textColor, hoverBorder }, i) => (
              <div
                key={phase}
                className="relative z-10 p-8 rounded-3xl transition-all duration-400 cursor-default"
                style={{
                  background: 'linear-gradient(135deg, rgba(10,16,36,0.92) 0%, rgba(6,9,26,0.88) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = hoverBorder;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.5)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.06)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: iconBg, border: `1px solid ${iconBorder}`, boxShadow: `0 0 16px ${iconShadow}` }}
                >
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                </div>
                <div className={`text-xs font-mono font-bold uppercase tracking-widest mb-2 ${textColor}`}>
                  Phase {phase}
                </div>
                <h3
                  className="text-lg font-black text-white mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1rem' }}
                >
                  {i + 1}. {title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* STATS SECTION */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 lg:px-16 py-24">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative p-10 rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(8,14,38,0.95) 0%, rgba(10,16,46,0.90) 50%, rgba(8,14,38,0.95) 100%)',
              border: '1px solid rgba(56,189,248,0.18)',
              boxShadow: '0 0 80px rgba(14,165,233,0.06), 0 40px 80px rgba(0,0,0,0.5)',
            }}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/6 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/6 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-10">
              <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                Platform Observability Matrix
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
              {[
                { value: '2.5M+', label: 'km² Surface Area Modeled', color: 'text-white' },
                { value: '150+', label: 'Certified Dark Sky Sites', color: 'text-sky-400' },
                { value: '85%', label: 'Seeing Quality Improvement', color: 'text-emerald-400' },
                { value: '5+', label: 'Live Space Telemetry Feeds', color: 'text-violet-400' },
              ].map(({ value, label, color }) => (
                <div key={label} className="space-y-2">
                  <div
                    className={`text-5xl sm:text-6xl font-black ${color}`}
                    style={{ fontFamily: "'Orbitron', sans-serif", lineHeight: 1 }}
                  >
                    {value}
                  </div>
                  <div className="text-sm text-slate-400 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* CTA SECTION */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 lg:px-16 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/5 text-xs font-mono text-violet-300 uppercase tracking-widest">
            <Star className="w-3.5 h-3.5" />
            Ready to Explore?
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            FIND YOUR PERFECT
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #818cf8, #c084fc)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              DARK SKY WINDOW
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Join astronomers, astrophotographers, and dark sky advocates using real-time satellite telemetry to find pristine observation sites.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              id="cta-launch-btn"
              onClick={handleExplore}
              className="btn-primary text-base px-8 py-4"
            >
              <Compass className="w-5 h-5" />
              Launch Mission Console
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="btn-secondary text-base px-8 py-4"
            >
              <Globe className="w-5 h-5" />
              Explore Pollution Map
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* FOOTER */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 section-divider" />
      <footer className="relative z-10 px-6 lg:px-16 py-10 bg-[#020408]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 0 16px rgba(14,165,233,0.35)' }}
            >
              <Radio className="w-4 h-4 text-white" />
            </div>
            <div>
              <div
                className="font-black text-white text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                AERO CLEAR
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                Space Observation Intelligence
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            {[
              { label: 'Dashboard', screen: 'overview' as ScreenType },
              { label: 'Pollution Map', screen: 'map' as ScreenType },
              { label: 'Data Pipeline', screen: 'satellite-data' as ScreenType },
              { label: 'Documentation', screen: 'how-it-works' as ScreenType },
              { label: 'Analytics', screen: 'analytics' as ScreenType },
            ].map(({ label, screen }) => (
              <button
                key={screen}
                onClick={() => onNavigate(screen)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="text-[11px] font-mono text-slate-500 text-center sm:text-right">
            © 2026 Aero Clear.
            <br />
            Space Observation Hackathon Prototype.
          </div>
        </div>
      </footer>
    </div>
  );
};
