import React from 'react';
import { ExternalLink, Info, MapPin } from 'lucide-react';

interface Props {
  latitude: number;
  longitude: number;
  locationName: string;
}

/**
 * The authoritative light-pollution visualization is hosted by lightpollutionmap.info.
 * Aero Clear does not scrape or fabricate raster values. This embedded view exposes the
 * source map directly, which currently publishes NASA VIIRS Black Marble-derived layers.
 */
export const VerifiedLightPollutionMap: React.FC<Props> = ({ latitude, longitude, locationName }) => {
  const mapUrl = `https://www.lightpollutionmap.info/#zoom=7&lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#050A15] shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 border-b border-slate-800 bg-[#080F20]">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <MapPin className="w-4 h-4 text-sky-400" />
            Verified light-pollution source · {locationName}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            External source view. Aero Clear does not invent or interpolate a radiance value here.
          </p>
        </div>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-700/60 bg-sky-950/50 text-sky-300 text-xs font-medium hover:bg-sky-900/60"
        >
          Open source map <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
      <div className="h-[420px] bg-black">
        <iframe
          title={`Light pollution map for ${locationName}`}
          src={mapUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="px-4 py-3 border-t border-slate-800 bg-[#070D1A] flex gap-2 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
        <span>
          The source map documents VIIRS / NASA Black Marble-derived light-pollution layers. Its displayed values are not treated as Aero Clear measurements unless they are explicitly available to the application.
        </span>
      </div>
    </div>
  );
};
