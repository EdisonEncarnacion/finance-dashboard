import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    TrendingUp,
    TrendingDown,
    User,
    Settings
} from 'lucide-react';
import { cn } from './Sidebar';

export function BottomNav() {
    const navItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'gastos', name: 'Gastos', icon: TrendingDown, path: '/gastos' },
        { id: 'ingresos', name: 'Ingresos', icon: TrendingUp, path: '/ingresos' },
        { id: 'perfil', name: 'Perfil', icon: User, path: '/perfil' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f111e]/90 backdrop-blur-lg border-t border-[var(--color-border-dark)]/50 px-6 py-3 z-[100] flex justify-between items-center shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.3)]">
            {navItems.map((item) => (
                <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) => cn(
                        "flex flex-col items-center space-y-1 group transition-all duration-300",
                        isActive ? "text-blue-500 scale-110" : "text-slate-400"
                    )}
                >
                    <item.icon
                        size={22}
                        strokeWidth={2.5}
                        className={cn(
                            "transition-all",
                            "group-hover:text-white"
                        )}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
                </NavLink>
            ))}
        </nav>
    );
}
