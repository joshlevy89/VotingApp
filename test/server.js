var expect  = require("chai").expect;
var request = require("supertest");
var mongoose = require('mongoose');  
var mockgoose = require('mockgoose');
mockgoose(mongoose);  


var app = require('../server/index')

    // console.log(server)
    // server.close()

describe("Tests routes", function() {
  
  it('respond with json', function(done){
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
          if (err) return done(err); 
          expect(err).to.equal(null);
          expect(res.body.email).to.equal('b');
          // we will filter the user object and not return the 
          // password hash back
          done();
      })
  })
   // var url = "http://localhost:2999/CREATE_USER/?email=d&password=a"


});


// describe("Server API", function() {
  
//   describe("test_route", function() {
//     var url = "http://localhost:2999/test_route"

//     it("returns status 200", function(done) {
//       request(url, function(error, response, body) {
//         expect(response.statusCode).to.equal(200);
//         done();
//       });
//     });

//     it("returns greeting", function(done) {
//       request(url, function(error, response, body) {
//         expect(body).to.equal('hi');
//         done();
//       });
//     });

//   })
// });