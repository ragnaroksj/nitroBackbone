define([
  "jquery",
  "bootstrap",
  "imageGallery"
  ],function($,BS, IG){
    console.log("homepage");

    $(".img-container").on("click","img",function(){
    	IG.init($(this).attr("data-url"),$(".img-container img"),$(this).attr("data-order"))
    });

});