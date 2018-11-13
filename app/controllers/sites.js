/*
    Controller functions containing the logic for the sites routes
    Authors : Joseph Cox, Robert Bryan
*/

var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');
var json2csv = require('json2csv');
var fs = require('fs');
var homeDir = require('home-dir');
var path = require('path');

/*
    HTTP Req: GET
    URL: '/sites'
*/
module.exports.getSites = function (req, res) {
    User.getAdminValuesForHome(req.user._id, function (adminValues) {
        Site.find(function (err, sites) {
            if (err) return console.error(err);
            res.render('site.ejs', {
                siteList: sites,
                successMessage: req.flash('success'),
                failureMessage: req.flash('failure'),
                user: req.user,
                admin: adminValues
            });
        });
    });

}

/*
    HTTP Req: POST
    URL: '/site'
*/
module.exports.exportSites = function (req, res) {
    var discipline = "";
    var program = req.body.program;
    var siteArray = [];
    var redirect = "/sites";
    var fields = [];

    switch (req.body.program) {
        case 'Biology Internship (BIOL 4800)':
            discipline = 'Bio';
            break;
        case 'Information Technology Internship (ITEC 4900)':
            discipline = 'Itec';
            break;
        default:
            res.redirect('/sites');
            req.flash('failure', 'Program not recognized');
            break;
    }

    Site.find({
        section: discipline
    }, function (err, sites) {
        sites.forEach(function (siteEntry) {

            var MOU = "";
            if (!siteEntry.mou || siteEntry.mou.toString().toLowerCase() == "no" || siteEntry.mou == "" || siteEntry.mou == "undefined") {
                MOU = "No";
            } else {
                MOU = "Yes";
            }

            var Status = "";
            if (!siteEntry.sitestatus || siteEntry.sitestatus.toString().toLowerCase() == "no" || siteEntry.sitestatus == "" || siteEntry.sitestatus == "undefined") {
                Status = "No";
            } else {
                Status = "Yes";
            }

            var siteJson = {
                CompanyName: siteEntry.name,
                Street: siteEntry.address,
                City: siteEntry.city,
                State: siteEntry.state,
                Zip: siteEntry.zipcode,
                MOU: MOU,
                Status: Status
            }
            siteArray.push(siteJson);

        });

        // Field names for csv file
        var fields = ['CompanyName', 'Street', 'City', 'State', 'Zip',
            'MOU'];

        var csv = json2csv({ data: siteArray, fields: fields });

        var fileName = 'csv/' + String(discipline).toLowerCase() + '_sites' + '.csv';
        write(fileName, csv, req, res, redirect);
    });
}

function write(fileName, csv, req, res, redirect) {
    fs.writeFile(fileName, csv, function (err) {
        if (err) {
            req.flash('failure', 'There was an error with the writing of the CSV file');
        } else {
            console.log('file successfully saved');
            csvPath = path.resolve(__dirname + '/../../' + fileName);
            download(csvPath, req, res, redirect);
        }
    });
}

function download(csvPath, req, res, redirect) {
    res.download(csvPath, function (err) {
        if (err) {
            console.log('Error downloading csv: ', err);
            req.flash('failure', 'There was an error downloading the csv file');
        } else {
            console.log('file successfully written!');
            deleteFile(csvPath, req, res, redirect);
        }
    });
}

function deleteFile(fileName, req, res, redirect) {
    fs.unlink(fileName, function (err) {
        if (err) {
            console.log('Error deleting the filing after download');
        } else {
            console.log(fileName + ' deleted!');
            res.redirect(redirect);
        }
    });
}

/*
    HTTP Req: GET
    URL: '/site/edit/:siteid'
*/
module.exports.getSiteToEdit = function (req, res) {
    Site.findOne({ _id: req.params.siteid }, function (err, sitedetail) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('editsite.ejs', {
                site: sitedetail,
                user: req.user,
                successMessage: req.flash('success'),
                failureMessage: req.flash('failure')
            });
        }
    });
};

/*
    HTTP Req: GET
    URL: '/site/:siteid'
*/
module.exports.getSiteDetails = function (req, res) {
    Site.findOne({ _id: req.params.siteid }, function (err, sitedetail) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('sitedetail', {
                site: sitedetail,
                user: req.user,
                successMessage: req.flash('success'),
                failureMessage: req.flash('failure')
            });
        }
    });
};

/*
    HTTP Req: GET
    URL: '/addSite'
*/
module.exports.getAddSite = function (req, res) {
    res.render('addsite.ejs', {
        user: req.user,
        successMessage: req.flash('success'),
        failureMessage: req.flash('failure')
    });
};

/*
    HTTP Req: GET
    URL: '/site/contacts/:siteid/:documentid'
*/
module.exports.deleteSiteContact = function (req, res) {
    Site.update({ _id: req.params.siteid }, { $pull: { "contacts": { _id: req.params.documentid } } },
        function (err) {
            if (err) {
                req.flash('failure', 'The Site Contact can not be deleted at this time.')
                res.redirect('/site/' + req.params.siteid);
            }
            else {
                req.flash('success', 'The Site Contact has successfully been deleted!');
                res.redirect('/site/' + req.params.siteid);
            }
        });
};

/*
    HTTP Req: POST
    URL: '/addSite'
*/
module.exports.postAddSite = function (req, res) {
    var section;

    switch (req.body.siteProgram) {
        case "Information Technology Internship (ITEC 4900)":
            section = "Itec";
            break;
        case "Biology Internship (BIOL 4800)":
            section = "Bio";
        default:
            break;
    };

    if (section) {
        var site = new Site({
            name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode, section: section,
            mou: req.body.mou, mouexpiration: req.body.mouexpiration, sitestatus: req.body.sitestatus
        });

        site.save(function (err) {
            if (err) {
                req.flash('failure', "An error has occured, the site cannot be added.");
                console.log(err);
                res.render('addsite.ejs', {
                    user: req.user,
                    successMessage: req.flash('success'),
                    failureMessage: req.flash('failure')
                });
            }
            else {
                res.redirect('/sites');
                req.flash('success', 'Site successfully added!')
            }
        });
    } else {
        res.redirect('/addsite');
        req.flash('failure', 'You must select a site program.');
    }
};

/*
    HTTP Req: POST
    URL: '/site/:siteid'
*/
module.exports.addSiteContact = function (req, res) {
    Site.update({ _id: req.params.siteid }, { $push: { "contacts": { fname: req.body.fname, lname: req.body.lname, title: req.body.title, email: req.body.email, office: req.body.office, cell: req.body.cell } } },
        function (err) {
            if (err) {
                req.flash('failure', 'The Site Contact can not be added at this time.')
                res.redirect('/site/' + req.params.siteid);
            }
            else {
                req.flash('success', 'The Site Contact has been added!')
                res.redirect('/site/' + req.params.siteid);
            }
        });
};

/*
    HTTP Req: POST
    URL: '/site/edit/:siteid'
*/
module.exports.updateSite = function (req, res) {
    var siteId = req.params.siteid;
    Site.update({ _id: req.params.siteid }, {
        name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode, section: req.body.section,
        mou: req.body.mou, mouexpiration: req.body.mouexpiration, sitestatus: req.body.sitestatus
    },
        function (err) {
            if (err) {
                req.flash('failure', 'The Site update cannot be completed at this time.');
                res.redirect('/site/edit/' + siteId);
            }
            else {
                req.flash('success', 'The Site has been updated!');
                res.redirect('/site/edit/' + siteId);
            }
        });
};

/*
    HTTP Req: POST
    URL: '/site/delete/:siteid'
*/
module.exports.deleteSite = function (req, res) {
    Site.remove({ _id: req.params.siteid }, function (err) {
        if (err) {
            req.flash('failure', 'Site cannot be removed.');
            res.redirect('/site/edit/' + req.params.siteid);
        }
        else {
            res.redirect('/sites');
            req.flash('success', 'Site successfully removed!');
        }
    });
};

/*
    HTTP Req: GET
    URL: '/site/:siteid/export/contacts'
*/
module.exports.exportContacts = function (req, res) {
    var contactsArray = [];
    var fields;
    var siteId = req.params.siteId;
    Site.findById({
        "_id": siteId
    }, function (err, site) {
        if (site.contacts.length == 0) {
            req.flash('failure', 'You must add a contact to export.');
            res.redirect('/site/' + siteId);
        } else {
            site.contacts.forEach(function (contact) {
                var contactJson = {
                    FirstName: contact.fname,
                    LastName: contact.lname,
                    Title: contact.title,
                    Email: contact.email,
                    'Office Phone': contact.office,
                    Cell: contact.cell
                };
                contactsArray.push(contactJson);
            });
            fields = ['FirstName', 'LastName', 'Title',
                'Email', 'Office Phone', 'Cell'];

            var csv = json2csv({ data: contactsArray, fields: fields });
            var fileName = 'csv/' + String(site.name).toLowerCase().replace(/ /g, '_') + '_contacts' + '.csv';
            write(fileName, csv, req, res);
        }
    });
}


function write(fileName, csv, req, res) {
    fs.writeFile(fileName, csv, function (err) {
        if (err) {
            req.flash('failure', 'There was an error with the writing of the CSV file');
            console.log(err);
        } else {
            console.log('file successfully saved');
            csvPath = path.resolve(__dirname + '/../../' + fileName);
            download(csvPath, req, res);
        }
    });
}

function download(csvPath, req, res) {
    res.download(csvPath, function (err) {
        if (err) {
            console.log('Error downloading csv: ', err);
            req.flash('failure', 'There was an error downloading the csv file');
        } else {
            console.log('file successfully written!');
            deleteFile(csvPath);
        }
    });
}

function deleteFile(fileName) {
    fs.unlink(fileName, function (err) {
        if (err) {
            console.log('Error deleting the filing after download');
        } else {
            console.log(fileName + ' deleted!');
        }
    });
}