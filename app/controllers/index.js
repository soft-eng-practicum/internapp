/*
    Controller functions containing the logic for the home routes
    Authors : Joseph Cox, Robert Bryan
*/

var isInvalidURL = false;

/*
    HTTP Req: GET
    URL: '/'
*/
module.exports.loadIndex = function(req, res) {   
     isInvalidURL = false;
     res.render('index', {
         user: req.session.passport.user
     });
}; 
  


