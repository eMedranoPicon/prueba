(function( $ ) {
  "use strict";

  var APP = {
    _addressForm : function ( ) {
      $(".address").addressForm();
    },
    _numberSlider : function ( ) {
      $(".slider-percentage").bootstrapSlider({});
      $(".alert-percentage").hide();

      $(".slider-percentage").on("slide", function(slideEvt) {
        $(".value-percentage").val(slideEvt.value);
      });
      $(".slider-percentage").on("slideStop", function() {
        $(".alert-percentage").hide();
      });

      $(".value-percentage").on("blur", function(){
        var minValue = parseFloat($(".slider-percentage").data("slider-min"));
        var maxValue = parseFloat($(".slider-percentage").data("slider-max"));
        var currentValue = parseFloat(this.value);
        if(currentValue >= minValue && currentValue <= maxValue) {
          $(".alert-percentage").hide();
          $(".slider-percentage")
            .bootstrapSlider("setValue", currentValue, true);
        } else {
          $(".alert-percentage").show();
        }
      });
    },
    init : function ( ) {
      this._addressForm();
      this._numberSlider();
    }
  };

  $(document).ready(function ( ) {
      APP.init();
  });

})( jQuery );
