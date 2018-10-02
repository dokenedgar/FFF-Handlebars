'use strict';

var _dbconfig = require('./dbconfig');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//db.query('DROP TABLE IF EXISTS reflections')

var queryText = 'DROP TABLE IF EXISTS users';

_dbconfig2.default.query(queryText, function (error) {
	if (error) {
		console.log(error);
	}
});