export const messagesFromAdmin = [
  { receiver: 'McDave', message: 'Order received' },
  { receiver: 'Franky', message: 'Your order of Rice and burger of Monday 4th April has been completed. Thank you for using our service' },
  { receiver: 'Franky', message: 'Order accepted' },
  { receiver: 'McDave', message: 'Welcome to Fast Food Fast. Thank you for registering and we hope you have a wonderful experience with us' }
];

export const messagesToAdmin = [];

class Messages {
	constructor(){}

	getMessagesFromAdmin(userid){
		let messages = [];
   messagesFromAdmin.forEach((element, index) => {
    if (element.receiver === userid) {
      messages = messages.concat(element);
    }
    });
   return messages;
}

	sendMessagesToAdmin(data){
		const newMessage = {
		sender: data.sender,
		message: data.message
		}
		messagesToAdmin.push(newMessage);
		return newMessage;
	}

	//getMsgs from users / send msgs to users
	getMessagesFromUsers(){
		return messagesToAdmin;
	}

	sendMessageToUser(){
		
	}
}

export const newMessageObject = new Messages();