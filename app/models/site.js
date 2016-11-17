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
        mou          : {type: String, required: false},
        mouexpiration          : {type: String, required: false}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Site', siteSchema);
