import React, { useState } from 'react';
import {
  X,
  Compass,
  Moon,
  Calendar,
  Clock,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  MapPin,
  Telescope,
  Shield,
  Layers,
} from 'lucide-react';
import { LocationObservation } from '../types';

interface ObservationPlanModalProps {
  location: LocationObservation;
  isOpen: boolean;
  onClose: () => void;
}

export const ObservationPlanModal: React.FC<ObservationPlanModalProps> = ({
  location,
  isOpen,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-09-24');
  const [selectedGear, setSelectedGear] = useState<string[]>([
    'Apochromatic Refractor Telescope',
    'Deep-Sky Cooled CMOS Camera',
    'Dual-Band Narrowband Light Pollution Filter',
    'Astronomical Red Flashlight (Sub-630nm)',
  ]);
  const [isExported, setIsExported] = useState(false);

  if (!isOpen) return null;

  const toggleGear = (item: string) => {
    if (selectedGear.includes(item)) {
      setSelectedGear(selectedGear.filter((g) => g !== item));
    } else {
      setSelectedGear([...selectedGear, item]);
    }
  };

  const handleExportPlan = () => {
    setIsExported(true);
    const targets = location.recommendedTargets || location.celestialTargets || [];
    const planText = `AERO CLEAR OBSERVATION MISSION BRIEFING\n=========================================\nLocation: ${location.name}, ${location.country} (${location.region})\nCoordinates: ${location.lat}° N, ${location.lng}° E\nElevation: ${location.elevationMeters}m | Bortle Class: ${location.bortleClass}\nOptimal Window: ${location.bestObservationTime}\nSky Visibility Score: ${location.visibilityScore}/10 | Cloud Cover: ${location.cloudCoverage}%\n\nTarget Catalog:\n${targets.map((t) => `- ${t}`).join('\n')}\n\nEquipment Checklist:\n${selectedGear.map((g) => `[x] ${g}`).join('\n')}\n\nGenerated via Aero Clear Aerospace Platform`;

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AeroClear-Plan-${location.name.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setIsExported(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="observation-plan-modal"
        className="w-full max-w-2xl bg-[#0F1423] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800/80 bg-gradient-to-r from-slate-900/60 via-indigo-950/20 to-slate-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Telescope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                  Astronomical Observation Planning
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Bortle {location.bortleClass}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Site: {location.name}, {location.country} ({location.elevationMeters}m MSL)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Celestial Conditions Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Observation Window</div>
              <div className="text-xs font-semibold text-sky-300 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{location.bestObservationTime}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Moon Phase</div>
              <div className="text-xs font-semibold text-blue-300 flex items-center justify-center gap-1">
                <Moon className="w-3.5 h-3.5" />
                <span>12% Waxing Crescent</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Atmospheric Seeing</div>
              <div className="text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>0.8" Arcseconds</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Cloud Forecast</div>
              <div className="text-xs font-semibold text-cyan-300">
                <span>{location.cloudCoverage}% Optimal</span>
              </div>
            </div>
          </div>

          {/* Prime Celestial Targets tonight */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Recommended Prime Targets for {location.name}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(location.recommendedTargets || location.celestialTargets || []).map((tgt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200"
                >
                  <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_6px_#a855f7]" />
                  <span className="font-medium">{tgt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expedition Equipment Checklist */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5 flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Recommended Dark-Sky Expedition Gear</span>
            </h4>
            <div className="space-y-2">
              {[
                'Apochromatic Refractor Telescope',
                'Deep-Sky Cooled CMOS Camera',
                'Dual-Band Narrowband Light Pollution Filter',
                'Astronomical Red Flashlight (Sub-630nm)',
                '12V Portable Field Battery Station',
                'Anti-Dew Heater Bands & Controller',
              ].map((gear, i) => {
                const checked = selectedGear.includes(gear);
                return (
                  <label
                    key={i}
                    onClick={() => toggleGear(gear)}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      checked
                        ? 'bg-slate-900/60 border-sky-500/40 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        checked
                          ? 'bg-sky-600 border-sky-500 text-white'
                          : 'border-slate-700 bg-slate-800'
                      }`}
                    >
                      {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span>{gear}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0B0F19] flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Lat: {location.lat.toFixed(4)}°, Lng: {location.lng.toFixed(4)}°</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExportPlan}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-lg shadow-sky-500/20 transition-all"
            >
              {isExported ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Briefing Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Flight/Ground Briefing</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
