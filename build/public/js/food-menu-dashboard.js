'use strict';

var tblHistory = document.getElementById('food-menu');
fetch('https://dokenedgar.herokuapp.com/api/v1/menu', { headers: { 'authorization': 'Bearer ' + localStorage.fff_token } }).then(function (resp) {
  return resp.json();
}).then(function (data) {
  var orders = JSON.parse(JSON.stringify(data));
  orders.foodList.forEach(function (elementf, index) {
    var row = tblHistory.insertRow(index + 1);
    var serialNum = row.insertCell(0);
    var food = row.insertCell(1);
    var desc = row.insertCell(2);
    var price = row.insertCell(3);
    var checkboxAddToOrder = row.insertCell(4);

    serialNum.innerHTML = index + 1;
    food.innerHTML = elementf.foodName;
    desc.innerHTML = elementf.foodDesc;
    price.innerHTML = elementf.foodPrice;
    checkboxAddToOrder.innerHTML = '<input type="checkbox" name="myCheck" id="myCheck" onchange="addToOrder(this)" value="' + elementf.foodName + ',' + elementf.foodPrice + ',' + 1 + '" >';
  });
}).catch(function (err) {
  return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
});