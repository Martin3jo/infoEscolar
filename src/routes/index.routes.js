var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');
const usuarioControllers = require('../controllers/usuarioControllers');

// Ruta para obtener la página principal
router.get('/', indexControllers.renderIndex);
// Ruta para filtrar publicaciones por categoría
router.get('/categoria/:idCategoria', indexControllers.filtrarPorCategoria);
// Ruta para obtener una publicación específica por ID
router.get('/publicacion/:id', indexControllers.obtenerPublicacionPorId);
// Ruta para agregar un comentario a una publicación
router.post('/publicacion/comentar/:idPublicacion', usuarioControllers.agregarComentario);
// Ruta para que un usuario pueda borrar su propio comentario
router.get('/publicacion/comentario/eliminar/:idComentario', usuarioControllers.eliminarComentario);

router.get('/pruebaSession', indexControllers.pruebaSession);
router.get('/mostrarSession', indexControllers.mostrarNumeroSession);


module.exports = router;