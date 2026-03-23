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

/**
 * Formats a date string ensuring it displays correctly in local UI without timezone shifting.
 * 
 * @param {string|Date} dateInput - The date to format
 * @param {Object} [options] - Optional Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(dateInput, options = {}) {
    if (!dateInput) return '';

    // Extract the date string portion (handles both "2026-03-15" and "2026-03-15T00:00:00.000Z")
    const str = typeof dateInput === 'string' ? dateInput : dateInput.toISOString();
    const datePart = str.split('T')[0]; // always "YYYY-MM-DD"
    const [year, month, day] = datePart.split('-').map(Number);

    // Format manually to avoid ANY timezone offset from JavaScript's Date engine
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${day} ${months[month - 1]} ${year}`;
}
