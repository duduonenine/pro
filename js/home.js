// ======================================================
// 🔐 AUTH CHECK
// ======================================================
if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = 'login-staff.html';
}

// ======================================================
// 🧭 NAVIGATION (SAFE FOR ALL PAGES)
// ======================================================
const toggleMenu = document.querySelector('.toggle-menu');
const sidebar = document.querySelector('.sidebar');
const threeDotMenu = document.querySelector('.three-dot-menu');
const vDots = document.querySelector('.v-dots');

if (toggleMenu && sidebar) {
  toggleMenu.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

if (vDots && threeDotMenu) {
  vDots.addEventListener('click', () => {
    threeDotMenu.classList.toggle('active');
  });
}

document.addEventListener('click', (e) => {
  if (sidebar && toggleMenu && !sidebar.contains(e.target) && !toggleMenu.contains(e.target)) {
    sidebar.classList.remove('active');
  }
  if (threeDotMenu && vDots && !threeDotMenu.contains(e.target) && !vDots.contains(e.target)) {
    threeDotMenu.classList.remove('active');
  }
});

// ======================================================
// 🏠 HOME PAGE SYSTEM (ONLY RUN IF EXISTS)
// ======================================================
const btnUpcoming = document.getElementById('btn-upcoming');
const btnApproved = document.getElementById('btn-approved');
const btnRejected = document.getElementById('btn-rejected');

const upcomingSection = document.getElementById('upcoming-section');
const approvedSection = document.getElementById('approved-section');
const rejectedSection = document.getElementById('rejected-section');

if (upcomingSection && approvedSection && rejectedSection) {

  const upcomingInfo = upcomingSection.previousElementSibling;
  const approvedInfo = approvedSection.previousElementSibling;
  const rejectedInfo = rejectedSection.previousElementSibling;

  function hideAll() {
    upcomingSection.classList.add('hidden');
    approvedSection.classList.add('hidden');
    rejectedSection.classList.add('hidden');

    upcomingInfo?.classList.add('hidden');
    approvedInfo?.classList.add('hidden');
    rejectedInfo?.classList.add('hidden');
  }

  function showSection(type) {
    hideAll();

    if (type === 'upcoming') {
      upcomingSection.classList.remove('hidden');
      upcomingInfo?.classList.remove('hidden');
    }

    if (type === 'approved') {
      approvedSection.classList.remove('hidden');
      approvedInfo?.classList.remove('hidden');
    }

    if (type === 'rejected') {
      rejectedSection.classList.remove('hidden');
      rejectedInfo?.classList.remove('hidden');
    }
  }

  showSection('upcoming');

  btnUpcoming?.addEventListener('click', () => showSection('upcoming'));
  btnApproved?.addEventListener('click', () => showSection('approved'));
  btnRejected?.addEventListener('click', () => showSection('rejected'));

  const upcomingTable = upcomingSection.querySelector('table');
  const approvedTable = approvedSection.querySelector('table');
  const rejectedTable = rejectedSection.querySelector('table');

  if (upcomingTable) {
    upcomingTable.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      if (!row) return;

      // APPROVE
      if (e.target.innerText.toLowerCase() === 'approve') {
        const newRow = row.cloneNode(true);
        newRow.querySelectorAll('button').forEach(btn => btn.remove());
        newRow.lastElementChild.innerHTML = `<img src="progress-check.svg" class="approved">`;

        approvedTable?.appendChild(newRow);
        row.remove();
      }

      // REJECT
      if (e.target.innerText.toLowerCase() === 'reject') {
        openRejectModal(row);
      }
    });
  }
}

// ======================================================
// 🚫 REJECT MODAL (SAFE)
// ======================================================
const modal = document.getElementById('reject-modal');
const form = document.getElementById('reject-form');
let selectedRow = null;

function openRejectModal(row) {
  if (!modal || !form) return;

  selectedRow = row;

  const inputs = form.querySelectorAll('input');
  if (inputs[0]) inputs[0].value = row.children[1]?.innerText || '';
  if (inputs[1]) inputs[1].value = localStorage.getItem('username') || 'unknown';

  modal.classList.remove('hidden');
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedRow) return;

    const rejectedTable = document.querySelector('#rejected-section table');
    const newRow = selectedRow.cloneNode(true);

    newRow.querySelectorAll('button').forEach(btn => btn.remove());
    newRow.lastElementChild.innerHTML = `<img src="circle-dashed-x.svg" class="rejected">`;

    rejectedTable?.appendChild(newRow);
    selectedRow.remove();

    modal.classList.add('hidden');
    form.reset();
    selectedRow = null;
  });
}

// ======================================================
// 🚪 LOGOUT MODAL
// ======================================================
const logoutBtn = document.querySelector('.logout-btn');
const logoutModal = document.getElementById('logout-modal');
const confirmLogout = document.getElementById('confirm-logout');
const cancelLogout = document.getElementById('cancel-logout');

logoutBtn?.addEventListener('click', () => {
  logoutModal?.classList.remove('hidden');
});

cancelLogout?.addEventListener('click', () => {
  logoutModal?.classList.add('hidden');
});

confirmLogout?.addEventListener('click', () => {
  localStorage.removeItem('loggedIn');
  window.location.href = 'login-staff.html';
});

logoutModal?.addEventListener('click', (e) => {
  if (e.target === logoutModal) {
    logoutModal.classList.add('hidden');
  }
});

// ======================================================
// 💬 DEPARTMENT CHAT SYSTEM (CONTACT PAGE ONLY)
// ======================================================
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const deptButtons = document.querySelectorAll('.dept-btn');

if (chatBox && chatInput && sendBtn) {

  let currentDept = 'library';

  const chats = {
    library: [],
    cafe: [],
    dorm: [],
    registrar: []
  };

  function renderChat() {
    chatBox.innerHTML = '';

    chats[currentDept].forEach(msg => {
      const div = document.createElement('div');
      div.className = msg.type === 'user' ? 'user-msg' : 'bot-msg';
      div.innerText = msg.text;
      chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function addMessage(text, type) {
    chats[currentDept].push({ text, type });
    renderChat();
  }

  deptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      deptButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDept = btn.dataset.dept;
      renderChat();
    });
  });

  sendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';

    setTimeout(() => {
      addMessage(`${currentDept.toUpperCase()} dept: message received ✔`, 'bot');
    }, 400);
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

  renderChat();
}