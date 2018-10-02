import { orders, newOrdersObject } from '../models/ordersModel';

const Order = {
  create(req, res) {
    if (!req.body) {
      return res.status(400).send({ message: 'Problem placing order' });
    }
    const orderId = Math.floor(Math.random() * 12345);
    const newOrder = {
      orderID: orderId + req.params.user, username: req.params.user, order: req.body, status: 'pending'
    };
    const order = newOrdersObject.place(newOrder);
    const response = { success: true, message: 'Order placed successfully', order }
    return res.status(201).send(response);
  },

  getUserOrders(req, res) {
    const order = newOrdersObject.getOrders(req.params.userid);
    if (order.length > 0) {
      let responseObj = { message: 'Items found for this user', numberOfItems: order.length, order };
      res.status(200).send(responseObj);
    }
    else {
      let responseObj = { message: 'Sorry, this user has not made any orders yet..', order };
      res.status(400).send(responseObj);
    }
  },

  getOrdersfromId(req, res) {
    const order = newOrdersObject.getOrdersFromId(req.params.orderid);
    if (order.length > 0 ) {
      let responseObj = { message: 'Items found with this ID', numberOfItems: order.length, order };
      res.status(200).send(responseObj);
    }
    else {
      let responseObj = { message: 'No item found with this Order ID..', order };
      res.status(400).send(responseObj);
    }
  },

  // Admin get all orders
  getAllOrders(req, res) {
    const orders = newOrdersObject.getAllOrders();
	if (orders.length > 0) {
      let responseObj = { message: 'Number of orders received', numberOfOrders: orders.length, orders };
      res.status(200).send(responseObj);
    }
    else {
      let responseObj = { message: 'No orders received yet...', orders };
      res.status(400).send(responseObj);
    }
  },

  updateOrderStatus(req, res) {
    if (!req.body.status) {
      return res.status(400).send({ message: 'Problem updating order' });
    }
    const order = newOrdersObject.updateOrderStatus(req.params.id, req.body.status);
    if (order.length > 0) {
      let responseObj = { message: 'status updated successfully', order };
      res.status(200).send(responseObj);
    }
    else {
      let responseObj = { message: 'No orders for this orderID. Please check whether the order ID is correct.', order };
      res.status(400).send(responseObj);
    }
  }
}
export default Order;