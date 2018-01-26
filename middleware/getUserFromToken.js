var jwt = require('jsonwebtoken');
var config = require('../config');

var getUserFromToken = (req, res, next) => {

    // check header or url parameters or post parameters for token
    //var token = req.body.token || req.query.token || req.headers['x-auth'];
    var userToken = req.header('x-auth') || req.cookies['x-token'];

    // decode token
    if (userToken) {
        // verifies secret and checks exp
        jwt.verify(userToken, config.secret, function (err, decodedUserToken) {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: '401 Unauthorized. Token not valid.'
                });
            } else {
                // if everything is good, save to request for use in other routes               
                req.user = decodedUserToken;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).json({
            success: false,
            message: '403 Forbidden.No token provided.'
        });
    }
};

module.exports = getUserFromToken;

