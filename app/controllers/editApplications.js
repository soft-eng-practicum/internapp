/*
    Author: Robert Bryan

    - Logic for routes: getEditBio, getEditItec, updateBioApp, updateItecApp
       - Loads the user's submitted bio/itec application and then updates
*/

var Bio = require('../models/bio');
var Itec = require('../models/itec');

module.exports.getEditBio = function(req, res) {
    var incomingUserId = req.params.userId;
    Bio.findOne({
        "_id" : incomingUserId
    }, function(err, foundBioApp) {
        res.render('editbio', {
            application: foundBioApp
        });
    });
}

module.exports.getEditItec = function(req, res) {
    var incomingUserId = req.params.userId;
    console.log('user id ', req.params.userId);
    Itec.findOne({
        "_id" : incomingUserId
    }, function(err, foundItecApp) {
        console.log('foundItecapp = ', foundItecApp);
        res.render('edititec', {
            application: foundItecApp
        });
    });
}

module.exports.updateBioApp = function(req, res) {
    var incomingUserId = req.params.userId;
    var bioapp = new Itec(req.body);
    bioapp.useremail = req.user.email;
    bioapp.userstudentid = req.user.studentid;
    bioapp.userfname = req.user.fname;
    bioapp.userlname = req.user.lname;
    bioapp.useraddress = req.user.address;
    bioapp.usercity = req.user.city;
    bioapp.userstate = req.user.state;
    bioapp.userzipcode = req.user.zipcode;
    bioapp.userdiscipline = 'BIO';

    Bio.findOneAndRemove({
        "_id" : incomingUserId
    }, function(err, bioapp) {
        if (err) throw err;
        console.log('bio app removed');
        bioapp.save(function(err) {
            if (err) throw err;
            console.log('bio app saved');
            res.redirect('/dashboard');
        });
    });
}

module.exports.updateItecApp = function(req, res) {
    var incomingUserId = req.params.userId;
    var itecapp = new Itec(req.body);
    itecapp.useremail = req.user.email;
    itecapp.userstudentid = req.user.studentid;
    itecapp.userfname = req.user.fname;
    itecapp.userlname = req.user.lname;
    itecapp.useraddress = req.user.address;
    itecapp.usercity = req.user.city;
    itecapp.userstate = req.user.state;
    itecapp.userzipcode = req.user.zipcode;
    itecapp.userdiscipline = 'ITEC';

    Itec.findOneAndRemove({
        "_id" : incomingUserId
    }, function(err, itecApp) {
        if (err) throw err;
        console.log('itec app removed');
        itecapp.save(function(err) {
            if (err) throw err;
            console.log('itec app saved');
            res.redirect('/dashboard');
        });
    });
}