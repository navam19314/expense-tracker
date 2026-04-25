function money(value) {
    return `₹${Number(value || 0).toFixed(2)}`;
}

async function api(url, options = {}) {
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options,
    });

    if (!response.ok) {
        let message = "Request failed";
        try {
            const payload = await response.json();
            message = payload.message || message;
        } catch (_) {
            const text = await response.text();
            if (text) message = text;
        }
        throw new Error(message);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2200);
}

async function requireAuth() {
    try {
        const me = await api("/api/auth/me");
        document.querySelectorAll("[data-user-email]").forEach((node) => {
            node.textContent = `Signed in as ${me.email}`;
        });
        document.querySelectorAll("[data-logout]").forEach((btn) => {
            btn.addEventListener("click", async () => {
                await api("/api/auth/logout", { method: "POST" });
                window.location.href = "/index.html";
            });
        });
        return me;
    } catch (_) {
        window.location.href = "/index.html";
        throw _;
    }
}
