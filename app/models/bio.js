// app/models/bio.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var bioSchema = mongoose.Schema({

      biocontact    : {type: String, required: true},
      biocontactaddress : {type: String, required: true},
      biocontactemail        : {type: String, required: true},
      biocontactcity      : {type: String, required: true},
      biocontactzip  : {type: String, required: true},
      biocontactphone  : { type: String, required: true},
      biomentorname        : {type: String, required: true}
      bioggccellphone     : {type: String, required: true,},
      biomentoremail :{type: String, required: true},
      biomentoroffice        : {type: String, required: true},
      biohours    : {type: String, required: true},
      biomajor   : {type: String, required: true},
      biomgpa   : { type: String, required: true},
      bioprogramgpa     : {type: String, required: true},
      biocareer  : {type: String, required: true},
      proposedintersemester : {type: String, required: true},
      bioproposedsem1   : {type: String, required: true},
      bioproposedsem2  : {type: String, required: true},
      bioyes :{type: String, required: true},
      biono :{type: String, required: true},
      biogyf : {type: String, required: false},
      biogshcg   : {type: String, required: false},
      biocmd  : {type: String, required: false},
      bioyrprc :{type: String, required: false},
      biousda :{type: String, required: false},
      biosite  : {type: String, required: true},
      biofocus    : {type: String, required: true},
      biositeaddress : { type: String, required:true},
      sitebiocity  : {type: String, required: true}
      biositemanager   : {type: String, required: true},
      biositeemail  : {type: String, required: true},
      biositemanagertitle : {type: String, required: true},
      namepreceptor    : {type: String, required: true},
      preceptorphone  : {type: String, required: true},
      preceptoremail : { type: String, required: true},
      biointernmanager : {type: String, required: true},
      preceptorpostition  : {type: String, required: true},
      bioorgposition  : { type: String, required:true},
      paidinternship        : {type: String, required: true},
      bioorgposition : {type: String, required: true},
      bioorghours   : {type: String, required: true},
      internquestionanswer: { type: String, required:true},
      educomp1    : {type: String, required: true},
      educomp2    : {type: String, required: true},
      educomp3    : {type: String, required: true},
      internessay   : {type: String, required: true},
      biosignature : {type: String, required: true},
      biosignatureprint { type: String, required:true},
      biosignature  : {type: String, required: true},
    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Bio', bioSchema);
