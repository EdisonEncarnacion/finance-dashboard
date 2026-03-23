import React, { useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import { formatCurrency } from '../utils/formatters';

export function CashFlowChart({ incomes = [], expenses = [], activeFilter = 'ESTE MES' }) {


    const aggregatedData = useMemo(() => {
        if ((!incomes || incomes.length === 0) && (!expenses || expenses.length === 0)) return [];
        const now = new Date();
        const grouped = {};

        // Initialize groups
        if (activeFilter === 'HOY') {
            for (let i = 0; i < 24; i++) grouped[`${i.toString().padStart(2, '0')}:00`] = { ingresos: 0, gastos: 0 };
        } else if (activeFilter === 'SEMANA') {
            ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].forEach(d => grouped[d] = { ingresos: 0, gastos: 0 });
        } else if (activeFilter === 'ESTE MES' || activeFilter === 'MES') {
            ['1', '7', '14', '21', '28'].forEach(day => grouped[day] = { ingresos: 0, gastos: 0 });
        } else if (activeFilter === 'ESTE AÑO' || activeFilter === 'AÑO') {
            ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].forEach(m => grouped[m] = { ingresos: 0, gastos: 0 });
        }

        const processItems = (items, type) => {
            items.forEach(item => {
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
                } else if (activeFilter === 'ESTE MES' || activeFilter === 'MES') {
                    if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                        const day = date.getDate();
                        if (day <= 7) key = '1';
                        else if (day <= 14) key = '7';
                        else if (day <= 21) key = '14';
                        else if (day <= 28) key = '21';
                        else key = '28';
                        include = true;
                    }
                } else if (activeFilter === 'ESTE AÑO' || activeFilter === 'AÑO') {
                    if (date.getFullYear() === now.getFullYear()) {
                        key = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][date.getMonth()];
                        include = true;
                    }
                }

                if (include && grouped[key]) {
                    grouped[key][type] += amount;
                }
            });
        };

        processItems(incomes, 'ingresos');
        processItems(expenses, 'gastos');

        return Object.entries(grouped).map(([name, values]) => ({ name, ...values }));
    }, [incomes, expenses, activeFilter]);

    if ((!incomes || incomes.length === 0) && (!expenses || expenses.length === 0)) {
        return (
            <div className="bg-[var(--color-card-bg)] rounded-3xl p-6 border border-[var(--color-border-dark)] h-full flex items-center justify-center min-h-[220px] col-span-1 md:col-span-2">
                <p className="text-slate-400">No hay datos de flujo de dinero para mostrar</p>
            </div>
        );
    }


    const getTicks = () => {
        const filter = activeFilter.toUpperCase();
        if (filter === 'HOY') return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
        if (filter === 'ESTE MES' || filter === 'MES') return ['1', '7', '14', '21', '28'];
        return undefined;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            const monthName = months[new Date().getMonth()];
            const displayLabel = (activeFilter === 'ESTE MES' || activeFilter === 'MES')
                ? `Semana del ${label} ${monthName}`
                : label;

            return (
                <div className="bg-[#0F172A]/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl shadow-2xl ring-1 ring-white/10">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b border-white/5">{displayLabel}</p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-8">
                            <span className="text-blue-400 text-xs font-semibold">Ingresos</span>
                            <span className="text-white font-bold">{formatCurrency(payload[1]?.value)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-8">
                            <span className="text-slate-400 text-xs font-semibold">Gastos</span>
                            <span className="text-slate-200 font-bold">{formatCurrency(payload[0]?.value)}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-[var(--color-card-bg)] rounded-3xl p-6 border border-[var(--color-border-dark)] shadow-sm hover:shadow-xl transition-shadow col-span-1 md:col-span-2 flex flex-col relative overflow-hidden group h-full">
            <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-white font-bold text-lg tracking-tight">Flujo de Dinero</h3>
                <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-[0.15em]">
                    <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]"></span>
                        <span className="text-slate-400">Ingresos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-500 border border-slate-400/20"></span>
                        <span className="text-slate-400">Gastos</span>
                    </div>
                </div>
            </div>

            <div className="w-full flex-1 min-h-[220px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={aggregatedData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                        <defs>
                            <linearGradient id="colorIncFlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpFlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#64748b" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="#64748b" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.3} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                            dy={10}
                            padding={{ left: 20, right: 20 }}
                            ticks={getTicks()}
                            interval={0}
                            tickFormatter={(tick) => {
                                const filter = activeFilter.toUpperCase();
                                if (filter === 'ESTE MES' || filter === 'MES') {
                                    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                                    return `${tick} ${months[new Date().getMonth()]}`;
                                }
                                return tick;
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1 }} />
                        <Area
                            type="monotone"
                            dataKey="gastos"
                            stroke="#64748b"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorExpFlow)"
                            animationDuration={1500}
                            activeDot={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="ingresos"
                            stroke="#3B82F6"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorIncFlow)"
                            animationDuration={1500}
                            activeDot={{ r: 8, strokeWidth: 0, fill: '#3B82F6' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
