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
    function start() {
        var menu = {
            menuNum: 3,
            b1: "Accommodation",
            b2: "Entertainment",
            b3: "Public"
        };
        e2.showStart(menu);  //showStart will set doDo variable to be one of the options above
    }

    /**
     * Emulator calls mainOptions
     * @param int
     */

    pub.mainOptions = function () {
        $('.firstMenu').remove();
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
        console.log(typeof(keyword));
        console.log(typeof(radius));


        emulator.radar_search_info(keyword, radius);
        //console.log(emulator.radarservice_result[0]);

    };
    pub.setup = function () {
        start();
        storage();

    };
    return pub;
}());

$(document).ready(travel.setup);




