module.exports.getHelp = function(req, res) {
    if (req.isAuthenticated()) {
        res.render('help.ejs', {
            user: req.user
        });
    } else {
         res.render('help.ejs');
    }
}

module.exports.getAdminInstructorHelp = function(req, res) {
    if (req.isAuthenticated()) {
        res.render('admininstructorhelp.ejs', {
            user: req.user
        });
    } else {
         res.render('admininstructorhelp.ejs');
    }
}