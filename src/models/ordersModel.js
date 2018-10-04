import db from '../../pgdb/dbconfig';

export const orders = [];

class ordersClass {
  constructor(){
 }
//place Order
  place(data) {
    const newOrder = {}
    
  data.order.forEach( function(element, index) {
    db.query('INSERT INTO orders (orderid, foodid, quantity, status) values($1, $2, $3, $4)',
    [data.orderID, element.foodid, element.quantity, data.status], (err)=>{
      if (err) {
        console.log(err);
      }
    });
  });
  /*
        db.query('INSERT INTO ordersummary (orderid, userid, price) values($1, $2, $3)',
    [data.orderID, element.productid, element.quantity], (err)=>{
      if (err) {
        console.log(err);
      }
    });
    */
    
  return newOrder;
 }

//get all orders by a particular USER
getOrders(userid, callback){
    db.query('SELECT * FROM orders where userid=($1)',
    [userid], (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    
    });
  }

//get all items from a specific order, using the orderID
getOrdersFromId(orderid, callback){
    db.query('SELECT * FROM orders where orderid=($1)',
    [orderid], (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    });
}

// Admin get all Orders
getAllOrders(callback){
      db.query('SELECT * FROM orders',
    (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    });
}

updateOrderStatus(orderid, status, callback){
  db.query('UPDATE orders SET status=($1) WHERE orderid=($2)',
    [status, orderid],
    (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    });
}

}

export const newOrdersObject = new ordersClass();