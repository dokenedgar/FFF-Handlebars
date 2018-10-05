import { foodList, newFoodObject } from '../models/menuModel';

const MenuItem = {
  create(req, res) {
    if (!req.body.foodName) {
      return res.status(400).send({ message: 'All fields required' });
    }
    if (!req.body.foodName || (req.body.foodName.length < 2 ) || (req.body.foodName.length > 50 ) ) {
      return res.status(400).send({ message: 'Error saving data. Food name should have a length of 2 - 20 characters' });
    }
    if (!req.body.foodPrice || (req.body.foodPrice.length < 2 ) || (req.body.foodPrice.length > 6 ) || (/\D/.test(req.body.foodPrice)) ) {
      return res.status(400).send({ message: 'Error saving data. Food price should have a length of 2 - 6 characters' });
    }
    if (!req.body.foodDescription || (req.body.foodDescription.length < 5 ) || (req.body.foodDescription.length > 100 )  ) {
      return res.status(400).send({ message: 'Error saving data. Food description should have a length of 5 - 100 characters' });
    }
    const newFood = newFoodObject.create(req.body);
    const response = { success: true, message: 'New food added successfully', newFood}
    return res.status(201).send(response);
  },

  getAllMenu(req, res) {
    const menu = newFoodObject.getAll((err, result)=>{
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

  getSingleFood(req, res) {
    if (!req.params.foodid) {
      return res.status(400).send({ message: 'All fields required' });
    }
    if (!req.params.foodid || (req.params.foodid.length !== 36 ) || (/\s/.test(req.params.foodid)) ) {
      return res.status(400).send({ message: 'Error processing request. Invalid id provided' });
    }
    newFoodObject.findFood(req.params.foodid, (err, result)=>{
          if (result===undefined) {
        return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
      }
    if (result.rowCount === 0) {
      return res.status(400).send({ message: 'Problem loading food details, check food id', food: result.rows });
    }
    return res.status(200).send({ message: 'Food requested for', food: result.rows });
    });
  },

  updateFoodDetails(req, res) {
    if (!req.params.foodid) {
      return res.status(400).send({ message: 'All fields required' });
    }
    if (!req.params.foodid || (req.params.foodid.length !== 36 )  || (/\s/.test(req.params.foodid)) ) {
      return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
    }
    if (!req.body.foodName || (req.body.foodName.length < 3 ) || (req.body.foodName.length > 50 )  ) {
      return res.status(400).send({ message: 'Error processing request. Invalid food name' });
    }
    if (!req.body.foodPrice || (req.body.foodPrice.length < 2 ) || (req.body.foodPrice.length > 6 )|| (/\s/.test(req.params.foodid)) || (/\D/.test(req.body.foodPrice))  ) {
      return res.status(400).send({ message: 'Error processing request. Invalid Price. Make sure to use non-spaced integer' });
    }
    if (!req.body.foodDescription || (req.body.foodDescription.length < 5 ) || (req.body.foodDescription.length > 100 )  ) {
      return res.status(400).send({ message: 'Error processing request. Description is not valid.' });
    }

    const food = newFoodObject.updateFoodDetails(req.params.foodid, req.body, (err, result)=>{
       if (result===undefined) {
        return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
      }
    if (result.rowCount === 0) {
      return res.status(400).send({ message: 'Problem updating food, check food id', food });
    }
    return res.status(200).send({ message: 'Food details edited successfully', food });
    });
  },

  deleteFood(req, res) {
    if (!req.params.foodid || (req.params.foodid.length !== 36 ) || (/\s/.test(req.prams.foodid)) ) {
      return res.status(400).send({ message: 'Error processing request. Invalid id' });
    }
    newFoodObject.deleteFood(req.params.foodid, (err, result)=>{
          
    if (result.rowCount === 0) {
      return res.status(400).send({ message: 'Problem deleting food item, check food id' });
    }
        newFoodObject.getAll((err, result)=>{     
          if (result===undefined) {
        return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
      }
        if (result.rowCount === 0) {
          return res.status(400).send({ message: 'No food item stored yet..' });
        }
        return res.status(200).send({ message: 'Food item deleted successfully', numberOfItems: result.rowCount, menu: result.rows });
      })
    
  });

  }

}
export default MenuItem;