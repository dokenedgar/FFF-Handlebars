'use strict';

var _dbconfig = require('./dbconfig');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//db.query('DROP TABLE IF EXISTS reflections')

var queryText = 'CREATE TABLE IF NOT EXISTS\n      users (\n        id SERIAL PRIMARY KEY,\n        firstname VARCHAR(20) NOT NULL,\n        surname VARCHAR(20) NOT NULL,\n        phone VARCHAR(20) NOT NULL,\n        username VARCHAR(20) NOT NULL,\n        password VARCHAR(20) NOT NULL\n      )';

_dbconfig2.default.query(queryText, function (error) {
  if (error) {
    console.log(error);
  }
});