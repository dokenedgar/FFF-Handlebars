import db from '../../pgdb/dbconfig';
export const messagesFromAdmin = [
  { receiver: 'McDave', message: 'Order received' },
  { receiver: 'Franky', message: 'Your order of Rice and burger of Monday 4th April has been completed. Thank you for using our service' },
  { receiver: 'Franky', message: 'Order accepted' },
  { receiver: 'McDave', message: 'Welcome to Fast Food Fast. Thank you for registering and we hope you have a wonderful experience with us' }
];

export const messagesToAdmin = [];

class Messages {
	constructor(){}

	getMessagesFromAdmin(userid, callback){
		    db.query('SELECT * FROM messages where receiver=($1)',
    [userid], (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    
    });
}

	sendMessagesToAdmin(data){
		const newMessage = {
		sender: data.sender,
		message: data.message
		}
		  db.query('INSERT INTO messages (sender, receiver, message) values($1, $2, $3)',
   		  [data.sender, 'admin', data.message], (err)=>{
      if (err) {
        console.log(err);
      }
    });
		return newMessage;
	}

	//getMsgs from users / send msgs to users
	getMessagesFromUsers(callback){
		db.query('SELECT * FROM messages where receiver=($1)',
    ['admin'], (err, res)=>{
      if (err) {
        console.log(err);
      }
      callback(err, res)
    });
	}

	sendMessageToUser(data){
		const newMessage = {
		sender: data.sender,
		message: data.message
		}
		  db.query('INSERT INTO messages (sender, receiver, message) values($1, $2, $3)',
   		  ['admin', data.receiver, data.message], (err)=>{
      if (err) {
        console.log(err);
      }
    });
		return newMessage;
	}
}

export const newMessageObject = new Messages();