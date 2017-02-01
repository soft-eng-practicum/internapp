/*
    Controller functions containing the logic for the faq routes
    Authors : Joseph Cox, Robert Bryan
*/

/*
    HTTP Req: GET
    URL: '/faq'
*/
module.exports.getFAQ = function(req, res) {
    res.render('faq.ejs');
};