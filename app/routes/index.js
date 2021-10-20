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
var ctrlEditApps = require('../controllers/editApplications');
var ctrlExport = require('../controllers/export');
var ctrlSites = require('../controllers/sites');
var ctrlPromote = require('../controllers/promote');
var ctrlEditProfile = require('../controllers/editprofile');
var ctrlFAQ = require('../controllers/faq');
var ctrlLogout = require('../controllers/logout');
var ctrlReset = require('../controllers/reset');
var ctrlMongoToCsv = require('../controllers/mongoToCsv');
var ctrlUpload = require('../controllers/documentUpload');
var ctrlDelete = require('../controllers/documentDelete');
var ctrlSiteNotes = require('../controllers/sitenotes');
var ctrlSupport = require('../controllers/support');
//var ctrlMultiDownload  = require('../controllers/ ');



var ctrlHelp = require('../controllers/help');

// For document uploads
var fileUpload = require('express-fileupload');

// For creating csv directory
var mkdirp = require('mkdirp');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    console.log('user not logged in');
    res.redirect('/');
}

// If not admin redirect home
function isAdmin(req, res, next) {
    if (req.user.role == 'admin') {
        return next();
    } else {
        res.redirect('/home');
    }
}

// If not admin or instructor redirect home
function isAdminOrInstructor(req, res, next) {
    if (req.user.role == 'admin' || req.user.role == 'instructor') {
        return next();
    } else {
        res.redirect('/home');
    }
}

// Creates a csv directory for the csv files - if not already created
function makeCSVDirectory(req, res, next) {
    mkdirp('./csv', function (err) {
        if (err) console.error(err)
        else {
            console.log('CSV directory created!');
            next();
        }
    });
}

module.exports = function (app, passport) {

    app.use(fileUpload()); // default options for file upload

    /* Home pages */
    app.get('/', ctrlIndex.loadIndex);

    /* Login page */
    app.get('/login', ctrlLogin.getLogin);
    app.post('/login',
        passport.authenticate('local-login', {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
        }));

    /* Logout page */
    app.get('/logout', ctrlLogout.logout);

    /* Sign up page */
    app.get('/signup', ctrlSignUp.loadSignUp);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /* Forgot password page */
    app.get('/forgot', ctrlForgot.getForgot);
    app.post('/forgot', ctrlForgot.postForgot);

    /* Reset password */
    app.get('/reset/:token', ctrlReset.getReset);
    app.post('/reset/:token', ctrlReset.postReset);

    /* user home page */
    app.get('/home', isLoggedIn, ctrlHome.loadUserHome);
    app.get('/document/delete/:documentId', isLoggedIn, ctrlApplications.deleteDoc);

    /* admin home page */
    app.get('/adminhome', isLoggedIn, isAdminOrInstructor, ctrlHome.loadAdminHome);
    app.post('/adminhome', isLoggedIn, isAdminOrInstructor, ctrlHome.postAdminHome);

    /* Applications pages */
    app.get('/applications', isLoggedIn, isAdminOrInstructor, ctrlApplications.getApplications);
    app.post('/applications', makeCSVDirectory, isLoggedIn, isAdminOrInstructor, ctrlApplications.filterApplications);

    // ITEC
    app.get('/itec', isLoggedIn, ctrlApplications.getItecApplication);
    app.get('/application/itec/:applicationid', isLoggedIn, ctrlApplications.getSpecificItecApplication);
    app.post('/itec', isLoggedIn, ctrlApplications.postItecApplication);
    app.post('/application/itec/notes/:applicationid', ctrlApplications.addItecNotes);
    app.get('/application/itec/:applicationId/notes/delete/:noteId', isLoggedIn, ctrlApplications.deleteItecNote);
    app.post('/application/itec/feedback/:applicationid', isLoggedIn, ctrlApplications.addItecFeedback);
    app.get('/application/itec/:applicationId/feedback/delete/:feedbackId', isLoggedIn, ctrlApplications.deleteItecFeedback);
    app.get('/application/itec/:applicationid/delete/', isLoggedIn, ctrlApplications.removeSpecificItecApplication);
    app.get('/application/itec/:applicationId/document/delete/:documentId', isLoggedIn, ctrlApplications.deleteItecDoc);
    // BIO
    app.get('/bio', isLoggedIn, ctrlApplications.getBioApplication);
    app.post('/bio', isLoggedIn, ctrlApplications.postBioApplication);
    app.get('/application/bio/:applicationid', isLoggedIn, ctrlApplications.getSpecificBioApplication);
    app.post('/application/bio/notes/:applicationid', isLoggedIn, ctrlApplications.addBioNotes);
    app.get('/application/bio/:applicationId/notes/delete/:noteId', isLoggedIn, isAdminOrInstructor, ctrlApplications.deleteBioNote);
    app.post('/application/bio/feedback/:applicationid', isLoggedIn, isAdmin, ctrlApplications.addBioFeedback);
    app.get('/application/bio/:applicationId/feedback/delete/:feedbackId', isLoggedIn, isAdmin, ctrlApplications.deleteBioFeedback);
    app.get('/application/bio/:applicationid/delete/', isLoggedIn, ctrlApplications.removeSpecificBioApplication);
    app.get('/application/bio/:applicationId/document/delete/:documentId', isLoggedIn, ctrlApplications.deleteBioDoc);

    // BIO & ITEC
    app.post('/application/:type(itec|bio)/:applicationid', isLoggedIn, ctrlApplications.updateApplicationStatus);
	app.post('/application/:type(itec|bio)/changeSemester/:applicationid', isLoggedIn, ctrlApplications.changeSemester);
	app.get('/application/:type(itec|bio)/changeSemester/:applicationid', isLoggedIn, ctrlApplications.changeSemester);
    app.post('/application/changeMultipleSemester', isLoggedIn, ctrlApplications.changeMultipleSemester);
    app.get('/application/changeMultipleSemester', isLoggedIn, ctrlApplications.changeMultipleSemester);





    /*Export Page*/
    /* Applications pages */
    app.get('/export', isLoggedIn, isAdminOrInstructor, ctrlExport.getExport);
    app.post('/export', makeCSVDirectory, isLoggedIn, isAdminOrInstructor, ctrlExport.exportExport);
    // ITEC
    app.get('/itec', isLoggedIn, ctrlExport.getItecApplication);
    app.get('/application/itec/:applicationid', isLoggedIn, ctrlExport.getSpecificItecApplication);
    app.post('/itec', isLoggedIn, ctrlExport.postItecApplication);
    app.post('/application/itec/notes/:applicationid', ctrlExport.addItecNotes);
    app.get('/application/itec/:applicationId/notes/delete/:noteId', isLoggedIn, ctrlExport.deleteItecNote);
    app.post('/application/itec/feedback/:applicationid', isLoggedIn, ctrlExport.addItecFeedback);
    app.get('/application/itec/:applicationId/feedback/delete/:feedbackId', isLoggedIn, ctrlExport.deleteItecFeedback);
    // BIO
    app.get('/bio', isLoggedIn, ctrlExport.getBioApplication);
    app.post('/bio', isLoggedIn, ctrlExport.postBioApplication);
    app.get('/application/bio/:applicationid', isLoggedIn, ctrlExport.getSpecificBioApplication);
    app.post('/application/bio/notes/:applicationid', isLoggedIn, ctrlExport.addBioNotes);
    app.get('/application/bio/:applicationId/notes/delete/:noteId', isLoggedIn, isAdminOrInstructor, ctrlExport.deleteBioNote);
    app.post('/application/bio/feedback/:applicationid', isLoggedIn, isAdmin, ctrlExport.addBioFeedback);
    app.get('/application/bio/:applicationId/feedback/delete/:feedbackId', isLoggedIn, isAdmin, ctrlExport.deleteBioFeedback);
    // BIO & ITEC
    app.post('/application/:type(itec|bio)/:applicationid', isLoggedIn, ctrlExport.updateApplicationStatus);
    /*End Export*/

    /* Sites pages & Add Site page */
    app.get('/sites', isLoggedIn, isAdminOrInstructor, ctrlSites.getSites);
    app.post('/sites', isLoggedIn, isAdminOrInstructor, ctrlSites.getSites);
    app.post('/site/export', isLoggedIn, isAdminOrInstructor, makeCSVDirectory, ctrlSites.exportSites);

    app.get('/addsite', isLoggedIn, isAdminOrInstructor, ctrlSites.getAddSite);
    app.get('/site/contacts/:siteid/:documentid', isLoggedIn, isAdminOrInstructor, ctrlSites.deleteSiteContact);
    app.get('/site/edit/:siteid', isLoggedIn, isAdminOrInstructor, ctrlSites.getSiteToEdit);
    app.get('/site/:siteid', isLoggedIn, isAdminOrInstructor, ctrlSites.getSiteDetails);
    app.post('/addSite', isLoggedIn, isAdminOrInstructor, ctrlSites.postAddSite);
    app.post('/site/:siteid', isLoggedIn, isAdminOrInstructor, ctrlSites.addSiteContact);
    app.post('/site/edit/:siteid', isLoggedIn, isAdminOrInstructor, ctrlSites.updateSite);
    app.post('/site/delete/:siteid', isLoggedIn, isAdminOrInstructor, ctrlSites.deleteSite);
    app.get('/site/:siteId/export/contacts', makeCSVDirectory, isLoggedIn, isAdminOrInstructor, ctrlSites.exportContacts);

    /* Promote page */
    app.get('/promote', isLoggedIn, isAdmin, ctrlPromote.getPromote);
    app.post('/promote', isLoggedIn, isAdmin, ctrlPromote.promoteUser);

    /* Edit Profile page */
    app.get('/editprofile', isLoggedIn, ctrlEditProfile.getEditProfile);
    app.post('/editprofile', isLoggedIn, ctrlEditProfile.updateProfile);

    /* FAQ page */
    app.get('/faq', ctrlFAQ.getFAQ);

    /* Support Page */
    app.get('/support', ctrlSupport.getSupport);

    /* Help page */
    app.get('/help', ctrlHelp.getHelp);
    app.get('/admininstructorhelp', ctrlHelp.getAdminInstructorHelp);

    /* Document Upload page */
    app.get('/downloadFerpa', isLoggedIn, ctrlUpload.downloadFerpa);
    app.get('/document/:documentId', isLoggedIn, ctrlUpload.getSpecificDocument);
    app.get('/document/:documentId/note/delete/:noteId', isLoggedIn, ctrlUpload.deleteDocumentNote);
    app.get('/document/:documentId/feedback/delete/:feedbackId', isLoggedIn, ctrlUpload.deleteDocumentFeedback);
    app.post('/document/status/:documentId', isLoggedIn, isAdminOrInstructor, ctrlUpload.updateSpecificDocumentStatus);
    app.post('/document/notes/:documentId', isLoggedIn, isAdminOrInstructor, ctrlUpload.addSpecificDocumentNotes);
    app.post('/document/feedback/:documentId', isLoggedIn, isAdmin, ctrlUpload.addSpecificDocumentFeedback);

    /* Document Delete page */
    app.get('/document/:documentId/:fileId/delete', isLoggedIn, ctrlDelete.removeSpecificDocument);

    /* Site Notes page */
    app.get('/sitenotes', isLoggedIn, isAdminOrInstructor, ctrlSiteNotes.getSiteNotesPage);
    app.post('/site/note/:siteId', isLoggedIn, isAdminOrInstructor, ctrlSiteNotes.addSiteNote);
    app.get('/site/:siteId/note/delete/:noteId', isLoggedIn, isAdminOrInstructor, ctrlSiteNotes.deleteSiteNote);

    /* Edit application pages */
    app.get('/edititec', isLoggedIn, ctrlEditApps.getEditItec);
    app.get('/editbio', isLoggedIn, ctrlEditApps.getEditBio);
    app.post('/edititec', isLoggedIn, ctrlEditApps.updateItecApp);
    app.post('/editbio', isLoggedIn, ctrlEditApps.updateBioApp);

}
