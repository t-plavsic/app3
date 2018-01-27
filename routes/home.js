var _ = require('lodash');
var express = require('express');
var router = express.Router();
var getUserFromToken = require('../middleware/getUserFromToken');

router.get('/', getUserFromToken, (req, res) => {

    if (req.user) {
        res.render('./home_get.njk', {
            logged: true, 
            title: ` ${req.user.username} HOME PAGE `, 
            username: req.user.username 
        }); 
    } else {
        res.render('./home_get.njk', {
            logged: false, 
            title: 'HOME PAGE', 
            username: 'No user', 
            userError: req.userError
        });
    }
});


module.exports = router;
