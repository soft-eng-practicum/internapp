/*
    Controller functions containing the logic for the home routes
    Authors : Joseph Cox, Robert Bryan
*/

/*
    HTTP Req: GET
    URL: '/'
*/
module.exports.loadHome = function(req, res) {
    res.render('index.ejs', {
        user: req.session.passport.user
    }); 
}; 