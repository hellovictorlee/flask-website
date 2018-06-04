console.log("USA Map");

var mapcanvas = document.getElementById('mapcanvas');
var context = mapcanvas.getContext('2d');

init();

// cursor location
var c_loc = [window.innerWidth/2, window.innerHeight/2];
var c_r = 10;

function init() {
    resize();
    window.addEventListener('mousemove', getMousePos, false);
    setInterval(draw1, 25);
}

function resize() {
    var w = document.getElementById("map").offsetWidth;
    mapcanvas.width = w;
    mapcanvas.height = w * 1002 / 1600;
}

function getMousePos(e) {
    var event = e || window.event;
    var rect = mapcanvas.getBoundingClientRect();
    c_loc[0] = event.clientX - rect.left;
    c_loc[1] = event.clientY - rect.top;
}

function draw1(e) {
    context.fillStyle = '#FF5733';
    circle(c_loc[0], c_loc[1], 10);
}

function circle(x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, 2*Math.PI, false);
    context.closePath();
    context.fill();
}
