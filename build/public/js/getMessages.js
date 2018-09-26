'use strict';

var tblHistory = document.getElementById('inbox');

fetch('https://dokenedgar.herokuapp.com/api/v1/messages/' + localStorage.loggedUser, { headers: { 'authorization': 'Bearer ' + localStorage.fff_token } }).then(function (resp) {
  return resp.json();
}).then(function (data) {
  var orders = JSON.parse(JSON.stringify(data));
  // let orders = data;
  console.log(orders);
  orders.forEach(function (elementf, index) {
    var row = tblHistory.insertRow(index + 1);
    var serialNum = row.insertCell(0);
    var message = row.insertCell(1);
    var dateReceived = row.insertCell(2);
    serialNum.innerHTML = index + 1;
    message.innerHTML = elementf.message;
    dateReceived.innerHTML = new Date().toUTCString();
  });
}).catch(function (err) {
  return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
});