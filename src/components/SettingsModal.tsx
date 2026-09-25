import React, { useState } from 'react';
import { X, Sliders, CheckCircle2, Moon, Globe, Eye, Zap } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [telemetryFrequency, setTelemetryFrequency] = useState('15min');
  const [bortleFormat, setBortleFormat] = useState('class');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#0F1424] border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-5 text-slate-300 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-950/60 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                System Preferences
              </h3>
              <p className="text-[11px] text-slate-400">Mission-Control Display Configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200">
              Telemetry Ingestion Polling Rate
            </label>
            <select
              value={telemetryFrequency}
              onChange={(e) => setTelemetryFrequency(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="5min">High-Frequency (5 min orbital pass check)</option>
              <option value="15min">Balanced (15 min VIIRS update cycle)</option>
              <option value="1hour">Low Bandwidth (Hourly snapshot)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200">
              Dark-Sky Metric Display Mode
            </label>
            <select
              value={bortleFormat}
              onChange={(e) => setBortleFormat(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="class">Standard Bortle Class (Class 1 - 9)</option>
              <option value="mpsas">Zenith Radiance (mag/arcsec²)</option>
              <option value="radiance">Satellite Radiance (nW/cm²/sr)</option>
            </select>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1 text-[11px] text-sky-300">
            <div className="font-semibold">Display Profile: Aerospace Dark Interface</div>
            <p className="text-slate-400">
              Preserves nocturnal dark-adapted vision for active observers in the field.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
