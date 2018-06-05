console.log("USA Map");

var mapcanvas = document.getElementById('mapcanvas');
var context = mapcanvas.getContext('2d');

init();

// cursor location
var c_loc = [-1, -1];

function init() {
    resize();
    getPath();
    window.addEventListener('mousemove', getMousePos, false);
    // setInterval(draw, 25);
}

function resize() {
    var w = document.getElementById("map").offsetWidth;
    mapcanvas.width = Math.round(w);
    mapcanvas.height = Math.round(w * 1002 / 1600);
}

function getMousePos(e) {
    var event = e || window.event;
    var rect = mapcanvas.getBoundingClientRect();
    var w = Math.round(event.clientX - rect.left);
    var h = Math.round(event.clientY - rect.top);

    if (0 <= w && w < mapcanvas.width && 0 <= h && h < mapcanvas.height)
        c_loc = [w, h];
    else
        c_loc = [-1, -1];
}

function getPath() {
    $.getJSON('../static/data/data.json', function(data) {         
        console.log(data);
    });
}
