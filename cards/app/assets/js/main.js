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
    _closeButtons : function ( ) {
      $("[data-close]").close();
    },
    _initChart: function() {
      var chart = $('.chart-container');
      if (chart.length) {
        pointChart(chart);
      }
    },
    _timeline: function ( ) {
      $('.timeline').accordionSoft();
    },
    init : function ( ) {
      this._addressForm();
      this._initSliders();
      this._contractCardSelectPaymentMethod();
      this._closeButtons();
      this._initChart();
      this._timeline();
    }
  };

  $(document).ready(function ( ) {
      APP.init();
  });

})( jQuery );
