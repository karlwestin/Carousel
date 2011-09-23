"use strict"

var carousel = function() {

	var items,
		currentIndex,    
    	radius = 400;
    
    function radian(degrees) {
        return degrees * Math.PI/180;
    }
    
    function setX(rotateY) {
        return radius * Math.sin(radian(rotateY)) + radius;
    }
    
    function setZ(rotateY) {
        return radius * Math.cos(radian(rotateY)) - 2* radius;
    }
    
    function setPosition(offset) {
        forEach(items, function(element, index, array) {
            index -= offset;
            element.rotateY = (360*index/array.length);
            element.X = setX(element.rotateY);
            element.Z = setZ(element.rotateY);
            
            setRotation.call(element);
        
            function setRotation() {
                var style = "translate3D(" + element.X + "px, 250px, " + element.Z + "px)";
                //style += " rotateY(" + element.rotateY + "deg)";
                this.style.webkitTransform = style;
                this.style.zIndex = Math.floor(element.Z);
            }
        
        });
    }
    
    return({
    	setPosition: setPosition,
    
        shownIndex: function() {
            return currentIndex - Math.floor(currentIndex/items.length) * items.length;
        },
        
        rotate: function(newIndex) {
            var steps = newIndex - currentIndex;
            steps = (steps > 0) ? steps - 1 : steps + items.length - 1;
            
            var i = 0;

            setTimeout(function roll() {
                currentIndex++;
                setPosition(currentIndex);
                if(i<steps) {
                    i++;
                    setTimeout(roll, 500);
                } 
            }, 500);
            
            
        },
        
        next: function() {
            this.rotate(this.shownIndex() + 1);
        },
        
        init: function(new_items, start) {
        	start || (start = 0);
        	items = new_items;
        	
        	
        	
        	currentIndex = start;
        	setPosition(start);
        }
        
    });

}();
carousel.init(document.querySelectorAll("ul li"), 0);





// Utility functions

function forEach(array, action) {
    for(var i = 0; i < array.length; i++) {
        action(array[i], i, array);
    }
}