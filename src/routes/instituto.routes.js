var express = require('express');
var router = express.Router();
const institutoControllers = require('../controllers/institutoControllers');


router.get('/', institutoControllers.index);

module.exports = router;

