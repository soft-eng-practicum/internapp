module.exports.getDocumentationPage = function(req, res) {
    res.render('documentations.ejs', {
        user: req.user
    });
};