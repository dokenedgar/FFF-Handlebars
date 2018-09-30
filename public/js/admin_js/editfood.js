let foodName = document.getElementById('foodName');
let lblPrice = document.getElementById('LabelFoodPrice');
let foodPrice = document.getElementById('foodPrice');
let lblDesc = document.getElementById('LabelFoodDesc');
let foodDesc = document.getElementById('foodDesc');
let btngetDetails = document.getElementById('btngetDetails');
let btnUpdateDetails = document.getElementById('btnUpdateDetails');

lblPrice.style.display = 'none';
foodPrice.style.display = 'none';
lblDesc.style.display = 'none';
foodDesc.style.display = 'none';
btnUpdateDetails.style.display = 'none';

let getDetails = () => {
  let food = foodName.value;
  fetch('https://dokenedgar.herokuapp.com/api/v1/admin/food/' + food, { headers: { 'authorization': 'Bearer '+localStorage.admin_token } })
    .then((resp) => resp.json())
    .then((data) => {
      let orders = JSON.parse(JSON.stringify(data));
      orders.order.forEach(function (elementf, index) {
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

    })
    .catch((err) => window.location.href = 'https://dokenedgar.herokuapp.com/signin')
}

let updateDetails = () =>{
  let foodname = foodName.value;
  let foodprice = foodPrice.value;
  let fooddesc = foodDesc.value;
  let signInerrors = document.getElementById('errors');
  if (foodname.length < 2 || foodprice < 2 || fooddesc < 5) {
    signInerrors.innerHTML = 'Name and price have to be atleast 2 characters, while description at least 5 characters!';
  }
  else {
    fetch('https://dokenedgar.herokuapp.com/api/v1/admin/food', {
      method: 'PUT',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer '+localStorage.admin_token },
      body: JSON.stringify({ foodName: foodname, foodPrice: foodprice, foodDesc: fooddesc })
    })
      .then((resp) => { signInerrors.style.color = 'green';
        signInerrors.innerHTML = 'Food edited successfully'; })
      .catch((error) => window.location.href = 'https://dokenedgar.herokuapp.com/signin')
  }
}