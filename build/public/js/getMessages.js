'use strict';

var signInerrors = document.getElementById('errors');
var name = document.getElementById('msgName');
var tblHistory = document.getElementById('inbox');

fetch('http://localhost:3000/api/v1/messages/' + localStorage.loggedUser, { headers: { 'authorization': 'Bearer ' + localStorage.fff_token } }).then(function (resp) {
  return resp.json();
}).then(function (data) {
  var orders = JSON.parse(JSON.stringify(data));
  orders.messages.forEach(function (elementf, index) {
    var row = tblHistory.insertRow(index + 1);
    var serialNum = row.insertCell(0);
    var message = row.insertCell(1);
    var dateReceived = row.insertCell(2);
    serialNum.innerHTML = index + 1;
    message.innerHTML = elementf.message;
    dateReceived.innerHTML = new Date().toUTCString();
  });
}).catch(function (err) {
  return window.location.href = 'http://localhost:3000/signin';
});

var sendMsg = function sendMsg() {
  name = localStorage.loggedUser;
  var message = document.getElementById('txtMsg').value;
  if (name.length < 2 || message < 5) {
    signInerrors.innerHTML = 'Name has to be atleast 2 characters and message at least 5 characters!';
  } else {
    fetch('http://localhost:3000/api/v1/messages/' + localStorage.loggedUser, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.fff_token },
      body: JSON.stringify({ sender: localStorage.loggedUser, message: message })
    }).then(function (resp) {
      return resp.json();
    }).then(function (resp) {
      signInerrors.style.color = 'green';
      signInerrors.innerHTML = 'Message sent successfully';
    }).catch(function (error) {
      return window.location.href = 'http://localhost:3000/signin';
    });
  }
};