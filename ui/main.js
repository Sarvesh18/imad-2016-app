
var submit = document.getElementById('login_btn');
submit.onclick = function () {
    // Create a request object
    var request = new XMLHttpRequest();
        
    // Capture the response and store it in a variable
    request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
            submit.value = 'Logged In Successfully!';
        } 
        else if (request.status === 403) {
            submit.value = 'Invalid Credentials! Try Again!';
        } 
        else if (request.status === 500) {
            alert('Something wen Wrong!!!');
            submit.value = 'Login';
        } 
        else {
            alert('Something wen Wrong!!!');
            submit.value = 'Login';
        }
       // loadLogin();
    }  
};
    // Make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', '/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));  
    submit.value = 'Logging in...';
};

var register = document.getElementById('register_btn');
register.onclick = function () {
    // Create a request object
    var request = new XMLHttpRequest();
        
    // Capture the response and store it in a variable
    request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
            alert('User Register Successfully');
            register.value = 'Registered!';
        } 
        else {
            alert('Could ! Register');
            register.value = 'Register';
        }
    }
};
    // Make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    console.log(username);
    console.log(password);
    console.log(email);
    request.open('POST', '/signup', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password email: email}));  
    register.value = 'Registering...';
    };
}

