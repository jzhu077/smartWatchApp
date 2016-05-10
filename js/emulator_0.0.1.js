/**
 * Created by Frankyang on 1/04/2016.
 */
$(document).ready(function() {
    var can, ctx, canX, canY, mouseIsDown = 0;
    var Swipe_Right = 0, Swipe_Left = 0, Swipe_Up = 0, Swipe_Down = 0;
    var lastMouseDown = {x: null, y: null};
    var map;

    $("body").init(function () {
        can = document.getElementById("myCanvas");
        ctx = can.getContext("2d");

        can.addEventListener("mousedown", mouseDown, false);
        can.addEventListener("mousemove", mouseXY, false);
        can.addEventListener("mouseup", mouseUp, false);

    })


    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    draw_watch_frame(ctx, 200, 200, 200, 200, 10);
    draw_inner_frame(ctx, 200, 200, 160, 160)
    google.maps.event.addDomListener(window, 'load', initialize);
/*
    var btn = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode("Quit");       // Create a text node
    btn.id="quit"
    btn.appendChild(t);                                // Append the text to <button>
    document.body.appendChild(btn);
    btn.style.position.relative;
    btn.style.top=160;
    btn.style.left=0;

    document.getElementById("quit").addEventListener("click", quit);
*/


    //google.maps.event.addDomListener(button, 'click', quit);

    var imageObj = new Image();
    imageObj.src='../images/apple.jpg';
    imageObj.id="apple";
    imageObj.style.zIndex=-2;

    imageObj.onload = function() {
        ctx.drawImage(imageObj, 120, 120);
    };



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
        if (Swipe_Right) {
            console.log("Swipe Right");
            var maps = document.getElementById("googleMap");
            maps.style.zIndex = 0;

        }
        if (Swipe_Left)
            console.log("Swipe Left");
        if (Swipe_Up)
            console.log("Swipe Up");
        if (Swipe_Down)
            console.log("Swipe Down");

    }

    function CenterControl(controlDiv, map) {

        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to hidemap';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto';
        controlText.style.fontSize = '14px';
        controlText.style.lineHeight = '20px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Quitmap';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
            var maps = document.getElementById("googleMap");
            maps.style.zIndex = -10;
        });
    }

    function initialize() {
        var mapProp = {
            center: new google.maps.LatLng(-45.88, 170.5),
            zoom: 13,
            panControl: true,
            zoomControl: true,
            //mapTypeControl:true,
            scaleControl: true,
            streetViewControl: true,
            overviewMapControl: true,
            rotateControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        };
        map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        var quitmap = document.createElement('div');
        CenterControl(quitmap, map);
        CenterControl.index=1;
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(quitmap);

    }



//suppose height=width, draw a rounded edged rectangle
//x,y is the center of graph
    function draw_inner_frame(ctx, x, y, width, height) {
        ctx.beginPath()
        ctx.shadowBlur = 0;
       // ctx.rect(x - width / 2, y - height / 2, width, height);
        ctx.clearRect(x - width / 2, y - height / 2, width, height);
        ctx.stroke();
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
        ctx.fill();
    }

})