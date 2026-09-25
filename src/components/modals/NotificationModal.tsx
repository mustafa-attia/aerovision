import React from 'react';
import { X, Bell, Sparkles, CloudSun, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewLocation?: (locationId: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onViewLocation
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Optimal Stargazing Window Tonight',
      location: 'Taba, South Sinai',
      locationId: 'taba-egypt',
      time: '12m ago',
      type: 'optimal',
      message: 'Cloud cover forecasted <4% with peak atmospheric transparency (AOD 0.04) between 21:00 and 03:00.',
      icon: Sparkles,
      color: 'text-sky-400 bg-slate-900/80 border-slate-700/80'
    },
    {
      id: '2',
      title: 'Satellite Telemetry Refreshed',
      location: 'VIIRS-DNB / NOAA-20',
      locationId: '',
      time: '1h ago',
      type: 'system',
      message: 'New orbital pass radiometric calibration completed. Middle East night light radiance gridding updated to 750m mesh.',
      icon: CheckCircle2,
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30'
    },
    {
      id: '3',
      title: 'Urban Skyglow Advisory',
      location: 'Greater Cairo Region',
      locationId: 'cairo-urban-reference',
      time: '3h ago',
      type: 'alert',
      message: 'High humidity inversion layer concentrating artificial sky brightness. Stargazing within 45km not recommended.',
      icon: AlertTriangle,
      color: 'text-amber-400 bg-amber-950/60 border-amber-500/30'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b101e] border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl relative text-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0e1424]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-800/60 text-sky-300 border border-slate-700/80">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Orbital & Field Alerts</h3>
              <p className="text-[11px] text-slate-400">Live observation conditions and satellite alerts</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="p-3.5 rounded-xl bg-[#0e1628]/80 border border-slate-800/90 hover:border-slate-700 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`p-1 rounded-md border ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-semibold text-white">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                </div>
                <div className="text-xs text-slate-300 pl-7 leading-relaxed">
                  {item.message}
                </div>
                <div className="flex items-center justify-between pl-7 pt-1">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Source: {item.location}
                  </span>
                  {item.locationId && onViewLocation && (
                    <button
                      onClick={() => {
                        onViewLocation(item.locationId);
                        onClose();
                      }}
                      className="text-[11px] text-sky-400 hover:text-sky-300 font-medium hover:underline"
                    >
                      View Area →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#0a0f1d] flex items-center justify-between text-xs text-slate-400">
          <span>Real-time orbital tracking active</span>
          <button 
            onClick={onClose}
            className="text-sky-400 hover:text-sky-300 font-medium"
          >
            Mark all read
          </button>
        </div>
      </div>
    </div>
  );
};
