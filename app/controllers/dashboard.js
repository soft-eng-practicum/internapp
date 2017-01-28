var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');
var mongoose = require('mongoose');

var renderDashboard = function(req, res)  {
    res.render('dashboard.ejs', {
        message : req.flash('info'),
        user : req.session.passport.user // get the user out of session and pass to template
    }); // load the index.ejs file
};

module.exports.loadDashboard = function(req, res) {
    renderDashboard(req, res);
}; 