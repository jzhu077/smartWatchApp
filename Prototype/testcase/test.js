QUnit.test( "hello test", function(assert) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("Distance Test", function calcDistance(assert) {
		var src = new google.maps.LatLng(-45.866815599999995,170.5178656);
		var dst = new google.maps.LatLng(-45.8581207,170.51572880000003);
		var x = (google.maps.geometry.spherical.computeDistanceBetween(dst, src) / 1000).toFixed(2);        
        assert.ok(x == "0.98", "Passed");
    });

