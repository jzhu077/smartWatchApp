// test case require network connection
// otherwise, google's api doesnot work at all
//

function calcDistance(p1, p2) {
      
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  };


    
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
                    if(parseFloat(calcDistance(src,dst)) <= parseFloat(radius/1000)){
                       
                        display[count]= ac[i];
                        count +=1;
                    }
                }
                break;
            case "pu" :
                for ( i = 0; i<pu.length; i+=1) {

                    dst = new google.maps.LatLng(parseFloat(pu[i].location.lat),parseFloat(ac[i].location.long));
                    if(parseFloat(calcDistance(src,dst)) <= parseFloat(radius/1000)){

                        display[count]= pu[i];
                        count +=1;
                    }


                }
                break;
            case "en" :
                for ( i = 0; i<en.length; i+=1) {
                    dst = new google.maps.LatLng(parseFloat(en[i].location.lat),parseFloat(en[i].location.long));
                    if(parseFloat(calcDistance(src,dst)) <= parseFloat(radius/1000)){
                        display[count]= en[i];
                        count +=1;
                    }
                }
                break;
        }
        
        return display;
    };


var can=document.getElementById("emulator");
var ctx= can.getContext("2d");

function addmousedownlistener(funct){
    can.addEventListener("mousedown", funct, false);
}

function addmouseuplistener(funct){

    can.addEventListener("mouseup", funct, false);
}
function addmousemovelistener(funct){
          can.addEventListener("mousemove", funct, false);
}

function create(node,class_id,id){
        var new_node=document.createElement(node);
        new_node.setAttribute('id',id);
        new_node.setAttribute('class',class_id);
        return new_node;
    }

    //get element by ID
function getEid(id){
            return document.getElementById(id);
    }

function appendtobody(node){
          return document.body.appendChild(node);
      }

function removebodyobject(id){
          var node=document.getElementById(id);
          document.body.removeChild(node);
      }
      
  /***************************************************************/
//css style wrapper
//
//
  /*************************************************************/
  function setelementZindex(elementid,Z) {
    var element=document.getElementById(elementid);
    element.style.zIndex=Z;
  }
  function setelementleft(elementid,left) {
    var element=document.getElementById(elementid);
    element.style.left=left;
  }
  function setelementtop(elementid,top) {
    var element=document.getElementById(elementid);
    element.style.top=top;
  }
  function setelementwidth(elementid,width) {
    var element=document.getElementById(elementid);
    element.style.width=width;
  }
  function setelementheight(elementid,height) {
    var element=document.getElementById(elementid);
    element.style.height=height;
  }
  function setelementposition(elementid,absorrel) {
    var element=document.getElementById(elementid);
    element.style.position=absorrel;
  }
