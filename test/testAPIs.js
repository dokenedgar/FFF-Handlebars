'use strict';

import { expect } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
chai.use(chaiHttp);
let jwtToken;
let adminJwtToken;

describe('Userstest with chai http', function () {
  this.timeout(5000);

  it('Home page should return status code of 200', () => {
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
      .post('/signin')
      send({
        username: 'peter007',
        password: 'm@rkp3t3r'
      })
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.userFound).to.equal(false);
      });
  });

  it('user authentication - user found', () => {
    return chai.request(app)
      .post('/signin')
      send({
        username: 'McDave',
        password: 'pword'
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.userFound).to.equal(true);
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
        firstname: 'Peter',
        surname: 'Mark',
        phone: '08098273465',
        username: 'peter007',
        password: 'm@rkp3t3r'
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.newUser.firstname).to.equal('Peter');
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
        expect(res.body).to.be.an('object');
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
        expect(res.body).to.be.an('object');
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
      .get('/api/v1/orders/orderid')
      .set('authorization', `Bearer ${jwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      });
  });

  it('api for placing a new order', () => {
    return chai.request(app)
      .post('/api/v1/orders/Peter')
      .set('authorization', `Bearer ${jwtToken}`)
      .send({
        body: [
          { food: 'Rice', price: '350', quantity: '1' }
        ]        
      })
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
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
        expect(res.body).to.be.an('object');
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
        expect(res).to.have.status(201);
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
      .post('/api/v1/admin')
      .send({
        username: 'sergio',
        password: 'ramos',
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.userFound).to.equal(true);
        //adminJwtToken = res.body.token;
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
        expect(res.body).to.be.an('object');
      });
  });

  it('admin - get a users specific order', () => {
    return chai.request(app)
      .get('/admin/orders/orderid')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('api for getting users orders', () => {
    return chai.request(app)
      .get('/api/v1/admin/orders/orderID')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      });
  });

  it('api updating user orders status', () => {
    return chai.request(app)
      .put('/api/v1/admin/orders/orderID')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      });
  });

  it('admin - get food lists and details', () => {
    return chai.request(app)
      .get('/admin/foodlist')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('admin - api for getting food list', () => {
    return chai.request(app)
      .get('/api/v1/admin/foodlists')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
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
      .post('/api/v1/admin/food')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .send({
        foodName: 'Rice',
        foodPrice: '350',
        foodDesc: ' a way to advertise and describe the food'
      })
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
      })
    });

  it('admin - edit food', () => {
    return chai.request(app)
      .get('/admin/editfood')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('admin - api for getting food details to edit', () => {
    return chai.request(app)
      .get('/api/v1/admin/food/foodName')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      });
  });

  it('api updating user orders status', () => {
    return chai.request(app)
      .put('/api/v1/admin/food')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .send({
        foodName: 'Rice',
        foodPrice: '1050',
        foodDesc: ' a way to advertise and describe the food'
      })
       .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
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
      .delete('/api/v1/admin/food')
      .set('authorization', `Bearer ${adminJwtToken}`)
      .send({
        foodName: 'Rice'
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
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
        expect(res.body).to.be.an('object');
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
        expect(res).to.have.status(201);
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