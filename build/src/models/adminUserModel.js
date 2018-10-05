'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var adminUsers = exports.adminUsers = [{ username: 'lionel', password: 'messi' }, { username: 'sergio', password: 'ramos' }];

var adminClass = function () {
  function adminClass() {
    _classCallCheck(this, adminClass);
  }

  _createClass(adminClass, [{
    key: 'create',
    value: function create(data) {
      var newAdmin = {
        username: data.username

      };
      adminUsers.push(newAdmin);
      return newAdmin;
    }
  }, {
    key: 'findUser',
    value: function findUser(username, password) {
      return adminUsers.find(function (admin) {
        return admin.username === username && admin.password === password;
      });
    }
  }]);

  return adminClass;
}();

var newAdminObject = exports.newAdminObject = new adminClass();