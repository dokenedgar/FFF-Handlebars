'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ordersModel = require('../models/ordersModel');

var Order = {
  create: function create(req, res) {
    if (!req.body) {
      return res.status(400).send({ message: 'Problem placing order' });
    }
    var orderId = Math.floor(Math.random() * 12345);
    var newOrder = {
      orderID: orderId + req.params.user, username: req.params.user, order: req.body, status: 'pending'
    };
    var order = _ordersModel.newOrdersObject.place(newOrder);
    var response = { success: true, message: 'Order placed successfully', order: order };
    return res.status(201).send(response);
  },
  getUserOrders: function getUserOrders(req, res) {
    var order = _ordersModel.newOrdersObject.getOrders(req.params.userid);
    if (order.length > 0) {
      var responseObj = { message: 'Items found for this user', numberOfItems: order.length, order: order };
      res.status(200).send(responseObj);
    } else {
      var _responseObj = { message: 'Sorry, this user has not made any orders yet..', order: order };
      res.status(400).send(_responseObj);
    }
  },
  getOrdersfromId: function getOrdersfromId(req, res) {
    var order = _ordersModel.newOrdersObject.getOrdersFromId(req.params.orderid);
    if (order.length > 0) {
      var responseObj = { message: 'Items found with this ID', numberOfItems: order.length, order: order };
      res.status(200).send(responseObj);
    } else {
      var _responseObj2 = { message: 'No item found with this Order ID..', order: order };
      res.status(400).send(_responseObj2);
    }
  },


  // Admin get all orders
  getAllOrders: function getAllOrders(req, res) {
    var orders = _ordersModel.newOrdersObject.getAllOrders();
    if (orders.length > 0) {
      var responseObj = { message: 'Number of orders received', numberOfOrders: orders.length, orders: orders };
      res.status(200).send(responseObj);
    } else {
      var _responseObj3 = { message: 'No orders received yet...', orders: orders };
      res.status(400).send(_responseObj3);
    }
  },
  updateOrderStatus: function updateOrderStatus(req, res) {
    if (!req.body.status) {
      return res.status(400).send({ message: 'Problem updating order' });
    }
    var order = _ordersModel.newOrdersObject.updateOrderStatus(req.params.id, req.body.status);
    if (order.length > 0) {
      var responseObj = { message: 'status updated successfully', order: order };
      res.status(200).send(responseObj);
    } else {
      var _responseObj4 = { message: 'No orders for this orderID. Please check whether the order ID is correct.', order: order };
      res.status(400).send(_responseObj4);
    }
  }
};
exports.default = Order;