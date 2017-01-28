var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');


    var renderLoginPage = function(req, res, responseBody) { 
        res.render('login.ejs', {
            message : req.flash('loginMessage')
        });
    };

    var processLogin = function(req, res, responseBody) {

    };

    module.exports.login = function(req, res) {
       passport.authenticate('local-login', {
            successRedirect : '/dashboard',
            failureRedirect : '/login',
            failureFlash : true
        })(req, res, next);
    };


    module.exports.getLogin = function(req, res) {
          res.render('login.ejs', {
            message : req.flash('loginMessage')
        });
    };





