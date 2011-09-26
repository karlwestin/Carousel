"use strict"

// Main view for carousel pattern

// SETUP
var WIDTH = 1920,
	HEIGHT = 1080,
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
camera.position.z = -700;
camera.position.x = WIDTH/2;
camera.target.position.y = 200;
camera.target.position.x = WIDTH/2;
camera.target.position.z = -1500;

renderer.setSize(WIDTH, HEIGHT);
$container.append(renderer.domElement);


var carousel = function(model) {

	var panels = [],
		currentIndex = 0,    
    	radius = 1400,
    	speed = 500,
    	subviews = {};
    
    // PubSub for init & update:
    model.addInitObserver(init);
    model.addUpdateObserver(update);

    function init(new_items, start_item) {
        
            // TODO: clear all the current items if we do a new init()
        
        	start_item || (start_item = 0);
        	
        	currentIndex = start_item;
        	setUpCircle(new_items, start_item);
        	start();
    }
    
    
    function start() {
        // rotate
        setTimeout(function roll() {
               next(); 
               setTimeout(roll, 2000);
        }, 2000);
    }            
    
    
    function setUpCircle(items, offset) {
    
        forEach(items, function(element, index, array) {
            panels.push(addView(element));
        });
        
        move(offset);
    
    }
    
    
    function rotate(newIndex) {
        var index = shownIndex(), i = 0, steps = newIndex - index;
        steps = (steps > 0) ? steps - 1 : steps + panels.length - 1;

        setTimeout(function roll() {
            index++;
            move(index);
            if(i<steps) {
                i++;
                setTimeout(roll, timeout);
            } 
        }, 1);                 
    }
    
        
    function next() {
        rotate(shownIndex() + 1);
    }    
    
    
    function addView(config) {

        if(typeof subviews[config.type] != "function")
            throw new Error("Not a valid subview! Passed: " + config.type);
    
        var element = subviews[config.type](config, model);
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
				z: positions[i].z }, speed)
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
    
    
    function update(change) {
        

        var change = data.change;
        
//        findItem(panels
        
        
        for(var i=0; i < panels.length; i++) {
            if(panels[i].index === change.index) {

                if(change.quantity = 0)
                    remove(change.index);                
                
                
            }
        }

        
    }
    
    
    function registerSubview(name, item) {
        subviews[name] = item;
    }
    
    
    function shownIndex() {
        return currentIndex - Math.floor(currentIndex/panels.length) * panels.length;
    }
    
    
    function setTiming(time) {
        speed = time;
    }
    
        
    function setX(rotateY) {
        return radius * Math.sin(radian(rotateY)) + WIDTH/2;
    }
    
    
    function setZ(rotateY) {
        return radius * Math.cos(radian(rotateY)) - 2 * radius;
    }    
    
    
    return({    
        
        remove: remove,    
        rotate: rotate,
        next: next,
        registerSubview: registerSubview,
        setTiming: setTiming, // exposing timeout for testing purpose
        shownIndex: shownIndex
        
    });

};


function animate() {
	requestAnimationFrame( animate );
	render();	
}


function render() {
	TWEEN.update();
	renderer.render( scene, camera );
}

animate();
