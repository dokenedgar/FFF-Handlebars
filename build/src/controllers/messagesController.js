'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _messagesModel = require('../models/messagesModel');

var Messages = {
  getMessageFromAdmin: function getMessageFromAdmin(req, res) {
    var messages = _messagesModel.newMessageObject.getMessagesFromAdmin(req.params.userid);
    if (messages.length > 0) {
      var responseObj = { message: 'messages found for this user', numberOfMessages: messages.length, messages: messages };
      res.status(200).send(responseObj);
    } else {
      var _responseObj = { message: 'No messages yet for this user..', messages: messages };
      res.status(400).send(_responseObj);
    }
  },
  sendMessageToAdmin: function sendMessageToAdmin(req, res) {
    if (!req.body.sender || !req.body.message) {
      return res.status(400).send({ 'message': 'Problem sending' });
    }
    var newMessage = {
      sender: req.body.sender, message: req.body.message
    };
    var message = _messagesModel.newMessageObject.sendMessagesToAdmin(newMessage);
    var response = { 'success': true, 'message': 'Message sent successfully', newMessage: newMessage };
    return res.status(201).send(response);
  },
  getMessagesFromUsers: function getMessagesFromUsers(req, res) {
    var messages = _messagesModel.newMessageObject.getMessagesFromUsers();
    if (messages.length > 0) {
      var responseObj = { 'message': 'messages received by the admin', numberOfMessages: messages.length, messages: messages };
      res.status(200).send(responseObj);
    } else {
      var _responseObj2 = { message: 'No messages yet from customers!', numberOfMessages: messages.length, messages: messages };
      res.send(_responseObj2);
    }
  }
};

exports.default = Messages;