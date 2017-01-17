'use strict';

const superagent = require('superagent');
const expect = require('chai').expect;
const Game = require('../model/game.js');
const baseURL = `http://localhost:${process.env.PORT || 3000}`;
require('../server.js');

describe('testing game router, tests should not leave files in data', function() {
  let mockData = {
    title: 'XCOM 2',
    genre: 'strategy/tactics',
    developer: '2K Games, Inc.',
    publisher: 'Firaxis Games, Inc.',
    platforms: 'Windows, Linux, Mac, PS4, Xbox One',
    ratingESRB: 'Teen',
    releaseDate: 'Feb 05, 2016',
  };
  describe('testing POST /api/games', function() {
    after(done => {
      Game.deleteById(this.tempGameId)
      .then(() => done())
      .catch(done);
    });
    it('valid input should create a game with status 200', done => {
      superagent.post(`${baseURL}/api/games`)
      .send(mockData)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('XCOM 2');
        expect(res.body.genre).to.equal('strategy/tactics');
        expect(res.body.developer).to.equal('2K Games, Inc.');
        expect(res.body.publisher).to.equal('Firaxis Games, Inc.');
        expect(res.body.platforms).to.equal('Windows, Linux, Mac, PS4, Xbox One');
        expect(res.body.ratingESRB).to.equal('Teen');
        expect(res.body.releaseDate).to.equal('Feb 05, 2016');
        expect(Boolean(res.body.id)).to.equal(true);
        this.tempGameId = res.body.id;
        done();
      })
      .catch(done);
    });
    it('invalid input should return 400 status code', done => {
      superagent.post(`${baseURL}/api/games`)
      .send({title: 'I am bread'})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });
  describe('testing GET /api/games/:id', function() {
    before(done => {
      superagent.post(`${baseURL}/api/games`)
      .send(mockData)
      .then(res => {
        this.tempGameId = res.body.id;
        done();
      })
      .catch(done);
    });
    after(done => {
      Game.deleteById(this.tempGameId)
      .then(() => done())
      .catch(done);
    });
    it('valid id should return a game with status 200', done => {
      superagent.get(`${baseURL}/api/games/${this.tempGameId}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('XCOM 2');
        expect(res.body.genre).to.equal('strategy/tactics');
        expect(res.body.developer).to.equal('2K Games, Inc.');
        expect(res.body.publisher).to.equal('Firaxis Games, Inc.');
        expect(res.body.platforms).to.equal('Windows, Linux, Mac, PS4, Xbox One');
        expect(res.body.ratingESRB).to.equal('Teen');
        expect(res.body.releaseDate).to.equal('Feb 05, 2016');
        expect(Boolean(res.body.id)).to.equal(true);
        done();
      })
      .catch(done);
    });
    it('invalid id should return status 404', done => {
      superagent.get(`${baseURL}/api/games/42`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('testing GET /api/games', function() {
    before(done => {
      superagent.post(`${baseURL}/api/games`)
      .send(mockData)
      .then(res => {
        this.tempGameId = res.body.id;
        done();
      })
      .catch(done);
    });
    after(done => {
      Game.deleteById(this.tempGameId)
      .then(() => done())
      .catch(done);
    });
    it('should return an array containing .gitignore plus the IDs and status 200', done => {
      superagent.get(`${baseURL}/api/games`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceof(Array);
        expect(res.body.indexOf(this.tempGameId)).to.not.equal(-1);
        done();
      })
      .catch(done);
    });
  });
  describe('testing DELETE /api/games/:id', function() {
    before(done => {
      superagent.post(`${baseURL}/api/games`)
      .send(mockData)
      .then(res => {
        this.tempGameId = res.body.id;
        done();
      })
      .catch(done);
    });
    it('valid id should delete item and return status 204', done => {
      superagent.delete(`${baseURL}/api/games/${this.tempGameId}`)
      .then(res => {
        expect(res.statusCode).to.equal(204);
        done();
      })
      .catch(done);
    });
    it('invalid id should return status 404', done => {
      superagent.delete(`${baseURL}/api/games/${this.tempGameId}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
