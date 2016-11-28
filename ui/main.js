////////////////////////////////////////////////////////////////////////////////
    var login = document.getElementById('login_btn');
    login.onclick = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  login.value = 'Logout';
                  //login.id = 'logout_btn';
                  var msg =`<h1>Welcome `+username+` !!!</h1>`;
                  document.getElementById('myMsg').innerHTML = msg;
              } else if (request.status === 403) {
                  login.value = 'Invalid Credentials';
              } else if (request.status === 500) {
                  //alert('Something wen Wrong!!!');
                  login.value = 'Login';
              } else {
                  //alert('Something wen Wrong!!!');
                  login.value = 'Login';
              }
              //loadLogin();
          }  
        };
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        //console.log(username);
        //console.log(password);
        request.open('POST', 'http://sarvesh18.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({"username": username, "password": password}));  
        login.value = 'Logging In...';
    };
////////////////////////////////////////////////////////////////////////////////
/*    var logout = document.getElementById('logout_btn');
    logout.onclick = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  logout.value = 'login';
                  logout.id = 'login_btn';
                  var msg =`<h1>Welcome `+username+` !!! Logout</h1>`;
                  document.getElementById('myMsg').innerHTML = msg;
              } 
              else {
                  //alert('Something wen Wrong!!!');
                  logout.value = 'Logout';
              }
          }  
        };
        request.open('GET', 'http://sarvesh18.imad.hasura-app.io/logout', true);
        request.setRequestHeader('Content-Type', 'application/json');
        //request.send(JSON.stringify({"username": username, "password": password}));  
        logout.value = 'Logouting In...';
    };*/
////////////////////////////////////////////////////////////////////////////////
    var signup = document.getElementById('signup_btn');
    signup.onclick = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  signup.value = 'User Registered';
              } else {
                  alert('User Could ! Register');
                  signup.value = 'Signup';
              }
          }
        };
        var usernameS = document.getElementById('usernameS').value;
        var passwordS = document.getElementById('passwordS').value;
        var emailS = document.getElementById('emailS').value;
        //console.log(usernameS);
        //console.log(passwordS);
        //console.log(emailS);
        request.open('POST', 'http://sarvesh18.imad.hasura-app.io/signup', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({"usernameS": usernameS, "passwordS": passwordS, "emailS": emailS}));  
        signup.value = 'Registering...';
    };
////////////////////////////////////////////////////////////////////////////////
    var submit = document.getElementById('add_btn');
    submit.onclick = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  submit.value = 'Thank You';
                } else {
                    submit.value = 'Try Again';
              }
          }
        };
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById('subject').value;
        var likes = document.getElementById('likes').value;
        //console.log(name);
        //console.log(email);
        //console.log(subject);
        //console.log(likes);
        request.open('POST', 'http://sarvesh18.imad.hasura-app.io/submit', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({"name": name, "email": email, "subject": subject, "likes": likes}));
        submit.value = 'Wait...';
    };

////////////////////////////////////////////////////////////////////////////////
/* function loadLoginForm () {
    var loginHtml = `
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" />
        <br/><br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
*/

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                //loadLoginForm();
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

// The first thing to do is to check if the user is logged in!
//loadLogin();