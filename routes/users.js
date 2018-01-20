var _ = require('lodash');
var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// POST /users
router.post('/', (req, res) => {
  var body = _.pick(req.body, ['email', 'username', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })

});

module.exports = router;

