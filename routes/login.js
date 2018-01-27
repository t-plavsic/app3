
var User = require('../models/userModel');
var setUserTokenByCredetials = require('../middleware/setUserTokenByCredetials');

var express = require('express');
var router = express.Router();
var _ = require('lodash');

// GET /login
router.get('/', (req, res) => {
    //console.log('x-token', req.cookies['x-token']);
    res.render('./login_get.njk', {err: '', title: 'LOGIN'});
});

// POST /login
router.post('/', setUserTokenByCredetials, (req, res) => {

/*     
    User.findByCredentials(req.body.username, req.body.password)
    .then((user) => {
        //user is found, password is ok
        //res.cookie('x-token', user.tokens[0].token, {maxAge:24*60*60*1000, httpOnly: true});
        res.cookie('x-token', req.userToken, {maxAge:24*60*60*1000, httpOnly: true});        
        res.redirect('/');
    })
    .catch((e) => {
        //e = 'User not found.'
        //e = 'Invalid password.'

    res.render('./login_get.njk', {err: e, title: 'LOGIN (again)'});
        //res.redirect('/login');
        //res.status(401).send(e);
    });
 */

if (req.userToken) {
    //Login ok, set cookie //8h
    res.cookie('x-token', req.userToken, {maxAge:8*60*60*1000, httpOnly: true}); 
    res.redirect('/');
        //res.render('./home_get.njk', {logged: true, title: 'wellcome-HOME-PAGE' });
 } else {
    //Login error, log again
    res.render('./login_get.njk', {err: req.setUserTokenError, title: 'LOGIN error (log in again..)'});
 }

});


module.exports = router;

