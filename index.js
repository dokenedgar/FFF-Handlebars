import express from 'express';
import path from 'path';
import User from './src/controllers/userController';
import AdminUser from './src/controllers/adminUserController';
import MenuItem from './src/controllers/menuController';
import Order from './src/controllers/ordersController';
import Messages from './src/controllers/messagesController';
import jwt from 'jsonwebtoken';
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

app.post('/api/v1/auth/login', User.getUser);

// ===================VERIFY TOKEN========================>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // Add verification of the token here as well.
    // Such that when the route is finally reached, just perform the requested action
    jwt.verify(req.token, '7r3-l4l4', (err, authData) => {
      if (err) {
        res.status(403).send({ message: 'Token not valid for this session.' });;
      }   
      else {
        // console.log(authData.userid[0].userid);
        req.userid = authData.userid[0].userid;
          next();
        }
      });
    
  }
  else {
    res.status(403).send({ message: 'Token not found in request.' });;
  }
}
function adminverifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // Add verification of the token here as well.
    // Such that when the route is finally reached, just perform the requested action
    jwt.verify(req.token, '4dm1#-7t3', (err, authData) => {
      if (err) {
        res.status(403).send({ message: 'Token not valid for this session.' });;
      }   
      else {
        // console.log(authData.userid[0].userid);
       // req.adminid = authData.userid[0].userid;
          next();
        }
      });
    
  }
  else {
    res.status(403).send({ message: 'Token not found in request.' });;
  }
}
// =======================================================>

app.get('/signup', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/signup.html'));
});

app.post('/api/v1/auth/signup', User.create);

app.get('/logout', (req, res) => {
  res.render('logout', { layout: null });
});

app.get('/menu', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/dashboard.html'));
});

app.get('/api/v1/menu', verifyToken, MenuItem.getAllMenu);

// html for getting all orders by a user
app.get('/users', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/history.html'));
});

// api for getting all orders made by a user
app.get('/api/v1/users/:userid/orders', verifyToken, Order.getUserOrders);

// html for getting specific orders using order id, its api is below it
app.get('/users/orders/:orderid', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/getorder.html'));
});

app.get('/api/v1/users/orders/:orderid', verifyToken, Order.getOrdersfromId);

// PLACE AN ORDER
app.post('/api/v1/orders/:user', verifyToken, Order.create);


app.get('/messages', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/messages.html'));
});

app.get('/api/v1/messages/:userid', verifyToken, Messages.getMessageFromAdmin);

app.post('/api/v1/messages/', verifyToken, Messages.sendMessageToAdmin);

// ADMIN
app.get('/admin', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminsignin.html'));
});

app.post('/api/v1/admin', AdminUser.getUser);

app.get('/orders', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/admindashboard.html'));
});

app.get('/api/v1/orders', adminverifyToken, Order.getAllOrders);

// GET A USERS ORDERS
app.get('/orders/:orderid', adminverifyToken, (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/userorders.html'));
});

app.get('/api/v1/orders/:orderid', adminverifyToken, Order.getOrdersfromId);

// Update status of an order
app.put('/api/v1/orders/:id', adminverifyToken, Order.updateOrderStatus);

// FOOD LIST
app.get('/menu', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminfoodlist.html'));
});

app.get('/api/v1/menu', MenuItem.getAllMenu);

// ADD FOOD
app.get('/admin/addfood', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminaddfood.html'));
});

app.post('/api/v1/menu', adminverifyToken, MenuItem.create);


// EDIT A FOOD DETAILS
app.get('/admin/editfood', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/admineditfood.html'));
});

app.get('/api/v1/menu/:foodid', adminverifyToken, MenuItem.getSingleFood);

app.put('/api/v1/menu/:foodid', adminverifyToken, MenuItem.updateFoodDetails);


// DELETE FOOD =================================================>
app.get('/admin/deletefood', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/admindeletefood.html'));
});

app.delete('/api/v1/menu/:foodid', adminverifyToken, MenuItem.deleteFood);
// ==========================================================>


// GET MESSAGES
app.get('/admin/messages', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminmessages.html'));
});

app.get('/api/v1/admin/messages', adminverifyToken, Messages.getMessagesFromUsers);

app.post('/api/v1/admin/messages', adminverifyToken, Messages.sendMessageToUsers);

// custom 404 page
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(app.get('port'));

export default app;