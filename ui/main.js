console.log("Loaded!");

alert('Loaded Successfully!');

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