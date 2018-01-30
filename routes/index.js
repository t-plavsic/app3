var express = require('express');
var router = express.Router();

var getUserFromToken = require('../middleware/getUserFromToken');
var requireUser = require('../middleware/requireUser');

//Set userToken
router.use('/login',require('./login'))
router.use('/logout',require('./logout'))
router.use('/users',require('./users'))

//Get logged user
router.use(getUserFromToken)
router.use('/',require('./home'))

//Require logged user
router.use(requireUser)
//router.use('/users',require('./users'))
router.use('/todos',require('./todos'))
router.use('/rotacija',require('./rotacija'))

module.exports = router;

