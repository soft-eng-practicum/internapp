/*
    Controller functions containing the logic for the login routes
    Authors : Joseph Cox, Robert Bryan
*/

/*
    HTTP Req: GET
    URL: '/login'
*/
module.exports.getLogin = function(req, res) {
    res.render('login.ejs', {
        successMessage : req.flash('success'),
        failureMessage : req.flash('failure')
    });
};





