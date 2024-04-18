var express = require('express');
var router = express.Router();
const usuarioController= require('../controllers/usuarioController')
//Login
router.get('/login', usuarioController.login)

module.exports = router;
