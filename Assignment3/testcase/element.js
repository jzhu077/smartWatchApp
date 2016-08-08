
//test trans coordinate event 
//

function testzindex(a){
    setelementZindex("googleMap",a);

    var ele=document.getElementById('googleMap');
    return ele.style.zIndex==a;
}

function testwidth(a){
    setelementwidth("googleMap",a);
    var ele=document.getElementById('googleMap');
    return ele.style.width==(a.toString()+"px");
}

function testheight(a){
    setelementheight("googleMap",a);
    var ele=document.getElementById('googleMap');
    return ele.style.height==(a.toString()+"px");
}

function testleft(a){
    setelementleft("googleMap",a);
    var ele=document.getElementById('googleMap');
    return ele.style.left==(a.toString()+"px");
}

function testtop(a){
    setelementtop("googleMap",a);
    var ele=document.getElementById('googleMap');
    return ele.style.top==(a.toString()+"px");
}

function testposition(a){
    setelementposition("googleMap",a);
    var ele=document.getElementById('googleMap');
    return ele.style.position==a;
}


function test_create_appendtobody(string){
    var node=create('div','',string);
    return appendtobody(node);
}

function test_removebodyobject(string){
    
    removebodyobject(string);
    if(document.getElementById(string))
        return false;
    else return true;
}
QUnit.test("create element googlemap and append to document body", function( assert ) {
		assert.ok(test_create_appendtobody('googlemap'));
	});

QUnit.test("create element demo1 and append to document body", function( assert ) {
		assert.ok(test_create_appendtobody('demo1'));
	});


QUnit.test("destroy document body object demo1", function( assert ) {
		assert.ok(test_removebodyobject("demo1"));
	});

QUnit.test("destroy document body object googlemap", function( assert ) {
		assert.ok(test_removebodyobject("googlemap"));
	});

QUnit.test("getelementbyID of googleMap", function( assert ) {
		assert.ok(getEid('googleMap'));
	});

QUnit.test("set Z index 100  of element googleMap", function( assert ) {
		assert.ok(testzindex(100));
	});


QUnit.test("set height 100 of element googleMap", function( assert ) {
		assert.ok(testheight(100));
	});

QUnit.test("set left of 100 element googleMap", function( assert ) {
		assert.ok(testleft(100));
	});

QUnit.test("set top of 100  element googleMap", function( assert ) {
		assert.ok(testtop(100));
	});

QUnit.test("set width 100 of element googleMap", function( assert ) {
		assert.ok(testwidth(100));
	});
QUnit.test("set Z index 200 of element googleMap", function( assert ) {
		assert.ok(testzindex(200));
	});


QUnit.test("set height 200 of element googleMap", function( assert ) {
		assert.ok(testheight(200));
	});

QUnit.test("set left of 200 element googleMap", function( assert ) {
		assert.ok(testleft(200));
	});

QUnit.test("set top of 200 element googleMap", function( assert ) {
		assert.ok(testtop(200));
	});

QUnit.test("set width of 200 element googleMap", function( assert ) {
		assert.ok(testwidth(200));
	});


QUnit.test("set absolute position of element googleMap", function( assert ) {
		assert.ok(testposition("absolute"));
	});

QUnit.test("set relative position of element googleMap", function( assert ) {
		assert.ok(testposition("relative"));
	});


