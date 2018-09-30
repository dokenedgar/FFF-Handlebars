'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.json());
var orders = [];

var users = [{
  firstname: 'Yakubu', surname: 'Frank', phone: '12345678900', username: 'Franky', password: 'superfrank'
}, {
  firstname: 'David', surname: 'McKenxie', phone: '09876543211', username: 'McDave', password: 'pword'
}];

var adminUsers = [{ username: 'lionel', password: 'messi' }, { username: 'sergio', password: 'ramos' }];

var foodList = [{ foodName: 'Spaghetti', foodPrice: '350', foodDesc: 'Nicely cooked nigerian-styled spaghetti' }, { foodName: 'Plantain', foodPrice: '100', foodDesc: 'Fresh plantain fried to the perfect degree' }, { foodName: 'Pizza', foodPrice: '1000', foodDesc: 'Freshly baked Pizza, with the finest of ingredients' }, { foodName: 'Burger', foodPrice: '500', foodDesc: 'Delicious burgers from our seasoned chef' }, { foodName: 'Hot Dog', foodPrice: '300', foodDesc: 'Fresh Hot dogs' }, { foodName: 'Doughnut', foodPrice: '100', foodDesc: 'Soft and doughnut' }, { foodName: 'Fried Chicken', foodPrice: '400', foodDesc: 'Tasty chicken fried to the right degree and right oil' }, { foodName: 'Chips', foodPrice: '250', foodDesc: 'Soft and crisp chips!' }, { foodName: 'Fried Eggs', foodPrice: '150', foodDesc: 'Quality fried eggs, from healthy chickens with amazing spices' }, { foodName: 'Bacon', foodPrice: '650', foodDesc: 'Fine bacon from the healthiest of animals' }];
var messagesToAdmin = [];
var messagesFromAdmin = [{ receiver: 'McDave', message: 'Order received' }, { receiver: 'Franky', message: 'Your order of Rice and burger of Monday 4th April has been completed. Thank you for using our service' }, { receiver: 'Franky', message: 'Order accepted' }, { receiver: 'McDave', message: 'Welcome to Fast Food Fast. Thank you for registering and we hope you have a wonderful experience with us' }];

app.use(_express2.default.static(_path2.default.join(__dirname, '../public/css/')));
app.use(_express2.default.static(_path2.default.join(__dirname, '../public/images/')));
app.use(_express2.default.static(_path2.default.join(__dirname, '/public/')));

app.set('port', process.env.PORT || 3000);

// ROUTES
app.get('/', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/index.html'));
});

app.get('/signin', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/signin.html'));
});

app.post('/signin', function (req, res) {
  var result = { userFound: false };
  var signInUser = {
    username: req.body.username, password: req.body.password
  };

  users.forEach(function (element) {
    if (element.username === signInUser.username && element.password === signInUser.password) {
      res.status(200);
      result.userFound = true;
      res.send(result);
    }
  });

  if (!result.userFound) {
    res.status(400);
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
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/signup.html'));
});

app.post('/signup', function (req, res) {
  var newUser = {
    firstname: req.body.firstname, surname: req.body.surname, phone: req.body.phone, username: req.body.username, password: req.body.password
  };
  users.push(newUser);
  var response = { success: true, message: 'New user registered', newUser: newUser };
  res.send(response);
});

app.get('/logout', function (req, res) {
  res.render('logout', { layout: null });
});

app.get('/menu', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/dashboard.html'));
});

app.get('/menu/api/v1/menu', function (req, res) {
  res.status(200);
  var responseObj = { message: 'food items on this platform', numberOfItems: foodList.length, foodList: foodList };
  res.send(responseObj);
});

app.get('/api/v1/menu', function (req, res) {
  res.status(200);
  var responseObj = { message: 'food items on this platform', numberOfItems: foodList.length, foodList: foodList };
  res.send(responseObj);
});

// html for getting all orders by a user
app.get('/orders', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/history.html'));
});
// api for getting all orders made by a user
app.get('/api/v1/orders/:user', function (req, res) {
  var order = [];
  orders.forEach(function (element, index) {
    if (element.user === req.params.user) {
      order = order.concat(element);
    }
  });
  if (order.length > 0) {
    var responseObj = { message: 'Items found for this user', numberOfItems: order.length, order: order };
    res.send(responseObj);
  } else {
    var _responseObj = { message: 'Sorry, this user has not made any orders yet..', order: order };
    res.send(_responseObj);
  }
});

// html for getting specific orders using order id, its api is below it
app.get('/orders/:id', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/getorder.html'));
});

app.get('/api/v1/orders/:id', function (req, res) {
  var order = [];
  res.status(200);
  orders.forEach(function (element, index) {
    if (element.orderID === req.params.id) {
      order = order.concat(element);
    }
  });
  if (order.length > 0) {
    var responseObj = { message: 'Items found with this ID', numberOfItems: order.length, order: order };
    res.send(responseObj);
  } else {
    var _responseObj2 = { message: 'No item found with this Order ID..', order: order };
    res.send(_responseObj2);
  }
});

// PLACE AN ORDER
app.post('/api/v1/orders/:user', function (req, res) {
  var orderId = Math.floor(Math.random() * 12345);
  var newOrder = {
    orderID: orderId + req.params.user, user: req.params.user, order: req.body, status: 'pending'
  };
  orders.push(newOrder);
  res.status(201);
  var responseObj = { message: 'Order placed successfully', newOrder: newOrder };
  res.send(responseObj);
});

app.get('/messages', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/messages.html'));
});

app.get('/api/v1/messages/:user', function (req, res) {
  var messages = [];
  res.status(200);
  messagesFromAdmin.forEach(function (element, index) {
    if (element.receiver === req.params.user) {
      messages = messages.concat(element);
    }
  });
  if (messages.length > 0) {
    var responseObj = { message: 'messages found for this user', numberOfMessages: messages.length, messages: messages };
    res.send(responseObj);
  } else {
    var _responseObj3 = { message: 'No messages yet for this user..', messages: messages };
    res.send(_responseObj3);
  }
});

app.post('/api/v1/messages/:user', function (req, res) {
  res.status(201);
  var newMessage = {
    sender: req.body.sender, message: req.body.message
  };
  messagesToAdmin.push(newMessage);
  var responseObj = { message: 'Message sent successfully', newMessage: newMessage };
  res.send(responseObj);
});

// ADMIN
app.get('/admin', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/adminsignin.html'));
});

app.post('/api/v1/admin', function (req, res) {
  var result = { userFound: false };
  var signInUser = {
    username: req.body.username, password: req.body.password
  };
  adminUsers.forEach(function (element) {
    if (element.username === signInUser.username && element.password === signInUser.password) {
      result.userFound = true;
      result.message = 'Valid login details';
      res.status(200);
      res.send(result);
    }
  });

  if (!result.userFound) {
    res.status(200);
    result.message = 'Login not successful. Check your login details';
    res.send(result);
  }
});

app.get('/admin/admindashboard', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/admindashboard.html'));
});

app.get('/api/v1/admin/orders', function (req, res) {
  res.status(200);
  if (orders.length > 0) {
    var responseObj = { message: 'Number of orders received', numberOfOrders: orders.length, orders: orders };
    res.send(responseObj);
  } else {
    var _responseObj4 = { message: 'No orders received yet...', orders: orders };
    res.send(_responseObj4);
  }
});

// GET A USERS ORDERS
app.get('/admin/orders/:orderid', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/userorders.html'));
});

app.get('/api/v1/admin/orders/:orderid', function (req, res) {
  var order = [];
  res.status(200);
  orders.forEach(function (element, index) {
    if (element.orderID === req.params.order) {
      order = order.concat(element);
    }
  });
  if (order.length > 0) {
    var responseObj = { message: 'Orders for user, with order ID ' + req.params.order, numberOfItemsInOrder: order[2].length, order: order };
    res.send(responseObj);
  } else {
    var _responseObj5 = { numberOfOrders: 'No orders for this orderID. Please check whether the order ID is correct.', order: order };
    res.send(_responseObj5);
  }
});

// Update status of an order
app.put('/api/v1/admin/orders/:id', function (req, res) {
  var order = [];
  res.status(200);
  orders.forEach(function (element, index) {
    if (element.orderID === req.params.id) {
      element.status = req.body.status;
      order = order.concat(element);
    }
  });
  if (order.length > 0) {
    var responseObj = { message: 'status updated successfully', order: order };
    res.send(responseObj);
  } else {
    var _responseObj6 = { message: 'No orders for this orderID. Please check whether the order ID is correct.', order: order };
    res.send(_responseObj6);
  }
});

// FOOD LIST
app.get('/admin/foodlist', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/adminfoodlist.html'));
});

app.get('/api/v1/admin/foodlists', function (req, res) {
  res.status(200);
  var responseObj = { numberOfFoodItems: foodList.length, foodList: foodList };
  res.send(responseObj);
});

// ADD FOOD
app.get('/admin/addfood', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/adminaddfood.html'));
});

app.post('/api/v1/admin/food', function (req, res) {
  var newFood = {
    foodName: req.body.foodName, foodPrice: req.body.foodPrice, foodDesc: req.body.foodDesc
  };
  if (newFood.foodName === '') {
    res.status(400);
    var _responseObj7 = { message: 'request not successful' };
    res.send(_responseObj7);
  }
  foodList.push(newFood);
  res.status(201);
  var responseObj = { message: 'Food added successfully', foodList: foodList };
  res.send(responseObj);
});

// EDIT A FOOD DETAILS
app.get('/admin/editfood', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/admineditfood.html'));
});

app.get('/api/v1/admin/food/:name', function (req, res) {
  var order = [];

  foodList.forEach(function (element, index) {
    if (element.foodName === req.params.name) {
      order = order.concat(element);
    }
  });
  res.status(200);
  if (order.length > 0) {
    var responseObj = { message: 'Food to be edited', order: order };
    res.send(responseObj);
  } else {
    var _responseObj8 = { message: 'Problem loading food details, check food name', order: order };
    res.send(_responseObj8);
  }
});

app.put('/api/v1/admin/food', function (req, res) {
  var order = [];
  foodList.forEach(function (element, index) {
    if (element.foodName === req.body.foodName) {
      element.foodPrice = req.body.foodPrice;
      element.foodDesc = req.body.foodDesc;
      order = order.concat(element);
    }
  });
  res.status(200);
  if (order.length > 0) {
    var responseObj = { message: 'Food details edited successfully', order: order };
    res.send(responseObj);
  } else {
    var _responseObj9 = { message: 'Problem updating food, check food name', order: order };
    res.send(_responseObj9);
  }
});

// DELETE FOOD =================================================>
app.get('/admin/deletefood', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/admindeletefood.html'));
});
app.delete('/api/v1/admin/food', function (req, res) {
  var deleteSuccess = false;
  foodList.forEach(function (element, index) {
    if (element.foodName === req.body.foodName) {
      foodList.splice(index, 1);
      deleteSuccess = true;
    }
  });

  if (deleteSuccess) {
    res.status(200);
    var responseObj = { message: 'Food item deleted successfully', foodList: foodList };
    res.send(responseObj);
  } else {
    var _responseObj10 = { message: 'Problem deleting food item, check food name', foodName: res.body.foodName };
    res.send(_responseObj10);
  }
});
// ==========================================================>


// GET MESSAGES
app.get('/admin/messages', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/adminmessages.html'));
});

app.get('/api/v1/admin/messages', function (req, res) {

  res.status(200);
  if (messagesToAdmin.length > 0) {
    var responseObj = { message: 'messages received by the admin', numberOfMessages: messagesToAdmin.length, messagesToAdmin: messagesToAdmin };
    res.send(responseObj);
  } else {
    var _responseObj11 = { message: 'No messages yet from customers!', numberOfMessages: messagesToAdmin.length, messagesToAdmin: messagesToAdmin };
    res.send(_responseObj11);
  }
});

app.post('/api/v1/admin/messages', function (req, res) {
  var result = { userFound: false };
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
    res.status(201);
    result.message = 'Message sent successfully';
    res.send(result);
  } else {
    result.message = 'Problem with sending message.';
    res.send(result);
  }
});

// custom 404 page
app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(app.get('port'));

exports.default = app;