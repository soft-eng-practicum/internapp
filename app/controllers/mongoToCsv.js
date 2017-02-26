var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

module.exports.exportUser = function(req, res) {

};

module.exports.exportBio = function(req, res) {

};

/*
    userstudentid
    userfname (FirstName)
    userlname (LastName)
    proposedinternyear
    proposedinternsemester
    itecgpa
    major
    graduation
    notes.note
    focusonsoftdev
*/
module.exports.exportItec = function(req, res) {
    var itecArray = [];
    Itec.find({

    }, function(err, itecEntries) {
        
        itecEntries.forEach(function(itecEntry) {
            if (itecEntry.notes.length == 0) {
                var itecJson = {
                    id : itecEntry.userstudentid,
                    FirstName : itecEntry.userfname,
                    LastName : itecEntry.userlname,
                    'ITEC GPA' : itecEntry.itecgpa,
                    Graduation : itecEntry.graduation,
                    Notes : '',
                    Programming : itecEntry.focusonsoftdev
                };
            } else {
                var itecJson = {
                    id : itecEntry.userstudentid,
                    FirstName : itecEntry.userfname,
                    LastName : itecEntry.userlname,
                    'ITEC GPA' : itecEntry.itecgpa,
                    Graduation : itecEntry.graduation,
                    Notes : itecEntry.notes[0].note,
                    Programming : itecEntry.focusonsoftdev
                };   
            }      
            itecArray.push(itecJson);
        });
    });
    
};

/*
    CompanyName
    Address
    City
    State
    Zip
    MOU
*/
module.exports.exportSite = function(req, res) {

};

