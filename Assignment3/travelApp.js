

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
    var rad=80;
    var clock_run;
    // start the app with three main category selections.
    //layout1 : the first button on left top, the following in horizontal center
    // the emulator specifies the x and y position.

    // show the first screen 
    //register mouse event method
    function start() {
        pageNum=0;

        StartPage();      

    }

        /*****************event listener*******************/
    //define mousedown functions
    //init Swipe ,record the position of mousedown
    function mousedown(event){

        lastMouseDown.x = event.clientX;
        lastMouseDown.y = event.clientY;
        mouseIsDown = 1;        
        Swipe_Down= 0;
        Swipe_Left= 0;
        Swipe_Up= 0;
        Swipe_Right=0;  


    }
    //mouse up function
    //define operations on mouse event
    //Swipe left:exit current menu
    //Swipe Right: enter analog clock if the current page is start page
    //Swipe up or down: alter shown data if it is on page 3
    //Click: go to the next page
    //reset Swipe flag
    function mouseup(event){
        var coordinates={x: event.clientX,
                y:event.clientY};

        if(Swipe_Left){   
            exit_menu();
        }
        else if(Swipe_Right && pageNum==0){
            showClock();
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

    //mouse move event 
    //judge swipe event
    //
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


    /********************menu changes operation*************************/
    //exit menu: 
    //    page4->page3->page2->page1
    //    page99->page1
    //    the order is reversed to the sequence of entering a new menu
    //    page99 is special as it contains a analog clock that translate coordinates
    //    and the clock is always running. So stop it firstly and recover states.   
    function exit_menu(){
            if(pageNum==1)
                start();
            else if(pageNum==2)
                firstPage();
            else if(pageNum==3)
                secondPage();
            else if(pageNum==4){
                thirdPage(display,parseInt(localStorage.getItem("result_index")));
                }
            else if(pageNum==99){
                clearInterval(clock_run);
                emulator.recoverstate();
                start();
                }
            }


    // has touchcoordinates:
    //click event handler: based on the current pages,decide the next page and data collected from ui
    //
    //

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

    /************************show menu*************************************/
    //The start page
    function StartPage(){
            pageNum=0;
            var coordinates = emulator.coordinatesofEmulator(); 
            var menu = {            
                x:coordinates.x,
                y:coordinates.y,
                width:emulator.width(),
                height:emulator.height(),             
                message: "Travel App",
                color: "black"            
            };       
            emulator.clearScreen();
            emulator.draw(menu.x + 40,menu.y+90, menu.width - 80, menu.height/6, menu.color); 
            emulator.write(menu.x + 40,menu.y+110,menu.message);   

        }
     //The first page
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
            color: "black"
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
            color: "black"            
        };       
        emulator.clearScreen();
        emulator.draw(menu.x + 40,menu.y+50, menu.width - 80, menu.height/6, menu.color); 
        emulator.draw(menu.x + 40,menu.y+90,menu.width - 80, menu.height/6, menu.color); 
        emulator.draw(menu.x + 40,menu.y+130,menu.width - 80, menu.height/6, menu.color);  
        emulator.write(menu.x + 40,menu.y+70,menu.message1); 
        emulator.write(menu.x + 40,menu.y+110,menu.message2);
        emulator.write(menu.x + 40,menu.y+150,menu.message3);          
    }

    //the third page
    //in third page:there are a list of objects, but only one of them , with index i, is shown here
    // save the index of current objects in display
    //
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
            color: "black"            
        };       
        emulator.clearScreen();
        emulator.draw(menu.x + 40,menu.y+90, menu.width - 80, menu.height/6, menu.color); 
        emulator.write(menu.x + 40,menu.y+110,menu.message);    

        localStorage.setItem("result_index",i);
    }

    // the third page
    // if some one swipe up or down, the data on third page should be updated
    // swipe up: show the previous item
    // swipe down:show the next item
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
    //forthPage:
    //show the detail of a specific item
    // name and address
    //specify a limited length in case of the length of string exceed the length of txt box
    // the message format is still unsolved  
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
            color: "black"            
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

    /**draw analog clock on the canvas**/
    //draw face:draw face of the clock: two circle
    function drawFace(radius){
        emulator.drawcircle(0,0, radius,'white');
        emulator.drawcircle(0,0, 0.1*radius,'black');
    }
    function drawTime(radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    emulator.drawline(hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    emulator.drawline(minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    emulator.drawline(second, radius*0.9, radius*0.02);
    }

    //draw number around the center of the clock
    //
    //
    function drawNumbers(radius) {
      var ang;
      var num;
      var string={
           font : (radius*0.15).toString() + "px arial",
           baseline:"middle",
           position:"center",
           data:"",
           style:'black',
            maxwidth:120
      };          

    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        string.data=num.toString();
        emulator.rotateangle(ang);
        emulator.transposition(0, -radius*0.85);
        emulator.rotateangle(-ang);
        emulator.fillTxt(string,0,0)
        emulator.rotateangle(ang);
        emulator.transposition(0, radius*0.85);
        emulator.rotateangle(-ang);
        }
    }

    //showClock:
    // run clock every 1 second
    //
    function showClock(){
    pageNum=99;
    emulator.clearScreen();
    emulator.savestate();
    emulator.transposition(emulator.width(), emulator.height());
    rad = rad * 0.90;
    //var clo=setInterval(drawClock(), 1000);
    clock_run=setInterval(function () {
          drawFace(rad);
          drawNumbers(rad);
          drawTime(rad);},1000);
    }

    /********************datea base********************************/
    
    //Retrieve local storage data and use them to collect the relative information from
    //data base. and saved in display
    //
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

    /**********initiate********************/
    pub.setup = function () { 
        emulator.addmousedownlistener(mousedown);
        emulator.addmouseuplistener(mouseup);
        emulator.addmousemovelistener(mouseXY);
        console.log("ddddd");
        var map=emulator.create("div","googlemap");
        
        var name=emulator.getEid("googlemap");
        console.log(map);
        
        start();

    };
    return pub;
}());

$(document).ready(app.setup);


