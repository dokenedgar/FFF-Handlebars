'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newFoodObject = exports.foodList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _dbconfig = require('../../pgdb/dbconfig');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var foodList = exports.foodList = [{ foodName: 'Spaghetti', foodPrice: '350', foodDesc: 'Nicely cooked nigerian-styled spaghetti' }, { foodName: 'Plantain', foodPrice: '100', foodDesc: 'Fresh plantain fried to the perfect degree' }, { foodName: 'Pizza', foodPrice: '1000', foodDesc: 'Freshly baked Pizza, with the finest of ingredients' }, { foodName: 'Burger', foodPrice: '500', foodDesc: 'Delicious burgers from our seasoned chef' }, { foodName: 'Hot Dog', foodPrice: '300', foodDesc: 'Fresh Hot dogs' }, { foodName: 'Doughnut', foodPrice: '100', foodDesc: 'Soft and doughnut' }, { foodName: 'Fried Chicken', foodPrice: '400', foodDesc: 'Tasty chicken fried to the right degree and right oil' }, { foodName: 'Chips', foodPrice: '250', foodDesc: 'Soft and crisp chips!' }, { foodName: 'Fried Eggs', foodPrice: '150', foodDesc: 'Quality fried eggs, from healthy chickens with amazing spices' }, { foodName: 'Bacon', foodPrice: '650', foodDesc: 'Fine bacon from the healthiest of animals' }];

var foodItems = function () {
  function foodItems() {
    _classCallCheck(this, foodItems);
  }
  //uuidv4()


  _createClass(foodItems, [{
    key: 'create',
    value: function create(data) {
      var foodID = (0, _v2.default)();
      _dbconfig2.default.query('INSERT INTO menu (foodid, foodname, foodprice, fooddescription) values($1, $2, $3, $4)', [foodID, data.foodName, data.foodPrice, data.foodDescription], function (err) {
        if (err) {
          console.log(err);
        }
      });
      var newFood = {
        foodID: foodID, foodName: data.foodName, foodPrice: data.foodPrice, foodDescription: data.foodDescription
      };
      return newFood;
    }
  }, {
    key: 'findFood',
    value: function findFood(foodid, callback) {
      _dbconfig2.default.query('SELECT * FROM menu where foodid=($1)', [foodid], function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
    }
  }, {
    key: 'getAll',
    value: function getAll(callback) {
      _dbconfig2.default.query('SELECT * FROM menu', function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
    }
  }, {
    key: 'updateFoodDetails',
    value: function updateFoodDetails(foodid, data, callback) {
      var food = {
        //add food name
        foodID: foodid,
        foodName: data.foodName,
        foodPrice: data.foodPrice,
        foodDescription: data.foodDescription
      };

      _dbconfig2.default.query('UPDATE menu SET foodname=($1), foodprice=($2), fooddescription=($3) WHERE foodid=($4)', [data.foodName, data.foodPrice, data.foodDescription, foodid], function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
      return food;
    }
  }, {
    key: 'deleteFood',
    value: function deleteFood(foodid, callback) {
      var foodDelete = false;
      _dbconfig2.default.query('DELETE FROM menu WHERE foodid=($1)', [foodid], function (err, res) {
        if (err) {
          console.log(err);
        }
        callback(err, res);
      });
      return foodDelete;
    }
  }]);

  return foodItems;
}();

var newFoodObject = exports.newFoodObject = new foodItems();