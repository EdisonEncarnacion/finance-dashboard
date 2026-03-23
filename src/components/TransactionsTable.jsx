import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate } from '../utils/formatters';
import { getCategoryColor } from '../utils/categoryColors';

const transactions = [
    { id: 1, date: '15 Mar, 2024', category: 'Comida', desc: 'Supermercado Metro', amount: 'S/ 120.00', type: 'gasto' },
    { id: 2, date: '14 Mar, 2024', category: 'Salario', desc: 'Freelance Project A', amount: 'S/ 1,800.00', type: 'ingreso' },
    { id: 3, date: '12 Mar, 2024', category: 'Servicios', desc: 'Internet Fibra', amount: 'S/ 150.00', type: 'gasto' },
    { id: 4, date: '10 Mar, 2024', category: 'Transporte', desc: 'Gasolina', amount: 'S/ 80.00', type: 'gasto' },
];



export function TransactionsTable({ transactions: propTransactions }) {
    const displayTransactions = propTransactions || transactions;
    const navigate = useNavigate();

    const handleRowClick = (tx) => {
        if (tx.type === 'ingreso' || tx.type === 'income') {
            navigate('/ingresos');
        } else {
            navigate('/gastos');
        }
    };

    return (
        <div className="bg-[var(--color-card-bg)] rounded-3xl p-6 border border-[var(--color-border-dark)] shadow-sm col-span-1 md:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">Transacciones Recientes</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-[var(--color-border-dark)]/50">
                            <th className="pb-4 px-2">Fecha</th>
                            <th className="pb-4 px-2">Categoría</th>
                            <th className="pb-4 px-2">Descripción</th>
                            <th className="pb-4 px-2">Monto</th>
                            <th className="pb-4 px-2 text-right">Tipo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border-dark)]/30">
                        {displayTransactions.map((tx) => (
                            <tr
                                key={tx.id}
                                onClick={() => handleRowClick(tx)}
                                className="hover:bg-white/5 transition-all duration-200 group cursor-pointer active:scale-[0.99]"
                            >
                                <td className="py-4 px-2 text-sm text-slate-300 font-medium whitespace-nowrap">
                                    {tx.date ? formatDate(tx.date) : tx.date}
                                </td>
                                <td className="py-4 px-2">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-xs font-bold tracking-wide",
                                        getCategoryColor(tx.category, tx.type).twClass
                                    )}>
                                        {tx.category}
                                    </span>
                                </td>
                                <td className="py-4 px-2 text-sm text-white font-medium">
                                    {tx.desc || tx.description}
                                </td>
                                <td className="py-4 px-2 text-sm text-white font-bold whitespace-nowrap">
                                    {formatCurrency(tx.amount)}
                                </td>
                                <td className="py-4 px-2 text-right">
                                    <div className={cn(
                                        "inline-flex items-center space-x-1 text-xs font-black uppercase tracking-widest",
                                        tx.type === 'ingreso' || tx.type === 'income' ? "text-emerald-400" : "text-orange-400"
                                    )}>
                                        {tx.type === 'ingreso' || tx.type === 'income' ? <ArrowUpRight size={14} strokeWidth={3} /> : <ArrowDownRight size={14} strokeWidth={3} />}
                                        <span>{tx.type === 'income' ? 'ingreso' : (tx.type === 'expense' ? 'gasto' : tx.type)}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
