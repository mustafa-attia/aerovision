import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Download,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { LocationObservation } from '../../types';
import { LOCATIONS } from '../../data/mockData';
import { PollutionBadge, AerospaceButton } from '../common/UIComponents';

interface AnalyticsPageProps {
  onSelectLocation?: (loc: LocationObservation) => void;
  onNavigateToDetails?: (locId: string) => void;
  onSelectLocationForDetails?: (loc: LocationObservation) => void;
  onNavigate?: (screen: any) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  onSelectLocation,
  onNavigateToDetails,
  onSelectLocationForDetails,
  onNavigate,
}) => {
  const [dateRange, setDateRange] = useState('Apr 1, 2026 - Apr 30, 2026');
  const [exportNotice, setExportNotice] = useState(false);

  const handleSelect = (loc: LocationObservation) => {
    if (onSelectLocationForDetails) {
      onSelectLocationForDetails(loc);
    } else {
      onSelectLocation?.(loc);
      onNavigateToDetails?.(loc.id);
    }
  };

  const handleExport = () => {
    setExportNotice(true);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Location,Country,Pollution Level,Pollution Score,Visibility Score,Cloud Cover,Quality Score,Bortle Class']
        .concat(
          LOCATIONS.map(
            (l) =>
              `"${l.name}","${l.country}","${l.pollutionLevel}",${l.pollutionScore},${l.visibilityScore},${l.cloudCoverage}%,${l.qualityScore},${l.bortleClass}`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'AeroClear_Observation_Analytics_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 p-4 lg:p-6 max-w-7xl mx-auto text-slate-200">
      {/* Analytics Toolbar */}
      <div className="p-6 rounded-3xl bg-[#060c1e]/90 backdrop-blur-2xl border border-sky-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-telemetry flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-sky-400" />
            <span>LIGHT POLLUTION & ATMOSPHERIC ANALYTICS</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Calibrated satellite telemetry across international observation corridors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#091124] border border-slate-700/80 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Apr 1, 2026 - Apr 30, 2026" className="bg-[#091124]">April 2026 (Full Month)</option>
              <option value="Last 7 Days" className="bg-[#091124]">Last 7 Days (Near-Realtime)</option>
              <option value="Year-to-Date" className="bg-[#091124]">2026 Year-to-Date</option>
            </select>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(14,165,233,0.35)] cursor-pointer"
          >
            {exportNotice ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Exported!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-sky-200" />
                <span>Export Telemetry</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Row 1: Light Pollution Over Time Line Chart + Radial Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Multi-Line Chart: Light Pollution Over Time */}
        <div className="lg:col-span-6 xl:col-span-7 p-6 rounded-3xl bg-[#060c1e]/90 backdrop-blur-2xl border border-sky-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-telemetry tracking-wide">
                ZENITH SKY RADIANCE TRENDS
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Zenith artificial sky radiance (nW/cm²/sr) across regional observation sites
              </p>
            </div>

            {/* Legend Indicators */}
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 text-purple-300">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.8)]" />
                <span>Taba</span>
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
                <span>Wadi Rum</span>
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                <span>Cairo Metro</span>
              </span>
            </div>
          </div>

          {/* SVG Line Graph with glowing strokes */}
          <div className="h-56 w-full pt-3">
            <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
              <defs>
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Horizontal Reference Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="0.8" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="0.8" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="0.8" />

              {/* Cairo High Line (Red) */}
              <path
                d="M 20 40 Q 120 45 220 38 T 480 35"
                fill="none"
                stroke="#F43F5E"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                filter="url(#glow-red)"
              />

              {/* Taba Low Line (Purple) */}
              <path
                d="M 20 145 Q 120 148 220 142 T 480 140"
                fill="none"
                stroke="#C084FC"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Wadi Rum Ultra Low Line (Cyan) */}
              <path
                d="M 20 155 Q 120 152 220 156 T 480 153"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#glow-cyan)"
              />

              {/* X-Axis Dates */}
              <text x="20" y="175" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono" textAnchor="start">Apr 1</text>
              <text x="140" y="175" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Apr 7</text>
              <text x="260" y="175" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Apr 14</text>
              <text x="380" y="175" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Apr 21</text>
              <text x="480" y="175" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono" textAnchor="end">Apr 30</text>
            </svg>
          </div>
        </div>

        {/* Gauge 1: Sky Visibility Donut */}
        <div className="lg:col-span-3 xl:col-span-2.5 p-6 rounded-3xl bg-[#060c1e]/90 backdrop-blur-2xl border border-sky-500/30 shadow-xl flex flex-col justify-between">
          <div className="text-xs font-bold text-white uppercase tracking-wider text-slate-400 font-mono">
            Optical Transparency
          </div>

          <div className="relative w-36 h-36 mx-auto my-3 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#0F172A" strokeWidth="12" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#38BDF8"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="60"
                strokeLinecap="round"
                fill="none"
                className="drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-extrabold text-white font-telemetry">76%</span>
              <span className="block text-[10px] text-sky-400 font-mono font-bold">Optimal Seeing</span>
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Superb</span>
              </span>
              <span className="text-white font-bold">48%</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>Good</span>
              </span>
              <span className="text-white font-bold">28%</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span>Moderate</span>
              </span>
              <span className="text-white font-bold">24%</span>
            </div>
          </div>
        </div>

        {/* Gauge 2: Cloud Coverage Donut */}
        <div className="lg:col-span-3 xl:col-span-2.5 p-6 rounded-3xl bg-[#060c1e]/90 backdrop-blur-2xl border border-sky-500/30 shadow-xl flex flex-col justify-between">
          <div className="text-xs font-bold text-white uppercase tracking-wider text-slate-400 font-mono">
            Cloud Cover Fraction
          </div>

          <div className="relative w-36 h-36 mx-auto my-3 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#0F172A" strokeWidth="12" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#34D399"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="190"
                strokeLinecap="round"
                fill="none"
                className="drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-extrabold text-white font-telemetry">24%</span>
              <span className="block text-[10px] text-emerald-400 font-mono font-bold">Clear Ceiling</span>
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Clear Sky</span>
              </span>
              <span className="text-white font-bold">70%</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                <span>Partly Cloudy</span>
              </span>
              <span className="text-white font-bold">18%</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span>Overcast</span>
              </span>
              <span className="text-white font-bold">12%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Observation Quality Bar Chart + Location Comparison Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Observation Quality Bar Chart */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#060c1e]/90 backdrop-blur-2xl border border-sky-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-telemetry tracking-wide">
                OBSERVATION QUALITY COMPARISON
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Atmospheric clarity index / 10</p>
            </div>
            <span className="text-xs font-mono text-sky-400 font-bold bg-sky-950/80 px-2 py-0.5 rounded-lg border border-sky-500/40">
              MAX 10.0
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="space-y-3.5 pt-2">
            {[
              { name: 'Taba, Egypt', score: 9.1, color: 'bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.6)]' },
              { name: 'Wadi Rum, Jordan', score: 9.4, color: 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]' },
              { name: 'Al Wakan, Egypt', score: 8.2, color: 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]' },
              { name: 'Big Bend, USA', score: 9.3, color: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]' },
              { name: 'Cairo Metropolitan', score: 3.1, color: 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]' },
            ].map((bar, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">{bar.name}</span>
                  <span className="font-mono font-bold text-white">{bar.score} / 10</span>
                </div>
                <div className="w-full bg-[#091124] h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`${bar.color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${bar.score * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Comparison Table */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#060c1e]/90 backdrop-blur-2xl border border-sky-500/30 shadow-xl space-y-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-telemetry tracking-wide">
              GROUND STATION OBSERVATION MATRIX
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">NOAA / Open-Meteo Verified</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#091124] text-[10px] uppercase font-mono font-bold text-sky-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Light Pollution</th>
                  <th className="py-3 px-3">Visibility</th>
                  <th className="py-3 px-3">Cloud Coverage</th>
                  <th className="py-3 px-3">Quality</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {LOCATIONS.slice(0, 5).map((loc) => (
                  <tr
                    key={loc.id}
                    className="hover:bg-sky-950/20 transition-colors cursor-pointer group"
                    onClick={() => handleSelect(loc)}
                  >
                    <td className="py-3 px-3 font-semibold text-white group-hover:text-sky-300 transition-colors">
                      {loc.name}, {loc.country}
                    </td>
                    <td className="py-3 px-3">
                      <PollutionBadge level={loc.pollutionLevel} />
                    </td>
                    <td className="py-3 px-3 font-mono text-cyan-300 font-bold">
                      {loc.visibilityScore} / 10
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {loc.cloudCoverage}%
                    </td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-bold">
                      ★ {loc.qualityScore}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-[11px] font-semibold text-sky-400 group-hover:underline flex items-center justify-end gap-1 font-mono">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
