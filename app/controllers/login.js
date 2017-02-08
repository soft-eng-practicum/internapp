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
        message : req.flash('loginMessage')
    });
};





