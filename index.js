import express from 'express';
import path from 'path';
import User from './src/controllers/userController';
import AdminUser from './src/controllers/adminUsersController';
import MenuItem from './src/controllers/menuController';
import Order from './src/controllers/ordersController';
import Messages from './src/controllers/messagesController';

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public/css/')));
app.use(express.static(path.join(__dirname, '../public/images/')));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('port', process.env.PORT || 3003);

// ROUTES
app.get('/', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/index.html'));
});

app.get('/signin', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/signin.html'));
});

app.post('/api/v1/signin', User.getUser);

// ===================VERIFY TOKEN========================>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // Add verification of the token here as well.
    // Such that when the route is finally reached, just send back the data
    next();
  }
  else {
    res.sendStatus(403);
  }
}
// =======================================================>

app.get('/signup', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/signup.html'));
});

app.post('/api/v1/signup', User.create);

app.get('/logout', (req, res) => {
  res.render('logout', { layout: null });
});

app.get('/menu', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/dashboard.html'));
});

app.get('/api/v1/menu', MenuItem.getAllMenu);

// html for getting all orders by a user
app.get('/orders', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/history.html'));
});

// api for getting all orders made by a user
app.get('/api/v1/orders/:userid', Order.getUserOrders);

// html for getting specific orders using order id, its api is below it
app.get('/orders/:id', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/getorder.html'));
});

app.get('/api/v1/order/:orderid', Order.getOrdersfromId);

// PLACE AN ORDER
app.post('/api/v1/orders/:user', Order.create);


app.get('/messages', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/messages.html'));
});

app.get('/api/v1/messages/:userid', Messages.getMessageFromAdmin);

app.post('/api/v1/messages/', Messages.sendMessageToAdmin);

// ADMIN
app.get('/admin', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminsignin.html'));
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
app.post('/api/v1/admin', AdminUser.getUser);

app.get('/admin/admindashboard', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/admindashboard.html'));
});

app.get('/api/v1/admin/orders', Order.getAllOrders);

// GET A USERS ORDERS
app.get('/admin/orders/:orderid', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/userorders.html'));
});

app.get('/api/v1/admin/orders/:orderid', Order.getOrdersfromId);

// Update status of an order
app.put('/api/v1/admin/orders/:id', Order.updateOrderStatus);

// FOOD LIST
app.get('/admin/foodlist', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminfoodlist.html'));
});

app.get('/api/v1/admin/foodlists', MenuItem.getAllMenu);

// ADD FOOD
app.get('/admin/addfood', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminaddfood.html'));
});

app.post('/api/v1/admin/food', MenuItem.create);


// EDIT A FOOD DETAILS
app.get('/admin/editfood', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/admineditfood.html'));
});

app.get('/api/v1/admin/food/:name', MenuItem.getSingleFood);

app.put('/api/v1/admin/food', MenuItem.updateFoodDetails);


// DELETE FOOD =================================================>
app.get('/admin/deletefood', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/admindeletefood.html'));
});

app.delete('/api/v1/admin/food', MenuItem.deleteFood);
// ==========================================================>


// GET MESSAGES
app.get('/admin/messages', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminmessages.html'));
});

app.get('/api/v1/admin/messages', Messages.getMessagesFromUsers);

app.post('/api/v1/admin/messages', (req, res) => {
  const result = { userFound: false };
  users.forEach((element) => {
    if ((element.username === req.body.receiver)) {
      result.userFound = true;
    }
  });

  if (result.userFound) {
    const newMsg = {
      receiver: req.body.receiver, message: req.body.message
    };
    messagesFromAdmin.push(newMsg);
    res.status(201);
    result.message = 'Message sent successfully';
    res.send(result);
  }
  else {
    result.message = 'Problem with sending message.';
    res.send(result);
  }
});

// custom 404 page
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(app.get('port'));

export default app;