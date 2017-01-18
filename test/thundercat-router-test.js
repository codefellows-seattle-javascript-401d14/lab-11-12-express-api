'use strict';

require('dotenv').load();
const superagent = require('superagent'); // AJAX library
const expect = require('chai').expect;
const storage = require('../lib/storage.js');

const Thundercat = require('../model/thundercat.js');

const baseUrl = `http://localhost:${process.env.PORT || 3000}`
require('../server.js');

describe('testing thundercat router', function(){
  describe('testing POST /api/thundercats', function(){
    after((done) => {
      Thundercat.deleteById(this.tempKitty.id)
      .then(() => done())
      .catch(done);
    });

    it('shoud create a thundercat', (done) => {
      superagent.post(`${baseUrl}/api/thundercats`)
      .send({
        name: 'lion-o',
        origin: 'thundera',
        group: 'thundercats',
      })
      .then(res => {
        this.tempKitty = res.body;
        console.log('res.body: ' + res.body);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('lion-o');
        expect(res.body.origin).to.equal('thundera');
        expect(res.body.group).to.equal('thundercats');
        expect(Boolean(res.body.id)).to.equal(true);
        // this.tempKitty.id = res.body.id;
        done();
      })
      .catch(done)
    });

    it('should return 400 status code', (done) => {
      superagent.post(`${baseUrl}/api/thundercats`)
      .send({
        title: 'lunatacs',
      })
      .then(done) // call done(res) to tell mocah that success is an error
      .catch(err=> {
        expect(err.status).to.equal(400);
        done(); // call done() with nothing to tell mocha that the test was a success
      })
      .catch(done); // call done(err) to print any error messages from expect statments
    });
  });
});








// const expect = require('chai').expect;
// const superagent = require('superagent');
// const Thundercat = require('../model/thundercat.js');
// const storage = require('../lib/storage.js');
//
// const apiURL = `http://localhost:${process.env.PORT || 3000}`;
// require('../server.js');
//
// describe('testing /api/thundercats', function(){
//   describe('testing POST', function(){
//     describe('with valid input', function(){
//       it('should return a thundercat', (done) => {
//         superagent.post(`${apiURL}/api/thundercats`)
//         .send({
//           name: 'lion-o',
//           origin: 'thundera',
//           group: 'thundercats',
//         })
//         .then(res => {
//           expect(res.status).to.equal(200);
//           expect(res.body.name).to.equal('lion-o');
//           expect(res.body.origin).to.equal('thundera');
//           expect(res.body.group).to.equal('thundercats');
//           expect(Boolean(res.body.id)).to.equal(true);
//           done();
//         })
//         .catch(done);
//       });
//     });
//
//     describe('with invalid input', function(){
//     });
//   });
//
//   describe('testing GET', function(){
//     describe('with valid input', function(){
//       // mock thundercat for testing. Not a true thundera castaway
      // before((done) => {
      //   this.tempKitty = new Thundercat({name: 'snarf', origin: 'thundera', group: 'thundercats'});
      //   storage.setItem('thundercats', this.tempKitty)
      //   .then(() => done())
      //   .catch(done);
//       });
//
//       it('should return a thundercat', (done) => {
//         superagent.get(`${apiURL}/api/thundercats?id=${this.tempKitty.id}`)
//         .then(res => {
//           expect(res.status).to.equal(200);
//           expect(res.body.name).to.equal('snarf');
//           expect(res.body.origin).to.equal('thundera');
//           expect(res.body.group).to.equal('thundercats');
//           expect(res.body.name).to.equal(this.tempKitty.name);
//           expect(res.body.origin).to.equal(this.tempKitty.origin);
//           expect(res.body.group).to.equal(this.tempKitty.group);
//           expect(res.body.id).to.equal(this.tempKitty.id);
//           expect(Boolean(res.body.id)).to.equal(true);
//           done();
//         })
//         .catch(done);
//       });
//     });
//   });
// });
