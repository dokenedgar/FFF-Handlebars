'use strict';

var tblHistory = document.getElementById('history');
//let status = null;
//let updateOrder = null;
fetch('http://localhost:3000/api/v1/admin/orders/' + localStorage.orderID, { headers: { 'authorization': 'Bearer ' + localStorage.admin_token } }).then(function (resp) {
  return resp.json();
}).then(function (data) {
  var orders = JSON.parse(JSON.stringify(data));
  orders.order.forEach(function (element, index) {
    element.order.forEach(function (elementf, index) {
      var row = tblHistory.insertRow(index + 1);
      var orderID = row.insertCell(0);
      var userID = row.insertCell(1);
      var food = row.insertCell(2);
      var quantity = row.insertCell(3);
      var price = row.insertCell(4);
      var dateOrdered = row.insertCell(5);
      // status = row.insertCell(6);
      //updateOrder = row.insertCell(7);

      var url = 'http://localhost:3000/admin/orders/' + element.orderID;
      localStorage.orderID = element.orderID;
      orderID.innerHTML = '<a href= ' + url + '>' + element.orderID + '</a>';
      userID.innerHTML = element.user;
      food.innerHTML = elementf.food;
      quantity.innerHTML = elementf.quantity;
      price.innerHTML = elementf.price;
      dateOrdered.innerHTML = new Date().toUTCString();

      var status = row.insertCell(6);
      var updateOrder = row.insertCell(7);
      status.innerHTML = '<select id="status"><option value=' + element.status + '>' + element.status + '</option><option value="Accepted">Accepted</option><option value="Rejected">Rejected</option><option value="Completed">Completed</option></select>';
      updateOrder.innerHTML = '<input id="update" value="UPDATE" readonly onclick="updateOrderFunction()">';
    });
  });
}).catch(function (err) {
  return 'http://localhost:3000/signin';
}); //window.location.href = console.log(err)) 

var updateOrderFunction = function updateOrderFunction() {
  //Send data to server
  var newStatus = document.getElementById('status').value;
  fetch('http://localhost:3000/api/v1/admin/orders/' + localStorage.orderID, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.admin_token },
    body: JSON.stringify({ orderID: localStorage.orderID, status: newStatus })
  }).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    window.location.href = 'http://localhost:3000/admin/orders/' + localStorage.orderID;
  }).catch(function (err) {
    return window.location.href = 'http://localhost:3000/signin';
  });
};