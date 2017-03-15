/*
    Controller functions containing the logic for the home routes
    Authors : Joseph Cox, Robert Bryan
*/

var isInvalidURL = false;

/*
    HTTP Req: GET
    URL: '/'
*/
module.exports.loadHome = function(req, res) {   
    if (isInvalidURL) {
        req.flash('homepage', 'The URL you entered was not recognized.')
    }
    isInvalidURL = false;
    res.render('index', {
        user: req.session.passport.user,
        urlError: req.flash('homepage')
    });
}; 

// Set invalid url from the index.js routes file
module.exports.setInvalidURL = function(boo) {
    isInvalidURL = boo;
}


