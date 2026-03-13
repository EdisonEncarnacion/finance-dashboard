import React, { useEffect, useState } from 'react';
import { X, Calendar, DollarSign, Tag, FileText, ChevronDown } from 'lucide-react';

export function TransactionModal({ isOpen, onClose, type }) {
    const isExpense = type === 'expense';
    const title = isExpense ? 'Nuevo gasto' : 'Nuevo ingreso';
    const primaryButtonColor = isExpense
        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 shadow-red-500/20'
        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-blue-500/20';

    const categories = isExpense
        ? ['Alimentación', 'Transporte', 'Servicios', 'Entretenimiento', 'Salud', 'Otros']
        : ['Salario', 'Freelance', 'Inversiones', 'Regalos', 'Otros'];

    const [formData, setFormData] = useState({
        category: categories[0],
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#1e2235] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form className="space-y-5" onClick={(e) => e.stopPropagation()}>
                        {/* Category Dropdown */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                                {isExpense ? 'Categoría' : 'Fuente de ingreso'}
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-14 pr-5 py-3.5 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat} className="bg-[#1e2235] text-slate-200">{cat}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none pr-4 border-r border-slate-800">
                                    <Tag size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Monto</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold border-r border-slate-800 pr-4">S/</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-14 pr-5 py-3.5 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-lg"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Descripción</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 border-r border-slate-800 pr-4">
                                    <FileText size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Ej. Almuerzo corporativo"
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-14 pr-5 py-3.5 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Fecha</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 border-r border-slate-800 pr-4">
                                    <Calendar size={18} />
                                </div>
                                <input
                                    type="date"
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-14 pr-5 py-3.5 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3.5 rounded-2xl font-semibold text-slate-400 bg-slate-800/50 hover:bg-slate-800 hover:text-white transition-all active:scale-95"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Handle logic here
                                    onClose();
                                }}
                                className={`px-6 py-3.5 rounded-2xl font-semibold text-white shadow-lg transition-all active:scale-95 ${primaryButtonColor}`}
                            >
                                {isExpense ? 'Guardar gasto' : 'Guardar ingreso'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
