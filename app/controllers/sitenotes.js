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
                user : req.user,
                successMessage : req.flash('successfulSiteNotesMessage'),
                failureMessage: req.flash('failureSiteNotesMessage')
            });
        });


};

/*
    HTTP Req: POST
    URL: '/name/:siteId'
*/
module.exports.addSiteNote = function(req, res) {
    Site.update({ 
            "_id" : req.params.siteId 
        }, {
            $push: { 
                "notes": {
                    author: req.body.author,
                    noteText: req.body.coveredTopics,
                    author  : req.user.email,
                    visitDate : req.body.visitDate,
                    typesOfInterns : req.body.typesOfInterns,
                    visitLocation : req.body.visitLocation
                }
            }
        },
        function (err) {
            if (err) {
                console.error(err);
                req.flash('failure', 'Site note could not be added at this time.');
                res.redirect('/site/' + req.params.siteId);
            }
            else {
                req.flash('success', 'Site note successfully added!');
                res.redirect('/site/' + req.params.siteId);
            }
        });
};

module.exports.deleteSiteNote = function(req, res) {
var siteId = req.params.siteId;
            Site.update({ _id: req.params.siteId },{$pull: {"notes": {_id: req.params.noteId}}}, 
            function (err) {
                if (err) {
                    console.log(err);
                    req.flash('failure', 'An error has occured, the site note can not be deleted at this time.')
                    res.redirect('/site/'+siteId);
                } else {
                    req.flash('success', 'The site note has been successfully deleted!')  
                    res.redirect('/site/'+siteId);
                }
            });
}

