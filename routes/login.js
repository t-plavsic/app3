
var User = require('../models/userModel');
var setUserTokenByCredetials = require('../middleware/setUserTokenByCredetials');

var express = require('express');
var router = express.Router();
var _ = require('lodash');

// GET /login
router.get('/', (req, res) => {
    //console.log('x-token', req.cookies['x-token']);
    res.render('./login_get.njk', {title: 'LOGIN'});
});

// POST /login
router.post('/', (req, res) => {

    User.findByCredentials(req.body.username, req.body.password)
    .then((user) => {
        //res.cookie('x-token', user.tokens[0].token, {maxAge:24*60*60*1000, httpOnly: true});
        res.cookie('x-token', req.userToken, {maxAge:24*60*60*1000, httpOnly: true});        
        res.redirect('/');
    })
    .catch((e) => {
        res.redirect('/login');
        //res.status(401).send(e);
    });
       
});


module.exports = router;
 