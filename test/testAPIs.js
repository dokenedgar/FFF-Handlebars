'use strict';

const assert = require('assert');

const expect = require('chai').expect;
// const { expect } = require('chai');

const chai = require('chai');
chai.use(require('chai-http'));
const app = require('../index.js');

let jwtToken;
let adminJwtToken;

describe('Userstest with chai http', function () {
  this.timeout(5000);

  it('Home page should. return status code of 200', () => {
    return chai.request(app)
      .get('/')
      .then( (res) => {
        expect(res).to.have.status(200);
      });
  });

  it('signin page return status code of 200', () => {
    return chai.request(app)
      .get('/signin')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('user authentication - user not found', () => {
    return chai.request(app)
      .get('/signin/username/password')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.userFound).to.equal(false);
      });
  });

  it('user authentication - user found', () => {
    return chai.request(app)
      .get('/signin/McDave/pword')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.userFound).to.equal(true);
        jwtToken = res.body.token;
      });
  });

  it('signup page return status code of 200', () => {
    return chai.request(app)
      .get('/signup')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

   it('signin up a new user', () => {
    return chai.request(app)
      .post('/signup')
      .send({
        fname: 'Peter',
        sname: 'Mark',
        phone: '08098273465',
        username: 'peter007',
        pword: 'm@rkp3t3r'
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.fname).to.equal('Peter');
      });
  });

  it('menu page return status code of 200', () => {
    return chai.request(app)
      .get('/menu')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('api endpoint for list of food', () => {
    return chai.request(app)
      .get('/api/v1/menu')
      .set('authorization', `Bearer ${jwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('getting a users order history', () => {
    return chai.request(app)
      .get('/orders')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('api endpoint for getting users orders', () => {
    return chai.request(app)
      .get('/api/v1/orders/ausername')
      .set('authorization', `Bearer ${jwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('getting a users specific order history', () => {
    return chai.request(app)
      .get('/orders/orderid')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('api endpoint for getting users specific order', () => {
    return chai.request(app)
      .get('/api/v1/order/orderid')
      .set('authorization', `Bearer ${jwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('api for placing a new order', () => {
    return chai.request(app)
      .post('/api/v1/placeOrder/Peter')
      .set('authorization', `Bearer ${jwtToken}`)
      .send({
        body: [
          { food: 'Rice', price: '350', quantity: '1' }
        ]        
      })
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
      });
  });

  it('messages page, status expected to be 200', () => {
    return chai.request(app)
      .get('/messages')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('api endpoint for getting a users messages', () => {
    return chai.request(app)
      .get('/api/v1/messages/McDave')
      .set('authorization', `Bearer ${jwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('api endpoint for sending message to admin', () => {
    return chai.request(app)
      .post('/api/v1/messages/Peter')
      .set('authorization', `Bearer ${jwtToken}`)
      .send({
        sender: 'Peter',
        message: 'Hello Hi, am MI my low is high..',
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      });
  });
});


// ADMIN

describe('ADMIN API TESTS', function () {
  this.timeout(5000);

  it('get to admins login page', () => {
    return chai.request(app)
      .get('/admin')
      .then((res) => {
       expect(res).to.have.status(200);
      });
  });

 it('login in an admin', () => {
    return chai.request(app)
      .post('/admin')
      .send({
        uname: 'sergio',
        pword: 'ramos',
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.userFound).to.equal(true);
        adminJwtToken = res.body.token;
      });
  });   

  it('get to admins dashboard', () => {
    return chai.request(app)
      .get('/admin/admindashboard')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

 it('api for getting list of orders', () => {
    return chai.request(app)
      .get('/api/v1/admin/orders')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('admin - get a users specific order', () => {
    return chai.request(app)
      .get('/admin/userorders/orderid')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('api for getting users orders', () => {
    return chai.request(app)
      .get('/api/v1/admin/userorders/orderID')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('api updating user orders status', () => {
    return chai.request(app)
      .put('/api/v1/admin/orders/orderID')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('admin - get food lists and details', () => {
    return chai.request(app)
      .get('/admin/foodlist')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('admin - api for gettiing food list', () => {
    return chai.request(app)
      .get('/api/v1/admin/foodlists')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('admin - add food', () => {
    return chai.request(app)
      .get('/admin/addfood')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('admin - api endpoint for adding food', () => {
    return chai.request(app)
      .post('/api/v1/admin/addfood')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .send({
        foodName: 'Rice',
        foodPrice: '350',
        foodDesc: ' a way to advertise and describe the food'
      })
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
      })
    });

  it('admin - edit food', () => {
    return chai.request(app)
      .get('/admin/editfood')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('admin - api for gettiing food details to edit', () => {
    return chai.request(app)
      .get('/api/v1/admin/food/foodName')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('api updating user orders status', () => {
    return chai.request(app)
      .put('/api/v1/admin/editfood')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .send({
        foodName: 'Rice',
        foodPrice: '1050',
        foodDesc: ' a way to advertise and describe the food'
      })
       .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('admin - delete food', () => {
    return chai.request(app)
      .get('/admin/deletefood')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('admin - api for deleting a food from the menu', () => {
    return chai.request(app)
      .delete('/api/v1/admin/deletefood')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .send({
        foodName: 'Rice'
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('admin - messages', () => {
    return chai.request(app)
      .get('/admin/messages')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('admin - api for getting messages', () => {
    return chai.request(app)
      .get('/api/v1/admin/messages')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('admin - api for sending message to customers', () => {
    return chai.request(app)
      .post('/api/v1/admin/messages')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .send({
        receiver: 'McDave',
        message: ' a way to advertise and describe the food'
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      });
  });

  it('404 Page', () => {
    return chai.request(app)
      .get('/xyz')
      .then((res) => {
        expect(res).to.have.status(404);
      });
  });
});