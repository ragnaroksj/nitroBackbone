// Config for requireJs
require.config({

  /*The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout.*/
  waitSeconds : 0,
  baseUrl : "/wp-content/themes/nitro/js/app",
  paths : {
    "backbone" : "libs/backbone",
    "underscore" : "libs/underscore",
    "jquery" : "libs/jquery",
    "bootstrap" : "libs/bootstrap",
    "touche" : "libs/touche",
    "imageGallery" : "modules/imageGallery"
  },

  shim : {
    "backbone" : {
      exports : "Backbone"
    },
    "underscore" : {
      exports : "_"
    },
    "bootstrap" : {
      deps : [ 'jquery' ]
    },
    "imageGallery" : {
      deps : ['jquery']
    }
  }

});

//define project namespace 
var NAW = (function (NAW) { return NAW; } (NAW || {}));
window.NAW = NAW;
NAW.responsive = NAW.responsive || {};
/* Console fallback for ie8 */
window.console = window.console || {"log":function(){}};
/* Example of using gloable var */
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  NAW.mobile = true;
}

require([
  /*require libs*/
  "underscore",
  "backbone",
  'jquery',
  'touche'
], function ($) {

    require(["router"]);

});