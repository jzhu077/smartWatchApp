

//Main function of travel app
var app = (function () {
    "use strict";
    var keyword="";

    var radius;
    
    var pub = {};
    
    var display = [];
    
    var canX=0;
    var canY=0;
    var mouseIsDown=0;
    var Swipe_Down= 0;
    var Swipe_Left= 0;
    var Swipe_Up= 0;
    var Swipe_Right=0; 
    var lastMouseDown = {x: null, y: null};// mouse position when click
    var pageNum;   
    
    // start the app with three main category selections.
    //layout1 : the first button on left top, the following in horizontal center
    // the emulator specifies the x and y position.
    function start() {
        pageNum=0;
        
        StartPage();       
        emulator.addmousedownlistener(mousedown);
        emulator.addmouseuplistener(mouseup);
        emulator.addmousemovelistener(mouseXY);
 
    
    }
    function mousedown(event){
     
        lastMouseDown.x = event.clientX;
        lastMouseDown.y = event.clientY;
        mouseIsDown = 1;        
        Swipe_Down= 0;
        Swipe_Left= 0;
        Swipe_Up= 0;
        Swipe_Right=0;  
     
        
    }
    function mouseup(event){
        var coordinates={x: event.clientX,
                y:event.clientY};

        if(Swipe_Left){   
            exit_menu();
        }
        else if(Swipe_Up || Swipe_Down)
            update_thirdPage(Swipe_Down,Swipe_Up);
        else{
            hastouchcoordinates(coordinates);            
            }
        Swipe_Left=0;
        Swipe_Up=0;
        Swipe_Down=0;
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

    function exit_menu(){
            if(pageNum==1)
                app.setup();
            else if(pageNum==2)
                firstPage();
            else if(pageNum==3)
                secondPage();
            else if(pageNum==4){
                thirdPage(display,parseInt(localStorage.getItem("result_index")));
            }
    }
    

function hastouchcoordinates (touchcoordinates){
        
        var coordinates = emulator.coordinatesofEmulator(); 
        var width = emulator.width()-80;
        var height = emulator.height()/6;
             
        if(pageNum==0){
            if(touchcoordinates.y < height+90+coordinates.y &&
              touchcoordinates.y>=90+coordinates.y
              && touchcoordinates.x> coordinates.x+40
              && touchcoordinates.x< coordinates.x+width)
            firstPage();
        }
        else if(pageNum==1){
            if(touchcoordinates.y <=50+ height+coordinates.y
              && touchcoordinates.y>= 50+coordinates.y
              && touchcoordinates.x> coordinates.x+40
              && touchcoordinates.x< coordinates.x+width){
            keyword="ac";    
            secondPage();       
            }
            else if(touchcoordinates.y <=90+height+coordinates.y
                   && touchcoordinates.y>=90+coordinates.y
              && touchcoordinates.x> coordinates.x+40
              && touchcoordinates.x< coordinates.x+width){
            keyword="pu"    
            secondPage();
            }
            else if(touchcoordinates.y <= 130+height+coordinates.y
                   && touchcoordinates.y>= 130+coordinates.y
              && touchcoordinates.x> coordinates.x+40
              && touchcoordinates.x< coordinates.x+width){
            keyword="en"
            secondPage();
            }
        }
        else if(pageNum==2){
            if(touchcoordinates.y <=50+ height+coordinates.y
              && touchcoordinates.y>= 50+coordinates.y
              && touchcoordinates.x> coordinates.x+40
              && touchcoordinates.x< coordinates.x+width){          
            radius=1000;
            thirdPage(secondOptions(),0);       
            }
            else if(touchcoordinates.y <=90+height+coordinates.y
                   && touchcoordinates.y>=90+coordinates.y
              && touchcoordinates.x> coordinates.x+40
              && touchcoordinates.x< coordinates.x+width){
            radius=5000;
            thirdPage(secondOptions(),0);
            }
            else if(touchcoordinates.y <= 130+height+coordinates.y
                   && touchcoordinates.y>= 130+coordinates.y
              && touchcoordinates.x> coordinates.x+40
              && touchcoordinates.x< coordinates.x+width){
            radius=20000;
            thirdPage(secondOptions(),0);
            }
        }
        else if(pageNum==3){
            var i=parseInt(localStorage.getItem("result_index"));
            
            forthPage(display,i);    
        }    
    }
    

        //The second page shows the radius.
function StartPage(){
        pageNum=0;
        var coordinates = emulator.coordinatesofEmulator(); 
        var menu = {            
            x:coordinates.x,
            y:coordinates.y,
            width:emulator.width(),
            height:emulator.height(),             
            message: "Travel App",
            color: "#FFFFFF"            
        };       
        emulator.clearScreen();
        emulator.draw(menu.x + 40,menu.y+90, menu.width - 80, menu.height/6, menu.color); 
        emulator.write(menu.x + 40,menu.y+110,menu.message);   
        
    }
     //The second page shows the radius.
    function firstPage(){
            pageNum=1;
            
           var coordinates = emulator.coordinatesofEmulator(); 
        var menu = {
            x:coordinates.x,
            y:coordinates.y,
            width:emulator.width(),
            height:emulator.height(),            
            message1: "Accommodation",
            message2: "Public",
            message3: "Entertainment",
            color: "#FFFFFF"
        };
        emulator.clearScreen();
        emulator.draw(menu.x + 40,menu.y+50, menu.width - 80, menu.height/6, menu.color); 
        emulator.draw(menu.x + 40,menu.y+90,menu.width - 80, menu.height/6, menu.color); 
        emulator.draw(menu.x + 40,menu.y+130,menu.width - 80, menu.height/6, menu.color);  
        emulator.write(menu.x + 40,menu.y+70,menu.message1); 
        emulator.write(menu.x + 40,menu.y+110,menu.message2);
        emulator.write(menu.x + 40,menu.y+150,menu.message3);  
    }   
    //The second page shows the radius.
    function secondPage(){
        pageNum=2;
        var coordinates = emulator.coordinatesofEmulator(); 
        var menu = {            
            x:coordinates.x,
            y:coordinates.y,
            width:emulator.width(),
            height:emulator.height(),
            message1: "1km",
            message2: "5km",
            message3: "20km",
            color: "#FFFFFF"            
        };       
        emulator.clearScreen();
        emulator.draw(menu.x + 40,menu.y+50, menu.width - 80, menu.height/6, menu.color); 
        emulator.draw(menu.x + 40,menu.y+90,menu.width - 80, menu.height/6, menu.color); 
        emulator.draw(menu.x + 40,menu.y+130,menu.width - 80, menu.height/6, menu.color);  
        emulator.write(menu.x + 40,menu.y+70,menu.message1); 
        emulator.write(menu.x + 40,menu.y+110,menu.message2);
        emulator.write(menu.x + 40,menu.y+150,menu.message3);          
    }

    function thirdPage(data,i){
        pageNum=3;
        i=parseInt(i);
        var coordinates = emulator.coordinatesofEmulator(); 
        var menu = {            
            x:coordinates.x,
            y:coordinates.y,
            width:emulator.width(),
            height:emulator.height(),             
            message: data[i].name,
            color: "#FFFFFF"            
        };       
        emulator.clearScreen();
        emulator.draw(menu.x + 40,menu.y+90, menu.width - 80, menu.height/6, menu.color); 
        emulator.write(menu.x + 40,menu.y+110,menu.message);    
        
        //emulator.localsave("result_index",i);
        localStorage.setItem("result_index",i);
    }
    
    function update_thirdPage(Down,Up){
        var i=parseInt(localStorage.getItem("result_index"));
        if(pageNum==3){
            if(Up && i>0){
                thirdPage(display,i-1);
            }
        
            if(Down && i< display.length -1){
                thirdPage(display,i+1);
            }
        }
    }
    
    function forthPage(data,i){
        pageNum=4;
        var coordinates = emulator.coordinatesofEmulator(); 
        var menu = {            
            x:coordinates.x,
            y:coordinates.y,
            width:emulator.width(),
            height:emulator.height(),
            message1: data[i].name,
            message2: data[i].address[0],
            message3:"",
            color: "#FFFFFF"            
        }; 
        for(i=1;i<data[i].address.length;i++)
            menu.message3+=data[i].address[i];
        
        emulator.clearScreen();
        emulator.draw(menu.x + 40,menu.y+50, menu.width - 80, menu.height/6, menu.color); 
        emulator.draw(menu.x + 40,menu.y+90,menu.width - 80, menu.height/6, menu.color); 
        emulator.draw(menu.x + 40,menu.y+130,menu.width - 80, menu.height/6, menu.color);  
        emulator.write(menu.x + 40,menu.y+70,menu.message1); 
        emulator.write(menu.x + 40,menu.y+110,menu.message2);
        emulator.write(menu.x + 40,menu.y+150,menu.message3);              
    }
    
    //Retrieve local storage data and use them to collect the relative information from
    //data base.
    function secondOptions() {

        var match = keyword;
         display = []
        var count = 0;
        var dst;
        var src = new google.maps.LatLng(-45.866815599999995,170.5178656);
        var i;
        switch(match){
            case "ac" :
                for ( i = 0; i<ac.length; i+=1) {
                    dst = new google.maps.LatLng(parseFloat(ac[i].location.lat),parseFloat(ac[i].location.long));
                    if(parseFloat(emulator.calcDistance(src,dst)) <= parseFloat(radius/1000)){
                       
                        display[count]= ac[i];
                        count +=1;
                    }
                }
                break;
            case "pu" :
                for ( i = 0; i<pu.length; i+=1) {

                    dst = new google.maps.LatLng(parseFloat(pu[i].location.lat),parseFloat(ac[i].location.long));
                    if(parseFloat(emulator.calcDistance(src,dst)) <= parseFloat(radius/1000)){

                        display[count]= pu[i];
                        count +=1;
                    }


                }
                break;
            case "en" :
                for ( i = 0; i<en.length; i+=1) {
                    dst = new google.maps.LatLng(parseFloat(en[i].location.lat),parseFloat(en[i].location.long));
                    if(parseFloat(emulator.calcDistance(src,dst)) <= parseFloat(radius/1000)){
                        display[count]= en[i];
                        count +=1;
                    }
                }
                break;
        }
        
        return display;
    };

    pub.setup = function () {
        start();

    };
    return pub;
}());

$(document).ready(app.setup);


