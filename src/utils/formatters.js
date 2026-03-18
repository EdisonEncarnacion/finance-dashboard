/**
 * Formats a numeric value into a Peruvian Sol (S/) currency string.
 * Uses consistent formatting safe for production builds.
 * 
 * @param {number|string} value - The value to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value) {
    const numericValue = Number(value || 0);
    return `S/ ${numericValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}
