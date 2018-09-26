let tblHistory = document.getElementById('inbox');

fetch('http://localhost:3000/api/v1/admin/foodlists')
  .then((resp) => resp.json())
  .then((data) => {
    let orders = JSON.parse(JSON.stringify(data));
    console.log(orders);
    orders.forEach(function (elementf, index) {
      let row = tblHistory.insertRow(index + 1);
      let serialNum = row.insertCell(0);
      let food = row.insertCell(1);
      let desc = row.insertCell(2);
      let price = row.insertCell(3);
      let fedit = row.insertCell(4);
      let fdelete = row.insertCell(5);
      serialNum.innerHTML = index + 1;
      food.innerHTML = elementf.foodName;
      desc.innerHTML = elementf.foodDesc;
      price.innerHTML = elementf.foodPrice;
      fedit.innerHTML = `<a href=http://localhost:3000/api/v1/admin/food/${elementf.foodName}>Edit</a>`
      fdelete.innerHTML = "<a href='/api/vi/deletefood/'"+food+">Delete</a>"
    });
  })
  .catch((err) => console.log(err))