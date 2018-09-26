'use strict';

var express = require('express');
var app = express();
var path = require('path');
var jwt = require('jsonwebtoken');
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.json());

var orders = [];

var users = [{
  fname: 'Yakubu', sname: 'Frank', phone: '12345678900', username: 'Franky', pword: 'superfrank'
}, {
  fname: 'David', sname: 'McKenxie', phone: '09876543211', username: 'McDave', pword: 'pword'
}];
var adminUsers = [{ username: 'lionel', password: 'messi' }, { username: 'sergio', password: 'ramos' }];

var foodList = [{ foodName: 'Spaghetti', foodPrice: '350', foodDesc: 'Nicely cooked nigerian-styled spaghetti' }, { foodName: 'Plantain', foodPrice: '100', foodDesc: 'Fresh plantain fried to the perfect degree' }, { foodName: 'Pizza', foodPrice: '1000', foodDesc: 'Freshly baked Pizza, with the finest of ingredients' }, { foodName: 'Burger', foodPrice: '500', foodDesc: 'Delicious burgers from our seasoned chef' }, { foodName: 'Hot Dog', foodPrice: '300', foodDesc: 'Fresh Hot dogs' }, { foodName: 'Doughnut', foodPrice: '100', foodDesc: 'Soft and doughnut' }, { foodName: 'Fried Chicken', foodPrice: '400', foodDesc: 'Tasty chicken fried to the right degree and right oil' }, { foodName: 'Chips', foodPrice: '250', foodDesc: 'Soft and crisp chips!' }, { foodName: 'Fried Eggs', foodPrice: '150', foodDesc: 'Quality fried eggs, from healthy chickens with amazing spices' }, { foodName: 'Bacon', foodPrice: '650', foodDesc: 'Fine bacon from the healthiest of animals' }];
var messagesToAdmin = [];
var messagesFromAdmin = [{ receiver: 'McDave', message: 'Order received' }, { receiver: 'Franky', message: 'Your order of Rice and burger of Monday 4th April has been completed. Thank you for using our service' }, { receiver: 'Franky', message: 'Order accepted' }, { receiver: 'McDave', message: 'Welcome to Fast Food Fast. Thank you for registering and we hope you have a wonderful experience with us' }];

app.use(express.static(path.join(__dirname, '/public')));
app.set('port', process.env.PORT || 3000);

// Middleware gets called for all routes starting with /api
// Inorder to check for the presence of a token
app.use('/api', verifyToken);

app.get('/', function (req, res) {
  res.render('index', { layout: 'guest', user: { guest: true }, menu: JSON.stringify(foodList) });
});

app.get('/signin', function (req, res) {
  res.render('signin', { layout: 'guest' });
});

app.get('/signin/:uname/:pword', function (req, res) {
  var result = { userFound: false };
  var signInUser = {
    username: req.params.uname, password: req.params.pword
  };

  users.forEach(function (element) {
    if (element.username === signInUser.username && element.pword === signInUser.password) {
      result.userFound = true;
      // Create jwt token for the user
      jwt.sign({ signInUser: signInUser }, 'tre-lala', function (err, token) {
        // result.token = token;
        result.token = token;
        res.send(result);
      });
    }
  });

  if (!result.userFound) {
    res.send(result);
  }
});

// ===================VERIFY TOKEN========================>
function verifyToken(req, res, next) {
  var bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
    var bearerToken = bearer[1];
    req.token = bearerToken;
    // Add verification of the token here as well.
    // Such that when the route is finally reached, just send back the data
    next();
  } else {
    res.sendStatus(403);
  }
}
// =======================================================>

app.get('/signup', function (req, res) {
  res.render('signup', { layout: 'guest' });
});

app.post('/signup', function (req, res) {
  var newUser = {
    fname: req.body.fname, sname: req.body.sname, phone: req.body.phone, username: req.body.username, pword: req.body.pword
  };
  users.push(newUser);
  res.send(newUser);
});

app.get('/logout', function (req, res) {
  res.render('logout', { layout: null });
});

app.get('/menu', function (req, res) {
  res.render('dashboard');
});

app.get('/menu/api/v1/menu', function (req, res) {
  res.send(foodList);
});

app.get('/api/v1/menu', function (req, res) {
  jwt.verify(req.token, 'tre-lala', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.send(foodList);
    }
  });
});

// html for getting all orders by a user
app.get('/orders', function (req, res) {
  res.render('history');
});
// appi for getting all orders made by a user
app.get('/api/v1/orders/:user', function (req, res) {
  var order = [];
  jwt.verify(req.token, 'tre-lala', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      orders.forEach(function (element, index) {
        if (element.user === req.params.user) {
          order = order.concat(element);
        }
      });
      res.send(order);
    }
  });
});

// html for getting specific orders using order id, its api is below it
app.get('/orders/:id', function (req, res) {
  res.render('getorder');
});

app.get('/api/v1/order/:id', function (req, res) {
  var order = [];

  jwt.verify(req.token, 'tre-lala', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      orders.forEach(function (element, index) {
        if (element.orderID === req.params.id) {
          order = order.concat(element);
        }
      });
      res.send(order);
    }
  });
});

// PLACE AN ORDER
app.post('/api/v1/placeOrder/:user', function (req, res) {
  //  console.log(req.body);

  jwt.verify(req.token, 'tre-lala', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      var orderId = Math.floor(Math.random() * 12345);
      var newOrder = {
        orderID: orderId + req.params.user, user: req.params.user, order: req.body, status: 'pending'
      };
      orders.push(newOrder);
      res.status(201);
      res.send(orders);
    }
  });
});

app.get('/messages', function (req, res) {
  res.render('messages');
});

app.get('/api/v1/messages/:user', function (req, res) {
  var msgs = [];
  jwt.verify(req.token, 'tre-lala', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      messagesFromAdmin.forEach(function (element, index) {
        if (element.receiver === req.params.user) {
          msgs = msgs.concat(element);
        }
      });
      res.send(msgs);
    }
  });
});

app.post('/api/v1/messages/:user', function (req, res) {
  jwt.verify(req.token, 'tre-lala', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      var newMsg = {
        sender: req.body.sender, message: req.body.message
      };
      messagesToAdmin.push(newMsg);
      res.send(newMsg);
    }
  });
});

// ADMIN
app.get('/admin', function (req, res) {
  res.render('adminsignin', { layout: null });
});

app.post('/admin', function (req, res) {
  var result = { userFound: false };
  var signInUser = {
    username: req.body.uname, password: req.body.pword
  };
  adminUsers.forEach(function (element) {
    if (element.username === signInUser.username && element.password === signInUser.password) {
      result.userFound = true;
      jwt.sign({ signInUser: signInUser }, 'admin-sec-key', function (err, token) {
        result.token = token;
        res.send(result);
      });
    }
  });

  if (!result.userFound) {
    res.send(result);
  }
});

app.get('/admin/admindashboard', function (req, res) {
  res.render('admindashboard', { layout: 'admin' });
});

app.get('/api/v1/admin/orders', function (req, res) {
  jwt.verify(req.token, 'admin-sec-key', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.send(orders);
    }
  });
});

// GET A USERS ORDERS
app.get('/admin/userorders/:order', function (req, res) {
  res.render('userorders', { layout: 'admin' });
});

app.get('/api/v1/admin/userorders/:order', function (req, res) {
  var order = [];

  jwt.verify(req.token, 'admin-sec-key', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      orders.forEach(function (element, index) {
        if (element.orderID === req.params.order) {
          order = order.concat(element);
        }
      });
      res.send(order);
    }
  });
});

// Update status of an order
app.put('/api/v1/admin/orders/:id', function (req, res) {
  var order = [];
  jwt.verify(req.token, 'admin-sec-key', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      orders.forEach(function (element, index) {
        if (element.orderID === req.params.id) {
          element.status = req.body.status;
          order = order.concat(element);
        }
      });
      res.send(order);
    }
  });
});

// FOOD LIST
app.get('/admin/foodlist', function (req, res) {
  res.render('adminfoodlist', { layout: 'admin' });
});

app.get('/api/v1/admin/foodlists', function (req, res) {
  jwt.verify(req.token, 'admin-sec-key', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.send(foodList);
    }
  });
});

// ADD FOOD
app.get('/admin/addfood', function (req, res) {
  res.render('adminaddfood', { layout: 'admin' });
});

app.post('/api/v1/admin/addfood', function (req, res) {
  jwt.verify(req.token, 'admin-sec-key', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      var newFood = {
        foodName: req.body.foodName, foodPrice: req.body.foodPrice, foodDesc: req.body.foodDesc
      };
      foodList.push(newFood);
      res.status(201);
      res.send(foodList);
    }
  });
});

// EDIT A FOOD DETAILS
app.get('/admin/editfood', function (req, res) {
  res.render('admineditfood', { layout: 'admin' });
});

app.get('/api/v1/admin/food/:name', function (req, res) {
  var order = [];
  jwt.verify(req.token, 'admin-sec-key', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      foodList.forEach(function (element, index) {
        if (element.foodName === req.params.name) {
          order = order.concat(element);
        }
      });
      res.send(order);
    }
  });
});

app.put('/api/v1/admin/editfood', function (req, res) {
  var order = [];
  jwt.verify(req.token, 'admin-sec-key', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      foodList.forEach(function (element, index) {
        if (element.foodName === req.body.foodName) {
          element.foodPrice = req.body.foodPrice;
          element.foodDesc = req.body.foodDesc;
          order = order.concat(element);
        }
      });
      res.send(order);
    }
  });
});

// DELETE FOOD =================================================>
app.get('/admin/deletefood', function (req, res) {
  res.render('admindeletefood', { layout: 'admin' });
});
app.delete('/api/v1/admin/deletefood', function (req, res) {

  jwt.verify(req.token, 'admin-sec-key', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      foodList.forEach(function (element, index) {
        if (element.foodName === req.body.foodName) {
          foodList.splice(index, 1);
        }
      });
      res.send(foodList);
    }
  });
});
// ==========================================================>


// GET MESSAGES
app.get('/admin/messages', function (req, res) {
  res.render('adminmessages', { layout: 'admin' });
});

app.get('/api/v1/admin/messages', function (req, res) {
  jwt.verify(req.token, 'admin-sec-key', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.send(messagesToAdmin);
    }
  });
});

app.post('/api/v1/admin/messages', function (req, res) {
  var result = { userFound: false };
  jwt.verify(req.token, 'admin-sec-key', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    } else {
      users.forEach(function (element) {
        if (element.username === req.body.receiver) {
          result.userFound = true;
        }
      });

      if (result.userFound) {
        var newMsg = {
          receiver: req.body.receiver, message: req.body.message
        };
        messagesFromAdmin.push(newMsg);
      }

      res.send(result);
    }
  });
});

// custom 404 page
app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:\n' + app.get('port') + '; press Ctrl-C to terminate.');
});

// app.listen(app.get('port'), 'localhost');
module.exports = app;