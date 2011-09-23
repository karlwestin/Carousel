
// documentation on writing tests here: http://docs.jquery.com/QUnit

module("Carousel");

	test("Knowing the right numbers", function() {
	
		expect(4);
	
		var mock = createMock(7);
		carousel.init(mock);
		
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
				}, 1500);			
				
			}, 3500);
			
		}, 1000);
			
	});



function createMock(length) {
	var mock = [];
	for (var i = 0; i < length; i++) { 
		mock.push(document.createElement("li")); 
		mock[i].innerHTML = i; 
	}
	return mock;
}