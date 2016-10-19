// app/models/bio.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var bioSchema = mongoose.Schema({

    local            : {
        email        : {type: String, required: true, unique: true},
        password     : {type: String, required: true},
        studentid    : {type: String},
        fname        : {type: String, required: true},
        lname        : {type: String, required: true},
        address      : {type: String, required: true},
        city         : {type: String, required: true},
        state        : {type: String, required: true},
        zipcode      : {type: String, required: true},
        role         : {type: String, required: true},
        discipline   : {type: String, required: true}
    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Bio', bioSchema);
