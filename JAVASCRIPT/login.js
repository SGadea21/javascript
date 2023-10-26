// Recuperar la variable de localStorage
var Usuario = localStorage.getItem('Usuario');

// Verificar si la variable existe y no es nula
if (Usuario) {
    // Actualizar el contenido del span "user-name"
    var userSpan = document.getElementById('user-name');
    userSpan.textContent = Usuario;
    
    // Mostrar el elemento "user-section" que estaba oculto
    var userSection = document.getElementById('user-section');
    userSection.classList.remove('hidden');
    
    // Ocultar el enlace "Iniciar Sesión"
    var loginLink = document.getElementById('login-link');
    loginLink.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginOptionButton = document.getElementById('login-option');
    const registerOptionButton = document.getElementById('register-option');

    loginOptionButton.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    registerOptionButton.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Resto del código para el inicio de sesión
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Resto del código para el registro
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');


    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
            alert('Inicio de sesión exitoso');
            localStorage.setItem('Usuario', username);
        } else {
            alert('Credenciales incorrectas');
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (!users.some((u) => u.username === newUsername)) {
            users.push({ username: newUsername, password: newPassword });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro exitoso');
            
        } else {
            alert('El usuario ya existe');
        }
    });


});
