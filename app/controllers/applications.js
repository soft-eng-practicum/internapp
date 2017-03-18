/*
    Controller functions containing the logic for the application routes
    Authors : Joseph Cox, Robert Bryan
*/

var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');
var nodemailer = require('nodemailer');
var key = process.env.KEY;

/*
    HTTP Req: GET
    URL: '/itec'
*/
module.exports.getItecApplication = function(req, res) {
    res.render('itec.ejs', {
        user: req.user
    });
};

/*
    HTTP Req: GET
    URL: '/bio'
*/
module.exports.getBioApplication = function(req, res) {
    res.render('bio.ejs', {
        user: req.user // get the user out of session and pass to template
    });
};

/*
    HTTP Req: GET
    URL: '/applications'
*/
module.exports.getApplications = function(req, res) {
    if (req.user.role === 'admin' || req.user.role === 'faculty'  ) {
                Bio.find(function(err, bioApplications) {
                    if (err) return console.error(err);
                    Itec.find(function(err, itecApplications) {
                        if (err) return console.error(err);
                        res.render('applications.ejs', {
                            applicationList: bioApplications.concat(itecApplications),
                            user: req.user
                        });
                    });
                });
        }
        else {
          Bio.find({
            useremail: req.user.email
          }, function(err, bioApplications) {
              if (err) return console.error(err);
              Itec.find({
                useremail: req.user.email
              }, function(err, itecApplications) {
                  if (err) return console.error(err);
                  res.render('applications.ejs', {
                      applicationList: bioApplications.concat(itecApplications),
                      user: req.user
                  });
              });
          });
        }
};

/*
    HTTP Req: GET
    URL: '/application/bio/:id'
*/
module.exports.getSpecificBioApplication = function(req, res) {
        Bio.findOne({ _id: req.params.applicationid }, function (err, appdetail) {
            if (err) {
                 console.log(err);
            }
            else {
                res.render('applicationdetails.ejs', {
                application : appdetail,
                user : req.user,
                message : req.flash('info')
                });
            }
        });
};


/*
    HTTP Req: GET
    URL: '/application/itec/:id'
*/
module.exports.getSpecificItecApplication = function(req, res) {
    Itec.findOne({ _id: req.params.applicationid }, function (err, appdetail) {
            if (err) {
                console.log(err);
            }
            else {
                res.render('applicationdetails.ejs', {
                application : appdetail,
                user : req.user,
                message : req.flash('info')
                });
            }
        });
}

/*
    HTTP Req: POST
    URL: '/application/:type(bio or itec)/:applicationid'
*/
module.exports.updateApplicationStatus = function(req, res) {
    var typeOfEmail = 'applicationStatusUpdate';
    var studentEmail;
    console.log(req.params);
    if (req.params.type == 'itec') {
        Itec
        .findById(req.params.applicationid)
        .exec(
                function(err, appEntry) {
                     studentEmail = appEntry.useremail;
                }
            );
        Itec.update({ _id: req.params.applicationid },{applicationstatus:req.body.applicationstatus},function (err) {
            if (err){
                req.flash('info',err);
                res.redirect('/application/itec/'+req.params.applicationid);
            }
            else{
                redirect = '/application/itec/'+req.params.applicationid;
                //res.redirect(redirect);
                sendEmail(req, res, typeOfEmail, studentEmail, redirect);
            }
        });
    } else {
        Bio
        .findById(req.params.applicationid)
        .exec(
                function(err, appEntry) {
                    studentEmail = appEntry.useremail;
                }
            );
        Bio.update({ _id: req.params.applicationid },{applicationstatus:req.body.applicationstatus},function (err) {
            if (err){
                req.flash('info',err);
                res.redirect('/application/bio/'+req.params.applicationid);
            }
            else{
                redirect = '/application/bio/'+req.params.applicationid;
                // res.redirect(redirect);
                sendEmail(req, res, typeOfEmail, studentEmail, redirect);
            }
        });
    }
};

/*

    A note has been added for this app

    HTTP Req: POST
    URL: '/application/itec/notes/:applicationid'
*/
module.exports.addItecNotes = function(req, res) {
 Itec.update({ _id: req.params.applicationid },{$push: {"notes": {note: req.body.note, user: req.user.email}}},function (err) {
        if (err) {
            req.flash('info',err);
            res.redirect('/application/itec/'+req.params.applicationid);
        }
        else {
            res.redirect('/application/itec/'+req.params.applicationid);
        }
    });
};

/*
    HTTP Req: POST
    URL: '/application/bio/notes/:applicationid'
*/
module.exports.addBioNotes = function(req, res) {
    Bio.update({ _id: req.params.applicationid },{$push: {"notes": {note: req.body.note, user: req.user.email}}},function (err) {
        if (err) {
            req.flash('info',err);
            res.redirect('/application/bio/'+req.params.applicationid);
        }
        else {
            res.redirect('/application/bio/'+req.params.applicationid);
        }
    });
};

/*
    HTTP Req: POST
    URL: '/applications/itec/documents/:applicationid/documentid/:answer'
*/
module.exports.updateApplicationDocument = function(req, res) {
    Itec.update({ 'documents._id': req.params.documentid },{$set: {'documents.$.status': req.params.answer}},function (err) {
        if (err){
        req.flash('info',err);
        res.redirect('/application/itec/'+req.params.applicationid);
        }
        else{ res.redirect('/application/itec/'+req.params.applicationid);
        }
    });
};

/*
    HTTP Req: POST
    URL: '/itec'
*/
module.exports.postItecApplication = function(req, res) {
    var itecapp = new Itec(req.body);
    itecapp.useremail = req.user.email;
    itecapp.userstudentid = req.user.studentid;
    itecapp.userfname = req.user.fname;
    itecapp.userlname = req.user.lname;
    itecapp.useraddress = req.user.address;
    itecapp.usercity = req.user.city;
    itecapp.userstate = req.user.state;
    itecapp.userzipcode = req.user.zipcode;
    itecapp.userdiscipline = 'Itec';
    itecapp.applicationstatus = 'submitted';
    itecapp.documents = [{ item: 'ferpa', status: 'no'},{ item: 'resume', status: 'no'}];
    itecapp.save(function(err) {
        if (err){
            console.log(err);
        }
    });
    res.redirect('/applications');
};

/*
    HTTP Req: POST
    URL: '/bio'
*/
module.exports.postBioApplication = function(req, res) {
    console.log(req.body);
    var bioapp = new Bio(req.body);
    bioapp.useremail = req.user.email;
    bioapp.userstudentid = req.user.studentid;
    bioapp.userfname = req.user.fname;
    bioapp.userlname = req.user.lname;
    bioapp.useraddress = req.user.address;
    bioapp.usercity = req.user.city;
    bioapp.userstate = req.user.state;
    bioapp.userzipcode = req.user.zipcode;
    bioapp.userdiscipline = 'Bio';
    bioapp.applicationstatus = 'submitted';
    bioapp.save(function(err) {
        if (err) {
            console.log(err);
         }
    });
    res.redirect('/applications');
};

/*
    HTTP Req: POST
    URL: '/application/bio/documents/:applicationid'
*/
module.exports.addDocument = function(req, res) {
    Bio.update({ _id: req.params.applicationid },{$push: {"documents": {item: req.body.item, status: req.body.status}}},function (err) {
        if (err) {
            req.flash('info',err);
            res.redirect('/application/bio/'+req.params.applicationid);
        }
        else {
            res.redirect('/application/bio/'+req.params.applicationid);
        }
    });
};

function sendEmail(req, res, typeOfEmail, studentEmail, redirect) {

    var emailSubject;
    var emailText;
    var transporter;
    switch (typeOfEmail) {
        case 'applicationStatusUpdate':
            emailSubject = '[GGC Internship Application] Application Status Changed';
            emailText = 'Your GGC internship application status has changed to: ' + req.body.applicationstatus;
            break;
        default:
            console.log('email type not recognized')
            res.redirect('/');
            break;
    }

    transporter = nodemailer.createTransport('smtps://ggcinternapp%40gmail.com:' + key + '@smtp.gmail.com');
    mailOptions = {
        from: '"GGC Internapp Admin" <admin@ggcinternapp>',
        to: studentEmail,
        subject: emailSubject,
        text: emailText
    }
    transporter.sendMail(mailOptions, function(err) {
        if (err) {
            console.log(err);
        }
        console.log(typeOfEmail, ' completed!');
        res.redirect(redirect);
    });
}
