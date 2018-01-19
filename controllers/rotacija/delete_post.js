module.exports = function (req, res) {
    //mongoose.model('Rotacija', RotacijaSchema);
    var Rotacija = require('../../models/rotacijaModel');

    var id = req.params.id;


    Rotacija.findByIdAndRemove(id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/rotacija/list');
        }
    });
}
