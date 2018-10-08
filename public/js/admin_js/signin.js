let adminsignin = () => {
  let user_name = document.getElementById('txtusername').value;
  let pass_word = document.getElementById('txtpassword').value;
  if (user_name.lenth < 5 || pass_word.length < 5) {
    signInerrors.innerHTML = 'Username and password have to be at least 5 characters!';
  }
  else {
    fetch('https://dokenedgar.herokuapp.com/api/v1/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: user_name, password: pass_word })
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
      .catch((err) => console.log(error))//window.location.href = 'https://dokenedgar.herokuapp.com/signin' )
  }
}