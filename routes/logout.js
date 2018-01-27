

var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    //console.log('x-token', req.cookies['x-token']);
    res.clearCookie('x-token' , {httpOnly: true})
    res.render('./login_get.njk', {err: 'Logged out.', title: 'LOG-IN'});
});

module.exports = router;