// app/models/bio.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var bioSchema = mongoose.Schema({

    emergencycontactname: {
        type: String,
        required: false
    },
    emergencycontactaddress: {
        type: String,
        required: false
    },
    emergencycontactemail: {
        type: String,
        required: false
    },
    emergencycontactcity: {
        type: String,
        required: false
    },
    emergencycontactzipcode: {
        type: String,
        required: false
    },
    emergencycontactphone: {
        type: String,
        required: false
    },
    mentorname: {
        type: String,
        required: false
    },
    mentorcellphone: {
        type: String,
        required: false
    },
    mentoremail: {
        type: String,
        required: false
    },
    mentoroffice: {
        type: String,
        required: false
    },
    hourscompleted: {
        type: String,
        required: false
    },
    major: {
        type: String,
        required: false
    },
    gpa: {
        type: String,
        required: false
    },
    programgpa: {
        type: String,
        required: false
    },
    career: {
        type: String,
        required: false
    },
    proposedinternsemester: {
        type: String,
        required: false
    },
    proposedinternyear: {
        type: String,
        required: false
    },
    isPreviouslyApprovedSite: {
        type: String,
        required: false
    },
    internsite: {
        type: String,
        required: false
    },
    proposedsitename: {
        type: String,
        required: false
    },
    proposedsitespecialty: {
        type: String,
        required: false
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
        required: false
    },
    proposedsitemanagertitle: {
        type: String,
        required: false
    },
    preceptorname: {
        type: String,
        required: false
    },
    preceptorphone: {
        type: String,
        required: false
    },
    preceptoremail: {
        type: String,
        required: false
    },
    ispreceptormanager: {
        type: String,
        required: false
    },
    preceptorpostition: {
        type: String,
        required: false
    },
    isstudentemployedatsite: {
        type: String,
        required: false
    },
    doestudenthavefamilyatsite: {
        type: String,
        required: false
    },
    studentcurrentposition: {
        type: String,
        required: false
    },
    ispaidinternship: {
        type: String,
        required: false
    },
    studenthoursworked: {
        type: String,
        required: false
    },
    isokseperatehours: {
        type: String,
        required: false
    },
    educomp1: {
        type: String,
        required: false
    },
    educomp2: {
        type: String,
        required: false
    },
    educomp3: {
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
        expectedGraduationSemester: {
          type: String,
          required: true
        },
        expectedGraduationYear: {
          type: String,
          required: true
        },
        submissionDate:{
                type: Date,
                default: Date.now
        },
        documents     : [{ item: {type: String, required: true}, status: {type: String, required: true}}],
        notes     : [{ user: {type: String, required: true}, note: {type: String, required: true}, date: { type: Date, default: Date.now }}]

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Bio', bioSchema);
