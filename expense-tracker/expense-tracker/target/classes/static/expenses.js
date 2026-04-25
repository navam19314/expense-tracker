async function loadCategories() {
    const categories = await api("/api/categories");
    const select = document.getElementById("categorySelect");
    select.innerHTML = `<option value="">Select category</option>`;
    categories.forEach((c) => {
        const option = document.createElement("option");
        option.value = c.id;
        option.textContent = c.name;
        select.appendChild(option);
    });
}

async function addExpense() {
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("expenseDate").value;
    const categoryId = Number(document.getElementById("categorySelect").value);
    const description = document.getElementById("description").value.trim();

    if (!amount || !date || !categoryId) {
        showToast("Please fill amount, date, and category.");
        return;
    }

    await api("/api/expenses", {
        method: "POST",
        body: JSON.stringify({ amount, date, categoryId, description }),
    });

    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    showToast("Expense saved.");
}

document.getElementById("saveExpenseBtn").addEventListener("click", async () => {
    try {
        await addExpense();
    } catch (err) {
        showToast(err.message || "Could not save expense.");
    }
});

(async function init() {
    await requireAuth();
    document.getElementById("expenseDate").value = new Date().toISOString().slice(0, 10);
    await loadCategories();
})();
