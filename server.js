// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');


var routes = require('./app/routes/index');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport'); 

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'dfgd5155435445df1gdfgdry5y4345' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//require('./app/routes/index')(app, passport);
require('./app/routes/index.js')(app, passport);



// routes ======================================================================
/*require('./app/routes/applications.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/dashboard.js')(app, passport);
require('./app/routes/home.js')(app, passport);
require('./app/routes/login.js')(app, passport);
require('./app/routes/logout.js')(app, passport);
require('./app/routes/promote.js')(app, passport);
require('./app/routes/signup.js')(app, passport);
require('./app/routes/sites.js')(app, passport);
require('./app/routes/forgot.js')(app, passport);
require('./app/routes/reset.js')(app, passport);
require('./app/routes/faq.js')(app, passport); 
*/


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
