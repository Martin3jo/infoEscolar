var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');

/* GET página principal. */
router.get('/', indexControllers.renderIndex);
/* GET filtrar publicaciones por categoría. */
router.get('/categoria/:idCategoria', indexControllers.filtrarPorCategoria);
/* GET obtener una publicación específica por ID. */
router.get('/publicacion/:id', indexControllers.obtenerPublicacionPorId);

router.get('/pruebaSession', indexControllers.pruebaSession);
router.get('/mostrarSession', indexControllers.mostrarNumeroSession);

module.exports = router;