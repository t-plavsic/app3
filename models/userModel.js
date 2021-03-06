const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../config');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema({

  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  roles: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    dbCollection: {
      canCreate: [ String ],
      canRead: [{ type: String }],
      canEdit: [{ type: String }],
      canDelete: [{ type: String }],
    },
  },
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
  hashedPassword: {
    type: String
  }
},
  { collection: 'users' }
);

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'username', 'email']);
};

userSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({ _id: user._id.toHexString(), access }, config.secret).toString();

  user.tokens.push({ access, token });

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

/*   return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  }); */

  return User.findById({
    '_id': decoded._id
  });

};

userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.hashedPassword = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.statics.findByCredentials = function (username, password) {
  var User = this;

  return User.findOne({ username }).then((user) => {
    if (!user) {
      return Promise.reject('User not found.');
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.hashedPassword, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject('Invalid password.');
        }
      });
    });
  });
};

userSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: { token }
    }
  });
};

//Export model
module.exports = mongoose.model('User', userSchema);

//var User = mongoose.model('User', {});
//module.exports = {User}