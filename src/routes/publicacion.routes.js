var express = require('express');
var router = express.Router();
const usuarioControllers = require('../controllers/usuarioControllers');

router.get('/', usuarioControllers.renderPublicaciones);
router.get('/crear', usuarioControllers.renderCrearEditarPublicacion);
router.get('/editar/:id', usuarioControllers.renderCrearEditarPublicacion); // Route for editing a post
router.post('/crearPublicacion', usuarioControllers.crearPublicacion);
router.post('/editarPublicacion/:id', usuarioControllers.editarPublicacion); // Route for updating a post
router.post('/borrar/:id', usuarioControllers.eliminarPublicacion); // Route for deleting a post

module.exports = router;