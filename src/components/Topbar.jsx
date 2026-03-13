import React from 'react';
import { ChevronDown, Bell, Moon, Plus } from 'lucide-react';

export function Topbar({ activeTab, dateFilter, setDateFilter }) {
    if (activeTab === 'dashboard') {
        return (
            <header className="flex flex-col md:flex-row md:items-center justify-between py-6 px-8 gap-4 sticky top-0 bg-[var(--color-main-bg)]/80 backdrop-blur-md z-10 border-b border-[var(--color-border-dark)]/50 md:border-none">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight hidden md:block">Resumen Financiero</h1>
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
                </div>

                <div className="flex items-center space-x-4 ml-auto">
                    <button className="p-2.5 rounded-full bg-[var(--color-card-bg)] text-slate-400 hover:text-white transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--color-card-bg)]"></span>
                    </button>
                    <button className="p-2.5 rounded-full bg-[var(--color-card-bg)] text-slate-400 hover:text-white transition-colors hidden sm:block">
                        <Moon size={20} />
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-blue-500/25 transition-all">
                        <Plus size={18} />
                        <span className="hidden sm:inline">Nueva Transacción</span>
                    </button>
                </div>
            </header>
        );
    }

    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between py-6 px-8 gap-4 sticky top-0 bg-[var(--color-main-bg)]/80 backdrop-blur-md z-10 border-b border-[var(--color-border-dark)]/50 md:border-none">
            <div className="flex items-center space-x-4 flex-1">
                <div className="relative w-full max-w-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar transacción..."
                        className="w-full bg-[var(--color-card-bg)] text-slate-300 placeholder-slate-500 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border border-transparent hover:border-[var(--color-border-dark)]"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-6 ml-auto">
                <button className="p-2.5 rounded-full bg-[var(--color-card-bg)] text-slate-400 hover:text-white transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--color-card-bg)]"></span>
                </button>

                <div className="flex items-center space-x-3 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Alex Rivera</p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">USUARIO PRO</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#FDBA74] flex items-center justify-center border-2 border-[var(--color-border-dark)] group-hover:border-blue-500/50 transition-all overflow-hidden">
                        <svg className="w-8 h-8 text-white mt-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                </div>
            </div>
        </header>
    );
}
