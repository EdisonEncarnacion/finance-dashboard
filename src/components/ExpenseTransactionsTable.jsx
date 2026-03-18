import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatters';

export function ExpenseTransactionsTable({ transactions = [] }) {
    const [showAll, setShowAll] = useState(false);

    const sortedTransactions = [...transactions].sort((a, b) =>
        new Date(b.date || b.created_at) - new Date(a.date || a.created_at)
    );

    const displayTransactions = showAll ? sortedTransactions : sortedTransactions.slice(0, 6);

    return (
        <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border-dark)] overflow-hidden shadow-sm">
            <div className="p-6 border-b border-[var(--color-border-dark)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-xl font-bold text-white tracking-tight">Transacciones de Gastos</h3>
                {!showAll && sortedTransactions.length > 6 && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Ver todo
                    </button>
                )}
            </div>

            <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left text-sm">
                    <thead className="text-xs text-slate-400 uppercase border-b border-[var(--color-border-dark)]">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">Fecha</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Categoría</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Descripción</th>
                            <th className="px-6 py-4 font-semibold tracking-wider text-right">Monto</th>
                            <th className="px-6 py-4 font-semibold tracking-wider text-center">Tipo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border-dark)] text-slate-300">
                        {displayTransactions.map((tx) => (
                            <tr key={tx.id} className="transition-colors group/row">
                                <td className="px-6 py-5 whitespace-nowrap text-slate-400">
                                    {tx.date ? new Date(tx.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : tx.date}
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap font-medium text-white">{tx.category}</td>
                                <td className="px-6 py-5">{tx.description}</td>
                                <td className="px-6 py-5 whitespace-nowrap text-right font-bold text-red-400">
                                    {formatCurrency(tx.amount)}
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-center">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
                                        {tx.type}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Empty state or view all logic could go here */}
            {transactions.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                    No hay transacciones de gastos recientes.
                </div>
            )}
        </div>
    );
}
