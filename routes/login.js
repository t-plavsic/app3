
var User = require('../models/userModel');
var setUserTokenByCredetials = require('../middleware/setUserTokenByCredetials');
var setCookieFromUserToken = require('../middleware/setCookieFromUserToken');




var express = require('express');
var router = express.Router();
var _ = require('lodash');

// GET /login
router.get('/', (req, res) => {
    //console.log('x-token', req.cookies['x-token']);
    res.render('./login_get.njk', {err: '', title: 'LOGIN'});
});

// POST /login
router.post('/', setUserTokenByCredetials, setCookieFromUserToken, (req, res) => {

    if (req.userToken) {
        //Login ok
        res.redirect('/');
    } else {
        //Login error, log again
        res.render('./login_get.njk', {err: req.userTokenError, title: 'LOGIN error (log in again..)'});
    }

});

module.exports = router;

