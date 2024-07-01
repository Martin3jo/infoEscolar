var express = require('express');
var router = express.Router();
var contactoControllers = require('../controllers/contactoControllers');


router.get('/', contactoControllers.contacto);

router.post('/', contactoControllers.sendEmail);

module.exports = router;

