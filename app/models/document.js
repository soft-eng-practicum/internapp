var mongoose = require('mongoose');


var documentSchema = mongoose.Schema({
    user: {
        user_id : {
            type: String,
            required: true
        },
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        user_email : {
            type: String,
            required: true
        }
    },
    prettyUploadDate: {
        type: String, 
        default: formatDate(new Date())
    },
    uploadDate: {
        type: Date, 
        default: Date.now
    },
    fileId: {
        type: String,
        required: true
    },
    fileType: {
        type: String, 
        required: true
    },
    fileSection: {
        type: String, 
        required: true
    },
    documentName: {
        type: String, 
        required: true
    },
    documentStatus: {
        type: String, 
        required: true
    },
    notes: [
                { 
                    user: {type: String, required: true}, 
                    note: {type: String, required: true}, 
                    prettyNoteDate: {type: String, default: formatDate(new Date())},
                    date: { type: Date, default: Date.now }
                }
    ],
    feedback: [
                {
                        user: {type: String, required: true}, 
                        feedback: {type: String, required: true}, 
                        prettyFeedbackDate: {type: String, default: formatDate(new Date())},
                        date: { type: Date, default: Date.now }
                }
    ]
});

// Function to "prettify" the date added to the document 
function formatDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = month + '/' + day + '/' + year + " " + hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

// create the model for users and expose it to our app
var Document = module.exports = mongoose.model('Document', documentSchema);

module.exports.getDocumentsForUser = function(email, callback) {
    Document.find({
        "user.user_email" : email
    }, function(err, document) {
        if (err) throw err;
        if (document) {
            callback(document);
        } else {
            callback([]);
        }
    })
}

module.exports.getItecDocumentsForUser = function(email, callback) {
    Document.find({
        "user.user_email" : email,
        "fileSection"     : "ITEC"
    }, function(err, document) {
        if (err) throw err;
        if (document) {
            callback(document);
        } else {
            callback([]);
        }
    })
}

module.exports.getBioDocumentsForUser = function(email, callback) {
    Document.find({
        "user.user_email" : email,
        "fileSection"     : "BIO"
    }, function(err, document) {
        if (err) throw err;
        if (document) {
            callback(document);
        } else {
            callback([]);
        }
    })
}
