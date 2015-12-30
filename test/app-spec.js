'use strict';
let supertest = require('supertest');
let should = require('should');
let express = require('express');
let app = require('../app');

describe('Upload app test cases', () => {
  it('should should status code 200 without error ', (done) => {
    supertest(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return err;
        res.text.should.match(/Express\sUpload\sFile\sDemo/);
        done();
      });
  });
});
