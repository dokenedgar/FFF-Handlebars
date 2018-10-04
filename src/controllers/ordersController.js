import { orders, newOrdersObject } from '../models/ordersModel';
import uuidv4 from 'uuid/v4';

const Order = {
  create(req, res) {
    if (!req.body) {
      return res.status(400).send({ message: 'Problem placing order' });
    }
    console.log(req.body);
    req.body.forEach( function(element, index) {
      if (element.foodid===undefined || (/\s/.test(element.foodid)) || element.foodid.length !==36) {
        return res.status(400).send({ message: 'Problem placing order. Please try again foodid' });
      }
      if (element.quantity===undefined || (/\s/.test(element.quantity)) || element.quantity<1 || (/\D/.test(element.quantity))) {
        return res.status(400).send({ message: 'Problem placing order. Please try again quantity' });
      }
    });

    const orderId = uuidv4();
    const newOrder = {
      orderID: orderId, order: req.body, status: 'pending'
    };
    const order = newOrdersObject.place(newOrder);
    const response = { success: true, message: 'Order placed successfully', order }
    return res.status(201).send(response);
  },

  getUserOrders(req, res) {
    if (!req.params.userid || (req.params.userid.length !== 36 ) || (/\s/.test(req.params.userid)) ) {
      return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
    }
    newOrdersObject.getOrders(req.params.userid, (err, result)=>{
      
      if (result===undefined) {
        return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
      }    
    if (result.rowCount === 0) {
      let responseObj = { message: 'Sorry, this user has not made any orders yet..', order:result.rows };
      res.status(400).send(responseObj);
    }
      let responseObj = { message: 'Items found for this user', numberOfItems: result.rowCount, order:result.rows };
      res.status(200).send(responseObj);
    });
  },

  getOrdersfromId(req, res) {
    if (!req.params.orderid) {
      return res.status(400).send({ message: 'Problem getting orders. Please check userid' });
    }
    if (!req.params.orderid || (req.params.orderid.length !== 36 ) || (/\s/.test(req.params.orderid)) ) {
      return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
    }
    newOrdersObject.getOrdersFromId(req.params.orderid, (err, result) => {
if (result === undefined) {
  return res.status(400).send({ message: 'Error processing request. Check order id' });
} else {
      if (result.rowCount === 0) {
      let responseObj = { message: 'No item found with this Order ID..', order: result.rows };
      res.status(400).send(responseObj);
    }
    let responseObj = { message: 'Items found with this ID', numberOfItems: result.rowCount, order:result.rows };
      res.status(200).send(responseObj);
}         

    });
  },

  // Admin get all orders
  getAllOrders(req, res) {
    const orders = newOrdersObject.getAllOrders((err, result)=>{
       if (result===undefined) {
        return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
      }   
    if (result.rowCount === 0) {
      return res.status(400).send({ message: 'No orders received yet...', numberOfOrders: result.rowCount, orders: result.rows });
    }
    return res.status(200).send({ message: 'Number of orders received', numberOfOrders: result.rowCount, orders: result.rows });
    });
  },

  updateOrderStatus(req, res) {
    if (!req.body.status) {
      return res.status(400).send({ message: 'Problem updating order' });
    }
    if (!req.params.id  || (req.params.orderid.length !== 36 ) || (/\s/.test(req.params.id)) ) {
      return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
    }
    if (!req.body.status || (req.body.status.length < 2 ) || (req.body.status.length > 20 ) || (/\s/.test(req.body.status)) ) {
      return res.status(400).send({ message: 'Error processing request. Incorrect status' });
    }
    newOrdersObject.updateOrderStatus(req.params.id, req.body.status, (err, result)=>{
          // return with affected order as well****
          if (result===undefined) {
        return res.status(400).send({ message: 'Error processing request. Invalid id' });
      }
    if (result.rowCount === 0) {
      return res.status(400).send({ message: 'No orders for this orderID. Please check whether the order ID is correct.' });
    }

        newOrdersObject.getOrdersFromId(req.params.id, (err, result) => {   
        if (result.rowCount === 0) {
          let responseObj = { message: 'No item found with this Order ID..', order: result.rows };
          res.status(400).send(responseObj);
        }
        let responseObj = { message: 'status updated successfully', numberOfItems: result.rowCount, order:result.rows };
          res.status(200).send(responseObj);
        });
        // return res.status(200).send({ message: 'status updated successfully' });
    });
  }
}
export default Order;