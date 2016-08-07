
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
  var left_top={};    
  var frame_size={};   
  var pub = {};

    /***************application related methods*********************/
    //calculate distance between two points, require google(network) support    
    pub.calcDistance = function(p1, p2) {      
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    };
    
    /********************get data set from emulator*******************/
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
    pub.lefttop=function(){
        return left_top;
    }
    pub.framesize=function(){
        return frame_size;
    }
    /***********register enent methods*********************/
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
    
    pub.addeventtrigger=function(object,eventname,method){
        object.addEventListener(eventname, method);
    
    }
        

    /******************canvas draw*****************************/
     pub.draw = function(x,y,width, height, color){    
        ctx.fillStyle = color;  
        ctx.fillRect(x, y, width, height);
        ctx.stroke();
      }

      pub.write = function(x,y,message){
        ctx.font = 'italic 10pt Calibri';
        ctx.fillStyle='white';
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
          
        ctx.rect(x - width / 2, y - height / 2, width, height);
        
        ctx.clearRect(x - width / 2, y - height / 2, width, height);
        ctx.fillStyle='grey';
        ctx.fill();  
        ctx.stroke();
      }

      function draw_watch_frame(ctx, x, y, width, height, edge) {
        ctx.beginPath();
        ctx.shadowBlur = 20;
        ctx.fillStyle='black';  
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


        //draw a circle
        //parameter:position,radius,color
      pub.drawcircle=function(x,y,radius,color) {
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, 2*Math.PI);
              ctx.fillStyle = color;
              ctx.fill();
              ctx.stroke();
        };

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
      pub.rotateangle=function(ang){
            return ctx.rotate(ang);
        }

    
    /**************translate coordinate set***********/
        //transposition:
        // translate the position to another coordinates
        //
      pub.transposition=function(x,y){

            return ctx.translate(x,y);
        }
    
    
    
      //savestate:save the current state of coordinate info
      //
      pub.savestate=function(){
            return ctx.save();
        }

        //recoverstate
        //recover the state saved before transposition
        //
      pub.recoverstate=function(){

            return ctx.restore();
        }

    
    
    
    /******************document element operation**************/
      //create element with id and tag
      pub.create=function(node,class_id,id){
            var new_node=document.createElement(node);
            new_node.setAttribute('id',id);
            new_node.setAttribute('class',class_id);
            return new_node;
        }
      pub.appendtobody=function(node){
          return document.body.appendChild(node);
      }
      pub.appendtoparent=function(father,son){
          return father.appendChild(son);
      }
      pub.removebodyobject=function(id){
          var node=document.getElementById(id);
          document.body.removeChild(node);
      }
        //get element by ID
      pub.getEid=function(id){
                return document.getElementById(id);
        }
      pub.setbackcolor=function(node,color){
            node.style.backgroundColor=color;
      }
      pub.setcursor=function(node,cursor_type){
          node.style.cursor=cursor_type;
      }
      
      pub.setTxt=function(obj,color,fontsize,string){
            obj.style.color = color;
            obj.style.fontSize = fontsize;
            obj.innerHTML=string;
          
      }
       
      
  /***************************************************************/
//css style wrapper
//
//
  /*************************************************************/
  pub.setelementZindex=function(elementid,Z) {
    var element=document.getElementById(elementid);
    return element.style.zIndex=Z;
  }
  pub.setelementleft=function(elementid,left) {
    var element=document.getElementById(elementid);
    return element.style.left=left;
  }
  pub.setelementtop=function(elementid,top) {
    var element=document.getElementById(elementid);
    return element.style.top=top;
  }
  pub.setelementwidth=function(elementid,width) {
    var element=document.getElementById(elementid);
    return element.style.width=width;
  }
  pub.setelementheight=function(elementid,height) {
    var element=document.getElementById(elementid);
    return element.style.height=height;
  }
  pub.setelementposition=function(elementid,absorrel) {
    var element=document.getElementById(elementid);
    return element.style.position=absorrel;
  }
    
  /**********initiate************************************/
  pub.setup = function() {
        x = 101;
        y = 94;
        width = 200;
        height = 200;
        edge = 10;
        frame_size={w:160,h:160};
        left_top={x:120,y:120};
        
        can = document.getElementById("emulator") ;
        ctx = can.getContext("2d");

        draw_watch_frame(ctx, 200, 200, width, height, edge);

        draw_inner_frame(ctx, 200, 200, 160, 160);
        //create();
    };
    return pub;
}());

$(document).ready(emulator.setup);
