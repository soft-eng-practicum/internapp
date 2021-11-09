// app/models/itec.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var itecSchema = mongoose.Schema({

        lastupdated: {
                type: String,
                default: formatDate(new Date())
        },
        proposedinternsemester: {
                type: String,
                required: false
        },
        proposedinternyear: {
                type: String,
                required: false
        },
        major: {
                type: String,
                required: false
        },
        phonenumber: {
                type: String,
                required: true
        },
        classification: {
                type: String,
                required: false
        },
        gpa: {
                type: String,
                required: false
        },
        itecgpa: {
                type: String,
                required: false
        },
        itec2150: {
                type: String,
                required: false
        },
        itec3100: {
                type: String,
                required: false
        },
        itec3200: {
                type: String,
                required: false
        },
        itec3900: {
                type: String,
                required: false
        },
        itec2150Year: {
                type: String,
                required: false
        },
        itec3100Year: {
                type: String,
                required: false
        },
        itec3200Year: {
                type: String,
                required: false
        },
        itec3900Year: {
                type: String,
                required: false
        },

        mentorname: {
                type: String,
                required: false
        },
        interestsandstrengths: {
                type: String,
                required: false
        },
        typeofinternship: {
                type: String,
                required: false
        },
        focusonsoftdev: {
                type: String,
                required: false
        },
        haveproposedintern: {
                type: String,
                required: false
        },
        proposedorgname: {
                type: String,
                required: false
        },
        itecfocus: {
                type: String,
                required: false
        },
        proposedorgaddress: {
                type: String,
                required: false
        },
        proposedorgcity: {
                type: String,
                required: false
        },
        proposedorgstate: {
                type: String,
                required: false
        },
        proposedorgzipcode: {
                type: String,
                required: false
        },
        proposedorgphone: {
                type: String,
                required: false
        },
        proposedorgmanager: {
                type: String,
                required: false
        },
        proposedorgmanageremail: {
                type: String,
                required: false
        },
        isemployedatsite: {
                type: String,
                required: false
        },
        employedcurrentposition: {
                type: String,
                required: false
        },
        ispaidposition: {
                type: String,
                required: false
        },
        numberofhoursworked: {
                type: String,
                required: false
        },
        isseparateproject: {
                type: String,
                required: false
        },

        isseparatehours: {
                type: String,
                required: false
        },
        signature: {
                type: String,
                required: false
        },
        printedname: {
                type: String,
                required: false
        },
        applicationstatus: {type: String, required: false},
            useremail: {
            type: String,
            required: false
        },
        userstudentid: {
            type: String
        },
        userfname: {
            type: String,
            required: false
        },
        userlname: {
            type: String,
            required: false
        },
        userphone: {
        type: String,
        required: false
        },
        useraddress: {
            type: String,
            required: false
        },
        usercity: {
            type: String,
            required: false
        },
        userstate: {
            type: String,
            required: false
        },
        userzipcode: {
            type: String,
            required: false
        },
        userdiscipline: {
            type: String,
            required: false
        },
        expectedGraduationYear: {
          type: String,
          required: true
        },
        expectedGraduationSemester: {
          type: String,
          required: true
        },
        submissionDate:{
                type: Date,
                default: Date.now
        },
        feedback  : [
            { 
              user: {type: String, required: true}, 
              feedback: {type: String, required: true}, 
              date: { type: Date, default: Date.now },
              prettyFeedbackDate: { type: String, default: formatDate(new Date()) }
            }
        ],
        notes     : [
            { user: {type: String, required: true}, 
              note: {type: String, required: true}, 
              date: { type: Date, default: Date.now },
              prettyNotesDate: { type: String, default: formatDate(new Date()) }
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
var Itec = module.exports = mongoose.model('Itec', itecSchema);

module.exports.doesUserHaveItecApp = function(email, callback) {
    Itec.find({
        'useremail' : email
    }, function(err, itecApp) {
        if (!itecApp) {
            return callback(false);
        } else {
            return callback(true);
        }
    });
}

module.exports.getUsersItecAppPromise = function(email, callback) {
        return new Promise((resolve, reject) => {
                Itec.findOne({
                        'useremail' : email
                }, function(err, itecApp) {
                        if (!itecApp) {
                                return resolve({});
                        } else {
                                return resolve(itecApp);
                        }
                });
       });
    }

module.exports.getUsersItecApp = function(email, callback) {
        Itec.findOne({
            'useremail': email
        }, function(err, itecApp) {
            if (err) throw err;
            if (!itecApp) {
                return callback(false);
            } else {
                return callback(itecApp);
            }
        });
}
