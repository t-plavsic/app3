var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId
    //,required: true
  }
});

// Virtual for rotacija's URL
todoSchema
  .virtual('url')
  .get(function () {
    return '/todos/' + this._id;
  });

//Export model
module.exports = mongoose.model('Todo', todoSchema);

//var Todo = mongoose.model('Todo', {});
//module.exports = {Todo};