'use strict';

var tblHistory = document.getElementById('adminOrders');
fetch('https://dokenedgar.herokuapp.com/api/v1/admin/orders', { headers: { 'authorization': 'Bearer ' + localStorage.admin_token } }).then(function (resp) {
  return resp.json();
}).then(function (data) {
  var customerOrders = JSON.parse(JSON.stringify(data));
  console.log(customerOrders);
  customerOrders.orders.forEach(function (element, index) {
    element.order.forEach(function (elementf, index) {
      var row = tblHistory.insertRow(index + 1);
      var orderID = row.insertCell(0);
      var userID = row.insertCell(1);
      var food = row.insertCell(2);
      var quantity = row.insertCell(3);
      var price = row.insertCell(4);
      var dateOrdered = row.insertCell(5);
      var status = row.insertCell(6);
      var url = 'https://dokenedgar.herokuapp.com/admin/userorders/' + element.orderID;
      localStorage.orderID = element.orderID;
      orderID.innerHTML = '<a href= ' + url + '>' + element.orderID + '</a>';
      userID.innerHTML = element.user;
      food.innerHTML = elementf.food;
      quantity.innerHTML = elementf.quantity;
      price.innerHTML = elementf.price;
      dateOrdered.innerHTML = new Date().toUTCString();
      status.innerHTML = '<select ><option value=' + element.status + '>' + element.status + '</option></select>';
    });
  });
}).catch(function (err) {
  return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
});