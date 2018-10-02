import db from '../../../pgdb/dbconfig';


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
    
     db.query('INSERT INTO users (firstname, surname, phone, username, password) values($1, $2, $3, $4, $5)',
    [data.firstname, data.surname, data.phone, data.username, data.password], (err)=>{
      if (err) {
        console.log(err);
      }
    });
    return newUser;
  }

  findUser(username, password) {
    return users.find(user => user.username === username && user.password === password);
  }
}

export const newUserObject = new UserClass();