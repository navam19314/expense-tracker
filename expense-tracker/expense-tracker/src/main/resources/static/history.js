async function loadExpenses() {
    const rows = await api("/api/expenses");
    const tbody = document.getElementById("expenseTableBody");
    tbody.innerHTML = "";
    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="4">No expenses yet.</td></tr>`;
        return;
    }

    rows.forEach((e) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${e.date || "-"}</td>
            <td>${e.categoryName || "-"}</td>
            <td>${money(e.amount)}</td>
            <td>${(e.description || "-").replace(/</g, "&lt;")}</td>
        `;
        tbody.appendChild(tr);
    });
}

(async function init() {
    await requireAuth();
    await loadExpenses();
})();
