import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from './Sidebar';

export function ExpenseChart({ data: rawData = [] }) {
    const data = rawData.slice(-7).map(item => ({
        name: item.date ? new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : '',
        value: parseFloat(item.amount) || 0
    }));

    const [activeFilter, setActiveFilter] = useState('ESTE MES');

    return (
        <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)] h-full flex flex-col relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 relative z-10 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Gastos por Periodo</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    {['HOY', 'SEMANA', 'ESTE MES', 'ESTE AÑO'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300",
                                activeFilter === filter
                                    ? "bg-slate-700/80 text-white border border-slate-600 shadow-sm"
                                    : "text-slate-400 hover:text-white hover:bg-[var(--color-border-dark)] border border-transparent"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full min-h-[300px] relative z-10 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
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
                            stroke="#EF4444"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors pointer-events-none -z-0"></div>
        </div>
    );
}
