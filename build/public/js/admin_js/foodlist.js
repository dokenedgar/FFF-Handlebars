'use strict';

var tblHistory = document.getElementById('inbox');

fetch('http://localhost:3000/api/v1/admin/foodlists', { headers: { 'authorization': 'Bearer ' + localStorage.admin_token } }).then(function (resp) {
  return resp.json();
}).then(function (data) {
  var orders = JSON.parse(JSON.stringify(data));
  orders.foodList.forEach(function (elementf, index) {
    var row = tblHistory.insertRow(index + 1);
    var serialNum = row.insertCell(0);
    var food = row.insertCell(1);
    var desc = row.insertCell(2);
    var price = row.insertCell(3);
    serialNum.innerHTML = index + 1;
    food.innerHTML = elementf.foodName;
    desc.innerHTML = elementf.foodDesc;
    price.innerHTML = elementf.foodPrice;
  });
}).catch(function (err) {
  return window.location.href = 'http://localhost:3000/signin';
});