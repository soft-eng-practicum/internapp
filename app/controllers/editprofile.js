/*
    Controller functions containing the logic for the editprofile routes
    Authors : Joseph Cox, Robert Bryan
*/

var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

/*
    HTTP Req: GET
    URL: '/editprofile'
*/
module.exports.getEditProfile = function(req, res) {
    User.findOne({
        'local.email' : req.user.email
    }, function(err, profile) {
        res.render('editprofile.ejs', {
            profiledetails : profile,
            user : profile.local,
            successMessage : req.flash('success'),
            failureMessage : req.flash('failure')
        });
    });
};

/*
    HTTP Req: POST
    URL: '/editprofile'
*/

module.exports.updateProfile = function(req, res) {
    User.update({'local.email' : req.user.email}, {
        'local.studentid' : req.body.studentid,
        'local.fname' : req.body.fname,
        'local.lname' : req.body.lname,
        'local.address' : req.body.address,
        'local.city' : req.body.city,
        'local.state' : req.body.state,
        'local.zipcode' : req.body.zipcode,
        'local.discipline' : req.body.discipline,
        'local.phone' : req.body.phone
    }, function(err) {
        if (err) {
            res.flash('failure', 'An error has occured, your profile could not be updated.');
            res.redirect('/editprofile');
        } else {
            req.flash('success', 'Profile successfully updated! Please logout/log back in to see the updated changes on your dashboard.');
            res.redirect('/editprofile');
        }
    });
};
