import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

export function PageHero({ eyebrow, title, description, primaryAction, secondaryAction, icon: Icon, iconLabel, iconDesc }: {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: { label: string, to?: string, onClick?: () => void, href?: string };
  secondaryAction?: { label: string, to?: string, onClick?: () => void, href?: string };
  icon?: LucideIcon;
  iconLabel?: string;
  iconDesc?: string;
}) {
  return (
    <div className="bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 rounded-2xl p-8 md:p-10 text-white shadow-lg overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-white blur-3xl"></div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-brand-100">{eyebrow}</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">{title}</h1>
          <p className="text-brand-50/90 text-sm md:text-base leading-relaxed">{description}</p>
          
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {primaryAction && (
                <ActionButton action={primaryAction} primary />
              )}
              {secondaryAction && (
                <ActionButton action={secondaryAction} />
              )}
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="hidden md:flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[200px] border border-white/20">
            <div className="w-16 h-16 rounded-full bg-gold-400 flex items-center justify-center text-brand-900 mb-4 shadow-inner">
              <Icon size={32} />
            </div>
            <p className="font-semibold text-center">{iconLabel}</p>
            <p className="text-xs text-brand-100 text-center mt-1">{iconDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({ action, primary }: { action: any, primary?: boolean }) {
  const baseClass = "px-6 py-3 rounded-xl font-semibold transition-all inline-flex items-center justify-center text-sm md:text-base";
  const primaryClass = "bg-gold-400 hover:bg-gold-500 text-ink-900 shadow-sm";
  const secondaryClass = "bg-brand-600 hover:bg-brand-700 text-white shadow-sm border border-brand-500/30";
  
  const className = `${baseClass} ${primary ? primaryClass : secondaryClass}`;
  
  if (action.to) return <Link to={action.to} className={className}>{action.label}</Link>;
  if (action.href) return <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>{action.label}</a>;
  return <button onClick={action.onClick} className={className}>{action.label}</button>;
}

export function AlertBanner({ badge, title, action }: { badge: string; title: string; action?: { label: string, to: string } }) {
  return (
    <div className="bg-cream-100 border border-cream-300 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap">{badge}</span>
        <p className="text-ink-900 text-sm md:text-base font-medium">{title}</p>
      </div>
      {action && (
        <Link to={action.to} className="shrink-0 px-4 py-2 text-sm font-semibold text-brand-700 border border-brand-600 rounded-lg hover:bg-brand-50 transition-colors bg-white">
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function TopicCard({ icon: Icon, title, description, to }: { icon: LucideIcon, title: string, description: string, to: string }) {
  return (
    <Link to={to} className="block group">
      <div className="bg-surface-0 rounded-2xl border border-surface-100 shadow-sm p-6 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
        <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
          <Icon size={20} />
        </div>
        <h3 className="font-semibold text-ink-900 mb-2">{title}</h3>
        <p className="text-ink-500 text-xs leading-relaxed line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}

export function AccentCard({ label, title, description, action }: { label: string, title: string, description: string, action?: { label: string, to: string } }) {
  return (
    <div className="bg-cream-50 border-l-4 border-l-brand-600 rounded-r-2xl border-y border-r border-surface-100 p-6 h-full flex flex-col shadow-sm">
      <div className="inline-block mb-3">
        <span className="bg-white border border-surface-100 text-brand-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{label}</span>
      </div>
      <h3 className="text-xl font-bold text-brand-700 mb-2">{title}</h3>
      <p className="text-ink-700 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
      {action && (
        <Link to={action.to} className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-800">
          {action.label} <span className="ml-1">→</span>
        </Link>
      )}
    </div>
  );
}

export function VideoCard({ title, duration }: { title: string, duration: string }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-sm border border-surface-100 cursor-pointer h-full min-h-[200px] flex flex-col justify-center items-center bg-gradient-to-br from-brand-700 to-brand-900">
      <div className="w-14 h-14 rounded-full bg-gold-400 flex items-center justify-center text-brand-900 shadow-lg group-hover:scale-110 transition-transform">
        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white font-semibold text-sm">{title}</p>
        <p className="text-white/70 text-xs">{duration}</p>
      </div>
    </div>
  );
}

export function StatCard({ value, label }: { value: string, label: string }) {
  return (
    <div className="bg-surface-0 rounded-2xl border border-surface-100 p-5 shadow-sm text-center">
      <div className="text-2xl md:text-3xl font-bold text-brand-700 mb-1">{value}</div>
      <div className="text-xs text-ink-500 font-medium">{label}</div>
    </div>
  );
}

export function FlowChips({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className="bg-surface-0 border border-surface-100 rounded-lg px-3 py-1.5 text-xs font-medium text-ink-700 shadow-sm">
            {step}
          </div>
          {idx < steps.length - 1 && <span className="text-ink-300 text-sm">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export function RoadmapStepper({ steps }: { steps: string[] }) {
  return (
    <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex items-start min-w-max px-2">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center relative w-24">
            {idx < steps.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full border-t-2 border-dashed border-ink-300 -z-10"></div>
            )}
            <div className="bg-brand-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-surface-50 mb-3 z-10">
              {idx + 1}
            </div>
            <p className="text-xs font-medium text-ink-700 text-center leading-tight">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
