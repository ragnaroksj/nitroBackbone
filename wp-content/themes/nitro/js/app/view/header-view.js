define([ "jquery"],function($){
	
	return Backbone.View.extend({
		
		initialize : function(){
			console.log("header-view");
			_.bindAll(this, 'eventsBind');
			this.eventsBind();	
		},

		eventsBind : function(){
			$(".nav").on("click","li",function(e){
	    		e.preventDefault();
	    		if( !$(e.currentTarget).find(".sub-menu").length || $(e.currentTarget).find(".sub-menu").css("display") == "block"){
	    			window.location.href = e.target.attributes[0].nodeValue;
	    		}else{
	    			$(e.currentTarget).find(".sub-menu").slideToggle();
	    		}
	    	});	    	
	    }
	});
});
   