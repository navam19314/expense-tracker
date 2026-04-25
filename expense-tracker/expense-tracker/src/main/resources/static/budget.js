function currentMonth() {
    return new Date().toISOString().slice(0, 7);
}

async function loadBudgets() {
    const budgets = await api("/api/budget");
    const list = document.getElementById("budgetList");
    list.innerHTML = "";
    if (!budgets.length) {
        list.innerHTML = "<li>No budgets found.</li>";
        return;
    }
    budgets.forEach((b) => {
        const li = document.createElement("li");
        li.textContent = `${b.month} : ${money(b.amount)}`;
        list.appendChild(li);
    });
}

async function saveBudget() {
    const month = document.getElementById("budgetMonth").value;
    const amount = Number(document.getElementById("budgetAmount").value);
    if (!month || !amount) {
        showToast("Please provide month and amount.");
        return;
    }
    await api("/api/budget", {
        method: "POST",
        body: JSON.stringify({ month, amount }),
    });
    document.getElementById("budgetAmount").value = "";
    showToast("Budget saved.");
    await loadBudgets();
}

document.getElementById("saveBudgetBtn").addEventListener("click", async () => {
    try {
        await saveBudget();
    } catch (err) {
        showToast(err.message || "Could not save budget.");
    }
});

(async function init() {
    await requireAuth();
    document.getElementById("budgetMonth").value = currentMonth();
    await loadBudgets();
})();
