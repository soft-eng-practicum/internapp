/*
    Controller functions containing the logic for the dashboard routes
    Authors : Joseph Cox, Robert Bryan
*/

/*
    HTTP Req: GET
    URL: '/dashboard'
*/
module.exports.loadDashboard = function(req, res) {
    // If the user's role is admin, redirect them to /dashboard
  
    res.render('dashboard.ejs', {
      //  message : req.flash('info'),
        user : req.session.passport.user // get the user out of session and pass to template
    }); 
}; 