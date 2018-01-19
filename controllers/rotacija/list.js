
module.exports = function (req, res) {
    //mongoose.model('Rotacija', RotacijaSchema);
    var Rotacija = require('../../models/rotacijaModel');

    Rotacija.find({}).sort( { datumFuture: 1 } )
        .exec(function (err, data) {
            if (err) { return next(err); }
            res.render('rotacija/rotacija_list', { title: 'LISTA - rotacija', rotacija_list: data });
        });
}
