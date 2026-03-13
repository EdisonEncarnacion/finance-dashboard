import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ExpenseAlerts() {
    return (
        <div className="bg-[#2A1818] p-6 rounded-2xl border border-red-500/20 relative overflow-hidden group">
            <div className="flex items-start space-x-4 relative z-10">
                <div className="bg-red-500/20 p-3 rounded-full flex-shrink-0">
                    <AlertTriangle className="text-red-500" size={24} />
                </div>
                <div>
                    <h3 className="text-red-400 font-bold text-lg mb-2">Alertas de Gasto</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        Has gastado <strong className="text-white font-bold">30% más</strong> en comida esta semana en comparación con el promedio de febrero.
                    </p>
                    <button className="text-red-400 text-sm font-semibold hover:text-red-300 transition-colors">
                        Revisar presupuesto
                    </button>
                </div>
            </div>
            <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors pointer-events-none"></div>
        </div>
    );
}
