'use strict';

var tblHistory = document.getElementById('history');
fetch('https://dokenedgar.herokuapp.com/api/v1/orders/' + localStorage.loggedUser, { headers: { 'authorization': 'Bearer ' + localStorage.fff_token } }).then(function (resp) {
  return resp.json();
}).then(function (data) {
  var orders = JSON.parse(JSON.stringify(data));
  orders.order.forEach(function (element, index) {
    element.order.forEach(function (elementf, index) {
      var row = tblHistory.insertRow(index + 1);
      var orderID = row.insertCell(0);
      var food = row.insertCell(1);
      var quantity = row.insertCell(2);
      var price = row.insertCell(3);
      var dateOrdered = row.insertCell(4);
      var status = row.insertCell(5);
      var url = '/orders/' + element.orderID;
      localStorage.orderID = element.orderID;
      orderID.innerHTML = '<a href= ' + url + '>' + element.orderID + '</a>';
      food.innerHTML = elementf.food;
      quantity.innerHTML = elementf.quantity;
      price.innerHTML = elementf.price;
      dateOrdered.innerHTML = new Date().toUTCString();
      status.innerHTML = element.status;
    });
  });
}).catch(function (err) {
  return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
});