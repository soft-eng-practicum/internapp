// app/routes.js


module.exports = function(app, passport) {

    // =====================================
    // FAQ Page ============================
    // =====================================
    app.get('/faq', function(req, res) {
        res.render('faq.ejs'); // load the help file
    });
};

