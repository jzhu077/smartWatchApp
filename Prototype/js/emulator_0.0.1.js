
var emulator = (function(){
  "use strict";

  var Layer=0;

  //mouse swipe event
  var Swipe_Right = 0;
  var Swipe_Left = 0;
  var Swipe_Up = 0;
  var Swipe_Down = 0;

  // analog clock
  var  ctx_c;
  var radius_c = 0;

  //mouse event
  var can;
  var ctx;
  var canX;
  var canY;
  var mouseIsDown = 0;

  var lastMouseDown = {x: null, y: null};// mouse position when click

  var map;
  var infoWindow;
  var service;

 // var radarservice_result={};

  var pub = {};

  var showPos=function () {
    if (mouseIsDown){console.log("Mouse is down");}

    if (!mouseIsDown){console.log("Mouse is up");}

    if (Swipe_Right) {
      Layer+=1;
      console.log("Swipe Right");
      if(Layer>=1){
        showelement("googleMap");
      }

      if(Layer===2){
        gps_location();
        //text_search('restaurant','1000');
      //  radar_search_info('restaurant','1000');
      }
    }
    if (Swipe_Left){
      showelement("canvas_clock");
      console.log("Swipe Left");
    }
    if (Swipe_Up) {

      console.log("Swipe Up");
    }
    if (Swipe_Down){
      hideelement("canvas_clock");
      console.log("Swipe Down");}
  };



// layer, used to describe the activities
//eg. different screen are put in different layers, when its function is called by user
//the app in specific layer will be bring to foreground.

  /************************************************************************************/
//  canvas mouse event detect mouse up and down or swipe left/right/up/down
//
///***********************************************  */
  function drawImage(ctx,x,y,image,id) {
    var imageObj = new Image();
    imageObj.src = image;
    imageObj.id = id;
    imageObj.style.zIndex = -10;

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
    Swipe_Down= 0;
    Swipe_Left= 0;
    Swipe_Up= 0;
    Swipe_Right=0;
    showPos();
  }

  function mouseXY(event) {
    if(mouseIsDown){
      canX = event.clientX - lastMouseDown.x;
      canY = event.clientY - lastMouseDown.y;}

    if (canX > 40) {
      Swipe_Right = 1;
    } else {
      Swipe_Right = 0;
    }

    if (canX < -40) {
      Swipe_Left = 1;
    } else {
      Swipe_Left = 0;
    }
    if (canY < -40) {
      Swipe_Up = 1;
    } else {
      Swipe_Up = 0;
    }
    if (canY > 40) {
      Swipe_Down = 1;
    } else {
      Swipe_Down = 0;
    }
  }

  function showelement(elementid){

    setelementZindex(elementid,10);
  }
  function hideelement(elementid){

    setelementZindex(elementid,-10);
  }

  /************************************************************************************/
//  get element by Id
//  add mouseeventlistener
//
// /***********************************************  */
  function NewElement(id){
    return document.createElement(id);
  }


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
  function setelementposition(elementid,absorrel) {
    var element=getelement(elementid);
    element.style.position=absorrel;
  }

  /***************************************************************/


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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
  }


  function text_search(text,distance) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
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
  /* Its not valid at the moment
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var result;
      for (var i = 0, result; result = results[i]; i++) {
        addMarker(result);

      }
    }
  }
  */

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
        };
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
 
  pub.radar_search_info= function (keyword,radius) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var current_location = new google.maps.LatLng(pos.lat, pos.lng);
        map = new google.maps.Map(getelement("googleMap"), {
          center: current_location,
          zoom: 13
        });
        service = new google.maps.places.PlacesService(map);
        var request = {
          bounds: map.getBounds(),
          keyword: keyword,
          radius:radius
        };
        service.radarSearch(request, callback_text);

      });


    }
  };
  /* to be fixed and continued
  function callback_text(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var result;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        service.getDetails(result, function (result, status) {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            console.error(status);
            return;
          }
          

          console.log(result.name);
          console.log(result.formatted_address);
          console.log(result.geometry.location.lat(),result.geometry.location.lng());
          console.log(result.opening_hours.open_now);
          
          var dst={lat:result.geometry.location.lat(),lng:result.geometry.location.lng()};
          console.log(dst);
          getGPSlocation();
          var local_lat=local_get("lat");
          var local_lng=local_get("lng");
          console.log(local_lat);
          var src={lat:parseFloat(local_lat),lng:parseFloat(local_lng)};
          console.log(src);
          calculate_distance(src,dst);
          database.saveDB(result.name);
        });
      }
      
    }
  }
  */
  pub.calculate_distance = function (src,dst){
    service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
          origins: [src],
          destinations: [dst],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function (response, status) {
          var i;
          var j;
          var results;
          var element;
          var distance;
          var duration;
          var from;
          var to;
          if (status == google.maps.DistanceMatrixStatus.OK) {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;

            for (i = 0; i < origins.length; i+=1) {
              results = response.rows[i].elements;
              for ( j = 0; j < results.length; j+=1) {
                 element = results[j];
                 distance = element.distance.text;
                 duration = element.duration.text;
                 from = origins[i];
                 to = destinations[j];
                //localStorage.setItem("distanceAB", distance);
                //console.log(localStorage.getItem("distanceAB"));
                //travel.storeDisplay(distance);

                //console.log(duration);

              }
            }
          }

        });
  };
  //fast response distance calculater
  pub.calcDistance = function(p1, p2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  };
  
  /***************************************************************/
  function getGPSlocation(){

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos);
        local_save("lat",pos.lat);
        local_save("lng",pos.lng);
      });
    }
  }

  /************************************************************************************/
//  draw the frame of the watch
//
//
// /***********************************************  */


//suppose height=width, draw a rounded edged rectangle
//x,y is the center of graph
  function draw_inner_frame(ctx, x, y, width, height) {
    ctx.beginPath();
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
//  analog clock , show people a simple analog clock (might be able to implemented in the future)
//
//
// /***********************************************  */
/*
  function runclock(can_clock) {

    ctx_c = get2Dcontext(can_clock);
    radius_c = can_clock.height / 2;
    ctx_c.translate(radius_c, radius_c);
    radius_c = radius_c * 0.90;
    can_clock.style.zIndex = 0;
    setmousedown_listener(can_clock);
    setmousemove_listener(can_clock);
    setmouseup_listener(can_clock);
      $(".app").append("<button type = 'button' id='back'>Back</button>");
    var run=window.setInterval(drawClock,1000);
    if(mouseIsDown) {window.clearInterval(run);}



  }
  function drawClock(){

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
    for(num = 1; num < 13; num+=1){
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
  */
  /************************************************************************************/
//  draw main menu on canvas
//
//
// /***********************************************  */
  function mainmenu(ctx_main){
    ctx_main.fillStyle = "#43D511";
    ctx_main.fillRect(0,0,400,400);

  }



  /***************************************************************/



  /************************/
/*  function show_starti(menu){

    var appbox=getelement("AppBox");
    for(i=0;i<menu.length;i++){
      var btn= NewElement(menu[i]);
      appbox.appendChild(btn);
      setelementposition(menu[i],"relative");
      setelementtop(menu[i],20);
      setelementleft(menu[i],121);
      setelementwidth(menu[i],auto);
      setelementheight(menu[i],auto);
      btn.onclick=function(){};
    }
  }
 */
/*
  function show_Radiusi(menu){
    var appbox=getelement("AppBox");
    for(i=0;i<menu.length;i++){
      var btn= NewElement(menu[i]);
      appbox.appendChild(btn);
      setelementposition(menu[i],"relative");
      setelementtop(menu[i],20);
      setelementleft(menu[i],121);
      setelementwidth(menu[i],auto);
      setelementheight(menu[i],auto);
      btn.onclick=function(){showRadius()};
    }
  }
 */

  /******local storage save item*****/

  function local_save(Itemname, itemvalue){

    localStorage.setItem(Itemname,itemvalue);
  }

  function local_get(itemname){

    return localStorage.getItem(itemname);
  }



  /******HTML setup and modification*****/
  //get user input for the radius and save the value to local
  pub.getRadClick = function (rad) {
    //console.log(rad);
    $("#back").click(function(){
      localStorage.setItem("Menu1", "");
      $('.app').children().remove();
      travel.start();
    });
      
      
    $("#" + rad.r1).click(function () {
      localStorage.setItem("Radius1", 1000);
      //alert("good" + rad.r1);
      disPage(travel.secondOptions(),0);
    });
    $("#" + rad.r2).click(function () {
      localStorage.setItem("Radius1", 5000);
      //alert("good" + rad.r2);
      disPage(travel.secondOptions(),0);
    });
    $("#" + rad.r3).click(function () {
      localStorage.setItem("Radius1", 20000);
      //alert("good" + rad.r3);
      disPage(travel.secondOptions(),0);
    });
  };

// detects a menu click then save it to local storage. After that,
// let the travel app know what by call a function in travel app.
  pub.getMenuClick = function (menu) {
    //console.log(menu);
    var com=localStorage.getItem("Home component");
    var id= localStorage.getItem("app id");
    var appname=localStorage.getItem("app name");  
      
    $("#home").click(function (){
      emulator.showAppIcon(com,id,appname);
    });
    $("#" + menu.b1).click(function () {
      localStorage.setItem("Menu1", menu.b1);
      //alert("good" + menu.b1);
      travel.mainOptions();
    });
    $("#" + menu.b2).click(function () {
      localStorage.setItem("Menu1", menu.b2);
      //alert("good" + menu.b2);
      travel.mainOptions();
    });
    $("#" + menu.b3).click(function () {
      localStorage.setItem("Menu1", menu.b3);
      //alert("good" + menu.b3);
      travel.mainOptions();
    });
  };

  // detects a menu click then decide which one to display to user.
  pub.getListClick = function(display){
    $("#back").click(function(){
      $('.app').children().remove();
      travel.mainOptions();
    });
    $("#next").click(function(){
      var num = parseInt($('.display').find('button').attr('id'))+ 1;
      num %= display.length;
      disPage(display,num);
    });

    $("#prev").click(function(){
      var num = parseInt($('.display').find('button').attr('id'))- 1;
      if (num<0){
        num = 0;
      }
      disPage(display,num);
    });
  };
  
  //Appending tags to show starting menu to initialise the user interface.
  pub.showStart = function (menu) {
    
    $('.app').children().remove();
    
      if(menu.layout=="layout1"){  
        $(".app").append("<li><button type='button' id = "+menu.lefttopb+">"+menu.lefttopb+"</button></li><ul class='firstMenu'>");
    
        $(".firstMenu").append(
            "<li><button type='button' id ='" + menu.b1 + "'>" + menu.b1 + "</button></li>" +
            "<li><button type='button' id ='" + menu.b2 + "'>" + menu.b2 + "</button></li>" +
            "<li><button type='button' id ='" + menu.b3 + "'>" + menu.b3 + "</button></li></ul>");
            }
    showelement(menu.b1);
    
      
    emulator.getMenuClick(menu);
  };


  //Appending tags to show radius selection menu 
  pub.showRadius = function (radius) {
    $('.app').children().remove();
    $(".app").append("<ul class='radius'>");
    if(radius.layout=="layout1"){  
   
    $(".radius").append(
        "<button type = 'button' id="+radius.lefttopb+">"+radius.lefttopb+"</button>"+
        "<li><button type='button' id ='" + radius.r1 + "'>" + radius.r1 + "</button></li>" +
        "<li><button type='button' id ='" + radius.r2 + "'>" + radius.r2 + "</button></li>" +
        "<li><button type='button' id ='" + radius.r3 + "'>" + radius.r3 + "</button></li></ul>");
     }
    emulator.getRadClick(radius);
  };

  //Display one element at a time in display array that is passed from travel app 
  function disPage(display,num){
    $('.app').children().remove();
    //console.log(display);
    $(".app").append("<button type = 'button' id='back'>Back</button>" +
        "<button type = 'button' id='next'>--></button>" +
        "<button type = 'button' id='prev'><--</button>" +
        "<ul class='display'>");
    $(".display").append(function (){
      var str = "";
      var i;
      for( i = 0; i< display.length; i+=1){
        if(i===num) {
          str += "<li><button type='button' id ='" + i + "'>" + display[i].split(";")[0] + "</button></li>";
        }
      }
      return(str+"</ul>");
    });
    emulator.getListClick(display);
  }

  //show the app Icon to start everthing.
  pub.showAppIcon = function (component,id,appname){
    $(".app").children().remove();
    if(component == "button"){  
        $(".app").append("<button type = "+component+" id= "+id+" >" + appname +"</button>");
    }
    $("#travel").click(function(){
      travel.start();
    });
  };

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
    var main_menu = getelement("main_menu");
    var ctx_main = get2Dcontext(main_menu);
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
   // drawImage(ctx,120,120,image);

    //clock app
    var can_clock = getelement("canvas_clock");

    //runclock(can_clock);
    //hideelement("canvas_clock");

    

  };
  return pub;
}());

$(document).ready(emulator.setup);