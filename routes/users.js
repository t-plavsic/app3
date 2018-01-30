var _ = require('lodash');
var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var authenticate = require('../middleware/authenticate');

/* GET users listing. */
router.get('/', function (req, res, next) {
  
  User.find({}).then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
  
});

// POST /users
router.post('/', (req, res) => {
  var body = _.pick(req.body, ['email', 'username', 'password', 'roles']);
  var user = new User(body);
  //user.markModified('roles');

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
    res.status(400).send(e);
  });
});

router.get('/me', authenticate, (req, res) => {
  res.send(req.user);
});

router.delete('/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send('Token deleted');
  }, () => {
    res.status(400).send();
  });
});


module.exports = router;


/* 
{
  "username": "dr",
  "email": "doktor.amb.plavsic@gmail.com",
  "password":"dr",
  "roles": {
    "isAdmin": true,
    "dbCollection": {
      "canCreate": ["users","rotacije", "todos"],
      "canRead":   ["users","rotacije", "todos"],
      "canEdit":   ["users","rotacije", "todos'"],
      "canDelete": ["users","rotacije", "todos"]
    }
  }
}

{
  "username": "sr",
  "email": "sestra.amb.plavsic@gmail.com",
  "password":"sr",
  "roles": {
    "isAdmin": false,
    "dbCollection": {
      "canCreate": ["rotacije", "todos"],
      "canRead":   ["rotacije", "todos"],
      "canEdit":   ["rotacije", "todos'"],
      "canDelete": ["rotacije", "todos"]
    }
  }
}











 */
