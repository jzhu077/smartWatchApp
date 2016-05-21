/**
 * Created by Junyu on 5/17/2016.
 * edited on 5/20/2016
 */
var e2 = (function () {
    "use strict";
    var pub = {};

    //get user input for the radius and save the value to local
    pub.getRadClick = function (rad) {
        console.log(rad);
        $("#" + rad.r1).click(function () {
            localStorage.setItem("Radius1", 1000);
            alert("good" + rad.r1);
            travel.secondOptions(1);
        });
        $("#" + rad.r2).click(function () {
            localStorage.setItem("Radius1", 5000);
            alert("good" + rad.r2);
            travel.secondOptions(2);
        });
        $("#" + rad.r3).click(function () {
            localStorage.setItem("Radius1", 10000);
            alert("good" + rad.r3);
            travel.secondOptions(3);
        });
    };


    pub.getMenuClick = function (menu) {
        console.log(menu);
        $("#" + menu.b1).click(function () {
            localStorage.setItem("Menu1", menu.b1);
            alert("good" + menu.b1);
            travel.mainOptions();
        });
        $("#" + menu.b2).click(function () {
            localStorage.setItem("Menu1", menu.b2);
            alert("good" + menu.b2);
            travel.mainOptions();
        });
        $("#" + menu.b3).click(function () {
            localStorage.setItem("Menu1", menu.b3);
            alert("good" + menu.b3);
            travel.mainOptions();
        });
    };

    //Appending tags to show starting menu
    pub.showStart = function (menu) {
        $(".app").append("<ul class='firstMenu'>");
        $(".firstMenu").append("<li><button type='button' id ='" + menu.b1 + "'>" + menu.b1 + "</button></li>");
        $(".firstMenu").append("<li><button type='button' id ='" + menu.b2 + "'>" + menu.b2 + "</button></li>");
        $(".firstMenu").append("<li><button type='button' id ='" + menu.b3 + "'>" + menu.b3 + "</button></li>");
        $(".app").append("</ul>");
        e2.getMenuClick(menu);
    };

    //Appending tags to show radius seletion menu
    pub.showRadius = function (radius) {
        $(".app").append("<ul class='radius'>");
        $(".radius").append("<li><button type='button' id ='" + radius.r1 + "'>" + radius.r1 + "</button></li>");
        $(".radius").append("<li><button type='button' id ='" + radius.r2 + "'>" + radius.r2 + "</button></li>");
        $(".radius").append("<li><button type='button' id ='" + radius.r3 + "'>" + radius.r3 + "</button></li>");
        $(".app").append("</ul>");
        e2.getRadClick(radius);
    };


    /**
     * On setup, the script will automatically create a text input within a span
     * Edit button is linked to the showInputBoxes function.
     */
    pub.setup = function () {

    };
    return pub;
}());
$(document).ready(e2.setup);