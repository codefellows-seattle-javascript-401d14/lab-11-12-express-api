'use strict';

require('dotenv').load();
const superagent = require('superagent');
const storage = require('../lib/storage');
const expect = require('chai').expect;
const Comment = require('../model/comment.js');
const baseUrl = `http://localhost:${process.env.PORT || 3000}`;
require('../server.js');

describe('testing comment router', function(){
  describe('testing POST /api/comments', function(){
    after((done) => {
      Comment.deleteById(this.tempComment.id)
      .then(() => done())
      .catch(done);
    });

    it('should create comment', (done) => {
      superagent.post(`${baseUrl}/api/comments`)
      .send({
        announcer: 'Troy Aikman',
        comment: 'He did a thing',
        year: '2017',
      })
      .then(res => {
        console.log(res.body);
        console.log(res.statusCode);
        expect(res.status).to.equal(200);
        expect(res.body.announcer).to.equal('Troy Aikman');
        expect(res.body.comment).to.equal('He did a thing');
        expect(res.body.year).to.equal('2017');
        expect(Boolean(res.body.id)).to.equal(true);
        this.tempComment = res.body;
        done();
      })
      .catch(done);
    });

    it('should return 400 status code', (done) => {
      superagent.post(`${baseUrl}/api/comments`)
      .send({
        announcer: 'Troy Aikman',
      })
      .then(done)
      .catch(err=> {
        console.log(err.status);
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });
});

describe('testing DELETE aka thats so fetch', function(){
  describe('testing DELETE /api/comments:id', function(){
    before((done) => {
      this.tempComment = new Comment({announcer: 'Troy Aikman', comment: 'He did a thing',
        year: '2017' });
      storage.createItem('comments', this.tempComment)
      .then(() => done())
      .catch(done);
    });
    it('should delete a comment', (done) => {
      superagent.delete(`${baseUrl}/api/comments`)
      .send(this.tempComment);
      done();
    });
  });
});

describe('testing GET', function(){
  describe('with valid input', function(){
    before(() => {
      before((done) => {
        this.tempComment = new Comment({announcer: 'Troy Aikman', comment: 'He did a thing',
          year: '2017' });
        storage.createItem('comments', this.tempComment)
        .then(() => done())
        .catch(done);
      });

      it('should return a comment', (done) => {
        console.log(this.tempComment.id, 'hit here?');
        superagent.get(`${baseUrl}/api/comments?id=${this.tempComment.id}`)
          .then(res => {
            console.log(res.body, 'some string');
            console.log(this.tempComment, 'strignigntign');
            expect(res.status).to.equal(200);
            expect(res.body.announcer).to.equal(this.tempComment.announcer);
            expect(res.body.comment).to.equal(this.tempComment.comment);
            expect(res.body.id).to.equal(this.tempComment.id);
            expect(res.body.year).to.equal(this.tempComment.year);
            expect(new Date(res.body.created).toString()).to.equal(this.tempComment.created.toString());
            expect(Boolean(res.body.created)).to.equal(true);
            expect(Boolean(res.body.id)).to.equal(true);
            done();
          })
          .catch(done);
      });
    });
    describe('with invalid input', function(){
      it('should return 400 status code', (done) => {
        superagent.post(`${baseUrl}/api/comments`)
     .send({
       announcer: 'Troy Aikman',
     })
     .then(done)
     .catch(err=> {
       expect(err.status).to.equal(400);
       done();
     })
     .catch(done);
      });
    });
  });
  it('get /api/comments with bad id should return a 404 status', (done) => {
    superagent.get(`${baseUrl}/api/comments?id=54321`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        })
        .catch(done);
  });
});
