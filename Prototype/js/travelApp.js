/*
 Created by Junyu 
 Edited by Ana
 */


var travel = (function () {
    "use strict";
    var pub = {};

    /*
     function loadImage() {
     var html = "<a><img src='images/travel.jpg'/></a>";
     $(".app").append(html);
     }
     */
    //this is for a test, will be removed at the end of the project
    function storage() {
        if (typeof(Storage) !== "undefined") {
            // Store
            //localStorage.setItem("test", 225);
            // Retrieve
            $("#Test").append(localStorage.getItem("test"));
        } else {
            $("#Test").append("Sorry, your browser does not support Web Storage...");
        }

    }

    //To start the app
    pub.start = function() {
        var menu = {
            menuNum: 3,
            b1: "Accommodation",
            b2: "Entertainment",
            b3: "Public"
        };
        e2.showStart(menu);  //showStart will set doDo variable to be one of the options above
    };

    /**
     * Emulator calls mainOptions
     * @param int
     */

    pub.mainOptions = function () {
        
        var radius = {
            radiusNum: 3,
            r1: "1km",
            r2: "5km",
            r3: "20km"
        };
        e2.showRadius(radius);
    };


    pub.secondOptions = function () {
        var keyword = localStorage.getItem("Menu1");
        var radius = localStorage.getItem("Radius1");
        var match = keyword.substring(0,2).toLowerCase();
        var display = [];
        var count = 0;
        var dst;
        var src = new google.maps.LatLng(-45.866815599999995,170.5178656);

        switch(match){
            case "ac" :
                for (var i = 0; i<ac.length; i++) {
                    dst = new google.maps.LatLng(parseFloat(ac[i].split(";")[1].split(" ")[0]),parseFloat(ac[i].split(";")[1].split(" ")[1]));
                    if(parseFloat(calcDistance(src,dst)) <= parseFloat(radius/1000)){

                        display[count]= ac[i];
                        count ++;
                    }
                }
                break;
            case "pu" :
                for (var i = 0; i<pu.length; i++) {

                    dst = new google.maps.LatLng(parseFloat(pu[i].split(";")[1].split(" ")[0]),parseFloat(pu[i].split(";")[1].split(" ")[1]));
                    if(parseFloat(calcDistance(src,dst)) <= parseFloat(radius/1000)){

                        display[count]= pu[i];
                        count ++;
                    }
                    //console.log(dst);
                    //emulator.calculate_distance(src,dst);
                    //console.log(localStorage.getItem("distanceAB").replace(" km","") + " compare to " + parseFloat(radius/1000));

                }
                break;
            case "en" :
                for (var i = 0; i<en.length; i++) {
                    dst = new google.maps.LatLng(parseFloat(en[i].split(";")[1].split(" ")[0]),parseFloat(en[i].split(";")[1].split(" ")[1]));
                    if(parseFloat(calcDistance(src,dst)) <= parseFloat(radius/1000)){
                        display[count]= en[i];
                        count ++;
                    }
                }
                break;
        }
        return display;


        
        //emulator.radar_search_info(keyword, radius);     maybe later 
        //console.log(emulator.radarservice_result[0]);

    };
    function calcDistance(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }
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
        travel.start();
        storage();

    };
    return pub;
}());

$(document).ready(travel.setup);




