function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email === '' || password === '') {
        document.getElementById('message').innerText = 'Please fill in all fields.';
        return;
    }

    const savedUser = JSON.parse(localStorage.getItem('budgetBuddyUser')) || null;
    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
        document.getElementById('message').innerText = 'Email or password is incorrect.';
        return;
    }

    localStorage.setItem('budgetBuddyLoggedIn', 'true');
    localStorage.setItem('rememberedEmail', email);
    window.location.href = 'dashboard.html';
}

function logout() {
    localStorage.setItem('budgetBuddyLoggedIn', 'false');
    window.location.href = 'login.html';
}

window.onload = function() {
    const remembered = localStorage.getItem('rememberedEmail');
    if (remembered) {
        document.getElementById('email').value = remembered;
    }
};
