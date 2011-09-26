// Subviews for carousel pattern

/* Image and Price view ------------------------------------------------------------------ */

function imagePrice(config) {

            config || (config = {x:0, y:0, z:0});
            config.x = 0;
            config.z = 0;
            config.y = 0;

            if(typeof config.image != "string")
                throw new Error("No image loaded on element " + config.index);
            
            var canvas = document.createElement("canvas");
            canvas.width = 500;
            canvas.height = 800;
            var drawingArea = canvas.getContext("2d");
            
            var img = new Image();
            img.src = config.image;
            img.onload = function() {
                drawingArea.drawImage(img, 0, 0);            
                
                if(!!config.price) {                
                    drawingArea.fillStyle="white";
                    drawingArea.textAlign="right";
                    drawingArea.font = "300px Avenir";
                    drawingArea.fillText(config.price, 400, 600);
                    
                    drawingArea.font = "100px Avenir";
                    drawingArea.textAlign="left";
                    drawingArea.fillText(String.fromCharCode(8364), 400, 600);
                }
                // force redraw of texture
                texture.needsUpdate = true;
            };
            
            
            var texture = new THREE.Texture( canvas );
			texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;            

            var material = new THREE.MeshBasicMaterial( { map: texture } );
            var element = new THREE.Mesh( new THREE.PlaneGeometry( 500, 800 ), material );
            
            element.overdraw = true;
                    
		    //element.rotation.x = radian(-25);
		    element.position.z = config.z;
		    element.position.x = config.x;    
		    
		    return element;

};


/* Image, no price subview ------------------------------------------------------------------ */

function image(config) {

            config || (config = {x:0, y:0, z:0});
            config.x = 0;
            config.z = 0;
            config.y = 0;

            if(typeof config.image != "string")
                throw new Error("No image loaded on element " + config.index);
            
            var canvas = document.createElement("canvas");
            canvas.width = 500;
            canvas.height = 800;
            var drawingArea = canvas.getContext("2d");
            
            var img = new Image();
            img.src = config.image;
            img.onload = function() {
                drawingArea.drawImage(img, 0, 0);            
                // force redraw of texture
                texture.needsUpdate = true;
            };
            
            
            var texture = new THREE.Texture( canvas );
			texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;            

            var material = new THREE.MeshBasicMaterial( { map: texture } );
            var element = new THREE.Mesh( new THREE.PlaneGeometry( 500, 800 ), material );
            
            element.overdraw = true;
                    
		    element.rotation.x = radian(-25);
		    element.position.z = config.z;
		    element.position.x = config.x;    
		    
		    return element;

};


