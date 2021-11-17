/*
    Author: Robert Bryan

    - Logic for routes: getEditBio, getEditItec, updateBioApp, updateItecApp
       - Loads the user's submitted bio/itec application and then updates
*/
var User = require('../models/user');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

module.exports.getEditBio = function(req, res) {
    Bio.getUsersBioApp(req.user.email, function(foundBioApp) {
        User.findOne({_id: req.user._id}, function(err, user) {
            res.render('editbio', {
                application: foundBioApp,
                user : user,
                successMessage: req.flash('success'),
                failureMessage: req.flash('failure')
            });
        })
    });
}

module.exports.getEditItec = function(req, res) {
    Itec.getUsersItecApp(req.user.email, function(foundItecApp) {
        User.findOne({_id: req.user._id}, function(err, user) {
            res.render('editItec', {
                application: foundItecApp,
                user : user,
                successMessage: req.flash('success'),
                failureMessage: req.flash('failure')
            });
        })
    });
}


module.exports.updateAppStatusItec = function (req, res){
    newItecapp.applicationstatus = oldItecApp.applicationstatusItec;
}

module.exports.updateAppStatusBio = function (req, res){
    newBioapp.applicationstatus = oldBioApp.applicationstatusBio;
}

module.exports.updateBioApp = function(req, res) {

    var newBioapp = new Bio(req.body);
    newBioapp.useremail = req.user.email;
    newBioapp.userstudentid = req.user.studentid;
    newBioapp.userfname = req.user.fname;
    newBioapp.userlname = req.user.lname;
    newBioapp.userphone = req.user.phone;
    newBioapp.useraddress = req.user.address;
    newBioapp.usercity = req.user.city;
    newBioapp.userstate = req.user.state;
    newBioapp.userzipcode = req.user.zipcode;
    newBioapp.userdiscipline = 'BIO';

    Bio.findOneAndRemove({
        "useremail" : req.user.email
    }, function(err, oldBioApp) {
        if (err) throw err;
        console.log('bio app removed');
        newBioapp.applicationstatus = oldBioApp.applicationstatus;
        newBioapp.submissionDate = oldBioApp.submissionDate;
        newBioapp.feedback = oldBioApp.feedback;
        newBioapp.notes = oldBioApp.notes;
        newBioapp.save(function(err) {
            if (err) throw err;
            console.log('bio app saved');
            res.redirect('/home');
            req.flash('success', 'BIO Application updated!');
        });
    });
}

module.exports.updateItecApp = function(req, res) {
    var newItecapp = new Itec(req.body);
    
    newItecapp.useremail = req.user.email;
    newItecapp.userstudentid = req.user.studentid;
    newItecapp.userfname = req.user.fname;
    newItecapp.userlname = req.user.lname;
    newItecapp.userphone = req.user.phone;
    newItecapp.useraddress = req.user.address;
    newItecapp.usercity = req.user.city;
    newItecapp.userstate = req.user.state;
    newItecapp.userzipcode = req.user.zipcode;
    newItecapp.userdiscipline = 'ITEC';

    Itec.findOneAndRemove({
        "useremail" : req.user.email
    }, function(err, oldItecApp) {
        if (err) throw err;
        console.log('itec app removed');
        newItecapp.proposedinternsemester = oldItecApp.proposedinternsemester;
		newItecapp.proposedinternyearr = oldItecApp.proposedinternyear;


        newItecapp.applicationstatus = oldItecApp.applicationstatus;
        newItecapp.submissionDate = oldItecApp.submissionDate;
        newItecapp.feedback = oldItecApp.feedback;
        newItecapp.notes = oldItecApp.notes;
        newItecapp.save(function(err) {
            if (err) throw err;
            console.log('itec app saved');
            res.redirect('/home');
            req.flash('success', 'ITEC Application updated!');
        });
    });
}