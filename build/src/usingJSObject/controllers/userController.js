'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserModel = require('../models/UserModel');

var User = {
  create: function create(req, res) {
    if (!req.body.firstname) {
      return res.status(400).send({ message: 'All fields required' });
    }
    var user = _UserModel.newUserObject.create(req.body);
    var response = { success: true, message: 'New user registered', user: user };
    return res.status(201).send(response);
  },

  // other methods here
  getUser: function getUser(req, res) {
    var user = _UserModel.newUserObject.findUser(req.body.username, req.body.password);
    if (!user) {
      return res.status(400).send({ message: 'user not found' });
    }
    return res.status(200).send({ message: 'user found' });
  }
};
exports.default = User;