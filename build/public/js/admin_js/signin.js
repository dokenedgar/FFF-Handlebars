'use strict';

var adminsignin = function adminsignin() {
  var user_name = document.getElementById('txtusername').value;
  var pass_word = document.getElementById('txtpassword').value;
  if (user_name.lenth < 5 || pass_word.length < 5) {
    signInerrors.innerHTML = 'Username and password have to be at least 5 characters!';
  } else {
    fetch('https://dokenedgar.herokuapp.com/api/v1/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: user_name, password: pass_word })
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
      return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
    });
  }
};