let tblHistory = document.getElementById('inbox');
let signInerrors = document.getElementById('errors');

fetch('https://dokenedgar.herokuapp.com/api/v1/admin/messages', { headers: { 'authorization': 'Bearer '+localStorage.admin_token } })
  .then((resp) => resp.json())
  .then((data) => {
    let orders = JSON.parse(JSON.stringify(data));
    console.log(orders);
    orders.messagesToAdmin.forEach(function (elementf, index) {
      let row = tblHistory.insertRow(index + 1);
      let serialNum = row.insertCell(0);
      let sender = row.insertCell(1);
      let message = row.insertCell(2);
      let dateReceived = row.insertCell(3);
      serialNum.innerHTML = index + 1;
      sender.innerHTML = elementf.sender;
      message.innerHTML = elementf.message;
      dateReceived.innerHTML = new Date().toUTCString();
    });
  })
  .catch((err) => window.location.href = 'https://dokenedgar.herokuapp.com/signin')//console.log(error))

function sendAdminMsg () {
  let name = document.getElementById('msgName').value;
  let msg = document.getElementById('txtMsg').value;
  if (name.length < 2 || msg < 5) {
    signInerrors.innerHTML = 'Name has to be atleast 2 characters and message at least 5 characters!';
    }
    else {
    fetch('https://dokenedgar.herokuapp.com/api/v1/admin/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' , 'authorization': 'Bearer '+localStorage.admin_token },
      body: JSON.stringify({ receiver: name, message: msg })
    })
      .then((resp) => resp.json())
      .then((data) => {
        let user = JSON.parse(JSON.stringify(data));
        if (user.userFound) {
           signInerrors.style.color = 'green';
        signInerrors.innerHTML = 'Message sent successfully'; 
        }
        else {
          signInerrors.style.color = 'red';
          signInerrors.innerHTML = 'Problem sending message. Possibly check receiver username..';
        }
      })
      .catch((error) => window.location.href = 'https://dokenedgar.herokuapp.com/signin')//console.log(error))
  }
}
