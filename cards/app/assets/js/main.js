(function( $ ) {
  "use strict";

  var APP = {
    _addressForm : function ( ) {
      $(".address").addressForm();
    },
    init : function ( ) {
      this._addressForm();
    }
  };

  $(document).ready(function ( ) {
      APP.init();
  });

})( jQuery );
