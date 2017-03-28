/*
    Controller functions containing the logic for the document uploads
    Authors : Robert Bryan
*/


var fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');
var key = process.env.KEY; // password for ggcinternapp@gmail.com

var User = require('../models/user');

// Setting local env in powershell
// $env:key="password"

// Setting local env in terminal
// export KEY='password'



// placeholder values
var itecCoordinatorEmail = "rbryan3@ggc.edu";
var bioCoordinatorEmail = "rbryan3@ggc.edu";

var noFilesUploadedError = " You must choose a file to upload. ";


module.exports.getDocumentUpload = function(req, res) {
    var documentList = [];
    if (req.user.role === 'admin' || req.user.role === 'instructor') {
        User.find(function(err, users) { // get all users
            if (err) return console.error(err);
            users.forEach(function(user) { // for each user - grab their documents array
                if (user.local.documents.length > 0) { // if they have a document uploaded
                    var userDocuments = user.local.documents;
                    userDocuments.forEach(function(document) { 
                                               // console.log(document);
                        var document = {
                            "docId" : document._id,
                            "userId": user._id,
                            "studentEmail" : user.local.email,
                            "studentName"  : user.local.fname + ' ' + user.local.lname,
                            "date"         : document.prettyUploadDate,
                            "section"      : document.fileSection,
                            "documentName" : document.documentName,
                            "documentType" : document.fileType,
                            "documentStatus": document.documentStatus,
                            "notes" : document.notes
                        }
                        documentList.push(document); // add it to a list to provide to the documentUpload.ejs
                    });
                }
            });
                    res.render('documentUpload', {
                    user : req.session.passport.user,
                    documentList: documentList,
                    uploadError: req.flash('uploadError'),
                    successfulUpload: req.flash('successfulUpload')
                    });
        });
    } else {  // if user is a student just display their own uploads
        User.findOne({
            'local.email' : req.user.email
        },
            function(err, user) {
                if (user.length > 1) return console.error('Error more than one user found for email: ' + req.user.email);
                if (err) return console.error(err);
                if (user.local.documents.length > 0) {
                    var userDocuments = user.local.documents;
                    userDocuments.forEach(function(document) { 

                        var document = {
                            "docId" : document._id,
                            "userId": user._id,
                            "studentEmail" : user.local.email,
                            "studentName"  : user.local.fname + ' ' + user.local.lname,
                            "date"         : document.prettyUploadDate,
                            "section"      : document.fileSection,
                            "documentName" : document.documentName,
                            "documentType" : document.fileType,
                            "documentStatus": document.documentStatus,
                            "notes" : document.notes
                        }
                        documentList.push(document);
                    });
                }
                    res.render('documentUpload', {
                    user : req.session.passport.user,
                    documentList: documentList,
                    uploadError: req.flash('uploadError'),
                    successfulUpload: req.flash('successfulUpload')
                    })
            })
        }
}

// Renders the 'View Details' page for a specific document
module.exports.getSpecificDocument = function(req, res) {
    User.findById({
        "_id" : req.params.userId
    }, function(err, user) {
        user.local.documents.forEach(function(document) {
            if (document._id == req.params.documentId) {
                res.render('documentDetails', {
                    user : req.session.passport.user,
                    document: document,
                    documentUser: user,
                    successMessage: req.flash('specificDocumentSuccess'),
                    failureMessage: req.flash('specificDocumentFailure')
                });
            } 
        }); 
    });
}

module.exports.updateSpecificDocumentStatus = function(req, res) {
    User.findById({
        "_id": req.params.userId
    }, function(err, user) {

        user.local.documents.forEach(function(document) {
            if (document._id == req.params.documentId) {
                User.findOne({
                    "local.documents._id" : req.params.documentId
                }, function(err, user) {
                    var document = user.local.documents.id(req.params.documentId);
                    document.documentStatus = req.body.documentstatus;
                    user.save();
                });
            }
        });
        res.redirect('/document/' + req.params.userId + '/' + req.params.documentId);
        req.flash('specificDocumentSuccess', 'Document status has been changed!')
    })
}

module.exports.addSpecificDocumentNotes = function(req, res) {
    User.findById({
        "_id" : req.params.userId
    }, function(err, user) {
         user.local.documents.forEach(function(document) {
            if (document._id == req.params.documentId) {
                User.findOne({
                    "local.documents._id" : req.params.documentId
                }, function(err, user) {
                    var document = user.local.documents.id(req.params.documentId);
                    document.notes.push({
                        "user" : req.user.email,
                        "note" : req.body.note
                    })
                    user.save();
                });
            }
        });
        res.redirect('/document/' + req.params.userId + '/' + req.params.documentId);
        req.flash('specificDocumentSuccess', 'Document note has been added!')
    });
}

module.exports.addSpecificDocumentFeedback = function(req, res) {
    User.findById({
        "_id" : req.params.userId
    }, function(err, user) {
         user.local.documents.forEach(function(document) {
            if (document._id == req.params.documentId) {
                User.findOne({
                    "local.documents._id" : req.params.documentId
                }, function(err, user) {
                    var document = user.local.documents.id(req.params.documentId);
                    document.feedback.push({
                        "user" : req.user.email,
                        "feedback" : req.body.feedback
                    })
                    user.save();
                });
            }
        });
        res.redirect('/document/' + req.params.userId + '/' + req.params.documentId);
        req.flash('specificDocumentSuccess', 'Document feedback has been added!')
    }); 
}

// Upload itec resume 
module.exports.uploadItecResume = function(req, res) {
    var typeOfFile = 'Resume';
    if (!req.files.resume) {
        res.redirect('/home');
        req.flash('failure', noFilesUploadedError);
    } else {
        sendEmail(req.files.resume, typeOfFile, req, res);
    }
};

// Upload bio essay
module.exports.uploadBioEssay = function(req, res) {
    var typeOfFile = 'Essay';
    if (!req.files.essay) {
        res.redirect('/home');
        req.flash('failure', noFilesUploadedError);
    } else {
        sendEmail(req.files.essay, typeOfFile, req, res);
    } 
};

//Upload bio transcript
module.exports.uploadBioTranscript = function(req, res) {
    var typeOfFile = 'Transcript';
    if (!req.files.transcript) {
        res.redirect('/home');
        req.flash('failure', noFilesUploadedError);
    } else {
        sendEmail(req.files.transcript, typeOfFile, req, res);
    }
};

// Upload itec ferpa
module.exports.uploadItecFerpa = function(req, res) {
    var typeOfFile = 'Ferpa';
    if (!req.files.ferpa) {
        res.redirect('/home');
        req.flash('failure', noFilesUploadedError);
    } else {
        sendEmail(req.files.ferpa, typeOfFile, req, res);
    }
};

// Download FERPA 
module.exports.downloadFerpa = function(req, res) {
    res.download('./ferpa.pdf', 'ferpa.pdf', function(err) {
        if (err) {
            if (res.headersSent()) {
               res.removeHeader("Content-Encoding");
               res.redirect('/home');
               req.flash('failure', 'An error has occured with the file download');
            }
            console.error(err);
        }
    });
};

// Add a document to the user's 
function addDocumentToUser(fileType, fileName, userEmail) {
     // Student Name
     var recordFileType;
     var recordSection;

     switch (fileType.toLowerCase()) {
         case "ferpa":
             recordFileType = "FERPA";
             recordSection = "ITEC";
             break;
        case "resume":
             recordFileType = "Resume";
             recordSection = "ITEC";
             break;
        case "transcript":
             recordFileType = "Transcript";
             recordSection = "Biology";
             break;   
        case "essay":
             recordFileType = "Essay";
             recordSection = "Biology";
             break;                     
        default:
             console.error('fileType not recognized - upload record creation failed');
             res.redirect('/home');
             req.flash('failure', 'File type not recognized');
     }
     
     // Update user's document array
     User.findOneAndUpdate({
         'local.email' : userEmail
    }, {
        $push: {
            'local.documents' : {
                'fileType' : recordFileType,
                'fileSection' : recordSection,
                'documentName' : fileName,
                'documentStatus' : 'submitted'
            }
            /*

            prettyUploadDate: {type: String, default: formatDate(new Date())},
            uploadDate: {type: Date, default: Date.now},
            fileType: {type: String, required: true},
            fileSection: {type: String, required: true},
            documentName: {type: String, required: true}

            */
        }
    }, function(err, user) {
        if (err) console.error(err);
        console.log(recordFileType + ' document added to ' + userEmail);
        return true;
    });
}

function sendEmail(file, typeOfFile, req, res) {
    console.log('key =', key);
    var coordinatorEmail;
    var emailSubject;
    var emailText;
    switch (typeOfFile.toLowerCase()) {
        case 'transcript':
            coordinatorEmail = bioCoordinatorEmail;
            emailSubject = "Placeholder transcript subject";
            emailText = "Placeholder transcript text";
            break;
        case 'essay':
            coordinatorEmail = bioCoordinatorEmail;
            emailSubject = "Placeholder essay subject";
            emailText = "Placeholder essay text";
            break;
        case 'resume':
            coordinatorEmail = itecCoordinatorEmail;
            emailSubject = "Placeholder resume subject";
            emailText = "Placeholder resume text";
            break;
        case 'ferpa':
            coordinatorEmail = itecCoordinatorEmail;
            emailSubject = "Placeholder ferpa subject";
            emailText = "Placeholder ferpa text";
            break;
        default:
            console.log('unknown type of file found');
            req.flash('failure', 'Your file type is not recognized');
            res.redirect('/home');
            break;
    }

    transporter = nodemailer.createTransport('smtps://ggcinternapp%40gmail.com:' + key + '@smtp.gmail.com');
            mailOptions = {
                from: '"GGC Interapp Admin" <admin@ggcinternapp>',
                to: [coordinatorEmail], // comment out for now - req.session.passport.user.email],
                subject: emailSubject,
                text: emailText,
                attachments: [
                    {
                        filename: file.name,
                        content: file.data,
                        encoding: 'binary'
                    }
                ]
            };
            transporter.sendMail(mailOptions, function(err) {
                if (err) {
                    console.log('Error while sending ' + typeOfFile + ':\n' + err);
                    res.redirect('/home');
                    req.flash('failure', 'Your file cannot be uploaded at this time.');

                } else {
                    console.log(typeOfFile + ' sent!');
                    addDocumentToUser(typeOfFile, file.name, req.user.email);
                    res.redirect('/home');
                    req.flash('success', typeOfFile + ' uploaded!');
                }

            });
}