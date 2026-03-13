import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Comida', value: 45, color: '#EF4444' }, // Red
    { name: 'Transporte', value: 25, color: '#3B82F6' }, // Blue
    { name: 'Servicios', value: 15, color: '#F59E0B' }, // Yellow
];

export function ExpenseDonutChart() {
    return (
        <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)] h-full flex flex-col relative overflow-hidden group hover:border-slate-500 transition-colors">
            <div className="mb-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Gastos por Categoría</h3>
            </div>

            <div className="flex-1 min-h-[220px] relative mt-2">
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
                    <span className="text-2xl font-bold text-white tracking-tight mt-1">S/ 650</span>
                </div>
            </div>

            <div className="mt-4 space-y-3">
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
        </div>
    );
}
