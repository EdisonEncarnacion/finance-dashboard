const API_URL = "http://localhost:3001";

export async function getExpenses() {
    const res = await fetch(`${API_URL}/expenses`);
    return res.json();
}

export async function getIncomes() {
    const res = await fetch(`${API_URL}/incomes`);
    return res.json();
}

export async function createExpense(data) {
    const res = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
}

export async function createIncome(data) {
    const res = await fetch(`${API_URL}/incomes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
}
