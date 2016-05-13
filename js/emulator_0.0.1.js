/**
 * Created by Frankyang on 1/04/2016.
 */


    var can, ctx, canX, canY, mouseIsDown = 0;
    var can_clock, ctx_c, radius_c = 0;// analog clock
    var Swipe_Right = 0, Swipe_Left = 0, Swipe_Up = 0, Swipe_Down = 0;//mouse swipe event
    var lastMouseDown = {x: null, y: null};// mouse position when click
    var map=0;
    var service;
    var infoWindow;
    //var Layer = 0;

    var main_menu = 0;
    var food_menu = 0;
    var entertain_menu = 0;// canvas menu
    var ctx_main = 0;
    var ctx_food = 0;
    var ctx_entertain = 0;//canvas menu
    // layer, used to describe the activities
    //eg. different screen are put in different layers, when its function is called by user
    //the app in specific layer will be bring to foreground.

/************************************************************************************/
//  canvas mouse event detect mouse up and down or swipe left/right/up/down
//
///***********************************************  */
    function drawfirstscreen(ctx,x,y,image) {
    var imageObj = new Image();
    imageObj.src = image;
    imageObj.id = "apple";
    imageObj.style.zIndex = -2;

    imageObj.onload = function () {
        ctx.drawImage(imageObj, x, y);
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

    function showelement(elementid){
        setelementZindex(elementid,10);
    }
    function hideelement(elementid){
    setelementZindex(elementid,-10);
    }

/************************************************************************************/
//  google maps draw a simple google map on watch
//  require network connection
//
// /***********************************************  */
    function init_googlemap(map_element, mapProp){
        google.maps.event.addDomListener(window, 'load', initialize(map_element,mapProp));
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
            hideelement("googleMap");

        });
    }

    function initialize(map_element, map_para ) {

        map = new google.maps.Map(map_element, map_para);
        var quitmap = document.createElement('div');
        CenterControl(quitmap, map);
        CenterControl.index=1;
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(quitmap);
        gps_location();
    }
/******************************************/
// get Gps location
//
//
//
//
    function gps_location(){

    infoWindow = new google.maps.InfoWindow({
        map: map
    });
    //Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            //infoWindow.width=300;
            //infoWindow.height=30;
            infoWindow.setContent('You are here');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }

var service;

function text_search(text,distance) {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            var current_location = new google.maps.LatLng(pos.lat, pos.lng);

            map = new google.maps.Map(getelement("googleMap"), {
                center: current_location,
                zoom: 14,
                panControl: true,
                zoomControl: true,
                //mapTypeControl:true,
                scaleControl: true,
                streetViewControl: true,
                overviewMapControl: true,
                rotateControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var request = {
                location: current_location,
                radius: distance,
                query: text
            };
            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);
        });
    }
}
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var result;
        for (var i = 0, result; result = results[i]; i++) {
            addMarker(result);

        }
    }
}

function findfood(){
    text_search();
}

function findlocation(){
    gps_location();
}


function radar_search(keyword,radius) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            var current_location = new google.maps.LatLng(pos.lat, pos.lng);

            map = new google.maps.Map(getelement("googleMap"), {
                center: current_location,
                zoom: 14,
                zoomControl: true,
                streetViewControl: true,
                overviewMapControl: true
                //mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            infoWindow = new google.maps.InfoWindow();

            service = new google.maps.places.PlacesService(map);
            var request = {
                bounds: map.getBounds(),
                keyword: keyword,
                radius:radius
                //query: "restaurant"
            };
            service.radarSearch(request, callback);

        });
    }
}

function addMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
            url: '../images/circle.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(10, 17)
        }
    });

    google.maps.event.addListener(marker, 'click', function() {
        service.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
            infoWindow.setContent(result.name);
            infoWindow.open(map, marker);
        });
    });
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


/************************************************************************************/
//  analog clock , show people a simple analog clock
//
//
// /***********************************************  */

    function runclock(can_clock) {

        can_clock.style.zIndex = 0;
        setmousedown_listener(can_clock);
        setmousemove_listener(can_clock);
        setmouseup_listener(can_clock);

        var run=window.setInterval(drawClock,1000);
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
    function mainmenu(ctx_main){
        ctx_main.fillStyle = "#43D511";
        ctx_main.fillRect(0,0,400,400);

    }

/************************************************************************************/
//  get element by Id
//  add mouseeventlistener
//
// /***********************************************  */
function getelement( id){
    return document.getElementById(id);

}
function get2Dcontext(element){
    return element.getContext("2d");
}


function setmousedown_listener(canvas){
    canvas.addEventListener("mousedown", mouseDown, false);
}
function setmouseup_listener(canvas){
    canvas.addEventListener("mouseup", mouseUp, false);
}
function setmousemove_listener(canvas){
    canvas.addEventListener("mousemove", mouseXY, false);
}

/***************************************************************/
//css style wrapper
//
//
/*************************************************************/
function setelementZindex(elementid,Z) {
    var element=getelement(elementid);
    element.style.zIndex=Z;
}
function setelementleft(elementid,left) {
    var element=getelement(elementid);
    element.style.left=left;
}
function setelementtop(elementid,top) {
    var element=getelement(elementid);
    element.style.top=top;
}
function setelementwidth(elementid,width) {
    var element=getelement(elementid);
    element.style.width=width;
}
function setelementheight(elementid,height) {
    var element=getelement(elementid);
    element.style.height=height;
}


/***************************************************************/

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

    function setButtons(){

    }

    /** Uses the getGPS function to set a radius and show to user.*/
    function pickRadius(){

    }





