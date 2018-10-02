"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var orders = exports.orders = [];

var ordersClass = function () {
  function ordersClass() {
    _classCallCheck(this, ordersClass);
  }
  //place Order


  _createClass(ordersClass, [{
    key: "place",
    value: function place(data) {
      var newOrder = {
        orderID: data.orderID,
        user: data.username,
        order: data.order,
        status: data.status
      };
      orders.push(newOrder);
      return newOrder;
    }

    //get all orders by a particular USER

  }, {
    key: "getOrders",
    value: function getOrders(userid) {
      var order = [];
      orders.forEach(function (element, index) {
        if (element.user === userid) {
          order = order.concat(element);
        }
      });
      return order;
    }

    //get all items from a specific order, using the orderID

  }, {
    key: "getOrdersFromId",
    value: function getOrdersFromId(orderid) {
      var order = [];
      orders.forEach(function (element, index) {
        if (element.orderID === orderid) {
          order = order.concat(element);
        }
      });
      return order;
    }

    // Admin get all Orders

  }, {
    key: "getAllOrders",
    value: function getAllOrders() {
      return orders;
    }
  }, {
    key: "updateOrderStatus",
    value: function updateOrderStatus(orderid, status) {
      var order = [];
      orders.forEach(function (element, index) {
        if (element.orderID === orderid) {
          element.status = status;
          order = order.concat(element);
        }
      });
      return order;
    }
  }]);

  return ordersClass;
}();

var newOrdersObject = exports.newOrdersObject = new ordersClass();