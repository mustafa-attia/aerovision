import React from 'react';
import {
  Bell,
  X,
  Satellite,
  Sparkles,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNotificationAction?: (locationId: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectNotificationAction,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Pristine Dark Sky Window Tonight',
      message: 'Taba & Sinai Peninsula forecast: Zero cloud cover and 0.8" arcsecond astronomical seeing from 21:00 to 03:30.',
      time: '12m ago',
      type: 'opportunity',
      locationId: 'taba-egypt',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'VIIRS-DNB Radiance Pass Ingested',
      message: 'NOAA-20 completed descending node orbit #32810. Calibrated radiance matrix updated for 42 regional observation reserves.',
      time: '34m ago',
      type: 'satellite',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'High Urban Skyglow Warning',
      message: 'Greater Cairo and Nile Valley radiance reading spiked to 8.6 nW/cm²/sr due to seasonal atmospheric haze and low-inversion lighting.',
      time: '2h ago',
      type: 'alert',
      locationId: 'cairo-city-egypt',
      unread: false,
    },
    {
      id: 'notif-4',
      title: 'Wadi Rum International Dark Sky Status',
      message: 'New baseline Bortle-1 measurements logged. Highest observation quality score in the region (9.4/10).',
      time: '5h ago',
      type: 'opportunity',
      locationId: 'wadi-rum-jordan',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="notification-drawer"
        className="w-full max-w-md bg-[#0F1423] border-l border-slate-800 shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-200"
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-white text-sm font-['Plus_Jakarta_Sans']">
              Mission Alerts & Satellite Passes
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border transition-all text-xs ${
                n.unread
                  ? 'bg-slate-900/60 border-slate-700/80'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  {n.type === 'opportunity' ? (
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  ) : n.type === 'satellite' ? (
                    <Satellite className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  <span>{n.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {n.time}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed mb-2.5">{n.message}</p>
              {n.locationId && onSelectNotificationAction && (
                <button
                  onClick={() => {
                    onSelectNotificationAction(n.locationId);
                    onClose();
                  }}
                  className="flex items-center gap-1 text-[11px] font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                >
                  <span>Inspect Observation Site</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-800 bg-[#0B0F19] text-center text-[11px] text-slate-400">
          Telemetry feeds connected to NASA / NOAA JPSS VIIRS
        </div>
      </div>
    </div>
  );
};
