(function( $ ) {
  "use strict";

  var APP = {
    _addressForm : function ( ) {
      $(".address").addressForm();
    },
    _closeButtons : function ( ) {
      $("[data-close]").close();
    },
    init : function ( ) {
      this._addressForm();
      this._closeButtons();
    }
  };

  $(document).ready(function ( ) {
      APP.init();
  });

})( jQuery );
