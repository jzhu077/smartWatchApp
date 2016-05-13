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
    can = getelement("myCanvas");
    ctx = get2Dcontext(can);
    setmousedown_listener(can);
    setmouseup_listener(can);
    setmousemove_listener(can);
    //app menu
    main_menu = getelement("main_menu");
    ctx_main = get2Dcontext(main_menu);
    setmousedown_listener(main_menu);
    setmousemove_listener(main_menu);
    setmouseup_listener(main_menu);
    mainmenu(ctx_main);
    hideelement("main_menu");

    //frame of watch
    draw_watch_frame(ctx, 200, 200, 200, 200, 10);
    draw_inner_frame(ctx, 200, 200, 160, 160);
    //google map

    var mapProp = {
        center: new google.maps.LatLng(-45.88, 170.5),
        zoom: 13,
        //panControl: true,
        zoomControl: true,
        streetViewControl: true,
        overviewMapControl: true
        //mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map_element=getelement("googleMap");
    init_googlemap( map_element,mapProp);
    //first screen
    var image='images/travel.jpg';
    drawfirstscreen(ctx,120,120,image);

    //clock app
    can_clock = getelement("canvas_clock");
    ctx_c = get2Dcontext(can_clock);
    radius_c = can_clock.height / 2;
    ctx_c.translate(radius_c, radius_c);
    radius_c = radius_c * 0.90;
    runclock(can_clock);
    hideelement("canvas_clock");

};
    return pub;
}());

$(document).ready(travel.setup);


function showPos() {
    if (mouseIsDown)
        console.log("Mouse is down");
    if (!mouseIsDown)
        console.log("Mouse is up");
    if (Swipe_Right) {
        Layer++;
        console.log("Swipe Right");
        if(Layer>=1)
        showelement("googleMap");
        if(Layer==2)
        gps_location();
        if(Layer==3){
        //text_search('restaurant','1000');
            radar_search('restaurant','1000');
        }
    }
    if (Swipe_Left){
        showelement("canvas_clock");
        console.log("Swipe Left");
    }
    if (Swipe_Up) {
        showelement("main_menu");
        console.log("Swipe Up");
    }
    if (Swipe_Down){
        hideelement("canvas_clock");
        console.log("Swipe Down");}
}

