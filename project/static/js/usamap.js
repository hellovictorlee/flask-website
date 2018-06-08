console.log("USA Map");

var mapcanvas = document.getElementById('mapcanvas');
var context = mapcanvas.getContext('2d');

// cursor location
var c_loc = [-1, -1];

// draw status
var day = 0;

// path point radius
var radius = 5;

init();

function init() {
    // hide all days
    for (i=1; i<24; i++) {
        var s = "#day" + i.toString();
        $(s).hide();
    }

    resize();
    draw();
    window.addEventListener('mousemove', getMousePos, false);
    window.addEventListener('mousedown', daySelect, false);
    window.addEventListener('keypress', dayChange, false);
    // setInterval(draw, 10);
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

function daySelect(e) {
    $("#mapcanvas").on('touchstart mousedown', function() {
        // hide all days
        for (i=1; i<24; i++) {
            var s = "#day" + i.toString();
            $(s).hide();
        }

        // show day of current section
        if (getSection() != -1) {
            var s = "#day" + getSection().toString();
            $(s).show();
        }
    });
}

function dayChange(e) {
    if (e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 43 || e.keyCode == 107)
        day += 1;
    else if (e.keyCode == 37 || e.keyCode == 40 || e.keyCode == 45 || e.keyCode == 106)
        day -= 1;
    else
        return;
    day = day >= 0 ? day % 24 : 0;
    draw();
}

function draw() {
    // context.clearRect(0, 0, mapcanvas.width, mapcanvas.height);

    var current_section = getSection();
    var color_array = ["#aed6f1","#a9cce3","#d2b4de","#d7bde2","#f5b7b1","#e6b0aa","#a3e4d7","#a3e4d7","#a3e4d7","#abebc6","#f9e79f","#fad7a0","#f5cba7","#edbb99","#f7f9f9","#e5e7e9","#d5dbdb","#ccd1d1","#aeb6bf","#abb2b9","#e6b0aa","#f5b7b1","#d7bde2","#d2b4de"];
    var scale = mapcanvas.width / 800;
    var x, y;

    for (var key in dic) {
        context.fillStyle = color_array[dic[key]];
        x = Math.round(parseInt(key.split(" ")[0]) * scale);
        y = Math.round(parseInt(key.split(" ")[1]) * scale);

        circle(x, y, radius);
    }
}

function getSection() {
    var scale = mapcanvas.width / 800;
    var current_section = -1;

    for (key in dic) {
        var x2 = Math.round(parseInt(key.split(" ")[0]) * scale);
        var y2 = Math.round(parseInt(key.split(" ")[1]) * scale);
        var d = distance(c_loc[0], c_loc[1], x2, y2);
        if (d <= radius) {
            current_section = dic[key];
            break;
        }
    }
    return current_section;
}

function circle(x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, 2*Math.PI, false);
    context.closePath();
    context.fill();
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))
}
