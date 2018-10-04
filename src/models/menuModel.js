import uuidv4 from 'uuid/v4';
import db from '../../pgdb/dbconfig';
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
//uuidv4()
  create(data){
    const foodID = uuidv4();
    db.query('INSERT INTO menu (foodid, foodname, foodprice, fooddescription) values($1, $2, $3, $4)',
    [foodID, data.foodName, data.foodPrice, data.foodDescription], (err)=>{
      if (err) {
        console.log(err);
      }
    });
    const newFood = {
      foodID, foodName: data.foodName, foodPrice: data.foodPrice, foodDescription: data.foodDescription
    }
    return newFood;
  }

  findFood(foodid, callback){
    db.query('SELECT * FROM menu where foodid=($1)',
    [foodid], (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    });
  }

  getAll(callback){
    db.query('SELECT * FROM menu', (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    
    });
  }
  
  updateFoodDetails(foodid, data, callback){
    let food = {
      //add food name
          foodID: foodid,
          foodName: data.foodName,
          foodPrice: data.foodPrice,
          foodDescription: data.foodDescription
        }

    db.query('UPDATE menu SET foodname=($1), foodprice=($2), fooddescription=($3) WHERE foodid=($4)',
    [data.foodName, data.foodPrice, data.foodDescription, foodid], (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    
    });
    return food;
  }

  deleteFood(foodid, callback){
    let foodDelete = false;
    db.query('DELETE FROM menu WHERE foodid=($1)',
    [foodid], (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    
    });
    return foodDelete;
  }
}

export const newFoodObject = new foodItems();