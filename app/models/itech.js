// app/models/itec.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var itecSchema = mongoose.Schema({

        proposed internship semester       : {type: String, required: true,},
        proposed internship semester year    : {type: String, required: true},
        expected internship semester         : {type: String, required: true},
        expected internship semester year        : {type: String, required: true},
        itec concentration    : {type: String, required: true},
        student classification     : { name: String, required: true},
        overall gpa          : {type: String, required: true}
        itec major gpa        : {type: String, required: true,},
        please list the semester you have completed these pre-requisite courses in the format of semester year: {type: String, required: true},
        ggc mentor name         : {type: String, required: true},
        ggc cellphone number      : {type: String, required: true},
        ggc email address     : {type: String, required: true},
        ggc office location    : { name: String, required: true},
        decribe your major interests and strengths          : {type: String, required: true}
        what type of internship are you looking for, such as software development, security, sap, databse, etc      : {type: String, required: true},
        are you interested in an internship focused mainly on programming and software development?    : {type: String, required: false},
        name of contact        : {type: String, required: true},
        contact preferred email address        : {type: String, required: true},
        contacts city     : {type: String, required: true},
        contacts zip code     : { name: String, required:true},
        contacts telephone number        : {type: String, required: true}
        do you have a proposed internship with a company or organization?      : {type: String, required: false},
        name of organization   : {type: String, required: false},
        focus (software development, security, networking, etc  : {type: String, required: false},
        proposed organizations street address        : {type: String, required: false},
        proposed organizations city     : {type: String, required: false},
        proposed organization zip code    : { name: String, required: false},
        proposed organizations telephone number          : {type: String, required: false}
        name of internship manager       : {type: String, required: false},
        are you currently employed at this potential internship site?     : {type: String, required: false},
        what is your current postition?   : { name: String, required:false},
        is this a paid position          : {type: String, required: false}
        what is your current average work hours in a week?       : {type: String, required: false},
        will this internship represent a substantial project to be completed, seperate from your normal work duties?     : {type: String, required: false},
        are you willing to complete your internship hours at a seperate time from your normal work hours?  : { name: String, required:false},
        signature of applicant         : {type: String, required: true}
        print name of applicant         : {type: String, required: true}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Itec', itecSchema);
