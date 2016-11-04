// app/routes.js
var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

module.exports = function(app, passport) {

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
        app.get('/editprofile', isLoggedIn, function(req, res) {
            User.findOne({
                    'local.email': req.user.email
                }, function(err, profile) {
                    res.render('editprofile.ejs', {
                        profiledetails: profile,
                        user: profile,
                         message: req.flash('info') 
                    });
                });
    });
    
            app.post('/editprofile', function(req, res) {
        // render the page and pass in any flash data if it exists
    User.update({'local.email': req.user.email}, {
        'local.studentid': req.body.studentid,
        'local.fname': req.body.fname,
        'local.lname': req.body.lname,
        'local.address': req.body.address,
        'local.city': req.body.city,
        'local.state': req.body.state,
        'local.zipcode': req.body.zipcode,
        'local.discipline': req.body.discipline
    }, function (err) {
  if(err) {
      
      req.flash('info',err);
      res.redirect('/editprofile');}
  else{
      req.flash('info','success!');
        res.redirect('/editprofile');
    }
    });
            });
    
    
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}