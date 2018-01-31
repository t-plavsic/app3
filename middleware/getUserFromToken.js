var User = require('../models/userModel');
var jwt = require('jsonwebtoken');
var config = require('../config');

var getUserFromToken = (req, res, next) => {

    // check header or url parameters or post parameters for token
    //var token = req.body.token || req.query.token || req.headers['x-auth'];
    var userToken = req.header('x-auth') || req.cookies['x-token'];

    User.findByToken(userToken).then((foundUser) => {
        
        var user = {
            username: foundUser.username,
            email: foundUser.email,
            roles: {
                isAdmin: foundUser.roles.isAdmin,
                dbCollection: {
                    canCreate: foundUser.roles.dbCollection.canCreate,
                    canRead: foundUser.roles.dbCollection.canRead,
                    canEdit: foundUser.roles.dbCollection.canEdit,
                    canDelete: foundUser.roles.dbCollection.canDelete
                }
            }
        }

        req.user = user
            console.log('req.user: ', req.user);
        next();

    }, (e) => {
        req.userError = '403 Forbidden. No token provided!';
        next();
    });
};

module.exports = getUserFromToken;

/*     
    // decode token
    if (userToken) {
        // verifies secret and checks exp
        jwt.verify(userToken, config.secret, function (err, decodedUserToken) {
                             
                    // return res.status(401).json({
                    // success: false,
                    // message: '401 Unauthorized. Token not valid.'
                    // }); 

                req.userError = '401 Unauthorized. Token not valid.';
                next();
            } else {
                // if everything is good, save to request for use in other routes               
                     User.findById({_id: decodedUserToken._id}).then((foundUser) => {
                        
                        var user = {
                            username: foundUser.username,
                            email: foundUser.email,
                            roles: {
                                isAdmin: foundUser.roles.isAdmin,
                                dbCollection: {
                                    canCreate: foundUser.roles.dbCollection.canCreate,
                                    canRead: foundUser.roles.dbCollection.canRead,
                                    canEdit: foundUser.roles.dbCollection.canEdit,
                                    canDelete: foundUser.roles.dbCollection.canDelete
                                }
                            }
                        }

                        req.user = user;
                            //console.log('req.user: ', req.user);
                        next();
                    });
            }
        });
    } else {
        // if there is no token
        // return an error

            // return res.status(403).json({
            // success: false,
            // message: '403 Forbidden.No token provided.'
            // }); 
 
        req.userError = '403 Forbidden. No token provided.';
        next();
    }

 */