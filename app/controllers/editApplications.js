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
    Itec.findOne({
        "_id" : incomingUserId
    }, function(err, foundItecApp) {
        res.render('edititec', {
            application: foundItecApp
        });
    });
}

module.exports.updateBioApp = function(req, res) {
    // remember update last updated time
}

module.exports.updateItecApp = function(req, res) {
    // remember update last updated time
}