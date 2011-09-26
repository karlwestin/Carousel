"use strict"

// Main view for carousel pattern

// SETUP
var WIDTH = 800,
	HEIGHT = 500,
	VIEW_ANGLE = 70,
	ASPECT = WIDTH/HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

// ELEMENTS
var $container = $("#container"),
	renderer = new THREE.CanvasRenderer(),
	camera = new THREE.Camera(VIEW_ANGLE, ASPECT, NEAR, FAR),
	scene = new THREE.Scene();

camera.position.y = 500;
camera.position.z = 500;
camera.position.x = 400;
camera.target.position.y = 0;
camera.target.position.x = WIDTH/2;
camera.target.position.z = -500;

renderer.setSize(WIDTH, HEIGHT);
$container.append(renderer.domElement);


var carousel = function() {

	var panels = [],
		currentIndex = 0,    
    	radius = 800,
    	timeout = 500,
    	subviews = {};
    	
    
    function setUpCircle(items, offset) {
    
        //var positions = getPositions(items.length, offset);
    	
        forEach(items, function(element, index, array) {
            panels.push(addView(element));
        });
        
        move(offset);
    }
    
    function addView(config) {

        if(typeof subviews[config.type] != "function")
            throw new Error("Not a valid subview! Passed: " + config.type);
    
        var element = subviews[config.type](config);
        scene.addChild(element);
        return element;    

    }
    
    function getPositions(numberOfPanels, panelAtFront) {
        var positions = [];
        
        for (var i = 0; i < numberOfPanels; i++) {        
			var position = i - panelAtFront;
			var rotateY = (360*position/numberOfPanels);
			
			var coordinates = {};
			
			coordinates.x = setX(rotateY);
			coordinates.y = 0;
			coordinates.z = setZ(rotateY);
			
			positions.push(coordinates);
        }
        
        return positions;
    }
    
    function move(offset) {
        currentIndex = offset;
        var positions = getPositions(panels.length, offset);
    
		for (var i = 0; i < panels.length; i++) {
			new TWEEN.Tween( panels[i].position ).to( {
				x: positions[i].x,
				y: positions[i].y,
				z: positions[i].z }, timeout)
			.easing( TWEEN.Easing.Quadratic.EaseOut).start();
		}    	
    }
    
    function remove(index) {

        var current = this.shownIndex(), new_index;
        
        if(index != current) {
            if (index > current)
                new_index = current;
            else
                new_index = --current;
        } else {
            if(current + 1 <= panels.length -1)
                new_index = current;
            else
                new_index = 0;         
        }
        
        scene.removeChild(panels[index]);
        panels.splice(index, 1);
        
        move(new_index);
        
    }
    
    function registerSubview(name, item) {
        subviews[name] = item;
    }
    
    function add(index) {
        index || (index = panels.length);
        panels.splice(index, 0, addView());
        move(currentIndex);      
    }
    
    function setTiming(time) {
        timeout = time;
    }
        
    function setX(rotateY) {
        return radius * Math.sin(radian(rotateY)) + WIDTH/2;
    }
    
    function setZ(rotateY) {
        return radius * Math.cos(radian(rotateY)) - 2 * radius;
    }    
    
    return({    
        remove: remove,    
        
        add: add,
        
        registerSubview: registerSubview,
        
        // exposing timeout for testing purpose
        setTiming: setTiming,
    
        shownIndex: function() {
            return currentIndex - Math.floor(currentIndex/panels.length) * panels.length;
        },
        
        rotate: function(newIndex) {
            var index = this.shownIndex(), i = 0, steps = newIndex - index;
            steps = (steps > 0) ? steps - 1 : steps + panels.length - 1;

            setTimeout(function roll() {
                index++;
                move(index);
                if(i<steps) {
                    i++;
                    setTimeout(roll, timeout);
                } 
            }, 1);
                 
        },
        
        next: function() {
            this.rotate(this.shownIndex() + 1);
        },
        
        init: function(new_items, start) {
        
            // TODO: clear all the current items if we do a new init()
        
        	start || (start = 0);
        	
        	currentIndex = start;
        	setUpCircle(new_items, start);
        }
        
    });

}();


function animate() {
	requestAnimationFrame( animate );
	render();	
}


function render() {
	TWEEN.update();
	renderer.render( scene, camera );
}

animate();
