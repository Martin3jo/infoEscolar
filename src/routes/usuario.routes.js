var express = require('express');
var router = express.Router();
const usuarioControllers = require('../controllers/usuarioControllers');
//const publicacionRouter = require('../routes/publicacion');

/* Login */
router.get('/', usuarioControllers.login);
router.post('/perfil', usuarioControllers.cuentaUsuario);

/* Publicaciones */
//router.use('/perfil/publicacion', publicacionRouter);

router.get('/perfil/registro-usuario', usuarioControllers.registroUsuarios);

module.exports = router;
