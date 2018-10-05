'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newOrdersObject = exports.orders = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbconfig = require('../../pgdb/dbconfig');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var orders = exports.orders = [];

var ordersClass = function () {
  function ordersClass() {
    _classCallCheck(this, ordersClass);
  }
  //place Order


  _createClass(ordersClass, [{
    key: 'place',
    value: function place(data, userid) {
      var newOrder = {
        orderID: data.orderID,
        userid: userid,
        order: data.order
      };

      data.order.forEach(function (element, index) {
        _dbconfig2.default.query('INSERT INTO orders (orderid, foodid, quantity, status, userid) values($1, $2, $3, $4, $5)', [data.orderID, element.foodid, element.quantity, data.status, userid], function (err) {
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

  }, {
    key: 'getOrders',
    value: function getOrders(userid, callback) {
      _dbconfig2.default.query('SELECT * FROM orders where userid=($1)', [userid], function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
    }

    //get all items from a specific order, using the orderID

  }, {
    key: 'getOrdersFromId',
    value: function getOrdersFromId(orderid, callback) {
      _dbconfig2.default.query('SELECT * FROM orders where orderid=($1)', [orderid], function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
    }

    // Admin get all Orders

  }, {
    key: 'getAllOrders',
    value: function getAllOrders(callback) {
      _dbconfig2.default.query('SELECT * FROM orders', function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
    }
  }, {
    key: 'updateOrderStatus',
    value: function updateOrderStatus(orderid, status, callback) {
      _dbconfig2.default.query('UPDATE orders SET status=($1) WHERE orderid=($2)', [status, orderid], function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
    }
  }]);

  return ordersClass;
}();

var newOrdersObject = exports.newOrdersObject = new ordersClass();