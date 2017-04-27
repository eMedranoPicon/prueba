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
            alert = $(".alert-percentage", el);

        slider
          .on("slide", function ( slideEvt ) {
            value.val(slideEvt.value);
          })
          .on("slideStop", function ( ) {
            alert.hide();
            value.removeClass('error-value-percentage');
          });

          value.on("blur", function ( ) {
            var minValue = parseFloat(slider.data("slider-min")),
                maxValue = parseFloat(slider.data("slider-max")),
                currentValue = parseFloat(this.value);

            if ( currentValue >= minValue && currentValue <= maxValue ) {
              alert.hide();
              value.removeClass('error-value-percentage');
              slider.bootstrapSlider("setValue", currentValue, true);
            } else {
              value.addClass('error-value-percentage');
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
      var contentSlider = $('.slider-content'),
          quantitySlider = $("#quantitySlider"),
          percentageSlider = $("#percentageSlider"),
          informativeBlock = $(".clarification"),
          fadeDuration = 500;

      $('input[type=radio][name=payform]').change(function() {

        if (this.value === 'percentage') {
          contentSlider.find('.clarification').fadeIn(fadeDuration);
          quantitySlider.fadeOut(fadeDuration, function ( ) {
            contentSlider.addClass('terciary-bg', fadeDuration);
            percentageSlider.fadeIn(fadeDuration);
            informativeBlock.fadeIn(fadeDuration);
          });
          return;
        }

        if (this.value === 'quantity') {
          contentSlider.find('.clarification').fadeIn(fadeDuration);
          percentageSlider.fadeOut(fadeDuration, function ( ) {
            contentSlider.addClass('terciary-bg', fadeDuration);
            quantitySlider.fadeIn(fadeDuration);
            informativeBlock.fadeIn(fadeDuration);
          });
          return;
        }

        contentSlider.find('.clarification').fadeOut(fadeDuration);
        contentSlider.removeClass('terciary-bg', fadeDuration);
        percentageSlider.fadeOut(fadeDuration);
        quantitySlider.fadeOut(fadeDuration);

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
      this._selectPaidForm();
    }
  };

  $(document).ready(function ( ) {
      APP.init();
  });

})( jQuery );
