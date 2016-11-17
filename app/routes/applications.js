// app/routes.js
var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

module.exports = function(app, passport) {

    // =====================================
    // APPLICATIONS ========================
    // =====================================
    app.get('/applications', isLoggedIn, function(req, res) {
        if (req.user.role === 'admin' || req.user.role === 'faculty'  ) {
            if (req.user.discipline == 'bio') {
                Bio.find(function(err, applications) {
                    if (err) return console.error(err);
                    res.render('applications.ejs', {
                        applicationList: applications,
                        user: req.user
                    });
                });
            }
            else {
                Itec.find(function(err, applications) {
                    if (err) return console.error(err);
                    res.render('applications.ejs', {
                        applicationList: applications,
                        user: req.user
                    });
                });
            }
        }
        else {
            if (req.user.discipline == 'bio') {
                Bio.find({
                    useremail: req.user.email
                }, function(err, applications) {
                    if (err) return console.error(err);
                    res.render('applications.ejs', {
                        applicationList: applications,
                        user: req.user
                    });
                });
            }
            else {
                Itec.find({
                    useremail: req.user.email
                }, function(err, applications) {
                    if (err) return console.error(err);
                    res.render('applications.ejs', {
                        applicationList: applications,
                        user: req.user
                    });
                });
            }
        }
    });
    
            app.get('/application/bio/:applicationid', isLoggedIn, function(req, res) {
          Bio.findOne({ _id: req.params.applicationid },function (err, appdetail) {
  if (err) {
  }
  else{
         res.render('applicationdetails.ejs', {
            application : appdetail,
            user : req.user,
            message : req.flash('info')
        }); 
  }

});
    });
    
                app.post('/application/bio/:applicationid', isLoggedIn, function(req, res) {
          Bio.update({ _id: req.params.applicationid },{applicationstatus:req.body.applicationstatus},function (err) {
  if (err){
         req.flash('info',err);
   res.redirect('/application/bio/'+req.params.applicationid);
  }
  else{
   res.redirect('/application/bio/'+req.params.applicationid);
  }

    });
     });
     
                     app.post('/application/bio/documents/:applicationid', isLoggedIn, function(req, res) {
          Bio.update({ _id: req.params.applicationid },{$push: {"documents": {item: req.body.item, status: req.body.status}}},function (err) {
  if (err){
         req.flash('info',err);
   res.redirect('/application/bio/'+req.params.applicationid);
  }
  else{
   res.redirect('/application/bio/'+req.params.applicationid);
  }

    });
     });
     
                          app.get('/application/bio/documents/:applicationid/:documentid', isLoggedIn, function(req, res) {
          Bio.update({ _id: req.params.applicationid },{$pull: {"documents": {_id: req.params.documentid}}},function (err) {
  if (err){
         req.flash('info',err);
   res.redirect('/application/bio/'+req.params.applicationid);
  }
  else{
   res.redirect('/application/bio/'+req.params.applicationid);
  }

    });
     });
     
                               app.get('/application/itec/documents/:applicationid/:documentid/:answer', isLoggedIn, function(req, res) {
          Itec.update({ 'documents._id': req.params.documentid },{$set: {'documents.$.status': req.params.answer}},function (err) {
  if (err){
         req.flash('info',err);
   res.redirect('/application/itec/'+req.params.applicationid);
  }
  else{
   res.redirect('/application/itec/'+req.params.applicationid);
  }

    });
     });
    
                app.get('/application/itec/:applicationid', isLoggedIn, function(req, res) {
          Itec.findOne({ _id: req.params.applicationid },function (err, appdetail) {
  if (err) {
  }
  else{
         res.render('applicationdetails.ejs', {
            application : appdetail,
            user : req.user,
            message : req.flash('info')
        }); 
  }

});
    });
    

     
     

    // =====================================
    // ITEC ================================
    // =====================================
    app.get('/itec', isLoggedIn, function(req, res) {
        res.render('itec.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.post('/itec', isLoggedIn, function(req, res) {
        var itecapp = new Itec(req.body);
        itecapp.useremail = req.user.email;
        itecapp.userstudentid = req.user.studentid;
        itecapp.userfname = req.user.fname;
        itecapp.userlname = req.user.lname;
        itecapp.useraddress = req.user.address;
        itecapp.usercity = req.user.city;
        itecapp.userstate = req.user.state;
        itecapp.userzipcode = req.user.zipcode;
        itecapp.userdiscipline = req.user.discipline;
        itecapp.applicationstatus = 'submitted';
        itecapp.documents = [{ item: 'ferpa', status: 'no'},{ item: 'resume', status: 'no'}];
        itecapp.save(function(err) {
            if (err) return console.error(err);
        });
        res.redirect('/dashboard');
    });
    
                        app.post('/application/itec/:applicationid', isLoggedIn, function(req, res) {
          Itec.update({ _id: req.params.applicationid },{applicationstatus:req.body.applicationstatus},function (err) {
  if (err){
         req.flash('info',err);
   res.redirect('/application/itec/'+req.params.applicationid);
  }
  else{
   res.redirect('/application/itec/'+req.params.applicationid);
  }

    });
     });

    // =====================================
    // BIO =================================
    // =====================================
    app.get('/bio', isLoggedIn, function(req, res) {
        res.render('bio.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.post('/bio', isLoggedIn, function(req, res) {
        var bioapp = new Bio(req.body);
        bioapp.useremail = req.user.email;
        bioapp.userstudentid = req.user.studentid;
        bioapp.userfname = req.user.fname;
        bioapp.userlname = req.user.lname;
        bioapp.useraddress = req.user.address;
        bioapp.usercity = req.user.city;
        bioapp.userstate = req.user.state;
        bioapp.userzipcode = req.user.zipcode;
        bioapp.userdiscipline = req.user.discipline;
        bioapp.applicationstatus = 'submitted';
        bioapp.save(function(err) {
            if (err) return console.error(err);
        });
        res.redirect('/dashboard');
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
