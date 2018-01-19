module.exports = function (req, res) {
    //mongoose.model('Rotacija', RotacijaSchema);
    var Rotacija = require('../../models/rotacijaModel');
    var Utils = require('../../utils/addDate');
    
    var id = req.params.id;

    var newRot = {
        prezime_ime: req.body.prezime_ime,
        opaska: req.body.opaska,
        brojDana: req.body.brojDana,
        datumFuture: Utils.addDays(req.body.brojDana),
        datumFutureFormated: Utils.addDaysDDMMYYY(req.body.brojDana)
    }

    Rotacija.findByIdAndUpdate(id, newRot, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/rotacija/list');
        }
    });


}