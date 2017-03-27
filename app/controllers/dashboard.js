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

    Bio.doesUserHaveBioApp(req.user.email, function (haveBio) {
            haveBioApp = haveBio;
            Bio.getUsersBioApp(req.user.email, function (incomingBioApp) {
                bioApp = incomingBioApp;
                console.log('bioooApp ', bioApp);
                Itec.doesUserHaveItecApp(req.user.email, function(haveItec) {
                    haveItecApp = haveItec;
                    if (haveItecApp) {
                    // to do   
                    }
                    res.render('dashboard.ejs', {
                        successMessage : req.flash('success'),
                        failureMessage: req.flash('failure'),
                        user : req.session.passport.user,
                        bioApp : bioApp,
                        haveBioApp: haveBioApp,
                        haveItecApp: haveItecApp
                    }); 
                });
            });
    });


   

}; 
