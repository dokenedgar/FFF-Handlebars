'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newMessageObject = exports.messagesToAdmin = exports.messagesFromAdmin = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbconfig = require('../../pgdb/dbconfig');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var messagesFromAdmin = exports.messagesFromAdmin = [{ receiver: 'McDave', message: 'Order received' }, { receiver: 'Franky', message: 'Your order of Rice and burger of Monday 4th April has been completed. Thank you for using our service' }, { receiver: 'Franky', message: 'Order accepted' }, { receiver: 'McDave', message: 'Welcome to Fast Food Fast. Thank you for registering and we hope you have a wonderful experience with us' }];

var messagesToAdmin = exports.messagesToAdmin = [];

var Messages = function () {
  function Messages() {
    _classCallCheck(this, Messages);
  }

  _createClass(Messages, [{
    key: 'getMessagesFromAdmin',
    value: function getMessagesFromAdmin(userid, callback) {
      _dbconfig2.default.query('SELECT * FROM messages where receiver=($1)', [userid], function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
    }
  }, {
    key: 'sendMessagesToAdmin',
    value: function sendMessagesToAdmin(data) {
      var newMessage = {
        sender: data.sender,
        message: data.message
      };
      _dbconfig2.default.query('INSERT INTO messages (sender, receiver, message) values($1, $2, $3)', [data.sender, 'admin', data.message], function (err) {
        if (err) {
          console.log(err);
        }
      });
      return newMessage;
    }

    //getMsgs from users / send msgs to users

  }, {
    key: 'getMessagesFromUsers',
    value: function getMessagesFromUsers(callback) {
      _dbconfig2.default.query('SELECT * FROM messages where receiver=($1)', ['admin'], function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
    }
  }, {
    key: 'sendMessageToUser',
    value: function sendMessageToUser(data) {
      var newMessage = {
        sender: data.sender,
        message: data.message
      };
      _dbconfig2.default.query('INSERT INTO messages (sender, receiver, message) values($1, $2, $3)', ['admin', data.receiver, data.message], function (err) {
        if (err) {
          console.log(err);
        }
      });
      return newMessage;
    }
  }]);

  return Messages;
}();

var newMessageObject = exports.newMessageObject = new Messages();