/**
 * Created by Junyu on 5/17/2016.
 */
var e2 = (function () {
        "use strict";
        var pub = {};
        pub.getClick = function(menu){
            $("#" + menu.b1).click( function () {
                localStorage.setItem("todoOpt", 111);
                alert("good" + menu.b1);
                travel.mainOptions();
            });
            $("#" + menu.b2).click( function () {
                localStorage.setItem("todoOpt", 111);
                alert("good" + menu.b2);
                travel.mainOptions();
            });
            $("#" + menu.b3).click ( function () {
                localStorage.setItem("todoOpt", 111);
                alert("good" + menu.b3);
                travel.mainOptions();
            });
        };

        pub.showStart = function(menu){
            $(".app").append("<ul class='firstMenu'>");
            $(".firstMenu").append("<li><button type='button' id ='" + menu.b1 + "'>" + menu.b1 + "</button></li>");
            $(".firstMenu").append("<li><button type='button' id ='" + menu.b2 + "'>" + menu.b2 + "</button></li>");
            $(".firstMenu").append("<li><button type='button' id ='" + menu.b3 + "'>" + menu.b3 + "</button></li>");
            $(".app").append("</ul>");
            e2.getClick(menu);
        };

        pub.showRadius = function(radius){
            $(".app").append("<ul class='radius'>");
            $(".radius").append("<li><button type='button' id ='" + radius.r1 + "'>" + radius.r1 + "</button></li>");
            $(".radius").append("<li><button type='button' id ='" + radius.r2 + "'>" + radius.r2 + "</button></li>");
            $(".radius").append("<li><button type='button' id ='" + radius.r3 + "'>" + radius.r3 + "</button></li>");
            $(".app").append("</ul>");
        }



        /**
         * On setup, the script will automatically create a text input within a span
         * Edit button is linked to the showInputBoxes function.
         */
        pub.setup = function () {

        };
        return pub;
    }
    ()
);
$(document).ready(e2.setup);