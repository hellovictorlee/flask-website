console.log("USA Map");

var mapcanvas = document.getElementById('mapcanvas');
var context = mapcanvas.getContext('2d');

// cursor location
var c_loc = [-1, -1];

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

function daySelect(e) {
    $("#mapcanvas").click(function() {
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

function draw() {
    context.clearRect(0, 0, mapcanvas.width, mapcanvas.height);
    context.fillStyle = 'blue';
    var state = -1;

    var current_section = getSection();

    scale = mapcanvas.width / 800;
    var x, y
    for (var key in dic) {
        x = Math.round(parseInt(key.split(" ")[0]) * scale);
        y = Math.round(parseInt(key.split(" ")[1]) * scale);
        // if (current_section == dic[key] && state != current_section) {
        //     context.clearRect(x, y, 1, 1);
        //     context.fillStyle = 'yellow';
        //     state = current_section;
        // }
        // else if (state != -1) {
        //     context.clearRect(x, y, 1, 1);
        //     context.fillStyle = 'blue';
        //     state = -1
        // }

        context.fillRect(x, y, 1, 1);
    }
}

function getSection() {
    scale = mapcanvas.width / 800;
    var current_section = -1;
    var c_loc_string = Math.round(c_loc[0] / scale).toString() + " " + Math.round(c_loc[1] / scale).toString();
    if (c_loc_string in dic)
        current_section = dic[c_loc_string];
    return current_section;
}
