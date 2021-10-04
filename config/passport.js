// config/passport.js

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

// load all the things we need


// load up the user model
var User = require('../app/models/user');

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser((user, done) => {
        var sessionUser = {
            _id: user._id,
            email: user.local.email,
            studentid: user.local.studentid,
            fname: user.local.fname,
            lname: user.local.lname,
            phone: user.local.phone,
            address: user.local.address,
            city: user.local.city,
            state: user.local.state,
            zipcode: user.local.zipcode,
            role: user.local.role,
            discipline: user.local.discipline
        };
        done(null, sessionUser);
    });

    passport.deserializeUser((sessionUser, done) => {
        // The sessionUser object is different from the user mongoose collection
        // it's actually req.session.passport.user and comes from the session collection
        done(null, sessionUser);
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({
                    'local.email': email
                }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('failure', 'Sorry an account has already been created with that email.'));
                    }
                    else {

                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials and grabs data from req
                        // set the default role to user that can be changed by admin.

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.studentid = req.body.studentid;
                        newUser.local.fname = req.body.fname;
                        newUser.local.lname = req.body.lname;
                        newUser.local.phone = req.body.phone;
                        newUser.local.address = req.body.address;
                        newUser.local.city = req.body.city;
                        newUser.local.state = req.body.state;
                        newUser.local.zipcode = req.body.zipcode;
                        newUser.local.discipline = req.body.discipline;
                        newUser.local.role = "user";



                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                'local.email': email
            }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('failure', 'No user found has been found with that email.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('failure', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });

        }));
