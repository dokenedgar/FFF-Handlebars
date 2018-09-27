'use strict';

var tblHistory = document.getElementById('food-menu');

fetch('https://dokenedgar.herokuapp.com/menu/api/v1/menu')
//fetch('/menu/api/v1/menu')
.then(function (resp) {
  return resp.json();
}).then(function (data) {
  var orders = JSON.parse(JSON.stringify(data));
  console.log(orders);
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
  return console.log(err);
}); //window.location.href = 'https://dokenedgar.herokuapp.com/signin')

//Check jwt requirements