let tblHistory = document.getElementById('inbox');
fetch('https://dokenedgar.herokuapp.com/api/v1/messages/' + localStorage.loggedUser, { headers: { 'authorization': 'Bearer '+localStorage.fff_token } })
  .then((resp) => resp.json())
  .then((data) => {
    let orders = JSON.parse(JSON.stringify(data));
    orders.messages.forEach(function (elementf, index) {
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

  let sendMsg = () => {
  name.value = localStorage.loggedUser;
  let message = document.getElementById('txtMsg').value;
  if (name.length < 2 || message < 5) {
    signInerrors.innerHTML = 'Name has to be atleast 2 characters and message at least 5 characters!';
  }
  else {
    fetch('https://dokenedgar.herokuapp.com/api/v1/messages/' + localStorage.loggedUser , {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer '+localStorage.fff_token },
      body: JSON.stringify({ sender: localStorage.loggedUser, message })
    })
    .then((resp) => {
        return resp.json();
        })
      .then((resp) => {
      signInerrors.style.color = 'green';
        signInerrors.innerHTML = 'Message sent successfully'; })
      .catch((error) => window.location.href = 'https://dokenedgar.herokuapp.com/signin')
  }
}