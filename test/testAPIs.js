'use strict';

//let request = require('request');
let assert = require('assert');

const expect = require('chai').expect;
// const { expect } = require('chai');

const chai = require('chai');
chai.use(require('chai-http'));
const app = require('../index.js');


describe('Userstest with chai http', function () {
  this.timeout(5000);

  it('Home page should. return status code of 200', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });

  it('signin page return status code of 200', function () {
    return chai.request(app)
      .get('/signin')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });

  it('user authentication - user not found', function () {
    return chai.request(app)
      .get('/signin/username/password')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.userFound).to.equal(false);
      });
  });

    it('user authentication - user found', function () {
    return chai.request(app)
      .get('/signin/McDave/pword')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.userFound).to.equal(true);
      });
  });

    it('signup page return status code of 200', function () {
    return chai.request(app)
      .get('/signup')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });

     it('signin up a new user', function () {
    return chai.request(app)
      .post('/signup')
      .send({
        fname: 'Peter',
        sname: 'Mark',
        phone: '08098273465',
        username: 'peter007',
        pword: 'm@rkp3t3r'
      })
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.fname).to.equal('Peter');
      });
  });

     it('menu page return status code of 200', function () {
    return chai.request(app)
      .get('/menu')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });

       it('api endpoint for list of food', function () {
    return chai.request(app)
      .get('/api/v1/menu')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.an('object');
      });
  });

       it('getting a users order history', function () {
    return chai.request(app)
      .get('/orders')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });

     it('api endpoint for getting users orders', function () {
    return chai.request(app)
      .get('/api/v1/orders/ausername')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

       it('getting a users specific order history', function () {
    return chai.request(app)
      .get('/orders/orderid')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });

     it('api endpoint for getting users specific order', function () {
    return chai.request(app)
      .get('/api/v1/order/orderid')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

it('api for placing a new order', function () {
    return chai.request(app)
      .post('/api/v1/placeOrder/Peter')
      .send({
        body: [
        	{food: 'Rice', price: '350', quantity: '1'}
        ]
        
      })
      .then(function (res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
        expect(res.body[0].user).to.equal('Peter');
      });
  });

     it('messages page, status expected to be 200', function () {
    return chai.request(app)
      .get('/messages')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });

      it('api endpoint for getting a users messages', function () {
    return chai.request(app)
      .get('/api/v1/messages/McDave')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].receiver).to.equal('McDave');
      });
  });

     it('api endpoint for sending message to admin', function () {
    return chai.request(app)
      .post('/api/v1/messages/Peter')
      .send({
        sender: 'Peter',
        message: 'Hello Hi, am MI my low is high..',
      })
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.sender).to.equal('Peter');
      });
  });   


});