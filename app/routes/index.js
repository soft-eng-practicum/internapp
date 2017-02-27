/*
    Author: Robert Bryan
    
    - Routing page for the entire application
    - Utilizes the files within the controller folder
*/
    
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
    var ctrlReset = require('../controllers/reset');
    

    var ctrlUpload = require('../controllers/upload');

    // For document uploads
    var fileUpload = require('express-fileupload');
    
    var ctrlSiteNotes = require('../controllers/sitenotes');


    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
    }


module.exports = function(app, passport) {

    app.use(fileUpload()); // default options for file upload

    /* Home pages */
    app.get('/', ctrlHome.loadHome);

    /* Login page */
    app.get('/login', ctrlLogin.getLogin);
    app.post('/login', 
            passport.authenticate('local-login', {
            successRedirect : '/applications',
            failureRedirect : '/login',
            failureFlash : true
        }));

    /* Logout page */
    app.get('/logout', ctrlLogout.logout);

     /* Sign up page */
    app.get('/signup', ctrlSignUp.loadSignUp);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/applications',
            failureRedirect : '/signup',
            failureFlash : true
        }));

     /* Forgot password page */
     app.get('/forgot', ctrlForgot.getForgot);
     app.post('/forgot', ctrlForgot.postForgot);

     /* Reset password */
     app.get('/reset/:token', ctrlReset.getReset);
     app.post('/reset/:token', ctrlReset.postReset);

     /* Dashboard page */
     app.get('/dashboard', isLoggedIn, ctrlDashboard.loadDashboard);

     /* Applications pages - Could probably add some regex to reduce the routes */
     app.get('/applications', isLoggedIn, ctrlApplications.getApplications);
         // ITEC
    app.get('/itec', isLoggedIn, ctrlApplications.getItecApplication);
    app.get('/application/itec/documents/:applicationid/:documentid/:answer', isLoggedIn, ctrlApplications.updateApplicationDocument); 
    app.get('/application/itec/:applicationid', isLoggedIn, ctrlApplications.getSpecificApplication);
    app.post('/itec', isLoggedIn, isLoggedIn, ctrlApplications.postItecApplication);
    app.post('/application/itec/:applicationid', isLoggedIn, ctrlApplications.updateApplicationStatus);
    app.post('/application/itec/notes/:applicationid', ctrlApplications.addItecNotes);    
         // BIO
    app.get('/bio', isLoggedIn, ctrlApplications.getBioApplication);
    app.post('/bio', ctrlApplications.postBioApplication);
    app.get('/application/bio/:applicationid', isLoggedIn, ctrlApplications.getSpecificApplication);
    app.post('/application/bio/:applicationid', isLoggedIn, ctrlApplications.updateApplicationStatus);
    app.post('/application/bio/documents/:applicationid', isLoggedIn, ctrlApplications.addDocument);
    app.post('/application/bio/notes/:applicationid', isLoggedIn, ctrlApplications.addBioNotes);

    /* Sites pages & Add Site page */
    app.get('/sites', isLoggedIn, ctrlSites.getSites);
    app.get('/addsite', isLoggedIn, ctrlSites.getAddSite);
    app.get('/site/contacts/:siteid/:documentid', isLoggedIn, ctrlSites.getSiteDocument);
    app.get('/site/edit/:siteid', isLoggedIn, ctrlSites.getSiteToEdit);
    app.get('/site/:siteid', isLoggedIn, ctrlSites.getSiteDetails);
    app.post('/addSite', isLoggedIn, ctrlSites.postAddSite);
    app.post('/site/:siteid', isLoggedIn, ctrlSites.addSiteContact);
    app.post('/site/edit/:siteid', isLoggedIn, ctrlSites.updateSite);
    app.post('/site/delete/:siteid', isLoggedIn, ctrlSites.deleteSite);

    /* Promote page */
    app.get('/promote', isLoggedIn, ctrlPromote.getPromote);
    app.post('/promote', isLoggedIn, ctrlPromote.promoteUser);

    /* Edit Profile page */
    app.get('/editprofile', isLoggedIn, ctrlEditProfile.getEditProfile);
    app.post('/editprofile', isLoggedIn, ctrlEditProfile.updateProfile);

    /* FAQ page */
    app.get('/faq', ctrlFAQ.getFAQ);


    /* Document Upload page */
    //Place holder get for test upload page
    app.get('/upload', function(req, res) {
        res.render('upload');
    });

    // Upload resume
    app.post('/uploadItecResume', ctrlUpload.uploadItecResume);
    app.post('/uploadBioEssay', ctrlUpload.uploadBioEssay);
    app.post('/uploadBioTranscript', ctrlUpload.uploadBioTranscript);

    /* Site Notes page */
    app.get('/sitenotes',isLoggedIn, ctrlSiteNotes.getSiteNotesPage);

}

   
