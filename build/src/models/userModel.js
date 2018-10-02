'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var users = exports.users = [{
  firstname: 'Yakubu', surname: 'Frank', phone: '12345678900', username: 'Franky', password: 'superfrank'
}, {
  firstname: 'David', surname: 'McKenxie', phone: '09876543211', username: 'McDave', password: 'pword'
}];

var userClass = function () {
  function userClass() {
    _classCallCheck(this, userClass);
  }

  _createClass(userClass, [{
    key: 'create',
    value: function create(data) {
      var newUser = {
        firstname: data.firstname,
        surname: data.surname,
        phone: data.phone,
        username: data.username,
        password: data.password
      };
      users.push(newUser);
      return newUser;
    }
  }, {
    key: 'findUser',
    value: function findUser(username, password) {
      return users.find(function (user) {
        return user.username === username && user.password === password;
      });
    }
  }]);

  return userClass;
}();

var newUserObject = exports.newUserObject = new userClass();