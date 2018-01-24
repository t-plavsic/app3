
var User = require('../models/userModel');

var express = require('express');
var router = express.Router();
var _ = require('lodash');


router.get('/', (req, res) => {
    //console.log('x-token', req.cookies['x-token']);
    res.render('./login_get.njk', {title: 'LOGIN'});
});

router.post('/', (req, res) => {

    User.findByCredentials(req.body.username, req.body.password)
    .then((user) => {
        res.cookie('x-token', user.tokens[0].token, {maxAge:24*60*60*1000, httpOnly: true});
        res.redirect('/');
    })
    .catch((e) => {
        res.redirect('/login');
        //res.status(401).send(e);
    });
       
});





module.exports = router;
 