"use strict"

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
    	radius = 800;
    
    function setUpCircle(items, offset) {
    	
        forEach(items, function(element, index, array) {
            index -= offset;

			var element = new THREE.Mesh( new THREE.PlaneGeometry( 400, 400 ), new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
            
            element.overdraw = true;
			scene.addChild( element );    
            
            element.rotateY = (360*index/array.length);
            element.X = setX(element.rotateY);
            element.Z = setZ(element.rotateY);
            
            setRotation(element);
        
            function setRotation(element) {
			  element.rotation.x = radian(-25);
			  element.position.z = element.Z;
			  element.position.x = element.X;
            }
            
            panels.push(element);
        
        });
        
        currentIndex = offset;
    }
    
    function move(offset) {
		for (var index = 0; index < panels.length; index++) {
			var i = index - offset;
			var rotateY = (360*i/panels.length);
			new TWEEN.Tween( panels[index].position ).to( {
				x: setX(rotateY),
				y: 0,
				z: setZ(rotateY) }, 1000 )
			.easing( TWEEN.Easing.Quadratic.EaseOut).start();
		}    	
    }
    
    function radian(degrees) {
        return degrees * Math.PI/180;
    }
    
    function setX(rotateY) {
        return radius * Math.sin(radian(rotateY)) + WIDTH/2;
    }
    
    function setZ(rotateY) {
        return radius * Math.cos(radian(rotateY)) - 2* radius;
    }    
    
    return({
    	move: move,
    
        shownIndex: function() {
            return currentIndex - Math.floor(currentIndex/panels.length) * panels.length;
        },
        
        rotate: function(newIndex) {
            var steps = newIndex - this.shownIndex();
            steps = (steps > 0) ? steps - 1 : steps + panels.length - 1;
            
            var i = 0;

            setTimeout(function roll() {
            	console.log("currentIndex: " + currentIndex + " i: " + i + " steps: " + steps);
                currentIndex++;
                move(currentIndex);
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
        	
        	currentIndex = start;
        	setUpCircle(new_items, start);
        }
        
    });

}();

carousel.init([1, 2, 3, 4, 5, 6]);


function animate() {
	requestAnimationFrame( animate );
	render();	
}


function render() {
	TWEEN.update();
	renderer.render( scene, camera );
}

animate();


// Utility functions

function forEach(array, action) {
    for(var i = 0; i < array.length; i++) {
        action(array[i], i, array);
    }
}