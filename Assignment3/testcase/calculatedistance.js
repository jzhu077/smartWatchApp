//calculate distance
var src=new google.maps.LatLng(parseFloat(ac[0].location.lat),parseFloat(ac[0].location.long));
var dst=new google.maps.LatLng(parseFloat(ac[1].location.lat),parseFloat(ac[1].location.long));
QUnit.test("calculate distance accomodation data", function( assert ) {
		assert.ok(calcDistance( src,dst));
	});
var src=new google.maps.LatLng(parseFloat(pu[0].location.lat),parseFloat(pu[0].location.long));
var dst=new google.maps.LatLng(parseFloat(pu[1].location.lat),parseFloat(pu[1].location.long));
QUnit.test("calculate distance entertainment data", function( assert ) {
		assert.ok(calcDistance( src,dst));
	});

var src=new google.maps.LatLng(parseFloat(en[0].location.lat),parseFloat(en[0].location.long));
var dst=new google.maps.LatLng(parseFloat(en[1].location.lat),parseFloat(en[1].location.long));
QUnit.test("calculate distance public data", function( assert ) {
		assert.ok(calcDistance( src,dst));
	});





