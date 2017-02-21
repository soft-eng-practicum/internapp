/*
    Controller functions containing the logic for the document uploads
    Authors : Robert Bryan
*/


var fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');
var key = process.env.KEY; // password for ggcinternapp@gmail.com

// Setting local env in powershell
// $env:key="password"



// placeholder values
var itecCoordinatorEmail = "rbryan3@ggc.edu";
var bioCoordinatorEmail = "rbryan3@ggc.edu";


// Upload itec resume 
module.exports.uploadItecResume = function(req, res) {
    console.log(key);
    var resume;
    var mailOptions;
    var transporter;
    var subject = "Resume placeholder subject";
    var text = "Resume placeholder text";

    if (!req.files) {
        return res.flash('info', 'No files were uploaded.');
    }

    resume = req.files.resume;

    transporter = nodemailer.createTransport('smtps://ggcinternapp%40gmail.com:' + key + '@smtp.gmail.com');
        mailOptions = {
            from: '"GGC Interapp Admin" <admin@ggcinternapp>',
            to: itecCoordinatorEmail,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: req.files.resume.name,
                    content: resume.data,
                    encoding: 'binary'
                }
            ]
        }
        transporter.sendMail(mailOptions, function(err) {
            if (err) {
                console.log(err);
            }
            console.log('Resume sent!');
            res.redirect('/upload');
        })

        // TO DO: Send attachment to user logged in
};

// Upload bio essay
module.exports.uploadBioEssay = function(req, res) {
    var essay;
    var mailOptions;
    var transporter;
    var subject = "Essay placeholder subject";
    var text = "Essay placeholder text";

    if (!req.files) {
        return res.flash('info', 'No files were uploaded.');
    }

    essay = req.files.essay;
    console.log(essay);

    transporter = nodemailer.createTransport('smtps://ggcinternapp%40gmail.com:' + key + '@smtp.gmail.com');
        mailOptions = {
            from: '"GGC Interapp Admin" <admin@ggcinternapp>',
            to: bioCoordinatorEmail,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: req.files.essay.name,
                    content: essay.data,
                    encoding: 'binary'
                }
            ]
        }
        transporter.sendMail(mailOptions, function(err) {
            if (err) {
                console.log(err);
            }
            console.log('Essay sent!');
            res.redirect('/upload');
        })

        // TO DO: Send attachment to user logged in
};

//Upload bio transcript
module.exports.uploadBioTranscript = function(req, res) {
    var transcript;
    var mailOptions;
    var transporter;
    var subject = "Transcript placeholder subject";
    var text = "Transcript placeholder text";

    if (!req.files) {
        return res.flash('info', 'No files were uploaded.');
    }

    transcript = req.files.transcript;

    transporter = nodemailer.createTransport('smtps://ggcinternapp%40gmail.com:' + key + '@smtp.gmail.com');
        mailOptions = {
            from: '"GGC Interapp Admin" <admin@ggcinternapp>',
            to: bioCoordinatorEmail,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: req.files.transcript.name,
                    content: transcript.data,
                    encoding: 'binary'
                }
            ]
        }
        transporter.sendMail(mailOptions, function(err) {
            if (err) {
                console.log(err);
            }
            console.log('Transcript sent!');
            res.redirect('/upload');
        })

        // TO DO: Send attachment to user logged in
};