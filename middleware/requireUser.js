
var requireUser = (req, res, next) => {

    if (req.user) {
        //User ok
        next();
    } else {
        res.redirect('/');
    }

};

module.exports = requireUser;
