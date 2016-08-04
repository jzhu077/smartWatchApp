

//Main function of travel app
var app = (function () {
    "use strict";
    var keyword="";
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
            color: "#FFFFFF",           
        };
        emulator.draw(menu.x + 7,menu.y+8, menu.width - 15, menu.height/4, menu.color); 
        emulator.draw(menu.x + 7,menu.y*1.7,menu.width - 15, menu.height/4, menu.color); 
        emulator.draw(menu.x + 7,menu.y*2.3,menu.width - 15, menu.height/4, menu.color);  
              
        emulator.write(menu.x + 7,menu.y+40,menu.message1); 
        emulator.write(menu.x + 7,menu.y*2,menu.message2);
        emulator.write(menu.x + 7,menu.y*2.6,menu.message3); 
        //emulator.addmousedown(emulator.can);
        //secondPage();
        pageNum=1;
        hastouchcoordinates();
    }
    function somousedown(event){

        emulator.doMouseDown(event);
        
        hastouchcoordinates(); 
    }

    pub.hastouchcoordinates = function(){
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
            }
            //console.log(keyword);
            //console.log(radius);
            emulator.clearScreen();
            secondPage();
        }
        
    }
   
    //The second page shows the radius.
    function secondPage(){
        var coordinates = emulator.coordinatesofEmulator(); 
        var rad = {            
            x:coordinates.x,
            y:coordinates.y,
            width:emulator.width(),
            height:emulator.height(),             
            message1: "1km",
            message2: "5km",            
            message3: "20km",
            color: "#FFFFFF"            
        };       
        
        emulator.draw(rad.x + 7,rad.y+8, rad.width - 15, rad.height/4, rad.color); 
        emulator.draw(rad.x + 7,rad.y*1.7,rad.width - 15, rad.height/4, rad.color); 
        emulator.draw(rad.x + 7,rad.y*2.3,rad.width - 15, rad.height/4, rad.color);  
              
        emulator.write(rad.x + 7,rad.y+40,rad.message1); 
        emulator.write(rad.x + 7,rad.y*2,rad.message2);
        emulator.write(rad.x + 7,rad.y*2.6,rad.message3);       
        secondOptions();
    }

    //Retrieve local storage data and use them to collect the relative information from
    //data base.
    function secondOptions() {
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
        return display;
    };

    pub.setup = function () {
        start();        

    };
    return pub;
}());

$(document).ready(app.setup);



