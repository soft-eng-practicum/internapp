// app/models/itec.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var itecSchema = mongoose.Schema({

        proposedinternsemester: {
                type: String,
                required: true
        },
        proposedinternyear: {
                type: String,
                required: true
        },
        major: {
                type: String,
                required: true
        },
        classification: {
                type: String,
                required: true
        },
        gpa: {
                type: String,
                required: true
        },
        itecgpa: {
                type: String,
                required: true
        },
        itec2150: {
                type: String,
                required: true
        },
        itec3100: {
                type: String,
                required: true
        },
        itec3200: {
                type: String,
                required: true
        },
        itec3900: {
                type: String,
                required: true
        },
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
        interestsandstrengths: {
                type: String,
                required: true
        },
        typeofinternship: {
                type: String,
                required: false
        },
        focusonsoftdev: {
                type: String,
                required: true
        },
        haveproposedintern: {
                type: String,
                required: true
        },
        proposedorgname: {
                type: String,
                required: true
        },
        itecfocus: {
                type: String,
                required: true
        },
        proposedorgaddress: {
                type: String,
                required: true
        },
        proposedorgcity: {
                type: String,
                required: true
        },
        proposedorgstate: {
                type: String,
                required: true
        },
        proposedorgzipcode: {
                type: String,
                required: true
        },
        proposedorgphone: {
                type: String,
                required: true
        },
        proposedorgmanager: {
                type: String,
                required: true
        },
        isemployedatsite: {
                type: String,
                required: true
        },
        employedcurrentposition: {
                type: String,
                required: true
        },
        ispaidposition: {
                type: String,
                required: true
        },
        numberofhoursworked: {
                type: String,
                required: true
        },
        isseparateproject: {
                type: String,
                required: true
        },

        isseparatehours: {
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
module.exports = mongoose.model('Itec', itecSchema);
