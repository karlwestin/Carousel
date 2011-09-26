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
        
        var updated = findItem(items, "artnr", artnr.toString()) || findItem(items, "src", item_ref);
        
        if(!updated)
            throw new Error("The item you tried to change wasn't found in the item list");                                        
    
        if(!!price) {
            updated.price = price.toString();                
        }
                
        if(typeof artnr === "number" || parseInt(artnr) != NaN) {
            updated.artnr = artnr.toString();
        }
        
        if(typeof quantity === "number") {
            updated.quantity = quantity;
        }

        return updated;

        updateObservableSubject.notifyObservers(updated);

    }
    
    return {
        start:                start,
        setArticleDetails:    setArticleDetails,
        addInitObserver:      initObservableSubject.addObserver,
        removeInitObserver:   initObservableSubject.removeObserver,
        addUpdateObserver:    updateObservableSubject.addObserver,
        removeUpdateObserver: updateObservableSubject.removeObserver        
    }
    
};


