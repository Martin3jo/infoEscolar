var express = require('express');
var router = express.Router();
const usuarioControllers = require('../controllers/usuarioControllers');

// Ruta para mostrar todas las publicaciones
router.get('/', usuarioControllers.renderPublicaciones);
// Ruta para mostrar el formulario de creación de una nueva publicación
router.get('/crear', usuarioControllers.renderCrearEditarPublicacion);
// Ruta para mostrar el formulario de edición de una publicación existente
router.get('/editar/:id', usuarioControllers.renderCrearEditarPublicacion); 
// Ruta para crear una nueva publicación
router.post('/crearPublicacion', usuarioControllers.crearPublicacion);
// Ruta para actualizar una publicación existente
router.post('/editarPublicacion/:id', usuarioControllers.editarPublicacion);
// Ruta para eliminar una publicación
router.post('/borrar/:id', usuarioControllers.eliminarPublicacion);
// Ruta para fijar/desfijar una publicación
router.post('/fijar/:id', usuarioControllers.fijarPublicacion);

module.exports = router;