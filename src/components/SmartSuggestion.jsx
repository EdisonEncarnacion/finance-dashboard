import React from 'react';
import { Lightbulb } from 'lucide-react';

export function SmartSuggestion() {
    return (
        <div className="bg-[#121E36] p-6 rounded-2xl border border-blue-500/20 relative overflow-hidden group">
            <div className="flex items-start space-x-4 relative z-10">
                <div className="bg-blue-500/20 p-3 rounded-full flex-shrink-0">
                    <Lightbulb className="text-blue-500" size={24} />
                </div>
                <div>
                    <h3 className="text-blue-400 font-bold text-lg mb-2">Sugerencia inteligente</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        Si reduces los gastos de entretenimiento en S/ 50, podrías alcanzar tu meta de ahorro de este mes.
                    </p>
                    <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">
                        Ver plan de ahorro
                    </button>
                </div>
            </div>
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>
        </div>
    );
}
