// window.addEventListener('load', function () {
//     //capturas con QUERY
//     let formulario = document.querySelector(".e-form")
//     let nombre = document.querySelector(".e-nombre")
//     let apellido = document.querySelector(".e-apellido")
//     let dni = document.querySelector(".e-dni")
//     let celular = document.querySelector(".e-celular")
//     let email = document.querySelector(".e-email");
//     let password = document.querySelector(".e-password");
//     let password2 = document.querySelector(".e-password2");


//     // Crear elementos para mostrar mensajes de error
//     let errorNombre = document.createElement('span');
//     let errorApellido = document.createElement('span');
//     let errorDni = document.createElement('span')
//     let errorCelular = document.createElement('span')
//     let errorEmail = document.createElement('span');
//     let errorPassword = document.createElement('span');
//     let errorPassword2 = document.createElement('span');

//     // Agregar clases para estilos CSS
//     errorNombre.classList.add('mensaje-error');
//     errorApellido.classList.add('mensaje-error');
//     errorDni.classList.add('mensaje-error')
//     errorCelular.classList.add('mensaje-error')
//     errorEmail.classList.add('mensaje-error');
//     errorPassword.classList.add('mensaje-error');
//     errorPassword2.classList.add('mensaje-error');

//     // Insertar elementos de error después de los campos correspondientes
//     nombre.parentNode.insertBefore(errorNombre, nombre.nextSibling);
//     apellido.parentNode.insertBefore(errorApellido, apellido.nextSibling);
//     dni.parentNode.insertBefore(errorDni, dni.nextSibling);
//     celular.parentNode.insertBefore(errorCelular, celular.nextSibling);
//     email.parentNode.insertBefore(errorEmail, email.nextSibling);
//     password.parentNode.insertBefore(errorPassword, password.nextSibling);
//     password2.parentNode.insertBefore(errorPassword2, password2.nextSibling);

//     nombre.addEventListener('input', function () {
//         let nombreV = nombre.value.trim();

//         if (nombreV.length < 5) {
//             errorNombre.textContent = '5 Carácteres o más';
//         } else {
//             errorNombre.textContent = '';
//         }
//     });

//     apellido.addEventListener('input', function () {
//         let apellidoV = apellido.value.trim();

//         if (apellidoV.length < 5) {
//             errorApellido.textContent = '5 Carácteres o más';
//         } else {
//             errorApellido.textContent = '';
//         }
//     });

//     dni.addEventListener('input', function () {
//         let dniV = dni.value.trim();

//         if (dniV.length < 8) {
//             errorDni.textContent = '8 Carácteres';
//         } else {
//             errorDni.textContent = '';
//         }
//     });

//     celular.addEventListener('input', function () {
//         let celularV = celular.value.trim();

//         if (celularV.length < 10) {
//             errorCelular.textContent = '10 Carácteres';
//         } else {
//             errorCelular.textContent = '';
//         }
//     });

//     function validarEmail(email) {
//         // Expresión regular para validar email
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(email);
//     }

//     email.addEventListener('input', function () {
//         let emailV = email.value.trim();

//         if (!validarEmail(emailV)) {
//             errorEmail.textContent = 'Email inválido';
//         } else {
//             errorEmail.textContent = '';
//         }
//     });

//     password.addEventListener('input', function () {
//         let passwordV = password.value.trim();

//         if (passwordV.length < 6) {
//             errorPassword.textContent = 'Mínimo 6 caracteres';
//         } else {
//             errorPassword.textContent = '';
//         }
//     });

//     password2.addEventListener('input', function () {
//         let password2V = password2.value.trim();

//         if (password2V.length < 6) {
//             errorPassword2.textContent = 'Mínimo 6 caracteres';
//         } else {
//             errorPassword2.textContent = '';
//         }
//     });


//     formulario.addEventListener('submit', function (event) {
//         let errores = [];

//         //PUSHEAMOS ERRORES
//         if (nombre.value == "") {
//             errores.push('Nombre Obligatoria')
//         } else if (nombre.value.length < 5) {
//             errores.push('Nombre debe contener mas de cinco carácteres')
//         }

//         if (apellido.value == "") {
//             errores.push('Apellido Obligatorio')
//         } else if (apellido.value.length < 5) {
//             errores.push('Apellido debe contener mas de cinco carácteres')
//         }

//         if (dni.value == "") {
//             errores.push('DNI Obligatorio')
//         } else if (dni.value.length < 8) {
//             errores.push('DNI debe contener 8 carácteres')
//         }

//         if (celular.value == "") {
//             errores.push('Celular Obligatorio')
//         } else if (celular.value.length < 10) {
//             errores.push('Celular debe contener 10 carácteres')
//         }

//         if (email.value == "") {
//             errores.push('Email Obligatorio');
//         } else if (email.value.length < 5 || !validarEmail(email.value.trim())) {
//             errores.push('Email inválido o demasiado corto');
//         }

//         if (password.value == "") {
//             errores.push('Password Obligatorio');
//         } else if (password.value.length < 6) {
//             errores.push('Password debe contener al menos 6 caracteres');
//         }

//         if (password2.value == "") {
//             errores.push('Password Obligatorio');
//         } else if (password2.value.length < 6) {
//             errores.push('Password debe contener al menos 6 caracteres');
//         }

//         //tratamos errores
//         if (errores.length > 0) {
//             event.preventDefault();
//             let ulErrores = document.querySelector(".errores-front ul");
//             ulErrores.innerHTML = '';
//             errores.forEach(error => {
//                 ulErrores.innerHTML += `<li>${error}</li>`
//             });

//         }
//         this.submit()
//     })

// })