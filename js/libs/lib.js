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


// JavaScript helper functions:

function forEach(array, action) {
    for(var i = 0; i < array.length; i++) {
        action(array[i], i, array);
    }
}

function findItem(array, searchKey, searchValue) {
    var found = [];
    
    forEach(array, function(element) {
        if(element[searchKey]===searchValue)
            found.push(element);
    });
    
    if(found.length > 1)
        return found;
    else if(found.length === 1)
        return found[0];
    else 
        return false;    
}

// PubSub
function makeObservableSubject() {
    var observers = [];
    
    var addObserver = function(new_observer) {
        if(typeof new_observer !== 'function')
            throw new Error('Observer must be a function, you passed ' + typeof new_observer);
            
        forEach(observers, function(observer) {
            if (observer === new_observer)
                throw new Error("Observer already in the list");
        }); 
        
        observers.push(new_observer);
    };
    
    var removeObserver = function(removed_observer) {
        for (var i = 0; i < observers.length; i++) {
            if(observers[i] === removed_observer) {
                observers.splice(i, 1);
                return;
            }
        }
        throw new Error("Could not find observer in list");
    };
    
    var notifyObservers = function(data) {
        var observerSnapshot = observers.slice(0);
        forEach(observerSnapshot, function(observer) {
            observer(data);
        });
    };
    
    return {
        addObserver:     addObserver,
        removeObserver:  removeObserver,
        notifyObservers: notifyObservers
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


