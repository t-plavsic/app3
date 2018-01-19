module.exports = function (req, res) {
    //mongoose.model('Rotacija', RotacijaSchema);
    var Rotacija = require('../../models/rotacijaModel');

    //var moment = require('moment');
    //var today = new Date();
    //var danas = moment(today).format('DD/MM/YYYY');

    var id = req.params.id;

    Rotacija.findById(id, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            res.render('rotacija/update_get.njk', {
                title: 'PROMJENA UNOSA - rotacija', 
                doc: doc
            });
        }
      });
}
       
 
    