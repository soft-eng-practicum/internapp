// app/routes.js
var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

module.exports = function(app, passport) {

    // =====================================
    // PROMOTE =============================
    // =====================================
    app.get('/promote', isLoggedIn, function(req, res) {
        if(req.session.passport.user.role=='admin'){
          res.render('promote.ejs', {
            user : req.user // get the user out of session and pass to template
        });
        }
        else{
           res.redirect('/dashboard');
        }
    });
    app.post('/promote', isLoggedIn, function(req, res,next){
    console.log(req.body.email + ' '+ req.body.role);
    User.update({'local.email': req.body.email}, {'local.role': req.body.role}, function (err, status) {
  if(err) {}
  res.redirect('/dashboard');
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