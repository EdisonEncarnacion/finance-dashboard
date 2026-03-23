const API_URL = "https://backend-finance-hu46.onrender.com";

/**
 * Common fetch wrapper with error handling
 */
async function safeFetch(url, options = {}) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            console.error(`API Error (${res.status}): ${url}`);
            return null;
        }
        return await res.json();
    } catch (error) {
        console.error(`Network Error: ${url}`, error);
        return null;
    }
}

export async function getExpenses() {
    const data = await safeFetch(`${API_URL}/expenses`);
    console.log("==> Fetch Expenses:", data);
    return (data || []).map(item => ({
        ...item,
        amount: Number(item.amount || 0)
    }));
}

export async function getIncomes() {
    const data = await safeFetch(`${API_URL}/incomes`);
    console.log("==> Fetch Incomes:", data);
    return (data || []).map(item => ({
        ...item,
        amount: Number(item.amount || 0)
    }));
}

export async function createExpense(data) {
    const result = await safeFetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return result;
}

export async function createIncome(data) {
    const result = await safeFetch(`${API_URL}/ incomes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return result;
}

