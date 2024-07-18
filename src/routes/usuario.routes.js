var express = require('express');
var router = express.Router();
const usuarioControllers = require('../controllers/usuarioControllers');
const guestMiddleware= require('../middleware/guestMiddleware')

const {body} = require('express-validator')
const validaciones = [
    body('username').notEmpty().withMessage('Debes ingresar Usuario'),
    body('password').notEmpty().withMessage('Debes ingresar Contraseña')
];
/* Login */
router.get('/login', guestMiddleware,usuarioControllers.login);
router.post('/login',validaciones, usuarioControllers.cuentaUsuario);

/* Perfil */
router.get('/perfil', usuarioControllers.perfil);
router.post('/logout',usuarioControllers.logout)

/* Publicaciones */
router.get('/perfil/publicacion', usuarioControllers.registroPublicaciones);
router.get('/perfil/publicacion/crearPublicacion', usuarioControllers.crearPublicacion);
router.post('/perfil/publicacion/crearPublicacion', usuarioControllers.crearPublicacion);

/* Usuarios */
router.get('/perfil/registro-usuario', usuarioControllers.registroUsuarios);



module.exports = router;
