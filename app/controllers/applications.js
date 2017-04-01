/*
    Controller functions containing the logic for the application routes
    Authors : Joseph Cox, Robert Bryan
*/

var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');
var Document = require('../models/document');
var nodemailer = require('nodemailer');
var key = process.env.KEY;

/*
    HTTP Req: GET
    URL: '/itec'
*/
module.exports.getItecApplication = function(req, res) {

    res.render('itec.ejs', {
        user: req.user
    });
};

/*
    HTTP Req: GET
    URL: '/bio'
*/
module.exports.getBioApplication = function(req, res) {
    res.render('bio.ejs', {
        user: req.user // get the user out of session and pass to template
    });
};

/*
    HTTP Req: GET
    URL: '/applications'
*/
module.exports.getApplications = function(req, res) {
    var haveBioApp = false;
    var haveItecApp = false;

    Bio.doesUserHaveBioApp(req.user.email, function(response) {
        haveBioApp = response;
    });

    Itec.doesUserHaveItecApp(req.user.email, function(response) {
        haveItecApp = response;
    });
 
    if (req.user.role === 'admin' || req.user.role === 'instructor'  ) {
                Bio.find(function(err, bioApplications) {
                    if (err) return console.error(err);
                    Itec.find(function(err, itecApplications) {
                        if (err) return console.error(err);
                        res.render('applications.ejs', {
                            applicationList: bioApplications.concat(itecApplications),
                            successMessage: req.flash('success'),
                            failureMessage: req.flash('failure'),
                            haveBioApp: haveBioApp,
                            haveItecApp: haveItecApp,
                            user: req.user
                        });
                    });
                });
        }
        else {
          Bio.find({
            useremail: req.user.email
          }, function(err, bioApplications) {
              if (err) return console.error(err);
              Itec.find({
                useremail: req.user.email
              }, function(err, itecApplications) {
                  if (err) return console.error(err);
                  res.render('applications.ejs', {
                      applicationList: bioApplications.concat(itecApplications),
                      user: req.user,
                      haveBioApp: haveBioApp,
                      haveItecApp: haveItecApp
                  });
              });
          });
        }
};

/*
    HTTP Req: GET
    URL: '/application/bio/:id'
*/
module.exports.getSpecificBioApplication = function(req, res) {
    var documents = [];
    Bio.findOne({
        _id : req.params.applicationid
    }, function(err, bioApp) {
        if (err) throw err;
        Document.getBioDocumentsForUser(bioApp.useremail, function(incomingDocuments) {
            documents = incomingDocuments;
            console.log('documents found for user ' + bioApp.useremail + '\n' + documents);
            res.render('applicationdetails.ejs', {
                application : bioApp,
                documents: documents,
                user : req.user,
                successMessage : req.flash('success'),
                failureMessage : req.flash('failure')  
            });
        }); 
    });
};


/*
    HTTP Req: GET
    URL: '/application/itec/:id'
*/
module.exports.getSpecificItecApplication = function(req, res) {
    var documents = [];
    Itec.findOne({
        _id : req.params.applicationid
    }, function(err, itecApp) {
        if (err) throw err;
        Document.getItecDocumentsForUser(itecApp.useremail, function(incomingDocuments) {
            documents = incomingDocuments;
            res.render('applicationdetails.ejs', {
                application : itecApp,
                documents: documents,
                user : req.user,
                successMessage : req.flash('success'),
                failureMessage : req.flash('failure')  
            });
        }); 
    });
}

/*
    HTTP Req: POST
    URL: '/application/:type(bio or itec)/:applicationid'
*/
module.exports.updateApplicationStatus = function(req, res) {
    var typeOfEmail = 'applicationStatusUpdate';
    var studentEmail;
    console.log(req.params);
    if (req.params.type == 'itec') {
        Itec
        .findById(req.params.applicationid)
        .exec(
                function(err, appEntry) {
                     studentEmail = appEntry.useremail;
                }
            );
        Itec.update({ _id: req.params.applicationid },{applicationstatus:req.body.applicationstatus},function (err) {
            if (err){
                req.flash('failure', 'An error has occured, the application status has not been changed!')
                res.redirect('/application/itec/'+req.params.applicationid);
            }
            else{
                req.flash('success', 'The application status has been successfully changed!')
                redirect = '/application/itec/'+req.params.applicationid;
                sendEmail(req, res, typeOfEmail, studentEmail, redirect);
            }
        });
    } else {
        Bio
        .findById(req.params.applicationid)
        .exec(
                function(err, appEntry) {
                    studentEmail = appEntry.useremail;
                }
            );
        Bio.update({ _id: req.params.applicationid },{applicationstatus:req.body.applicationstatus},function (err) {
            if (err){
                req.flash('failure', 'An error has occured, the application status has not been changed!')
                res.redirect('/application/bio/'+req.params.applicationid);
            }
            else{
                req.flash('success', 'The application status has been successfully changed!')                
                redirect = '/application/bio/'+req.params.applicationid;
                sendEmail(req, res, typeOfEmail, studentEmail, redirect);
            }
        });
    }
};

/*

    A note has been added for this app

    HTTP Req: POST
    URL: '/application/itec/notes/:applicationid'
*/
module.exports.addItecNotes = function(req, res) {
 Itec.update({ _id: req.params.applicationid },{$push: {"notes": {note: req.body.note, user: req.user.email}}},function (err) {
        if (err) {
            req.flash('failure', 'An error has occured, the note can not be added at this time.')
            res.redirect('/application/itec/'+req.params.applicationid);
        }
        else {
            req.flash('success', 'The note has been successfully added!')                
            res.redirect('/application/itec/'+req.params.applicationid);
        }
    });
}

/*

    HTTP Req: GET
    URL: /application/itec/:applicationId/notes/delete/:noteId

*/
module.exports.deleteItecNote = function(req, res) {
        var itecId = req.params.applicationId;
        Itec.update({ _id: req.params.applicationId },{$pull: {"notes": {_id: req.params.noteId}}}, 
        function (err) {
            if (err) {
                console.log(err);
                req.flash('failure', 'An error has occured, the note can not be deleted at this time.')
                res.redirect('/application/itec/'+itecId);
            } else {
                req.flash('success', 'The note has been successfully deleted!')  
                res.redirect('/application/itec/'+itecId);
            }
        });
}

/*
    HTTP Req: POST
    URL: /application/itec/feedback/:applicationid
*/
module.exports.addItecFeedback = function(req, res) {
    Itec.update({ _id: req.params.applicationid },{$push: {"feedback": {feedback: req.body.feedback, user: req.user.email}}},function (err) {
        if (err) {
            req.flash('failure',err);
            res.redirect('/application/itec/'+req.params.applicationid);
        }
        else {
            req.flash('success', 'The feedback has been successfully added!')
            res.redirect('/application/itec/'+req.params.applicationid);
        }
    });
}

/*

    HTTP Req: GET
    URL: /application/itec/:applicationId/feedback/delete/:feebackId

*/
module.exports.deleteItecFeedback = function(req, res) {
var itecId = req.params.applicationId;
        if (!(req.user.role == 'admin')) {
            req.flash('failure', "Don't delete your own feedback silly!")
            res.redirect('/application/itec/'+itecId);
        } else {

            Itec.update({ _id: req.params.applicationId },{$pull: {"feedback": {_id: req.params.feedbackId}}}, 
            function (err) {
                if (err) {
                    console.log(err);
                    req.flash('failure', 'An error has occured, the feedback can not be deleted at this time.')
                    res.redirect('/application/itec/'+itecId);
                } else {
                    
                    res.redirect('/application/itec/'+itecId);
                    req.flash('success', 'The feedback has been successfully deleted!')  
                }
            });
        }

}

/*
    HTTP Req: POST
    URL: '/application/bio/notes/:applicationid'
*/
module.exports.addBioNotes = function(req, res) {
    Bio.update({ _id: req.params.applicationid },{$push: {"notes": {note: req.body.note, user: req.user.email}}},function (err) {
        if (err) {
            req.flash('failure', 'The note cannot be added at this time.');
            res.redirect('/application/bio/'+req.params.applicationid);
        }
        else {
            req.flash('success', 'The note has been successfully added!') 
            res.redirect('/application/bio/'+req.params.applicationid);
        }
    });
}

/*

    HTTP Req: GET
    URL: /application/bio/:applicationId/notes/delete/:noteId

*/
module.exports.deleteBioNote = function(req, res) {
        var bioId = req.params.applicationId;
        Bio.update({ _id: req.params.applicationId },{$pull: {"notes": {_id: req.params.noteId}}}, 
        function (err) {
            if (err) {
                console.log(err);
                req.flash('failure', 'An error has occured, the note can not be deleted at this time.')
                res.redirect('/application/bio/'+bioId);
            } else {
                req.flash('success', 'The note has been successfully deleted!')  
                res.redirect('/application/bio/'+bioId);
            }
        });
}

/*
    HTTP Req: POST
    URL: /application/bio/feedback/:applicationid
*/
module.exports.addBioFeedback = function(req, res) {
    Bio.update({ _id: req.params.applicationid },{$push: {"feedback": {feedback: req.body.feedback, user: req.user.email}}},function (err) {
        if (err) {
            req.flash('failure', 'An error has occured, the feedback cannot be added at this time.');
            res.redirect('/application/bio/'+req.params.applicationid);
        }
        else {
            req.flash('success', 'The feedback has been successfully added!')
            res.redirect('/application/bio/'+req.params.applicationid);
        }
    });
}

/*

    HTTP Req: GET
    URL: /application/bio/:applicationId/feedback/delete/:feedbackId

*/
module.exports.deleteBioFeedback = function(req, res) {
var bioId = req.params.applicationId;
        if (!(req.user.role == 'admin')) {
            req.flash('failure', "Don't delete your own feedback silly!")
            res.redirect('/application/bio/'+bioId);
        } else {
            Bio.update({ _id: req.params.applicationId },{$pull: {"feedback": {_id: req.params.feedbackId}}}, 
            function (err) {
                if (err) {
                    console.log(err);
                    req.flash('failure', 'An error has occured, the feedback can not be deleted at this time.')
                    res.redirect('/application/bio/'+bioId);
                } else {
                    req.flash('success', 'The feedback has been successfully deleted!')  
                    res.redirect('/application/bio/'+bioId);
                }
            });
        }
}

/*
    HTTP Req: POST
    URL: '/applications/itec/documents/:applicationid/documentid/:answer'
*/
module.exports.updateApplicationDocument = function(req, res) {
    Itec.update({ 'documents._id': req.params.documentid },{$set: {'documents.$.status': req.params.answer}},function (err) {
        if (err){
        req.flash('info',err);
        res.redirect('/application/itec/'+req.params.applicationid);
        }
        else{ res.redirect('/application/itec/'+req.params.applicationid);
        }
    });
};

/*
    HTTP Req: POST
    URL: '/itec'
*/
module.exports.postItecApplication = function(req, res) {
    var itecapp = new Itec(req.body);
    itecapp.useremail = req.user.email;
    itecapp.userstudentid = req.user.studentid;
    itecapp.userfname = req.user.fname;
    itecapp.userlname = req.user.lname;
    itecapp.useraddress = req.user.address;
    itecapp.usercity = req.user.city;
    itecapp.userstate = req.user.state;
    itecapp.userzipcode = req.user.zipcode;
    itecapp.userdiscipline = 'ITEC';
    itecapp.applicationstatus = 'submitted';
    itecapp.documents = [{ item: 'ferpa', status: 'no'},{ item: 'resume', status: 'no'}];
    itecapp.save(function(err) {
        if (err){
            console.log(err);
        }
    });
	res.redirect('/applications');
};

/*
    HTTP Req: POST
    URL: '/bio'
*/
module.exports.postBioApplication = function(req, res) {
    console.log(req.body);
    var bioapp = new Bio(req.body);
    bioapp.useremail = req.user.email;
    bioapp.userstudentid = req.user.studentid;
    bioapp.userfname = req.user.fname;
    bioapp.userlname = req.user.lname;
    bioapp.useraddress = req.user.address;
    bioapp.usercity = req.user.city;
    bioapp.userstate = req.user.state;
    bioapp.userzipcode = req.user.zipcode;
    bioapp.userdiscipline = 'BIO';
    bioapp.applicationstatus = 'submitted';
    bioapp.save(function(err) {
        if (err) {
            console.log(err);
         }
    });
    res.redirect('/applications');
};

function sendEmail(req, res, typeOfEmail, studentEmail, redirect) {

    var emailSubject;
    var emailText;
    var transporter;
    switch (typeOfEmail) {
        case 'applicationStatusUpdate':
            emailSubject = '[GGC Internship Application] Application Status Changed';
            emailText = 'Your GGC internship application status has changed to: ' + req.body.applicationstatus;
            break;
        default:
            console.log('email type not recognized')
            res.redirect('/');
            break;
    }

    transporter = nodemailer.createTransport('smtps://ggcinternapp%40gmail.com:' + key + '@smtp.gmail.com');
    mailOptions = {
        from: '"GGC Internapp Admin" <admin@ggcinternapp>',
        to: studentEmail,
        subject: emailSubject,
        text: emailText
    }
    transporter.sendMail(mailOptions, function(err) {
        if (err) {
            console.log(err);
        }
        console.log(typeOfEmail, ' completed!');
        res.redirect(redirect);
    });
}
