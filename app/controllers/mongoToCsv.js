var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

var json2csv = require('json2csv');
var fs = require('fs');
var homeDir = require('home-dir');
var path = require('path');

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

    console.log(path.resolve(homeDir() + '/Downloads'));

    var itecArray = [];
    Itec.find({

    }, function(err, itecEntries) {
        
        itecEntries.forEach(function(itecEntry) {
            // if the user has not entered any notes
            if (itecEntry.notes.length == 0) { 
                var itecJson = {
                    ID : itecEntry.userstudentid,
                    FirstName : itecEntry.userfname,
                    LastName : itecEntry.userlname,
                    'ITEC GPA' : itecEntry.itecgpa,
                    Concentration : itecEntry.major,
                    Graduation : itecEntry.graduation,
                    Notes : '', // set notes to empty 
                    Programming : itecEntry.focusonsoftdev
                };
            } else {
                var itecJson = {
                    ID : itecEntry.userstudentid,
                    FirstName : itecEntry.userfname,
                    LastName : itecEntry.userlname,
                    'ITEC GPA' : itecEntry.itecgpa,
                    Concentration : itecEntry.major,
                    Graduation : itecEntry.graduation,
                    Notes : itecEntry.notes[0].note,
                    Programming : itecEntry.focusonsoftdev
                };   
            }      
            itecArray.push(itecJson);
        });
            // Field names for csv files
        var fields = ['ID', 'FirstName', 'LastName', 'ITEC GPA', 'Concentration',
        'Graduation', 'Notes', 'Programming'];

        var csv = json2csv({ data: itecArray, fields: fields });

        fs.writeFile('csv/itecApplicants.csv', csv, function(err) {
            if (err) {
                console.log(err);
            }
            console.log('file successfully saved');
        });
    });

    res.download(path.resolve(__dirname + '/../../csv/itecApplicants.csv'), function(err) {
        console.log(err);
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

