/*
    Controller functions containing the logic for the home routes
    Authors : Joseph Cox, Robert Bryan
*/

/*
    HTTP Req: GET
    URL: '/'
*/
module.exports.loadHome = function(req, res) {

    var user = {
        role : "admin"
    };
    res.render('index.ejs', {
        user: user // pass in a user for the index.ejs to access
    }); 
}; 

