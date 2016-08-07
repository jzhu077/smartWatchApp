
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

  //calculate distance between two points, require google(network) support    
  pub.calcDistance = function(p1, p2) {      
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  };
    
  /******local storage save item*****/

  pub.localsave=function(itemname, itemvalue){

    localStorage.setItem(Itemname,itemvalue);
  }

  pub.localget=function(itemname){

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
pub.ctx=function(){
    return ctx;   
}
pub.can=function(){
    return can;
}
 pub.draw = function(x,y,width, height, color){    
    ctx.fillStyle = color;  
    ctx.fillRect(x, y, width, height);
    ctx.stroke();
  }

  pub.write = function(x,y,message){
    ctx.font = 'italic 10pt Calibri';
    ctx.fillStyle='black';
    ctx.fillText(message, x, y,120);
  }  

  pub.clearScreen= function(){
      ctx.clearRect(0,0,can.height,can.width);     
      emulator.setup();
      //draw_watch_frame(ctx,200,200,200,200,10);
  }
 
  function draw_inner_frame(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "black";  
    ctx.rect(x - width / 2, y - height / 2, width, height);
    //ctx.clearRect(x - width / 2, y - height / 2, width, height);
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
  
    
    //register mouse down event methods on canvas
    //
    pub.addmousedownlistener=function(funct){

        can.addEventListener("mousedown", funct, false);
    }

    //
    //register mouseup event methods on canvas
    pub.addmouseuplistener=function(funct){

        can.addEventListener("mouseup", funct, false);
    }
    
    //register move event methods on canvas
    pub.addmousemovelistener=function(funct){

        can.addEventListener("mousemove", funct, false);
    }
    
    
    pub.drawline=function(pos, length, width) { 
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }
    
    
    //draw text:universal method
    //
    pub.fillTxt=function(string,x,y){      
      ctx.font = string.font;
      ctx.textBaseline=string.baseline;
      ctx.textAlign=string.position;
      ctx.fillStyle=string.style;
      ctx.fillText(string.data, x, y,string.maxwidth);
    }
    
    //rotateangle:rotate canvas 
    //
    pub.rotateangle=function(ang){
        ctx.rotate(ang);
    }
    
    
    //transposition:
    // translate the position to another coordinates
    //
    pub.transposition=function(x,y){
        
        ctx.translate(x,y);
    }
    
    
    
    //savestate:save the current state of coordinate info
    //
    pub.savestate=function(){
        ctx.save();
    }
    
    //recoverstate
    //recover the state saved before transposition
    //
    pub.recoverstate=function(){
        
        ctx.restore();
    }
    
    
    //draw a circle
    //parameter:position,radius,color
    pub.drawcircle=function(x,y,radius,color) {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2*Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.stroke();
    };
    
  pub.setup = function() {
    x = 101;
    y = 94;
    width = 200;
    height = 200;
    edge = 10;
        
        can = document.getElementById("emulator") ;
        ctx = can.getContext("2d");

        draw_watch_frame(ctx, 200, 200, width, height, edge);

        draw_inner_frame(ctx, 200, 200, 160, 160);
        //create();
    };
    return pub;
}());

$(document).ready(emulator.setup);
