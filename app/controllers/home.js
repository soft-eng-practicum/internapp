/*
    Controller functions containing the logic for the home routes
    Authors : Joseph Cox, Robert Bryan
*/

var Bio = require('../models/bio');
var Itec = require('../models/itec');
var User = require('../models/user');

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
    
    User.getUsersDocuments(req.user.email, function(incomingDocumentList) {
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
