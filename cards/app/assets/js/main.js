(function( $ ) {
  "use strict";

  var APP = {
    _addressForm : function ( ) {
      $(".address").addressForm();
    },
    _initSliders : function ( ) {
      $(".input-slider").each( function() {
        var el = $(this),
            slider = $(".slider-percentage", el).bootstrapSlider({}),
            value = $(".value-percentage", el),
            alert = $(".alert-percentage");

        slider
          .on("slide", function ( slideEvt ) {
            value.val(slideEvt.value);
          })
          .on("slideStop", function ( ) {
            alert.hide();
          });

          value.on("blur", function ( ) {
            var minValue = parseFloat(slider.data("slider-min")),
                maxValue = parseFloat(slider.data("slider-max")),
                currentValue = parseFloat(this.value);

            if ( currentValue >= minValue && currentValue <= maxValue ) {
              alert.hide();
              slider.bootstrapSlider("setValue", currentValue, true);
            } else {
              value.css({'border-color': 'red'});
              alert.show();
            }
          });
      });
    },
    _contractCardSelectPaymentMethod: function ( ) {
      $('input[type=radio][name=paymode]').change(function() {
        console.log("Value: " + this.value);
          if (this.value === 'percentage') {
            $("#quantitySlider").fadeOut(500, function ( ) {
              console.log("complete!");
              $("#percentageSlider").fadeIn(500);
            });

          } else {
            $("#percentageSlider").fadeOut(500, function ( ) {
              console.log("complete2!");
              $("#quantitySlider").fadeIn(500);
            });
          }
      });
    },
    _selectPaidForm: function ( ) {
      $('input[type=radio][name=payform]').change(function() {
        switch (this.value) {
          case 'percentage':
            $('.slider-content').addClass('other-bg');
            $('.slider-content').find('.clarification').removeClass('hidden');
            $("#quantitySlider").fadeOut(500, function ( ) {
              $("#percentageSlider").fadeIn(500);
            });
            break;
          case 'cash':
            $('.slider-content').removeClass('other-bg');
            $('.slider-content').addClass('alternate-bg');
            $('.slider-content').find('.clarification').addClass('hidden');
            $("#percentageSlider").fadeOut(500);
            $("#quantitySlider").fadeOut(500);
            break;
          case 'quantity':
            $('.slider-content').addClass('other-bg');
            $('.slider-content').find('.clarification').removeClass('hidden');
            $("#percentageSlider").fadeOut(500, function ( ) {
              $("#quantitySlider").fadeIn(500);
            });
            break;
        }
      });
    },
    _closeButtons : function ( ) {
      $("[data-close]").close();
    },
    init : function ( ) {
      this._addressForm();
      this._initSliders();
      this._contractCardSelectPaymentMethod();
      this._closeButtons();
      this._selectPaidForm();
    }
  };

  $(document).ready(function ( ) {
      APP.init();
  });

})( jQuery );
