import React from 'react';
import { cn } from './Sidebar';
import { TrendingUp } from 'lucide-react';

export function IncomeStatCard({
    title,
    amount,
    trend,
    trendUp,
    subtitle,
    isLargeValue = true
}) {
    return (
        <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)] hover:border-slate-500 transition-all hover:shadow-lg relative overflow-hidden group">
            <h3 className="text-slate-400 font-medium text-sm mb-4 relative z-10">{title}</h3>

            <div className="flex items-center justify-between relative z-10">
                <span className={cn(
                    "font-bold text-white tracking-tight",
                    isLargeValue ? "text-3xl" : "text-2xl"
                )}>{amount}</span>

                {trend && (
                    <span className={cn(
                        "text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1",
                        trendUp ? "bg-green-500/5 text-green-500" : "bg-red-500/5 text-red-500"
                    )}>
                        {trendUp && <TrendingUp size={12} />}
                        {trend}
                    </span>
                )}
            </div>
            {subtitle && (
                <p className="text-slate-400 text-sm mt-1 relative z-10">{subtitle}</p>
            )}

            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>
        </div>
    );
}
