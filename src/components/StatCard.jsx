import React from 'react';
import { cn } from './Sidebar';
import { TrendingUp, TrendingDown, Target, Wallet } from 'lucide-react';

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

export function StatCard({ type, dateFilter = 'mes' }) {
    const { icon: Icon, color, bg } = icons[type];
    const { title, amount, trend, trendUp } = cardData[dateFilter][type];

    return (
        <div className="bg-[var(--color-card-bg)] rounded-3xl p-6 border border-[var(--color-border-dark)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            {/* Decorative gradient blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={cn("p-3 rounded-2xl", bg)}>
                    <Icon size={24} className={color} />
                </div>
                {trend && (
                    <div className={cn(
                        "flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full transition-colors duration-300",
                        trendUp ? "text-emerald-400 bg-emerald-400/10" : "text-orange-400 bg-orange-400/10"
                    )}>
                        {trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{trend}</span>
                    </div>
                )}
            </div>

            <div className="space-y-1 relative z-10 overflow-hidden">
                <p className="text-slate-400 text-sm font-medium transition-all duration-300 transform">{title}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight transition-all duration-500 transform">{amount}</h3>
            </div>
        </div>
    );
}
