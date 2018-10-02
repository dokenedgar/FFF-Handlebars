import { messagesFromAdmin, messagesToAdmin, newMessageObject } from '../models/messagesModel';

const Messages = {
  getMessageFromAdmin(req, res){
    const messages = newMessageObject.getMessagesFromAdmin(req.params.userid);
    if (messages.length > 0) {
      let responseObj = { message: 'messages found for this user', numberOfMessages: messages.length, messages };
      res.status(200).send(responseObj);
    }
    else {
      let responseObj = { message: 'No messages yet for this user..', messages };
      res.status(400).send(responseObj);
    }
},

  sendMessageToAdmin(req, res) {
    if (!req.body.sender|| !req.body.message) {
      return res.status(400).send({ message: 'Problem sending' });
    }
    const newMessage = {
      sender: req.body.sender, message: req.body.message
    };
    const message = newMessageObject.sendMessagesToAdmin(newMessage);
    const response = { success: true, message: 'Message sent successfully', newMessage}
    return res.status(201).send(response);
  },

  getMessagesFromUsers(req, res) {
    const messages = newMessageObject.getMessagesFromUsers();
    if (messages.length > 0) {
      let responseObj = { message: 'messages received by the admin', numberOfMessages : messages.length, messages };
      res.status(200).send(responseObj);
    }
    else {
      let responseObj = { message: 'No messages yet from customers!', numberOfMessages: messages.length, messages };
      res.send(responseObj);
    }
  }
}
export default Messages;