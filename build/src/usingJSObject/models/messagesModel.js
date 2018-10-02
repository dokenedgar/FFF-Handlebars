'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var messagesFromAdmin = exports.messagesFromAdmin = [{ receiver: 'McDave', message: 'Order received' }, { receiver: 'Franky', message: 'Your order of Rice and burger of Monday 4th April has been completed. Thank you for using our service' }, { receiver: 'Franky', message: 'Order accepted' }, { receiver: 'McDave', message: 'Welcome to Fast Food Fast. Thank you for registering and we hope you have a wonderful experience with us' }];

var messagesToAdmin = exports.messagesToAdmin = [];

var Messages = function () {
	function Messages() {
		_classCallCheck(this, Messages);
	}

	_createClass(Messages, [{
		key: 'getMessagesFromAdmin',
		value: function getMessagesFromAdmin(userid) {
			var messages = [];
			messagesFromAdmin.forEach(function (element, index) {
				if (element.receiver === userid) {
					messages = messages.concat(element);
				}
			});
			return messages;
		}
	}, {
		key: 'sendMessagesToAdmin',
		value: function sendMessagesToAdmin(data) {
			var newMessage = {
				sender: data.sender,
				message: data.message
			};
			messagesToAdmin.push(newMessage);
			return newMessage;
		}

		//getMsgs from users / send msgs to users

	}, {
		key: 'getMessagesFromUsers',
		value: function getMessagesFromUsers() {
			return messagesToAdmin;
		}
	}, {
		key: 'sendMessageToUser',
		value: function sendMessageToUser() {}
	}]);

	return Messages;
}();

var newMessageObject = exports.newMessageObject = new Messages();