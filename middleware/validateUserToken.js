var jwt = require('jsonwebtoken');
var config = require('../config');

var validateUserToken = (req, res, next) => {
  var token = req.header('x-auth') || req.cookies['x-token'];

    // check header or url parameters or post parameters for token
    //var token = req.body.token || req.query.token || req.headers['x-auth'];
    var token = req.header('x-auth') || req.cookies['x-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}

module.exports = validateUserToken;