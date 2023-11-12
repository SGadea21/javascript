    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginOptionButton = document.getElementById('login-option');
    const registerOptionButton = document.getElementById('register-option');
    const logoutform = document.getElementById('logout-form');
    const logoutButton = document.getElementById('logout-button');

// Recuperar la variable de localStorage
let Usuario = localStorage.getItem('Usuario');
 // Ocultar por defecto el botón de cerrar sesión
 logoutform.classList.add('hidden');
// Verificar si la variable existe y no es nula
if (Usuario) {
    
    // Actualizar el contenido del span "user-name"
    let userSpan = document.getElementById('user-name');
    userSpan.textContent = Usuario;
    
    // Mostrar el elemento "user-section" que estaba oculto
    let userSection = document.getElementById('user-section');
    userSection.classList.remove('hidden');
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');

        // Mostrar el botón de Cerrar Sesión
        logoutform.classList.remove('hidden');

        // Agregar evento para cerrar sesión al hacer clic en el botón
        logoutButton.addEventListener('click', () => {
            // Eliminar el usuario almacenado
            localStorage.removeItem('Usuario');

            // Ocultar el botón de Cerrar Sesión
            logoutform.classList.add('hidden');

            // Redirigir al usuario a la página de inicio de sesión o a donde desees
            window.location.href = '../PAGES/login.html';
        });

}

document.addEventListener('DOMContentLoaded', () => {

   
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
            Swal.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
                
              }).then((result) => {
                if (result.isConfirmed) {
                  // Redireccionar
                  window.location.href = '../index.html';
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  // El usuario canceló, manejarlo si es necesario
                }
              });
              
            localStorage.setItem('Usuario', username);
           
        } else {
           
            Swal.fire({
              icon: "error",
              title: "Error al iniciar secion",
              text: "Credenciales incorrectas",
            });
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

            Swal.fire({
                icon: "success",
                title: "Registro exitoso",
              }).then((result) => {
                if (result.isConfirmed) {
                  // Redireccionar
                  window.location.href = '../PAGES/login.html';
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  // El usuario canceló, manejarlo si es necesario
                }
              });
            
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El usuario ya existe",
              });

        }
    });


});
