// Data model for carousel demo


function XMLModel() {

    var initObservableSubject    = makeObservableSubject(),
        updateObservableSubject  = makeObservableSubject(),
        items;

	var start = function(spotData) {
    	items = loadSpotData(spotData);    	
    	init(items);
    }
    
    function init(init_items) {
        initObservableSubject.notifyObservers(init_items);
    }
    
    function loadSpotData(dataUrl) {
    	var items = [];
    	$.ajax({
    		type : "GET",
    		url : dataUrl,
    		dataType : "xml",
    		async : false,
    		success : function(me_result) {
    
    			$('Spot > Item', me_result).each(function(index) {
    				var attrs = parseAttributes(this), item;
    				attrs.index = index;
    				attrs.quantity = !!attrs.quantity ? attrs.quantity : 10;
    				items.push(attrs);
                
    			});
    		},
    		error : function(jqXHR, message) {
    		    throw new Error(message);
    		}
    	});
    
    	return items;
    }
    
    function setArticleDetails(item_ref, artnr, price, quantity) {

        function update() {
        
            var updated = findItem(items, "artnr", artnr.toString()) || findItem(items, "src", item_ref);
            
            if(!updated)
                throw new Error("The item you tried to change wasn't found in the item list");                                        
        
            if(!!price) {
                updated.price = price.toString();                
            }
                    
            if(!!artnr) {
                updated.artnr = artnr.toString();
            }
            
            if(!!quantity) {
                updated.quantity = quantity;
            }

            return updated;

        }
        var changed_item = update();
        updateObservableSubject.notifyObservers(changed_item);

    }
    
    return {
        items:                items,
        start:                start,
        setArticleDetails:    setArticleDetails,
        addInitObserver:      initObservableSubject.addObserver,
        removeInitObserver:   initObservableSubject.removeObserver,
        addUpdateObserver:    updateObservableSubject.addObserver,
        removeUpdateObserver: updateObservableSubject.removeObserver        
    }
    
};


