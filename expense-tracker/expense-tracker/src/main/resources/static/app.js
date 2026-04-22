const userId = 1;
let categoryById = {};

function showMessage(el, text, isError) {
    el.textContent = text;
    el.classList.toggle("message-error", Boolean(isError));
    if (text) {
        setTimeout(() => {
            el.textContent = "";
            el.classList.remove("message-error");
        }, 5000);
    }
}

function showSection(section) {
    const ids = ["expense", "table", "category", "budget"];
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("hidden", id !== section);
    });
    document.querySelectorAll(".nav-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.section === section);
    });
    if (section === "table") {
        loadTable();
    } else if (section === "category") {
        loadCategoryList();
    } else if (section === "budget") {
        loadBudgetList();
    } else if (section === "expense") {
        updateExpenseTotalPreview();
    }
}

document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => showSection(btn.dataset.section));
});

function setDefaultDate() {
    const d = new Date();
    const iso = d.toISOString().slice(0, 10);
    document.getElementById("expenseDate").value = iso;
}

function setDefaultMonth() {
    const d = new Date();
    const ym = d.toISOString().slice(0, 7);
    document.getElementById("month").value = ym;
}

function refreshCategories() {
    return fetch(`/api/categories?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
            categoryById = {};
            data.forEach((c) => {
                categoryById[c.id] = c.name;
            });
            const sel = document.getElementById("categorySelect");
            const prev = sel.value;
            sel.innerHTML = "";
            if (data.length === 0) {
                const o = document.createElement("option");
                o.value = "";
                o.textContent = "— Add a category first —";
                sel.appendChild(o);
                return;
            }
            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "Select category";
            sel.appendChild(placeholder);
            data.forEach((c) => {
                const o = document.createElement("option");
                o.value = c.id;
                o.textContent = c.name;
                sel.appendChild(o);
            });
            if (prev && data.some((c) => String(c.id) === String(prev))) {
                sel.value = prev;
            }
        })
        .catch(() => {
            showMessage(document.getElementById("message"), "Could not load categories. Is the server running?", true);
        });
}

function addExpense() {
    const messageEl = document.getElementById("message");
    const amount = parseFloat(document.getElementById("amount").value);
    const desc = document.getElementById("desc").value.trim();
    const date = document.getElementById("expenseDate").value;
    const categoryId = document.getElementById("categorySelect").value;
    if (!date || !categoryId || Number.isNaN(amount) || amount < 0) {
        showMessage(messageEl, "Fill amount, date, and category.", true);
        return;
    }
    fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount,
            description: desc || "—",
            date,
            userId,
            categoryId: Number(categoryId),
        }),
    })
        .then((res) => {
            if (!res.ok) throw new Error("Save failed");
            return res.json();
        })
        .then(() => {
            showMessage(messageEl, "Expense saved.");
            document.getElementById("amount").value = "";
            document.getElementById("desc").value = "";
            setDefaultDate();
            updateExpenseTotalPreview();
        })
        .catch(() => showMessage(messageEl, "Could not save expense.", true));
}

function categoryLabel(id) {
    if (id == null) return "—";
    return categoryById[id] || `#${id}`;
}

function updateExpenseTotalPreview() {
    fetch(`/api/expenses?userId=${userId}`)
        .then((r) => r.json())
        .then((data) => {
            const total = data.reduce((s, e) => s + (e.amount || 0), 0);
            const el = document.getElementById("expense-total");
            el.textContent =
                data.length > 0
                    ? `You have ${data.length} expense(s) on record. Total: ₹${total.toFixed(2)}`
                    : "No expenses yet. Add your first one above.";
        });
}

function loadTable() {
    const table = document.getElementById("expenseTable");
    table.innerHTML = "";
    Promise.all([fetch(`/api/categories?userId=${userId}`).then((r) => r.json()), fetch(`/api/expenses?userId=${userId}`).then((r) => r.json())])
        .then(([categories, data]) => {
            categoryById = {};
            categories.forEach((c) => {
                categoryById[c.id] = c.name;
            });
            if (data.length === 0) {
                table.innerHTML = '<tr><td colspan="4" class="empty">No expenses yet.</td></tr>';
                return;
            }
            data.forEach((e) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${escapeHtml(e.date || "—")}</td><td>${escapeHtml(
                    categoryLabel(e.categoryId)
                )}</td><td>₹${formatMoney(e.amount)}</td><td>${escapeHtml(e.description || "—")}</td>`;
                table.appendChild(tr);
            });
        })
        .catch(() => {
            table.innerHTML = '<tr><td colspan="4" class="empty">Failed to load data.</td></tr>';
        });
}

function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
}

function formatMoney(n) {
    if (n == null || Number.isNaN(n)) return "0.00";
    return Number(n).toFixed(2);
}

function addCategory() {
    const name = document.getElementById("catName").value.trim();
    if (!name) {
        alert("Enter a category name.");
        return;
    }
    fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, userId }),
    })
        .then((res) => {
            if (!res.ok) throw new Error("fail");
            return res.json();
        })
        .then(() => {
            document.getElementById("catName").value = "";
            return refreshCategories();
        })
        .then(() => loadCategoryList())
        .catch(() => alert("Could not add category."));
}

function loadCategoryList() {
    fetch(`/api/categories?userId=${userId}`)
        .then((r) => r.json())
        .then((data) => {
            const ul = document.getElementById("categoryList");
            ul.innerHTML = "";
            if (data.length === 0) {
                ul.innerHTML = "<li class=\"empty-inline\">No categories yet.</li>";
                return;
            }
            data.forEach((c) => {
                const li = document.createElement("li");
                li.className = "pill";
                li.textContent = c.name;
                ul.appendChild(li);
            });
        });
}

function addBudget() {
    const month = document.getElementById("month").value;
    const amount = parseFloat(document.getElementById("budgetAmount").value);
    if (!month || Number.isNaN(amount) || amount < 0) {
        alert("Set month and a valid amount.");
        return;
    }
    fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month, amount, userId }),
    })
        .then((res) => {
            if (!res.ok) throw new Error("fail");
            return res.json();
        })
        .then(() => {
            document.getElementById("budgetAmount").value = "";
            setDefaultMonth();
            loadBudgetList();
        })
        .catch(() => alert("Could not save budget."));
}

function loadBudgetList() {
    fetch(`/api/budget?userId=${userId}`)
        .then((r) => r.json())
        .then((data) => {
            const ul = document.getElementById("budgetList");
            ul.innerHTML = "";
            if (data.length === 0) {
                ul.innerHTML = "<li class=\"empty-inline\">No budgets yet.</li>";
                return;
            }
            data.forEach((b) => {
                const li = document.createElement("li");
                li.textContent = `${b.month}: ₹${formatMoney(b.amount)}`;
                ul.appendChild(li);
            });
        });
}

setDefaultDate();
setDefaultMonth();
refreshCategories().then(() => {
    updateExpenseTotalPreview();
});
