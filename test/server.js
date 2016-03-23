var expect  = require("chai").expect;
var request = require("supertest");


var app = require('../server/index')


describe('GET /test_route', function(){
  it('respond with json', function(done){
    request(app)
      .get('/test_route')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})