var express = require('express');
var router = express.Router();

router.use('/users',require('./users'))
router.use('/rotacija',require('./rotacija'))

module.exports = router;
