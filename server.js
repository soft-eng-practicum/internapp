// server.js

// set up ======================================================================
// get all the tools we need
require('dotenv').config();
var express  = require('express');
var app      = express();
var path     = require('path');
var crypto = require('crypto');
var port     = process.env.PORT || 8000;
var mongodb = require('mongodb');
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
const {GridFsStorage} = require('multer-gridfs-storage');
var _ = require('lodash');
var methodOverride = require('method-override');

//New GridFS Stuff
var Document = require('./app/models/document');

// configuration ===============================================================
const mongoURI = process.env.DB_CONN;
const connection = mongoose.connect(mongoURI);
const conn =  mongoose.createConnection(mongoURI); // second connection for gridfs

require('./config/passport');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connection.on('connected', () => {
    console.log('Connected to database!');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// multer file upload settings
let limits = {
    files: 1,
    fileSize:  1024 * 1024,
    fieldSize: 1024 * 1024
};

let fileFilter = function(req, file, cb) {
    var allowedMimes = ['application/pdf' ,'application/msword',
        'image/jpeg', 'image/png',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template'
    ];
    if (_.includes(allowedMimes, file.mimetype)) {
        // allow supported pdf/doc files
        cb(null, true);
    } else {
        // throw error for invalid files
        cb(new Error('Only pdf/doc/docx filetypes are supported.'));
    }
};

// once gridfs database is connected
let gfs, storage, upload;
conn.once('open', function() {
    gfs = new mongodb.GridFSBucket(conn.db);

    gfs.on('error', (err) => {
        console.log('GridFS database error: ' + err);
    });
});

conn.on('dberror', (err) => {
    console.log('GridFS database error: ' + err);
});

storage = new GridFsStorage({
  db: conn,
  file: (req, file) => {}
});

upload = multer ({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter
});

app.use(express.static(path.join(__dirname, 'public')));

// Set favicon to the SST crest
app.use(favicon(__dirname + '/public/images/logo.png'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: process.env.SECRET_KEY, name: process.env.SESSION_NAME })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.post('/uploadItecResume', upload.single('itecResume'), (req, res) => {
    // res.json({ file: req.file.grid });
    console.log(req.file.grid);
    //Test document object to see if you can add a document from inside
    //this function.  It works.

    var document = new Document({
        'user' : {
            'user_id' : req.user.studentid,
            'fname': req.user.fname,
            'lname': req.user.lname,
            'user_email': req.user.email
        },
        'documentName' : req.file.originalname,
        'fileId' : req.file.filename,
        'fileType' : 'Resume',
        'fileSection' : 'ITEC',
        'documentStatus' : 'submitted',
    });

    document.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log('document added!!');
        }
    });
    res.redirect('/home');
});


app.post('/uploadItecFerpa', upload.single('itecFerpa'), (req, res) => {
    // res.json({ file: req.file.grid });
    console.log(req.file.grid);
    //Test document object to see if you can add a document from inside
    //this function.  It works.

    var document = new Document({
        'user' : {
            'user_id' : req.user.studentid,
            'fname': req.user.fname,
            'lname': req.user.lname,
            'user_email': req.user.email
        },
        'documentName' : req.file.originalname,
        'fileId' : req.file.filename,
        'fileType' : 'Ferpa',
        'fileSection' : 'ITEC',
        'documentStatus' : 'submitted',
    });

    document.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log('document added!!');
        }
    });
    res.redirect('/home');
});


app.post('/uploadItecOther', upload.single('itecOther'), (req, res) => {
    // res.json({ file: req.file.grid });
    console.log(req.file.grid);
    //Test document object to see if you can add a document from inside
    //this function.  It works.

    var document = new Document({
        'user' : {
            'user_id' : req.user.studentid,
            'fname': req.user.fname,
            'lname': req.user.lname,
            'user_email': req.user.email
        },
        'documentName' : req.file.originalname,
        'fileId' : req.file.filename,
        'fileType' : req.body.itecOther,
        'fileSection' : 'ITEC',
        'documentStatus' : 'submitted',
    });

    document.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log('document added!!');
        }
    });
    res.redirect('/home');
});


app.post('/uploadBioEssay', upload.single('bioEssay'), (req, res) => {
    // res.json({ file: req.file.grid });
    console.log(req.file.grid);
    //Test document object to see if you can add a document from inside
    //this function.  It works.

    var document = new Document({
        'user' : {
            'user_id' : req.user.studentid,
            'fname': req.user.fname,
            'lname': req.user.lname,
            'user_email': req.user.email
        },
        'documentName' : req.file.originalname,
        'fileId' : req.file.filename,
        'fileType' : 'Essay',
        'fileSection' : 'BIO',
        'documentStatus' : 'submitted',
    });

    document.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log('document added!!');
        }
    });
    res.redirect('/home');
});


app.post('/uploadBioTranscript', upload.single('bioTranscript'), (req, res) => {
    // res.json({ file: req.file.grid });
    console.log(req.file.grid);
    //Test document object to see if you can add a document from inside
    //this function.  It works.

    var document = new Document({
        'user' : {
            'user_id' : req.user.studentid,
            'fname': req.user.fname,
            'lname': req.user.lname,
            'user_email': req.user.email
        },
        'documentName' : req.file.originalname,
        'fileId' : req.file.filename,
        'fileType' : 'Transcript',
        'fileSection' : 'BIO',
        'documentStatus' : 'submitted',
    });

    document.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log('document added!!');
        }
    });
    res.redirect('/home');
});


app.post('/uploadBioOther', upload.single('bioOther'), (req, res) => {
    // res.json({ file: req.file.grid });
    console.log(req.file.grid);
    //Test document object to see if you can add a document from inside
    //this function.  It works.

    var document = new Document({
        'user' : {
            'user_id' : req.user.studentid,
            'fname': req.user.fname,
            'lname': req.user.lname,
            'user_email': req.user.email
        },
        'documentName' : req.file.originalname,
        'fileId' : req.file.filename,
        'fileType' : req.body.bioOther,
        'fileSection' : 'BIO',
        'documentStatus' : 'submitted',
    });

    document.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log('document added!!');
        }
    });
    res.redirect('/home');
});

app.get('/getFiles/:filename/:documentName', (req, res) => {
    console.log("Doc name:" + req.params.documentName);
  
    // first check if file exists
    const cursor = gfs.find({filename : req.params.filename});
    gfs.openDownloadStreamByName(req.params.filename)
        .on('error', (err) => {
            return res.status(404).json({
              msg: 'Could not find file with id: ' + req.params.filename +
                ' and with name: ' + req.params.documentName,
              err: err
            });
        })
        .pipe(res);
});


require('./app/routes/index.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
