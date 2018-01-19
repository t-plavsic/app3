var express = require('express');
var router = express.Router();

// Require CONTROLLER modules
var rotacija_controller = require('../controllers/rotacija/rotacijaController');

/// ROTACIJA ROUTES ///

/* GET rotacija home page. */
router.get('/', rotacija_controller.index);

/* GET request for list of all Rotacija items. */
router.get('/list', rotacija_controller.list);

/* GET request for creating a Rotacija. 
NOTE This must come before routes that display Rotacija (uses id) */
router.get('/create', rotacija_controller.create_get);


/* GET request for one Rotacija. */
router.get('/:id', rotacija_controller.detail);


/* POST request for creating Rotacija. */
router.post('/create', rotacija_controller.create_post);

/* GET request to delete Rotacija. */
router.get('/:id/delete', rotacija_controller.delete_get);

// POST request to delete Rotacija
router.post('/:id/delete', rotacija_controller.delete_post);

/* GET request to update Rotacija. */
router.get('/:id/update', rotacija_controller.update_get);

// POST request to update Rotacija
router.post('/:id/update', rotacija_controller.update_post);


module.exports = router;