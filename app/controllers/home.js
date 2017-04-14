/*
    Controller functions containing the logic for the home routes
    Authors : Joseph Cox, Robert Bryan
*/

var Bio = require('../models/bio');
var Itec = require('../models/itec');
var User = require('../models/user');
var Document = require('../models/document');

/*
    HTTP Req: GET
    URL: '/adminhome'
*/
module.exports.loadAdminHome = function(req, res) {
    if (req.user.role != 'admin') {
        res.redirect('/home');
    } else {





    }
}

/*
    HTTP Req: POST
    URL: '/adminhome'
*/
module.exports.postAdminHome = function(req, res) {
/*
    adminsemester
    adminyear
    adminprogram
*/

    User.update({
        'local.email' : req.user.email
    }, {
        "local.adminsemester" : req.body.adminsemester,  
        "local.adminyear"     : req.body.adminyear,
        "local.adminprogram"  : req.body.adminprogram  
    }, function(err) {
        if (err) {
            req.flash('failure', 'The admin values cannot be updated at this time.')
            res.redirect('/adminhome');
        } else {
            req.flash('success', 'Admin values successfully updated!');
            res.redirect('/adminhome');
        }
    });
}

/*
    HTTP Req: GET
    URL: '/home'
*/
module.exports.loadUserHome = function(req, res) {

    var haveBioApp;
    var haveItecApp;
    var bioApp;
    var itecApp;
    var documentList;
    var applicationList = [];
    
    Document.getDocumentsForUser(req.user.email, function(incomingDocumentList) {
        documentList = incomingDocumentList;
        Bio.getUsersBioApp(req.user.email, function (incomingBioApp) {
            bioApp = incomingBioApp;
            if (bioApp) {
                applicationList.push(bioApp);
            }
            Itec.getUsersItecApp(req.user.email, function (incomingItecApp) {
                itecApp = incomingItecApp;   
                if (itecApp) {
                    applicationList.push(itecApp);
                }
                res.render('home.ejs', {
                    successMessage : req.flash('success'),
                    failureMessage: req.flash('failure'),
                    user : req.session.passport.user,
                    bioApp : bioApp,
                    itecApp : itecApp,
                    applications : applicationList,
                    documents : documentList
                }); 
            });
        });
    });

    }; 
