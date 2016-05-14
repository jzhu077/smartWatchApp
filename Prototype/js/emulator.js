


var travel = (function(){
    "use strict";
    var pub = {};
    
    function loadImage(){
        var html = "<a><img src='images/travel.jpg'/></a>";
        $(".app").append(html);
    }
    //this is for a test, will be removed at the end of the project
    function storage(){
        if (typeof(Storage) !== "undefined") {
            // Store
            //localStorage.setItem("test", 225);
            // Retrieve
            $("#Test").append(localStorage.getItem("test"));
        } else {
            $("#Test").append("Sorry, your browser does not support Web Storage...");
        }

    }
    
    /** Will get GPS location.
    * 
    */
    function getGPS(){
        var GPS = $(".pages").val();
        Cookie.set("GPS",GPS);
        console.log(Cookie.get("GPS"));
    }



    function setButtons(){
        
    }
    
    /** Uses the getGPS function to set a radius and show to user.*/
    function pickRadius(){
        
    }
    /** Will store restaurant locations, public toilets, museums etc. as
    * a built in feature for the user.
    */
    function builtinData(){
        
    }
    
    
    
    
    

    /**
     * On setup, the script will automatically create a text input within a span
     * Edit button is linked to the showInputBoxes function.
     */
    pub.setup = function() {
        storage();
        loadImage();
        getGPS();

    };
    return pub;
}());

$(document).ready(travel.setup);




