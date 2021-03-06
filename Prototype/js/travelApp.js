/*
 Created by Junyu 
 Edited by Ana
 */

//Main function of travel app
var travel = (function () {
    "use strict";
    var pub = {};
    
    //To start the app with three main category selections.
    //layout1 : the first button on left top, the following in horizontal center
    //
    pub.start = function() {
        var menu = {
            menuNum: 3,
            layout:"layout1", 
            lefttopb:"home",
            b1: "Accommodation",
            b2: "Entertainment",
            b3: "Public"
        };
        emulator.showStart(menu);  //showStart will set doDo variable to be one of the options above
    };


    //Pass radius options to the emulator to display.
    pub.mainOptions = function () {
        
        var radius = {
            radiusNum: 3,
            layout:"layout1",
            lefttopb:"back",
            r1: "1km",
            r2: "5km",
            r3: "20km"
            
        };
        emulator.showRadius(radius);
    };

    //Retrieve local storage data and use them to collect the relative information from
    //data base.
    pub.secondOptions = function () {
        var keyword = localStorage.getItem("Menu1");
        var radius = localStorage.getItem("Radius1");
        var match = keyword.substring(0,2).toLowerCase();
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
                    //console.log(dst);
                    //emulator.calculate_distance(src,dst);
                    //console.log(localStorage.getItem("distanceAB").replace(" km","") + " compare to " + parseFloat(radius/1000));

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


        
        //emulator.radar_search_info(keyword, radius);     maybe later 
        //console.log(emulator.radarservice_result[0]);

    };
    
    /*  we might use it later
    pub.storeDisplay =function(dis){
        var radius = localStorage.getItem("Radius1");
        display[count]=dis;
        count++;
        if(parseFloat(dis.replace(" km","")) <= parseFloat(radius/1000)){
            display[count]= pu[i];
            count ++;
        }
    };
    */
    pub.setup = function () {
        
                
        emulator.showAppIcon('button',"travel","Travel App");
        
        localStorage.setItem("Home component","button");
        localStorage.setItem("app id","travel");
        localStorage.setItem("app name","Travel App");
        
    };
    return pub;
}());

$(document).ready(travel.setup);




