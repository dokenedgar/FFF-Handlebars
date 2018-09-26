let tblHistory = document.getElementById('inbox');

fetch('https://dokenedgar.herokuapp.com/api/v1/messages/' + localStorage.loggedUser, { headers: { 'authorization': 'Bearer '+localStorage.fff_token } })
  .then((resp) => resp.json())
  .then((data) => {
    let orders = JSON.parse(JSON.stringify(data));
    // let orders = data;
    console.log(orders);
    orders.msgs.forEach(function (elementf, index) {
      let row = tblHistory.insertRow(index + 1);
      let serialNum = row.insertCell(0);
      let message = row.insertCell(1);
      let dateReceived = row.insertCell(2);
      serialNum.innerHTML = index + 1;
      message.innerHTML = elementf.message;
      dateReceived.innerHTML = new Date().toUTCString();
    });
  })
  .catch((err) => window.location.href = 'https://dokenedgar.herokuapp.com/signin')