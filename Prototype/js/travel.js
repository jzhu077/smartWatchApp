var travel = (function () {
    "use strict";
    var pub = {};

    function loadImage() {
        var html = "<a><img src='images/travel.jpg'/></a>";
        $(".app").append(html);
    }

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


    function start() {
        var menu = {
            menuNum: 3,
            b1: "Accommodation",
            b2: "Entertainment",
            b3: "Public Facilities"
        };
        showStart(menu);  //showStart will set doDo variable to be one of the options above
    }

    /**
     * Emulator calls mainOptions
     * @param int
     */

    function mainOptions()
    {
        var radius = {
            radiusNum: 3,
            r1: "< 1 km",
            r2: "1 - 5 km",
            r3: "> 5 km"
        };
        showRadius(radius);
    }



function secondOptions(var opt)
{
    var toDo = localStorage.getItem("toDo");

    var search = (function search() {


    }());
    if (opt == 1) {
        var x = {
            radius: search(),

    }
    ;
}
else
if (opt == 2) {

} else if (opt == 3) {
}
}


/**
 * On setup, the script will automatically create a text input within a span
 * Edit button is linked to the showInputBoxes function.
 */
pub.setup = function () {
    storage();
    loadImage();
    getGPS();

};
return pub;
}
()
)
;

$(document).ready(travel.setup);




