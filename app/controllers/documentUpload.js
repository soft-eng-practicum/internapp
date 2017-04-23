/*
    Controller functions containing the logic for the document uploads
    Authors : Robert Bryan
*/


var fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');
var key = process.env.YAHOO_PASSWORD; // password for ggcinternapp@gmail.com

var User = require('../models/user');
var Document = require('../models/document');

// Setting local env in powershell
// $env:key="password"

// Setting local env in terminal
// export KEY='password'

// placeholder values
var itecCoordinatorEmail = process.env.ITEC_COORDINATOR_EMAIL;
var bioCoordinatorEmail = process.env.BIO_COORDINATOR_EMAIL;
var noFilesUploadedError = " You must choose a file to upload. ";

module.exports.getDocumentUpload = function(req, res) {
    var documentList = [];
    if (req.user.role === 'admin' || req.user.role === 'instructor') {
        Document.find(function(err, documents) {
            documents.forEach(function(document) {
                    var newDocument = {
                        "docId" : document._id,
                        "userId": document.user.user_id,
                        "studentEmail" : document.user.user_email,
                        "studentName"  : document.user.fname + ' ' + document.user.lname,
                        "date"         : document.prettyUploadDate,
                        "section"      : document.fileSection,
                        "documentName" : document.documentName,
                        "documentType" : document.fileType,
                        "documentStatus": document.documentStatus,
                        "notes" : document.notes,
                        "feedback" : document.feedback
                    }
                   documentList.push(newDocument);
            });
                    res.render('documentUpload', {
                    user : req.session.passport.user,
                    documentList: documentList,
                    failureMessage: req.flash('failure'),
                    successMessage: req.flash('success')
                    });
        });
    } else {
        res.redirect('/home');
    }  
        
}

// Renders the 'View Details' page for a specific document
module.exports.getSpecificDocument = function(req, res) {
    Document.findById({
        "_id" : req.params.documentId
    }, function(err, document) {
        res.render('documentDetails', {
            user: req.session.passport.user,
            document: document,
            successMessage: req.flash('success'),
            failureMessage: req.flash('failure')
        });
    });
}

module.exports.updateSpecificDocumentStatus = function(req, res) {
    typeOfEmail = "documentStatusUpdate";
    Document.findByIdAndUpdate({
        "_id" : req.params.documentId
    },{ 
        $set : {
            "documentStatus" : req.body.documentstatus
        }
    }, function(err) {
        if (err) {
            throw err;
        } else {
            req.flash('success', 'Document status has been changed!')
            Document.findById({
                "_id" : req.params.documentId
            }, function(err, document) {
                if (err) {
                    throw err;
                } else {
                    var redirect = '/document/' + req.params.documentId;
                    var studentEmail = document.user.user_email;
                    sendEmail(req, res, typeOfEmail, studentEmail, redirect)
                }
            })
        }

    });
}

module.exports.addSpecificDocumentFeedback = function(req, res) {
    var typeOfEmail = "documentFeedback";
     Document.update({ 
         _id: req.params.documentId
     },{ 
        $push: {
            "feedback": {
                feedback: req.body.feedback, 
                user: req.user.email
            }
        }
    }, function (err) {
        if (err) {
            req.flash('failure', 'An error has occured, the feedback can not be added at this time.')
            res.redirect('/document/'+req.params.documentId);
        }
        else {
            Document.findById({
                "_id" : req.params.documentId
            }, function(err, document) {
                req.flash('success', 'The feedback has been successfully added!')                
                var redirect = '/document/'+req.params.documentId;
                sendEmail(req, res, typeOfEmail, document.user.user_email, redirect);    
            });
        }
    });
}

module.exports.deleteDocumentFeedback = function(req, res) {
     Document.update({ 
         _id: req.params.documentId
     },{ 
        $pull: {
            "feedback": {
                "_id" : req.params.feedbackId
            }
        }
    }, function (err) {
        if (err) {
            req.flash('failure', 'An error has occured, the feedback can not be deleted at this time.')
            res.redirect('/document/'+req.params.documentId);
        }
        else {
            req.flash('success', 'The feedback has been successfully deleted!')                
            res.redirect('/document/'+req.params.documentId);
        }
    });
}

module.exports.addSpecificDocumentNotes = function(req, res) {
     Document.update({ 
         _id: req.params.documentId
     },{ 
        $push: {
            "notes": {
                note: req.body.note, 
                user: req.user.email
            }
        }
    }, function (err) {
        if (err) {
            req.flash('failure', 'An error has occured, the note can not be added at this time.')
            res.redirect('/document/'+req.params.documentId);
        }
        else {
            req.flash('success', 'The note has been successfully added!')                
            res.redirect('/document/'+req.params.documentId);
        }
    });
}

module.exports.deleteDocumentNote = function(req, res) {
    Document.update({ 
            _id: req.params.documentId
        },{ 
            $pull: {
                "notes": {
                    "_id" : req.params.noteId
                }
            }
        }, function (err) {
            if (err) {
                req.flash('failure', 'An error has occured, the note can not be deleted at this time.')
                res.redirect('/document/'+req.params.documentId);
            }
            else {
                req.flash('success', 'The note has been successfully deleted!')                
                res.redirect('/document/'+req.params.documentId);
            }
        });
}

// Upload itec resume 
module.exports.uploadItecResume = function(req, res) {
    var typeOfFile = 'Resume';
    if (!req.files.resume) {
        res.redirect('/home');
        req.flash('failure', noFilesUploadedError);
    } else {
        sendDocument(req.files.resume, typeOfFile, req, res, req.user);
    }
}

// Upload bio essay
module.exports.uploadBioEssay = function(req, res) {
    var typeOfFile = 'Essay';
    if (!req.files.essay) {
        res.redirect('/home');
        req.flash('failure', noFilesUploadedError);
    } else {
        sendDocument(req.files.essay, typeOfFile, req, res, req.user);
    } 
}

//Upload bio transcript
module.exports.uploadBioTranscript = function(req, res) {
    var typeOfFile = 'Transcript';
    if (!req.files.transcript) {
        res.redirect('/home');
        req.flash('failure', noFilesUploadedError);
    } else {
        sendDocument(req.files.transcript, typeOfFile, req, res, req.user);
    }
}

// Upload itec ferpa
module.exports.uploadItecFerpa = function(req, res) {
    var typeOfFile = 'Ferpa';
    if (!req.files.ferpa) {
        res.redirect('/home');
        req.flash('failure', noFilesUploadedError);
    } else {
        sendDocument(req.files.ferpa, typeOfFile, req, res, req.user);
    }
}

/*
    HTTP Req: POST
    URL: '/uploadBioOther'
*/
module.exports.uploadBioOther = function(req, res) {
    var whatIsFile = req.body.bioOther;
    var typeOfFile = 'bioOther';
    if (!req.files.other) {
        res.redirect('/home');
        req.flash('failure', noFilesUploadedError);
    } else {
       sendDocument(req.files.other, typeOfFile, req, res, req.user, whatIsFile);
    }
}

/*
    HTTP Req: POST
    URL: '/uploadItecOther'
*/
module.exports.uploadItecOther = function(req, res) {
    var whatIsFile = req.body.itecOther;
    var typeOfFile = 'itecOther';
    if (!req.files.other) {
        res.redirect('/home');
        req.flash('failure', noFilesUploadedError);
    } else {
       sendDocument(req.files.other, typeOfFile, req, res, req.user, whatIsFile);
    }
}

// Download FERPA 
module.exports.downloadFerpa = function(req, res) {
    res.download('./ferpa.pdf', 'ferpa.pdf', function(err) {
        if (err) {
            req.flash('failure', 'Error downloading FERPA');
            console.error(err);
        }
    });
};

// Add a document to the user's 
function addDocumentToUser(fileType, fileName, user, whatIsFile) {
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
             recordSection = "BIO";
             break;   
        case "essay":
             recordFileType = "Essay";
             recordSection = "BIO";
             break;
        case "bioother":
            recordFileType = whatIsFile;
            recordSection = "BIO";
            break;
        case "itecother":
            recordFileType = whatIsFile;
            recordSection = "ITEC";
            break;                   
        default:
             console.error('fileType not recognized - upload record creation failed');
             res.redirect('/home');
             req.flash('failure', 'File type not recognized');
     }

    var document = new Document({
        'user' : {
            'user_id' : user._id,
            'fname': user.fname,
            'lname': user.lname,
            'user_email': user.email
        },
        'fileType' : recordFileType,
        'fileSection' : recordSection,
        'documentName' : fileName,
        'documentStatus' : 'submitted'
    });

    document.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log(recordFileType + ' document added to ' + user.email);
        }
    });
}

function sendDocument(file, typeOfFile, req, res, user, whatIsFile) {
    var coordinatorEmail;
    var emailSubject;
    var emailText;
    var attachmentFileName;
    switch (typeOfFile.toLowerCase()) {
        case 'transcript':
            coordinatorEmail = bioCoordinatorEmail;
            emailSubject = "GGC InternApp - " + user.fname + ' ' + user.lname + ' - ' + ' Transcript';
            emailText = "Attached is " + user.fname + ' ' + user.lname + "'s Transcript";
            attachmentFileName = typeOfFile;
            break;
        case 'essay':
            coordinatorEmail = bioCoordinatorEmail;
            emailSubject = "GGC InternApp - " + user.fname + ' ' + user.lname + ' - ' + ' Essay';
            emailText = "Attached is " + user.fname + ' ' + user.lname + "'s Essay";
            attachmentFileName = typeOfFile;
            break;
        case 'resume':
            coordinatorEmail = itecCoordinatorEmail;
            emailSubject = "GGC InternApp - " + user.fname + ' ' + user.lname + ' - ' + ' Resume';
            emailText = "Attached is " + user.fname + ' ' + user.lname + "'s Resume";
            attachmentFileName = typeOfFile;
            break;
        case 'ferpa':
            coordinatorEmail = itecCoordinatorEmail;
            emailSubject = "GGC InternApp - " + user.fname + ' ' + user.lname + ' - ' + ' FERPA';
            emailText = "Attached is " + user.fname + ' ' + user.lname + "'s FERPA";
            attachmentFileName = typeOfFile;
            break;
        case 'bioother':
            coordinatorEmail = bioCoordinatorEmail;
            emailSubject = "GGC InternApp - " + user.fname + ' ' + user.lname + ' - ' + ' ' + whatIsFile;
            attachmentFileName = whatIsFile;
            break;
        case 'itecother':
            coordinatorEmail = itecCoordinatorEmail;
            emailSubject = "GGC InternApp - " + user.fname + ' ' + user.lname + ' - ' + ' ' + whatIsFile;
            attachmentFileName = whatIsFile;
            break;
        default:
            console.log('unknown type of file found');
            req.flash('failure', 'Your file type is not recognized');
            res.redirect('/home');
            break;
    }

            transporter = nodemailer.createTransport({
                service: 'yahoo',
                auth: {
                    user: 'ggcinternapp@yahoo.com',
                    pass: key
                }
            });

            mailOptions = {
                from: 'ggcinternapp@yahoo.com',
                to: [coordinatorEmail, req.user.email],
                subject: emailSubject,
                text: emailText,
                attachments: [
                    {
                        filename: String(user.lname).toUpperCase() + '_' + attachmentFileName + '_' + file.name,
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
                    console.log(typeOfFile + ' sent to ' + coordinatorEmail + '!');
                    addDocumentToUser(typeOfFile, file.name, req.user, whatIsFile);
                    res.redirect('/home');
                    if (whatIsFile) {
                        req.flash('success', whatIsFile + ' uploaded!');
                    } else {
                        req.flash('success', typeOfFile + ' uploaded!');
                    }

                }

            });
}

function sendEmail(req, res, typeOfEmail, studentEmail, redirect) {

    var emailSubject;
    var emailText;
    var transporter;
    switch (typeOfEmail) {
        case 'documentStatusUpdate':
            emailSubject = '[GGC Internship Application] Document Upload Status Changed';
            emailText = 'The status has changed for one of your document uploads. Please login to view the status change: https://ggc-internapp.herokuapp.com/login';
            break;
        case 'documentFeedback':
            emailSubject = '[GGC Internship Application] Application Feedback Received';
            emailText = 'One of your document uploads has received new feedback. Please login to view the feedback: https://ggc-internapp.herokuapp.com/login';
            break;
        default:
            console.log('email type not recognized')
            res.redirect('/applications');
            break;
    }

    transporter = nodemailer.createTransport({
                service: 'yahoo',
                auth: {
                    user: 'ggcinternapp@yahoo.com',
                    pass: key
                }
    });

    mailOptions = {
        from: 'ggcinternapp@yahoo.com',
        to: studentEmail,
        subject: emailSubject,
        text: emailText
    }
    transporter.sendMail(mailOptions, function(err) {
        if (err) {
            console.log(err);
            res.redirect(redirect);
        } else {
            console.log(typeOfEmail, ' completed!');
            res.redirect(redirect);
        }
    });
}