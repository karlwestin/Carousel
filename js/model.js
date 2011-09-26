// Data model for carousel demo


function XMLModel() {

    var initObservableSubject    = makeObservableSubject(),
        addObservableSubject     = makeObservableSubject(),
        removeObsvervableSubject = makeObservableSubject();

    //API start
	var start = function(spotData) {
    	var items = loadSpotData(spotData);
    	
    	// TODO: sort this out – What's the best way of writing?
    	if(startingFromScratch()) 
    	    init(items);
        else if(addingItems())
            add(items);
        else if(removingItems())
            remove(items);
    }
    //API end
    
    function startingFromScratch() {
        return true; // yeah, right
    }
    
    function init(items) {
        initObservableSubject.notifyObservers(items);
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
    
    }
    
    return {
        start: start,
        setArticleDetails: setArticleDetails,
        addInitObserver: initObservableSubject.addObserver,
        removeInitObserver: initObservableSubject.removeObserver
    }
    
};


