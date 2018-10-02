export const adminUsers = [
  { username: 'lionel', password: 'messi' },
  { username: 'sergio', password: 'ramos' }
];

class adminClass {
  constructor() {
  }

  create(data) {
    const newAdmin = {
      username: data.username,
      password: data.password
    }
    adminUsers.push(newAdmin);
    return newAdmin;
  }

  findUser(username, password) {
    return adminUsers.find(admin => admin.username === username && admin.password === password);
  }
}

export const newAdminObject = new adminClass();