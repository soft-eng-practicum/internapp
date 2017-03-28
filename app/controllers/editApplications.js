/*
    Author: Robert Bryan

    - Logic for routes: getEditBio, getEditItec, updateBioApp, updateItecApp
       - Loads the user's submitted bio/itec application and then updates
*/

var Bio = require('../models/bio');
var Itec = require('../models/itec');

module.exports.getEditBio = function(req, res) {
    Bio.getUsersBioApp(req.user.email, function(foundBioApp) {
        console.log('found bio app ', foundBioApp);
        res.render('editbio', {
            application: foundBioApp
        });
    });
}

module.exports.getEditItec = function(req, res) {
    Itec.getUsersItecApp(req.user.email, function(foundItecApp) {
        console.log('found itec app ', foundItecApp);
        res.render('editItec', {
            application: foundItecApp
        });
    });
}

module.exports.updateBioApp = function(req, res) {
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
        "useremail" : req.user.email
    }, function(err, bioapp) {
        if (err) throw err;
        console.log('bio app removed');
        bioapp.save(function(err) {
            if (err) throw err;
            console.log('bio app saved');
            res.redirect('/home');
        });
    });
}

module.exports.updateItecApp = function(req, res) {
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
        "useremail" : req.user.email
    }, function(err, itecApp) {
        if (err) throw err;
        console.log('itec app removed');
        itecapp.save(function(err) {
            if (err) throw err;
            console.log('itec app saved');
            res.redirect('/home');
        });
    });
}