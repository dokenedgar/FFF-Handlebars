export const foodList = [
  { foodName: 'Spaghetti', foodPrice: '350', foodDesc: 'Nicely cooked nigerian-styled spaghetti' },
  { foodName: 'Plantain', foodPrice: '100', foodDesc: 'Fresh plantain fried to the perfect degree' },
  { foodName: 'Pizza', foodPrice: '1000', foodDesc: 'Freshly baked Pizza, with the finest of ingredients' },
  { foodName: 'Burger', foodPrice: '500', foodDesc: 'Delicious burgers from our seasoned chef' },
  { foodName: 'Hot Dog', foodPrice: '300', foodDesc: 'Fresh Hot dogs' },
  { foodName: 'Doughnut', foodPrice: '100', foodDesc: 'Soft and doughnut' },
  { foodName: 'Fried Chicken', foodPrice: '400', foodDesc: 'Tasty chicken fried to the right degree and right oil' },
  { foodName: 'Chips', foodPrice: '250', foodDesc: 'Soft and crisp chips!' },
  { foodName: 'Fried Eggs', foodPrice: '150', foodDesc: 'Quality fried eggs, from healthy chickens with amazing spices' },
  { foodName: 'Bacon', foodPrice: '650', foodDesc: 'Fine bacon from the healthiest of animals' }
];

class foodItems {
  constructor(){}

  create(data){
    const newFood = {
      foodName: data.foodName,
      foodPrice: data.foodPrice,
      foodDesc: data.foodDesc
    }
    foodList.push(newFood);
    return newFood;
  }

  findFood(foodName){
    let food = [];
    foodList.forEach((element, index) => {
    if (element.foodName === foodName) {
      food = food.concat(element);
    }
    });
    return food;
  }

  getAll(){
    return foodList;
  }
  
  updateFoodDetails(data){
    let food = [];
      foodList.forEach((element, index) => {
        if (element.foodName === data.foodName) {
          element.foodPrice = data.foodPrice;
          element.foodDesc = data.foodDesc;
          food = food.concat(element);
        }
      });
    return food;
  }

  deleteFood(name){
    let foodDelete = false;;
    foodList.forEach((element, index) => {
        if (element.foodName === name) {
          foodList.splice(index, 1);
          foodDelete = true;
        }
      });
    return foodDelete;
  }
}

export const newFoodObject = new foodItems();