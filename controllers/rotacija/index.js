module.exports = function (req, res) {
    //mongoose.model('Rotacija', RotacijaSchema);
    var Rotacija = require('../../models/rotacijaModel');
    res.render('rotacija/index.njk', {username: req.user.username });

}
