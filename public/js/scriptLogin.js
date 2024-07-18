// const formulario = document.getElementById('login-form'); //importa formulario del html
// const inputs = document.querySelectorAll('#formulario input');//importa todos los inputs del formulario


// //arreglo de expresiones regulares para validar el formulario
// const expresiones = {
//     dni: /^[0-9]{8}$/, // 8 numeros
//     contrasenia: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8}$/, // 4 a 8 caracteres, al menos una mayúscula y un número.

// };

// // arreglo de mensajes de error 
// const mensajes = {
//     dni: "Formato correo electrónico incorrecto.",
//     contrasenia: "La contraseña debe tener por lo menos una mayúscula, un número y como máximo 8 caracteres.",
// }

// //arreglo que contiene los campos del formulario para evaluar si tiene error el campo
// const campos = {
//     email: false,
//     contrasenia: false,
// }

// //validacion del formulario llamando a la validacion de cada campo 
// const validarFormulario = (e) => {
//     switch (e.target.name) {
//         case "dni":
//             validarCampo(expresiones.email, e.target, 'email', mensajes.email);
//             break;
//         case "contrasenia":
//             validarCampo(expresiones.contrasenia, e.target, 'contrasenia', mensajes.contrasenia);
//             break;

//     }
// }

// // Funciona para validar cada campo
// const validarCampo = (expresion, input, campo, mensaje) => {
//     const mensajeError = document.getElementById(`mensaje-${campo}`);
//     if (expresion.test(input.value)) {
//         mensajeError.textContent = ''; // Si el formato es válido, borra el mensaje de error
//         document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
//         document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
//         campos[campo] = true;
//     } else {
//         mensajeError.textContent = mensaje;
//         document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
//         document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
//         campos[campo] = false;
//     }

// }

// //maneja el ingreso del teclado para validar el formulario
// inputs.forEach((input) => {
//     input.addEventListener('keyup', validarFormulario);
//     input.addEventListener('blur', validarFormulario);
// });

// //maneja el evento del boton submit del formulario
// formulario.addEventListener('submit', (e) => {
//     e.preventDefault();// detiene el submit para realizar la verificacion

//     //obtiene elvalor del select provincia
//     const provincia = document.getElementById(`inputGroupSelect02`).value;
//     const mensajeError = document.getElementById('mensaje-datosCorrectos');

//     //compara todos los valores de verdad del arreglo campos
//     const todosCamposTrue = Object.values(campos).every(valor => valor === true);
//     if (todosCamposTrue) {
//         e.currentTarget.submit(); //luego de validar envia el formulario al controlador
//     } else {
//         mensajeError.textContent = "Completar todos los datos";
//     }

// });