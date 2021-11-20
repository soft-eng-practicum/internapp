/*
    Controller functions containing the logic for the support routes
    Authors : Matthew Rosario
*/

/*
    HTTP Req: GET
    URL: '/support'
*/
module.exports.getSupport = function(req, res) {
    if (req.isAuthenticated()) {
        res.render('support.ejs', {
            user: req.user
        });
    } else {
        res.render('support.ejs');
    }
};