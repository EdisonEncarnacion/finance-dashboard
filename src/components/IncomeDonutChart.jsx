import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/formatters';

export function IncomeDonutChart({ data: rawData = [] }) {
    if (!rawData || !rawData.length) {
        return (
            <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)] h-full flex flex-col relative overflow-hidden group hover:border-slate-500 transition-colors items-center justify-center min-h-[250px]">
                <p className="text-slate-400">No hay datos de ingresos para mostrar</p>
            </div>
        );
    }
    const totalAmount = rawData.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

    // Group by source
    const sourcesMap = rawData.reduce((acc, item) => {
        const source = item.source || item.category || 'Otros';
        acc[source] = (acc[source] || 0) + (parseFloat(item.amount) || 0);
        return acc;
    }, {});

    const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];
    const data = Object.keys(sourcesMap).map((name, index) => ({
        name,
        value: totalAmount > 0 ? Math.round((sourcesMap[name] / totalAmount) * 100) : 0,
        amount: sourcesMap[name],
        color: colors[index % colors.length]
    }));

    const total = totalAmount;

    return (
        <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)] h-full flex flex-col relative overflow-hidden group hover:border-slate-500 transition-colors">
            <div className="mb-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Ingresos por Categoría</h3>
            </div>

            <div className="flex-1 min-h-[250px] relative mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[var(--color-sidebar-bg)] border border-[var(--color-border-dark)] p-3 rounded-xl shadow-xl">
                                            <p className="text-slate-400 text-xs mb-1 font-medium">{payload[0].name}</p>
                                            <p className="text-white font-bold">
                                                {payload[0].value}%
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-4">
                    <span className="text-xs text-slate-400 font-semibold tracking-wider">TOTAL</span>
                    <span className="text-2xl font-bold text-white tracking-tight mt-1">{formatCurrency(total)}</span>
                </div>
            </div>

            <div className="mt-8 space-y-4">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm group-hover:translate-x-1 transition-transform">
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-3 h-3 rounded-full shadow-sm"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-slate-300 font-medium">{item.name}</span>
                        </div>
                        <span className="text-white font-bold">{item.value}%</span>
                    </div>
                ))}
            </div>

            <div className="absolute -left-12 -top-12 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors pointer-events-none"></div>
        </div>
    );
}
