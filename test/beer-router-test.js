'use strict';

require('dotenv').load();
const superagent = require('superagent');
const expect = require('chai').expect;
const Beer = require('../model/beer.js');
const baseUrl = `http://localhost:${process.env.PORT || 3000}`;
require('../server.js');

//testing POST
describe('testing beer router', function() {
  describe('testing POST /api/beers', function() {
    after((done) => {
      Beer.deleteById(this.tempbeer.id)
      .then(() => done())
      .catch(done);
    });

    it('should create a beer with 200 status', done => {
      superagent.post(`${baseUrl}/api/beers`)
        .send({
          name: 'Double Dead Guy',
          type: 'IPA',
          strength: '7.9',
        })
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Double Dead Guy');
          expect(res.body.type).to.equal('IPA');
          expect(res.body.strength).to.equal('7.9');
          expect(Boolean(res.body.id)).to.equal(true);
          expect(Boolean(res.body.created)).to.equal(true);
          this.tempbeer = res.body;
          done();
        })
        .catch(done);
    });

    it('with invaild input should return 400 status code', (done) => {
      superagent.post(`${baseUrl}/api/beers`)
      .send({
        name: 'Double Dead Guy',
        type: 'IPA',
        strength: '7.9',
      })
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });
});

//testing GET
describe('testing GET', function() {
  describe('testing GET /api/beers:id', function() {
    before((done) => {
      superagent.post(`${baseUrl}/api/beers`)
      .send({
        name: 'Double Dead Guy',
        type: 'IPA',
        strength: '7.9',
      })
      .then(res => {
        this.tempBeerID = res.body.id;
        done();
      })
      .catch(done);
    });
    after((done) => {
      Beer.deleteById(this.tempBeerID)
      .then(() => done())
      .catch(done);
    });

    it('should return a beer', (done) => {
      superagent.get(`${baseUrl}/api/beers/${this.tempBeerID}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(this.tempBeer.name);
        expect(res.body.type).to.equal(this.tempBeer.type);
        expect(res.body.strength).to.equal(this.tempBeer.strength);
        expect(res.body.id).to.equal(this.tempBeer.id);
        expect(new Date(res.body.created).toString()).to.equal(this.tempBeer.created.toString());
        expect(Boolean(res.body.created)).to.equal(true);
        expect(Boolean(res.body.id)).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('get /api/beers with no id should return a 400 status', (done) => {
      superagent.get(`${baseUrl}/api/beers?`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });

    it('get /api/beers with bad id should return a 404 status', (done) => {
      superagent.get(`${baseUrl}/api/beers/${this.tempBeerID}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
