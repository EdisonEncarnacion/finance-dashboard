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
        <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)]/50 hover:border-slate-600 transition-all shadow-sm relative overflow-hidden group flex flex-col justify-between h-full min-h-[110px]">
            <div className="flex items-start justify-between relative z-10 mb-4">
                <h3 className="text-slate-400 font-medium text-sm">{title}</h3>
                {trend && (
                    <span className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded inline-flex items-center gap-1 shrink-0 ml-2",
                        trendUp ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-300"
                    )}>
                        {trendUp && <TrendingUp size={12} />}
                        {trend}
                    </span>
                )}
            </div>

            <div className="relative z-10 flex flex-col">
                <div className="flex items-center space-x-3">
                    <span className={cn(
                        "font-bold text-white tracking-tight",
                        isLargeValue ? "text-3xl" : "text-2xl"
                    )}>{amount}</span>
                    {Icon && <Icon className="text-red-400" size={24} />}
                </div>
                {subtitle && (
                    <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
                )}
            </div>

            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-500/0 rounded-full blur-2xl group-hover:bg-red-500/5 transition-colors pointer-events-none"></div>
        </div>
    );
}
