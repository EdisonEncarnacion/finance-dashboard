import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const chartData = {
    hoy: [
        { name: '08:00', ingresos: 0, gastos: 5 },
        { name: '10:00', ingresos: 60, gastos: 10 },
        { name: '12:00', ingresos: 60, gastos: 25 },
        { name: '14:00', ingresos: 60, gastos: 25 },
        { name: '18:00', ingresos: 60, gastos: 25 },
    ],
    semana: [
        { name: 'LUN', ingresos: 120, gastos: 40 },
        { name: 'MAR', ingresos: 120, gastos: 55 },
        { name: 'MIÉ', ingresos: 450, gastos: 90 },
        { name: 'JUE', ingresos: 450, gastos: 110 },
        { name: 'VIE', ingresos: 450, gastos: 150 },
        { name: 'SÁB', ingresos: 450, gastos: 180 },
        { name: 'DOM', ingresos: 450, gastos: 180 },
    ],
    mes: [
        { name: '1', ingresos: 500, gastos: 120 },
        { name: '5', ingresos: 500, gastos: 250 },
        { name: '10', ingresos: 500, gastos: 350 },
        { name: '15', ingresos: 1800, gastos: 450 },
        { name: '20', ingresos: 1800, gastos: 520 },
        { name: '25', ingresos: 1800, gastos: 600 },
        { name: '30', ingresos: 1800, gastos: 650 },
    ],
    año: [
        { name: 'ENE', ingresos: 1800, gastos: 600 },
        { name: 'FEB', ingresos: 3600, gastos: 1250 },
        { name: 'MAR', ingresos: 5400, gastos: 1900 },
        { name: 'ABR', ingresos: 7200, gastos: 2600 },
        { name: 'MAY', ingresos: 9000, gastos: 3200 },
        { name: 'JUN', ingresos: 10800, gastos: 3850 },
    ]
};

export function CashFlowChart({ dateFilter = 'mes' }) {
    const data = chartData[dateFilter];

    return (
        <div className="bg-[var(--color-card-bg)] rounded-3xl p-6 border border-[var(--color-border-dark)] shadow-sm hover:shadow-xl transition-shadow col-span-1 md:col-span-2 flex flex-col relative overflow-hidden group h-full">
            <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-white font-bold text-lg">Flujo de Dinero</h3>
                <div className="flex items-center space-x-6 text-xs font-medium uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"></span>
                        <span className="text-slate-400">Ingresos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                        <span className="text-slate-400">Gastos</span>
                    </div>
                </div>
            </div>

            <div className="w-full flex-1 min-h-[220px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                            dy={10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--color-sidebar-bg)',
                                borderColor: 'var(--color-border-dark)',
                                borderRadius: '12px',
                                color: '#fff',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}
                            labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontSize: '12px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="gastos"
                            stroke="#64748b"
                            strokeWidth={3}
                            fill="transparent"
                            activeDot={{ r: 6, fill: '#64748b', stroke: '#1E293B', strokeWidth: 2 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="ingresos"
                            stroke="var(--color-accent)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIngresos)"
                            activeDot={{ r: 6, fill: 'var(--color-accent)', stroke: '#1E293B', strokeWidth: 2, className: 'shadow-[0_0_10px_var(--color-accent)]' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
