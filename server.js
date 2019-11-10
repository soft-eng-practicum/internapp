// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
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

// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: function(req, file) {
//         //     // if (file.mimeType === 'application/pdf') {
//         //     //     console.log("Got application/pdf");
//         //     //     return {
//         //     //         filename: 'pdffile' + Date.now()
//         //     //     };
//         //     // }
//         //     // else if (file.mimeType === 'text/plain') {
//         //     //     console.log("Got text/plain");
//         //     //     return {
//         //     //         filename: 'textfile' + Date.now()
//         //     //     };
//         //     // }
//         //     // else if (file.contentType === 'text/plain') {
//         //     //     console.log("Got text/plain from content type");
//         //     //     return {
//         //     //         filename: 'contexttextfile' + Date.now()
//         //     //     };
//         //     // }
//         //     // else {
//         //     //     console.log("I'm returning null...");
//         //     //     return 'EKTESTFILENAME_' + Date.now();
//         //     // }
//         //     // return {filename:'EKTESTFILENAME_' + Date.now()};
//         //     return 'file_' + Date.now();
//     }
// });

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
        //
        // if (file.mimetype === 'image/jpeg') {
        //
        //     return {
        //         bucketName: 'photos',
        //         filename: file.originalName
        //     };
        // } else {
        //     return '';
        // }
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
    res.json({ file: req.file.grid });
    console.log(req.file.grid);
    //Test document object to see if you can add a document from inside
    //this function.  It works.

    var document = new Document({
        'user' : {
            // 'user_id' : req.user.studentid,
            // 'user_id' : req.user.studentid,
            // 'fname': req.user.fname,
            // 'lname': req.user.lname,
            // 'user_email': req.user.email
            'user_id' : req.file.filename,
            'fname': req.file.originalname,
            'lname': req.file.grid.contentType,
            'user_email': req.file.grid.uploadDate
        },
        'fileType' : 'tempfileInfo',
        'fileSection' : 'recordSection',
        'documentName' : 'test',
        'documentStatus' : 'submitted',
        'recordFileType' : 'idk'
    });

    document.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log('document added!!');
        }
    });
    



    console.log('file HAS been added');
    // res.redirect('/home');
});




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

