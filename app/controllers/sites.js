/*
    Controller functions containing the logic for the sites routes
    Authors : Joseph Cox, Robert Bryan
*/

var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

/*
    HTTP Req: GET
    URL: '/sites'
*/
module.exports.getSites = function(req, res) {
    if(true) {
        Site.find(function (err, sites) {
            if (err) return console.error(err);
            res.render('site.ejs', {
                siteList : sites,
                user : req.user
            });
        });
    }
    else {
        res.redirect('/home');
    }
};

/*
    HTTP Req: GET
    URL: '/site/edit/:siteid'
*/
module.exports.getSiteToEdit = function(req, res) {
    Site.findOne({ _id: req.params.siteid },function (err, sitedetail) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('editsite.ejs', {
                site : sitedetail,
                user : req.user,
                successMessage : req.flash('success'),
                failureMessage : req.flash('failure')
            });
        }
    });
};

/*
    HTTP Req: GET
    URL: '/site/:siteid'
*/
module.exports.getSiteDetails = function(req, res) {
    Site.findOne({ _id: req.params.siteid },function (err, sitedetail) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('sitedetail', {
                site : sitedetail,
                user : req.user,
                successMessage : req.flash('success'),
                failureMessage: req.flash('failure')
            });
        }
    });
};

/*
    HTTP Req: GET
    URL: '/addSite'
*/
module.exports.getAddSite = function(req, res) {
    if(true) {
        res.render('addsite.ejs', {
            user : req.user,
            messages: req.flash('info')
        });
    } else {
        res.redirect('/home');
    }
};

/*
    HTTP Req: GET
    URL: '/site/contacts/:siteid/:documentid'
*/
module.exports.getSiteDocument = function(req, res) {
    Site.update({ _id: req.params.siteid },{$pull: {"contacts": {_id: req.params.documentid}}}, 
    function (err) {
        if (err) {
            req.flash('failure', 'The Site Contact can not be deleted at this time.')
            res.redirect('/site/'+req.params.siteid);
        }
        else {
            req.flash('success', 'The Site Contact has successfully been deleted!');
            res.redirect('/site/'+req.params.siteid);
        }
    });
};

/*
    HTTP Req: POST
    URL: '/addSite'
*/
module.exports.postAddSite = function(req, res) {
    var site = new Site({ name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode, section: req.body.section,
    mou: req.body.mou, mouexpiration: req.body.mouexpiration });
    site.save(function (err) {
        if (err) {
            req.flash('info', err)
            res.render('addsite.ejs', {
                user : req.user,
                messages: req.flash('info')
            });
        }
        else {
            res.redirect('/sites');
        }
    });
};

/*
    HTTP Req: POST
    URL: '/site/:siteid'
*/
module.exports.addSiteContact = function(req, res) {
Site.update({ _id: req.params.siteid },{$push: {"contacts": {name: req.body.name, title: req.body.title, email: req.body.email, office: req.body.office, cell: req.body.cell}}},
function (err) {
    if (err) {
        req.flash('failure', 'The Site Contact can not be added at this time.')
        res.redirect('/site/'+req.params.siteid);
    }
    else {
        req.flash('success', 'The Site Contact has been added!')
        res.redirect('/site/'+req.params.siteid);
    }
    });
};

/*
    HTTP Req: POST
    URL: '/site/edit/:siteid'
*/
module.exports.updateSite = function(req, res) {
    var siteId = req.params.siteid;
    Site.update({ _id: req.params.siteid },{name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode,  section: req.body.section,
        mou: req.body.mou, mouexpiration: req.body.mouexpiration},
        function (err) {
            if (err){
                req.flash('failure', 'The Site updated cannot be completed at this time.');
                res.redirect('/site/edit/'+siteId);
            }
            else {
                req.flash('success', 'The Site has been updated!');
                res.redirect('/site/edit/'+siteId);
            }
    });
};

/*
    HTTP Req: POST
    URL: '/site/delete/:siteid'
*/
module.exports.deleteSite = function(req, res) {
    Site.remove({ _id: req.params.siteid },function (err) {
        if (err) {
            req.flash('info',err);
            res.redirect('/site/edit/'+req.params.siteid);
        }
        else {
            res.redirect('/sites');
        }
    });
};

