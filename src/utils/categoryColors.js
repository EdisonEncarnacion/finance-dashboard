// Fixed colors per expense category (hex + tailwind badge class)
const EXPENSE_CATEGORY_COLORS = {
    'Alimentación': { hex: '#06B6D4', twClass: 'bg-cyan-500/20 text-cyan-400' },
    'Comida': { hex: '#06B6D4', twClass: 'bg-cyan-500/20 text-cyan-400' },
    'Transporte': { hex: '#3B82F6', twClass: 'bg-blue-500/20 text-blue-400' },
    'Entretenimiento': { hex: '#F59E0B', twClass: 'bg-amber-500/20 text-amber-400' },
    'Servicios': { hex: '#3B82F6', twClass: 'bg-blue-500/20 text-blue-400' },
    'Salud': { hex: '#8B5CF6', twClass: 'bg-purple-500/20 text-purple-400' },
    'Otros': { hex: '#8B5CF6', twClass: 'bg-purple-500/20 text-purple-400' },
};

// Fixed colors per income source
const INCOME_CATEGORY_COLORS = {
    'Salario': { hex: '#10B981', twClass: 'bg-emerald-500/20 text-emerald-400' },
    'Freelance': { hex: '#3B82F6', twClass: 'bg-blue-500/20 text-blue-400' },
    'Inversiones': { hex: '#8B5CF6', twClass: 'bg-violet-500/20 text-violet-400' },
    'Regalos': { hex: '#F59E0B', twClass: 'bg-amber-500/20 text-amber-400' },
    'Otros': { hex: '#06B6D4', twClass: 'bg-cyan-500/20 text-cyan-400' },
};

// Fallback palette for unknown categories
const FALLBACK_PALETTE = [
    { hex: '#EF4444', twClass: 'bg-red-500/20 text-red-400' },
    { hex: '#EC4899', twClass: 'bg-pink-500/20 text-pink-400' },
    { hex: '#14B8A6', twClass: 'bg-teal-500/20 text-teal-400' },
    { hex: '#84CC16', twClass: 'bg-lime-500/20 text-lime-400' },
];

// Colors for donut charts (in category order)
export const EXPENSE_COLORS = Object.values(EXPENSE_CATEGORY_COLORS).map(c => c.hex);
export const INCOME_COLORS = Object.values(INCOME_CATEGORY_COLORS).map(c => c.hex);

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash);
}

export function getCategoryColor(category, type = 'gasto') {
    const catStr = category || 'Otros';
    const isIncome = type === 'ingreso' || type === 'income';
    const map = isIncome ? INCOME_CATEGORY_COLORS : EXPENSE_CATEGORY_COLORS;

    if (map[catStr]) return map[catStr];

    // Unknown category: pick a fallback by hash
    return FALLBACK_PALETTE[hashString(catStr) % FALLBACK_PALETTE.length];
}
