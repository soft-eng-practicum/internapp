// server.js

// set up ======================================================================
// get all the tools we need
var fs = require('fs');
var express  = require('express');
var app      = express();
var path     = require('path');
var crypto = require('crypto');
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
var _ = require('lodash');
var methodOverride = require('method-override');
require('dotenv').config();

//New GridFS Stuff
var Document = require('./app/models/document');

// configuration ===============================================================
const mongoURI = process.env.DB_CONN;

const connection = mongoose.connect(mongoURI);
const conn = mongoose.createConnection(mongoURI);
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


let gfs;
conn.once('open', function() {
    gfs = Grid(conn.db, mongoose.mongo);
});

let storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {}
});

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

let upload = multer ({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
});


app.use(express.static(path.join(__dirname, 'public')));

// Set favicon to the SST crest
app.use(favicon(__dirname + '/public/images/logo.png'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'dfgd5155435445df1gdfgdry5y4345' })); // session secret
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
    gfs.files.findOne({filename : req.params.filename}, (err, file) => {

        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    })
})


require('./app/routes/index.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
