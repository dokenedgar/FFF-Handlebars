'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserObject = exports.users = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbconfig = require('../../pgdb/dbconfig');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var users = exports.users = [];

var UserClass = function () {
  function UserClass() {
    _classCallCheck(this, UserClass);
  }

  _createClass(UserClass, [{
    key: 'create',
    value: function create(data) {

      var userid = (0, _v2.default)();

      var newUser = {
        firstname: data.firstname,
        surname: data.surname,
        phone: data.phone,
        username: data.username,
        userid: userid
      };

      _dbconfig2.default.query('INSERT INTO users (firstname, surname, phone, username, password, userid) values($1, $2, $3, $4, $5, $6)', [data.firstname, data.surname, data.phone, data.username, data.password, userid], function (err) {
        if (err) {
          console.log(err);
        }
      });
      return newUser;
    }
  }, {
    key: 'findUser',
    value: function findUser(username, password, callback) {
      _dbconfig2.default.query('SELECT userid FROM users where username=($1) AND password=($2)', [username, password], function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
    }
  }]);

  return UserClass;
}();

var newUserObject = exports.newUserObject = new UserClass();