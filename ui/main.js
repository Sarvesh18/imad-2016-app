console.log("Loaded!");

alert('Loaded Successfully!');

var button = document.getElementById('counter');
var counter=0;

button.onclick=function() {
counter= counter+1;
var span=document.getElementById('count');
span.innerHTML=counter.toString();
};
/*
var element=document.getElementById('main-text');
element.innerHTML='Sarvesh';
var image=document.getElementById("madi");
image.onclick=function() {
image.style.marginLeft="100px";
};
*/

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