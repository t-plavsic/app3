
var config = require('../config');


var setCookieFromUserToken = (req, res, next) => {

    if (req.userToken) {
        //Login ok, set cookie 
        res.cookie('x-token', req.userToken, {maxAge: config.cookieMaxAge, httpOnly: true});    
    }
    next();
};

module.exports = setCookieFromUserToken;

