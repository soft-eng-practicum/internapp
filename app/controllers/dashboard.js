/*
    Controller functions containing the logic for the dashboard routes
    Authors : Joseph Cox, Robert Bryan
*/

/*
    HTTP Req: GET
    URL: '/dashboard'
*/
var Bio = require('../models/bio');
var Itec = require('../models/itec');

module.exports.loadDashboard = function(req, res) {

    var haveBioApp;
    var haveItecApp;
    var bioApp;
    var itecApp;

/*
    NEED TO PASS IN THE APPLICATION ID FOR EACH OF THE USER'S APPLICATIONS
*/
            Bio.getUsersBioApp(req.user.email, function (incomingBioApp) {
                bioApp = incomingBioApp;
                Itec.getUsersItecApp(req.user.email, function (incomingItecApp) {
                    itecApp = incomingItecApp;    
                        res.render('dashboard.ejs', {
                            successMessage : req.flash('success'),
                            failureMessage: req.flash('failure'),
                            user : req.session.passport.user,
                            bioApp : bioApp,
                            itecApp : itecApp
                        }); 
                    });
            });


   

}; 
