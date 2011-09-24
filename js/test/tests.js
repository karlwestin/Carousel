
// documentation on writing tests here: http://docs.jquery.com/QUnit

var time = 150;

module("Carousel");

	test("Knowing the right numbers", function() {
	
		expect(4);
	
		var mock = createMock(6);
		carousel.init(mock);
        carousel.setTiming(10);	   
		
		var shown = carousel.shownIndex();
		equal(shown, 0, "Carousel should start with 0");
	
		carousel.next();
		stop();
		setTimeout(function() { 
			var shown = carousel.shownIndex();
			equal(shown, 1, "After stepping one, index should be 1");	
			carousel.rotate(0);												 																													

			setTimeout(function() {
				var shown = carousel.shownIndex();
				equal(shown, 0, "Rotate to 0, back from the start, index is 0");
				carousel.rotate(2);
				
				setTimeout(function() {
					var shown = carousel.shownIndex();
					equal(shown, 2, "Index is now on 2 again");
					start();									
				}, time);			
				
			}, time);
			
		}, time);
			
	});
	

	test("Removing and adding elements", function() {
	
	   var mock = createMock(7);
	   carousel.init(mock);
       carousel.setTiming(10);	   
	
	   carousel.remove(0);
       var shown = carousel.shownIndex();
       equal(shown, 0, "After removing the first element, the carousel is showing the first element");	
	
	});




function createMock(length) {
	var mock = [];
	for (var i = 0; i < length; i++) { 
		mock.push(i); 
	}
	return mock;
}