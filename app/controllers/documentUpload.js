/*
    Controller functions containing the logic for the document uploads
    Authors : Robert Bryan
*/


var fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');
var key = process.env.KEY; // password for ggcinternapp@gmail.com

var User = require('../models/user');
var Document = require('../models/document');

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
                    console.log('hi');
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

    Document.findByIdAndUpdate({
        "_id" : req.params.documentId
    },{ 
        $set : {
            "documentStatus" : req.body.documentstatus
        }
    }, function(err) {
        if (err) {
            throw err;
        }
        res.redirect('/document/' + req.params.documentId);
        req.flash('success', 'Document status has been changed!')
    });
}

module.exports.addSpecificDocumentFeedback = function(req, res) {
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
            req.flash('success', 'The feedback has been successfully added!')                
            res.redirect('/document/'+req.params.documentId);
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
        sendEmail(req.files.resume, typeOfFile, req, res);
    }
}

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
function addDocumentToUser(fileType, fileName, user) {
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

            transporter = nodemailer.createTransport({
                service: 'yahoo',
                auth: {
                    user: 'ggcinternapp@yahoo.com',
                    pass: key
                }
            });

            mailOptions = {
                from: 'ggcinternapp@yahoo.com',
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
                    addDocumentToUser(typeOfFile, file.name, req.user);
                    res.redirect('/home');
                    req.flash('success', typeOfFile + ' uploaded!');
                }

            });
}