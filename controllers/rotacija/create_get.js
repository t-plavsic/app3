
module.exports = function (req, res) {
    //mongoose.model('Rotacija', RotacijaSchema);
    var Rotacija = require('../../models/rotacijaModel');
    res.render('rotacija/create_get.njk', {title: 'NOVI UNOS - rotacija'});
} 
              