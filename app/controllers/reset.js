/*
    Controller functions containing the logic for the reset routes
    Authors : Joseph Cox, Robert Bryan
*/

var nodemailer = require('nodemailer');
var User = require('../models/user');
var crypto = require('crypto');
var key = process.env.KEY;
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
            message: req.flash('info')
        });
  });
};

/*
    HTTP Req: POST
    URL: '/reset'
*/
module.exports.postReset = function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
                if(err){
                    console.log(err);
                }
                if (!user) {
                    req.flash('info', 'Password reset token is invalid or has expired.');
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
            var transporter = nodemailer.createTransport('smtps://ggcinternapp%40gmail.com:' + key + '@smtp.gmail.com');
            var mailOptions = {
                from: '"GGC Interapp Admin" <admin@ggcinternapp>', // sender address 
                            to: user.local.email,
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'+
                'Click http://'+req.headers.host+ '/login to go to the login page.'
            };
            transporter.sendMail(mailOptions, function(err) {
                req.flash('info', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], 
    function(err) {
        req.flash('loginMessage', 'Success! Your password has been changed. Please Login!');
        res.redirect('/login');
    });
};