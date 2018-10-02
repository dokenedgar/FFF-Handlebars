'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _adminUserModel = require('../models/adminUserModel');

var AdminUser = {
	create: function create(req, res) {
		if (!req.body.username) {
			return res.status(400).send({ 'message': 'All fields required' });
		}
		var user = _adminUserModel.newAdminObject.create(req.body);
		var response = { 'success': true, 'message': 'New Admin registered', user: user };
		return res.status(201).send(response);
	},

	//other methods here
	getUser: function getUser(req, res) {
		var user = _adminUserModel.newAdminObject.findUser(req.body.username, req.body.password);
		if (!user) {
			return res.status(404).send({ 'message': 'user not found' });
		}
		return res.status(200).send({ 'message': 'user found' });
	}
};

exports.default = AdminUser;