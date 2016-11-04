// app/routes.js
var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

module.exports = function(app, passport) {

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
    
        app.get('/site/:name', isLoggedIn, function(req, res) {
          Site.findOne({ name: req.params.name },function (err, sitedetail) {
  if (err) {
  }
  else{
         res.render('sitedetail.ejs', {
            site : sitedetail,
            user : req.user,
            message : req.flash('info')
        }); 
  }

});
    });
    
            app.post('/site/:name', isLoggedIn, function(req, res) {
          Site.update({ name: req.params.name },{$push: {"contacts": {name: req.body.name, phone: req.body.phone}}},function (err) {
  if (err){
         req.flash('info','success!');
   res.redirect('/site/'+req.params.name);
  }
  else{
         req.flash('info','success!');
   res.redirect('/site/'+req.params.name);
  }

    });
     });
        app.get('/addsite', isLoggedIn, function(req, res) {
        if(true){
          res.render('addsite.ejs', {
            user : req.user,
            messages: req.flash('info')
        });   
        }
        else{
           res.redirect('/dashboard'); 
        }
    });
    
     app.post('/addsite', isLoggedIn, function(req, res,next){
         var site = new Site({ name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode });
site.save(function (err) {
  if (err) 
  {
      req.flash('info', err)
      res.render('addsite.ejs', {
                      user : req.user,
                      messages: req.flash('info')
          });
  }
  else{
   res.redirect('/sites');
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