

    var express = require('express');
    var router = express.Router();
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

    /* Home pages */
    router.get('/', ctrlHome.loadHome);

    /* Login page */
    router.get('/login', ctrlLogin.getLogin);
    router.post('/login', ctrlLogin.login);


    // /* Sign up page */
    // router.get('/signup', ctrlSignUp.getSignup);
    // router.post('/signup', ctrlSignUp.postSignup);

    // /* Forgot password page */
    // router.get('/forgot', ctrlSignUp.getForgot);
    // router.post('/forgot', ctrlSignUp.postForgot);

    // /* Dashboard page */
    // router.get('/dashboard', ctrlDashboard.getDashboard);

    // /* Applications pages - Could probably add some regex to reduce the routes */
    // router.get('/applications', ctrlApplications.getApplications);
    //     // ITEC
    // router.get('/application/itec/:applicationid', ctrlApplications.getSpecificApplication);
    // router.post('/application/itec/:applicationid', ctrlApplications.updateApplicationStatus);
    // router.post('/application/itec/notes/:applicationid', ctrlApplications.addNotes);                 
    //     // BIO
    // router.get('/application/bio/:applicationid', ctrlApplications.getSpecificApplication);
    // router.post('/application/bio/:applicationid', ctrlApplications.updateApplicationStatus);
    // router.post('/application/bio/documents/:applicationid', ctrlApplications.addDocument);
    // router.post('/application/bio/notes/:applicationid', ctrlApplications.addNotes);

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


    module.exports = router;
