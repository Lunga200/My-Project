function registerUser() {

    const name =
    document.getElementById("fullName").value;

    const email =
    document.getElementById("regEmail").value;

    const password =
    document.getElementById("regPassword").value;

    if(name === "" || email === "" || password === "") {

        document.getElementById("registerMessage").innerText =
        "Please complete all fields.";

        return;
    }

    const user = {
        name,
        email,
        password
    };

    localStorage.setItem('budgetBuddyUser', JSON.stringify(user));
    localStorage.setItem('budgetBuddyLoggedIn', 'true');

    document.getElementById('registerMessage').innerText =
    'Account created successfully! Redirecting to dashboard...';

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}