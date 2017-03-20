// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        studentid: {
            type: String
        },
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        },
        creationDate:{
                type: Date,
                default: Date.now
        },
        documents: [
          {
            prettyUploadDate: {type: String, default: formatDate(new Date())},
            uploadDate: {type: Date, default: Date.now},
            fileType: {type: String, required: true},
            fileSection: {type: String, required: true},
            documentName: {type: String, required: true},
            documentStatus: {type: String, required: true},
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
          }
        ]
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

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
module.exports = mongoose.model('User', userSchema);
