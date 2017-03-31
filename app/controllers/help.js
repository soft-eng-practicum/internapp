module.exports.getHelp = function(req, res) {
    if (req.isAuthenticated()) {
        res.render('help.ejs', {
            user: req.user
        });
    } else {
         res.render('help.ejs');
    }
};