/*
    Controller functions containing the logic for the application routes
    Authors : Joseph Cox, Robert Bryan
*/

var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

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
};

/*
    HTTP Req: GET
    URL: '/application/:id'
*/
module.exports.getSpecificApplication = function(req, res) {
    if (req.user.discipline == 'itec') {
        Itec.findOne({ _id: req.params.applicationid },function (err, appdetail) {
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
    } else if (req.user.discipline == 'bio') {
        Bio.findOne({ _id: req.params.applicationid },function (err, appdetail) {
            if (err) {
            }
            else {
                res.render('applicationdetails.ejs', {
                application : appdetail,
                user : req.user,
                message : req.flash('info')
                }); 
            }
        });
    } else {
        console.log('discipline not found');
    }
};

/*
    HTTP Req: POST
    URL: '/application/itec/:applicationid'
*/
module.exports.updateApplicationStatus = function(req, res) {
    Itec.update({ _id: req.params.applicationid },{applicationstatus:req.body.applicationstatus},function (err) {
        if (err){
            req.flash('info',err);
            res.redirect('/application/itec/'+req.params.applicationid);
        }
        else{
            res.redirect('/application/itec/'+req.params.applicationid);
        }
    });
};

/*
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
    itecapp.userdiscipline = req.user.discipline;
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