//var requires = require("app/routes/index.js");

// describe("A suite", function() {
//   it("contains spec with an expectation", function() {
//     expect(true).toBe(true);
//   });
// });

var base_url = "http://ggc-internapp.herokuapp.com/";

var moduleName = 'app/routes/index.js';
var index;
require([moduleName], function(index){
    // do something with fooModule
    this.index = index;

});

describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      index.test(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});