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

var noFilesUploadedError = " You must choose a file to upload. "


module.exports.getDocumentUpload = function(req, res) {
    res.render('documentUpload', {
        user : req.session.passport.user,
        message : req.flash('info')
    });
}


// Upload itec resume 
module.exports.uploadItecResume = function(req, res) {
    var typeOfFile = 'resume';
    if (!req.files.resume) {
        req.flash('info', noFilesUploadedError);
        res.redirect('/documentUpload');
    } else {
        sendEmail(req.files.resume, typeOfFile, req, res);
    }
};

// Upload bio essay
module.exports.uploadBioEssay = function(req, res) {
    var typeOfFile = 'essay';
    if (!req.files.essay) {
        req.flash('info', noFilesUploadedError);
        res.redirect('/documentUpload');
    } else {
        sendEmail(req.files.essay, typeOfFile, req, res);
    } 
};

//Upload bio transcript
module.exports.uploadBioTranscript = function(req, res) {
    var typeOfFile = 'transcript';
    if (!req.files.transcript) {
        req.flash('info', noFilesUploadedError);
        res.redirect('/documentUpload');
    } else {
        sendEmail(req.files.transcript, typeOfFile, req, res);
    }
};

// Upload itec ferpa
module.exports.uploadItecFerpa = function(req, res) {
    var typeOfFile = 'ferpa';
    if (!req.files.ferpa) {
        req.flash('info', noFilesUploadedError);
        res.redirect('/documentUpload');
    } else {
        sendEmail(req.files.ferpa, typeOfFile, req, res);
    }
};

// Download FERPA 
module.exports.downloadFerpa = function(req, res) {
    res.download('./ferpa.docx', 'ferpa.docx', function(err) {
        if (err) {
            if (res.headersSent()) {
               res.removeHeader("Content-Encoding");
               req.flash('info', 'An error has occured with the file download');
               res.redirect('/documentUpload');
            }
            console.error(err);
        }
    })
};

// Add a document to the user's 
function addDocumentToUser(fileType) {
     // Student Name
     var recordFileType;
     var recordSection;

     switch (fileType) {
         case "ferpa":
             recordFileType = "FERPA";
             recordSection = "ITEC";
             break;
        case "resume":
             recordFileType = "Resume";
             recordSection = "ITEC";
             break;
        case "transcript":
             recordFileType = "Resume";
             recordSection = "Biology";
             break;   
        case "essay":
             recordFileType = "Resume";
             recordSection = "Biology";
             break;                     
        default:
             console.error('fileType not recognized - upload record creation failed');
             return false;
             break;
     }
     
     // Update user's document array
     User.findOneAndUpdate({
         'local.email' : req.user.email
    }, {
        $push: {
            'documents' : {
                'fileType' : recordFileType,
                'fileSection' : recordSection
            }
        }
    });
    return true; 
}

// Function to "prettify" the date displayed on the home page
function formatDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = month + '/' + day + '/' + year + " " + hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function sendEmail(file, typeOfFile, req, res) {
    var coordinatorEmail;
    var emailSubject;
    var emailText;
    switch (typeOfFile) {
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
            }
            transporter.sendMail(mailOptions, function(err) {
                if (err) {
                    console.log(err);
                }
                console.log(typeOfFile + ' sent!');
                res.redirect('/documentUpload');
            })
};