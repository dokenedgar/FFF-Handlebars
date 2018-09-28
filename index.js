import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());
const orders = [];

const users = [
  {
    firstname: 'Yakubu', surname: 'Frank', phone: '12345678900', username: 'Franky', password: 'superfrank'
  },
  {
    firstname: 'David', surname: 'McKenxie', phone: '09876543211', username: 'McDave', password: 'pword' 
  }
];

const adminUsers = [
  { username: 'lionel', password: 'messi' },
  { username: 'sergio', password: 'ramos' }
];

const foodList = [
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
const messagesToAdmin = [];
const messagesFromAdmin = [
  { receiver: 'McDave', message: 'Order received' },
  { receiver: 'Franky', message: 'Your order of Rice and burger of Monday 4th April has been completed. Thank you for using our service' },
  { receiver: 'Franky', message: 'Order accepted' },
  { receiver: 'McDave', message: 'Welcome to Fast Food Fast. Thank you for registering and we hope you have a wonderful experience with us' }
];

app.use(express.static(path.join(__dirname, '../public/css/')));
app.use(express.static(path.join(__dirname, '../public/images/')));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('port', process.env.PORT || 3000);

// ROUTES
app.get('/', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/index.html'));
});

app.get('/signin',  (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/signin.html'));
});

app.post('/signin', (req, res) => {
  const result = { userFound: false };
  const signInUser = {
    username: req.body.username, password: req.body.password
  };

  users.forEach((element) => {
    if ((element.username === signInUser.username) && (element.password === signInUser.password)) {
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

app.post('/signup', (req, res) => {
  const newUser = {
  firstname: req.body.firstname, surname: req.body.surname, phone: req.body.phone, username: req.body.username, password: req.body.password
 };
  users.push(newUser);
  let response = { success: true, message: 'New user registered', newUser}
  res.send(response);
});

app.get('/logout', (req, res) => {
  res.render('logout', { layout: null });
});

app.get('/menu', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/dashboard.html'));
});

app.get('/menu/api/v1/menu', (req, res) => {
  res.status(200);
  let responseObj = { message:'food items on this platform', numberOfItems : foodList.length, foodList };
  res.send(responseObj);
});

app.get('/api/v1/menu', (req, res) => {
  res.status(200);
  let responseObj = { message: 'food items on this platform', numberOfItems: foodList.length, foodList };
  res.send(responseObj);
});

// html for getting all orders by a user
app.get('/orders', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/history.html'));
});
// api for getting all orders made by a user
app.get('/api/v1/orders/:user', (req, res) => {
  let order = [];
  orders.forEach((element, index) => {
    if (element.user === req.params.user) {
      order = order.concat(element);
   }
  });
  if (order.length > 0 ) {
    let responseObj = { message: 'Items found for this user', numberOfItems : order.length, order };
    res.send(responseObj);
  }
  else {
    let responseObj = { message: 'Sorry, this user has not made any orders yet..', order };
    res.send(responseObj);
  }
 });

// html for getting specific orders using order id, its api is below it
app.get('/orders/:id', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/getorder.html'));
});

app.get('/api/v1/orders/:id', (req, res) => {
  let order = [];
  res.status(200);
  orders.forEach((element, index) => {
    if (element.orderID === req.params.id) {
      order = order.concat(element);
    }
   });
     if (order.length > 0 ) {
      let responseObj = { message:'Items found with this ID', numberOfItems: order.length, order };
       res.send(responseObj);
  }
  else {
    let responseObj = { message: 'No item found with this Order ID..', order };
    res.send(responseObj);
  }  
});

// PLACE AN ORDER
app.post('/api/v1/orders/:user', (req, res) => {
  const orderId = Math.floor(Math.random() * 12345);
  const newOrder = {
    orderID: orderId + req.params.user, user: req.params.user, order: req.body, status: 'pending'
  };
  orders.push(newOrder);
  res.status(201);
  let responseObj = { message: 'Order placed successfully', newOrder };
  res.send(responseObj); 
});


app.get('/messages', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/messages.html'));
});

app.get('/api/v1/messages/:user', (req, res) => {
  let messages = []; 
  res.status(200);
  messagesFromAdmin.forEach((element, index) => {
    if (element.receiver === req.params.user) {
      messages = messages.concat(element);
    }
  });
  if (messages.length > 0) {
    let responseObj = { message:'messages found for this user', numberOfMessages : messages.length, messages};
    res.send(responseObj);
  }
  else {
    let responseObj = { message : 'No messages yet for this user..', messages };
    res.send(responseObj);
  }  
});

app.post('/api/v1/messages/:user', (req, res) => {
  res.status(201);
  const newMessage = {
    sender: req.body.sender, message: req.body.message
  };
  messagesToAdmin.push(newMessage);
  let responseObj = { message: 'Message sent successfully', newMessage };
  res.send(responseObj);
});

// ADMIN
app.get('/admin', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminsignin.html'));
});

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
});


app.get('/admin/admindashboard', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/admindashboard.html'));
});

app.get('/api/v1/admin/orders', (req, res) => {
  res.status(200);
  if (orders.length > 0) {
    let responseObj = { message: 'Number of orders received', numberOfOrders : orders.length, orders };
    res.send(responseObj);
  }
  else {
    let responseObj = { message: 'No orders received yet...', orders };
    res.send(responseObj);
  }
});

// GET A USERS ORDERS
app.get('/admin/orders/:order', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/userorders.html'));
});

app.get('/api/v1/admin/orders/:orderid', (req, res) => {
  let order = [];
  res.status(200);
  orders.forEach((element, index) => {
    if (element.orderID === req.params.order) {
      order = order.concat(element);
    }
  });
  if (order.length > 0) {
    let responseObj = { message: 'Orders for user, with order ID '+req.params.order, numberOfItemsInOrder: order[2].length, order };
    res.send(responseObj);
  }
  else {
    let responseObj = { numberOfOrders : 'No orders for this orderID. Please check whether the order ID is correct.', order };
    res.send(responseObj);
  }      
});

// Update status of an order
app.put('/api/v1/admin/orders/:id', (req, res) => {
  let order = [];
  res.status(200);
  orders.forEach((element, index) => {
    if (element.orderID === req.params.id) {
      element.status = req.body.status;
      order = order.concat(element);
    }
  });
  if (order.length > 0) {
    let responseObj = { message : 'status updated successfully', order };
    res.send(responseObj);
  }
  else {
    let responseObj = { message : 'No orders for this orderID. Please check whether the order ID is correct.', order };
    res.send(responseObj);
  }
});

// FOOD LIST
app.get('/admin/foodlist', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminfoodlist.html'));
});

app.get('/api/v1/admin/foodlists', (req, res) => {
  res.status(200);
  let responseObj = { numberOfFoodItems : foodList.length, foodList };
  res.send(responseObj); 
});

// ADD FOOD
app.get('/admin/addfood', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminaddfood.html'));
});

app.post('/api/v1/admin/food', (req, res) => {
  const newFood = {
    foodName: req.body.foodName, foodPrice: req.body.foodPrice, foodDesc: req.body.foodDesc
  };
  if (newFood.foodName==='') {
    res.status(400);
    let responseObj = { message : 'request not successful'};
    res.send(responseObj);
  }
   foodList.push(newFood);
      res.status(201);
      let responseObj = { message : 'Food added successfully', foodList };
      res.send(responseObj);
});


// EDIT A FOOD DETAILS
app.get('/admin/editfood', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/admineditfood.html'));
});

app.get('/api/v1/admin/food/:name', (req, res) => {
  let order = [];

      foodList.forEach((element, index) => {
        if (element.foodName === req.params.name) {
          order = order.concat(element);
        }
      });
      res.status(200);
      if (order.length > 0) {
        let responseObj = { message: 'Food to be edited', order };
        res.send(responseObj);
      }
      else {
        let responseObj = { message: 'Problem loading food details, check food name', order };
        res.send(responseObj);
      }

});

app.put('/api/v1/admin/food', (req, res) => {
  let order = [];
      foodList.forEach((element, index) => {
        if (element.foodName === req.body.foodName) {
          element.foodPrice = req.body.foodPrice;
          element.foodDesc = req.body.foodDesc;
          order = order.concat(element);
        }
      });
      res.status(200);
      if (order.length > 0) {
        let responseObj = { message : 'Food details edited successfully', order };
        res.send(responseObj);
      }
      else {
        let responseObj = { message : 'Problem updating food, check food name', order };
        res.send(responseObj);
      }
      
    
});


// DELETE FOOD =================================================>
app.get('/admin/deletefood', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/admindeletefood.html'));
});
app.delete('/api/v1/admin/food', (req, res) => {
  let deleteSuccess = false;
      foodList.forEach((element, index) => {
        if (element.foodName === req.body.foodName) {
          foodList.splice(index, 1);
          deleteSuccess = true;
        }
      });
      
      if (deleteSuccess) {
        res.status(200);
        let responseObj = { message : 'Food item deleted successfully', foodList };
        res.send(responseObj);
      }
        else {
          let responseObj = { message : 'Problem deleting food item, check food name', foodName:res.body.foodName };
          res.send(responseObj);
        }
    
});
// ==========================================================>


// GET MESSAGES
app.get('/admin/messages', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../UI/adminmessages.html'));
});

app.get('/api/v1/admin/messages', (req, res) => {
    
      res.status(200);
      if (messagesToAdmin.length > 0) {
        let responseObj = { message: 'messages received by the admin',numberOfMessages : messagesToAdmin.length, messagesToAdmin };
        res.send(responseObj);
      }
      else {
        let responseObj = { message: 'No messages yet from customers!', numberOfMessages : messagesToAdmin.length, messagesToAdmin };
        res.send(responseObj);
      }  
});

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