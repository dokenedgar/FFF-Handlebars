'use strict';

var _dbconfig = require('./dbconfig');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queryText = 'CREATE TABLE IF NOT EXISTS\n      users (\n        count SERIAL PRIMARY KEY,\n        firstname VARCHAR(20) NOT NULL,\n        surname VARCHAR(20) NOT NULL,\n        phone VARCHAR(20) NOT NULL,\n        username VARCHAR(20) NOT NULL,\n        password VARCHAR(20) NOT NULL,\n        userid VARCHAR(20) NOT NULL\n      )';

_dbconfig2.default.query(queryText, function (error) {
  if (error) {
    console.log(error);
  }
});

var queryTextOrders = 'CREATE TABLE IF NOT EXISTS\n      orders (\n        id SERIAL PRIMARY KEY,\n        orderid UUID NOT NULL,\n        foodid UUID NOT NULL,\n        quantity VARCHAR(5) NOT NULL,\n        status VARCHAR(20) NOT NULL\n      )';

_dbconfig2.default.query(queryTextOrders, function (error) {
  if (error) {
    console.log(error);
  }
});

var queryTextOrdersSummary = 'CREATE TABLE IF NOT EXISTS\n      ordersummary (\n        id SERIAL PRIMARY KEY,\n        orderid UUID NOT NULL,\n        userid UUID NOT NULL,\n        price INTEGER NOT NULL\n      )';

_dbconfig2.default.query(queryTextOrdersSummary, function (error) {
  if (error) {
    console.log(error);
  }
});

var queryTextMessages = 'CREATE TABLE IF NOT EXISTS\n      messages (\n        id SERIAL PRIMARY KEY,\n        sender VARCHAR(20) NOT NULL,\n        receiver VARCHAR(20) NOT NULL,\n        message TEXT NOT NULL\n        \n      )';

_dbconfig2.default.query(queryTextMessages, function (error) {
  if (error) {
    console.log(error);
  }
});

var queryTextMenu = 'CREATE TABLE IF NOT EXISTS\n      menu (\n        id SERIAL,\n        foodid UUID PRIMARY KEY NOT NULL,\n        foodname VARCHAR(20) NOT NULL,\n        foodprice INTEGER NOT NULL,\n        fooddescription TEXT NOT NULL        \n      )';

_dbconfig2.default.query(queryTextMenu, function (error) {
  if (error) {
    console.log(error);
  }
});