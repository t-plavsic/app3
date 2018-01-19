var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var RotacijaSchema = new Schema(
  {
    type: {type: String, default: 'default'},
    prezime_ime: {type: String, required: true, max: 100},
    opaska: {type: String, required: true, max: 100},
    brojDana: {type: Number},
    datumCreated: {type: Date},
    datumFuture: {type: Date},
    datumFutureFormated: {type: String}
  } 
);

// Virtual for rotacija's URL
RotacijaSchema
.virtual('url')
.get(function () {
  return '/rotacija/' + this._id;
});

// Virtual for rotacija's URL
RotacijaSchema
.virtual('datumDDMMYYY')
.get(function () {
  return moment(this.datumCreated).format('DD/MM/YYYY');
});

//Export model
module.exports = mongoose.model('Rotacija', RotacijaSchema);