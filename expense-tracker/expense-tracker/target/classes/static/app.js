let pieChart;
let barChart;

const authSection = document.getElementById("authSection");
const appSection = document.getElementById("appSection");
const authMessage = document.getElementById("authMessage");
const warningBanner = document.getElementById("warningBanner");

function currentMonth() {
    return new Date().toISOString().slice(0, 7);
}

function showToast(text) {
    const toast = document.getElementById("toast");
    toast.textContent = text;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2500);
}

function money(value) {
    return `₹${Number(value || 0).toFixed(2)}`;
}

async function api(url, options = {}) {
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options,
    });
    if (!response.ok) {
        let errorText = "Request failed";
        try {
            const payload = await response.json();
            errorText = payload.message || errorText;
        } catch (_) {
            errorText = await response.text();
        }
        throw new Error(errorText);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

async function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    try {
        const data = await api("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        authMessage.textContent = "";
        openApp(data.email);
        showToast("Login successful");
    } catch (err) {
        authMessage.textContent = err.message;
    }
}

async function register() {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    try {
        const data = await api("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        authMessage.textContent = "";
        openApp(data.email);
        showToast("Registration successful");
    } catch (err) {
        authMessage.textContent = err.message;
    }
}

async function logout() {
    await api("/api/auth/logout", { method: "POST" });
    appSection.classList.add("hidden");
    authSection.classList.remove("hidden");
}

async function checkSession() {
    try {
        const me = await api("/api/auth/me");
        openApp(me.email);
    } catch (_) {
        appSection.classList.add("hidden");
        authSection.classList.remove("hidden");
    }
}

function openApp(email) {
    authSection.classList.add("hidden");
    appSection.classList.remove("hidden");
    document.getElementById("welcomeText").textContent = `Logged in as ${email}`;
    document.getElementById("expenseDate").value = new Date().toISOString().slice(0, 10);
    document.getElementById("budgetMonth").value = currentMonth();
    refreshAll();
}

function switchSection(sectionId) {
    const ids = ["dashboardSection", "expenseSection", "historySection", "categorySection", "budgetSection"];
    ids.forEach((id) => {
        document.getElementById(id).classList.toggle("hidden", id !== sectionId);
    });
    document.querySelectorAll(".nav-link").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.section === sectionId);
    });
    if (sectionId === "historySection") loadExpenses();
    if (sectionId === "categorySection") loadCategories();
    if (sectionId === "budgetSection") loadBudgets();
    if (sectionId === "dashboardSection") loadDashboard();
}

async function addExpense() {
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("expenseDate").value;
    const categoryId = Number(document.getElementById("categorySelect").value);
    const description = document.getElementById("description").value.trim();
    await api("/api/expenses", {
        method: "POST",
        body: JSON.stringify({ amount, date, categoryId, description }),
    });
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    showToast("Expense saved");
    refreshAll();
}

async function addCategory() {
    const name = document.getElementById("categoryName").value.trim();
    await api("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name }),
    });
    document.getElementById("categoryName").value = "";
    showToast("Category added");
    await loadCategories();
}

async function saveBudget() {
    const month = document.getElementById("budgetMonth").value;
    const amount = Number(document.getElementById("budgetAmount").value);
    await api("/api/budget", {
        method: "POST",
        body: JSON.stringify({ month, amount }),
    });
    document.getElementById("budgetAmount").value = "";
    showToast("Budget saved");
    await refreshAll();
}

async function loadCategories() {
    const categories = await api("/api/categories");
    const select = document.getElementById("categorySelect");
    const list = document.getElementById("categoryList");
    select.innerHTML = `<option value="">Select category</option>`;
    list.innerHTML = "";
    categories.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name;
        select.appendChild(opt);
        const li = document.createElement("li");
        li.textContent = c.name;
        list.appendChild(li);
    });
}

async function loadExpenses() {
    const rows = await api("/api/expenses");
    const table = document.getElementById("expenseTableBody");
    table.innerHTML = "";
    if (!rows.length) {
        table.innerHTML = `<tr><td colspan="4">No expenses yet.</td></tr>`;
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
        table.appendChild(tr);
    });
}

async function loadBudgets() {
    const rows = await api("/api/budget");
    const list = document.getElementById("budgetList");
    list.innerHTML = "";
    if (!rows.length) {
        list.innerHTML = "<li>No budgets found.</li>";
        return;
    }
    rows.forEach((b) => {
        const li = document.createElement("li");
        li.textContent = `${b.month} : ${money(b.amount)}`;
        list.appendChild(li);
    });
}

async function loadDashboard() {
    const month = document.getElementById("budgetMonth").value || currentMonth();
    const [status, summary] = await Promise.all([
        api(`/api/expenses/budget-status?month=${month}`),
        api(`/api/expenses/category-summary?month=${month}`),
    ]);

    document.getElementById("totalExpenseCard").textContent = money(status.totalExpenses);
    document.getElementById("budgetCard").textContent = money(status.budget);
    document.getElementById("remainingCard").textContent = money(status.remainingBudget);
    document.getElementById("usagePercent").textContent = `${status.percentageUsed.toFixed(2)}%`;

    const percent = Math.min(100, status.percentageUsed);
    const progress = document.getElementById("usageProgress");
    progress.style.width = `${percent}%`;
    progress.style.background = status.budgetExceeded ? "linear-gradient(90deg,#f87171,#dc2626)" : "linear-gradient(90deg,#60a5fa,#2563eb)";

    if (status.budgetExceeded) {
        warningBanner.classList.remove("hidden");
        warningBanner.textContent = `⚠ Budget exceeded by ${money(status.exceededBy)} in ${status.month}`;
    } else {
        warningBanner.classList.add("hidden");
        warningBanner.textContent = "";
    }

    renderCharts(summary);
}

function renderCharts(summary) {
    const labels = summary.map((s) => s.category);
    const values = summary.map((s) => s.totalAmount);
    const palette = ["#2563eb", "#0ea5e9", "#22c55e", "#f97316", "#8b5cf6", "#ef4444", "#14b8a6", "#eab308"];

    const pieCtx = document.getElementById("pieChart");
    const barCtx = document.getElementById("barChart");

    if (pieChart) pieChart.destroy();
    if (barChart) barChart.destroy();

    pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
            labels,
            datasets: [{ data: values, backgroundColor: palette }],
        },
        options: {
            plugins: { legend: { position: "bottom" } },
        },
    });

    barChart = new Chart(barCtx, {
        type: "bar",
        data: {
            labels,
            datasets: [{ label: "Amount", data: values, backgroundColor: "#3b82f6", borderRadius: 6 }],
        },
        options: {
            scales: {
                y: { beginAtZero: true },
            },
        },
    });
}

async function refreshAll() {
    try {
        await Promise.all([loadCategories(), loadExpenses(), loadBudgets(), loadDashboard()]);
    } catch (err) {
        showToast(err.message || "Something went wrong");
    }
}

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("registerBtn").addEventListener("click", register);
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("saveExpenseBtn").addEventListener("click", addExpense);
document.getElementById("addCategoryBtn").addEventListener("click", addCategory);
document.getElementById("saveBudgetBtn").addEventListener("click", saveBudget);

document.querySelectorAll(".nav-link").forEach((btn) =>
    btn.addEventListener("click", () => switchSection(btn.dataset.section))
);

document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.add("hidden"));
        document.getElementById(btn.dataset.tab).classList.remove("hidden");
    });
});

document.getElementById("budgetMonth").addEventListener("change", loadDashboard);

checkSession();
