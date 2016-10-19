// app/models/itec.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our itec model
var itecSchema = mongoose.Schema({

        name        : {type: String, required: true, unique: true},
        address      : {type: String, required: true},
        city         : {type: String, required: true},
        state        : {type: String, required: true},
        zipcode      : {type: String, required: true},
        contacts     : [{ name: String, phone: String}],
        mou          : {type: String, required: false}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Itec', itecSchema);
