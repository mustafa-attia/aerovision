import React, { useState } from 'react';
import { 
  Database, 
  FileText, 
  Layers, 
  Cpu, 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Search, 
  Filter, 
  ShieldAlert, 
  ExternalLink,
  HelpCircle,
  TrendingDown,
  ArrowRight,
  BookOpen,
  Scale,
  Sparkles,
  Award
} from 'lucide-react';
import { 
  SCIENTIFIC_DATASETS, 
  QUALITY_SCORE_METHODOLOGY, 
  DEMO_DATA_DISCLAIMER 
} from '../../data/mockData';
import { AERO_CLEAR_SOURCES } from '../../data/sourceRegistry';

interface DataMethodologyPageProps {
  onOpenProvenance?: (datasetId: string) => void;
  onNavigateToLighting?: () => void;
}

export const DataMethodologyPage: React.FC<DataMethodologyPageProps> = ({
  onOpenProvenance,
  onNavigateToLighting
}) => {
  const [activeTab, setActiveTab] = useState<'datasets' | 'quality-score' | 'limitations' | 'taxonomy'>('datasets');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Real Scientific Data' | 'Derived Indicator' | 'Demonstration / Simulated Data'>('all');
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('viirs-dnb');

  // Filter datasets
  const filteredDatasets = SCIENTIFIC_DATASETS.filter(d => {
    const matchesSearch = 
      d.datasetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.variableName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.sourceOrganization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.modelUsed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || d.dataTypeCategory === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const selectedDataset = SCIENTIFIC_DATASETS.find(d => d.id === selectedDatasetId) || SCIENTIFIC_DATASETS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Top Banner & Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#060D1E] via-[#09132A] to-[#040813] border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-sky-400 text-xs font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>Scientific Data Documentation & Calibration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
              Data & Methodology Framework
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Complete peer-verifiable scientific specifications, algorithmic formulas, and operational boundary conditions governing every metric displayed in the Aero Clear platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            {onNavigateToLighting && (
              <button
                onClick={onNavigateToLighting}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600/80 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Responsible Lighting Principles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <a
              href="#quality-score"
              onClick={() => setActiveTab('quality-score')}
              className="px-4 py-2.5 rounded-xl bg-sky-900/60 hover:bg-sky-800 text-white border border-sky-600/70 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Calculator className="w-3.5 h-3.5 text-sky-300" />
              <span>Observation Quality Score Formula</span>
            </a>
          </div>
        </div>

        {/* Global Notice Banner */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-slate-200">
              Evaluation & Comparative Decision Support:
            </span>
            <span className="text-slate-400">
              Aero Clear metrics are intended for relative comparative screening and mission planning, not as officially certified astronomical measurements unless supported by in-situ calibrated photometers.
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0">
            AERO-SPEC-STD-2026
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('datasets')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
            activeTab === 'datasets'
              ? 'bg-slate-800 text-white border-slate-600 shadow-md'
              : 'bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-sky-400" />
          <span>Scientific Datasets Catalog ({SCIENTIFIC_DATASETS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quality-score')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
            activeTab === 'quality-score'
              ? 'bg-slate-800 text-white border-slate-600 shadow-md'
              : 'bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-sky-400" />
          <span>Observation Quality Score Methodology</span>
        </button>

        <button
          onClick={() => setActiveTab('limitations')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
            activeTab === 'limitations'
              ? 'bg-slate-800 text-white border-slate-600 shadow-md'
              : 'bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Model Limitations & Boundary Conditions</span>
        </button>

        <button
          onClick={() => setActiveTab('taxonomy')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
            activeTab === 'taxonomy'
              ? 'bg-slate-800 text-white border-slate-600 shadow-md'
              : 'bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-slate-300" />
          <span>Data Taxonomy & Provenance Standards</span>
        </button>
      </div>

      {/* TAB 1: SCIENTIFIC DATASETS (13-Parameter Specification) */}
      {activeTab === 'datasets' && (
        <div className="space-y-6">
          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#080E1E] p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dataset name, organization, variable, or model..."
                className="w-full bg-[#050A17] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] text-slate-400 uppercase font-mono mr-1">Classification:</span>
              {(['all', 'Real Scientific Data', 'Derived Indicator', 'Demonstration / Simulated Data'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                    categoryFilter === cat
                      ? 'bg-slate-700 text-white border-slate-500 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Datasets' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dataset Split-View: List on left, Full 13-Attribute Dossier on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Master List */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-1">
                Select Dataset ({filteredDatasets.length} Available)
              </div>
              <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
                {filteredDatasets.map((dataset) => {
                  const isSelected = dataset.id === selectedDatasetId;
                  return (
                    <div
                      key={dataset.id}
                      onClick={() => setSelectedDatasetId(dataset.id)}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#0E1A38] border-sky-400/80 shadow-[0_0_20px_rgba(14,165,233,0.15)] ring-1 ring-sky-400/40'
                          : 'bg-[#070D1E] border-slate-800 hover:border-slate-700 hover:bg-[#0A1329]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                          {dataset.id}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                          dataset.isSimulated
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                            : dataset.dataTypeCategory === 'Derived Indicator'
                              ? 'bg-slate-800 text-slate-300 border-slate-600'
                              : 'bg-sky-950/60 text-sky-300 border-sky-600/40'
                        }`}>
                          {dataset.dataTypeCategory}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-white mb-1 line-clamp-2">
                        {dataset.datasetName}
                      </div>

                      <div className="text-[11px] text-slate-400 mb-2">
                        {dataset.sourceOrganization}
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Unit: <span className="text-sky-300">{dataset.unitOfMeasurement.split('(')[0].trim()}</span></span>
                        <span>{dataset.dataUpdateDate.split('(')[0].trim()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed 13-Attribute Dossier */}
            <div className="lg:col-span-8 bg-[#070D1E] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Standard Dataset Specification:
                    </span>
                    <span className="text-xs font-mono font-bold text-sky-400">
                      {selectedDataset.id}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                    {selectedDataset.datasetName}
                  </h2>
                </div>

                {onOpenProvenance && (
                  <button
                    onClick={() => onOpenProvenance(selectedDataset.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-center shrink-0"
                  >
                    <Info className="w-3.5 h-3.5 text-sky-400" />
                    <span>Open Provenance Modal</span>
                  </button>
                )}
              </div>

              {/* Status & Simulation Callout */}
              {selectedDataset.isSimulated && (
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wider text-[11px] block text-amber-300">
                      {DEMO_DATA_DISCLAIMER}
                    </span>
                    <p className="text-[11px] text-amber-200/90 mt-0.5">
                      This variable uses synthetic forward modeling for user interface validation and demonstration. It must not be cited as empirical astronomical measurements.
                    </p>
                  </div>
                </div>
              )}

              {/* 13 Structured Attributes Grid */}
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 1. Dataset Name */}
                  <div className="p-3.5 rounded-xl bg-[#091224] border border-slate-800">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      1. Dataset Name
                    </div>
                    <div className="font-semibold text-white">
                      {selectedDataset.datasetName}
                    </div>
                  </div>

                  {/* 2. Data Source */}
                  <div className="p-3.5 rounded-xl bg-[#091224] border border-slate-800">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      2. Data Source
                    </div>
                    <div className="font-semibold text-slate-200">
                      {selectedDataset.dataSource}
                    </div>
                  </div>

                  {/* 3. Source Organization */}
                  <div className="p-3.5 rounded-xl bg-[#091224] border border-slate-800">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      3. Source Organization
                    </div>
                    <div className="font-semibold text-sky-300">
                      {selectedDataset.sourceOrganization}
                    </div>
                  </div>

                  {/* 4. Measurement / Variable Name */}
                  <div className="p-3.5 rounded-xl bg-[#091224] border border-slate-800">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      4. Measurement / Variable Name
                    </div>
                    <div className="font-semibold text-white">
                      {selectedDataset.variableName}
                    </div>
                  </div>

                  {/* 5. Unit of Measurement */}
                  <div className="p-3.5 rounded-xl bg-[#091224] border border-slate-800">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      5. Unit of Measurement
                    </div>
                    <div className="font-mono font-bold text-sky-400">
                      {selectedDataset.unitOfMeasurement}
                    </div>
                  </div>

                  {/* 6. Time Period */}
                  <div className="p-3.5 rounded-xl bg-[#091224] border border-slate-800">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      6. Time Period
                    </div>
                    <div className="text-slate-200">
                      {selectedDataset.timePeriod}
                    </div>
                  </div>

                  {/* 7. Spatial Resolution */}
                  <div className="p-3.5 rounded-xl bg-[#091224] border border-slate-800">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      7. Spatial Resolution
                    </div>
                    <div className="font-mono text-slate-200">
                      {selectedDataset.spatialResolution}
                    </div>
                  </div>

                  {/* 8. Data Update Date */}
                  <div className="p-3.5 rounded-xl bg-[#091224] border border-slate-800">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      8. Data Update Date
                    </div>
                    <div className="text-slate-200 font-mono">
                      {selectedDataset.dataUpdateDate}
                    </div>
                  </div>
                </div>

                {/* 9. Processing / Calculation Method */}
                <div className="p-4 rounded-xl bg-[#091224] border border-slate-800">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    9. Processing / Calculation Method
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedDataset.processingMethod}
                  </p>
                </div>

                {/* 10. Model Used */}
                <div className="p-4 rounded-xl bg-[#091224] border border-slate-800">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                    10. Model Used
                  </div>
                  <div className="font-mono font-semibold text-white">
                    {selectedDataset.modelUsed}
                  </div>
                </div>

                {/* 11. Model Assumptions */}
                <div className="p-4 rounded-xl bg-[#091224] border border-slate-800">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    11. Model Assumptions
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedDataset.modelAssumptions}
                  </p>
                </div>

                {/* 12. Model Validity Limitations */}
                <div className="p-4 rounded-xl bg-[#091224] border border-slate-800">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>12. Model Validity Limitations</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedDataset.modelValidityLimitations}
                  </p>
                </div>

                {/* 13. Data Classification */}
                <div className="p-4 rounded-xl bg-[#091224] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      13. Data Classification
                    </div>
                    <div className="font-bold text-white">
                      {selectedDataset.dataTypeCategory}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">Application Usage:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedDataset.usedInMetrics.map((metric, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OBSERVATION QUALITY SCORE METHODOLOGY */}
      {activeTab === 'quality-score' && (
        <div className="space-y-6" id="quality-score">
          {/* Methodological Rationale & Disclaimer Card */}
          <div className="p-6 rounded-2xl bg-[#070D1E] border border-slate-700/80 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-600/70 flex items-center justify-center text-sky-400">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                    Aero Clear Observation Quality Score (Q_obs)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Calculated composite indicator for comparative dark-sky site evaluation
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-sky-400 shrink-0">
                Composite Indicator (0.0 – 10.0)
              </div>
            </div>

            {/* Official Non-Standard Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 flex items-start gap-3">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider block">
                  Methodological Disclaimer — Not an Official Astronomical Standard
                </span>
                <p className="mt-1 leading-relaxed text-slate-300">
                  {QUALITY_SCORE_METHODOLOGY.disclaimer}
                </p>
              </div>
            </div>

            {/* Formula Block */}
            <div className="p-5 rounded-2xl bg-[#040813] border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Mathematical Model Specification
              </span>
              <div className="text-sm sm:text-base md:text-lg font-mono font-bold text-sky-300 tracking-wide overflow-x-auto py-2">
                Q_obs = min(10.0, [ 0.40 · S_rad + 0.35 · S_cloud + 0.25 · S_seeing ] × F_elevation)
              </div>
              <p className="text-[11px] text-slate-400 max-w-2xl mx-auto">
                Where S_rad, S_cloud, and S_seeing are non-linearly normalized sub-scores in [0.0, 10.0], and F_elevation is the boundary layer terrain amplification factor.
              </p>
            </div>
          </div>

          {/* 4 Input Variables & Normalization Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Input Variables, Normalization Curves & Weighting</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUALITY_SCORE_METHODOLOGY.inputVariables.map((variable) => (
                <div 
                  key={variable.symbol}
                  className="p-5 rounded-2xl bg-[#070D1E] border border-slate-800/80 hover:border-slate-700 shadow-md space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-sky-400 font-mono font-bold flex items-center justify-center text-xs">
                        {variable.symbol}
                      </span>
                      <span className="font-bold text-white">
                        {variable.name}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-sky-950/80 border border-sky-600/40 text-sky-300 font-mono font-bold text-[11px]">
                      Weight: {variable.weight}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-slate-400 block">Dataset Source:</span>
                      <span className="text-slate-200 font-medium">{variable.sourceDataset}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Raw Measurement Unit:</span>
                      <span className="font-mono text-sky-300">{variable.rawUnit}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#040813] border border-slate-800/80">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Normalization Function:
                    </div>
                    <div className="font-mono text-slate-200 text-[11px]">
                      {variable.normalizationFormula}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Normalized Range:</span>
                    <span className="text-slate-300 font-mono">{variable.normalizedRange}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weighting Rationale & Calculation Sequence */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#070D1E] border border-slate-800 shadow-md space-y-3 text-xs">
              <h4 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Weighting Rationale & Physics Basis</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {QUALITY_SCORE_METHODOLOGY.weightingRationale}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#070D1E] border border-slate-800 shadow-md space-y-3 text-xs">
              <h4 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Step-by-Step Algorithmic Calculation</span>
              </h4>
              <div className="space-y-2">
                {QUALITY_SCORE_METHODOLOGY.stepByStepCalculation.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#091224] border border-slate-800/80 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-sky-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Limitations of the Score */}
          <div className="p-6 rounded-2xl bg-[#070D1E] border border-slate-800 shadow-md space-y-3 text-xs">
            <h4 className="text-sm font-bold text-amber-400 font-['Plus_Jakarta_Sans'] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Specific Indicator Limitations</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {QUALITY_SCORE_METHODOLOGY.limitations.map((limit, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 leading-relaxed text-[11px]">
                  {limit}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MODEL LIMITATIONS & BOUNDARY CONDITIONS */}
      {activeTab === 'limitations' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#070D1E] border border-slate-700/80 shadow-xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                  Model Limitations & Operational Scope
                </h2>
                <p className="text-xs text-slate-400">
                  Clear definition of analytical scope and conditions under which indicators apply
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 space-y-2 leading-relaxed">
              <p className="font-semibold text-white">
                General Limitation Statement:
              </p>
              <p>
                All results, maps, rankings, and indices generated by Aero Clear are engineered strictly for <strong>comparative analysis and decision support</strong>. They do not constitute certified astronomical observations or official environmental compliance assessments unless verified against in-situ photometric datasets conforming to ISO/CIE standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Limitation 1 */}
              <div className="p-4 rounded-xl bg-[#091224] border border-slate-800 space-y-2 text-xs">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  1. Spectral Blue Blindness
                </div>
                <h4 className="font-bold text-white text-xs">
                  VIIRS-DNB Cutoff (500 nm)
                </h4>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Satellite radiometers do not detect short-wavelength blue light below 500 nm. Regions transitioning to 4000K–6500K LED streetlights will exhibit up to 40% more perceived skyglow than recorded by satellite TOA sensors.
                </p>
              </div>

              {/* Limitation 2 */}
              <div className="p-4 rounded-xl bg-[#091224] border border-slate-800 space-y-2 text-xs">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  2. Microclimate Dynamics
                </div>
                <h4 className="font-bold text-white text-xs">
                  Rapid Turbulence Flux
                </h4>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Astronomical seeing fluctuates on sub-minute timescales driven by localized thermal ground radiation. Regional satellite seeing models represent synoptic mesoscale approximations rather than instantaneous telescope eyepiece seeing.
                </p>
              </div>

              {/* Limitation 3 */}
              <div className="p-4 rounded-xl bg-[#091224] border border-slate-800 space-y-2 text-xs">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  3. Transient Ground Interference
                </div>
                <h4 className="font-bold text-white text-xs">
                  Hyper-Local Obstacles
                </h4>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Monthly satellite composites filter out momentary events. An observing site marked "Bortle 2" may suffer severe momentary light disruption if an unshielded vehicle, campsite campfire, or mining floodlight enters direct line-of-sight.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DATA TAXONOMY & PROVENANCE STANDARDS */}
      {activeTab === 'taxonomy' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#070D1E] border border-slate-700/80 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans'] mb-1">
                Data Classification Taxonomy
              </h2>
              <p className="text-xs text-slate-400">
                Rigorous operational distinction between empirical measurements, mathematical models, and simulated test benches
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Category A: Real Scientific Data */}
              <div className="p-5 rounded-2xl bg-[#091224] border border-sky-600/40 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-700/60 font-mono text-[10px] font-bold">
                    Class A
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="font-bold text-white text-sm">
                  Real Scientific Data
                </h3>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Raw or pre-calibrated physical observations collected by operational Earth Observation satellites (e.g., VIIRS DNB radiance, MODIS cloud masks, SRTM elevation models).
                </p>
                <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                  Traceable to NOAA, NASA, ESA, USGS open data archives.
                </div>
              </div>

              {/* Category B: Derived Indicators */}
              <div className="p-5 rounded-2xl bg-[#091224] border border-slate-700 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-600 font-mono text-[10px] font-bold">
                    Class B
                  </span>
                  <Calculator className="w-4 h-4 text-slate-300" />
                </div>
                <h3 className="font-bold text-white text-sm">
                  Derived Indicators
                </h3>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Mathematical outputs synthesized from one or more Class A datasets using published radiative transfer models or decision algorithms (e.g., Bortle Dark-Sky Scale, Aero Clear Observation Quality Score).
                </p>
                <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                  Clearly tagged with explicit mathematical formulas and weights.
                </div>
              </div>

              {/* Category C: Demonstration / Simulated Data */}
              <div className="p-5 rounded-2xl bg-[#091224] border border-amber-500/40 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-600/60 font-mono text-[10px] font-bold">
                    Class C
                  </span>
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="font-bold text-white text-sm">
                  Demonstration / Simulated Data
                </h3>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Synthesized temporal sequences and UI demonstration datasets constructed to demonstrate aerospace interface functionality without requiring active telemetry connections.
                </p>
                <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-amber-300">
                  Mandatory label: "{DEMO_DATA_DISCLAIMER}"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

          {/* Verified source registry */}
          <section className="mt-8 bg-[#080E20] border border-slate-800 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Sources actually used by this prototype</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Direct inputs are separated from upstream/reference sources. No unavailable NASA or VIIRS value is silently substituted.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {AERO_CLEAR_SOURCES.map((source) => (
                <div key={source.name} className="rounded-xl border border-slate-800 bg-[#0A1224] p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">{source.name}</h4>
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${source.status === 'real' ? 'text-emerald-300 border-emerald-700/50 bg-emerald-950/40' : 'text-sky-300 border-sky-700/50 bg-sky-950/40'}`}>
                          {source.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{source.organization}</p>
                    </div>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-400 hover:underline break-all">
                      {source.url}
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2 mt-3 text-[11px]">
                    <div><span className="text-slate-500">Variables:</span> <span className="text-slate-300">{source.variables}</span></div>
                    <div><span className="text-slate-500">Units:</span> <span className="text-slate-300">{source.units}</span></div>
                    <div><span className="text-slate-500">Spatial resolution:</span> <span className="text-slate-300">{source.resolution}</span></div>
                    <div><span className="text-slate-500">Time / update:</span> <span className="text-slate-300">{source.time} · {source.update}</span></div>
                    <div><span className="text-slate-500">Processing:</span> <span className="text-slate-300">{source.processing}</span></div>
                    <div><span className="text-slate-500">Limitation:</span> <span className="text-slate-300">{source.limitations}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

};
