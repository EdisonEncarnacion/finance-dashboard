import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function ExpenseDonutChart({ data: rawData = [] }) {
    const totalAmount = rawData.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

    // Group by category
    const categoriesMap = rawData.reduce((acc, item) => {
        const cat = item.category || 'Otros';
        acc[cat] = (acc[cat] || 0) + (parseFloat(item.amount) || 0);
        return acc;
    }, {});

    const colors = ['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6'];
    const data = Object.keys(categoriesMap).map((name, index) => ({
        name,
        value: totalAmount > 0 ? Math.round((categoriesMap[name] / totalAmount) * 100) : 0,
        amount: categoriesMap[name],
        color: colors[index % colors.length]
    }));
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
                    <span className="text-2xl font-bold text-white tracking-tight mt-1">S/ {totalAmount.toLocaleString()}</span>
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
