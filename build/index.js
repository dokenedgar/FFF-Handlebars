'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _userController = require('./src/controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _adminUserController = require('./src/controllers/adminUserController');

var _adminUserController2 = _interopRequireDefault(_adminUserController);

var _menuController = require('./src/controllers/menuController');

var _menuController2 = _interopRequireDefault(_menuController);

var _ordersController = require('./src/controllers/ordersController');

var _ordersController2 = _interopRequireDefault(_ordersController);

var _messagesController = require('./src/controllers/messagesController');

var _messagesController2 = _interopRequireDefault(_messagesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.json());

app.use(_express2.default.static(_path2.default.join(__dirname, '../public/css/')));
app.use(_express2.default.static(_path2.default.join(__dirname, '../public/images/')));
app.use(_express2.default.static(_path2.default.join(__dirname, '/public/')));

app.set('port', process.env.PORT || 3003);

// ROUTES
app.get('/', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/index.html'));
});

app.get('/signin', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/signin.html'));
});

app.post('/api/v1/auth/login', _userController2.default.getUser);

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

app.post('/api/v1/auth/signup', _userController2.default.create);

app.get('/logout', function (req, res) {
  res.render('logout', { layout: null });
});

app.get('/menu', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/dashboard.html'));
});

app.get('/api/v1/menu', _menuController2.default.getAllMenu);

// html for getting all orders by a user
app.get('/users', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/history.html'));
});

// api for getting all orders made by a user
app.get('/api/v1/users/:userid/orders', _ordersController2.default.getUserOrders);

// html for getting specific orders using order id, its api is below it
app.get('/users/orders/:orderid', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/getorder.html'));
});

app.get('/api/v1/users/orders/:orderid', _ordersController2.default.getOrdersfromId);

// PLACE AN ORDER
app.post('/api/v1/orders/:user', _ordersController2.default.create);

app.get('/messages', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/messages.html'));
});

app.get('/api/v1/messages/:userid', _messagesController2.default.getMessageFromAdmin);

app.post('/api/v1/messages/', _messagesController2.default.sendMessageToAdmin);

// ADMIN
app.get('/admin', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/adminsignin.html'));
});
/*
app.post('/api/v1/admin', (req, res) => {
  const result = { userFound: false };
  const signInUser = {
    username: req.body.username, password: req.body.password
  };
  adminUsers.forEach((element) => {
    if ((element.username === signInUser.username) && (element.password === signInUser.password)) {
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
});*/
app.post('/api/v1/admin', _adminUserController2.default.getUser);

app.get('/orders', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/admindashboard.html'));
});

app.get('/api/v1/orders', _ordersController2.default.getAllOrders);

// GET A USERS ORDERS
app.get('/orders/:orderid', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/userorders.html'));
});

app.get('/api/v1/orders/:orderid', _ordersController2.default.getOrdersfromId);

// Update status of an order
app.put('/api/v1/orders/:id', _ordersController2.default.updateOrderStatus);

// FOOD LIST
app.get('/menu', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/adminfoodlist.html'));
});

app.get('/api/v1/menu', _menuController2.default.getAllMenu);

// ADD FOOD
app.get('/admin/addfood', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/adminaddfood.html'));
});

app.post('/api/v1/menu', _menuController2.default.create);

// EDIT A FOOD DETAILS
app.get('/admin/editfood', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/admineditfood.html'));
});

app.get('/api/v1/menu/:foodid', _menuController2.default.getSingleFood);

app.put('/api/v1/menu/:foodid', _menuController2.default.updateFoodDetails);

// DELETE FOOD =================================================>
app.get('/admin/deletefood', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/admindeletefood.html'));
});

app.delete('/api/v1/menu/:foodid', _menuController2.default.deleteFood);
// ==========================================================>


// GET MESSAGES
app.get('/admin/messages', function (req, res) {
  res.status(200);
  res.sendFile(_path2.default.join(__dirname, '../UI/adminmessages.html'));
});

app.get('/api/v1/admin/messages', _messagesController2.default.getMessagesFromUsers);

app.post('/api/v1/admin/messages', _messagesController2.default.sendMessageToUsers);

// custom 404 page
app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(app.get('port'));

exports.default = app;