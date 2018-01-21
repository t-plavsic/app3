var _ = require('lodash');
var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.render('./home_get.njk', {title: 'HOME PAGE'});
});





module.exports = router;