import React from 'react';
import { cn } from './Sidebar';
import { TrendingUp, TrendingDown, Target, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';


const icons = {
    income: { icon: Wallet, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    expense: { icon: TrendingDown, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    savingsGoal: { icon: Target, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    savings: { icon: Wallet, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
};

const cardData = {
    hoy: {
        income: { title: 'Ingreso hoy', amount: 'S/ 60', trend: '+1%', trendUp: true },
        expense: { title: 'Gastos hoy', amount: 'S/ 25', trend: '-1%', trendUp: false },
        savingsGoal: { title: 'Meta diaria', amount: 'S/ 33', trend: 'Objetivo', trendUp: true },
        savings: { title: 'Ahorro hoy', amount: 'S/ 35', trend: '+2%', trendUp: true },
    },
    semana: {
        income: { title: 'Ingreso semanal', amount: 'S/ 450', trend: '+2%', trendUp: true },
        expense: { title: 'Gastos de la semana', amount: 'S/ 180', trend: '-5%', trendUp: false },
        savingsGoal: { title: 'Meta semanal', amount: 'S/ 230', trend: 'Objetivo', trendUp: true },
        savings: { title: 'Ahorro semanal', amount: 'S/ 270', trend: '+4%', trendUp: true },
    },
    mes: {
        income: { title: 'Ingreso mensual', amount: 'S/ 1,800', trend: '+5%', trendUp: true },
        expense: { title: 'Gastos del mes', amount: 'S/ 650', trend: '-2%', trendUp: false },
        savingsGoal: { title: 'Meta de ahorro', amount: 'S/ 1,000', trend: 'Objetivo', trendUp: true },
        savings: { title: 'Ahorro actual', amount: 'S/ 1,150', trend: '+12%', trendUp: true },
    },
    año: {
        income: { title: 'Ingreso anual', amount: 'S/ 21,600', trend: '+15%', trendUp: true },
        expense: { title: 'Gastos del año', amount: 'S/ 7,800', trend: '-8%', trendUp: false },
        savingsGoal: { title: 'Meta anual', amount: 'S/ 12,000', trend: 'Objetivo', trendUp: true },
        savings: { title: 'Ahorro anual', amount: 'S/ 13,800', trend: '+25%', trendUp: true },
    }
}

export function StatCard({
    type,
    dateFilter = 'mes',
    value,
    title: propTitle,
    icon: propIcon,
    trend: propTrend,
    trendUp: propTrendUp,
    subtitle,
    progress
}) {
    // Determine data source: either from props or from type-based lookup
    const typeData = type ? icons[type] : null;
    const mockData = (type && cardData[dateFilter]) ? cardData[dateFilter][type] : null;

    const Icon = propIcon || (typeData ? typeData.icon : Wallet);
    const color = typeData ? typeData.color : 'text-blue-400';
    const bg = typeData ? typeData.bg : 'bg-blue-400/10';

    const title = propTitle || (mockData ? mockData.title : 'Estadística');
    const trend = propTrend !== undefined ? propTrend : (mockData ? mockData.trend : null);
    const trendUp = propTrendUp !== undefined ? propTrendUp : (mockData ? mockData.trendUp : true);
    const amount = value !== undefined ? value : (mockData ? mockData.amount : formatCurrency(0));

    return (
        <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)] hover:border-slate-500 transition-all hover:shadow-lg relative overflow-hidden group flex flex-col justify-between h-full min-h-[110px]">
            {/* Decorative background glow similar to IncomeStatCard */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={cn("p-3 rounded-2xl", bg)}>
                    <Icon size={24} className={color} />
                </div>
                {trend && (
                    <div className={cn(
                        "flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full transition-colors",
                        trendUp ? "text-emerald-400 bg-emerald-400/10" : "text-orange-400 bg-orange-400/10"
                    )}>
                        {trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{trend}</span>
                    </div>
                )}
            </div>

            <div className="relative z-10 flex flex-col">
                <p className="text-slate-400 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight">{amount}</h3>
                {subtitle && <p className="text-slate-400 text-xs mt-1">{subtitle}</p>}

                {progress !== undefined && progress !== null && (
                    <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden relative transition-all">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-500",
                                progress < 30 ? "bg-red-500" : progress <= 70 ? "bg-yellow-500" : "bg-green-500"
                            )}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
