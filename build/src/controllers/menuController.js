'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _menuModel = require('../models/menuModel');

var MenuItem = {
	create: function create(req, res) {
		if (!req.body.foodName) {
			return res.status(400).send({ 'message': 'All fields required' });
		}
		var newFood = _menuModel.newFoodObject.create(req.body);
		var response = { 'success': true, 'message': 'New food added successfully', newFood: newFood };
		return res.status(201).send(response);
	},
	getAllMenu: function getAllMenu(req, res) {
		var menu = _menuModel.newFoodObject.getAll();
		return res.status(200).send({ message: 'food items on this platform', numberOfItems: menu.length, menu: menu });
	},
	getSingleFood: function getSingleFood(req, res) {
		var food = _menuModel.newFoodObject.findFood(req.params.name);
		if (food.length > 0) {
			var responseObj = { 'message': 'Food to be edited', food: food };
			res.status(200).send(responseObj);
		} else {
			var _responseObj = { 'message': 'Problem loading food details, check food name', food: food };
			res.status(400).send(_responseObj);
		}
	},
	updateFoodDetails: function updateFoodDetails(req, res) {
		if (!req.body.foodName) {
			return res.status(400).send({ 'message': 'All fields required' });
		}
		var food = _menuModel.newFoodObject.updateFoodDetails(req.body);
		if (food.length > 0) {
			var responseObj = { 'message': 'Food details edited successfully', food: food };
			res.status(200).send(responseObj);
		} else {
			var _responseObj2 = { 'message': 'Problem updating food, check food name', food: food };
			res.status(400).send(_responseObj2);
		}
	},
	deleteFood: function deleteFood(req, res) {
		if (!req.body.foodName) {
			return res.status(400).send({ 'message': 'All fields required' });
		}
		var deleteSuccess = _menuModel.newFoodObject.deleteFood(req.body.foodName);
		if (deleteSuccess) {
			var responseObj = { 'message': 'Food item deleted successfully', foodList: _menuModel.foodList };
			res.status(200).send(responseObj);
		} else {
			var _responseObj3 = { 'message': 'Problem deleting food item, check food name', foodName: res.body.foodName };
			res.status(400).send(_responseObj3);
		}
	}
	// add edit, update and delete

};

exports.default = MenuItem;