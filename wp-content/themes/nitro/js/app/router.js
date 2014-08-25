define([
	"jquery",
	'pages/partial/header',
  	'pages/partial/footer'
	],function($){
		$("meta[name='pagetype']").attr("content") != "" ? 
      	require( [( "pages/"+$("meta[name='pagetype']").attr("content") )] ) :
      	require( [( "pages/default" )] );
	});
   