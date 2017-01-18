'use strict';

require('dotenv').load();
const superagent = require('superagent');
const expect = require('chai').expect;
const Pokemon = require('../model/pokemon.js');
const baseURL = `http://localhost:${process.env.PORT || 3000}`;
require('../server.js');

describe('testing pokemon router', function() {
  let tempPokemon = {
    name: 'Ivysaur',
    type: 'grass',
    moves:'cut',
  };
  describe('testing POST /api/pokemon', function() {
    after(done => {
      Pokemon.deleteById(this.tempPokemonId)
      .then(() => done())
      .catch(done);
    });
    it('valid input should create a game with status 200', done => {
      superagent.post(`${baseURL}/api/games`)
      .send(tempPokemon)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Ivysaur');
        expect(res.body.type).to.equal('grass');
        expect(Boolean(res.body.id)).to.equal(true);
        this.tempPokemonId = res.body.id;
        done();
      })
      .catch(done);
    });
    it('invalid input should return 400 status code', done => {
      superagent.post(`${baseURL}/api/pokemon`)
      .send({name: 'Charizard'})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });
  describe('testing GET /api/pokemon/:id', function() {
    before(done => {
      superagent.post(`${baseURL}/api/pokemon`)
      .send(tempPokemon)
      .then(res => {
        this.tempPokemonId = res.body.id;
        done();
      })
      .catch(done);
    });
    after(done => {
      Pokemon.deleteById(this.tempPokemonId)
      .then(() => done())
      .catch(done);
    });
    it('valid id should return a pokemon', done => {
      superagent.get(`${baseURL}/api/pokemon/${this.tempPokemonId}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Ivysaur');
        expect(res.body.type).to.equal('grass');
        expect(Boolean(res.body.id)).to.equal(true);
        done();
      })
      .catch(done);
    });
    it('invalid id should return status 404', done => {
      superagent.get(`${baseURL}/api/pokemon/66`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('testing GET /api/pokemon', function() {
    before(done => {
      superagent.post(`${baseURL}/api/pokemon`)
      .send(tempPokemon)
      .then(res => {
        this.tempPokemonId = res.body.id;
        done();
      })
      .catch(done);
    });
    after(done => {
      Pokemon.deleteById(this.tempPokemonId)
      .then(() => done())
      .catch(done);
    });
    it('should return an array containing  the IDs', done => {
      superagent.get(`${baseURL}/api/pokemon`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceof(Array);
        done();
      })
      .catch(done);
    });
  });
  describe('testing DELETE /api/pokemon/:id', function() {
    before(done => {
      superagent.post(`${baseURL}/api/pokemon`)
      .send(tempPokemon)
      .then(res => {
        this.tempPokemonId = res.body.id;
        done();
      })
      .catch(done);
    });
    it('valid id should delete pokemon', done => {
      superagent.delete(`${baseURL}/api/pokemon/${this.tempPokemonId}`)
      .then(res => {
        expect(res.statusCode).to.equal(204);
        done();
      })
      .catch(done);
    });
    it('invalid id should return status 404', done => {
      superagent.delete(`${baseURL}/api/pokemon/66`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
