import React, { useState } from 'react';
import { 
  Lightbulb, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Sliders, 
  ArrowRight,
  TrendingDown,
  Sun,
  Moon,
  Compass,
  FileCheck
} from 'lucide-react';
import { RESPONSIBLE_LIGHTING_PRINCIPLES } from '../../data/mockData';

interface ResponsibleLightingPageProps {
  onNavigateToMethodology?: () => void;
  onOpenProvenance?: (datasetId: string) => void;
}

export const ResponsibleLightingPage: React.FC<ResponsibleLightingPageProps> = ({
  onNavigateToMethodology,
  onOpenProvenance
}) => {
  // Interactive Skyglow Mitigation Simulator state
  const [shieldingType, setShieldingType] = useState<'unshielded' | 'semi-cutoff' | 'full-cutoff'>('full-cutoff');
  const [colorTemperature, setColorTemperature] = useState<number>(2200); // Kelvin
  const [curfewActive, setCurfewActive] = useState<boolean>(true);

  // Calculate simulated skyglow factor based on Rayleigh scattering (lambda^-4) and shielding
  // Unshielded: upward flux ~25%; semi: ~5%; full-cutoff: 0% direct uplight
  const uplightFactor = shieldingType === 'unshielded' ? 1.0 : shieldingType === 'semi-cutoff' ? 0.35 : 0.08;
  
  // Color temperature impact: Blue light (450nm) scatters ~4.4x more than amber light (600nm)
  // Scaled index normalized to 2200K = 1.0
  const colorFactor = colorTemperature >= 4000 ? 2.8 : colorTemperature >= 3000 ? 1.7 : 1.0;
  
  // Curfew factor: 70% dimming after midnight
  const curfewFactor = curfewActive ? 0.35 : 1.0;

  // Composite Skyglow Index (relative to baseline unshielded 5000K no-curfew = 100%)
  const relativeSkyglowPercent = Math.min(100, Math.round((uplightFactor * colorFactor * curfewFactor / (1.0 * 2.8 * 1.0)) * 100));
  const reductionPercent = 100 - relativeSkyglowPercent;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12 text-slate-200">
      {/* Hero / Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#060D1E] via-[#09132A] to-[#040813] border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-sky-400 text-xs font-semibold">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Environmental Aerospace Practice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
              Responsible Outdoor Lighting Framework
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Translating orbital nocturnal radiance measurements into practical luminaire shielding, spectral control, and municipal curfew guidelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            {onNavigateToMethodology && (
              <button
                onClick={onNavigateToMethodology}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600/80 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Data & Methodology Documentation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* DarkSky Reference & Attribution Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Reference Standard & Attribution Notice:</span>
              <span className="text-slate-400 ml-1">
                Aero Clear synthesizes practical recommendations using the Five Principles for Responsible Outdoor Lighting established by <strong>DarkSky International</strong> and the <strong>Illuminating Engineering Society (IES)</strong> as a reference standard. Recommendations are decision-support guidelines and are <strong>NOT officially issued or certified by DarkSky International</strong> unless specifically designated in official park audit dossiers.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Tier Classification Badge Legend */}
      <div className="p-4 rounded-2xl bg-[#070D1E] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 font-mono text-slate-400 uppercase text-[11px]">
          <span>Classification Key:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-950/70 border border-sky-600/40 text-sky-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Scientific Data</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>Calculated Indicator</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-600/40 text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Practical Recommendation</span>
          </div>
        </div>
      </div>

      {/* The 5 Principles Detailed Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <span>The Five Principles for Responsible Outdoor Lighting</span>
        </h2>

        <div className="grid grid-cols-1 gap-5">
          {RESPONSIBLE_LIGHTING_PRINCIPLES.map((principle) => (
            <div
              key={principle.id}
              className="p-6 rounded-2xl bg-[#070D1E] border border-slate-800/90 hover:border-slate-700 shadow-xl space-y-4 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-600/70 text-sky-400 font-mono font-bold flex items-center justify-center text-sm">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                      Principle {principle.number}: {principle.title}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Ref: {principle.darkSkyReference}
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 self-start sm:self-center">
                  Metric: {principle.technicalMetric.split('(')[0].trim()}
                </div>
              </div>

              {/* Core Principle Statement */}
              <div className="text-sm font-semibold text-sky-200">
                "{principle.coreRule}"
              </div>

              {/* 3-Tier Categorized Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1 text-xs">
                {/* 1. Scientific Data */}
                <div className="p-3.5 rounded-xl bg-[#091224] border border-sky-800/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>Scientific Data</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {principle.scientificBasis.replace('Scientific Data: ', '')}
                  </p>
                </div>

                {/* 2. Calculated Indicator */}
                <div className="p-3.5 rounded-xl bg-[#091224] border border-slate-700/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Calculated Indicator</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {principle.calculatedIndicator.replace('Calculated Indicator: ', '')}
                  </p>
                </div>

                {/* 3. Practical Recommendation */}
                <div className="p-3.5 rounded-xl bg-[#091224] border border-emerald-800/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Practical Recommendation</span>
                  </div>
                  <p className="text-emerald-100/90 leading-relaxed text-[11px]">
                    {principle.practicalRecommendation.replace('Practical Recommendation: ', '')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Skyglow Mitigation Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#070D1E] border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 mb-1">
              Interactive Decision Support
            </div>
            <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
              Skyglow Reduction Impact Simulator
            </h2>
            <p className="text-xs text-slate-400">
              Simulate the mathematical effect of luminaire shielding, warm CCT selection, and curfew dimming on artificial night radiance.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 self-start sm:self-center">
            Model: Rayleigh λ⁻⁴ & Full-Cutoff (U0)
          </div>
        </div>

        {/* Interactive Controls & Output Gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-5 text-xs">
            {/* Control 1: Shielding Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 block">
                1. Luminaire Optical Shielding (Uplight Control):
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setShieldingType('unshielded')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    shieldingType === 'unshielded'
                      ? 'bg-amber-950/60 border-amber-500/80 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs">Unshielded</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">&gt;25% Direct Uplight</div>
                </button>

                <button
                  onClick={() => setShieldingType('semi-cutoff')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    shieldingType === 'semi-cutoff'
                      ? 'bg-slate-800 border-slate-600 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs">Semi-Cutoff</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">~5% Direct Uplight</div>
                </button>

                <button
                  onClick={() => setShieldingType('full-cutoff')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    shieldingType === 'full-cutoff'
                      ? 'bg-sky-950/80 border-sky-500 text-sky-200 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs">Full-Cutoff (U0)</div>
                  <div className="text-[10px] text-sky-300 mt-0.5">0.0% Direct Uplight</div>
                </button>
              </div>
            </div>

            {/* Control 2: Correlated Color Temperature */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-200">
                  2. Spectral Temperature (CCT):
                </label>
                <span className="font-mono font-bold text-sky-300">
                  {colorTemperature}K {colorTemperature <= 2200 ? '(Narrowband Amber)' : colorTemperature <= 2700 ? '(Warm White)' : '(Cool White LED)'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[2200, 2700, 4000].map((cct) => (
                  <button
                    key={cct}
                    onClick={() => setColorTemperature(cct)}
                    className={`py-2 px-3 rounded-xl border text-center text-xs transition-all ${
                      colorTemperature === cct
                        ? 'bg-slate-800 border-sky-400 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cct}K
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Curfew Dimming */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 block">
                3. Automated Midnight Curfew (23:00 - 06:00):
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurfewActive(!curfewActive)}
                  className={`px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                    curfewActive
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{curfewActive ? 'Curfew Active (70% Dimming Enabled)' : 'Curfew Disabled (Continuous 100% Output)'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-[#040813] border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Simulated Skyglow Radiance Impact
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold text-sky-400 font-mono tracking-tight">
                -{reductionPercent}%
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Reduction in Top-of-Atmosphere Radiance
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 text-left text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Residual Skyglow:</span>
                <span className="text-white font-bold">{relativeSkyglowPercent}% of unshielded baseline</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-slate-400 transition-all duration-500 rounded-full"
                  style={{ width: `${relativeSkyglowPercent}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 text-left leading-relaxed">
              <strong>Atmospheric Physics:</strong> Full-cutoff shielding stops direct atmospheric injection, while 2200K amber minimizes the λ⁻⁴ Rayleigh scattering cross-section by ~64% compared to 4000K cold-white illumination.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
