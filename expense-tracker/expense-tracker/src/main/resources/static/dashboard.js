let pieChart;
let barChart;

function currentMonth() {
    return new Date().toISOString().slice(0, 7);
}

async function loadDashboard() {
    const month = document.getElementById("monthFilter").value || currentMonth();
    const [status, summary] = await Promise.all([
        api(`/api/expenses/budget-status?month=${month}`),
        api(`/api/expenses/category-summary?month=${month}`),
    ]);

    document.getElementById("totalExpenseCard").textContent = money(status.totalExpenses);
    document.getElementById("budgetCard").textContent = money(status.budget);
    document.getElementById("remainingCard").textContent = money(status.remainingBudget);
    document.getElementById("usagePercent").textContent = `${status.percentageUsed.toFixed(2)}%`;

    const progress = document.getElementById("usageProgress");
    progress.style.width = `${Math.min(100, status.percentageUsed)}%`;
    progress.style.background = status.budgetExceeded
        ? "linear-gradient(90deg,#f87171,#dc2626)"
        : "linear-gradient(90deg,#818cf8,#4f46e5)";

    const warningBanner = document.getElementById("warningBanner");
    if (status.budgetExceeded) {
        warningBanner.classList.remove("hidden");
        warningBanner.textContent = `Budget exceeded by ${money(status.exceededBy)} in ${status.month}`;
    } else {
        warningBanner.classList.add("hidden");
        warningBanner.textContent = "";
    }

    renderCharts(summary);
}

function renderCharts(summary) {
    const labels = summary.map((x) => x.category);
    const values = summary.map((x) => x.totalAmount);
    const colors = ["#4f46e5", "#0ea5e9", "#22c55e", "#f97316", "#8b5cf6", "#ef4444", "#14b8a6", "#eab308"];

    if (pieChart) pieChart.destroy();
    if (barChart) barChart.destroy();

    pieChart = new Chart(document.getElementById("pieChart"), {
        type: "doughnut",
        data: { labels, datasets: [{ data: values, backgroundColor: colors }] },
        options: { cutout: "62%", plugins: { legend: { position: "bottom" } } },
    });

    barChart = new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: { labels, datasets: [{ data: values, label: "Amount", backgroundColor: "#4f46e5", borderRadius: 8 }] },
        options: { scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } },
    });
}

document.getElementById("monthFilter").addEventListener("change", loadDashboard);

(async function init() {
    await requireAuth();
    document.getElementById("monthFilter").value = currentMonth();
    await loadDashboard();
})();
