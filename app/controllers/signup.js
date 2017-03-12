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
    message: req.flash('signupMessage') 
    });
}; 

/*
    HTTP Req: POST
    URL: '/signup'
*/
module.exports.signup = () => {
    return {
        successRedirect : '/appliactions',
        failureRedirect : '/signup'
    };
};