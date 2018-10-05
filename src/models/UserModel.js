import db from '../../pgdb/dbconfig';
import uuidv4 from 'uuid/v4';


export const users = [];

class UserClass {
  constructor() {
}

  create(data) {
    
    const userid = uuidv4();

    const newUser = {
      firstname: data.firstname,
      surname: data.surname,
      phone: data.phone,
      username: data.username,
      userid
    }

     db.query('INSERT INTO users (firstname, surname, phone, username, password, userid) values($1, $2, $3, $4, $5, $6)',
    [data.firstname, data.surname, data.phone, data.username, data.password, userid], (err)=>{
      if (err) {
        console.log(err);
      }
    });
    return newUser;
  }

  findUser(username, password, callback) {
    db.query('SELECT userid FROM users where username=($1) AND password=($2)',
    [username, password], (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    
    });
  }
  
}

export const newUserObject = new UserClass();