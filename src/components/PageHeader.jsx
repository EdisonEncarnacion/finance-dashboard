import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { TransactionModal } from './TransactionModal';

export function PageHeader({ title, selectedMonth, setSelectedMonth, onSuccess }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date(selectedMonth));
    const dropdownRef = useRef(null);

    const isGastos = title === 'Gastos';
    const buttonText = isGastos ? 'Nuevo gasto' : 'Nuevo ingreso';
    const accentColor = isGastos ? 'from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 shadow-red-500/20' : 'from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-blue-500/20';
    const accentText = isGastos ? 'text-red-400' : 'text-blue-400';
    const accentBg = isGastos ? 'bg-red-500' : 'bg-blue-500';

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatMonthYear = (date) => {
        const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
        const year = date.getFullYear();
        return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
    };

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const renderCalendar = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const days = [];
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);

        // Days of week
        const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

        // Padding for first week
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
        }

        for (let d = 1; d <= totalDays; d++) {
            const isSelected = selectedMonth.getDate() === d &&
                selectedMonth.getMonth() === month &&
                selectedMonth.getFullYear() === year;

            days.push(
                <button
                    key={d}
                    onClick={() => {
                        const newDate = new Date(year, month, d);
                        setSelectedMonth(newDate);
                        setIsMenuOpen(false);
                    }}
                    className={`w-8 h-8 flex items-center justify-center text-xs rounded-lg transition-all ${isSelected
                        ? `${accentBg} text-white font-bold shadow-lg`
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                >
                    {d}
                </button>
            );
        }

        return (
            <div className="p-4 w-64 bg-[#1e2235] border border-slate-800 rounded-2xl shadow-2xl z-[100] overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={handlePrevMonth} className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-bold text-white uppercase tracking-tight">
                        {new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric' }).format(viewDate)}
                    </span>
                    <button onClick={handleNextMonth} className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white">
                        <ChevronRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map(day => (
                        <div key={day} className="w-8 h-8 flex items-center justify-center text-[10px] font-bold text-slate-500">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {days}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex flex-row justify-between items-center mb-10 w-full px-2 relative z-[60]">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>

                <div className="flex items-center space-x-4">
                    <div className="relative" ref={dropdownRef}>
                        <div
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                                setViewDate(new Date(selectedMonth));
                            }}
                            className="hidden sm:flex items-center space-x-2.5 bg-[#1a1c2e]/40 px-5 h-11 rounded-full text-sm font-medium text-slate-300 border border-slate-800/50 hover:border-slate-700 transition-all cursor-pointer shadow-inner backdrop-blur-sm"
                        >
                            <CalendarIcon size={16} className="text-slate-400" />
                            <span>{formatMonthYear(selectedMonth)}</span>
                            <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2">
                                {renderCalendar()}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={`flex items-center space-x-2 bg-gradient-to-r ${accentColor} text-white px-6 h-11 rounded-2xl font-semibold shadow-lg transition-all active:scale-95 group`}
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span>{buttonText}</span>
                    </button>
                </div>
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={isGastos ? 'expense' : 'income'}
                onSuccess={onSuccess}
            />
        </>
    );
}
