console.log("JS LOADED");

let userId = 1;

function showSection(section) {
document.getElementById("expense").classList.add("hidden");
document.getElementById("table").classList.add("hidden");
document.getElementById("category").classList.add("hidden");
document.getElementById("budget").classList.add("hidden");

```
document.getElementById(section).classList.remove("hidden");

if (section === "table") {
    loadTable();
}
```

}

function addExpense() {
fetch("/api/expenses", {
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({
amount: document.getElementById("amount").value,
description: document.getElementById("desc").value,
date: "2026-01-01",
userId: userId,
categoryId: 1
})
})
.then(() => {
document.getElementById("message").innerText = "Expense added!";
document.getElementById("amount").value = "";
document.getElementById("desc").value = "";
});
}

function loadTable() {
fetch("/api/expenses")
.then(res => res.json())
.then(data => {
let table = document.getElementById("expenseTable");
table.innerHTML = "";

```
    data.forEach(e => {
        table.innerHTML += `
            <tr>
                <td>₹${e.amount}</td>
                <td>${e.description}</td>
            </tr>
        `;
    });
});
```

}

function addCategory() {
fetch("/api/categories", {
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({
name: document.getElementById("catName").value,
userId: userId
})
}).then(() => alert("Category added"));
}

function addBudget() {
fetch("/api/budget", {
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({
month: document.getElementById("month").value,
amount: document.getElementById("budgetAmount").value,
userId: userId
})
}).then(() => alert("Budget saved"));
}
