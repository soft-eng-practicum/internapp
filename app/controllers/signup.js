/*
    Controller functions containing the signup for the application routes
    Authors : Joseph Cox, Robert Bryan
*/

/*
    HTTP Req: GET
    URL: '/signup'
*/
module.exports.loadSignUp = function(req, res) {
    res.render('signup.ejs', {
        failureMessage: req.flash('failure'),
        successMessage: req.flash('success')
    });
}; 
