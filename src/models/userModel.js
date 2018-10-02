export const users = [
  {
    firstname: 'Yakubu', surname: 'Frank', phone: '12345678900', username: 'Franky', password: 'superfrank'
  },
  {
    firstname: 'David', surname: 'McKenxie', phone: '09876543211', username: 'McDave', password: 'pword' 
  }
];

class UserClass {
  constructor() {
}

  create(data) {
    const newUser = {
      firstname: data.firstname,
      surname: data.surname,
      phone: data.phone,
      username: data.username,
      password: data.password
    }
    users.push(newUser);
    return newUser;
  }

  findUser(username, password) {
    return users.find(user => user.username === username && user.password === password);
  }
}

export const newUserObject = new UserClass();