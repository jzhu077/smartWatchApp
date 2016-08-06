

//Main function of travel app
var app = (function () {
    "use strict";
    var keyword="";
<<<<<<< HEAD
    var radius;
    
    var pub = {};
    
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

        console.log(Swipe_Left);
        if(Swipe_Left){
            
            exit_menu();
        
        }
        
           hastouchcoordinates(coordinates);            
   
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
        
    }
    

    function hastouchcoordinates (touchcoordinates){
        
        var coordinates = emulator.coordinatesofEmulator(); 
        var width = emulator.width()-80;
        var height = emulator.height()/6;
             
        if(pageNum==0){
            if(touchcoordinates.y < height+90+coordinates.y &&
              touchcoordinates.y>=90+coordinates.y)
            firstPage();
        }
        else if(pageNum==1){
            if(touchcoordinates.y <=50+ height+coordinates.y
              && touchcoordinates.y>= 50+coordinates.y){
            keyword="ac";    
            secondPage();       
            }
            else if(touchcoordinates.y <=90+height+coordinates.y>= 130+coordinates.y
                   && touchcoordinates.y>=90+coordinates.y){
            keyword="pu"    
            secondPage();
            }
            else if(touchcoordinates.y <= 130+height+coordinates.y
                   && touchcoordinates.y>= 130+coordinates.y){
            keyword="en"
            secondPage();
            }
        }
        else if(pageNum==2){
            if(touchcoordinates.y <=50+ height+coordinates.y
              && touchcoordinates.y>= 50+coordinates.y){          
            radius=1000;
            showData(secondOptions());       
            }
            else if(touchcoordinates.y <=90+height+coordinates.y>= 130+coordinates.y
                   && touchcoordinates.y>=90+coordinates.y){
            radius=5000;
            showData(secondOptions());
            }
            else if(touchcoordinates.y <= 130+height+coordinates.y
                   && touchcoordinates.y>= 130+coordinates.y){
            radius=20000;
            showData(secondOptions());
=======
    var radius="";

    var pub = {};

    //To start the app with three main category selections.
    //layout1 : the first button on left top, the following in horizontal center
    // the emulator specifies the x and y position.
    function start() {
        var pageNum;
        var coordinates = emulator.coordinatesofEmulator();
        var menu = {
            x:coordinates.x,
            y:coordinates.y,
            width:emulator.width(),
            height:emulator.height(),
            message1: "Accommodation",
            message2: "Entertainment",
            message3: "Public",
            color: "#FFFFFF"
        };
        emulator.draw(menu.x + 7,menu.y+8, menu.width - 15, menu.height/4, menu.color);
        emulator.draw(menu.x + 7,menu.y*1.7,menu.width - 15, menu.height/4, menu.color);
        emulator.draw(menu.x + 7,menu.y*2.3,menu.width - 15, menu.height/4, menu.color);

        emulator.write(menu.x + 7,menu.y+40,menu.message1);
        emulator.write(menu.x + 7,menu.y*2,menu.message2);
        emulator.write(menu.x + 7,menu.y*2.6,menu.message3);
        if(emulator.getXY() != null) {
            hastouchcoordinates();
        }

        //secondPage();
        pageNum=1;
    }

    function hastouchcoordinates () {
        var coordinates = emulator.coordinatesofEmulator();
        var width = emulator.width()-15;
        var height = emulator.height()/4;
        if (pageNum===1){
            if(emulator.touchcoordinates.y <= (height+coordinates.y)-20){
                console.log("1 Accommodation was clicked");
                if(keyword != ""){
                    radius = "1km";
                }else{
                    keyword = "ac";
                }
                //secondPage();
            }
            else if(emulator.touchcoordinates.y <= (height+coordinates.y*2) -20){

                console.log("2 Entertainment was clicked");
                if(keyword != ""){
                    radius = "5km";
                }else{
                    keyword = "en";
                }
                //secondPage();
            }
            else if(emulator.touchcoordinates.y <= (height+coordinates.y*2.6) -20){

                console.log("3 Public was clicked");
                if(keyword != ""){
                    radius = "20km";
                    console.log(keyword);
                }else{
                    keyword = "pu";
                }
>>>>>>> origin/master
            }
        }
<<<<<<< HEAD
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
            message2: "Entertainment",
            message3: "Public",
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
=======

    }

    //The second page shows the radius.
    function secondPage(){
        var coordinates = emulator.coordinatesofEmulator();
        var rad = {
>>>>>>> origin/master
            x:coordinates.x,
            y:coordinates.y,
            width:emulator.width(),
            height:emulator.height(),
            message1: "1km",
            message2: "5km",
            message3: "20km",
<<<<<<< HEAD
            color: "#FFFFFF"            
        };       
        emulator.clearScreen();
        emulator.draw(menu.x + 40,menu.y+50, menu.width - 80, menu.height/6, menu.color); 
        emulator.draw(menu.x + 40,menu.y+90,menu.width - 80, menu.height/6, menu.color); 
        emulator.draw(menu.x + 40,menu.y+130,menu.width - 80, menu.height/6, menu.color);  
        emulator.write(menu.x + 40,menu.y+70,menu.message1); 
        emulator.write(menu.x + 40,menu.y+110,menu.message2);
        emulator.write(menu.x + 40,menu.y+150,menu.message3);   
        
        
        
=======
            color: "#FFFFFF"
        };

        emulator.draw(rad.x + 7,rad.y+8, rad.width - 15, rad.height/4, rad.color);
        emulator.draw(rad.x + 7,rad.y*1.7,rad.width - 15, rad.height/4, rad.color);
        emulator.draw(rad.x + 7,rad.y*2.3,rad.width - 15, rad.height/4, rad.color);

        emulator.write(rad.x + 7,rad.y+40,rad.message1);
        emulator.write(rad.x + 7,rad.y*2,rad.message2);
        emulator.write(rad.x + 7,rad.y*2.6,rad.message3);
        secondOptions();
>>>>>>> origin/master
    }

    function showData(data){
        
        
    }
    //Retrieve local storage data and use them to collect the relative information from
    //data base.
    function secondOptions() {
        pageNum=3;
        console.log(radius);
        console.log(keyword);
        //var keyword = localStorage.getItem("Menu1");
        //var radius = localStorage.getItem("Radius1");
        var match = keyword;
        var display = [];
        var count = 0;
        var dst;
        var src = new google.maps.LatLng(-45.866815599999995,170.5178656);
        var i;


        switch(match){
            case "ac" :
                for ( i = 0; i<ac.length; i+=1) {
                    dst = new google.maps.LatLng(parseFloat(ac[i].location.lat),parseFloat(ac[i].location.long));
                    if(parseFloat(emulator.calcDistance(src,dst)) <= parseFloat(radius/1000)){

                        display[count]= ac[i].name;
                        count +=1;
                    }
                }
                break;
            case "pu" :
                for ( i = 0; i<pu.length; i+=1) {

                    dst = new google.maps.LatLng(parseFloat(pu[i].location.lat),parseFloat(ac[i].location.long));
                    if(parseFloat(emulator.calcDistance(src,dst)) <= parseFloat(radius/1000)){

                        display[count]= pu[i].name;
                        count +=1;
                    }


                }
                break;
            case "en" :
                for ( i = 0; i<en.length; i+=1) {
                    dst = new google.maps.LatLng(parseFloat(en[i].location.lat),parseFloat(en[i].location.long));
                    if(parseFloat(emulator.calcDistance(src,dst)) <= parseFloat(radius/1000)){
                        display[count]= en[i].name;
                        count +=1;
                    }
                }
                break;
        }
        
        console.log(display);
        return display;
    };

    pub.setup = function () {
        start();

    };
    return pub;
}());

$(document).ready(app.setup);


