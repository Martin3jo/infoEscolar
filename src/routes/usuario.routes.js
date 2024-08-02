var express = require('express');
var router = express.Router();
const usuarioControllers = require('../controllers/usuarioControllers');
const guestMiddleware= require('../middleware/guestMiddleware')
const publicacionRouter = require('./publicacion.routes');

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
router.use('/perfil/publicacion', publicacionRouter);

/* Usuarios */
//router.get('/perfil/registro-usuario', usuarioControllers.registroUsuarios);

module.exports = router;