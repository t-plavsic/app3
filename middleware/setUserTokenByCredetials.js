var User = require('../models/userModel');
var jwt = require('jsonwebtoken');
var config = require('../config');

//LOG-IN
var setUserTokenByCredetials = (req, res, next) => {

    // find the user
    User.findByCredentials(req.body.username, req.body.password)
        .then((user) => {

            // user is found and password is right
            // create a token
            var usr = {
                _id: user._id.toHexString(),
                username: user.username,
                accessRole: user.tokens[0].access
            }
            var userToken = jwt.sign(usr, config.secret, {              
                expiresIn: config.tokenExpireTime
            });

            req.userToken = userToken;
            
            //res.header('x-auth', token);
            //res.json({userToken: userToken});
            //res.cookie('x-token', userToken, {maxAge:24*60*60*1000, httpOnly: true});

            next();

        }, (e) => {
            //e:
            //'User not found.'
            //'Invalid password.'
            req.userTokenError = e;
            next();
            //next(e);
            //res.render('./login_get.njk', {err: e, title: 'LOGIN (try again..)'});
        });

    /*     
        User.findOne({
            name: req.body.name
        }, function (err, user) {
    
            if (err)
                throw err;
    
            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {
    
                // check if password matches
                if (user.password != req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {
    
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
    */


    /*     
        User.findByCredentials(req.body.username, req.body.password)
        .then((user) => {
            //user is found, password is ok
                res.cookie('x-token', user.tokens[0].token, {maxAge:24*60*60*1000, httpOnly: true});
            //res.cookie('x-token', req.userToken, {maxAge:24*60*60*1000, httpOnly: true});        
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

};

module.exports = setUserTokenByCredetials;