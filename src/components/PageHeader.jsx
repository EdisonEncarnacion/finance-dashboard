import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';

export function PageHeader() {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <h2 className="text-3xl font-bold text-white tracking-tight">Gastos</h2>
                <div className="flex items-center space-x-2 bg-[var(--color-card-bg)] px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 border border-[var(--color-border-dark)] hover:border-slate-500 transition-colors cursor-pointer shadow-sm">
                    <span className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                        </span>
                        <span>Marzo 2024</span>
                    </span>
                    <ChevronDown size={18} className="text-slate-400 ml-1" />
                </div>
            </div>

            <button className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-red-500/25 transition-all transform hover:scale-105">
                <Plus size={18} />
                <span>Nuevo gasto</span>
            </button>
        </div>
    );
}
