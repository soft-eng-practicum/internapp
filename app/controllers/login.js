/*
    Controller functions containing the logic for the login routes
    Authors : Joseph Cox, Robert Bryan
*/

/*
    HTTP Req: POST
    URL: '/login'
*/
module.exports.login = function(req, res) {
    passport.authenticate('local-login', {
        successRedirect : '/applications',
        failureRedirect : '/login',
        failureFlash : true
    });
};

/*
    HTTP Req: GET
    URL: '/login'
*/
module.exports.getLogin = function(req, res) {
    res.render('login.ejs', {
        message : req.flash('loginMessage')
    });
};





