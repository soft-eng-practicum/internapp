/*
    Controller functions containing the logic for the dashboard routes
    Authors : Joseph Cox, Robert Bryan
*/

var Bio = require('../models/bio');
var Itec = require('../models/itec');

/*
    HTTP Req: GET
    URL: '/dashboard'
*/
module.exports.loadDashboard = function(req, res) {

    var haveBioApp;
    var haveItecApp;
    var bioApp;
    var itecApp;

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
