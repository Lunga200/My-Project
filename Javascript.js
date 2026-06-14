const STORAGE_KEYS = {
  user: 'budgetBuddyUser',
  loggedIn: 'budgetBuddyLoggedIn',
  theme: 'budgetBuddyTheme',
  transactions: 'budgetBuddyTransactions',
  goals: 'budgetBuddyGoals',
};

let transactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.transactions) || '[]');
let goals = JSON.parse(localStorage.getItem(STORAGE_KEYS.goals) || '[]');
let activeChart = null;

const openPages = ['index.html', 'login.html', 'register.html', ''];

function getStoredUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.user);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isLoggedIn() {
  return localStorage.getItem(STORAGE_KEYS.loggedIn) === 'true';
}

function requireAuth() {
  const currentPage = window.location.pathname.split('/').pop();
  if (openPages.includes(currentPage)) return;
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.setItem(STORAGE_KEYS.loggedIn, 'false');
  window.location.href = 'login.html';
}

function applyTheme() {
  const theme = localStorage.getItem(STORAGE_KEYS.theme);
  document.body.classList.toggle('dark-mode', theme === 'dark');
}

function showNotification(message) {
  const note = document.getElementById('notification');
  if (!note) return;

  note.textContent = message;
  note.style.display = 'block';
  note.style.opacity = '1';

  setTimeout(() => {
    note.style.opacity = '0';
    setTimeout(() => {
      note.style.display = 'none';
    }, 250);
  }, 2200);
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
}

function saveGoals() {
  localStorage.setItem(STORAGE_KEYS.goals, JSON.stringify(goals));
}

function calculateTotals() {
  const totals = transactions.reduce(
    (acc, item) => {
      if (item.type === 'income') acc.income += Number(item.amount);
      if (item.type === 'expense') acc.expense += Number(item.amount);
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = totals.income - totals.expense;

  const balanceEl = document.getElementById('balance');
  const incomeEl = document.getElementById('income');
  const expenseEl = document.getElementById('expense');
  const incomeReport = document.getElementById('incomeReport');
  const expenseReport = document.getElementById('expenseReport');

  if (balanceEl) balanceEl.textContent = `R${balance.toFixed(2)}`;
  if (incomeEl) incomeEl.textContent = `R${totals.income.toFixed(2)}`;
  if (expenseEl) expenseEl.textContent = `R${totals.expense.toFixed(2)}`;
  if (incomeReport) incomeReport.textContent = `R${totals.income.toFixed(2)}`;
  if (expenseReport) expenseReport.textContent = `R${totals.expense.toFixed(2)}`;

  return totals;
}

function renderTransactions() {
  const list = document.getElementById('transactionList');
  if (!list) return;

  list.innerHTML = '';

  if (!transactions.length) {
    list.innerHTML = '<li class="empty">No transactions yet.</li>';
    return;
  }

  transactions.slice().reverse().forEach((transaction, reversedIndex) => {
    const originalIndex = transactions.length - 1 - reversedIndex;
    const item = document.createElement('li');
    item.innerHTML = `
      <span>${transaction.type === 'income' ? 'Income' : 'Expense'}: R${Number(transaction.amount).toFixed(2)}</span>
      <button type="button" onclick="deleteTransaction(${originalIndex})">Remove</button>
    `;
    list.appendChild(item);
  });
}

function renderGoals() {
  const list = document.getElementById('goalList');
  if (!list) return;

  list.innerHTML = '';

  if (!goals.length) {
    list.innerHTML = '<li class="empty">No savings goals yet.</li>';
    return;
  }

  goals.forEach((goal) => {
    const item = document.createElement('li');
    item.textContent = `${goal.name} — Target R${Number(goal.target).toFixed(2)}`;
    list.appendChild(item);
  });
}

function renderChart() {
  const canvas = document.getElementById('financeChart');
  if (!canvas || !window.Chart) return;

  if (activeChart) {
    activeChart.destroy();
  }

  const totals = calculateTotals();

  activeChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [
        {
          data: [totals.income, totals.expense],
          backgroundColor: ['#16a34a', '#dc2626'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#334155',
          },
        },
      },
    },
  });
}

function addTransaction(type, amount = 0) {
  const input = document.getElementById('transactionAmount');
  const effectiveAmount = amount || Number(input?.value || 0);
  if (!effectiveAmount || effectiveAmount <= 0) {
    showNotification('Enter a valid amount to continue.');
    return;
  }

  transactions.push({ type, amount: effectiveAmount });
  saveTransactions();
  renderTransactions();
  renderChart();
  showNotification(`${type === 'income' ? 'Income' : 'Expense'} added.`);
}

function addIncome(amount = 0) {
  addTransaction('income', amount);
}

function addExpense(amount = 0) {
  addTransaction('expense', amount);
}

function deleteTransaction(index) {
  if (index < 0 || index >= transactions.length) return;
  transactions.splice(index, 1);
  saveTransactions();
  renderTransactions();
  renderChart();
  showNotification('Transaction removed.');
}

function addGoal() {
  const name = document.getElementById('goalName')?.value.trim();
  const target = Number(document.getElementById('goalAmount')?.value || 0);

  if (!name || !target) {
    showNotification('Provide a goal name and amount.');
    return;
  }

  goals.push({ name, target });
  saveGoals();
  renderGoals();
  document.getElementById('goalName').value = '';
  document.getElementById('goalAmount').value = '';
  showNotification('Goal saved successfully.');
}

function exportPDF() {
  if (!window.jspdf) {
    showNotification('PDF export is unavailable.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('BudgetBuddy Transaction Report', 14, 20);

  if (!transactions.length) {
    doc.setFontSize(12);
    doc.text('No transactions available.', 14, 30);
  } else {
    let y = 30;
    transactions.forEach((transaction, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${transaction.type.toUpperCase()} — R${Number(transaction.amount).toFixed(2)}`, 14, y);
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
  }

  doc.save('BudgetBuddy-report.pdf');
}

function loadUserProfile() {
  const user = getStoredUser();
  if (!user) return;

  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');

  if (profileName) profileName.textContent = user.name;
  if (profileEmail) profileEmail.textContent = user.email;
}

window.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  applyTheme();
  loadUserProfile();
  renderTransactions();
  renderGoals();
  renderChart();
});
