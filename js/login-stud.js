
// =======================
// ELEMENTS
// =======================
const form = document.querySelector(".form-container");
const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="psw"]');

// ERROR MODAL
const errorModal = document.getElementById("error-modal");
const errorMessage = document.getElementById("error-message");
const closeErrorBtn = document.getElementById("close-error");

// =======================
// SAFE CHECK
// =======================
if (!form) {
    console.error("Login form not found");
}

// =======================
// SHOW ERROR MODAL
// =======================
function showError(message) {
    if (!errorModal || !errorMessage) return;

    errorMessage.textContent = message;
    errorModal.classList.remove("hidden");
}

// =======================
// CLOSE ERROR MODAL
// =======================
function closeError() {
    errorModal?.classList.add("hidden");
}

// =======================
// EVENT: CLOSE BUTTON
// =======================
closeErrorBtn?.addEventListener("click", closeError);

// =======================
// EVENT: CLICK OUTSIDE MODAL
// =======================
errorModal?.addEventListener("click", (e) => {
    if (e.target === errorModal) {
        closeError();
    }
});

// =======================
// FAKE USER (demo login)
// =======================
const validUser = {
    username: "Dmu123456",
    password: "1234"
};

// =======================
// LOGIN HANDLER
// =======================
form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // empty check
    if (!username || !password) {
        showError("Please fill all fields");
        return;
    }

    // format check
    if (!username.startsWith("Dmu")) {
        showError("Invalid ID format (must start with Dmu)");
        return;
    }

    // login check
    if (username === validUser.username && password === validUser.password) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);

        window.location.href = "home-stud.html";
    } else {
        showError("Invalid username or password");
    }
});