var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');

// Ruta para obtener la página principal
router.get('/', indexControllers.renderIndex);
// Ruta para filtrar publicaciones por categoría
router.get('/categoria/:idCategoria', indexControllers.filtrarPorCategoria);
// Ruta para obtener una publicación específica por ID
router.get('/publicacion/:id', indexControllers.obtenerPublicacionPorId);

router.get('/pruebaSession', indexControllers.pruebaSession);
router.get('/mostrarSession', indexControllers.mostrarNumeroSession);

module.exports = router;