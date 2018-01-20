const mongoose = require('mongoose');
const validator = require('validator');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
      },    
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
          validator: validator.isEmail,
          message: '{VALUE} is not a valid email'
        }
      },
      password: {
        type: String,
        require: true,
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

//Export model
module.exports = mongoose.model('User', userSchema);

//var User = mongoose.model('User', {});
//module.exports = {User}