import React, { useState, useRef, useEffect } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Crosshair, 
  Layers, 
  Maximize2, 
  Minimize2, 
  MapPin, 
  Eye, 
  Cloud, 
  Sparkles, 
  Info,
  Radio
} from 'lucide-react';
import { ObservationLocation } from '../../types';
import { LOCATIONS_DATA } from '../../data/mockData';

interface InteractiveMapProps {
  selectedLocation?: ObservationLocation | null;
  onSelectLocation?: (location: ObservationLocation) => void;
  showFilters?: boolean;
  className?: string;
  activeLayer?: 'all' | 'pollution' | 'clouds' | 'satellite';
}

const getMarkerCoordinates = (loc: ObservationLocation): { x: number; y: number } => {
  const name = loc.name.toLowerCase();
  const id = loc.id.toLowerCase();

  if (id === 'taba-egypt' || name.includes('taba')) return { x: 58, y: 35 };
  if (id === 'wadi-rum-jordan' || name.includes('wadi rum')) return { x: 64, y: 32 };
  if (id === 'al-wakan-egypt' || name.includes('al wakan')) return { x: 38, y: 52 };
  if (id === 'cairo-city-egypt' || name.includes('cairo') || name.includes('qahirah')) return { x: 54, y: 37 };
  if (name.includes('alexandria')) return { x: 51, y: 34 };
  if (name.includes('siwa') || name.includes('siwah')) return { x: 44, y: 39 };
  if (name.includes('marsa matruh') || name.includes('matruh')) return { x: 47, y: 33 };
  if (name.includes('aswan')) return { x: 56, y: 52 };
  if (name.includes('giza')) return { x: 53.5, y: 37.5 };
  if (id === 'big-bend-usa' || name.includes('big bend')) return { x: 22, y: 44 };
  if (id === 'atacama-chile' || name.includes('atacama')) return { x: 28, y: 78 };
  if (id === 'teide-spain' || name.includes('teide') || name.includes('madrid')) return { x: 46, y: 40 };

  const x = ((loc.lng + 180) / 360) * 100;
  const y = ((90 - loc.lat) / 180) * 100;
  return { x: Math.max(8, Math.min(92, x)), y: Math.max(12, Math.min(88, y)) };
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedLocation,
  onSelectLocation,
  className = '',
  activeLayer = 'all'
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);
  const [layersState, setLayersState] = useState({
    heatmap: true,
    markers: true,
    clouds: true,
    bortleGrid: false
  });
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; title: string; radiance: string; bortle: string } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-pan when selected location changes so the map moves to the selected coordinates
  useEffect(() => {
    if (selectedLocation) {
      const coords = getMarkerCoordinates(selectedLocation);
      const targetPanX = (50 - coords.x) * 2.2;
      const targetPanY = (50 - coords.y) * 2.2;
      setPan({
        x: Math.max(-180, Math.min(180, targetPanX)),
        y: Math.max(-120, Math.min(120, targetPanY)),
      });
    }
  }, [selectedLocation?.lat, selectedLocation?.lng, selectedLocation?.name]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.35, 2.8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.35, 0.7));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.interactive-marker')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#06080F] select-none rounded-xl border border-slate-800/80 shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[460px] lg:h-[530px]'
      } ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Grid Coordinates Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Map Canvas & Earth Background with Lights */}
      <div 
        className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-75 relative origin-center"
        style={{
          transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`
        }}
      >
        {/* Deep space background with subtle stars */}
        <div className="absolute inset-0 bg-radial from-[#091122] via-[#060a14] to-[#04060c]">
          {/* Subtle star specks */}
          <div className="absolute top-10 left-20 w-1 h-1 bg-white/40 rounded-full" />
          <div className="absolute top-36 left-96 w-1 h-1 bg-sky-300/50 rounded-full" />
          <div className="absolute top-72 right-48 w-1 h-1 bg-blue-300/40 rounded-full" />
          <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-white/30 rounded-full" />
        </div>

        {/* Continental Silhouette (Abstract styled landmass vector) */}
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full opacity-65 object-cover preserve-3d"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="cairoGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="20%" stopColor="#f59e0b" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#ef4444" stopOpacity="0.6" />
              <stop offset="85%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="europeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#ea580c" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#9333ea" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gulfGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#f97316" stopOpacity="0.7" />
              <stop offset="75%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="darkSkyCyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <filter id="bloom" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Continents outlines (Stylized World / Mediterranean / Middle East focus) */}
          <path 
            d="M 120 180 Q 200 130 320 150 Q 420 120 540 160 Q 640 180 780 150 Q 860 170 940 210 L 980 340 Q 880 360 820 420 Q 740 480 620 520 Q 480 540 380 490 Q 260 480 180 430 Z" 
            fill="#0b1120" 
            stroke="#1e293b" 
            strokeWidth="1.2"
          />

          {/* Mediterranean & Red Sea & Sinai Peninsula Geometries */}
          {/* North Africa & Europe outlines */}
          <path 
            d="M 440 220 Q 480 200 520 230 Q 560 210 610 240 Q 630 290 600 320 Q 560 360 520 340 Q 480 320 450 280 Z" 
            fill="#0f172a" 
            stroke="#26344d" 
            strokeWidth="1"
          />
          {/* Sinai & Middle East */}
          <path 
            d="M 545 280 L 585 270 L 610 300 L 595 345 L 565 330 Z" 
            fill="#121b33" 
            stroke="#334155" 
            strokeWidth="0.8" 
          />

          {/* Satellite Light-Pollution Heatmap Clusters (matching the visual in screenshot) */}
          {layersState.heatmap && (
            <g filter="url(#bloom)">
              {/* Nile Delta & Cairo - High Megacity Radiance */}
              <circle cx="560" cy="275" r="42" fill="url(#cairoGlow)" />
              <ellipse cx="565" cy="265" rx="36" ry="24" fill="url(#cairoGlow)" />
              {/* Nile River glow strip */}
              <path d="M 560 275 Q 562 330 558 380 Q 565 420 560 460" stroke="#f59e0b" strokeWidth="6" opacity="0.75" fill="none" strokeLinecap="round" />
              <path d="M 560 275 Q 562 330 558 380 Q 565 420 560 460" stroke="#ef4444" strokeWidth="14" opacity="0.35" fill="none" filter="blur(6px)" />

              {/* European Urban Center Belt */}
              <ellipse cx="490" cy="180" rx="90" ry="50" fill="url(#europeGlow)" />
              <ellipse cx="430" cy="190" rx="50" ry="35" fill="url(#europeGlow)" />
              <circle cx="510" cy="165" r="38" fill="url(#europeGlow)" />

              {/* Levant / Gulf coast cluster */}
              <ellipse cx="640" cy="290" rx="45" ry="30" fill="url(#gulfGlow)" />
              <ellipse cx="680" cy="310" rx="55" ry="38" fill="url(#gulfGlow)" />

              {/* Americas East Coast & West Coast glows */}
              <ellipse cx="230" cy="220" rx="75" ry="55" fill="url(#europeGlow)" opacity="0.8" />
              <ellipse cx="140" cy="240" rx="40" ry="30" fill="url(#europeGlow)" opacity="0.7" />

              {/* Asia / East Asia glow */}
              <ellipse cx="820" cy="250" rx="80" ry="60" fill="url(#europeGlow)" opacity="0.85" />

              {/* Dark Sky Reserve low-radiance halos */}
              <circle cx="585" cy="295" r="28" fill="url(#darkSkyCyan)" />
              <circle cx="600" cy="305" r="32" fill="url(#darkSkyCyan)" />
              <circle cx="235" cy="270" r="35" fill="url(#darkSkyCyan)" />
            </g>
          )}

          {/* Cloud Cover Layer */}
          {layersState.clouds && (
            <g opacity="0.28" filter="blur(10px)">
              <path d="M 150 180 Q 250 140 380 190 Q 520 220 620 180 Q 750 150 880 190" stroke="#94a3b8" strokeWidth="32" fill="none" />
              <path d="M 280 340 Q 420 380 580 320 Q 700 350 850 310" stroke="#cbd5e1" strokeWidth="26" fill="none" />
            </g>
          )}

          {/* Optional Bortle Grid overlay */}
          {layersState.bortleGrid && (
            <g stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.4">
              <circle cx="560" cy="275" r="30" fill="none" />
              <circle cx="560" cy="275" r="60" fill="none" />
              <circle cx="560" cy="275" r="100" fill="none" />
              <line x1="560" y1="160" x2="560" y2="390" />
              <line x1="440" y1="275" x2="680" y2="275" />
            </g>
          )}
        </svg>

        {/* Observation Pins and Markers */}
        {layersState.markers && LOCATIONS_DATA.map((loc: ObservationLocation) => {
          const isSelected = selectedLocation?.id === loc.id;
          const isDark = loc.pollutionLevel === 'Low';
          const coords = getMarkerCoordinates(loc);
          
          return (
            <div
              key={loc.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectLocation && onSelectLocation(loc);
              }}
              className="interactive-marker absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group z-20"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
              }}
              onMouseEnter={() => {
                setHoveredPoint({
                  x: coords.x,
                  y: coords.y,
                  title: loc.name,
                  radiance: `${loc.pollutionScore * 0.4} nW/cm²/sr`,
                  bortle: `Bortle Class ${loc.bortleClass}`
                });
              }}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {/* Outer pulsing ring */}
              <div className={`absolute -inset-2 rounded-full animate-ping opacity-60 pointer-events-none ${
                isDark ? 'bg-sky-500' : 'bg-amber-500'
              }`} />

              {/* Pin Icon / Dot */}
              <div className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 shadow-lg transition-all duration-300 ${
                isSelected 
                  ? 'bg-sky-600 border-white scale-125 shadow-[0_0_20px_rgba(14,165,233,0.9)]' 
                  : isDark 
                    ? 'bg-indigo-900 border-sky-400 group-hover:scale-115 group-hover:border-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]' 
                    : 'bg-amber-950 border-amber-400 group-hover:scale-115 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
              }`}>
                {isDark ? (
                  <Sparkles className="w-3 h-3 text-sky-200" />
                ) : (
                  <MapPin className="w-3 h-3 text-amber-300" />
                )}
              </div>

              {/* Label below marker */}
              <div className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[11px] font-medium backdrop-blur-md border transition-all ${
                isSelected 
                  ? 'bg-slate-900 text-sky-200 border-sky-400 shadow-md' 
                  : 'bg-slate-900/80 text-slate-300 border-slate-700/60 opacity-80 group-hover:opacity-100 group-hover:bg-slate-900'
              }`}>
                {loc.name.split(',')[0]}
              </div>
            </div>
          );
        })}

        {/* If selectedLocation is a searched location not in LOCATIONS_DATA, render custom highlighted marker */}
        {layersState.markers && selectedLocation && !LOCATIONS_DATA.some(l => l.id === selectedLocation.id) && (() => {
          const coords = getMarkerCoordinates(selectedLocation);
          return (
            <div
              key={`selected-${selectedLocation.id || selectedLocation.name}`}
              className="interactive-marker absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group z-30"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
              }}
              onMouseEnter={() => {
                setHoveredPoint({
                  x: coords.x,
                  y: coords.y,
                  title: selectedLocation.name,
                  radiance: `${(selectedLocation.pollutionScore || 2.0) * 0.4} nW/cm²/sr`,
                  bortle: `Bortle Class ${selectedLocation.bortleClass || 3}`
                });
              }}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {/* Outer pulsing ring */}
              <div className="absolute -inset-3 rounded-full animate-ping opacity-80 pointer-events-none bg-sky-400" />
              {/* Pin Icon / Dot */}
              <div className="relative flex items-center justify-center w-7 h-7 rounded-full border-2 bg-sky-600 border-white scale-125 shadow-[0_0_24px_rgba(14,165,233,1)]">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              {/* Label */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[11px] font-semibold backdrop-blur-md border bg-sky-950/90 text-sky-200 border-sky-400 shadow-lg">
                📍 {selectedLocation.name}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Floating Heatmap Intensity Legend (Top Left) */}
      <div className="absolute top-4 left-4 z-30 bg-[#0d1424]/90 backdrop-blur-md border border-slate-800 rounded-lg p-3 shadow-xl max-w-[210px]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 mb-2">
          <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>Light pollution intensity</span>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.7)]" />
            <span className="text-slate-300">Low (Bortle 1-2)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
            <span className="text-slate-300">Moderate (Bortle 3-4)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
            <span className="text-slate-300">High (Bortle 5-7)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
            <span className="text-slate-300">Very High (Bortle 8-9)</span>
          </div>
        </div>
      </div>

      {/* Hover telemetry info box */}
      {hoveredPoint && (
        <div 
          className="absolute z-40 bg-[#090e1a]/95 backdrop-blur-md border border-sky-500/40 rounded-lg px-3 py-2 text-xs shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-16"
          style={{ left: `${hoveredPoint.x}%`, top: `${hoveredPoint.y}%` }}
        >
          <div className="font-semibold text-white">{hoveredPoint.title}</div>
          <div className="text-sky-300">{hoveredPoint.bortle}</div>
          <div className="text-slate-400 text-[10px]">Radiance: {hoveredPoint.radiance}</div>
        </div>
      )}

      {/* Map Control Buttons (Top Right) */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5 bg-[#0d1424]/90 backdrop-blur-md border border-slate-800 rounded-lg p-1 shadow-xl">
        <button 
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button 
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button 
          onClick={handleReset}
          title="Reset to Center"
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded transition-colors"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        <div className="h-[1px] bg-slate-800 my-0.5" />

        <div className="relative">
          <button 
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            title="Toggle Layers"
            className={`p-2 rounded transition-colors ${
              showLayerMenu ? 'text-sky-400 bg-slate-900/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Layer toggles popover */}
          {showLayerMenu && (
            <div className="absolute right-full mr-2 top-0 bg-[#0d1424]/95 backdrop-blur-xl border border-slate-800 rounded-lg p-2.5 shadow-2xl w-48 text-xs space-y-2">
              <div className="font-semibold text-slate-300 pb-1 border-b border-slate-800">
                Satellite Overlays
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={layersState.heatmap} 
                  onChange={(e) => setLayersState({ ...layersState, heatmap: e.target.checked })}
                  className="rounded border-slate-700 text-sky-500 focus:ring-0" 
                />
                <span>Pollution Heatmap</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={layersState.markers} 
                  onChange={(e) => setLayersState({ ...layersState, markers: e.target.checked })}
                  className="rounded border-slate-700 text-sky-500 focus:ring-0" 
                />
                <span>Observation Markers</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={layersState.clouds} 
                  onChange={(e) => setLayersState({ ...layersState, clouds: e.target.checked })}
                  className="rounded border-slate-700 text-sky-500 focus:ring-0" 
                />
                <span>Cloud Fraction</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={layersState.bortleGrid} 
                  onChange={(e) => setLayersState({ ...layersState, bortleGrid: e.target.checked })}
                  className="rounded border-slate-700 text-sky-500 focus:ring-0" 
                />
                <span>Bortle Concentric Grid</span>
              </label>
            </div>
          )}
        </div>

        <button 
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Satellite Telemetry Stamp (Bottom Left) */}
      <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2 text-[10px] text-slate-400 font-mono bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded border border-slate-800/80">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>VIIRS-DNB / Suomi NPP Night Radiance • 750m Resolution</span>
      </div>
    </div>
  );
};
