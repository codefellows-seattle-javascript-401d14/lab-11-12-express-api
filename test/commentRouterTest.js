'use strict';

const superagent = require('superagent');
const expect = require('chai').expect;
const Comment = require('../model/comment.js');
const baseUrl = `http://localhost:${process.env.PORT || 3000}`
require('../server.js');

describe('testing comment router', function(){
  describe('testing POST /api/comments', function(){
    it('shoud create a comment', (done) => {
      superagent.post(`${baseUrl}/api/comments`)
      .send({
        announcer: 'Troy Aikman',
        comment: 'he did a thing',
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Troy Aikman');
        expect(res.body.content).to.equal('he did a thing');
        expect(Boolean(res.body.id)).to.equal(true);
        this.tempComment = res.body;
        done();
      })
      .catch(done)
    })

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
    })

    after((done) => {
      Comment.deleteById(this.tempComment.id)
      .then(() => done())
      .catch(done);
    })
  });


});
