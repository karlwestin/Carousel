// Subviews for carousel pattern

/* Image and Price view ------------------------------------------------------------------ */

function imagePrice(config, model) {

            config || (config = {});
            config.x = 0;
            config.z = 0;
            config.y = 0;

            if(typeof config.src != "string")
                throw new Error("No image loaded on element " + config.index);
            
            var canvas = document.createElement("canvas");
            canvas.width = 500;
            canvas.height = 800;
            var drawingArea = canvas.getContext("2d");
            
            var img = new Image();
            img.src = config.src;
            img.onload = drawView;
            
            var texture = new THREE.Texture( canvas );
			texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;            

            var material = new THREE.MeshBasicMaterial( { map: texture } );
            var element = new THREE.Mesh( new THREE.PlaneGeometry( 500, 800 ), material );
            
            element.overdraw = true;        
		    element.rotation.x = radian(-20);
		    element.position.z = config.z;
		    element.position.x = config.x;  
		    element.index = config.index;
		    
		    function update(change) {
		      if(change.index === config.index) {
		          config.price = change.price;
		          config.artnr = change.artnr;
		          config.quantity = change.quantity;
		          drawView();
		      }
		    }
            model.addUpdateObserver(update);		    
		    
		    function drawView() {
		      drawingArea.clearRect(0, 0, canvas.width, canvas.height);
		      drawImage(img, drawingArea);
		      setPrice(config.price, drawingArea);

              // force redraw of texture		      
              texture.needsUpdate = true;		         
		    }
		    
		    function drawImage(img, canvas) {
                canvas.drawImage(img, 50, 0);		    
		    }  
		    
		    function setPrice(price, canvas) {
                canvas.fillStyle="white";
                canvas.textAlign="center";
                canvas.font = "250px Avenir";
                canvas.fillText(price, 280, 550);		    
		    }
		    
		    
		    return element;

};
