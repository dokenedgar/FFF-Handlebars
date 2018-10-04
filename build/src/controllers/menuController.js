'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menuModel = require('../models/menuModel');

var MenuItem = {
  create: function create(req, res) {
    if (!req.body.foodName) {
      return res.status(400).send({ message: 'All fields required' });
    }
    if (!req.body.foodName || req.body.foodName.length < 2 || req.body.foodName.length > 50) {
      return res.status(400).send({ message: 'Error saving data. First name should have a length of 2 - 20 characters' });
    }
    if (!req.body.foodPrice || req.body.foodPrice.length < 2 || req.body.foodPrice.length > 6 || /\D/.test(req.body.foodPrice)) {
      return res.status(400).send({ message: 'Error saving data. Food price should have a length of 2 - 6 characters' });
    }
    if (!req.body.foodDescription || req.body.foodDescription.length < 5 || req.body.foodDescription.length > 100) {
      return res.status(400).send({ message: 'Error saving data. Food description should have a length of 5 - 100 characters' });
    }
    var newFood = _menuModel.newFoodObject.create(req.body);
    var response = { success: true, message: 'New food added successfully', newFood: newFood };
    return res.status(201).send(response);
  },
  getAllMenu: function getAllMenu(req, res) {
    var menu = _menuModel.newFoodObject.getAll(function (err, result) {
      if (result === undefined) {
        return res.status(400).send({ message: 'No food item stored yet..' });
      } else {
        if (result.rowCount === 0) {
          return res.status(400).send({ message: 'No food item stored yet..' });
        }
        return res.status(200).send({ message: 'food items on this platform', numberOfItems: result.rowCount, menu: result.rows });
      }
    });
  },
  getSingleFood: function getSingleFood(req, res) {
    if (!req.params.foodid) {
      return res.status(400).send({ message: 'All fields required' });
    }
    if (!req.params.foodid || req.params.foodid < 2 || req.params.foodid.length > 50 || /\s/.test(req.params.foodid)) {
      return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
    }
    _menuModel.newFoodObject.findFood(req.params.foodid, function (err, result) {
      if (result === undefined) {
        return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
      }
      if (result.rowCount === 0) {
        return res.status(400).send({ message: 'Problem loading food details, check food id', food: result.rows });
      }
      return res.status(200).send({ message: 'Food requested for', food: result.rows });
    });
  },
  updateFoodDetails: function updateFoodDetails(req, res) {
    if (!req.params.foodid) {
      return res.status(400).send({ message: 'All fields required' });
    }
    if (!req.params.foodid || req.params.foodid < 2 || req.params.foodid.length > 50 || /\s/.test(req.params.foodid)) {
      return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
    }
    var food = _menuModel.newFoodObject.updateFoodDetails(req.params.foodid, req.body, function (err, result) {
      if (result === undefined) {
        return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
      }
      if (result.rowCount === 0) {
        return res.status(400).send({ message: 'Problem updating food, check food id', food: food });
      }
      return res.status(200).send({ message: 'Food details edited successfully', food: food });
    });
  },
  deleteFood: function deleteFood(req, res) {
    if (!req.params.foodid || req.params.foodid < 2 || req.params.foodid.length > 50 || /\s/.test(req.params.foodid)) {
      return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
    }
    _menuModel.newFoodObject.deleteFood(req.params.foodid, function (err, result) {

      if (result.rowCount === 0) {
        return res.status(400).send({ message: 'Problem deleting food item, check food id' });
      }
      _menuModel.newFoodObject.getAll(function (err, result) {
        if (result === undefined) {
          return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
        }
        if (result.rowCount === 0) {
          return res.status(400).send({ message: 'No food item stored yet..' });
        }
        return res.status(200).send({ message: 'Food item deleted successfully', numberOfItems: result.rowCount, menu: result.rows });
      });
    });
  }
};
exports.default = MenuItem;