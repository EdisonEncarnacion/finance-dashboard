import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cn } from './Sidebar';
import { formatCurrency } from '../utils/formatters';

export function ExpenseChart({ data: rawData = [] }) {
    const [activeFilter, setActiveFilter] = useState('ESTE MES');

    if (!rawData || !rawData.length) {
        return (
            <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-border-dark)] h-full flex items-center justify-center min-h-[300px]">
                <p className="text-slate-400">No hay datos para mostrar</p>
            </div>
        );
    }


    const aggregatedData = useMemo(() => {
        const now = new Date();
        const grouped = {};

        // Initialize groups based on filter
        if (activeFilter === 'HOY') {
            for (let i = 0; i < 24; i++) grouped[`${i.toString().padStart(2, '0')}:00`] = 0;
        } else if (activeFilter === 'SEMANA') {
            ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].forEach(d => grouped[d] = 0);
        } else if (activeFilter === 'ESTE MES') {
            // Aggregate in 5 weekly points for cleaner fintech waves
            [1, 7, 14, 21, 28].forEach(day => grouped[day] = 0);
        } else if (activeFilter === 'ESTE AÑO') {
            ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].forEach(m => grouped[m] = 0);
        }

        // Aggregate data
        rawData.forEach(item => {
            if (!item.date) return;
            const date = new Date(item.date);
            const amount = parseFloat(item.amount) || 0;

            let key;
            let include = false;

            if (activeFilter === 'HOY') {
                if (date.toDateString() === now.toDateString()) {
                    key = `${date.getHours().toString().padStart(2, '0')}:00`;
                    include = true;
                }
            } else if (activeFilter === 'SEMANA') {
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
                startOfWeek.setHours(0, 0, 0, 0);
                if (date >= startOfWeek) {
                    key = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'][date.getDay()];
                    include = true;
                }
            } else if (activeFilter === 'ESTE MES') {
                if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                    const day = date.getDate();
                    if (day <= 7) key = 1;
                    else if (day <= 14) key = 7;
                    else if (day <= 21) key = 14;
                    else if (day <= 28) key = 21;
                    else key = 28; // Group remaining days into the last point
                    include = true;
                }
            } else if (activeFilter === 'ESTE AÑO') {
                if (date.getFullYear() === now.getFullYear()) {
                    key = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][date.getMonth()];
                    include = true;
                }
            }

            if (include && grouped[key] !== undefined) {
                grouped[key] += amount;
            }
        });

        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    }, [rawData, activeFilter]);

    const getTicks = () => {
        if (activeFilter === 'HOY') return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
        if (activeFilter === 'ESTE MES') return ['1', '7', '14', '21', '28'];
        return undefined;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const getLabel = () => {
                if (activeFilter === 'SEMANA') return label;
                if (activeFilter === 'ESTE MES') {
                    const now = new Date();
                    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                    return `Semana del ${label} ${months[now.getMonth()]}`;
                }
                return label;
            };

            return (
                <div className="bg-[#0F172A]/90 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl shadow-2xl ring-1 ring-white/10">
                    <p className="text-white font-bold text-lg tracking-tight">
                        {formatCurrency(payload[0].value)}
                    </p>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">
                        {getLabel()}
                    </p>
                </div>
            );
        }
        return null;
    };

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
                                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                                    : "text-slate-400 hover:text-white hover:bg-[var(--color-border-dark)]"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full min-h-[300px] relative z-10 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={aggregatedData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                        <defs>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#EF4444" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.3} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                            dy={10}
                            padding={{ left: 20, right: 20 }}
                            ticks={getTicks()}
                            interval={0}
                            tickFormatter={(tick) => {
                                if (activeFilter === 'ESTE MES') {
                                    const now = new Date();
                                    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                                    return `${tick} ${months[now.getMonth()]}`;
                                }
                                return tick;
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1 }} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#EF4444"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                            animationDuration={1500}
                            animationEasing="ease-in-out"
                            activeDot={{ r: 8, strokeWidth: 0, fill: '#EF4444' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors pointer-events-none -z-0"></div>
        </div>
    );
}
