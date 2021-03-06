let signInerrors = document.getElementById('errors');
let name = document.getElementById('msgName');


function signIn () {
  let user_name = document.getElementById('txtusername').value;
  let pass_word = document.getElementById('txtpassword').value;

  if (user_name.length < 5 || pass_word.length < 5) {
    signInerrors.innerHTML = 'Username and password have to be at least 5 characters'
  }
  else {
    // Send data to server
    //fetch('https://dokenedgar.herokuapp.com/signin/' + user_name + '/' + pass_word)
    fetch('/signin/' + user_name + '/' + pass_word)
      .then((resp) => resp.json())
      .then((data) => {
        let user = JSON.parse(JSON.stringify(data));
        // console.log(user)
        if (user.userFound) {
          localStorage.loggedUser = user_name; // localStorage.removeItem(loggedUser)
          localStorage.fff_token = user.token;
          //window.location.href = 'https://dokenedgar.herokuapp.com/menu';
          window.location.href = '/menu';
        }
        else {
          signInerrors.innerHTML = 'Username or password incorrect';
        }
      })
      .catch((err) => console.log(err))
  }
}

function signUp () {
  let f_name = document.getElementById('txtFname');
  let s_name = document.getElementById('txtSname');
  let phone_Num = document.getElementById('txtPhoneNum');
  let user_name = document.getElementById('txtUsername');
  let password = document.getElementById('txtPassword');
  let signInerrors = document.getElementById('errors');
  let errors = '';

  // VALIDATION
  if (f_name.value.length < 1) {
    f_name.style.borderColor = 'red';
    errors = "First name can't be empty<br>"
  }
  else {
    f_name.style.borderColor = 'green';}
  if (s_name.value.length < 1) {
    s_name.style.borderColor = 'red';
    errors += "Surname can't be empty<br>";
  }
  else { s_name.style.borderColor = 'green'; }

  if (phone_Num.value.length < 11) {
    phone_Num.style.borderColor = 'red';
    errors += 'Phone number is less than 11<br>';
  }
  else { phone_Num.style.borderColor = 'green'; }

  if (user_name.value.length < 5) {
    user_name.style.borderColor = 'red';
    errors += 'Username is less than 5<br>';
  }
  else { user_name.style.borderColor = 'green'; }

  if (password.value.length < 5) {
    password.style.borderColor = 'red';
    errors += 'Password is less than 5<br>';
  }
  else { password.style.borderColor = 'green'; }

  if (errors.length > 5) {
    signInerrors.innerHTML = errors;
    errors = '';
  }
  else {
  // Send data to server
    fetch('https://dokenedgar.herokuapp.com/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ fname: f_name.value, sname: s_name.value, phone: phone_Num.value, username: user_name.value, pword: password.value })
    })
      .then((resp) => resp.json())
      .then((data) => {
        let obj = JSON.parse(JSON.stringify(data));
        localStorage.loggedUser = user_name.value;
        window.location.href = '/menu';
      })
      .catch((err) => console.log(err))
  }
}

function sendMsg () {
  //let name = document.getElementById('msgName').value;
  name.value = localStorage.loggedUser;
  let msg = document.getElementById('txtMsg').value;
  if (name.length < 2 || msg < 5) {
    signInerrors.innerHTML = 'Name has to be atleast 2 characters and message at least 5 characters!';
  }
  else {
    fetch('https://dokenedgar.herokuapp.com/api/v1/messages/' + localStorage.loggedUser , {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer '+localStorage.fff_token },
      body: JSON.stringify({ sender: localStorage.loggedUser, message: msg })
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

function adminsignin () {
  let user_name = document.getElementById('txtusername').value;
  let pass_word = document.getElementById('txtpassword').value;

  if (user_name.lenth < 5 || pass_word.length < 5) {
  // window.alert("Input less than 5");
    signInerrors.innerHTML = 'Username and password have to be at least 5 characters!';
  }
  else {
  // window.location.href = './admindashboard.html';
    fetch('https://dokenedgar.herokuapp.com/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ uname: user_name, pword: pass_word })
    })
      .then((resp) => resp.json())
      .then((data) => {
       let user = JSON.parse(JSON.stringify(data));
        if (user.userFound) {
          localStorage.AdminUser = user_name;
          localStorage.admin_token = user.token;
          window.location.href = '/admin/admindashboard';
        }
        else {
          signInerrors.innerHTML = 'Username or password incorrect';
        }
      })
      .catch((err) => console.log(err))
  }
}
