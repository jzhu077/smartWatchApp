/**
 * Purpose of this script is to load xml properly.
 *
 * Ana Baltazar May 20 2016
 * 
 */

var database = (function () {

    "use strict";

    //Public interface

    var pub = {};

    function savedata(xmlDoc){
    
    $(xmlDoc).find("Locations").find("Location")[0].appendChild("hi");
    
     $(xmlDoc).find("Locations").each (function (){
            console.log($(this).find("Location").text());   
            
        });
    }

   
    pub.saveDB = function(opt){
        var  url;
        
        url = "xml/database.xml";
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            error: function (){
                alert("Ajax error!");
            },
            success: function(url){
                savedata(url);
            }
        });    
    };

    
    /**
     * Setup function
     */

    pub.setup = function (){
       
    };
    //expose public interface
    return pub;

}() );

$(document).ready(database.setup);

