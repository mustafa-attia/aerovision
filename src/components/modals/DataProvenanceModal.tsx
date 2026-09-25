import React, { useState } from 'react';
import { 
  X, 
  Database, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Cpu, 
  Globe, 
  Info,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';
import { SCIENTIFIC_DATASETS, DEMO_DATA_DISCLAIMER } from '../../data/mockData';

interface DataProvenanceModalProps {
  datasetId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMethodology?: () => void;
}

export const DataProvenanceModal: React.FC<DataProvenanceModalProps> = ({
  datasetId,
  isOpen,
  onClose,
  onNavigateToMethodology
}) => {
  const [selectedId, setSelectedId] = useState<string>(datasetId || 'viirs-dnb');

  // Sync selected ID when opened with a specific dataset
  React.useEffect(() => {
    if (datasetId) {
      setSelectedId(datasetId);
    }
  }, [datasetId]);

  if (!isOpen) return null;

  const dataset = SCIENTIFIC_DATASETS.find(d => d.id === selectedId) || SCIENTIFIC_DATASETS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-[#070D1E] border border-slate-700/80 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="provenance-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#0A1329] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-600/60 flex items-center justify-center text-sky-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="provenance-title" className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                  Scientific Data Provenance & Methodology
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                  Audit Spec v2.6
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Peer-verifiable aerospace documentation & sensor calibration metadata
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700/50"
            aria-label="Close provenance modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dataset Switcher Tabs */}
        <div className="px-6 py-2.5 bg-[#050A17] border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            Datasets:
          </span>
          {SCIENTIFIC_DATASETS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                selectedId === item.id
                  ? 'bg-sky-950/80 border-sky-400/80 text-sky-200 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                item.isSimulated 
                  ? 'bg-amber-400' 
                  : item.dataTypeCategory === 'Derived Indicator' 
                    ? 'bg-slate-300' 
                    : 'bg-sky-400'
              }`} />
              {item.datasetName.split('(')[0].split('/')[0].trim()}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Classification & Disclaimer Banner */}
          {dataset.isSimulated ? (
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider text-[11px] block text-amber-300">
                  {DEMO_DATA_DISCLAIMER}
                </span>
                <p className="text-[11px] text-amber-200/90 mt-0.5">
                  This specific record utilizes synthetic forward modeling for user interface validation and demonstration. It must not be cited as empirical astronomical measurements.
                </p>
              </div>
            </div>
          ) : dataset.dataTypeCategory === 'Derived Indicator' ? (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 flex items-start gap-3">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider text-[11px] block text-slate-200">
                  Derived Indicator — Comparative Decision Support
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  This indicator mathematically synthesizes raw satellite observations into a normalized decision metric. It is not an officially certified standard unless cross-validated with in-situ photometric devices.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-600/30 text-sky-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider text-[11px] block text-sky-300">
                  Real Scientific Data — Primary Remote Sensing Dataset
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Sourced directly from verified Earth observation satellite missions and international meteorological archives.
                </p>
              </div>
            </div>
          )}

          {/* 13-Attribute Scientific Provenance Specification */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                Dataset Technical Dossier (13 Standard Parameters)
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Ref ID: <span className="text-slate-200 font-semibold">{dataset.id}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* 1. Dataset Name */}
              <div className="p-3 rounded-xl bg-[#091124] border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  1. Dataset Name
                </div>
                <div className="text-xs font-semibold text-white">
                  {dataset.datasetName}
                </div>
              </div>

              {/* 2. Data Source */}
              <div className="p-3 rounded-xl bg-[#091124] border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  2. Data Source
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {dataset.dataSource}
                </div>
              </div>

              {/* 3. Source Organization */}
              <div className="p-3 rounded-xl bg-[#091124] border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  3. Source Organization
                </div>
                <div className="text-xs font-semibold text-sky-300">
                  {dataset.sourceOrganization}
                </div>
              </div>

              {/* 4. Measurement / Variable Name */}
              <div className="p-3 rounded-xl bg-[#091124] border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  4. Measurement / Variable Name
                </div>
                <div className="text-xs font-semibold text-white">
                  {dataset.variableName}
                </div>
              </div>

              {/* 5. Unit of Measurement */}
              <div className="p-3 rounded-xl bg-[#091124] border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  5. Unit of Measurement
                </div>
                <div className="text-xs font-mono font-bold text-sky-400">
                  {dataset.unitOfMeasurement}
                </div>
              </div>

              {/* 6. Time Period */}
              <div className="p-3 rounded-xl bg-[#091124] border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  6. Time Period / Frequency
                </div>
                <div className="text-xs text-slate-200">
                  {dataset.timePeriod}
                </div>
              </div>

              {/* 7. Spatial Resolution */}
              <div className="p-3 rounded-xl bg-[#091124] border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  7. Spatial Resolution
                </div>
                <div className="text-xs font-mono text-slate-200">
                  {dataset.spatialResolution}
                </div>
              </div>

              {/* 8. Data Update Date */}
              <div className="p-3 rounded-xl bg-[#091124] border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  8. Data Update Date
                </div>
                <div className="text-xs text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {dataset.dataUpdateDate}
                </div>
              </div>
            </div>

            {/* 9. Processing / Calculation Method */}
            <div className="p-3.5 rounded-xl bg-[#091124] border border-slate-800/80">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                9. Processing / Calculation Method
              </div>
              <p className="text-xs leading-relaxed text-slate-200">
                {dataset.processingMethod}
              </p>
            </div>

            {/* 10. Model Used */}
            <div className="p-3.5 rounded-xl bg-[#091124] border border-slate-800/80">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                10. Model Used
              </div>
              <div className="text-xs font-semibold text-white font-mono">
                {dataset.modelUsed}
              </div>
            </div>

            {/* 11 & 12. Model Assumptions & Validity Limitations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl bg-[#091124] border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  11. Model Assumptions
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {dataset.modelAssumptions}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091124] border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 mb-1">
                  12. Model Validity Limitations
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {dataset.modelValidityLimitations}
                </p>
              </div>
            </div>

            {/* 13. Data Classification */}
            <div className="p-3.5 rounded-xl bg-[#091124] border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                  13. Data Classification
                </div>
                <div className="text-xs font-bold text-white">
                  {dataset.dataTypeCategory}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-400">Used in:</span>
                <div className="flex flex-wrap gap-1">
                  {dataset.usedInMetrics.map((metric, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#0A1329] flex items-center justify-between text-xs">
          <div className="text-slate-400 text-[11px]">
            Comparative analysis & decision support engine · Aero Clear Space-Tech
          </div>
          <div className="flex items-center gap-2">
            {onNavigateToMethodology && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToMethodology();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-sky-900/60 hover:bg-sky-800 text-sky-200 border border-sky-700/60 font-medium transition-colors flex items-center gap-1.5"
              >
                <span>Full Methodology Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors border border-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
