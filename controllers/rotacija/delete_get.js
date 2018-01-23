module.exports = function (req, res) {
    //mongoose.model('Rotacija', RotacijaSchema);
    var Rotacija = require('../../models/rotacijaModel');

    var id = req.params.id;

    Rotacija.findById(id, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            //console.log(doc);
            res.render('rotacija/delete_get.njk', {title: 'BRISANJE UNOSA - rotacija', doc: doc});
        }
      });
}
    
