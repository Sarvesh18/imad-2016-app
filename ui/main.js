var submit = document.getElementById('submit_btn');
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
 request.send(JSON, stringify({username: username, password:password}));
};

