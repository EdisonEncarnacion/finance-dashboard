import React from 'react';
import { cn } from './Sidebar';
import { TrendingUp } from 'lucide-react';

export function IncomeStatCard({
    title,
    amount,
    trend,
    trendUp,
    subtitle,
    isLargeValue = true,
    progress = null
}) {
    return (
        <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)] hover:border-slate-500 transition-all hover:shadow-lg relative overflow-hidden group flex flex-col justify-between h-full min-h-[110px]">
            <div className="flex items-start justify-between relative z-10 mb-4">
                <h3 className="text-slate-400 font-medium text-sm">{title}</h3>
                {trend && (
                    <span className={cn(
                        "text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shrink-0 ml-2",
                        trendUp ? "bg-green-500/5 text-green-500" : "bg-red-500/5 text-red-500"
                    )}>
                        {trendUp && <TrendingUp size={12} />}
                        {trend}
                    </span>
                )}
            </div>

            <div className="relative z-10 flex flex-col">
                <span className={cn(
                    "font-bold text-white tracking-tight",
                    isLargeValue ? "text-3xl" : "text-2xl"
                )}>{amount}</span>
                {subtitle && (
                    <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
                )}
            </div>

            {progress !== null && (
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden relative z-10 transition-all">
                    <div
                        className={cn(
                            "h-full rounded-full transition-all duration-500",
                            progress < 30 ? "bg-red-500" : progress <= 70 ? "bg-yellow-500" : "bg-green-500"
                        )}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
            )}

            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>
        </div>
    );
}
