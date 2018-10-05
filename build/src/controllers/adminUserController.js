'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adminUserModel = require('../models/adminUserModel');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdminUser = {
  create: function create(req, res) {
    if (!req.body.username) {
      return res.status(400).send({ message: 'All fields required' });
    }
    if (!req.body.username || req.body.username.length < 5 || req.body.username.length > 20 || /\s/.test(req.body.username)) {
      return res.status(400).send({ message: 'Error saving data. Please choose a good username with at least 5' });
    }
    if (!req.body.password || req.body.password.length < 5 || req.body.password.length > 20 || /\s/.test(req.body.password)) {
      return res.status(400).send({ message: 'Error saving data. Please choose a strong password of atleast 5 characters' });
    }
    var user = _adminUserModel.newAdminObject.create(req.body);
    var response = { success: true, message: 'New Admin registered', user: user };
    return res.status(201).send(response);
  },

  // other methods here
  getUser: function getUser(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'All fields required' });
    }
    if (!req.body.username || req.body.username.length < 5 || req.body.username.length > 20 || /\s/.test(req.body.username)) {
      return res.status(400).send({ message: 'Error processing request. Please enter username with at least 5' });
    }
    if (!req.body.password || req.body.password.length < 5 || req.body.password.length > 20 || /\s/.test(req.body.password)) {
      return res.status(400).send({ message: 'Error processing request. Please enter password of atleast 5 characters' });
    }

    var user = _adminUserModel.newAdminObject.findUser(req.body.username, req.body.password);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    _jsonwebtoken2.default.sign({ userid: req.body.username }, '4dm1#-7t3', { expiresIn: '24h' }, function (err, token) {
      return res.status(200).send({ message: 'user found', token: token });
    });
  }
};
exports.default = AdminUser;