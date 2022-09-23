/*
    Controller functions containing the logic for the forgot routes
    Authors : Joseph Cox, Robert Bryan
*/

var nodemailer = require('nodemailer');
var User = require('../models/user');
var crypto = require('crypto');
var key = process.env.YAHOO_PASSWORD;
var async = require('async');

/*
    HTTP Req: POST
    URL: '/forgot'
*/
module.exports.postForgot = function(req, res) {
    async.waterfall([
        function(done) {
            console.log("forgot password requested, making token.");
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            console.log("finding user by email: " + req.body.email);
            User.findOne({
                'local.email': req.body.email
            }, function(err, user) {
                if (!user) {
                    req.flash('failure', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }
                console.log("found user: ")
                console.log(user);
                user.local.resetPasswordToken = token;
                user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            console.log("sending email.");
            transporter = nodemailer.createTransport({
                service: 'yahoo',
                auth: {
                    user: 'ggcinternapp@yahoo.com',
                    pass: key
                }
            });
            var mailOptions = {
                from: 'ggcinternapp@yahoo.com', // sender address 
                to: req.body.email,
                subject: 'Password reset code', // Subject line 
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
                if (err) {
                    console.log('error sending reset email, error: \n' + err);
                    res.redirect('/forgot');
                    req.flash('failure', 'An error has occurred. Your password cannot be reset at this time.');
                    done(err, 'failed');
                } else {
                    console.log('password reset email sent!');
                    res.redirect('/forgot')
                    req.flash('success', 'An e-mail has been sent to ' + user.local.email + ' with further instructions. You will receive an email from ggcinternapp@yahoo.com in a few minutes.');
                    done(err, 'done');
                }
            });
        }
    ], function (err, result) {
      // result now equals 'done'
      if (result != "done") {
        console.log(err);
        console.log('Something went wrong! Last result:');
        console.log(result);      
        res.redirect('/forgot');
        req.flash('failure', 'An error has occurred. Your password cannot be reset at this time.');
      }
    });
};

/*
    HTTP Req: GET
    URL: '/forgot'
*/
module.exports.getForgot = function(req, res) {
  res.render('forgot.ejs', {
            successMessage: req.flash('success'),
            failureMessage: req.flash('failure')
        });
};
