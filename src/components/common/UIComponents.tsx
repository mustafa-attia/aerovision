import React from 'react';
import { LightPollutionLevel } from '../../types';

interface BadgeProps {
  level?: LightPollutionLevel;
  text?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'blue';
  className?: string;
  dot?: boolean;
}

export const PollutionBadge: React.FC<BadgeProps> = ({ 
  level, 
  text, 
  variant, 
  className = '', 
  dot = true 
}) => {
  let colorStyles = 'bg-slate-900/80 text-slate-300 border-slate-700/60 shadow-sm';
  let dotColor = 'bg-slate-400';
  const label = text || level || 'Unknown';

  if (level === 'Low' || variant === 'success') {
    colorStyles = 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(52,211,153,0.2)]';
    dotColor = 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]';
  } else if (level === 'Moderate' || variant === 'warning') {
    colorStyles = 'bg-amber-950/70 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(251,191,36,0.2)]';
    dotColor = 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]';
  } else if (level === 'High' || variant === 'danger') {
    colorStyles = 'bg-orange-950/70 text-orange-300 border-orange-500/40 shadow-[0_0_12px_rgba(251,146,60,0.2)]';
    dotColor = 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.9)]';
  } else if (level === 'Very High') {
    colorStyles = 'bg-rose-950/70 text-rose-300 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.25)]';
    dotColor = 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.9)]';
  } else if (variant === 'blue') {
    colorStyles = 'bg-sky-950/70 text-sky-300 border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]';
    dotColor = 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium font-telemetry tracking-wide border backdrop-blur-md transition-all ${colorStyles} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />}
      <span>{label}</span>
    </span>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
  id?: string;
}

export const GlassCard: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  glow = false, 
  onClick,
  id 
}) => {
  return (
    <div 
      id={id}
      onClick={onClick}
      className={`relative bg-[#070d1e]/85 backdrop-blur-xl border border-slate-800/90 rounded-2xl transition-all duration-300 ${
        glow 
          ? 'hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] hover:-translate-y-0.5' 
          : 'hover:border-slate-700/80 hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)]'
      } ${onClick ? 'cursor-pointer active:scale-[0.99]' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  level?: string;
  scoreColor?: string;
  percentage?: number;
  id?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  scoreColor = 'text-sky-400',
  percentage,
  id
}) => {
  return (
    <div 
      id={id} 
      className="group relative bg-[#070d1e]/80 backdrop-blur-xl border border-slate-800/80 hover:border-sky-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(14,165,233,0.15)] hover:-translate-y-1"
    >
      <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
        <span className="tracking-wider uppercase text-slate-400 font-mono text-[11px] font-semibold">{title}</span>
        {icon && (
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 group-hover:text-sky-400 group-hover:border-sky-500/30 group-hover:bg-sky-950/40 transition-all duration-300">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2.5">
        <span className="text-3xl font-extrabold tracking-tight text-white font-telemetry">{value}</span>
        {subtitle && <span className="text-xs text-slate-400 font-normal">{subtitle}</span>}
      </div>
      {percentage !== undefined && (
        <div className="mt-4 w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
          <div 
            className={`h-full rounded-full transition-all duration-700 ${scoreColor.replace('text-', 'bg-')} shadow-[0_0_8px_rgba(56,189,248,0.6)]`} 
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }} 
          />
        </div>
      )}
    </div>
  );
};

interface AerospaceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const AerospaceButton: React.FC<AerospaceButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const base = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer overflow-hidden";
  
  const sizeMap = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-xs sm:text-sm gap-2",
    lg: "px-7 py-3.5 text-sm sm:text-base gap-2.5 font-bold"
  };

  const variantMap = {
    primary: "bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-600 hover:from-sky-500 hover:via-indigo-500 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.35)] border border-sky-400/50 hover:shadow-[0_0_28px_rgba(56,189,248,0.55)] hover:scale-[1.02]",
    secondary: "bg-[#0b1328] hover:bg-[#121d3b] text-slate-200 border border-slate-700/80 hover:border-sky-500/40 shadow-md hover:text-white",
    outline: "bg-transparent hover:bg-sky-950/40 text-slate-300 hover:text-white border border-slate-700/80 hover:border-sky-500/60 shadow-sm",
    ghost: "bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-white",
    neon: "bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-black font-extrabold shadow-[0_0_25px_rgba(6,182,212,0.6)] border border-cyan-300"
  };

  return (
    <button 
      className={`${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
