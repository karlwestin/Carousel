/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );
		};
	} )();
}


// JS
function forEach(array, action) {
    for(var i = 0; i < array.length; i++) {
        action(array[i], i, array);
    }
}

// Math
function radian(degrees) {
    return degrees * Math.PI/180;
}

// XML
function parseAttributes(obj) {
	var new_object = {};
	
	forEach(obj.attributes, function(attr) {
		new_object[attr.name] = attr.nodeValue;
	});
	
	return new_object;
}


