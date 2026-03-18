/**
 * Formats a numeric value into a Peruvian Sol (S/) currency string.
 * Uses consistent formatting safe for production builds.
 * 
 * @param {number|string} value - The value to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value) {
    const number = Number(value || 0);
    return `S/ ${number.toLocaleString('es-PE', {
        minimumFractionDigits: number % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
    })}`;
}
