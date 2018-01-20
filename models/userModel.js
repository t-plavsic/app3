const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../config');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 1

      },    
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 1,
        validate: {
          validator: validator.isEmail,
          message: '{VALUE} is not a valid email'
        }
      },
      password: {
        type: String,
        required: true,
        minlength: 2
      },
      tokens: [{
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }]
});

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'username', 'email']);
};

userSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, config.secret).toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

userSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, config.secret);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

//Export model
module.exports = mongoose.model('User', userSchema);

//var User = mongoose.model('User', {});
//module.exports = {User}