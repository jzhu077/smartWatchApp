/**
 * Created by Frankyang on 12/05/2016.
 */
var can, ctx=0;
var can_clock, ctx_c, radius_c = 0;// analog clock
var main_menu = 0;
var food_menu = 0;
var entertain_menu = 0;// canvas menu
var ctx_main = 0;
var ctx_food = 0;
var ctx_entertain = 0;//canvas menu
var Layer=0;
var travel = (function(){
    "use strict";
    var pub = {};
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

    //app menu
    main_menu = document.getElementById("main_menu");
    ctx_main = main_menu.getContext("2d");
    food_menu = document.getElementById("food_menu");
    ctx_food = food_menu.getContext("2d");
    entertain_menu = document.getElementById("entertain_menu");
    ctx_entertain = entertain_menu.getContext("2d");
    //frame of watch
    draw_watch_frame(ctx, 200, 200, 200, 200, 10);
    draw_inner_frame(ctx, 200, 200, 160, 160);
    //google map
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
    var map_element=document.getElementById("googleMap");
    google.maps.event.addDomListener(window, 'load', initialize(map_element,mapProp));
    //first screen
    var image='../images/travel.jpg'
    drawfirstscreen(ctx,120,120,image);

    //clock app
    can_clock = document.getElementById("canvas_clock");
    ctx_c = can_clock.getContext("2d");
    radius_c = can_clock.height / 2;
    ctx_c.translate(radius_c, radius_c);
    radius_c = radius_c * 0.90;

};
    return pub;
}());

$(document).ready(travel.setup);


function showPos() {
    if (mouseIsDown)
        console.log("Mouse is down")
    if (!mouseIsDown)
        console.log("Mouse is up");
    if (Swipe_Right) {
        console.log("Swipe Right");
        if (Layer == 0) {
            Layer=10;
            pop_googlemaps();
        }
    }
    if (Swipe_Left){
        console.log("Swipe Left");
        if(Layer==0){
            runclock(can_clock);
            Layer=2;}
    }
    if (Swipe_Up) {
        var main = document.getElementById("main_menu");
        main.style.zIndex = 0;
        mainmenu(ctx_main);
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

function pop_googlemaps(){
    console.log(Layer)
    var maps = document.getElementById("googleMap");
    maps.style.zIndex = 0;
    gps_location();
}