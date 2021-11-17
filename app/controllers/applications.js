/*
    Controller functions containing the logic for the application routes
    Authors : Joseph Cox, Robert Bryan
*/

var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');
var Document = require('../models/document');
var nodemailer = require('nodemailer');
var key = process.env.YAHOO_PASSWORD;
var json2csv = require('json2csv');
var fs = require('fs');
var homeDir = require('home-dir');
var path = require('path');
var homeCtrl = require("./home");


/*
    HTTP Req: GET
    URL: '/itec'
*/
module.exports.getItecApplication = function (req, res) {
    res.render('itec.ejs', {
        user: req.user,
        successMessage: req.flash('success'),
        failureMessage: req.flash('failure')
    });
};

/*
    HTTP Req: GET
    URL: '/bio'
*/
module.exports.getBioApplication = function (req, res) {
    res.render('bio.ejs', {
        user: req.user, // get the user out of session and pass to template
        successMessage: req.flash('success'),
        failureMessage: req.flash('failure')
    });
};

/*
    HTTP Req: GET
    URL: '/applications'
*/

module.exports.getApplications = function (req, res) {
    var haveBioApp = false;
    var haveItecApp = false;

    if (req.user.role === 'admin' || req.user.role === 'instructor') {
        User.getAdminValuesForHome(req.user._id, function (adminValues) {
            function getProgram () {
                if (adminValues.adminprogram === 'Biology Internship (BIOL 4800)') {
                    return 'BIO'
                }
                else if (adminValues.adminprogram === 'Information Technology Internship (ITEC 4900)') {
                    return 'ITEC'
                }
            }
            var filters = {
                proposedinternsemester: adminValues.adminsemester,
                proposedinternyear: adminValues.adminyear,
                userdiscipline: getProgram()
            };

                Bio.find(filters, function (err, bioApplications) {
                    if (err) return console.error(err);
                Itec.find(filters, function (err, itecApplications) {
                    if (err) return console.error(err);
                    res.render('applications.ejs', {
                        applicationList: bioApplications.concat(itecApplications),
                        admin: adminValues,
                        successMessage: req.flash('success'),
                        failureMessage: req.flash('failure'),
                        user: req.user
                    });
                });
            });
        });
    }
    else {
        Bio.find({
            useremail: req.user.email
        }, function (err, bioApplications) {
            if (err) return console.error(err);
            Itec.find({
                useremail: req.user.email
            }, function (err, itecApplications) {
                if (err) return console.error(err);
                res.render('applications.ejs', {
                    applicationList: bioApplications.concat(itecApplications),
                    user: req.user,
                    haveBioApp: haveBioApp,
                    haveItecApp: haveItecApp,
                    successMessage: req.flash('success'),
                    failureMessage: req.flash('failure')
                });
            });
        });
    }
};

//2019Com. function to check if applicant is itec or bio major and store values into variables for disciple, semester ect.
function filterApplications(req, res, cb) {
    var discipline;
    var semester = req.body.semester;
    var year = req.body.year;
    var appArray = [];
    var fields = [];

    switch (req.body.program) {
        case 'Biology Internship (BIOL 4800)':
            discipline = 'BIO';
            break;
        case 'Information Technology Internship (ITEC 4900)':
            discipline = 'ITEC';
        default:
            break;
    }

    if (discipline == 'BIO') {
        Bio.find({
            "proposedinternsemester": semester,
            "proposedinternyear": year
        }, function (err, bioApps) {
            if (bioApps.length == 0) { // if no bio apps were found
                res.redirect('/applications');
                req.flash('failure', 'No biology applicants for ' + semester + ' ' + year + ' were found');
            } else {
                bioApps.forEach(function (bioApp) {
                    var bioJson = {
                        ID: bioApp.userstudentid,
                        FirstName: bioApp.userfname,
                        LastName: bioApp.userlname,
                        PhoneNumber: bioApp.phonenumber,
                        'BIO GPA': bioApp.programgpa,
                        Concentration: bioApp.major,
                        'Expected Graduation': bioApp.expectedGraduationSemester + ' ' + bioApp.expectedGraduationYear,
                        Semester: semester,
                        Year: year
                    };
                    appArray.push(bioJson);
                });

                fields = ['ID', 'FirstName', 'LastName', 'PhoneNumber', 'BIO GPA', 'Concentration',
                    'Expected Graduation', 'Semester', 'Year'];

                cb(null, {
                    fields,
                    appArray,
                    discipline,
                    year,
                    semester
                })
            }
        });
    } else if (discipline = 'ITEC') {
        Itec.find({
            "proposedinternsemester": semester,
            "proposedinternyear": year
        }, function (err, itecApps) {
            if (itecApps.length == 0) { // if no bio apps were found
                res.redirect('/applications');
                req.flash('failure', 'No information technology applicants for ' + semester + ' ' + year + ' were found');
            } else {
                itecApps.forEach(function (itecApp) {
                    var itecJson = {
                        ID: itecApp.userstudentid,
                        FirstName: itecApp.userfname,
                        LastName: itecApp.userlname,
                        PhoneNumber: itecApp.phonenumber,
                        'ITEC GPA': itecApp.itecgpa,
                        Concentration: itecApp.major,
                        'Expected Graduation': itecApp.expectedGraduationSemester + ' ' + itecApp.expectedGraduationYear,
                        Programming: itecApp.focusonsoftdev,
                        Semester: semester,
                        Year: year
                    };
                    appArray.push(itecJson);
                });

                fields = ['ID', 'FirstName', 'LastName', 'PhoneNumber', 'ITEC GPA', 'Concentration',
                    'Expected Graduation', 'Programming', 'Semester', 'Year'];

                cb(null, {
                    fields,
                    appArray,
                    discipline,
                    year,
                    semester
                })
            }
        });
    } else {

    }
}

/*
    HTTP Req: POST
    URL: /export-applications
*/
module.exports.filterApplications = function (req, res) {
    if (req.body.function === "export") {
        filterApplications(req, res, (err, data) => {
            var discipline = data.discipline;
            var appArray = data.appArray;
            var fields = data.fields;
            var semester = data.semester;
            var year = data.year;
            var csv = json2csv({ data: appArray, fields: fields });
            var fileName = 'csv/' + String(discipline).toLowerCase() + '_applications' + '_' + semester + '_' + year + '.csv';
            write(fileName, csv, req, res);
        })
    } else {
        req.body.adminsemester = req.body.semester
        req.body.adminyear = req.body.year
        req.body.adminprogram = req.body.program

        homeCtrl.postAdminHome(req, res)
        //module.exports.getApplications(req, res);
    }
}


function write(fileName, csv, req, res) {
    fs.writeFile(fileName, csv, function (err) {
        if (err) {
            req.flash('failure', 'There was an error with the writing of the CSV file');
        } else {
            console.log('file successfully saved');
            csvPath = path.resolve(__dirname + '/../../' + fileName);
            download(csvPath, req, res);
        }
    });
}
//passes in comma seperated file

function download(csvPath, req, res) {
    res.download(csvPath, function (err) {
        if (err) {
            console.log('Error downloading csv: ', err);
            req.flash('failure', 'There was an error downloading the csv file');
        } else {
            console.log('file successfully written!');
            deleteFile(csvPath);
        }
    });
}

function deleteFile(fileName) {
    fs.unlink(fileName, function (err) {
        if (err) {
            console.log('Error deleting the filing after download');
        } else {
            console.log(fileName + ' deleted!');
        }
    });
}

/*
    HTTP Req: GET
    URL: '/application/bio/:id'
*/
module.exports.getSpecificBioApplication = function (req, res) {
    var documents = [];
    Bio.findOne({
        _id: req.params.applicationid
    }, function (err, bioApp) {
        if (err) throw err;
        Document.getBioDocumentsForUser(bioApp.useremail, function (incomingDocuments) {
            documents = incomingDocuments;
            User.findOne({_id: req.user._id}, function(err, user) {
                if (err) {
                    throw err;
                }
                res.render('applicationdetails.ejs', {
                    application: bioApp,
                    documents: documents,
                    user: user,
                    // userPhoneNumber: user.local.phone,
                    successMessage: req.flash('success'),
                    failureMessage: req.flash('failure')
                });
            })
        });
    });
};


/*
    HTTP Req: GET
    URL: '/application/itec/:id'
*/
module.exports.getSpecificItecApplication = function (req, res) {
    var documents = [];
    Itec.findOne({
        _id: req.params.applicationid
    }, function (err, itecApp) {
        if (err) throw err;
        Document.getItecDocumentsForUser(itecApp.useremail, function (incomingDocuments) {
            documents = incomingDocuments;
            User.findOne({_id: req.user._id}, function(err, user) {
                if (err) {
                    throw err;
                }
                res.render('applicationdetails.ejs', {
                    application: itecApp,
                    documents: documents,
                    user: user,
                    // userPhoneNumber: user.local.phone,
                    successMessage: req.flash('success'),
                    failureMessage: req.flash('failure')
                });
            })
        });
    });
}

/*
    HTTP Req: POST
    URL: '/application/:type(bio or itec)/:applicationid'
*/
module.exports.updateApplicationStatus = function (req, res) {
    var typeOfEmail = 'applicationStatusUpdate';
    var studentEmail = "";
    if (req.params.type.toLowerCase() == 'itec') {
        Itec
            .findById(req.params.applicationid)
            .exec(
            function (err, appEntry) {
                studentEmail = appEntry.useremail;
                Itec.update({ _id: req.params.applicationid }, { applicationstatus: req.body.applicationstatus }, function (err) {
                    if (err) {
                        req.flash('failure', 'An error has occured, the application status has not been changed!')
                        res.redirect('/application/itec/' + req.params.applicationid);
                    }
                    else {
                        req.flash('success', 'The application status has been successfully changed!')
                        redirect = '/application/itec/' + req.params.applicationid;
                        sendEmail(req, res, typeOfEmail, studentEmail, redirect);
                    }
                });
            }
            );
    } else {
        Bio
            .findById(req.params.applicationid)
            .exec(
            function (err, appEntry) {
                studentEmail = appEntry.useremail;
                Bio.update({ _id: req.params.applicationid }, { applicationstatus: req.body.applicationstatus }, function (err) {
                    if (err) {
                        req.flash('failure', 'An error has occured, the application status has not been changed!')
                        res.redirect('/application/bio/' + req.params.applicationid);
                    }
                    else {
                        req.flash('success', 'The application status has been successfully changed!')
                        redirect = '/application/bio/' + req.params.applicationid;
                        sendEmail(req, res, typeOfEmail, studentEmail, redirect);
                    }
                });
            }
        );
    }
};
/*
    HTTP Req: POST
    URL: '/application/itec/changesemester:applicationid'
*/
module.exports.changeSemester = function (req, res) {
    var typeOfEmail = 'applicationStatusUpdate';
    var studentEmail = "";
    if (req.params.type== 'itec') {
        Itec
            .findById(req.params.applicationid)
            .exec(
            function (err, appEntry) {
                studentEmail = appEntry.useremail;
                Itec.update({ _id: req.params.applicationid }, { proposedinternsemester: req.body.proposedinternsemester }, function (err) {
				Itec.update({ _id: req.params.applicationid }, { proposedinternyear: req.body.proposedinternyear }, function (err) {
                    if (err) {
                        req.flash('failure', 'An error has occured, the application status has not been changed!')
                        res.redirect('/application/itec/' + req.params.applicationid);
                    }
                    else {
                        req.flash('success', 'The application status has been successfully changed!')
						res.redirect('/application/itec/' + req.params.applicationid);
                    }
                });
            });


            }
        );
    }
	};
/*
    HTTP Req: POST
    URL: '/application/changeMultipleSemester'
*/
module.exports.changeMultipleSemester = function (req, res) {
    console.log(req.body.checkboxes);
    var checkboxes_array = req.body.checkboxes.split(',');
    console.log(checkboxes_array);
    var length = checkboxes_array.length;
    console.log(length);
    console.log(req.body.proposedinternsemester);
    console.log(req.body.proposedinternyear);

    if (checkboxes_array[0] != '') {
        for (var i = 0; i < length; i++) {
            console.log(checkboxes_array[i]);


            Bio.update({_id: checkboxes_array[i]}, {proposedinternsemester: req.body.proposedinternsemester}, function (err) {
                if (err) {
                    console.log("Problem updating " + checkboxes_array[i]);
                } else {
                    console.log("No Problem updating bbh" + checkboxes_array[i]);
                }
            });

            Bio.update({_id: checkboxes_array[i]}, {proposedinternyear: req.body.proposedinternyear}, function (err) {
                if (err) {
                    console.log("Problem updating " + checkboxes_array[i]);
                } else {
                    console.log("No Problem updating " + checkboxes_array[i]);
                }
            });

            Itec.update({_id: checkboxes_array[i]}, {proposedinternsemester: req.body.proposedinternsemester}, function (err) {
                if (err) {
                    console.log("Problem updating " + checkboxes_array[i]);
                } else {
                    console.log("No Problem updating " + checkboxes_array[i]);
                }
            });

            Itec.update({_id: checkboxes_array[i]}, {proposedinternyear: req.body.proposedinternyear}, function (err) {
                if (err) {
                    console.log("Problem updating " + checkboxes_array[i]);
                } else {
                    console.log("No Problem updating " + checkboxes_array[i]);
                }
            });
        }
        req.flash('success', 'The proposed internship semester & year for the selected application(s) has been successfully changed!')
    } else {
        if (checkboxes_array[0] == '') {
        req.flash('failure', 'There were no selected applications to be updated!');
        }
    }
    res.redirect('/applications');
}
/*

    A note has been added for this app

    HTTP Req: POST
    URL: '/application/itec/notes/:applicationid'
*/
module.exports.addItecNotes = function (req, res) {
    Itec.update({ _id: req.params.applicationid }, { $push: { "notes": { note: req.body.note, user: req.user.email } } }, function (err) {
        if (err) {
            req.flash('failure', 'An error has occured, the note can not be added at this time.')
            res.redirect('/application/itec/' + req.params.applicationid);
        }
        else {
            req.flash('success', 'The note has been successfully added!')
            res.redirect('/application/itec/' + req.params.applicationid);
        }
    });
}

/*

    HTTP Req: GET
    URL: /application/itec/:applicationId/notes/delete/:noteId

*/
module.exports.deleteItecNote = function (req, res) {
    var itecId = req.params.applicationId;
    Itec.update({ _id: req.params.applicationId }, { $pull: { "notes": { _id: req.params.noteId } } },
        function (err) {
            if (err) {
                console.log(err);
                req.flash('failure', 'An error has occured, the note can not be deleted at this time.')
                res.redirect('/application/itec/' + itecId);
            } else {
                req.flash('success', 'The note has been successfully deleted!')
                res.redirect('/application/itec/' + itecId);
            }
        });
}

/*
    HTTP Req: POST
    URL: /application/itec/feedback/:applicationid
*/
module.exports.addItecFeedback = function (req, res) {
    var typeOfEmail = "applicationFeedback";
    var studentEmail;
    Itec
        .findById(req.params.applicationid)
        .exec(
        function (err, appEntry) {
            studentEmail = appEntry.useremail;

            Itec.update({ _id: req.params.applicationid }, { $push: { "feedback": { feedback: req.body.feedback, user: req.user.email } } }, function (err) {
                if (err) {
                    req.flash('failure', 'Unable to add feedback to ITEC application');
                    res.redirect('/application/itec/' + req.params.applicationid);
                }
                else {
                    req.flash('success', 'The feedback has been successfully added!')
                    var redirect = '/application/itec/' + req.params.applicationid;
                    sendEmail(req, res, typeOfEmail, studentEmail, redirect)
                }
            });
        }
        );

}

/*

    HTTP Req: GET
    URL: /application/itec/:applicationId/feedback/delete/:feebackId

*/
module.exports.deleteItecFeedback = function (req, res) {
    var itecId = req.params.applicationId;
    if (!(req.user.role == 'admin')) {
        req.flash('failure', "Don't delete your own feedback silly!")
        res.redirect('/application/itec/' + itecId);
    } else {

        Itec.update({ _id: req.params.applicationId }, { $pull: { "feedback": { _id: req.params.feedbackId } } },
            function (err) {
                if (err) {
                    console.log(err);
                    req.flash('failure', 'An error has occurred, the feedback can not be deleted at this time.')
                    res.redirect('/application/itec/' + itecId);
                } else {

                    res.redirect('/application/itec/' + itecId);
                    req.flash('success', 'The feedback has been successfully deleted!')
                }
            });
    }

}

/*
    HTTP Req: POST
    URL: '/application/bio/notes/:applicationid'
*/
module.exports.addBioNotes = function (req, res) {
    Bio.update({ _id: req.params.applicationid }, { $push: { "notes": { note: req.body.note, user: req.user.email } } }, function (err) {
        if (err) {
            req.flash('failure', 'The note cannot be added at this time.');
            res.redirect('/application/bio/' + req.params.applicationid);
        }
        else {
            req.flash('success', 'The note has been successfully added!')
            res.redirect('/application/bio/' + req.params.applicationid);
        }
    });
}

/*

    HTTP Req: GET
    URL: /application/bio/:applicationId/notes/delete/:noteId

*/
module.exports.deleteBioNote = function (req, res) {
    var bioId = req.params.applicationId;
    Bio.update({ _id: req.params.applicationId }, { $pull: { "notes": { _id: req.params.noteId } } },
        function (err) {
            if (err) {
                console.log(err);
                req.flash('failure', 'An error has occured, the note can not be deleted at this time.')
                res.redirect('/application/bio/' + bioId);
            } else {
                req.flash('success', 'The note has been successfully deleted!')
                res.redirect('/application/bio/' + bioId);
            }
        });
}

/*
    HTTP Req: POST
    URL: /application/bio/feedback/:applicationid
*/
module.exports.addBioFeedback = function (req, res) {
    var typeOfEmail = "applicationFeedback";
    var studentEmail;
    Bio
        .findById(req.params.applicationid)
        .exec(
        function (err, appEntry) {
            studentEmail = appEntry.useremail;

            Bio.update({ _id: req.params.applicationid }, { $push: { "feedback": { feedback: req.body.feedback, user: req.user.email } } }, function (err) {
                if (err) {
                    req.flash('failure', 'Unable to add feedback to BIO application');
                    res.redirect('/application/bio/' + req.params.applicationid);
                }
                else {
                    req.flash('success', 'The feedback has been successfully added!')
                    var redirect = '/application/bio/' + req.params.applicationid;
                    sendEmail(req, res, typeOfEmail, studentEmail, redirect)
                }
            });
        }
        );

}

/*

    HTTP Req: GET
    URL: /application/bio/:applicationId/feedback/delete/:feedbackId

*/
module.exports.deleteBioFeedback = function (req, res) {
    var bioId = req.params.applicationId;
    if (!(req.user.role == 'admin')) {
        req.flash('failure', "Don't delete your own feedback silly!")
        res.redirect('/application/bio/' + bioId);
    } else {
        Bio.update({ _id: req.params.applicationId }, { $pull: { "feedback": { _id: req.params.feedbackId } } },
            function (err) {
                if (err) {
                    console.log(err);
                    req.flash('failure', 'An error has occured, the feedback can not be deleted at this time.')
                    res.redirect('/application/bio/' + bioId);
                } else {
                    req.flash('success', 'The feedback has been successfully deleted!')
                    res.redirect('/application/bio/' + bioId);
                }
            });
    }
}

/*
    HTTP Req: GET
    URL: 'applications/itec/:applicationid/delete'
*/
module.exports.removeSpecificItecApplication = function (req, res) {
    Itec.findOneAndRemove({
        _id: req.params.applicationid
    }, function () {});
    res.redirect("/applications");
};

/*
    HTTP Req: GET
    URL: 'applications/itec/:applicationid/delete'
*/
module.exports.removeSpecificBioApplication = function (req, res) {
    Bio.findOneAndRemove({
        _id: req.params.applicationid
    }, function () {});
    res.redirect("/applications");
};

/*
    HTTP Req: POST
    URL: '/applications/itec/documents/:applicationid/documentid/:answer'
*/
module.exports.updateApplicationDocument = function (req, res) {
    Itec.update({ 'documents._id': req.params.documentid }, { $set: { 'documents.$.status': req.params.answer } }, function (err) {
        if (err) {
            req.flash('info', err);
            res.redirect('/application/itec/' + req.params.applicationid);
        }
        else {
            res.redirect('/application/itec/' + req.params.applicationid);
        }
    });
};

/*
    HTTP Req: POST
    URL: '/itec'
*/
module.exports.postItecApplication = function (req, res) {
    Itec.getUsersItecApp(req.user.email, function (incomingItecApp) {
        if (incomingItecApp) {
            res.redirect('/home');
            req.flash('failure', 'You cannot create another ITEC application');
            res.redirect('/home');
        } else {
            var itecapp = new Itec(req.body);
            itecapp.useremail = req.user.email;
            itecapp.userstudentid = req.user.studentid;
            itecapp.userfname = req.user.fname;
            itecapp.userlname = req.user.lname;
            itecapp.userphone = req.user.phone;
            itecapp.useraddress = req.user.address;
            itecapp.usercity = req.user.city;
            itecapp.userstate = req.user.state;
            itecapp.userzipcode = req.user.zipcode;
            itecapp.userdiscipline = 'ITEC';
            itecapp.applicationstatus = 'submitted';
            itecapp.documents = [{ item: 'ferpa', status: 'no' }, { item: 'resume', status: 'no' }];
            itecapp.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.redirect('/home');
        }
    });
};

/*
    HTTP Req: POST
    URL: '/bio'
*/
module.exports.postBioApplication = function (req, res) {
    Bio.getUsersBioApp(req.user.email, function (incomingBioApp) {
        if (incomingBioApp) {
            res.redirect('/home');
            req.flash('failure', 'You cannot create another BIO application');
        } else {
            var bioapp = new Bio(req.body);
            bioapp.useremail = req.user.email;
            bioapp.userstudentid = req.user.studentid;
            bioapp.userfname = req.user.fname;
            bioapp.userlname = req.user.lname;
            bioapp.userphone = req.user.phone;
            bioapp.useraddress = req.user.address;
            bioapp.usercity = req.user.city;
            bioapp.userstate = req.user.state;
            bioapp.userzipcode = req.user.zipcode;
            bioapp.userdiscipline = 'BIO';
            bioapp.applicationstatus = 'submitted';
            bioapp.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.redirect('/applications');
        }
    });
}

/*

    HTTP Req: GET
    URL: /home/:applicationId/document/delete/:documentId
    URL: /home/documentDelete
*/
module.exports.deleteDoc = function (req, res) {
    var docId = req.params.applicationId;
    Document.remove({ _id: req.params.documentId },
        function (err) {
            if (err) {
                console.log(err);
                req.flash('failure', 'An error has occured, the note can not be deleted at this time.')
                res.redirect('/home/');
            } else {
                req.flash('success', 'The document has been successfully deleted!')
                res.redirect('/home/');
            }
        });
}

/*

    HTTP Req: GET
    URL: /application/bio/:applicationId/document/delete/:documentId

*/
module.exports.deleteBioDoc = function (req, res) {
    var bioId = req.params.applicationId;
    Document.remove({ _id: req.params.documentId },
        function (err) {
            if (err) {
                console.log(err);
                req.flash('failure', 'An error has occurred, the note can not be deleted at this time.');
                res.redirect('/application/bio/' + bioId);
            } else {
                req.flash('success', 'The document has been successfully deleted!');
                res.redirect('/application/bio/' + bioId);
            }
        });
}

/*

    HTTP Req: GET
    URL: /application/itec/:applicationId/document/delete/:documentId

*/
module.exports.deleteItecDoc = function (req, res) {
    var itecId = req.params.applicationId;
    Document.remove({ _id: req.params.documentId },
        function (err) {
            if (err) {
                console.log(err);
                req.flash('failure', 'An error has occured, the note can not be deleted at this time.')
                res.redirect('/application/itec/' + itecId);
            } else {
                req.flash('success', 'The document has been successfully deleted!')
                res.redirect('/application/itec/' + itecId);
            }
        });
}

function sendEmail(req, res, typeOfEmail, studentEmail, redirect) {

    var emailSubject;
    var emailText;
    var transporter;
    switch (typeOfEmail) {
        case 'applicationStatusUpdate':
            emailSubject = '[GGC Internship Application] Application Status Changed';
            emailText = 'Your GGC internship application status has changed. Please login to view the status change: https://ggc-internapp.herokuapp.com/login';
            break;
        case 'applicationFeedback':
            emailSubject = '[GGC Internship Application] Application Feedback Received';
            emailText = 'Your GGC internship application has received new feedback. Please login to view the feedback: https://ggc-internapp.herokuapp.com/login';
            break;
        default:
            console.log('email type not recognized')
            res.redirect('/applications');
            break;
    }

    transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
            user: 'ggcinternapp@yahoo.com',
            pass: key
        }
    });

    mailOptions = {
        from: 'ggcinternapp@yahoo.com',
        to: studentEmail,
        subject: emailSubject,
        text: emailText
    }
    transporter.sendMail(mailOptions, function (err) {
        if (err) {
            console.log(err);
            res.redirect(redirect);
        } else {
            console.log(typeOfEmail, ' completed!');
            res.redirect(redirect);
        }
    });
}
