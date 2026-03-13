import React from 'react';

export function IncomeTransactionsTable({ transactions = [] }) {
    return (
        <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border-dark)] overflow-hidden hover:border-slate-500 transition-colors group">
            <div className="p-6 border-b border-[var(--color-border-dark)] flex justify-between items-center relative z-10">
                <h3 className="text-xl font-bold text-white tracking-tight">Transacciones de Ingresos</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Ver todo
                </button>
            </div>

            <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left text-sm">
                    <thead className="text-xs text-slate-400 uppercase border-b border-[var(--color-border-dark)]">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">Fecha</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Fuente</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Descripción</th>
                            <th className="px-6 py-4 font-semibold tracking-wider text-right">Monto</th>
                            <th className="px-6 py-4 font-semibold tracking-wider text-center">Tipo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border-dark)] text-slate-300">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="transition-colors group/row">
                                <td className="px-6 py-5 whitespace-nowrap text-slate-400">{tx.date}</td>
                                <td className="px-6 py-5 whitespace-nowrap font-medium text-white">{tx.source}</td>
                                <td className="px-6 py-5">{tx.description}</td>
                                <td className="px-6 py-5 whitespace-nowrap text-right font-bold text-blue-400">
                                    S/ {tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-center">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                                        {tx.type}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {transactions.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                    No hay transacciones de ingresos recientes.
                </div>
            )}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/20 rounded-full blur-3xl group-hover:bg-slate-800/30 transition-colors pointer-events-none -z-0"></div>
        </div>
    );
}
