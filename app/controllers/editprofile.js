var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

// GET /editprofile
module.exports.getEditProfile = function(req, res) {
    User.findOne({
        'local.email' : req.user.email
    }, function(err, profile) {
        res.render('editprofile.ejs', {
            profiledetails : profile,
            user : profile,
            message : req.flash('info')
        });
    });
};

// POST /editprofile
module.exports.updateProfile = function(req, res) {
    User.update({'local.email' : req.user.email}, {
        'local.studentid' : req.body.studentid,
        'local.fname' : req.body.fname,
        'local.lname' : req.body.lname,
        'local.address' : req.body.address,
        'local.city' : req.body.city,
        'local.state' : req.body.state,
        'local.zipcode' : req.body.zipcode,
        'local.discipline' : req.body.discipline
    }, function(err) {
        if (err) {
            res.flash('info', err);
            res.redirect('/editprofile');
        } else {
            req.flash('info', 'success!');
            res.redirect('/editprofile');
        }
    });
};