loadArticles();
loadLogin();

function loadLogin () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } 
            //else { loadLoginForm(); }
        }
    };
    request.open('GET', 'http://sarvesh18.imad.hasura-app.io/check-login', true);
    request.send();
}
function loadLoggedInUser (username) {
    //var msg = `<h1> Welcome <i>${username}</i> !!!</h1>
    //<a href="/logout">Logout</a>`;
    var msg =`<h1>Welcome `+username+` !!!</h1>`;
                document.getElementById('log').innerHTML = `
			<div id="log">
			<input class="w3-btn-block w3-green w3-section w3-padding" type="submit" value="Logout" id="logout_btn"/>
			</div>
			`;
    //document.getElementById("login_btn").style.visibility = 'hidden';
    //document.getElementById("logout_btn").style.visibility = 'visible';
}
////////////////////////////////////////////////////////////////////////////////
    var login = document.getElementById('login_btn');
    login.onclick = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                document.getElementById('log').innerHTML = 
                `<div id="log">
			<input class="w3-btn-block w3-green w3-section w3-padding" type="submit" value="Logout" id="logout_btn"/>
			</div>
			`;
                  //document.getElementById("login_btn").style.visibility = 'hidden';
                  //document.getElementById("logout_btn").style.visibility = 'visible';
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
              loadLogin();
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
    var logout = document.getElementById('logout_btn');
    logout.onclick = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                document.getElementById('log').innerHTML = 
            `
			<div id="log">
			<input class="w3-btn-block w3-green w3-section w3-padding" type="submit" value="Login" id="login_btn"/>
			</div>`;
                  //document.getElementById("logout_btn").style.visibility = 'hidden';
                  //document.getElementById("login_btn").style.visibility = 'visible';
                  var msg =`<h1>Welcome !!!</h1>`;
                  document.getElementById('myMsg').innerHTML = msg;
              } 
          }  
       };
    request.open('GET', 'http://sarvesh18.imad.hasura-app.io/logout', true);
    request.send();
    logout.value = 'Logouting In...';
    };
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
function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', 'http://sarvesh18.imad.hasura-app.io/get-articles', true);
    request.send(null);
}