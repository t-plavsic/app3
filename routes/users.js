var _ = require('lodash');
var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var authenticate = require('../middleware/authenticate');

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
// POST /users/login {username, password}
router.post('/login', (req, res) => {
  var body = _.pick(req.body, ['username', 'password']);

  User.findByCredentials(body.username, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});



router.get('/me', authenticate, (req, res) => {
  res.send(req.user);
});

module.exports = router;

