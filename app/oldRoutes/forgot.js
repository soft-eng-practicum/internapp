var nodemailer = require('nodemailer');
var User = require('../models/user');
var crypto = require('crypto');
var key = process.env.KEY;
var async = require('async');

module.exports = function(app, passport) {
    app.post('/forgot', function(req, res) {
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                User.findOne({
                    'local.email': req.body.email
                }, function(err, user) {
                    if (!user) {
                        req.flash('info', 'No account with that email address exists.');
                        return res.redirect('/forgot');
                    }

                    user.local.resetPasswordToken = token;
                    user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function(err) {
                        done(err, token, user);
                    });
                });
            },
            function(token, user, done) {
                var transporter = nodemailer.createTransport('smtps://ggcinternapp%40gmail.com:' + key + '@smtp.gmail.com');
                var mailOptions = {
                    from: '"GGC Interapp Admin" <admin@ggcinternapp>', // sender address 
                    to: req.body.email,
                    subject: 'Password reset code', // Subject line 
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                transporter.sendMail(mailOptions, function(err) {
                    req.flash('info', 'An e-mail has been sent to ' + user.local.email + ' with further instructions.');
                    done(err, 'done');
                });
            }
        ], function(err) {
            if (err) return next(err);
            res.redirect('/forgot');
        });
    });

    app.get('/forgot', function(req, res) {
        res.render('forgot.ejs', {
            message: req.flash('info')
        });
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}