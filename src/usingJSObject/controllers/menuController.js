import { foodList, newFoodObject } from '../models/menuModel';

const MenuItem = {
  create(req, res) {
    if (!req.body.foodName) {
      return res.status(400).send({ message: 'All fields required' });
    }
    const newFood = newFoodObject.create(req.body);
    const response = { success: true, message: 'New food added successfully', newFood}
    return res.status(201).send(response);
  },

  getAllMenu(req, res) {
    const menu = newFoodObject.getAll();
    return res.status(200).send({ message: 'food items on this platform', numberOfItems: menu.length, menu });
  },

  getSingleFood(req, res) {
    const food = newFoodObject.findFood(req.params.name);
    if (food.length > 0) {
      let responseObj = { message: 'Food to be edited', food };
      res.status(200).send(responseObj);
    }
    else {
      let responseObj = { message: 'Problem loading food details, check food name', food };
      res.status(400).send(responseObj);
    }
  },

  updateFoodDetails(req, res) {
    if (!req.body.foodName) {
      return res.status(400).send({ message: 'All fields required' });
    }
    const food = newFoodObject.updateFoodDetails(req.body);
    if (food.length > 0) {
      let responseObj = { message: 'Food details edited successfully', food };
      res.status(200).send(responseObj);
    }
    else {
      let responseObj = { message: 'Problem updating food, check food name', food };
      res.status(400).send(responseObj);
    }
  },

  deleteFood(req, res) {
    if (!req.body.foodName) {
      return res.status(400).send({ message: 'All fields required' });
    }
    let deleteSuccess = newFoodObject.deleteFood(req.body.foodName);
    if (deleteSuccess) {
      let responseObj = { message : 'Food item deleted successfully', foodList };
      res.status(200).send(responseObj);
    }
    else {
      let responseObj = { message: 'Problem deleting food item, check food name', foodName: res.body.foodName };
      res.status(400).send(responseObj);
    }
  }
  // add edit, update and delete
}
export default MenuItem;