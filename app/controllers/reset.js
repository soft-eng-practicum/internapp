/*
    Controller functions containing the logic for the reset routes
    Authors : Joseph Cox, Robert Bryan
*/

var nodemailer = require('nodemailer');
var User = require('../models/user');
var crypto = require('crypto');
var key = process.env.YAHOO_PASSWORD;
var async = require('async');

/*
    HTTP Req: GET
    URL: '/reset'
*/
module.exports.getReset = function(req, res) {
    User.findOne({ 'local.resetPasswordToken': req.params.token,'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('reset.ejs', {
            user: req.user,
            successMessage: req.flash('success'),
            failureMessage: req.flash('failure')
        });
  });
};

/*
    HTTP Req: POST
    URL: '/reset'
*/
module.exports.postReset = function(req, res) {
    if (req.body.password !== req.body.confirmpassword) {
        res.redirect('/reset/' + req.params.token);
        req.flash('failure', 'Your passwords must match');
    } else {
        async.waterfall([
                function(done) {
                    User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
                        if(err){
                            console.log(err);
                        }
                        if (!user) {
                            req.flash('failure', 'Password reset token is invalid or has expired.');
                            res.redirect('/forgot');
                        }
                        user.local.password = user.generateHash(req.body.password);
                        user.local.resetPasswordToken = undefined;
                        user.local.resetPasswordExpires = undefined;

                        user.save(function(err) {
                            if(err){
                                console.log(err);
                            }
                            done(err, user);
                        });
                    });
                },
                function(user, done) {

                transporter = nodemailer.createTransport({
                        service: 'yahoo',
                        auth: {
                            user: 'testinternapp@yahoo.com',
                            pass: key
                        }
                    });

                    var mailOptions = {
                        from: 'testinternapp@yahoo.com', // sender address 
                                    to: user.local.email,
                        subject: 'Your password has been changed',
                        text: 'Hello,\n\n' +
                        'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'+
                        'Click http://'+req.headers.host+ '/login to go to the login page.'
                    };
                    transporter.sendMail(mailOptions, function(err) {
                        if (err) {
                            res.redirect('/reset/' + req.params.token);
                            req.flash('success', 'Success! Your password has been changed.');
                        } else {
                            res.redirect('/reset/' + req.params.token);
                            req.flash('success', 'Success! Your password has been changed.');
                        }

                    });
                }
            ], 
            function(err) {
                if (err) {
                req.flash('failure', 'Apologies, your request cannot be completed at this time.');
                }
            });
    }
};