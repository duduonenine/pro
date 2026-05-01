document.addEventListener('DOMContentLoaded', () => {

  // -------------------- FORM --------------------
  const form = document.querySelector('.container');

  // -------------------- ERROR MODAL --------------------
  const errorModal = document.getElementById('error-modal');
  const closeError = document.getElementById('close-error');
  const errorMessage = document.getElementById('error-message');

  // show error
  function showError(message) {
    if (!errorModal || !errorMessage) return;

    errorMessage.textContent = message;
    errorModal.classList.remove('hidden');
  }

  // hide error
  function hideError() {
    if (!errorModal) return;
    errorModal.classList.add('hidden');
  }

  // close button click
  if (closeError) {
    closeError.addEventListener('click', hideError);
  }

  // click outside modal
  if (errorModal) {
    errorModal.addEventListener('click', (e) => {
      if (e.target === errorModal) {
        hideError();
      }
    });
  }

  // -------------------- LOGIN LOGIC --------------------
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const role = document.querySelector('.select')?.value;
    const inputs = document.querySelectorAll('.inputs');

    const username = inputs[0]?.value.trim();
    const password = inputs[1]?.value.trim();

    // -------------------- VALIDATION --------------------
    if (!role || !username || !password) {
      showError('Please fill all fields');
      return;
    }

    // -------------------- DEMO LOGIN --------------------
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('role', role);

      window.location.href = 'home-staff.html';
    } else {
      showError('Invalid username or password');
    }
  });

});