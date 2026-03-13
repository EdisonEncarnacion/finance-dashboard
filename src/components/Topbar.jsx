import React from 'react';
import { ChevronDown, Bell, Moon, Plus } from 'lucide-react';

export function Topbar({ activeTab, dateFilter, setDateFilter }) {
    if (activeTab !== 'dashboard') {
        return null;
    }

    return (
        <header className="sticky top-0 bg-[var(--color-main-bg)]/80 backdrop-blur-md z-10 border-b border-[var(--color-border-dark)]/50 md:border-none">
            <div className="flex flex-col md:flex-row md:items-center justify-between py-6 px-4 md:px-8 gap-4 w-full max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight hidden md:block">Resumen Financiero</h1>
                </div>

                <div className="flex items-center space-x-4 ml-auto">
                    <div className="flex items-center bg-[var(--color-card-bg)] p-1 rounded-xl border border-[var(--color-border-dark)] overflow-hidden">
                        {['hoy', 'semana', 'mes', 'año'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setDateFilter(filter)}
                                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${dateFilter === filter
                                    ? 'bg-blue-600/20 text-blue-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <button className="p-2.5 rounded-full bg-[var(--color-card-bg)] text-slate-400 hover:text-white transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--color-card-bg)]"></span>
                    </button>
                    <button className="p-2.5 rounded-full bg-[var(--color-card-bg)] text-slate-400 hover:text-white transition-colors hidden sm:block">
                        <Moon size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
