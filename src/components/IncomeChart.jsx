import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from './Sidebar';

export function IncomeChart({ data: rawData = [], total: propTotal, growth }) {
    const data = rawData.slice(-7).map(item => ({
        name: item.date ? new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : '',
        value: parseFloat(item.amount) || 0
    }));

    const [activeFilter, setActiveFilter] = useState('ESTE MES');

    const now = new Date();
    const currentYear = now.getFullYear();
    const periodLabel = `Enero - ${now.toLocaleDateString('es-ES', { month: 'long' })} ${currentYear}`;

    const displayTotal = propTotal !== undefined ? propTotal : data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)] h-full flex flex-col relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 relative z-10 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Ingresos por Mes</h3>
                    <p className="text-sm text-slate-400 mt-1 capitalize">{periodLabel}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {['HOY', 'ESTA SEMANA', 'ESTE MES', 'ESTE AÑO'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300",
                                activeFilter === filter
                                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                                    : "text-slate-400 hover:text-white hover:bg-[var(--color-border-dark)]"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="text-right">
                    <p className="text-2xl font-bold text-white tracking-tight">S/ {displayTotal.toLocaleString()}</p>
                    {growth !== undefined && (
                        <p className={cn(
                            "text-sm font-medium",
                            growth >= 0 ? "text-green-500" : "text-red-500"
                        )}>
                            {growth >= 0 ? '+' : ''}{growth}% vs prev.
                        </p>
                    )}
                </div>
            </div>

            <div className="flex-1 w-full min-h-[300px] relative z-10 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                            dy={10}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[var(--color-sidebar-bg)] border border-[var(--color-border-dark)] p-3 rounded-xl shadow-xl">
                                            <p className="text-slate-400 text-xs mb-1 font-medium">{payload[0].payload.name || 'Detalle'}</p>
                                            <p className="text-white font-bold text-lg">
                                                S/ {payload[0].value.toLocaleString()}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
