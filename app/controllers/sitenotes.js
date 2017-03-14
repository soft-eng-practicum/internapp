var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');



module.exports.getSiteNotesPage = function(req, res) {
     //site is from site.js(model) it is what u use to write in database format)
     //module.exports = mongoose.model('Site', siteSchema);
     //then the name Site is name to pul from database with that table
     //then u name again something that makes since to u like in this case "sites"
     //then make it equal to siteList=sites , it is random dose not ater the name 
    Site.find(function (err, sites) {
            if (err) return console.error(err);
            res.render('sitenotes.ejs', {
                siteList : sites,
                user : req.user
            });
        });


};

/*
    HTTP Req: POST
    URL: '/name/:siteName'
*/
module.exports.addSiteNote = function(req, res) {
Site.update({ name: req.body.siteName },{$push: {"notes": 
    {
    siteName: req.body.siteName,
    noteText: req.body.noteText,
    author  : req.session.passport.user.email
   }}
    },
function (err) {
    if (err) {
        req.flash('info',err);
        res.redirect('/sitenotes/');
    }
    else {
        res.redirect('/sitenotes/');
    }
    });
};

