
//test mouse event 
//
//

function mousedown(event){
 return true;   
}
function mouseup(event){
 return true;
}    
function mouseXY(event){
    return true;
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
addmousedownlistener(mousedown);
//addmousemovelistener(mouseXY);
addmouseuplistener(mouseup);
eventFire(document.getElementById('emulator'), 'click');

QUnit.test("mousedown event trigger", function( assert ) {
		assert.ok(mousedown());
	});

QUnit.test("mouseup event trigger", function( assert ) {
		assert.ok(mouseup());
	});
/*

QUnit.test("mousemove", function( assert ) {
		assert.ok(mouseXY());
	});
*/
