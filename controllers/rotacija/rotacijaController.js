// Require MODEL modules
var Rotacija = require('../../models/rotacijaModel');
//mongoose.model('Rotacija', RotacijaSchema);

exports.index = function (req, res) {
    require('./index')(req, res);
};

// Display list of all rotacijas
exports.list = function (req, res) {
    //console.log('session:', req.session)
    require('./list')(req, res);
};

// Display detail page for a specific rotacija
exports.detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Rotacija detail: ' + req.params.id);
};

// Display rotacija create form on GET
exports.create_get = function (req, res) {
    //res.send('NOT IMPLEMENTED: Rotacija create GET');
    require('./create_get')(req, res);
};

// Handle rotacija create on POST
exports.create_post = function (req, res) {
    require('./create_post')(req, res);
    //res.send('NOT IMPLEMENTED: Rotacija create POST');
};

// Display rotacija delete form on GET
exports.delete_get = function (req, res) {
    //res.send('NOT IMPLEMENTED: Rotacija delete GET');
    require('./delete_get')(req, res);
};

// Handle rotacija delete on POST
exports.delete_post = function (req, res) {
    //res.send('NOT IMPLEMENTED: Rotacija delete POST');
    require('./delete_post')(req, res);
};

// Display rotacija update form on GET
exports.update_get = function (req, res) {
    //res.send('NOT IMPLEMENTED: Rotacija update GET');
    require('./update_get')(req, res);
};

// Handle rotacija update on POST
exports.update_post = function (req, res) {
    //res.send('NOT IMPLEMENTED: Rotacija update POST');
    require('./update_post')(req, res);
};

