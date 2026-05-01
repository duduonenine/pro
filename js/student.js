// =======================
// SAFE ELEMENT SELECTOR HELPER
// =======================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// =======================
// Elements
// =======================
const toggleMenu = $(".toggle-menu");
const sidebar = $(".sidebar");
const dots = $(".v-dots");
const menu = $(".three-dot-menu");

// Logout modal elements
const logoutBtn = $(".logout-btn");
const logoutModal = $("#logout-modal");
const confirmLogout = $("#confirm-logout");
const cancelLogout = $("#cancel-logout");

// =======================
// SAFE NAV TOGGLES (prevents JS crash)
// =======================
if (toggleMenu && sidebar) {
    toggleMenu.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.toggle("active");
        menu?.classList.remove("active");
    });
}

if (dots && menu) {
    dots.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("active");
        sidebar?.classList.remove("active");
    });
}

// prevent inside close
sidebar?.addEventListener("click", (e) => e.stopPropagation());
menu?.addEventListener("click", (e) => e.stopPropagation());

// close outside click
document.addEventListener("click", () => {
    sidebar?.classList.remove("active");
    menu?.classList.remove("active");
});

// =======================
// LOGOUT MODAL (FIXED + WORKING)
// =======================

// OPEN MODAL
logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (logoutModal) logoutModal.classList.remove("hidden");
});

// CANCEL
cancelLogout?.addEventListener("click", () => {
    logoutModal?.classList.add("hidden");
});

// CONFIRM LOGOUT
confirmLogout?.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "login-stud.html";
});

// CLICK OUTSIDE MODAL TO CLOSE
logoutModal?.addEventListener("click", (e) => {
    if (e.target === logoutModal) {
        logoutModal.classList.add("hidden");
    }
});

// =======================
// REQUEST SYSTEM (UNCHANGED BUT SAFE)
// =======================
const requestButtons = $$(".request");

requestButtons.forEach(button => {
    const card = button.closest(".library-c, .cafe-c, .dormitory-c, .registrar-c");
    if (!card) return;

    const status = card.querySelector(".status");
    if (!status) return;

    status.textContent = "Status: Not requested";
    status.classList.remove("active");

    button.addEventListener("click", () => {
        if (button.classList.contains("pending")) {

            button.classList.remove("pending");
            button.textContent = "Request clearance";

            status.textContent = "Status: Not requested";
            status.classList.remove("active");

        } else {

            button.classList.add("pending");
            button.textContent = "Pending...";

            status.textContent = "Status: Pending";
            status.classList.add("active");
        }
    });
});