const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const handlebars = require('express-handlebars').create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.json());

let orders = [];

let users = [
  { fname: 'Yakubu', sname: 'Frank', phone: '12345678900', username: 'Franky', pword: 'superfrank' },
  { fname: 'David', sname: 'McKenxie', phone: '09876543211', username: 'McDave', pword: 'pword' }
];
let adminUsers = [
  { username: 'lionel', password: 'messi' },
  { username: 'sergio', password: 'ramos' }
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
      //Create jwt token for the user
      jwt.sign( { signInUser }, 'tre-lala', (err, token) => {
        //result.token = token;
        result.token = token;
        res.send(result);
      })
    }
  });

  if (!result.userFound) {
    res.send(result);
  }

});

//===================VERIFY TOKEN========================>
function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next()
  }
  else {
    res.sendStatus(403);
  }
}
//=======================================================>

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

app.get('/logout', function (req, res) {
  res.render('logout', { layout: null });
});


app.get('/menu', function (req, res) {
	res.render('dashboard');
});

app.get('/api/v1/menu', verifyToken, function (req, res) {
  
  jwt.verify(req.token, 'tre-lala', (err, authData) => {
    if(err){
      res.sendStatus(403);
    }else {
      res.send(foodList);
      //res.send(authData);
    }
  })

});

// html for getting all orders by a user
app.get('/orders', function (req, res) {
	res.render('history');
});
// appi for getting all orders made by a user
app.get('/api/v1/orders/:user', verifyToken, (req, res) => {
  let order = [];
    jwt.verify(req.token, 'tre-lala', (err, authData) => {
      if(err){
        res.sendStatus(403);
      }else {
        orders.forEach(function (element, index) {
        if (element.user === req.params.user) {
          order = order.concat(element);
          }
        });
        res.send(order);
    }
  })
});

//html for getting specific orders using order id, its api is below it
app.get('/orders/:id', function (req, res) {
	res.render('getorder');
});

app.get('/api/v1/order/:id', verifyToken, function (req, res) {
   let order = [];

   jwt.verify(req.token, 'tre-lala', (err, authData) => {
    if(err){
      res.sendStatus(403);
    }else {
          orders.forEach(function (element, index) {
            if (element.orderID === req.params.id) {
              order = order.concat(element);
            }
          });
      res.send(order);
    }
  })

});


// PLACE AN ORDER
app.post('/api/v1/placeOrder/:user', verifyToken, (req, res) => {
  console.log(req.body);

    jwt.verify(req.token, 'tre-lala', (err, authData) => {
    if(err){
      res.sendStatus(403);
    }else {
        let orderId = Math.floor(Math.random() * 12345);
        const newOrder = {
          orderID: orderId + req.params.user, user: req.params.user, order: req.body, status: 'pending'
        };
        orders.push(newOrder);
        res.status(201)
        res.send(orders);
      }
  })

});


app.get('/messages', function (req, res) {
	res.render('messages');
});

app.get('/api/v1/messages/:user', verifyToken, function (req, res) {
   let msgs = [];

      jwt.verify(req.token, 'tre-lala', (err, authData) => {
        if(err){
          res.sendStatus(403);
        }else {
          messagesFromAdmin.forEach(function (element, index) {
            if (element.receiver === req.params.user) {
              msgs = msgs.concat(element);
            }
        });
        res.send(msgs);
      }
  })

});

app.post('/api/v1/messages/:user', verifyToken, (req, res) => {

        jwt.verify(req.token, 'tre-lala', (err, authData) => {
        if(err){
          res.sendStatus(403);
        }else {
          const newMsg = {
            sender: req.body.sender, message: req.body.message
          };
          messagesToAdmin.push(newMsg);
          res.send(newMsg);
      }
  })

});

//ADMIN
app.get('/admin', (req, res) => {
  res.render('adminsignin', { layout: null });
});

app.post('/admin', (req, res) => {
  let result = { userFound: false };
  const signInUser = {
    username: req.body.uname, password: req.body.pword
  };
  adminUsers.forEach(function (element) {
    if ((element.username === signInUser.username) && (element.password === signInUser.password)) {
      result.userFound = true;
    }
  });
  res.send(result);
});


app.get('/admin/admindashboard', function (req, res) {
	res.render('admindashboard', { layout: 'admin' });
});

app.get('/api/v1/admin/orders', (req, res) => {
  res.send(orders);
});


// GET A USERS ORDERS
app.get('/admin/userorders/:order', (req, res) => {
  res.render('userorders', { layout: 'admin' });
});

app.get('/api/v1/admin/userorders/:order', (req, res) => {
  let order = [];
  orders.forEach(function (element, index) {
    if (element.orderID === req.params.order) {
      order = order.concat(element);
    }
  });
  res.send(order);
});


//Update status of an order
app.put('/api/v1/admin/orders/:id', (req, res) => {
  let order = [];
  orders.forEach(function (element, index) {
    if (element.orderID === req.params.id) {
      element.status = req.body.status;
      order = order.concat(element);
    }
  });
  res.send(order);
});

//FOOD LIST
app.get('/admin/foodlist', (req, res) => {
  res.render('adminfoodlist', { layout: 'admin' });
});

app.get('/api/v1/admin/foodlists', (req, res) => {
  res.send(foodList);
});


//ADD FOOD
app.get('/admin/addfood', (req, res) => {
  res.render('adminaddfood', { layout: 'admin' });
});

app.post('/api/v1/admin/addfood', (req, res) => {
  const newFood = {
    foodName: req.body.foodName, foodPrice: req.body.foodPrice, foodDesc: req.body.foodDesc
  };
  foodList.push(newFood);
  res.status(201);
  res.send(foodList);
});


//EDIT A FOOD DETAILS
app.get('/admin/editfood', (req, res) => {
  res.render('admineditfood', { layout: 'admin' });
});

app.get('/api/v1/admin/food/:name', (req, res) => {
  let order = [];
  foodList.forEach(function (element, index) {
    if (element.foodName === req.params.name) {
      order = order.concat(element);
    }
  });
  res.send(order);
});

app.put('/api/v1/admin/editfood', (req, res) => {
  let order = [];
  foodList.forEach(function (element, index) {
    if (element.foodName === req.body.foodName) {
      element.foodPrice = req.body.foodPrice;
      element.foodDesc = req.body.foodDesc;
      order = order.concat(element);
    }
  });
  res.send(order);
});


//DELETE FOOD =================================================>
app.get('/admin/deletefood', (req, res) => {
  res.render('admindeletefood', { layout: 'admin' });
});
app.delete('/api/v1/admin/deletefood', (req, res) => {
  foodList.forEach(function (element, index) {
    if (element.foodName === req.body.foodName) {
      foodList.splice(index, 1);
    }
  });
  res.send(foodList);
});
// ==========================================================>


//GET MESSAGES
app.get('/admin/messages', (req, res) => {
  res.render('adminmessages', { layout: 'admin' });
});

app.get('/api/v1/admin/messages', (req, res) => {
  res.send(messagesToAdmin);
});

app.post('/api/v1/admin/messages', (req, res) => {
  let result = { userFound : false };
    users.forEach(function (element) {
    if ((element.username === req.body.receiver)) {
      result.userFound = true;
    }
  });

    if (result.userFound) {
            const newMsg = {
          receiver: req.body.receiver, message: req.body.message
        };
        messagesFromAdmin.push(newMsg);
      }

  res.send(result);
  
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

//app.listen(app.get('port'), 'localhost');
module.exports = app;