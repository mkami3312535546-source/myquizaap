const inputUser = document.getElementById('user-name');
const inputPass = document.getElementById('password');
const savebtn = document.getElementById('savebtn');
const login = document.getElementById('login');


let users = JSON.parse(localStorage.getItem('users')) || [];


savebtn.addEventListener('click', () => {
    const username = inputUser.value;
    const password = inputPass.value;  

    if (!username || !password) {
        alert("Please fill username AND password");
        return;
    }

    
    const exists = users.some(u => u.username === username);
    if (exists) {
        alert("Username already exists!");
        return;
    }

    
    users.push({ username, password });
    
    localStorage.setItem('users', JSON.stringify(users));
    
    
    inputUser.value = "";
    inputPass.value = "";

});

    login.addEventListener('click', () => {
    const username = inputUser.value.trim();
    const password = inputPass.value.trim();

    const checkUser = users.some(u => u.username === username && u.password === password);

    if (checkUser) {
        window.location.href = "index.html";
    } else {
        alert("Username or password incorrect");
    }
});