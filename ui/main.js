//console.log("Loaded!");

//alert('Loaded Successfully!');

/*
var element=document.getElementById('main-text');
element.innerHTML='Sarvesh';
var image=document.getElementById("madi");
image.onclick=function() {
image.style.marginLeft="100px";
};
*/
/*
var element=document.getElementById('main-text');
element.innerHTML='Sarvesh';
var image=document.getElementById('madi');
var marginLeft=0;
function moveRight() {
marginLeft=marginLeft + 1;
image.style.marginLeft=marginLeft+'px';
}
image.onclick=function() {
var interval=setInterval(moveRight,50);//50 in ms
};
*/
/*
var button = document.getElementById('counter');
var counter=0;

button.onclick=function() {
counter= counter+1;
var span=document.getElementById('count');
span.innerHTML=counter.toString();
};
*/

var button = document.getElementById('counter');

button.onclick = function() {
 //Request Object
 var request = new XMLHttpRequest();

 //Request Stage Browser Understand: 1-Open 2-Send 3-Loading 4-Loaded Successfully
 
 request.onreadystatechange = function() {
  if(request.readyState == XMLHttpRequest.DONE) {
   if(request.status == 200) { 
    var counter = request.responseText;
    var span=document.getElementById('count');
    span.innerHTML=counter.toString();
   }
  }
  else {
  }
 };
 //Make a request to the counter endpoint
 request.open('GET', 'http://sarvesh18.imad.hasura-app.io/counter', true);
 request.send(null);
};

var submit = document.getElementById('submit_btn');
submit.onclick = function() {
 //Create Request Object
 var request = new XMLHttpRequest();
 
 //Capture Response & Store in Var
 request.onreadystatechange = function() {
  if(request.readyState == XMLHttpRequest.DONE) {
   //Take Some Action
   if(request.status == 200) { 
    //Capture List & Render
    var names = request.responseText;
    names = JSON.parse(names);
    var list = '';
    for(var i=0; i<names.length; i++) {
     list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
   }
  }
 };
 var nameInput = document.getElementById('name');
 var name = nameInput.value;
 //Make a Request
 request.open('GET', 'http://sarvesh18.imad.hasura-app.io/submit-name?name=' +  name, true);
 request.send(null);
};