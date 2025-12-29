const inputUser = document.getElementById('user-name');
const inputPass = document.getElementById('password');
const login = document.getElementById('login');

let users = JSON.parse(localStorage.getItem('users')) || [];

login.addEventListener('click', () => {
    const username = inputUser.value.trim();
    const password = inputPass.value.trim();

    if (!username || !password) {
        alert("Please fill username AND password");
        return;
    }

    // Find matching user
    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        // Login success
        localStorage.setItem("loggedInUser", username);
        window.location.href = "quizaap.html";
    } else {
        alert("Username or password incorrect");
    }

    inputUser.value = "";
    inputPass.value = "";
});
