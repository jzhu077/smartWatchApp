var emulator = (function(){
    "use strict";

    //canvas settings
    var x,y,edge;
    var width, height;
    var can;
    var ctx;

<<<<<<< HEAD
var emulator = (function(){
  "use strict";
  var touchcoordinates = {
  x: 0,
  y: 0
  };
  //canvas settings
  var x,y,edge;
  var width, height;
  var can;
  var ctx;
  
  var pub = {};

  pub.calcDistance = function(p1, p2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  };
  


  /******local storage save item*****/

  function local_save(Itemname, itemvalue){

    localStorage.setItem(Itemname,itemvalue);
  }

  function local_get(itemname){

    return localStorage.getItem(itemname);
  }

pub.coordinatesofEmulator = function(){
  var coordinates = {
    x : x,
    y : y,
  };
  return coordinates;
}

pub.width = function(){
  
  return width;
};

pub.height = function(){
  return height;
};

 pub.draw = function(x,y,width, height, color){    
    ctx.fillStyle = color;  
    ctx.fillRect(x, y, width, height);
    ctx.stroke();
  }

  pub.write = function(x,y,message){
    ctx.font = 'italic 10pt Calibri';
    ctx.fillStyle='black';
    //ctx.clearRect(x,y,width,height);
    ctx.fillText(message, x, y);
  }  

  pub.clearScreen= function(){
      ctx.clearRect(0,0,can.height,can.width);     
      emulator.setup();
      //draw_watch_frame(ctx,200,200,200,200,10);
  }
 
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
  
    pub.addmousedownlistener=function(funct){

        can.addEventListener("mousedown", funct, false);
    }

    pub.addmouseuplistener=function(funct){

        can.addEventListener("mouseup", funct, false);
    }
    pub.addmousemovelistener=function(funct){

        can.addEventListener("mousemove", funct, false);
    }
    
  pub.setup = function() {
    x = 101;
    y = 94;
    width = 200;
    height = 200;
    edge = 10;
=======
    var pub = {};

    pub.calcDistance = function(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    };



    /******local storage save item*****/

    function local_save(Itemname, itemvalue){

        localStorage.setItem(Itemname,itemvalue);
    }

    function local_get(itemname){

        return localStorage.getItem(itemname);
    }

    pub.coordinatesofEmulator = function(){
        var coordinates = {
            x : x,
            y : y
        };
        return coordinates;
    };

    pub.width = function(){

        return width;
    };

    pub.height = function(){
        return height;
    };

    pub.draw = function(x,y,width, height, color){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        ctx.stroke();
    }

    pub.write = function(x,y,message){
        ctx.font = 'italic 20pt Calibri';
        //ctx.clearRect(x,y,width,height);
        ctx.fillText(message, x, y);
    };

    pub.clearScreen= function(){
        ctx.clearRect(0,0,can.height,can.width);
        //draw_watch_frame(ctx,200,200,200,200,10);
    };

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

    var touchcoordinates = {
        x : 0,
        y : 0
    };

    pub.getXY = function() {
        var myVar = setInterval(function check(){
            if(touchcoordinates.x != 0 && touchcoordinates.y != 0 ){
                return touchcoordinates;
            }else{
                return null;
            }
        },1000);
    };

    function doMouseDown(event){
        touchcoordinates = {
            x : event.pageX,
            y : event.pageY
        };

    }
>>>>>>> origin/master

    pub.setup = function() {
        x = 101;
        y = 94;
        width = 200;
        height = 200;
        edge = 10;

        can = document.getElementById("emulator") ;
        ctx = can.getContext("2d");
        can.addEventListener("mousedown", doMouseDown, false);

        draw_watch_frame(ctx, 200, 200, width, height, edge);

        //draw_inner_frame(ctx, 200, 200, 160, 160);
        //create();
    };
    return pub;
}());

$(document).ready(emulator.setup);
