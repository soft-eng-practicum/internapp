/*
    Controller functions containing the logic for the logout routes
    Authors : Joseph Cox, Robert Bryan
*/

/*
    HTTP Req: GET
    URL: '/logout'
*/
module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};