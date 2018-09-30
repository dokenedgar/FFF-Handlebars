'use strict';

var foodName = document.getElementById('foodName');
var lblPrice = document.getElementById('LabelFoodPrice');
var foodPrice = document.getElementById('foodPrice');
var lblDesc = document.getElementById('LabelFoodDesc');
var foodDesc = document.getElementById('foodDesc');
var btngetDetails = document.getElementById('btngetDetails');
var btnUpdateDetails = document.getElementById('btnUpdateDetails');

lblPrice.style.display = 'none';
foodPrice.style.display = 'none';
lblDesc.style.display = 'none';
foodDesc.style.display = 'none';
btnUpdateDetails.style.display = 'none';

var getDetails = function getDetails() {
  var food = foodName.value;
  fetch('https://dokenedgar.herokuapp.com/api/v1/admin/food/' + food, { headers: { 'authorization': 'Bearer ' + localStorage.admin_token } }).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    var orders = JSON.parse(JSON.stringify(data));
    orders.order.forEach(function (elementf, index) {
      foodName.innerHTML = elementf.foodName;
      foodDesc.innerHTML = elementf.foodDesc;
      foodPrice.innerHTML = elementf.foodPrice;
    });

    foodName.readOnly = true;
    foodPrice.readOnly = true;
    foodDesc.readOnly = true;

    lblPrice.style.display = 'block';
    foodPrice.style.display = 'block';
    lblDesc.style.display = 'block';
    foodDesc.style.display = 'block';
    btnUpdateDetails.style.display = 'block';

    btngetDetails.style.display = 'none';
  }).catch(function (err) {
    return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
  });
};

var deleteDetails = function deleteDetails() {
  var foodname = foodName.value;
  var foodprice = foodPrice.value;
  var fooddesc = foodDesc.value;
  var signInerrors = document.getElementById('errors');
  fetch('https://dokenedgar.herokuapp.com/api/v1/admin/food', {
    method: 'DELETE',
    headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.admin_token },
    body: JSON.stringify({ foodName: foodname, foodPrice: foodprice, foodDesc: fooddesc })
  }).then(function (resp) {
    signInerrors.style.color = 'red';
    signInerrors.innerHTML = 'Food deleted successfully';
  }).catch(function (error) {
    return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
  });
};