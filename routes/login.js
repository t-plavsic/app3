var _ = require('lodash');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('./login_get.njk', {title: 'LOGIN'});
});






module.exports = router;
 