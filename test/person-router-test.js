'use strict';

const superagent = require('superagent');
const expect = require('chai').expect;
const Person = require('../model/personconstructor');
const baseUrl = `http://localhost:${process.env.PORT ||3000}`;
require('../server.js');


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
      done();
    }) //end of then block
    .catch(done);
  });
  it('should return a 404 error', (done) => {
    superagent.post(`${baseUrl}/api/person`)
      .send({
        name: 'Ken',
      })
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
  });
});
