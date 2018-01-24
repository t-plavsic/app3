var User = require('../models/userModel');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth') || req.cookies['x-token'];

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
  
};

module.exports = authenticate;