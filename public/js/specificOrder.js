let tblHistory = document.getElementById('history');
fetch('http://localhost:3000/api/v1/order/' + localStorage.orderID)
  .then((resp) => resp.json())
  .then((data) => {
    let orders = JSON.parse(JSON.stringify(data));
    console.log(orders);
    orders.forEach(function (element, index) {
      element.order.forEach(function (elementf, index) {
        let row = tblHistory.insertRow(index + 1);
        let orderID = row.insertCell(0);
        let food = row.insertCell(1);
        let quantity = row.insertCell(2);
        let price = row.insertCell(3);
        let dateOrdered = row.insertCell(4);
        let status = row.insertCell(5);
        let url = '/orders/' + element.orderID;
        localStorage.orderID = element.orderID;
        orderID.innerHTML = '<a href= ' + url + '>' + element.orderID + '</a>';
        food.innerHTML = elementf.food;
        quantity.innerHTML = elementf.quantity;
        price.innerHTML = elementf.price;
        dateOrdered.innerHTML = new Date();
        status.innerHTML = element.status;
      });
    });
  })
  .catch((err) => console.log(err))