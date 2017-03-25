var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

var json2csv = require('json2csv');
var fs = require('fs');
var homeDir = require('home-dir');
var path = require('path');

module.exports.getExport = function(req, res) {
    res.render('export.ejs', {
      user: req.user
    });
}

module.exports.exportUser = function(req, res) {

};

module.exports.exportBio = function(req, res) {

};

/*
Creates a csv file utilizing the following fields from the Itec Collection:
    - userstudentid
    - userfname
    - userlname
    - proposedinternyear
    - proposedinternsemester
    - itecgpa
    - major
    - graduation
    - notes[0].note (defaulted to empty string if no notes exist)
    - focusonsoftdev

 csv file saved @: projectroot/csv/itecApplicants.csv
*/
module.exports.exportItec = function(req, res, next) {
    var collectionType = 'itec';
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
            download(res, collectionType);
        });
    });
};

/*

Creates a csv file utilizing the following fields from the Site Collection:
 - name
 - address
 - city
 - state
 - zipcode
 - mou

 csv file saved @: projectroot/csv/internshipSites.csv
*/
module.exports.exportSite = function(req, res) {
    var collectionType = 'site';
    var siteArray = [];
    Site.find({
    }, function(err, siteEntries) {

        siteEntries.forEach(function(siteEntry) {
            var MOU = "";
            if ( !siteEntry.mou || siteEntry.mou.toString().toLowerCase() == "no" || siteEntry.mou == "" || siteEntry.mou == "undefined") {
                MOU = "No";
            } else {
                MOU = "Yes";
            }
            var siteJson = {
                CompanyName : siteEntry.name,
                Street : siteEntry.address,
                City : siteEntry.city,
                State : siteEntry.state,
                Zip : siteEntry.zipcode,
                MOU : MOU
            }
            siteArray.push(siteJson);
        });

        // Field names for csv file
        var fields = ['CompanyName', 'Street', 'City', 'State', 'Zip',
        'MOU'];

        var csv = json2csv({ data: siteArray, fields: fields });

        fs.writeFile('csv/internshipSites.csv', csv, function(err) {
            if (err) {
                console.log(err);
            }
            console.log('file successfully saved');
            download(res, collectionType);
        });
    });
};

module.exports.exportBio = function(req, res) {
    var collectionType = 'site';
    var siteArray = [];
    Site.find({
    }, function(err, siteEntries) {

        siteEntries.forEach(function(siteEntry) {
            var siteJson = {
                CompanyName : siteEntry.name,
                Street : siteEntry.address,
                City : siteEntry.city,
                State : siteEntry.state,
                Zip : siteEntry.zipcode,
                MOU : siteEntry.mou
            }
            siteArray.push(siteJson);
        });

        // Field names for csv file
        var fields = ['CompanyName', 'Street', 'City', 'State', 'Zip',
        'MOU'];

        var csv = json2csv({ data: siteArray, fields: fields });

        fs.writeFile('csv/internshipSites.csv', csv, function(err) {
            if (err) {
                console.log(err);
            }
            console.log('file successfully saved');
            download(res, collectionType);
        });
    });
};

/*
Creates a csv file utilizing the following fields from the Site Information Collection:
    - contactname
    - title
    - email
    - office
    - cell
 csv file saved @: projectroot/csv/siteInfo.csv
*/
module.exports.exportSiteInfo = function(req, res, next) {
    var collectionType = 'siteInfo';
    var siteInfoArray = [];
    Site.find({
    }, function(err, sites) {

        sites.forEach(function(site) {

         site.findById(req.parms.siteId)
             .exec(
                 function(err,site){
              for( var i = 0; i < siteInfoArray.find.length; i++)
              {  
                var siteInfoJson = {
                    Contact : siteInfoEntries.name,
                    Title : siteInfoEntries.title,
                    Email : siteInfoEntries.email,
                    Office : siteInfoEntries.office,
                    Cell : siteInfoEntries.cell
                    
               }};
            siteInfoArray.push(siteInfoJson);
        });
            // Field names for csv files
        var fields = ['Contact', 'Title', 'Email', 'Notes', 'Office',
        'Cell'];

        var csv = json2csv({ data: siteInfoArray, fields: fields });

        fs.writeFile('csv/siteInfo.csv', csv, function(err) {
            if (err) {
                console.log(err);
            }
            console.log('file successfully saved');
            download(res, collectionType);
        });
    });
});







// Downloads the csv associated with the collection type being passed in
function download(res, collectionType) {
    var csvPath;
    switch (collectionType) {
        case 'itec':
            csvPath = path.resolve(__dirname + '/../../csv/itecApplicants.csv');
            break;
        case 'site':
            csvPath = path.resolve(__dirname + '/../../csv/internshipSites.csv');
            break;
        case 'siteInfo':
            csvPath = path.resolve(__dirname + '/../../csv/SiteInformation.csv');
            break;
        default:
            console.log("unknown collectionType");
            res.redirect('/');
            break;
    }
    res.download(csvPath, function(err) {
        if (err) console.error('Error downloading csv: ', err);
        else console.log(collectionType, "successfully downloaded!")
    });
}}
