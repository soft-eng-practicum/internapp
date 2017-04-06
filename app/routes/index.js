/*
    Author: Robert Bryan

    - Routing page for the entire application
    - Utilizes the files within the controller folder
*/

    // Variables to reference the controller functions within each controller file
    var ctrlIndex = require('../controllers/index');
    var ctrlLogin = require('../controllers/login');
    var ctrlSignUp = require('../controllers/signup');
    var ctrlForgot = require('../controllers/forgot');
    var ctrlHome = require('../controllers/home');
    var ctrlApplications = require('../controllers/applications');
    var ctrlSites = require('../controllers/sites');
    var ctrlPromote = require('../controllers/promote');
    var ctrlEditProfile = require('../controllers/editprofile');
    var ctrlFAQ = require('../controllers/faq');
    var ctrlLogout = require('../controllers/logout');
    var ctrlReset = require('../controllers/reset');
    var ctrlMongoToCsv = require('../controllers/mongoToCsv');
    var ctrlUpload = require('../controllers/documentUpload');
    var ctrlSiteNotes = require('../controllers/sitenotes');
    var ctrlEditApps = require('../controllers/editApplications');

    // For document uploads
    var fileUpload = require('express-fileupload');

    // For creating csv directory
    var mkdirp = require('mkdirp');

    var ctrlSiteNotes = require('../controllers/sitenotes');

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        console.log('user not logged in');
        res.redirect('/');
    }

    function isAdmin(req, res, next) {
        if (req.user.role == 'admin') {
            return next();
        } else {
            res.redirect('/home');
        }
    }

    function isAdminOrInstructor(req, res, next) {
        if (req.user.role == 'admin' || req.user.role == 'instructor') {
            return next();
        } else {
            res.redirect('/home');
        }
    }

    // Creates a csv directory for the csv files - if not already created
    function makeCSVDirectory(req, res, next) {
        mkdirp('./csv', function(err) {
            if (err) console.error(err)
            else {
                console.log('CSV directory created!');
                next();
            }
        });
    }

module.exports = function(app, passport) {

    app.use(fileUpload()); // default options for file upload

    /* Home pages */
    app.get('/', ctrlIndex.loadIndex);

    /* Login page */
    app.get('/login', ctrlLogin.getLogin);
    app.post('/login',
            passport.authenticate('local-login', {
            successRedirect : '/home',
            failureRedirect : '/login',
            failureFlash : true
        }));

    /* Logout page */
    app.get('/logout', ctrlLogout.logout);

     /* Sign up page */
    app.get('/signup', ctrlSignUp.loadSignUp);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/home',
            failureRedirect : '/signup',
            failureFlash : true
        }));

     /* Forgot password page */
     app.get('/forgot', ctrlForgot.getForgot);
     app.post('/forgot', ctrlForgot.postForgot);

     /* Reset password */
     app.get('/reset/:token', ctrlReset.getReset);
     app.post('/reset/:token', ctrlReset.postReset);

     /* user home page */
     app.get('/home', isLoggedIn, ctrlHome.loadUserHome);

     /* admin home page */
     app.get('/adminhome', isLoggedIn, isAdmin, ctrlHome.loadAdminHome);
     app.post('/adminhome', isLoggedIn, isAdmin, ctrlHome.postAdminHome);

     /* Applications pages - Could probably add some regex to reduce the routes */
     app.get('/applications', isLoggedIn, ctrlApplications.getApplications);
     app.post('/applications', makeCSVDirectory, isLoggedIn, ctrlApplications.exportApplications);
         // ITEC
    app.get('/itec', isLoggedIn, ctrlApplications.getItecApplication);
    // app.get('/application/itec/documents/:applicationid/:documentid/:answer', isLoggedIn, ctrlApplications.updateApplicationDocument);
    app.get('/application/itec/:applicationid', isLoggedIn, ctrlApplications.getSpecificItecApplication);
    app.post('/itec', isLoggedIn, ctrlApplications.postItecApplication);
    app.post('/application/itec/notes/:applicationid', ctrlApplications.addItecNotes);
    app.get('/application/itec/:applicationId/notes/delete/:noteId', isLoggedIn, ctrlApplications.deleteItecNote); 
    app.post('/application/itec/feedback/:applicationid', isLoggedIn, ctrlApplications.addItecFeedback);
    app.get('/application/itec/:applicationId/feedback/delete/:feedbackId', isLoggedIn, ctrlApplications.deleteItecFeedback);    
         // BIO
    app.get('/bio', ctrlApplications.getBioApplication);
    app.post('/bio', isLoggedIn, ctrlApplications.postBioApplication);
    app.get('/application/bio/:applicationid', isLoggedIn, ctrlApplications.getSpecificBioApplication);
    app.post('/application/bio/notes/:applicationid', isLoggedIn, ctrlApplications.addBioNotes);
    app.get('/application/bio/:applicationId/notes/delete/:noteId', isLoggedIn, ctrlApplications.deleteBioNote); 
    app.post('/application/bio/feedback/:applicationid', isLoggedIn, ctrlApplications.addBioFeedback);
    app.get('/application/bio/:applicationId/feedback/delete/:feedbackId', isLoggedIn, ctrlApplications.deleteBioFeedback); 
        // BIO & ITEC
    app.post('/application/:type(itec|bio)/:applicationid', isLoggedIn, ctrlApplications.updateApplicationStatus);

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
    app.get('/site/:siteId/export/contacts', makeCSVDirectory, isLoggedIn, ctrlSites.exportContacts);

    /* Promote page */
    app.get('/promote', isLoggedIn, ctrlPromote.getPromote);
    app.post('/promote', isLoggedIn, ctrlPromote.promoteUser);

    /* Edit Profile page */
    app.get('/editprofile', isLoggedIn, ctrlEditProfile.getEditProfile);
    app.post('/editprofile', isLoggedIn, ctrlEditProfile.updateProfile);

    /* FAQ page */
    app.get('/faq', ctrlFAQ.getFAQ);

    /* Document Upload page */
    // app.get('/documentUpload', isLoggedIn, ctrlUpload.getDocumentUpload);
    app.get('/downloadFerpa', isLoggedIn, ctrlUpload.downloadFerpa);
    app.get('/document/:documentId', isLoggedIn, ctrlUpload.getSpecificDocument);
    app.get('/document/:documentId/note/delete/:noteId', isLoggedIn, ctrlUpload.deleteDocumentNote);
    app.get('/document/:documentId/feedback/delete/:feedbackId', isLoggedIn, ctrlUpload.deleteDocumentFeedback);
    app.post('/document/status/:documentId', isLoggedIn, ctrlUpload.updateSpecificDocumentStatus);
    app.post('/document/notes/:documentId', isLoggedIn, ctrlUpload.addSpecificDocumentNotes);
    app.post('/document/feedback/:documentId', isLoggedIn, ctrlUpload.addSpecificDocumentFeedback);

        // Upload routes 
    app.post('/uploadItecResume',isLoggedIn, ctrlUpload.uploadItecResume);
    app.post('/uploadBioEssay', isLoggedIn, ctrlUpload.uploadBioEssay);
    app.post('/uploadBioTranscript', isLoggedIn, ctrlUpload.uploadBioTranscript);
    app.post('/uploadItecFerpa', isLoggedIn, ctrlUpload.uploadItecFerpa);
    
    // Upload resume
    app.post('/uploadItecResume',isLoggedIn, ctrlUpload.uploadItecResume);
    app.post('/uploadBioEssay', isLoggedIn, ctrlUpload.uploadBioEssay);
    app.post('/uploadBioTranscript', isLoggedIn, ctrlUpload.uploadBioTranscript);
    app.post('/uploadItecFerpa', isLoggedIn, ctrlUpload.uploadItecFerpa);

    /*Export Page*/
    app.get('/export', isLoggedIn, ctrlMongoToCsv.getExport);

    // Mongo To Csv
    app.get('/exportItec', makeCSVDirectory, ctrlMongoToCsv.exportItec);
    // TO DO app.get('/exportBio', ctrlMongoToCsv);
    // TO DO (maybe) app.get('/exportUser', ctrlMongoToCsv);
    app.get('/exportSite', makeCSVDirectory, ctrlMongoToCsv.exportSite);
    app.get('/exportSiteInfo', makeCSVDirectory, ctrlMongoToCsv.exportSiteInfo);

    /* Site Notes page */
    app.get('/sitenotes', isLoggedIn, ctrlSiteNotes.getSiteNotesPage);
    app.post('/site/note/:siteId',isLoggedIn, ctrlSiteNotes.addSiteNote);
    app.get('/site/:siteId/note/delete/:noteId', isLoggedIn, ctrlSiteNotes.deleteSiteNote);

    app.get('/edititec', isLoggedIn, ctrlEditApps.getEditItec);
    app.get('/editbio', isLoggedIn, ctrlEditApps.getEditBio);
    app.post('/edititec', isLoggedIn, ctrlEditApps.updateItecApp);
    app.post('/editbio', isLoggedIn, ctrlEditApps.updateBioApp);
    
    /* TEST ROUTES */
    app.get('/adminhome', isAdmin, function(req, res) {
        console.log('hi from admin home route');
        res.render('adminhome');
    });
   
}
