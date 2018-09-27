'use strict';

function addFood() {
  var f_name = document.getElementById('foodName').value;
  var f_price = document.getElementById('foodPrice').value;
  var f_desc = document.getElementById('desc').value;
  var signInerrors = document.getElementById('errors');
  if (f_name.length < 2 || f_price.length < 2 || f_desc.length < 5) {
    signInerrors.innerHTML = 'Name and price have to be atleast 2 characters, while description at least 5 characters!';
  } else {
    fetch('https://dokenedgar.herokuapp.com/api/v1/admin/addfood', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.admin_token },
      body: JSON.stringify({ foodName: f_name, foodPrice: f_price, foodDesc: f_desc })
    }).then(function (resp) {
      signInerrors.style.color = 'green';
      signInerrors.innerHTML = 'Food added successfully';
    }).catch(function (error) {
      return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
    }); //console.log(error))
  }
}