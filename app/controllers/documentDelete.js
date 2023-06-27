// set up ======================================================================
// get all the tools we need

var mongoose = require('mongoose');
var mongodb = require('mongodb');
let Document = require('../models/document');
const conn = mongoose.connection;

let gfs;
conn.once('open', function () {
    gfs = new mongodb.GridFSBucket(conn.db);

    gfs.on('error', (err) => {
      console.log('GridFS database error: ' + err);
    });

});


module.exports.removeSpecificDocument = function (req, res) {

    gfs.find({ 'filename': req.params.fileId}).next()
        .then(function(doc) {
            console.log("File to delete found.");

            gfs.delete(doc._id).then(function() { 
                console.log("File deleted.");

                // only delete record after it's removed from gridfs
                Document.findOneAndRemove({
                    _id: req.params.documentId
                }, function () {
                    console.log("Document deleted");

                    res.redirect("/home");
                });

            }).catch(function(err) {
                console.log("Error deleting file from GridFS with docid: " + req.params.documentId +
                            " and fileid: " + req.params.fileId);
                console.log(err);
                return res.status(404).json({
                    msg: 'Could not delete file id: ' + req.params.fileId +
                        ' and doc id: ' + req.params.documentId,
                    err: err
                });
            });

        }).catch(function(err) {
            console.log("Can't find file to delete from GridFS with docid: " +
                        req.params.documentId +
                        " and fileid: " + req.params.fileId);
            console.log(err);
            return res.status(404).json({
                msg: 'Could not delete file id: ' + req.params.fileId +
                    ' and doc id: ' + req.params.documentId,
                err: err
            });
        });
};
