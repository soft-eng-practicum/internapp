// app/models/bio.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var bioSchema = mongoose.Schema({

    emergencycontactname: {
        type: String,
        required: true
    },
    emergencycontactaddress: {
        type: String,
        required: true
    },
    emergencycontactemail: {
        type: String,
        required: true
    },
    emergencycontactcity: {
        type: String,
        required: true
    },
    emergencycontactzipcode: {
        type: String,
        required: true
    },
    emergencycontactphone: {
        type: String,
        required: true
    },
    mentorname: {
        type: String,
        required: true
    },
    mentorcellphone: {
        type: String,
        required: true
    },
    mentoremail: {
        type: String,
        required: true
    },
    mentoroffice: {
        type: String,
        required: true
    },
    hourscompleted: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    gpa: {
        type: String,
        required: true
    },
    programgpa: {
        type: String,
        required: true
    },
    career: {
        type: String,
        required: true
    },
    proposedinternsemester: {
        type: String,
        required: true
    },
    proposedinternyear: {
        type: String,
        required: true
    },
    internsite: {
        type: String,
        required: true
    },
    proposedsitename: {
        type: String,
        required: true
    },
    proposedsitespecialty: {
        type: String,
        required: true
    },
    proposedsiteaddress: {
        type: String,
        required: false
    },
    proposedsitecity: {
        type: String,
        required: false
    },
    proposedsitestate: {
        type: String,
        required: false
    },
    proposedsitezipcode: {
        type: String,
        required: false
    },
    proposedsitemanagername: {
        type: String,
        required: false
    },
    proposedsitemanageremail: {
        type: String,
        required: true
    },
    proposedsitemanagertitle: {
        type: String,
        required: true
    },
    preceptorname: {
        type: String,
        required: true
    },
    preceptorphone: {
        type: String,
        required: true
    },
    preceptoremail: {
        type: String,
        required: true
    },
    ispreceptormanager: {
        type: String,
        required: true
    },
    preceptorpostition: {
        type: String,
        required: true
    },
    isstudentemployedatsite: {
        type: String,
        required: true
    },
    doestudenthavefamilyatsite: {
        type: String,
        required: true
    },
    studentcurrentposition: {
        type: String,
        required: true
    },
    ispaidinternship: {
        type: String,
        required: true
    },
    studenthoursworked: {
        type: String,
        required: true
    },
    isokseperatehours: {
        type: String,
        required: true
    },
    educomp1: {
        type: String,
        required: true
    },
    educomp2: {
        type: String,
        required: true
    },
    educomp3: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    printedname: {
        type: String,
        required: true
    },
    applicationstatus: {type: String, required: true},
    useremail: {
            type: String,
            required: true
        },
        userstudentid: {
            type: String
        },
        userfname: {
            type: String,
            required: true
        },
        userlname: {
            type: String,
            required: true
        },
        useraddress: {
            type: String,
            required: true
        },
        usercity: {
            type: String,
            required: true
        },
        userstate: {
            type: String,
            required: true
        },
        userzipcode: {
            type: String,
            required: true
        },
        userdiscipline: {
            type: String,
            required: true
        },
        documents     : [{ item: {type: String, required: true}, status: {type: String, required: true}}],
        notes     : [{ user: {type: String, required: true}, note: {type: String, required: true}, date: { type: Date, default: Date.now }}]

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Bio', bioSchema);
