var express = require('express');
var router = express.Router();
const publicacionController = require('../controllers/publicacionController');

// Route to render the form for creating a new publication
router.get('/crearPublicacion', publicacionController.renderCreateForm);

// Route to handle the creation of a new publication
router.post('/crearPublicacion', publicacionController.createPublicacion);

// Route to list all publications
router.get('/', publicacionController.listPublicaciones);

// Route to render the form for editing a publication
router.get('/editar/:id', publicacionController.renderEditForm);

// Route to handle the update of a publication
router.post('/editar/:id', publicacionController.updatePublicacion);

// Route to handle the deletion of a publication
router.post('/borrar/:id', publicacionController.deletePublicacion);

module.exports = router;