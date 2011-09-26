// Data model for carousel demo


//API start
function start = function(spotData, view) {

	var items = loadSpotData(spotData);
	view.init(items);


    function getItemIndex() {
    	return view.shownIndex();
    }
    //API end
    
    
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
    
    return {
        getItemIndex: getItemIndex;
    }
    
}


