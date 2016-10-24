// app/routes.js
var User = require('./models/user');
var Site = require('./models/site');
var Bio = require('./models/bio');
var Itec = require('./models/itec');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
      app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/dashboard', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));
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
    // =====================================
    // DASHBOARD SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/dashboard', isLoggedIn, function(req, res) {
        console.log(req.session);
        res.render('dashboard.ejs', {
            user : req.session.passport.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // ITEC ================================
    // =====================================
    app.get('/itec', isLoggedIn, function(req, res) {
        res.render('itec.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
            app.post('/itec', isLoggedIn, function(req, res) {
        var itecapp = new Itec(req.body);
        itecapp.email= req.user.email;
        itecapp.applicationstatus= 'submitted';
        itecapp.save(function (err) {
  if (err) return console.error(err);
    });
        res.redirect('/dashboard');
        });

    // =====================================
    // STUDENTVIEW =================================
    // =====================================

    app.get('/studentview', isLoggedIn, function(req, res) {
        res.render('studentview.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    // =====================================
    // TEACHERVIEW=================================
    // =====================================
    app.get('/teachertview', isLoggedIn, function(req, res) {
        res.render('teacherview.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });



    // =====================================
    // BIO =================================
    // =====================================
    app.get('/bio', isLoggedIn, function(req, res) {
        res.render('bio.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
        app.post('/bio', isLoggedIn, function(req, res) {
        var bioapp = new Bio(req.body);
        bioapp.email= req.user.email;
        bioapp.applicationstatus= 'submitted';
        bioapp.save(function (err) {
  if (err) return console.error(err);
    });
        res.redirect('/dashboard');
        });

    // =====================================
    // ADMIN =================================
    // =====================================

    app.get('/admin', isLoggedIn, function(req, res) {
        res.render('admin.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // ADMINDASHBOARD=================================
    // =====================================

    app.get('/admindashboard', isLoggedIn, function(req, res) {
        res.render('admindashboard.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


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
    // =====================================
    // SITE ================================
    // =====================================
    app.get('/sites', isLoggedIn, function(req, res) {
        if(true){
          Site.find(function (err, sites) {
  if (err) return console.error(err);
   res.render('site.ejs', {
            siteList : sites,
            user : req.user
        }); 
});
        }
        else{
           res.redirect('/dashboard'); 
        }
    });
    
        app.get('/addsite', isLoggedIn, function(req, res) {
        if(true){
          res.render('addsite.ejs', {
            user : req.user // get the user out of session and pass to template
        });   
        }
        else{
           res.redirect('/dashboard'); 
        }
    });
    
     app.post('/addsite', isLoggedIn, function(req, res,next){
         var site = new Site({ name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode });
site.save(function (err, fluffy) {
  if (err) return console.error(err);
   res.redirect('/sites'); 
});
});

    // =====================================
    // APPLICATIONS ========================
    // =====================================
    app.get('/applications', isLoggedIn, function(req, res) {
        if(req.user.discipline=='bio'){
          Bio.find({email:req.user.email},function (err, applications) {
  if (err) return console.error(err);
   res.render('applications.ejs', {
            applicationList : applications,
            user : req.user
        }); 
});
        }
        else{
                    Itec.find({email:req.user.email},function (err, applications) {
  if (err) return console.error(err);
   res.render('applications.ejs', {
            applicationList : applications,
            user : req.user
        }); 
});
        }
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
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
