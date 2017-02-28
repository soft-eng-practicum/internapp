module.exports.getSiteNotesPage= function(req, res) {
    res.render('sitenotes.ejs', {
        user: req.user
    });
};