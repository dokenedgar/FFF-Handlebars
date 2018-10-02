import { adminUsers, newAdminObject } from '../models/adminUserModel';

const AdminUser = {
  create(req, res) {
  if(!req.body.username) {
      return res.status(400).send({ message: 'All fields required' });
    }
    const user = newAdminObject.create(req.body);
    const response = { success: true, message: 'New Admin registered', user }
    return res.status(201).send(response);
  },
  // other methods here
  getUser(req, res) {
    const user = newAdminObject.findUser(req.body.username, req.body.password);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    return res.status(200).send({ message: 'user found' });
  }
}
export default AdminUser;