import React from 'react';
import { X, Sparkles, Radio, Award, Compass, ShieldCheck, Heart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#0F1424] border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-5 text-slate-300 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-950/60 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                About Aero Clear
              </h3>
              <p className="text-[11px] text-sky-300">Space-Tech Hackathon Project</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 leading-relaxed">
          <p>
            <strong>Aero Clear</strong> is a space observation and light-pollution awareness platform developed to bridge planetary earth-observation satellite data with astronomical discovery.
          </p>
          <p>
            By synthesizing nocturnal radiometry from the VIIRS Day/Night Band, infrared cloud masks from MODIS, and aerosol optical depth from Sentinel-5P, Aero Clear identifies dark sky sanctuaries protected from urban skyglow.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="font-bold text-white uppercase text-[10px] tracking-wider text-sky-400">
            Hackathon Mission Goals
          </div>
          <ul className="space-y-1.5 text-slate-300">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Raise global awareness for dark-sky preservation</span>
            </li>
            <li className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Democratize precision astronomical expedition planning</span>
            </li>
            <li className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Professional mission-control UI design without generic AI clichés</span>
            </li>
          </ul>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
