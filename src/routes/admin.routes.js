var express = require('express');
var router = express.Router();
const adminControllers = require('../controllers/adminControllers')
/* GET home page. */
router.get('/', adminControllers.admin)

module.exports = router;
