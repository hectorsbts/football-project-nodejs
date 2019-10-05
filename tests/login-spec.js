'use strict';

const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Testing Interns API.', () => {
  
  describe('Testing Login errors.', () => {
    let body = {
      email: 5,
      password: '1234',
    };

    it('Should returns an error when the body is empty.', (done) => {
      chai.request(app)
      .post('/api/user/login')
      .set('accept-language', 'en')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.be.an('string');
        res.body.message.should.be.an('string');
        done()
      });
    }).timeout(10000);

    it('Should returns an error when the email is a number.', (done) => {
      chai.request(app)
      .post('/api/user/login')
      .set('accept-language', 'en')
      .send(body)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.be.an('string');
        res.body.message.should.be.an('string');
        done()
      });
    }).timeout(10000);

    it('Should returns an error when the password is not exists.', (done) => {
      delete body.password;
      chai.request(app)
      .post('/api/user/login')
      .set('accept-language', 'en')
      .send(body)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.be.an('string');
        res.body.message.should.be.an('string');
        done()
      });
    }).timeout(10000);

    it('Should returns an error when the userName and the password are empty.', (done) => {
      body.userName = '';
      body.password = '';
      chai.request(app)
      .post('/api/user/login')
      .set('accept-language', 'en')
      .send(body)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.be.an('string');
        res.body.message.should.be.an('string');
        done()
      });
    }).timeout(10000);
  });

  describe('Testing login successful.', () => {
    let body = {
      email: 'retre@ghfg.com',
      password: '1234',
    };

    it('Should returns a success response.', (done) => {
      chai.request(app)
      .post('/api/user/login')
      .set('accept-language', 'en')
      .send(body)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.status.should.be.an('string');
        res.body.message.should.be.an('string');
        res.body.data.should.be.an('object');
        done()
      });
    }).timeout(10000);
  });
});
