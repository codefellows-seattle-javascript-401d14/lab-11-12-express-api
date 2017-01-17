'use strict';

require('dotenv').config();
const superagent = require('superagent');
const expect = require('chai').expect;
const storage = require('../lib/storage');
const Athlete = require('../model/Athlete');
const baseUrl = `http://localhost:${process.env.PORT}`;
require('../server');

describe('testing appRouter', function(){
  describe('testing POST /api/athletes', function(){
    after((done) => {
      Athlete.deleteById(this.tempAthlete.id)
      .then(() => done())
      .catch(done);
    });
    it('shoud create an athlete', (done) => {
      superagent.post(`${baseUrl}/api/athletes`)
      .send({
        athleteName: 'testName',
        sport: 'testSport',
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.athleteName).to.equal('testName');
        expect(res.body.sport).to.equal('testSport');
        expect(Boolean(res.body.id)).to.equal(true);
        this.tempAthlete = res.body;
        done();
      })
      .catch(done);
    });
  });
  describe('testing POST /api/athletes with invalid data', function(){
    it('should return 400 status code', (done) => {
      superagent.post(`${baseUrl}/api/athletes`)
    .send({
      sport: 'lazyTest',
    })
    .then(done)
    .catch(err=> {
      expect(err.status).to.equal(400);
      done();
    })
    .catch(done);
    });
  });
  describe('testing DELETE /api/athletes/:id', function(){
    before((done) => {
      this.tempAthlete = new Athlete({athleteName: 'tempAthlete', sport: 'tempSport'});
      storage.createItem('athletes', this.tempAthlete)
    .then(() => done())
    .catch(done);
    });
    it('should delete an athlete', (done) => {
      superagent.delete(`${baseUrl}/api/athletes`)
      .send(this.tempAthlete.id);
      done();
    });
  });
  describe('testing GET /api/athletes/:id', function(){
    before((done) => {
      this.tempAthlete = new Athlete({athleteName: 'tempAthlete', sport: 'tempSport'});
      storage.createItem('athletes', this.tempAthlete)
      .then(() => done())
      .catch(done);
    });
    it('should fetch an athlete', (done) => {
      superagent.get(`${baseUrl}/api/athletes`)
      .send(this.tempAthlete.id);
      done();
    });
  });
  describe('testing GET /api/athletes/', function(){
    it('should fetch all athletes', (done) => {
      superagent.get(`${baseUrl}/api/athletes`)
      .send();
      done();
    });
  });
});
