/**
 * Created by Frankyang on 1/04/2016.
 */
$.getScript('../js/App.js', function() {
    console.log('Load was performed.');
});
var travel = (function(){
    "use strict";
    var pub = {};

    var can, ctx, canX, canY, mouseIsDown = 0;
    var can_clock, ctx_c, radius_c = 0;// analog clock
    var Swipe_Right = 0, Swipe_Left = 0, Swipe_Up = 0, Swipe_Down = 0;//mouse swipe event
    var lastMouseDown = {x: null, y: null};// mouse position when click
    var map; //google map
    var main_menu = 0;
    var food_menu = 0;
    var entertain_menu = 0;// canvas menu
    var ctx_main = 0;
    var ctx_food = 0;
    var ctx_entertain = 0;//canvas menu
    var Layer = 0;
    // layer, used to describe the activities
    //eg. different screen are put in different layers, when its function is called by user
    //the app in specific layer will be bring to foreground.


/************************************************************************************/
//  canvas mouse event detect mouse up and down or swipe left/right/up/down
//
///***********************************************  */
    function drawfirstscreen() {
    var imageObj = new Image();
    imageObj.src = '../images/travel.jpg';
    imageObj.id = "apple";
    imageObj.style.zIndex = -2;

    imageObj.onload = function () {
        ctx.drawImage(imageObj, 120, 120);
    };

}
/************************************************************************************/
//  canvas mouse event detect mouse up and down or swipe left/right/up/down
//
// /***********************************************  */


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
            if (Layer == 0) {
            var maps = document.getElementById("googleMap");
            maps.style.zIndex = 0;
            Layer=10;}
        }
        if (Swipe_Left){
            console.log("Swipe Left");
            if(Layer==0){
            runclock();
            Layer=2;}
        }
        if (Swipe_Up) {
            var main = document.getElementById("main_menu");
            main.style.zIndex = 0;
            mainmenu();
            console.log("Swipe Up");
        }
        if (Swipe_Down)
            if(Layer==2)
            {
                var clock = document.getElementById("canvas_clock");
                clock.style.zIndex = -2;
                Layer=0;
            }
            console.log("Swipe Down");
    }

/************************************************************************************/
//  google maps draw a simple google map on watch
//  require network connection
//
// /***********************************************  */
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
            Layer=0;

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

/************************************************************************************/
//  draw the frame of the watch
//
//
// /***********************************************  */


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

/************************************************************************************/
//  analog clock , show people a simple analog clock
//
//
// /***********************************************  */

    function runclock() {

        can_clock.style.zIndex = 0;
        can_clock.addEventListener("mousedown", mouseDown, false);
        can_clock.addEventListener("mousemove", mouseXY, false);
        can_clock.addEventListener("mouseup", mouseUp, false);

        var run;

        run=window.setInterval(drawClock,1000);
        if(mouseIsDown)
        window.clearInterval(run);


    }
    function drawClock() {
        drawFace(ctx_c, radius_c);
        drawNumbers(ctx_c, radius_c);
        drawTime(ctx_c, radius_c);
    }

    function drawFace(ctxc, radius) {
        var grad;
        ctxc.beginPath();
        ctxc.arc(0, 0, radius, 0, 2*Math.PI);
        ctxc.fillStyle = 'white';
        ctxc.fill();
        grad = ctxc.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
        grad.addColorStop(0, '#333');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1, '#333');
        ctxc.strokeStyle = grad;
        ctxc.lineWidth = radius*0.1;
        ctxc.stroke();
        ctxc.beginPath();
        ctxc.arc(0, 0, radius*0.1, 0, 2*Math.PI);
        ctxc.fillStyle = '#333';
        ctxc.fill();
    }

    function drawNumbers(ctx, radius) {
        var ang;
        var num;
        ctx.font = radius*0.15 + "px arial";
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        for(num = 1; num < 13; num++){
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius*0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius*0.85);
            ctx.rotate(-ang);
        }
    }

    function drawTime(ctx, radius){
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        //hour
        hour=hour%12;
        hour=(hour*Math.PI/6)+
        (minute*Math.PI/(6*60))+
        (second*Math.PI/(360*60));
        drawHand(ctx, hour, radius*0.5, radius*0.07);
        //minute
        minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
        drawHand(ctx, minute, radius*0.8, radius*0.07);
        // second
        second=(second*Math.PI/30);
        drawHand(ctx, second, radius*0.9, radius*0.02);
    }

    function drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }
/************************************************************************************/
//  draw main menu on canvas
//
//
// /***********************************************  */
    function mainmenu(){
        ctx_main.fillStyle = "#43D511";
        ctx_main.fillRect(0,0,400,400);

    }
/***************************************************************/
    function loadImage(){
        alert("hi");
        console.log("hi");
        var html = "<img src=travel.jpg>";
        $(".app").append(html);
    }

    /** Will get GPS location.
     *
     */
    function getGPS(){
        var GPS = $(".pages").val();
        Cookie.set("GPS",GPS);
        console.log(Cookie.get("GPS"));
    }

    function findFood(){

    }

    function setButtons(){

    }

    /** Uses the getGPS function to set a radius and show to user.*/
    function pickRadius(){

    }

    /**
     * On setup, the script will automatically create a text input within a span
     * Edit button is linked to the showInputBoxes function.
     */
    pub.setup = function() {
        can = document.getElementById("myCanvas");
        ctx = can.getContext("2d");
        can.addEventListener("mousedown", mouseDown, false);
        can.addEventListener("mousemove", mouseXY, false);
        can.addEventListener("mouseup", mouseUp, false);

        can_clock = document.getElementById("canvas_clock");
        ctx_c = can_clock.getContext("2d");

        radius_c = can_clock.height / 2;
        ctx_c.translate(radius_c, radius_c);
        radius_c = radius_c * 0.90;

        main_menu = document.getElementById("main_menu");
        ctx_main = main_menu.getContext("2d");
        food_menu = document.getElementById("food_menu");
        ctx_food = food_menu.getContext("2d");
        entertain_menu = document.getElementById("entertain_menu");
        ctx_entertain = entertain_menu.getContext("2d");


        draw_watch_frame(ctx, 200, 200, 200, 200, 10);
        draw_inner_frame(ctx, 200, 200, 160, 160);
        google.maps.event.addDomListener(window, 'load', initialize);

        drawfirstscreen();

    };
    return pub;
}());


$(document).ready(travel.setup);



