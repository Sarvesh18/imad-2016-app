////////////////////////////////////////////////////////////////////////////////
    var submit = document.getElementById('submit_btn');
    submit.onclick = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  alert('Respond Submit Successfully');
              } else {
                  alert('Respond Could ! Submit');
              }
          }
        };
        var like = false;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById('subject').value;
        var like = document.getElementById('like').value;
        console.log(name);
        console.log(email);
        console.log(subject);
        console.log(like);
        request.open('POST', 'http://sarvesh18.imad.hasura-app.io/submit', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({"name": name, "email": email, "subject": subject, "like": like}));  
    };
////////////////////////////////////////////////////////////////////////////////
 
 function loadLoginForm () {
    var loginHtml = `
        <h3>Login/Register to unlock awesome features</h3>
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" />
        <br/><br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
             // loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', 'http://sarvesh18.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({"username": username, "password": password}));  
        submit.value = 'Logging in...';
    };
    
    var register = document.getElementById('signup_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var usernameL = document.getElementById('usernameS').value;
        var passwordL = document.getElementById('passwordS').value;
        var emailL = document.getElementById('emailS').value;
        console.log(usernameS);
        console.log(passwordS);
        console.log(emailS);
        request.open('POST', 'http://sarvesh18.imad.hasura-app.io/signup', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({"usernameS": usernameS, "passwordS": passwordS, "emailS": emailS}));  
        register.value = 'Registering...';
    };
}

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
                loadLoginForm();
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

// The first thing to do is to check if the user is logged in!
loadLogin();
/*
// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();
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
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}
////////////////////////////////////////////////////////////////////////////////
    var submit = document.getElementById('submit_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('Logged In Successfully!');
                  //submit.value = 'Logged In Successfully!';
              } else if (request.status === 403) {
                  alert('Invalid Credentials! Try Again!');
                  //submit.value = 'Invalid Credentials! Try Again!';
              } else if (request.status === 500) {
                  alert('Something wen Wrong!!!');
                  //submit.value = 'Login';
              } else {
                  alert('Something wen Wrong!!!');
                  //submit.value = 'Login';
              }
              //loadLogin();
          }  
        };
        
        // Make the request
        var username = document.getElementById('usernameS').value;
        var password = document.getElementById('passwordS').value;
        console.log(usernameS);
        console.log(passwordS);
        request.open('POST', 'http://sarvesh18.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: usernameS, password: passwordS}));  
        //submit.value = 'Logging in...';
        
    };
////////////////////////////////////////////////////////////////////////////////    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User Register Successfully');
                  //register.value = 'Registered!';
              } else {
                  alert('Could ! Register');
                  //register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('usernameR').value;
        var password = document.getElementById('passwordR').value;
        var email = document.getElementById('emailR').value;
        console.log(usernameR);
        console.log(passwordR);
        console.log(emailR);
        request.open('POST', 'http://sarvesh18.imad.hasura-app.io/signup', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: usernameR, password: passwordR}));  
        //register.value = 'Registering...';
    
    };
	*/
