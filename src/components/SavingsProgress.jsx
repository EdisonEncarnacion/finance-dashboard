import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function SavingsProgress({ dateFilter = 'mes', current, goal }) {
    const savingsData = {
        hoy: { current: 35, goal: 33 },
        semana: { current: 270, goal: 230 },
        mes: { current: 1150, goal: 1000 },
        año: { current: 13800, goal: 12000 },
    };

    const currentSavings = current !== undefined ? current : savingsData[dateFilter].current;
    const savingsGoal = goal !== undefined ? goal : savingsData[dateFilter].goal;

    const progressPercentage = Math.round((currentSavings / savingsGoal) * 100);
    const cappedProgress = Math.min(progressPercentage, 100);

    const data = [
        { name: 'Ahorrado', value: cappedProgress, color: '#22C55E' },
        { name: 'Restante', value: 100 - cappedProgress, color: '#334155' },
    ];

    return (
        <div className="bg-[var(--color-card-bg)] rounded-3xl p-6 border border-[var(--color-border-dark)] shadow-sm hover:shadow-xl transition-shadow col-span-1 flex flex-col items-center relative overflow-hidden h-full">
            <h3 className="text-white font-bold text-lg mb-4 w-full text-left">Progreso de Ahorro</h3>

            <div className="w-full relative flex flex-col items-center justify-center p-2" style={{ height: '220px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            startAngle={90}
                            endAngle={-270}
                            innerRadius={75}
                            outerRadius={95}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={20}
                            isAnimationActive={true}
                            animationDuration={1500}
                            animationEasing="ease-out"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-4xl font-black text-white">{progressPercentage}%</span>
                    <span className="text-[#94a3b8] text-[9px] font-bold uppercase tracking-widest mt-1">META ALCANZADA</span>
                </div>
            </div>

            <div className="mt-4 text-center">
                <p className="text-[#94a3b8] text-sm">
                    <span className="text-white font-bold">S/ {currentSavings.toLocaleString()}</span> ahorrados de S/ {savingsGoal.toLocaleString()}
                </p>
            </div>

            {progressPercentage >= 100 && (
                <div className="mt-4 bg-[#22C55E]/10 border border-[#22C55E]/20 px-6 py-1.5 rounded-full flex items-center justify-center">
                    <span className="text-[#22C55E] text-sm font-medium">Meta superada</span>
                </div>
            )}
        </div>
    );
}
