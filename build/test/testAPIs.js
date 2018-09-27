'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const expect = require('chai').expect;

_chai2.default.use(_chaiHttp2.default);
// chai.use(require('chai-http'));

// const chai = require('chai');

// const assert = require('assert');

//const app = require('../index.js');

var jwtToken = void 0;
var adminJwtToken = void 0;

describe('Userstest with chai http', function () {
  this.timeout(5000);

  it('Home page should. return status code of 200', function () {
    return _chai2.default.request(_index2.default).get('/').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('signin page return status code of 200', function () {
    return _chai2.default.request(_index2.default).get('/signin').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('user authentication - user not found', function () {
    return _chai2.default.request(_index2.default).get('/signin/username/password').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.userFound).to.equal(false);
    });
  });

  it('user authentication - user found', function () {
    return _chai2.default.request(_index2.default).get('/signin/McDave/pword').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.userFound).to.equal(true);
      jwtToken = res.body.token;
    });
  });

  it('signup page return status code of 200', function () {
    return _chai2.default.request(_index2.default).get('/signup').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('signin up a new user', function () {
    return _chai2.default.request(_index2.default).post('/signup').send({
      fname: 'Peter',
      sname: 'Mark',
      phone: '08098273465',
      username: 'peter007',
      pword: 'm@rkp3t3r'
    }).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.fname).to.equal('Peter');
    });
  });

  it('menu page return status code of 200', function () {
    return _chai2.default.request(_index2.default).get('/menu').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('api endpoint for list of food', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/menu').set('authorization', 'Bearer ' + jwtToken).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('getting a users order history', function () {
    return _chai2.default.request(_index2.default).get('/orders').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('api endpoint for getting users orders', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/ausername').set('authorization', 'Bearer ' + jwtToken).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('getting a users specific order history', function () {
    return _chai2.default.request(_index2.default).get('/orders/orderid').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('api endpoint for getting users specific order', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/order/orderid').set('authorization', 'Bearer ' + jwtToken).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('api for placing a new order', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/placeOrder/Peter').set('authorization', 'Bearer ' + jwtToken).send({
      body: [{ food: 'Rice', price: '350', quantity: '1' }]
    }).then(function (res) {
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('messages page, status expected to be 200', function () {
    return _chai2.default.request(_index2.default).get('/messages').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('api endpoint for getting a users messages', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/messages/McDave').set('authorization', 'Bearer ' + jwtToken).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('api endpoint for sending message to admin', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/messages/Peter').set('authorization', 'Bearer ' + jwtToken).send({
      sender: 'Peter',
      message: 'Hello Hi, am MI my low is high..'
    }).then(function (res) {
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });
});

// ADMIN

describe('ADMIN API TESTS', function () {
  this.timeout(5000);

  it('get to admins login page', function () {
    return _chai2.default.request(_index2.default).get('/admin').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('login in an admin', function () {
    return _chai2.default.request(_index2.default).post('/admin').send({
      uname: 'sergio',
      pword: 'ramos'
    }).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.userFound).to.equal(true);
      adminJwtToken = res.body.token;
    });
  });

  it('get to admins dashboard', function () {
    return _chai2.default.request(_index2.default).get('/admin/admindashboard').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('api for getting list of orders', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/admin/orders').set('authorization', 'Bearer ' + adminJwtToken).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('admin - get a users specific order', function () {
    return _chai2.default.request(_index2.default).get('/admin/userorders/orderid').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('api for getting users orders', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/admin/userorders/orderID').set('authorization', 'Bearer ' + adminJwtToken).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('api updating user orders status', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/admin/orders/orderID').set('authorization', 'Bearer ' + adminJwtToken).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('admin - get food lists and details', function () {
    return _chai2.default.request(_index2.default).get('/admin/foodlist').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('admin - api for getting food list', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/admin/foodlists').set('authorization', 'Bearer ' + adminJwtToken).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('admin - add food', function () {
    return _chai2.default.request(_index2.default).get('/admin/addfood').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('admin - api endpoint for adding food', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/admin/addfood').set('authorization', 'Bearer ' + adminJwtToken).send({
      foodName: 'Rice',
      foodPrice: '350',
      foodDesc: ' a way to advertise and describe the food'
    }).then(function (res) {
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('admin - edit food', function () {
    return _chai2.default.request(_index2.default).get('/admin/editfood').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('admin - api for getting food details to edit', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/admin/food/foodName').set('authorization', 'Bearer ' + adminJwtToken).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('api updating user orders status', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/admin/editfood').set('authorization', 'Bearer ' + adminJwtToken).send({
      foodName: 'Rice',
      foodPrice: '1050',
      foodDesc: ' a way to advertise and describe the food'
    }).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('admin - delete food', function () {
    return _chai2.default.request(_index2.default).get('/admin/deletefood').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('admin - api for deleting a food from the menu', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/admin/deletefood').set('authorization', 'Bearer ' + adminJwtToken).send({
      foodName: 'Rice'
    }).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('admin - messages', function () {
    return _chai2.default.request(_index2.default).get('/admin/messages').then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });

  it('admin - api for getting messages', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/admin/messages').set('authorization', 'Bearer ' + adminJwtToken).then(function (res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('admin - api for sending message to customers', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/admin/messages').set('authorization', 'Bearer ' + adminJwtToken).send({
      receiver: 'McDave',
      message: ' a way to advertise and describe the food'
    }).then(function (res) {
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
  });

  it('404 Page', function () {
    return _chai2.default.request(_index2.default).get('/xyz').then(function (res) {
      (0, _chai.expect)(res).to.have.status(404);
    });
  });
});