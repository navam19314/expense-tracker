async function loadCategories() {
    const categories = await api("/api/categories");
    const list = document.getElementById("categoryList");
    list.innerHTML = "";
    if (!categories.length) {
        list.innerHTML = "<li>No categories yet.</li>";
        return;
    }
    categories.forEach((c) => {
        const li = document.createElement("li");
        li.textContent = c.name;
        list.appendChild(li);
    });
}

async function addCategory() {
    const name = document.getElementById("categoryName").value.trim();
    if (!name) {
        showToast("Please enter category name.");
        return;
    }
    await api("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name }),
    });
    document.getElementById("categoryName").value = "";
    showToast("Category added.");
    await loadCategories();
}

document.getElementById("addCategoryBtn").addEventListener("click", async () => {
    try {
        await addCategory();
    } catch (err) {
        showToast(err.message || "Could not add category.");
    }
});

(async function init() {
    await requireAuth();
    await loadCategories();
})();
