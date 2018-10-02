import { users, newUserObject } from '../models/UserModel';

const User = {
  create(req, res) {
    if (!req.body.firstname) {
      return res.status(400).send({ message: 'All fields required' });
    }
    const user = newUserObject.create(req.body);
    const response = { success: true, message: 'New user registered', user }
    return res.status(201).send(response);
  },
  // other methods here
  getUser(req, res) {
    const user = newUserObject.findUser(req.body.username, req.body.password);
    if (!user) {
      return res.status(400).send({ message: 'user not found' });
    }
    return res.status(200).send({ message: 'user found' });
  }
}
export default User;