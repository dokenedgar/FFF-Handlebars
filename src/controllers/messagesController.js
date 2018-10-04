import { messagesFromAdmin, messagesToAdmin, newMessageObject } from '../models/messagesModel';

const Messages = {
  getMessageFromAdmin(req, res){
    if (!req.params.userid) {
      return res.status(400).send({ message: 'All fields required' });
    }
    newMessageObject.getMessagesFromAdmin(req.params.userid, (err, result)=>{
     if (result===undefined) {
        return res.status(400).send({ message: 'Error processing request. Incorrect / invalid id' });
      }     
    if (result.rowCount === 0) {
      return res.status(400).send({ message: 'No messages yet for this user..',  numberOfMessages: result.rowCount, messages: result.rows});
    }
    return res.status(200).send({ message: 'messages found for this user', numberOfMessages: result.rowCount, messages: result.rows});
    });
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
    const messages = newMessageObject.getMessagesFromUsers( (err, result)=>{
          
    if (result.rowCount === 0) {
      return res.status(400).send({ message: 'No messages yet from customers!..',  numberOfMessages: result.rowCount, messages: result.rows});
    }
    return res.status(200).send({ message: 'messages received by the admin', numberOfMessages: result.rowCount, messages: result.rows});
    });
  },

  sendMessageToUsers(req, res) {
    if (!req.body.receiver|| !req.body.message) {
      return res.status(400).send({ message: 'Problem sending' });
    }
    const newMessage = {
      receiver: req.body.receiver, message: req.body.message
    };
    const message = newMessageObject.sendMessageToUser(newMessage);
    const response = { success: true, message: 'Message sent successfully', newMessage}
    return res.status(201).send(response);
  }
}
export default Messages;