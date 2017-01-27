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

        app.get('/site/:siteid', isLoggedIn, function(req, res) {
          Site.findOne({ _id: req.params.siteid },function (err, sitedetail) {
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

            app.get('/site/edit/:siteid', isLoggedIn, function(req, res) {
          Site.findOne({ _id: req.params.siteid },function (err, sitedetail) {
  if (err) {
  }
  else{
         res.render('editsite.ejs', {
            site : sitedetail,
            user : req.user,
            message : req.flash('info')
        });
  }

});
    });

            app.post('/site/:siteid', isLoggedIn, function(req, res) {
          Site.update({ _id: req.params.siteid },{$push: {"contacts": {name: req.body.name, title: req.body.title, email: req.body.email, office: req.body.office, cell: req.body.cell}}},function (err) {
  if (err){
         req.flash('info',err);
   res.redirect('/site/'+req.params.siteid);
  }
  else{
   res.redirect('/site/'+req.params.siteid);
  }

    });
     });
     
     
                               app.get('/site/contacts/:siteid/:documentid', isLoggedIn, function(req, res) {
          Site.update({ _id: req.params.siteid },{$pull: {"contacts": {_id: req.params.documentid}}},function (err) {
  if (err){
         req.flash('info',err);
   res.redirect('/site/'+req.params.siteid);
  }
  else{
   res.redirect('/site/'+req.params.siteid);
  }

    });
     });

                 app.post('/site/edit/:siteid', isLoggedIn, function(req, res) {
          Site.update({ _id: req.params.siteid },{name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode,
         mou: req.body.mou, mouexpiration: req.body.mouexpiration},function (err) {
  if (err){
         req.flash('info',err);
   res.redirect('/site/edit/'+req.params.siteid);
  }
  else{
   res.redirect('/site/'+req.params.siteid);
  }

    });
     });

                      app.post('/site/delete/:siteid', isLoggedIn, function(req, res) {
          Site.remove({ _id: req.params.siteid },function (err) {
  if (err){
         req.flash('info',err);
   res.redirect('/site/edit/'+req.params.siteid);
  }
  else{
      res.redirect('/sites');
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
         var site = new Site({ name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode,
         mou: req.body.mou, mouexpiration: req.body.mouexpiration });
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
