var submit = document.getElementById('submit_btn_login');
submit.onclick = function() {
 //Create Request Object
 var request = new XMLHttpRequest();
 
 //Capture Response & Store in Var
 request.onreadystatechange = function() {
  if(request.readyState == XMLHttpRequest.DONE) {
   //Take Some Action
   if(request.status == 200) { 
    alert('Logged In Successfully');
   }
   else if(request.status == 403) { 
    alert('username/password is incorrect');
   }
   else if(request.status == 500) { 
    alert('Something wen Wrong!!!');
   }
  }
 };
 var username = document.getElementById('username').value;
 var password = document.getElementById('password').value;
 console.log(username);
 console.log(password);
 //Make a Request
 request.open('POST', 'http://sarvesh18.imad.hasura-app.io/login', true);
 request.setRequestHeader('Content-Type','application/json');
 request.send(JSON.stringify({username: username, password:password}));
};

var submit = document.getElementById('submit_btn_signup');
submit.onclick = function() {
 //Create Request Object
 var request = new XMLHttpRequest();
 
 //Capture Response & Store in Var
 request.onreadystatechange = function() {
  if(request.readyState == XMLHttpRequest.DONE) {
   //Take Some Action
   if(request.status == 200) { 
    alert('Registered In Successfully ');
   }
   else if(request.status == 403) { 
    alert('username/password is incorrect');
   }
   else if(request.status == 500) { 
    alert('Something wen Wrong!!!');
   }
  }
 };
 var username = document.getElementById('username').value;
 var password = document.getElementById('password').value;
 var password = document.getElementById('email').value;
 console.log(username);
 console.log(password);
 console.log(email);
 //Make a Request
 request.open('POST', 'http://sarvesh18.imad.hasura-app.io/signup', true);
 request.setRequestHeader('Content-Type','application/json');
 request.send(JSON.stringify({username: username, password:password, email:email}));
};

