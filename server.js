// server.js

// set up ======================================================================
// get all the tools we need
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
var fs  = require('fs');

var methodOverride = require('method-override');

//New GridFS Stuff
var User = require('./app/models/user');
var Document = require('./app/models/document');
var Itec = require('./app/models/itec');
var ctrlDocumentUploads = require('./app/controllers/documentUpload.js');
var router = express.Router();
var multiparty = require('connect-multiparty')();

// configuration ===============================================================
const mongoURI = 'mongodb://meraki:$oftdev2ELKJJ@ds259732.mlab.com:59732/ggcinternapp';

const connection = mongoose.connect(mongoURI);
const conn = mongoose.createConnection(configDB.url);
require('./config/passport');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

var mongoDriver = mongoose.mongo;

mongoose.connection.on('connected', () => {
    console.log('Connected to database!');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

/*
app.post('/uploadTest', multiparty, function(req, res){
    var gfs = new Grid(conn, mongoDriver);
    var writestream = gfs.createWriteStream({
      filename: req.files.file.name,
      content_type: req.files.file.mimetype,
      metadata: req.body
    });
    fs.createReadStream(req.files.file.path).pipe(writestream);
    writestream.on('close', function(file) {
       fs.unlink(req.files.file.path, function(err) {
         // handle error
         console.log('success!')
       });
    });
}
);
*/
//NEWER GRIDFS STUFF
/*

Grid.mongo = mongoose.mongo;

function uploadFileToMongo(req, res) {
    console.log('Test');
    var ferpaPath = path.join(__dirname);
        var gfs = Grid(conn.db);

        var writestream = gfs.createWriteStream({
            filename: 'ferpa.pdf'
        });

        fs.createReadStream(ferpaPath).pipe(writestream);

        console.log('file added')
        res.redirect('/home')

}

app.post('/uploadTest', uploadFileToMongo, (req, res) => {
    console.log('File Uploaded');
    res.redirect('/home');

})



*/

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
});

let storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {filename: 'TESTING SIMPLE RETURN1'};
        {
            return 'TESTING SIMPLE RETURN2';
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    const filename = file.originalname + path.extname(file.originalname);
                    const fileInfo = {
                        filename: 'TESTING UPLOADS',
                        bucketName: 'uploads'
                    };
                    resolve(fileInfo);
                });
            });
        }
    }
});

let upload = multer ({ storage });


app.use(express.static(path.join(__dirname, 'public')));

// Set favicon to the SST crest
app.use(favicon(__dirname + '/public/images/logo.png'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'dfgd5155435445df1gdfgdry5y4345' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.post('/uploadTest', upload.single('file'), (req, res) => {
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
        'fileType' : 'Resume|Transcript|Essay',
        'fileSection' : 'BIO|ITEC',
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
    // res.redirect('/home');
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
    // res.redirect('/home');
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

app.get('/getFiles/:filename', (req, res) => {
    gfs.files.findOne({filename : req.params.filename}, (err, file) => {

        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        return res.json(file);
    })
})


// NEW GRIDFS STUFF





/*
uploadGrid = function(req, res){
var ferpaPath = path.join(__dirname, 'ferpa.pdf');

Grid.mongo = mongoose.mongo;

conn.once('open', function() {
    console.log('- Connection open -');
    var gfs = Grid(conn.db);

    var writestream = gfs.createWriteStream({
        filename: 'ferpa.pdf'
    });

    fs.createReadStream(ferpaPath).pipe(writestream);

    writestream.on('close', function(file) {
        console.log(file.filename + ' Written to db');
    });
});
}
*/




require('./app/routes/index.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
