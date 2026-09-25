import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Compass, 
  Moon, 
  Sparkles, 
  CheckSquare, 
  Square, 
  Download, 
  Share2, 
  Layers, 
  Check 
} from 'lucide-react';
import { ObservationLocation } from '../../types';
import { AerospaceButton, PollutionBadge } from '../common/UIComponents';

interface ObservationPlannerModalProps {
  location: ObservationLocation;
  isOpen: boolean;
  onClose: () => void;
}

export const ObservationPlannerModal: React.FC<ObservationPlannerModalProps> = ({
  location,
  isOpen,
  onClose
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-09-24');
  const [checklist, setChecklist] = useState<{ id: string; label: string; done: boolean }[]>([
    { id: '1', label: 'Telescope aperture checked & collimated', done: true },
    { id: '2', label: 'Red-headlamp / red flashlight packed (dark adaptation)', done: true },
    { id: '3', label: 'Off-grid offline star chart loaded (SkySafari / Stellarium)', done: false },
    { id: '4', label: 'Dew shield and heater band charged', done: false },
    { id: '5', label: 'Narrowband Nebula filters (O-III / H-Alpha) ready', done: true },
    { id: '6', label: 'High-elevation thermal cold-weather gear ready', done: true },
  ]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const handleExport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b101e] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#0b101e]/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-sky-500/40 flex items-center justify-center text-sky-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Observation Mission Planner
              </h3>
              <p className="text-xs text-slate-400">
                Target: {location.name} • Bortle Class {location.bortleClass}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-sm">
          {/* Mission Summary Card */}
          <div className="bg-[#0e1629] border border-slate-800/90 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-slate-400 mb-1">Target Window</div>
              <div className="font-semibold text-white text-sm">{location.bestObservationTime}</div>
              <div className="text-[10px] text-sky-400">Tonight & Upcoming</div>
            </div>
            <div>
              <div className="text-slate-400 mb-1">Sky Visibility</div>
              <div className="font-semibold text-emerald-400 text-sm">{location.visibilityScore} / 10</div>
              <div className="text-[10px] text-slate-400">Optimal transparency</div>
            </div>
            <div>
              <div className="text-slate-400 mb-1">Lunar Phase</div>
              <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-blue-300" />
                <span>New Moon (4%)</span>
              </div>
              <div className="text-[10px] text-emerald-400">Zero moon glow</div>
            </div>
            <div>
              <div className="text-slate-400 mb-1">Elevation</div>
              <div className="font-semibold text-white text-sm">{location.elevationMeters}m MSL</div>
              <div className="text-[10px] text-slate-400">Above thermal haze</div>
            </div>
          </div>

          {/* Date Picker & Astronomical Twilight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0e1629]/70 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>Scheduled Session Date</span>
              </label>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#080d19] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>

            <div className="bg-[#0e1629]/70 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
              <div className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Astronomical Twilight Schedule</span>
              </div>
              <div className="text-xs text-slate-300 pt-1 flex justify-between">
                <span>Astronomical Dusk:</span>
                <span className="font-mono text-sky-300">08:14 PM</span>
              </div>
              <div className="text-xs text-slate-300 flex justify-between">
                <span>True Dark Sky Window:</span>
                <span className="font-mono text-emerald-300">09:05 PM - 03:45 AM</span>
              </div>
            </div>
          </div>

          {/* Primary Celestial Targets */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Recommended Observation Targets
            </h4>
            <div className="flex flex-wrap gap-2">
              {(location.celestialTargets || location.recommendedTargets || []).map((target: string, idx: number) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 rounded-lg bg-[#11192e] border border-slate-700/60 text-xs text-sky-200 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>{target}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Gear & Preparation Checklist */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>Field Preparation Checklist</span>
              <span className="text-[11px] text-sky-400 lowercase font-normal">
                {checklist.filter(c => c.done).length} of {checklist.length} ready
              </span>
            </h4>
            <div className="space-y-2 bg-[#0e1629]/50 border border-slate-800/80 rounded-xl p-3">
              {checklist.map(item => (
                <div 
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className="flex items-center gap-2.5 cursor-pointer text-xs hover:text-white transition-colors"
                >
                  {item.done ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span className={item.done ? 'text-slate-300 line-through opacity-75' : 'text-slate-200'}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 bg-[#0b101e]/95 backdrop-blur-md px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            GPS: {location.lat.toFixed(4)}° N, {location.lng.toFixed(4)}° E
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Close
            </button>
            <AerospaceButton
              size="sm"
              icon={downloadSuccess ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              onClick={handleExport}
            >
              {downloadSuccess ? 'Mission Plan Exported!' : 'Export Mission (GPX / KML)'}
            </AerospaceButton>
          </div>
        </div>
      </div>
    </div>
  );
};
