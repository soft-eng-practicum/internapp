// app/models/bio.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var bioSchema = mongoose.Schema({

    local            : {
      name of parent or legal guardian      : {type: String, required: true,},
      mailing address   : {type: String, required: true},
      preferred email address         : {type: String, required: true},
      contacts city       : {type: String, required: true},
      contacts zip code   : {type: String, required: true},
      contacts telephone number  : { type: String, required: true},
      ggc mentor name        : {type: String, required: true}
      ggc cellphone number     : {type: String, required: true,},
      ggc email address {type: String, required: true},
      ggc office location         : {type: String, required: true},
      number of hours completed within biology     : {type: String, required: true},
      major and concentration   : {type: String, required: true},
      overall gpa   : { type: String, required: true},
      program gpa     : {type: String, required: true}
      what is your intended profession/career  : {type: String, required: true},
      are you applying to an internship site previously approved by internship committee  : {type: String, required: false},
      if yes, please mark which one and then complete the additional form for the specific location  : {type: String, required: true},
      name of site   : {type: String, required: true},
      specialty (pharmacy, medical practice, etc)    : {type: String, required: true},
      sites street address  : { type: String, required:true},
      sites city  : {type: String, required: true}
      name of site manager   : {type: String, required: true},
      site email address   : {type: String, required: true},
      title of site manager : {type: String, required: true},
      name of proposed preceptor     : {type: String, required: true},
      preceptor phone number  : {type: String, required: true},
      preceptor email address  : { type: String, required: true},
      proposed organizations telephone number          : {type: String, required: true}
      is this person the manager    : {type: String, required: true},
      if no, what position does the proposed preceptor hold at the site  : {type: String, required: true},
      what is your current postition   : { type: String, required:true},
      what is your current average work hours in a week        : {type: String, required: true}
      are you willing to complete your internship hours at a seperate time from your normal work hours : {type: String, required: true},
      first   : {type: String, required: true},
      second : { type: String, required:true},
      third    : {type: String, required: true},
      describe how the internship experience at the proposed location will help you to achieve your career goals : {type: String, required: true},
      signature of applicant : { type: String, required:true},
      print name of applicant   : {type: String, required: true}
    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Bio', bioSchema);
