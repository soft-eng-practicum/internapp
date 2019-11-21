// set up ======================================================================
// get all the tools we need

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
let Document = require('../models/document');
const conn = mongoose.connection;

let gfs;
conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);
});


module.exports.removeSpecificDocument = function (req, res) {
    Document.findOneAndRemove({
        _id: req.params.documentId
    }, function () {
        console.log("Document deleted");
    });

    gfs.remove({filename: req.params.fileId}, function(err, gridStore) {
    }, function() {
        console.log("File deleted.");
    });

    console.log("File: " + gfs.exist({_id: req.params.fileId}, function (err, found) {
        if (err) console.log(err);
        found ? console.log('File found.') : console.log('File not found.');
    }));

    res.redirect("/home");
};
