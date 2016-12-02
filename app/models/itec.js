// app/models/itec.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var itecSchema = mongoose.Schema({

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
        submissionDate:{
                type: Date, 
                default: Date.now
        },
        documents     : [{ item: {type: String, required: true}, status: {type: String, required: true}}],
        notes     : [{ user: {type: String, required: true}, note: {type: String, required: true}, date: { type: Date, default: Date.now }}]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Itec', itecSchema);
