var express = require('express');
var router = express.Router();

var getUserFromToken = require('../middleware/getUserFromToken');

router.use('/login',require('./login'))
router.use('/logout',require('./logout'))

router.use(getUserFromToken)

router.use('/',require('./home'))
router.use('/users',require('./users'))
router.use('/todos',require('./todos'))
router.use('/rotacija',require('./rotacija'))

module.exports = router;

