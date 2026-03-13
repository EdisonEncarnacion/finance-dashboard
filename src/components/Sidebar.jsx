import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    TrendingUp,
    TrendingDown,
    BarChart2,
    CreditCard
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Sidebar() {
    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'gastos', name: 'Gastos', icon: TrendingDown, path: '/gastos' },
        { id: 'ingresos', name: 'Ingresos', icon: TrendingUp, path: '/ingresos' },
    ];

    return (
        <aside className="w-[260px] h-screen bg-[var(--color-sidebar-bg)] border-r border-[var(--color-border-dark)] flex flex-col justify-between hidden md:flex sticky top-0">
            <div>
                <div className="p-6 flex flex-col space-y-1 mt-2">
                    <div className="flex items-center space-x-3 text-white">
                        <div className="bg-blue-500 p-2 rounded-xl text-white">
                            <CreditCard size={20} />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Mi Finanzas</h1>
                    </div>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out group",
                                isActive
                                    ? "bg-blue-600/10 text-blue-500"
                                    : "text-slate-400 hover:bg-[var(--color-card-bg)] hover:text-white"
                            )}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon
                                        size={20}
                                        className={cn(
                                            "transition-colors",
                                            isActive ? "text-blue-500" : "text-slate-400 group-hover:text-white"
                                        )}
                                    />
                                    <span className="font-medium text-[15px]">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="p-6 border-t border-[var(--color-border-dark)]/50">
                <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-200">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-[var(--color-border-dark)] flex items-center justify-center shadow-sm group-hover:border-blue-500/50 transition-all">
                        <span className="text-xs font-bold text-slate-300">E</span>
                    </div>
                    <span className="font-semibold text-slate-400 group-hover:text-white transition-colors">Edison</span>
                </div>
            </div>
        </aside>
    );
}
