const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.json());

let orders = [];

let users = [
  { fname: 'Yakubu', sname: 'Frank', phone: '12345678900', username: 'Franky', pword: 'superfrank' },
  { fname: 'David', sname: 'McKenxie', phone: '09876543211', username: 'McDave', pword: 'pword' }
];
//const initData = require('./initialdata.js');
let foodList = [
  { foodName: 'Spaghetti', foodPrice: '350', foodDesc: 'Nicely cooked nigerian-styled spaghetti' },
  { foodName: 'Plantain', foodPrice: '100', foodDesc: 'Fresh plantain fried to the perfect degree' },
  { foodName: 'Pizza', foodPrice: '1000', foodDesc: 'Freshly baked Pizza, with the finest of ingredients' },
  { foodName: 'Burger', foodPrice: '500', foodDesc: 'Delicious burgers from our seasoned chef' },
  { foodName: 'Hot Dog', foodPrice: '300', foodDesc: 'Fresh Hot dogs' },
  { foodName: 'Doughnut', foodPrice: '100', foodDesc: 'Soft and doughnut' },
  { foodName: 'Fried Chicken', foodPrice: '400', foodDesc: 'Tasty chicken fried to the right degree and right oil' },
  { foodName: 'Chips', foodPrice: '250', foodDesc: 'Soft and crisp chips!' },
  { foodName: 'Fried Eggs', foodPrice: '150', foodDesc: 'Quality fried eggs, from healthy chickens with amazing spices' },
  { foodName: 'Bacon', foodPrice: '650', foodDesc: 'Fine bacon from the healthiest of animals' }
];
let messagesToAdmin = [];
let messagesFromAdmin = [
  { receiver: 'McDave', message: 'Order received' },
  { receiver: 'Franky', message: 'Your order of Rice and burger of Monday 4th April has been completed. Thank you for using our service' },
  { receiver: 'Franky', message: 'Order accepted' },
  { receiver: 'McDave', message: 'Welcome to Fast Food Fast. Thank you for registering and we hope you have a wonderful experience with us' }
];


app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);


app.get('/', function (req, res) {
	res.render('index', { layout: 'guest' , user: {guest:true}, menu: JSON.stringify(foodList) } );
});


app.get('/signin', function (req, res) {
	res.render('signin', { layout: 'guest' });
});

app.get('/signin/:uname/:pword', (req, res) => {
  let result = { userFound: false };
  const signInUser = {
    username: req.params.uname, password: req.params.pword
  };
  users.forEach(function (element) {
    if ((element.username === signInUser.username) && (element.pword === signInUser.password)) {
      result.userFound = true;
    }
  });
  res.send(result);
});


app.get('/signup', function (req, res) {
	res.render('signup', { layout: 'guest' });
});

app.post('/signup', (req, res) => {
  const newUser = {
    fname: req.body.fname, sname: req.body.sname, phone: req.body.phone, username: req.body.username, pword: req.body.pword
  };
  users.push(newUser);
  res.send(newUser);
});


app.get('/menu', function (req, res) {
	res.render('dashboard');
});
app.get('/api/v1/menu', function (req, res) {
	res.send(foodList);
});

// html for getting all orders by a user
app.get('/orders', function (req, res) {
	res.render('history');
});
// appi for getting all orders made by a user
app.get('/api/v1/orders/:user', (req, res) => {
  let order = [];
  orders.forEach(function (element, index) {
    if (element.user === req.params.user) {
      order = order.concat(element);
    }
  });
  res.send(order);
});

//html for getting specific orders using order id, its api is below it
app.get('/orders/:id', function (req, res) {
	res.render('getorder');
});
app.get('/api/v1/order/:id', function (req, res) {
	 let order = [];
  orders.forEach(function (element, index) {
    if (element.orderID === req.params.id) {
      order = order.concat(element);
    }
  });
  res.send(order);
});


// PLACE AN ORDER
app.post('/api/v1/placeOrder/:user', (req, res) => {
  console.log(req.body);
  let orderId = Math.floor(Math.random() * 12345);
  const newOrder = {
    orderID: orderId + req.params.user, user: req.params.user, order: req.body, status: 'pending'
  };
  orders.push(newOrder);
  res.send(orders);
});


app.get('/messages', function (req, res) {
	res.render('messages');
});

app.get('/api/v1/messages/:user', function (req, res) {
	 let msgs = [];
  messagesFromAdmin.forEach(function (element, index) {
    if (element.receiver === req.params.user) {
      msgs = msgs.concat(element);
    }
  });
  res.send(msgs);
});

app.post('/api/v1/messages/:user', (req, res) => {
  const newMsg = {
    sender: req.body.sender, message: req.body.message
  };
  messagesToAdmin.push(newMsg);
  res.send(messagesToAdmin);
});

// custom 404 page
app.use(function(req, res){
res.type('text/plain');
res.status(404);
res.send('404 - Not Found');
});

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});