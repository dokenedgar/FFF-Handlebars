let tblHistory = document.getElementById('adminOrders');
fetch('http://localhost:3000/api/v1/admin/orders', { headers: { 'authorization': 'Bearer '+localStorage.admin_token } })
  .then((resp) => resp.json())
  .then((data) => {
    let customerOrders = JSON.parse(JSON.stringify(data));
    console.log(customerOrders);
    customerOrders.orders.forEach(function (element, index) {
      element.order.forEach(function (elementf, index) {
        let row = tblHistory.insertRow(index + 1);
        let orderID = row.insertCell(0);
        let userID = row.insertCell(1);
        let food = row.insertCell(2);
        let quantity = row.insertCell(3);
        let price = row.insertCell(4);
        let dateOrdered = row.insertCell(5);
        let status = row.insertCell(6);
        let url = 'http://localhost:3000/admin/orders/' + element.orderID;
        localStorage.orderID = element.orderID;
        orderID.innerHTML = '<a href= ' + url + '>' + element.orderID + '</a>';
        userID.innerHTML = element.user;
        food.innerHTML = elementf.food;
        quantity.innerHTML = elementf.quantity;
        price.innerHTML = elementf.price;
        dateOrdered.innerHTML = new Date().toUTCString();
        status.innerHTML = '<select ><option value=' + element.status + '>' + element.status + '</option></select>';
      });
    });
  })
  .catch((err) => window.location.href = 'http://localhost:3000/signin')