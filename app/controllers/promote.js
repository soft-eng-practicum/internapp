// app/routes.js
var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

// GET /promote
module.exports.getPromote = function(req, res) {
    if (req.session.passport.user.role == 'admin') {
        res.render('promote.ejs', {
            user : req.user // get the user out of the session and pass to template
        });
    } else {
        res.redirect('/dashboard'); // if the user is not an admin, redirect
    }
};

// POST /promote
module.exports.promoteUser = function(req, res) {
    User.update({'local.email' : req.body.email}, {'local.role' : req.body.role}, function(err, status) {
        if (err) {
            console.log(err);
        } else {
            req.flash('info', req.body.email + ' has been promoted to ' + req.body.role);
            res.redirect('/dashboard');
        }
    })
};