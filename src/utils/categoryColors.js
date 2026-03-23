export const EXPENSE_COLORS = ['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#06B6D4'];
export const INCOME_COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const HEX_TO_TW_CLASS = {
    '#EF4444': 'bg-red-500/20 text-red-500',
    '#3B82F6': 'bg-blue-500/20 text-blue-500',
    '#F59E0B': 'bg-amber-500/20 text-amber-500',
    '#10B981': 'bg-emerald-500/20 text-emerald-500',
    '#8B5CF6': 'bg-purple-500/20 text-purple-500',
    '#06B6D4': 'bg-cyan-500/20 text-cyan-500',
};

// Stable hash function for strings
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

export function getCategoryColor(category, type = 'gasto') {
    const catStr = category || 'Otros';
    const isIncome = type === 'ingreso' || type === 'income';
    const palette = isIncome ? INCOME_COLORS : EXPENSE_COLORS;

    // Some hardcoded common categories to match current design exactly
    const knownExpenses = { 'Alimentación': 5, 'Comida': 5, 'Transporte': 1, 'Entretenimiento': 2, 'Servicios': 3, 'Salud': 4 };
    const knownIncomes = { 'Salario': 0, 'Freelance': 1, 'Inversiones': 2 };

    let index;
    if (isIncome && knownIncomes[catStr] !== undefined) {
        index = knownIncomes[catStr];
    } else if (!isIncome && knownExpenses[catStr] !== undefined) {
        index = knownExpenses[catStr];
    } else {
        index = hashString(catStr);
    }

    const hex = palette[index % palette.length];
    return {
        hex,
        twClass: HEX_TO_TW_CLASS[hex] || 'bg-slate-500/20 text-slate-400'
    };
}
