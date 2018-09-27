'use strict';

var tblHistory = document.getElementById('inbox');
var signInerrors = document.getElementById('errors');

fetch('https://dokenedgar.herokuapp.com/api/v1/admin/messages', { headers: { 'authorization': 'Bearer ' + localStorage.admin_token } }).then(function (resp) {
  return resp.json();
}).then(function (data) {
  var orders = JSON.parse(JSON.stringify(data));
  console.log(orders);
  orders.messagesToAdmin.forEach(function (elementf, index) {
    var row = tblHistory.insertRow(index + 1);
    var serialNum = row.insertCell(0);
    var sender = row.insertCell(1);
    var message = row.insertCell(2);
    var dateReceived = row.insertCell(3);
    serialNum.innerHTML = index + 1;
    sender.innerHTML = elementf.sender;
    message.innerHTML = elementf.message;
    dateReceived.innerHTML = new Date().toUTCString();
  });
}).catch(function (err) {
  return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
}); //console.log(error))

function sendAdminMsg() {
  var name = document.getElementById('msgName').value;
  var msg = document.getElementById('txtMsg').value;
  if (name.length < 2 || msg < 5) {
    signInerrors.innerHTML = 'Name has to be atleast 2 characters and message at least 5 characters!';
  } else {
    fetch('https://dokenedgar.herokuapp.com/api/v1/admin/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.admin_token },
      body: JSON.stringify({ receiver: name, message: msg })
    }).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      var user = JSON.parse(JSON.stringify(data));
      if (user.userFound) {
        signInerrors.style.color = 'green';
        signInerrors.innerHTML = 'Message sent successfully';
      } else {
        signInerrors.style.color = 'red';
        signInerrors.innerHTML = 'Problem sending message. Possibly check receiver username..';
      }
    }).catch(function (error) {
      return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
    }); //console.log(error))
  }
}