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
                        var document = {
                            "studentEmail" : user.local.email,
                            "studentName"  : user.local.fname + ' ' + user.local.lname,
                            "date"         : document.prettyUploadDate,
                            "section"      : document.fileSection,
                            "documentName" : document.documentName,
                            "documentType" : document.fileType,
                            "documentStatus": document.documentStatus
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
                console.log(user.local.documents.length);
                if (user.local.documents.length > 0) {
                    var userDocuments = user.local.documents;
                    userDocuments.forEach(function(document) { 
                        var document = {
                            "studentEmail" : user.local.email,
                            "studentName"  : user.local.fname + ' ' + user.local.lname,
                            "date"         : document.prettyUploadDate,
                            "section"      : document.fileSection,
                            "documentName" : document.documentName,
                            "documentType" : document.fileType,
                            "documentStatus": document.documentStatus
                        }
                        console.log('document = ',document);
                        documentList.push(document);
                    });
                }
                    console.log('docList = ',documentList)
                    res.render('documentUpload', {
                    user : req.session.passport.user,
                    documentList: documentList,
                    uploadError: req.flash('uploadError'),
                    successfulUpload: req.flash('successfulUpload')
                    })
            })
        }
}


// Upload itec resume 
module.exports.uploadItecResume = function(req, res) {
    var typeOfFile = 'Resume';
    if (!req.files.resume) {
        req.flash('uploadError', noFilesUploadedError);
        res.redirect('/documentUpload');
    } else {
        sendEmail(req.files.resume, typeOfFile, req, res);
    }
};

// Upload bio essay
module.exports.uploadBioEssay = function(req, res) {
    var typeOfFile = 'Essay';
    if (!req.files.essay) {
        req.flash('uploadError', noFilesUploadedError);
        res.redirect('/documentUpload');
    } else {
        sendEmail(req.files.essay, typeOfFile, req, res);
    } 
};

//Upload bio transcript
module.exports.uploadBioTranscript = function(req, res) {
    var typeOfFile = 'Transcript';
    if (!req.files.transcript) {
        req.flash('uploadError', noFilesUploadedError);
        res.redirect('/documentUpload');
    } else {
        sendEmail(req.files.transcript, typeOfFile, req, res);
    }
};

// Upload itec ferpa
module.exports.uploadItecFerpa = function(req, res) {
    var typeOfFile = 'Ferpa';
    if (!req.files.ferpa) {
        req.flash('uploadError', noFilesUploadedError);
        res.redirect('/documentUpload');
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
               req.flash('info', 'An error has occured with the file download');
               res.redirect('/documentUpload');
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

     console.log('fileType = ' + fileType + ' fileName = ' + fileName);

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
             return false;
     }
     
     console.log('userEmail = ', userEmail);
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
            res.redirect('/documentUpload');
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
                    console.log(err);
                }
                console.log(typeOfFile + ' sent!');
                addDocumentToUser(typeOfFile, file.name, req.user.email);
                req.flash('successfulUpload', typeOfFile + ' uploaded!');
                res.redirect('/documentUpload');
            });
}