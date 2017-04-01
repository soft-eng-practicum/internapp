/*
    Controller functions containing the logic for the promote routes
    Authors : Joseph Cox, Robert Bryan
*/

var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

/*
    HTTP Req: GET
    URL: '/promote'
*/
module.exports.getPromote = function(req, res) {
    if (req.session.passport.user.role == 'admin') {
        res.render('promote.ejs', {
            user : req.user, // get the user out of the session and pass to template
            message : req.flash('success')
        });
    } else {
        res.redirect('/home'); // if the user is not an admin, redirect
    }
};

/*
    HTTP Req: POST
    URL: '/promote'
*/
module.exports.promoteUser = function(req, res) {
    var role = String(req.body.role).toLowerCase();
    User.update({'local.email' : req.body.email}, {'local.role' : role}, function(err, status) {
        if (err) {
            console.log(err);
        } else {
            req.flash('success', req.body.email + ' has been promoted to ' + req.body.role);
            res.redirect('/promote');
        }
    })
};