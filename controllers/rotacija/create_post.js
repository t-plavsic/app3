module.exports = function (req, res) {
    //mongoose.model('Rotacija', RotacijaSchema);
    var Rotacija = require('../../models/rotacijaModel');
    var Utils = require('../../utils/addDate');

    //console.log(req.body)

    var newRot = {
        prezime_ime: req.body.prezime_ime,
        opaska: req.body.opaska,
        brojDana:req.body.brojDana,
        datumCreated: new Date(),
        datumFuture: Utils.addDays(req.body.brojDana),
        datumFutureFormated: Utils.addDaysDDMMYYY(req.body.brojDana)
    }

    //console.log(newRot)

    var rotacija = new Rotacija(newRot);
    rotacija.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/rotacija/list');
        }
    });


}


