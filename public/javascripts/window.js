var w = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

document.getElementById("innerW").innerHTML = "Inner Width: " + w;
document.getElementById("innerH").innerHTML = "Inner Height: " + h;
