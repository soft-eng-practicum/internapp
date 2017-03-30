// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var siteSchema = mongoose.Schema({

        name        : {type: String, required: true, unique: true},
        address      : {type: String, required: true},
        city         : {type: String, required: true},
        state        : {type: String, required: true},
        zipcode      : {type: String, required: true},
        contacts     : [{ name: {type: String, required: true}, title: {type: String}, email: {type: String}, office: {type: String},cell: {type: String}}],
        section      : {type: String, required: true},
        mou          : {type: String, required: false},
        mouexpiration          : {type: String, required: false},
                dateAdded:{
                type: Date, 
                default: Date.now
        },
        notes: [{
                 author: {type: String, required: true}, 
                 noteText: {type: String, required: true},
                 noteDate: {type: String, default: formatDate(new Date())},
		 visitDate: {type: String, required: true},
		 typesOfInterns: {type: String},
		 visitLocation: {type: String}
                }]
});

// Function to "prettify" the date added to the site note table 
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
module.exports = mongoose.model('Site', siteSchema);

