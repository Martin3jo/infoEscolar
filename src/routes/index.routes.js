var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');
const usuarioControllers = require('../controllers/usuarioControllers');


/* GET home page. */
router.get('/', indexControllers.index);

router.get('/pruebaSession', indexControllers.pruebaSession);

router.get('/mostrarSession', indexControllers.mostrarNumeroSession);




module.exports = router;
