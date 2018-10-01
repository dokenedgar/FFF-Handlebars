let tblHistory = document.getElementById('history');
let status;
let updateOrder;
fetch('https://dokenedgar.herokuapp.com/api/v1/admin/orders/' + localStorage.orderID, { headers: { 'authorization': 'Bearer '+localStorage.admin_token } })
  .then((resp) => resp.json())
  .then((data) => {
    let orders = JSON.parse(JSON.stringify(data));
    orders.order.forEach(function (element, index) {
      element.order.forEach(function (elementf, index) {
        let row = tblHistory.insertRow(index + 1);
        let orderID = row.insertCell(0);
        let userID = row.insertCell(1);
        let food = row.insertCell(2);
        let quantity = row.insertCell(3);
        let price = row.insertCell(4);
        let dateOrdered = row.insertCell(5);
        status = row.insertCell(6);
        updateOrder = row.insertCell(7);

        let url = 'https://dokenedgar.herokuapp.com/admin/orders/' + element.orderID;
        localStorage.orderID = element.orderID;
        orderID.innerHTML = '<a href= ' + url + '>' + element.orderID + '</a>';
        userID.innerHTML = element.user;
        food.innerHTML = elementf.food;
        quantity.innerHTML = elementf.quantity;
        price.innerHTML = elementf.price;
        dateOrdered.innerHTML = new Date().toUTCString();
      });

      status.innerHTML = '<select id="status"><option value=' + element.status + '>' + element.status + '</option><option value="Accepted">Accepted</option><option value="Rejected">Rejected</option><option value="Completed">Completed</option></select>';
      updateOrder.innerHTML = '<input id="update" value="UPDATE" readonly onclick="updateOrderFunction()">';
    });
  })
  .catch((err) => window.location.href = console.log(err)) //'https://dokenedgar.herokuapp.com/signin')

let updateOrderFunction = () => {
			//Send data to server
			let newStatus = document.getElementById('status').value;
		fetch('https://dokenedgar.herokuapp.com/api/v1/admin/orders/'+localStorage.orderID, {
			method:'PUT',
			headers: {'content-type': 'application/json', 'authorization': 'Bearer '+localStorage.admin_token },
			body: JSON.stringify({orderID:localStorage.orderID, status:newStatus})
		})
		.then((resp) =>  resp.json())
		.then((data) => { 
					window.location.href = 'https://dokenedgar.herokuapp.com/admin/orders/'+localStorage.orderID;
				 })
		.catch((err) => window.location.href = 'https://dokenedgar.herokuapp.com/signin')
}