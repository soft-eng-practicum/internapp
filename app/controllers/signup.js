//var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');


// GET /signup
var renderSignUpPage = function(req, res, responseBody) {
    res.render('signup.ejs', {
    message: req.flash('signupMessage') 
    });
};

// POST /signup
var processSignup = function(req, res, responseBody) {
    return {
        successRedirect : '/dashboard',
        failureRedirect : '/signup'
    };
};

// GET /signup
module.exports.loadSignUp = function(req, res) {
    renderSignUpPage(req, res);
}; 

// POST /signup
module.exports.signup = () => {
    return {
        successRedirect : '/dashboard',
        failureRedirect : '/signup'
    };
};