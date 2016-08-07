
//test trans coordinate event 
//

QUnit.test("create element", function( assert ) {
		assert.ok(create('div','map','googlemap'));
	});

QUnit.test("getelementbyID", function( assert ) {
		assert.ok(getEid('googlemap'));
	});


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

QUnit.test("set Z index of element", function( assert ) {
		assert.ok(testzindex(100));
	});


QUnit.test("set height of element", function( assert ) {
		assert.ok(testheight(100));
	});

QUnit.test("set left of element", function( assert ) {
		assert.ok(testleft(100));
	});

QUnit.test("set top of element", function( assert ) {
		assert.ok(testtop(100));
	});

QUnit.test("set width of element", function( assert ) {
		assert.ok(testwidth(100));
	});

QUnit.test("set relative/absolute position of element", function( assert ) {
		assert.ok(testposition("relative"));
	});



