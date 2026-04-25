async function authApi(url, payload) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const text = await response.text();
    const body = text ? JSON.parse(text) : {};
    if (!response.ok) {
        throw new Error(body.message || "Authentication failed");
    }
    return body;
}

function setAuthMessage(message) {
    const el = document.getElementById("authMessage");
    el.textContent = message || "";
}

async function checkExistingSession() {
    try {
        const meResponse = await fetch("/api/auth/me");
        if (meResponse.ok) {
            window.location.href = "/dashboard.html";
        }
    } catch (_) {
        // Keep login page as fallback
    }
}

async function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        setAuthMessage("Please enter email and password.");
        return;
    }

    try {
        await authApi("/api/auth/login", { email, password });
        window.location.href = "/dashboard.html";
    } catch (err) {
        setAuthMessage(err.message);
    }
}

async function register() {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    if (!email || !password) {
        setAuthMessage("Please enter email and password.");
        return;
    }

    try {
        await authApi("/api/auth/register", { email, password });
        window.location.href = "/dashboard.html";
    } catch (err) {
        setAuthMessage(err.message);
    }
}

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("registerBtn").addEventListener("click", register);

document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach((x) => x.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.add("hidden"));
        document.getElementById(btn.dataset.tab).classList.remove("hidden");
        setAuthMessage("");
    });
});

checkExistingSession();
