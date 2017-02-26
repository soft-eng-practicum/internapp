module.exports.getDocumentationPage = function (req, res){
    res.render('documentation.ejs',{
    user: req.user
    });
};

/*
    HTTP Req: GET
    URL: '/editprofile'
*/
module.exports.getEditProfile = function(req, res) {
    User.findOne({
        'local.email' : req.user.email
    }, function(err, profile) {
        res.render('documentation.ejs', {
            profiledetails : profile,
            user : profile,
            message : req.flash('info')
        });
    });
};

/*
    HTTP Req: POST
    URL: '/editprofile'
*/
module.exports.updateProfile = function(req, res) {
    User.update({'local.email' : req.user.email}, {
        'local.fname' : req.body.fname,
        'local.date' : req.body.date,
        'local.section' : req.body.section,
        'local.documentName' : req.body.documentName,
        'local.type' : req.body.type,
        'local.status' : req.body.status,
        'local.discipline' : req.body.discipline
    }, function(err) {
        if (err) {
            res.flash('info', err);
            res.redirect('/documentation');
        } else {
            req.flash('info', 'success!');
            res.redirect('/documentation');
        }
    });
};