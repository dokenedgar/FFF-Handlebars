'use strict';

var signInerrors = document.getElementById('errors');
var name = document.getElementById('msgName');
name.value = localStorage.loggedUser;

function signIn() {
  var user_name = document.getElementById('txtusername').value;
  var pass_word = document.getElementById('txtpassword').value;

  if (user_name.length < 5 || pass_word.length < 5) {
    signInerrors.innerHTML = 'Username and password have to be at least 5 characters';
  } else {
    // Send data to server
    fetch('https://dokenedgar.herokuapp.com/signin/' + user_name + '/' + pass_word).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      var user = JSON.parse(JSON.stringify(data));
      // console.log(user)
      if (user.userFound) {
        localStorage.loggedUser = user_name; // localStorage.removeItem(loggedUser)
        localStorage.fff_token = user.token;
        window.location.href = 'https://dokenedgar.herokuapp.com/menu';
      } else {
        signInerrors.innerHTML = 'Username or password incorrect';
      }
    }).catch(function (err) {
      return console.log(err);
    });
  }
}

function signUp() {
  var f_name = document.getElementById('txtFname');
  var s_name = document.getElementById('txtSname');
  var phone_Num = document.getElementById('txtPhoneNum');
  var user_name = document.getElementById('txtUsername');
  var password = document.getElementById('txtPassword');
  var signInerrors = document.getElementById('errors');
  var errors = '';

  // VALIDATION
  if (f_name.value.length < 1) {
    f_name.style.borderColor = 'red';
    errors = "First name can't be empty<br>";
  } else {
    f_name.style.borderColor = 'green';
  }
  if (s_name.value.length < 1) {
    s_name.style.borderColor = 'red';
    errors += "Surname can't be empty<br>";
  } else {
    s_name.style.borderColor = 'green';
  }

  if (phone_Num.value.length < 11) {
    phone_Num.style.borderColor = 'red';
    errors += 'Phone number is less than 11<br>';
  } else {
    phone_Num.style.borderColor = 'green';
  }

  if (user_name.value.length < 5) {
    user_name.style.borderColor = 'red';
    errors += 'Username is less than 5<br>';
  } else {
    user_name.style.borderColor = 'green';
  }

  if (password.value.length < 5) {
    password.style.borderColor = 'red';
    errors += 'Password is less than 5<br>';
  } else {
    password.style.borderColor = 'green';
  }

  if (errors.length > 5) {
    signInerrors.innerHTML = errors;
    errors = '';
  } else {
    // Send data to server
    fetch('https://dokenedgar.herokuapp.com/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ fname: f_name.value, sname: s_name.value, phone: phone_Num.value, username: user_name.value, pword: password.value })
    }).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      var obj = JSON.parse(JSON.stringify(data));
      localStorage.loggedUser = user_name.value;
      window.location.href = '/menu';
    }).catch(function (err) {
      return console.log(err);
    });
  }
}

function sendMsg() {
  //let name = document.getElementById('msgName').value;
  var msg = document.getElementById('txtMsg').value;
  if (name.length < 2 || msg < 5) {
    signInerrors.innerHTML = 'Name has to be atleast 2 characters and message at least 5 characters!';
  } else {
    fetch('https://dokenedgar.herokuapp.com/api/v1/messages/' + localStorage.loggedUser, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.fff_token },
      body: JSON.stringify({ sender: localStorage.loggedUser, message: msg })
    }).then(function (resp) {
      return resp.json();
    }).then(function (resp) {
      signInerrors.style.color = 'green';
      signInerrors.innerHTML = 'Message sent successfully';
    }).catch(function (error) {
      return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
    });
  }
}

function adminsignin() {
  var user_name = document.getElementById('txtusername').value;
  var pass_word = document.getElementById('txtpassword').value;

  if (user_name.lenth < 5 || pass_word.length < 5) {
    // window.alert("Input less than 5");
    signInerrors.innerHTML = 'Username and password have to be at least 5 characters!';
  } else {
    // window.location.href = './admindashboard.html';
    fetch('https://dokenedgar.herokuapp.com/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ uname: user_name, pword: pass_word })
    }).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      var user = JSON.parse(JSON.stringify(data));
      if (user.userFound) {
        localStorage.AdminUser = user_name;
        localStorage.admin_token = user.token;
        window.location.href = '/admin/admindashboard';
      } else {
        signInerrors.innerHTML = 'Username or password incorrect';
      }
    }).catch(function (err) {
      return console.log(err);
    });
  }
}