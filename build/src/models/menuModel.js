'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var foodList = exports.foodList = [{ foodName: 'Spaghetti', foodPrice: '350', foodDesc: 'Nicely cooked nigerian-styled spaghetti' }, { foodName: 'Plantain', foodPrice: '100', foodDesc: 'Fresh plantain fried to the perfect degree' }, { foodName: 'Pizza', foodPrice: '1000', foodDesc: 'Freshly baked Pizza, with the finest of ingredients' }, { foodName: 'Burger', foodPrice: '500', foodDesc: 'Delicious burgers from our seasoned chef' }, { foodName: 'Hot Dog', foodPrice: '300', foodDesc: 'Fresh Hot dogs' }, { foodName: 'Doughnut', foodPrice: '100', foodDesc: 'Soft and doughnut' }, { foodName: 'Fried Chicken', foodPrice: '400', foodDesc: 'Tasty chicken fried to the right degree and right oil' }, { foodName: 'Chips', foodPrice: '250', foodDesc: 'Soft and crisp chips!' }, { foodName: 'Fried Eggs', foodPrice: '150', foodDesc: 'Quality fried eggs, from healthy chickens with amazing spices' }, { foodName: 'Bacon', foodPrice: '650', foodDesc: 'Fine bacon from the healthiest of animals' }];

var foodItems = function () {
  function foodItems() {
    _classCallCheck(this, foodItems);
  }

  _createClass(foodItems, [{
    key: 'create',
    value: function create(data) {
      var newFood = {
        foodName: data.foodName,
        foodPrice: data.foodPrice,
        foodDesc: data.foodDesc
      };
      foodList.push(newFood);
      return newFood;
    }
  }, {
    key: 'findFood',
    value: function findFood(foodName) {
      var food = [];
      foodList.forEach(function (element, index) {
        if (element.foodName === foodName) {
          food = food.concat(element);
        }
      });
      return food;
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      return foodList;
    }
  }, {
    key: 'updateFoodDetails',
    value: function updateFoodDetails(data) {
      var food = [];
      foodList.forEach(function (element, index) {
        if (element.foodName === data.foodName) {
          element.foodPrice = data.foodPrice;
          element.foodDesc = data.foodDesc;
          food = food.concat(element);
        }
      });
      return food;
    }
  }, {
    key: 'deleteFood',
    value: function deleteFood(name) {
      var foodDelete = false;;
      foodList.forEach(function (element, index) {
        if (element.foodName === name) {
          foodList.splice(index, 1);
          foodDelete = true;
        }
      });
      return foodDelete;
    }
  }]);

  return foodItems;
}();

var newFoodObject = exports.newFoodObject = new foodItems();