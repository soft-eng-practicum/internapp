// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var path     = require('path');
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var favicon = require('serve-favicon');
var configDB = require('./config/database.js');
var routes = require('./app/routes/index');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var fs  = require('fs');

//New GridFS Stuff
var User = require('./app/models/user');
var Document = require('./app/models/document');
var Itec = require('./app/models/itec');
var ctrlDocumentUploads = require('./app/controllers/documentUpload.js');
var router = express.Router();
var multiparty = require('connect-multiparty')();

// configuration ===============================================================
const mongoURI = 'mongodb://meraki:$oftdev2ELKJJ@ds259732.mlab.com:59732/ggcinternapp';

const connection = mongoose.connect(configDB.url);
const conn = mongoose.createConnection(configDB.url);
require('./config/passport'); 

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.json());

var mongoDriver = mongoose.mongo;

mongoose.connection.on('connected', () => {
    console.log('Connected to database!');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});



app.use(express.static(path.join(__dirname, 'public')))


// Set favicon to the SST crest
app.use(favicon(__dirname + '/public/images/logo.png'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'dfgd5155435445df1gdfgdry5y4345' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/routes/index.js')(app, passport);


// GRID FS STUFF
let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('File Uploads');
});

const  storage = new GridFsStorage({
    url: mongoURI,
    file: function(req, file){
        return{
             filename: 'file' + Date.now(),
             metadata: req.body
        };
    }
});


const upload = multer ({ storage });


    //We want this function to create a new Document object that is populated with
    //the current session user's information.  For some reason we are unable to access
    //the User's information.  For testing purposes, all of the fields are populated with
    //hardcoded data.  The function currently sucessfully uploads a user file to MongoDB and adds
    //a document object to MongoDB.  

app.post('/uploadTest', upload.single('file'), (req, res) => {

    var document = new Document({
        'user' : {
            'user_id' : req.user.studentid,
            'fname': req.user.fname,
            'lname': req.user.lname,
            'user_email': req.user.email,
        },
        'fileType' : 'FERPA',
        'fileSection' : 'ITEC',
        'documentName' : req.user.fname + req.user.lname + 'FERPA',
        'documentStatus' : 'submitted',
        'recordFileType' : 'RESUME',
        'gridRefID' : 'TestNo.1'
    });

    document.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log('document added!');
        }
    });
    
    console.log('file has been added');
    res.redirect('/home');
})


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

