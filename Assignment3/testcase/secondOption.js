//
//test secondOption return value 
//
//
var keyword="en";
var display=[];
var radius=20000;

QUnit.test("Second Option entertainment within 20km", function( assert ) {
		assert.ok(secondOptions());
	});

keyword="ac";

QUnit.test("Second Option accomodation within 20km", function( assert ) {
		assert.ok(secondOptions());
	});

keyword="pu";

QUnit.test("Second Option public within 20km", function( assert ) {
		assert.ok(secondOptions());
	});


radius=1000;
keyword="en";
QUnit.test("Second Option entertainment within 1km", function( assert ) {
		assert.ok(secondOptions());
	});

keyword="ac";

QUnit.test("Second Option accomodation  within 1km", function( assert ) {
		assert.ok(secondOptions());
	});

keyword="pu";

QUnit.test("Second Option public  within 1km", function( assert ) {
		assert.ok(secondOptions());
	});
