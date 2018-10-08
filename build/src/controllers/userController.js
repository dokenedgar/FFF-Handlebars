'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserModel = require('../models/UserModel');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  create: function create(req, res) {
    if (!req.body.firstname || req.body.firstname.length < 2 || req.body.firstname.length > 20 || /\s/.test(req.body.firstname)) {
      return res.status(400).send({ message: 'Error saving data. First name should have a length of 2 - 20 characters' });
    }
    if (!req.body.surname || req.body.surname.length < 2 || req.body.surname.length > 20 || /\s/.test(req.body.surname)) {
      return res.status(400).send({ message: 'Error saving data. Surname should have a length of 2 - 20 characters' });
    }
    if (!req.body.phone || req.body.phone.length < 11 || req.body.phone.length > 14 || /\s/.test(req.body.phone) || /\D/.test(req.body.phone)) {
      return res.status(400).send({ message: 'Error saving phone data. Phone number should have length of 11, containing only digits' });
    }
    if (!req.body.username || req.body.username.length < 5 || req.body.username.length > 20 || /\s/.test(req.body.username)) {
      return res.status(400).send({ message: 'Error saving data. Please choose a good username with at least 5' });
    }
    if (!req.body.password || req.body.password.length < 5 || req.body.password.length > 20 || /\s/.test(req.body.password)) {
      return res.status(400).send({ message: 'Error saving data. Please choose a strong password of atleast 5 characters' });
    }
    var user = _UserModel.newUserObject.create(req.body);

    var response = { success: true, message: 'New user registered', user: user };
    return res.status(201).send(response);
  },

  // other methods here
  getUser: function getUser(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'All fields required' });
    }
    if (!req.body.username || req.body.username.length < 5 || req.body.username.length > 20 || /\s/.test(req.body.username)) {
      return res.status(400).send({ message: 'Error processing request. Please enter username with at least 5 charcters' });
    }
    if (!req.body.password || req.body.password.length < 5 || req.body.password.length > 20 || /\s/.test(req.body.password)) {
      return res.status(400).send({ message: 'Error processing request. Please enter password of atleast 5 characters' });
    }

    _UserModel.newUserObject.findUser(req.body.username, req.body.password, function (err, result) {
      if (result === undefined) {
        return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
      }
      if (result.rowCount === 0) {
        return res.status(400).send({ message: 'user not found' });
      }
      console.log(result.rows);
      _jsonwebtoken2.default.sign({ userid: result.rows }, '7r3-l4l4', { expiresIn: '24h' }, function (err, token) {
        return res.status(200).send({ message: 'user found', token: token });
      });
    });
  }
};
exports.default = User;