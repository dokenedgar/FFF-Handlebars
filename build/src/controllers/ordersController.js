'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ordersModel = require('../models/ordersModel');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Order = {
  create: function create(req, res) {
    if (!req.body) {
      return res.status(400).send({ message: 'Problem placing order' });
    }

    req.body.forEach(function (element, index) {
      if (element.foodid === undefined || /\s/.test(element.foodid) || element.foodid.length !== 36) {
        return res.status(400).send({ message: 'Problem placing order. Endure foodid is a nonspaced uuid' });
      }
      if (element.quantity === undefined || /\s/.test(element.quantity) || element.quantity < 1 || /\D/.test(element.quantity)) {
        return res.status(400).send({ message: 'Problem placing order. Quantity should be  non-spaced integer' });
      }
    });

    var orderId = (0, _v2.default)();
    var newOrder = {
      orderID: orderId, order: req.body, status: 'pending'
    };
    var order = _ordersModel.newOrdersObject.place(newOrder, req.userid);
    var response = { success: true, message: 'Order placed successfully', order: order };
    return res.status(201).send(response);
  },
  getUserOrders: function getUserOrders(req, res) {
    if (!req.params.userid || req.params.userid.length !== 36 || /\s/.test(req.params.userid)) {
      return res.status(400).send({ message: 'Error processing request. User id.should be a non-spaced uuid' });
    }
    _ordersModel.newOrdersObject.getOrders(req.params.userid, function (err, result) {

      if (result === undefined) {
        return res.status(400).send({ message: 'Error processing request. Invalid id' });
      }
      if (result.rowCount === 0) {
        var _responseObj = { message: 'Sorry, this user has not made any orders yet..', order: result.rows };
        res.status(400).send(_responseObj);
      }
      var responseObj = { message: 'Items found for this user', numberOfItems: result.rowCount, order: result.rows };
      res.status(200).send(responseObj);
    });
  },
  getOrdersfromId: function getOrdersfromId(req, res) {
    if (!req.params.orderid) {
      return res.status(400).send({ message: 'Problem getting orders. Please check userid' });
    }
    if (!req.params.orderid || req.params.orderid.length !== 36 || /\s/.test(req.params.orderid)) {
      return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
    }
    _ordersModel.newOrdersObject.getOrdersFromId(req.params.orderid, function (err, result) {
      if (result === undefined) {
        return res.status(400).send({ message: 'Error processing request. Check order id' });
      } else {
        if (result.rowCount === 0) {
          var _responseObj2 = { message: 'No item found with this Order ID..', order: result.rows };
          res.status(400).send(_responseObj2);
        }
        var responseObj = { message: 'Items found with this ID', numberOfItems: result.rowCount, order: result.rows };
        res.status(200).send(responseObj);
      }
    });
  },


  // Admin get all orders
  getAllOrders: function getAllOrders(req, res) {
    var orders = _ordersModel.newOrdersObject.getAllOrders(function (err, result) {
      if (result === undefined) {
        return res.status(400).send({ message: 'Error processing request. Please try again' });
      }
      if (result.rowCount === 0) {
        return res.status(400).send({ message: 'No orders received yet...', numberOfOrders: result.rowCount, orders: result.rows });
      }
      return res.status(200).send({ message: 'Number of orders received', numberOfOrders: result.rowCount, orders: result.rows });
    });
  },
  updateOrderStatus: function updateOrderStatus(req, res) {
    if (!req.body.status) {
      return res.status(400).send({ message: 'Problem updating order' });
    }
    if (!req.params.id || req.params.id.length !== 36 || /\s/.test(req.params.id)) {
      return res.status(400).send({ message: 'Error processing request. Invalid id; it should be a non-spaced uuid' });
    }
    if (!req.body.status || req.body.status.length < 2 || req.body.status.length > 20 || /\s/.test(req.body.status) || /\d/.test(req.body.status)) {
      return res.status(400).send({ message: 'Error processing request. Incorrect status.. Status should be a string with no space' });
    }
    _ordersModel.newOrdersObject.updateOrderStatus(req.params.id, req.body.status, function (err, result) {
      // return with affected order as well****
      if (result === undefined) {
        return res.status(400).send({ message: 'Error processing request. Invalid id' });
      }
      if (result.rowCount === 0) {
        return res.status(400).send({ message: 'No orders for this orderID. Please check whether the order ID is correct.' });
      }

      _ordersModel.newOrdersObject.getOrdersFromId(req.params.id, function (err, result) {
        if (result.rowCount === 0) {
          var _responseObj3 = { message: 'No item found with this Order ID..', order: result.rows };
          res.status(400).send(_responseObj3);
        }
        var responseObj = { message: 'status updated successfully', numberOfItems: result.rowCount, order: result.rows };
        res.status(200).send(responseObj);
      });
      // return res.status(200).send({ message: 'status updated successfully' });
    });
  }
};
exports.default = Order;