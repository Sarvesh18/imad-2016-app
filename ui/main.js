    var subscription = document.getElementById('subscription_btn');
    subscription.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User Added Successfully');
                  //subscription.value = 'Add!';
              } else {
                  alert('Could ! Add');
                  //subscription.value = 'Add';
              }
          }
        };
        
        // Make the request
        var likeA = false;
        var usernameA = document.getElementById('nameA').value;
        var emailA = document.getElementById('emailA').value;
        var subjectA = document.getElementById('subjectA').value;
        var likeA = document.getElementById('likeA').value;
        console.log(nameA);
        console.log(emailA);
        console.log(subjectA);
        console.log(likeA);
        request.open('POST', '/subscription', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({name: nameA, email: emailA, subject: subjectA, like: likeA}));  
        //subscription.value = 'Adding...';
    
    };
////////////////////////////////////////////////////////////////////////////////
    var submit = document.getElementById('login_btn');
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
        request.open('POST', '/login', true);
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
        request.open('POST', '/signup', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: usernameR, password: passwordR}));  
        //register.value = 'Registering...';
    
    };