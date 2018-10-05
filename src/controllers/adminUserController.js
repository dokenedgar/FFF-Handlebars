import { adminUsers, newAdminObject } from '../models/adminUserModel';
import jwt from 'jsonwebtoken';

const AdminUser = {
  create(req, res) {
  if(!req.body.username) {
      return res.status(400).send({ message: 'All fields required' });
    }
     if (!req.body.username || (req.body.username.length < 5 ) || (req.body.username.length > 20 ) || (/\s/.test(req.body.username)) ) {
      return res.status(400).send({ message: 'Error saving data. Please choose a good username with at least 5' });
    }
    if (!req.body.password || (req.body.password.length < 5 ) || (req.body.password.length > 20 ) || (/\s/.test(req.body.password)) ) {
      return res.status(400).send({ message: 'Error saving data. Please choose a strong password of atleast 5 characters' });
    }
    const user = newAdminObject.create(req.body);
    const response = { success: true, message: 'New Admin registered', user }
    return res.status(201).send(response);
  },
  // other methods here
  getUser(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'All fields required' });
    }
    if (!req.body.username || (req.body.username.length < 5 ) || (req.body.username.length > 20 ) || (/\s/.test(req.body.username)) ) {
      return res.status(400).send({ message: 'Error processing request. Please enter username with at least 5' });
    }
    if (!req.body.password || (req.body.password.length < 5 ) || (req.body.password.length > 20 ) || (/\s/.test(req.body.password)) ) {
      return res.status(400).send({ message: 'Error processing request. Please enter password of atleast 5 characters' });
    }

    const user = newAdminObject.findUser(req.body.username, req.body.password);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    jwt.sign({ userid: req.body.username}, '4dm1#-7t3', { expiresIn:'24h' }, (err, token) => {
        return res.status(200).send({ message: 'user found', token });
      });
    
  }
}
export default AdminUser;