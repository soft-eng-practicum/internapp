
module.exports.gototransfer = function(req, res) {
    var haveBioApp = false;
    var haveItecApp = false;



    if (req.user.role === 'admin' || req.user.role === 'instructor'  ) {
            User.getAdminValuesForHome(req.user._id, function(adminValues) {
                Bio.find(function(err, bioApplications) {
                    if (err) return console.error(err);
                    Itec.find(function(err, itecApplications) {
                        if (err) return console.error(err);
                        res.render('transferSemester.ejs', {
                            applicationList: bioApplications.concat(itecApplications),
                            admin: adminValues,
                            successMessage: req.flash('success'),
                            failureMessage: req.flash('failure'),
                            user: req.user
                        });
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
                  res.render('transferSemester.ejs', {
                      applicationList: bioApplications.concat(itecApplications),
                      user: req.user,
                      haveBioApp: haveBioApp,
                      haveItecApp: haveItecApp,
                      successMessage: req.flash('success'),
                      failureMessage: req.flash('failure')
                  });
              });
          });
        }
};
