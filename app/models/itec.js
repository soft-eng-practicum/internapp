// app/models/itec.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var itecSchema = mongoose.Schema({


local              :{
        proposed internship semester       : {type: String, required: true,},
        proposed internship semester year    : {type: String, required: true},
        expected internship semester         : {type: String, required: true},
        expected internship semester year        : {type: String, required: true},
        itec concentration    : {type: String, required: true},
        student classification     : { type: String, required: true},
        overall gpa          : {type: String, required: true}
        itec major gpa        : {type: String, required: true,},
        please list the semester you have completed these pre-requisite courses in the format of semester year: {type: String, required: true},
        ggc mentor name         : {type: String, required: true},
        ggc cellphone number      : {type: String, required: true},
        ggc email address     : {type: String, required: true},
        ggc office location    : { type: String, required: true},
        decribe your major interests and strengths          : {type: String, required: true}
        what type of internship are you looking for, such as software development, security, sap, databse, etc      : {type: String, required: true},
        are you interested in an internship focused mainly on programming and software development    : {type: String, required: true},
        name of contact        : {type: String, required: true},
        contact preferred email address        : {type: String, required: true},
        contacts city     : {type: String, required: true},
        contacts zip code     : { type: String, required:true},
        contacts telephone number        : {type: String, phone: String, required: true}
        do you have a proposed internship with a company or organization      : {type: String, required: false},
        name of organization   : {type: String, required: true},
        focus (software development, security, networking, etc  : {type: String, required: true},
        proposed organizations street address        : {type: String, required: true},
        proposed organizations city     : {type: String, required: true},
        proposed organization zip code    : { type: String, required: true},
        proposed organizations telephone number          : {type: String, phone: String,  required: true}
        name of internship manager       : {type: String, required: true},
        are you currently employed at this potential internship site     : {type: String, required: true},
        what is your current postition   : { type: String, required:true},
        is this a paid position          : {type: String, required: true}
        what is your current average work hours in a week       : {type: String, required: true},
        will this internship represent a substantial project to be completed, seperate from your normal work duties     : {type: String, required: true},
        are you willing to complete your internship hours at a seperate time from your normal work hours  : { type: String, required:true},
        signature of applicant         : {type: String, required: true}
        print name of applicant         : {type: String, required: true}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Itec', itecSchema);
