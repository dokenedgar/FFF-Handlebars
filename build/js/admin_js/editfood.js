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

function getDetails() {
  var food = foodName.value;
  fetch('https://dokenedgar.herokuapp.com/api/v1/admin/food/' + food, { headers: { 'authorization': 'Bearer ' + localStorage.admin_token } }).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    var orders = JSON.parse(JSON.stringify(data));
    console.log(orders);

    orders.forEach(function (elementf, index) {
      foodName.innerHTML = elementf.foodName;
      foodDesc.innerHTML = elementf.foodDesc;
      foodPrice.innerHTML = elementf.foodPrice;
    });
    foodName.readOnly = true;
    lblPrice.style.display = 'block';
    foodPrice.style.display = 'block';
    lblDesc.style.display = 'block';
    foodDesc.style.display = 'block';
    btnUpdateDetails.style.display = 'block';
    btngetDetails.style.display = 'none';
  }).catch(function (err) {
    return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
  }); //console.log(error))
}

function updateDetails() {
  var f_name = foodName.value;
  var f_price = foodPrice.value;
  var f_desc = foodDesc.value;
  var signInerrors = document.getElementById('errors');
  if (f_name.length < 2 || f_price < 2 || f_desc < 5) {
    signInerrors.innerHTML = 'Name and price have to be atleast 2 characters, while description at least 5 characters!';
  } else {
    fetch('https://dokenedgar.herokuapp.com/api/v1/admin/editfood', {
      method: 'PUT',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.admin_token },
      body: JSON.stringify({ foodName: f_name, foodPrice: f_price, foodDesc: f_desc })
    }).then(function (resp) {
      signInerrors.style.color = 'green';
      signInerrors.innerHTML = 'Food edited successfully';
    }).catch(function (error) {
      return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
    }); //console.log(error))
  }
}