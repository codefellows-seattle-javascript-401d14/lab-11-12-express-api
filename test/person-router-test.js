'use strict';

require('../server.js');
const expect = require('chai').expect;
const superagent = require('superagent');
const storage = require('../lib/storage');
const Person = require('../model/personconstructor');
const baseUrl = `http://localhost:${process.env.PORT ||3000}`;

// const personRouter = require('person-router');
describe('testing the /api/person POST method', function(){
  it('should return a person',(done) => {
    superagent.post(`${baseUrl}/api/person`)
    .send({
      name: 'Ken',
      hobby: 'rowing',
    })
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('Ken');
      expect(res.body.hobby).to.equal('rowing');
      expect(Boolean(res.body.id)).to.equal(true);
      this.tempPerson = res.body;
      done();
    }) //end of then block
    .catch(done);
  });
  it('should return a 400 error with no id', (done) => {
    superagent.post(`${baseUrl}/api/person`)
      .send({
        name: 'Ken',
      })
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
  });
});
//*******************TEST GET HERE************************************
describe('testing the /api/person GET Method', function(){
  before((done) => {
    this.notRealPerson = new Person ({ name: 'john', hobby: 'food'});
    storage.createItem('person', this.notRealPerson)
    .then(() => done())
    .catch(done);
  });
  it('should respond with a person when made with valid id', (done) => {
    superagent.get(`${baseUrl}/api/person/${this.notRealPerson.id}`)
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(this.notRealPerson.id);
      expect(res.body.name).to.equal(this.notRealPerson.name);
      expect(res.body.hobby).to.equal(this.notRealPerson.hobby);
      done();
    })
  .catch(done);
  });
  it('should respond with NOT FOUND for valid request made with an id that was not found', (done) => {
    superagent.get(`${baseUrl}/api/person/123`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(404);
      done();
    });
  });
//   it('should respond with bad request if no ID was provided', (done) => {
//     superagent.get(`${baseUrl}/api/person/`)
//     .then(done)
//     .catch(err => {
//       expect(err.status).to.equal(400);
//       done();
//     })
//     .catch(done);
//   });
//   after((done) => {
//     Person.deleteById(this.notRealPerson.id)
//    .then(() => done())
//    .catch(done);
//   });
});
