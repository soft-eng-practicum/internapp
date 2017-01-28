
    var ctrlHome = require('../controllers/home');
    var ctrlLogin = require('../controllers/login');
    var ctrlSignUp = require('../controllers/signup');
    var ctrlForgot = require('../controllers/forgot');
    var ctrlDashboard = require('../controllers/dashboard');
    var ctrlApplications = require('../controllers/applications');
    var ctrlSites = require('../controllers/sites');
    var ctrlPromote = require('../controllers/promote');
    var ctrlEditProfile = require('../controllers/editprofile');
    var ctrlFAQ = require('../controllers/faq');
    var ctrlLogout = require('../controllers/logout');


    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
    }


module.exports = function(app, passport) {

    /* Home pages */
    app.get('/', ctrlHome.loadHome);

    /* Login page */
    app.get('/login', ctrlLogin.getLogin);
    app.post('/login', 
            passport.authenticate('local-login', {
            successRedirect : '/dashboard',
            failureRedirect : '/login',
            failureFlash : true
        }));

    /* Logout page */
    app.get('/logout', ctrlLogout.logout);

     /* Sign up page */
    app.get('/signup', ctrlSignUp.loadSignUp);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/dashboard',
            failureRedirect : '/signup',
            failureFlash : true
        }));

     /* Forgot password page */
     //app.get('/forgot', ctrlSignUp.getForgot);
     //app.post('/forgot', ctrlSignUp.postForgot);

     /* Dashboard page */
     app.get('/dashboard', isLoggedIn, ctrlDashboard.loadDashboard);

     /* Applications pages - Could probably add some regex to reduce the routes */
     app.get('/applications', isLoggedIn, ctrlApplications.getApplications);
         // ITEC
    app.get('/itec', isLoggedIn, ctrlApplications.getItecApplication);
    app.get('/application/itec/documents/:applicationid/:documentid/:answer', isLoggedIn, ctrlApplications.updateApplicationDocument); 
    app.get('/application/itec/:applicationid', ctrlApplications.getSpecificApplication);
    app.post('/itec', isLoggedIn, ctrlApplications.postItecApplication);
    app.post('/application/itec/:applicationid', ctrlApplications.updateApplicationStatus);
    app.post('/application/itec/notes/:applicationid', ctrlApplications.addItecNotes);    
         // BIO
    app.get('/bio', ctrlApplications.getBioApplication);
    app.post('/bio', ctrlApplications.postBioApplication);
    app.get('/application/bio/:applicationid', ctrlApplications.getSpecificApplication);
    app.post('/application/bio/:applicationid', ctrlApplications.updateApplicationStatus);
    app.post('/application/bio/documents/:applicationid', ctrlApplications.addDocument);
    app.post('/application/bio/notes/:applicationid', ctrlApplications.addBioNotes);

    // /* Sites pages & Add Site page */
    // router.get('/sites', ctrlSites.getSites);
    // router.put('/site/edit/:siteid', ctrlSites.updateSite);
    // router.get('/site/edit/:siteid', ctrlSites.getSiteToEdit);
    // router.delete('/site/:siteid', ctrlSites.deleteSite);
    // router.get('/site/:siteid', ctrlSites.getSiteDetails);
    // router.post('/site/:siteid', ctrlSites.addSiteContact);

    // /* Promote page */
    // router.get('/promote', ctrlPromote.getPromote);
    // router.post('/promote', ctrlPromote.promoteUser);

    // /* Edit Profile page */
    // router.get('/editprofile', ctrlEditProfile.getEditProfile);
    // router.post('/editprofile', ctrlEditProfile.updateProfile);

    // /* FAQ page */
    // router.get('/faq', ctrlFAQ.getFAQ);
}

   
