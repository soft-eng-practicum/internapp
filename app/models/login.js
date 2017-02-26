var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');


// GET /login
var renderLoginPage = function(req, res, responseBody) {
    res.render('login.ejs', {
        message : req.flash('loginMessage')
    });
};

// POST /login
var processLogin = function(req, res, responseBody) {

    passport.authenticate('local-login', function(err, user, info) {

        if (err) {
            console.log("error");
            return;
        }

        if (user) {
            res.redirect('/appliactions');
        } else {
            res.redirect('/login');
        }
    })(req, res);
};

    

// GET /login
module.exports.getLogin = function(req, res) {
    renderLoginPage(req, res);
};

// POST /login
module.exports.login = function(req, res) {
    processLogin(req, res);
};