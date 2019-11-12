/*
    Unfortunately, since documentUpload existed before documentDelete and documentDownload, we
    could not place the delete and download functions under one general controller for documents
    without either refactoring or being confusing. We went for less confusing.
 */

var Document = require('../models/document');

module.exports.removeSpecificDocument = function (req, res) {
    Document.findOneAndRemove({
        _id: req.params
    }, function () {
        console.log(req.params);
        console.log(req.file);
        console.log(req.fileId);
    });
    res.redirect("/home");
};
