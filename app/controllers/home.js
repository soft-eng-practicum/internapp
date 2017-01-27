var renderHomepage = function(req, res, responseBody)  {
    res.render('index.ejs', {
        user: req.session.passport.user
    }); // load the index.ejs file
};

module.exports.loadHome = function(req, res) {
    renderHomepage(req, res);
}; 