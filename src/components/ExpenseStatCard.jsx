import React from 'react';
import { cn } from './Sidebar';
import { TrendingUp, Utensils } from 'lucide-react';

export function ExpenseStatCard({
    title,
    amount,
    trend,
    trendUp,
    subtitle,
    isLargeValue = true,
    icon: Icon
}) {
    return (
        <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)]/50 hover:border-slate-600 transition-all shadow-sm relative overflow-hidden group">
            <h3 className="text-slate-400 font-medium text-sm mb-4 relative z-10">{title}</h3>

            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-3">
                    <span className={cn(
                        "font-bold text-white tracking-tight",
                        isLargeValue ? "text-3xl" : "text-2xl"
                    )}>{amount}</span>
                    {Icon && <Icon className="text-red-400" size={24} />}
                </div>

                {trend && (
                    <span className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded inline-flex items-center gap-1",
                        trendUp ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-300"
                    )}>
                        {trendUp && <TrendingUp size={12} />}
                        {trend}
                    </span>
                )}
            </div>
            {subtitle && (
                <p className="text-slate-400 text-sm mt-1 relative z-10">{subtitle}</p>
            )}

            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-500/0 rounded-full blur-2xl group-hover:bg-red-500/5 transition-colors pointer-events-none"></div>
        </div>
    );
}
