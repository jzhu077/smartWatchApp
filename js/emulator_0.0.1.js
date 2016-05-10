/**
 * Created by Frankyang on 1/04/2016.
 */
$(document).ready(function() {
    var can, ctx, canX, canY, mouseIsDown = 0;
    var Swipe_Right = 0, Swipe_Left = 0, Swipe_Up = 0, Swipe_Down = 0;
    var lastMouseDown = {x: null, y: null};

    $("body").init(function () {
        can = document.getElementById("myCanvas");
        ctx = can.getContext("2d");

        can.addEventListener("mousedown", mouseDown, false);
        can.addEventListener("mousemove", mouseXY, false);
        can.addEventListener("mouseup", mouseUp, false);

    })

    function mouseUp() {
        mouseIsDown = 0;
        showPos();
    }

    function mouseDown(event) {
        mouseIsDown = 1;
        lastMouseDown.x = event.clientX;
        lastMouseDown.y = event.clientY;
        Swipe_Down=0;
        Swipe_Left=0;
        Swipe_Up=0;
        Swipe_Right=0;

        showPos();
    }

    function mouseXY(event) {
        if(mouseIsDown){
        canX = event.clientX - lastMouseDown.x;
        canY = event.clientY - lastMouseDown.y;}

        if (canX > 40)
            Swipe_Right = 1;
        else
            Swipe_Right = 0;
        if (canX < -40)
            Swipe_Left = 1;
        else
            Swipe_Left = 0;
        if (canY < -40)
            Swipe_Up = 1;
        else
            Swipe_Up = 0;
        if (canY > 40)
            Swipe_Down = 1;
        else
            Swipe_Down = 0;
    }


    function showPos() {
        if (mouseIsDown)
            console.log("Mouse is down")
        if (!mouseIsDown)
            console.log("Mouse is up");
        if (Swipe_Right)
            console.log("Swipe Right");
        if (Swipe_Left)
            console.log("Swipe Left");
        if (Swipe_Up)
            console.log("Swipe Up");
        if (Swipe_Down)
            console.log("Swipe Down");


    }


    function initialize() {
        var mapProp = {
            center: new google.maps.LatLng(-46.0, 170.5),
            zoom: 7,
            panControl: true,
            zoomControl: true,
            // mapTypeControl:true,
            scaleControl: true,
            streetViewControl: true,
            overviewMapControl: true,
            rotateControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    draw_watch_frame(ctx, 200, 200, 200, 200, 10);
    draw_inner_frame(ctx, 200, 200, 160, 160)


//suppose height=width, draw a rounded edged rectangle
//x,y is the center of graph
    function draw_inner_frame(ctx, x, y, width, height) {
        ctx.beginPath()
        ctx.shadowBlur = 0;
        ctx.rect(x - width / 2, y - height / 2, width, height);
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();

    }

    function draw_watch_frame(ctx, x, y, width, height, edge) {
        ctx.beginPath();
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";
        ctx.moveTo(x - width / 2 + edge, y - height / 2);
        ctx.lineTo(x + width / 2 - edge, y - height / 2);
        ctx.quadraticCurveTo(x + width / 2, y - height / 2, x + width / 2, y - height / 2 + edge);
        ctx.lineTo(x + width / 2, y + height / 2 - edge);
        ctx.quadraticCurveTo(x + width / 2, y + height / 2, x + width / 2 - edge, y + height / 2);
        ctx.lineTo(x - width / 2 + edge, y + height / 2);
        ctx.quadraticCurveTo(x - width / 2, y + height / 2, x - width / 2, y + height / 2 - edge);
        ctx.lineTo(x - width / 2, y - height / 2 + edge);
        ctx.quadraticCurveTo(x - width / 2, y - height / 2, x - width / 2 + edge, y - height / 2);
        ctx.stroke();
        var grd = ctx.createRadialGradient(x, y, 0, x, y, 1.41 * width / 2);
        grd.addColorStop(0, "silver");
        grd.addColorStop(1, "white");
        ctx.fillStyle = grd;
        ctx.fill();
    }

})