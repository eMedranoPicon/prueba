(function( $ ) {
  "use strict";

  function slideContainer ( $context ) {
      var $container = $context.closest('.module');
      var h = $container.find('.active .module-inner-content').outerHeight() + 12;
      //$container.find('.active.module-content').height(h);
      if ($container.hasClass("slideup")) {
          $container.removeClass("slideup").addClass("slidedown");
          $container.css('height', h+'px');
      } else {
          $container.removeClass("slidedown").addClass("slideup");
          $container.removeAttr('style');
      }
  }

  var APP = {
    _initSliders : function ( ) {
      $(".input-slider").each( function() {
        var el = $(this),
            slider = $(".slider-percentage", el).bootstrapSlider({}),
            value = $(".value-percentage", el),
            alert = $(".alert-percentage", el);

        if ( value.is("[data-inputmask]") ) {
          value.inputmask();
        }

        slider.on("slide slideStop", function ( slideEvt ) {
          value.val(slideEvt.value);
          if ( value.hasClass('error-value-percentage') ) {
            value.removeClass('error-value-percentage');
            alert.hide();
          }
        });

        value.on("blur", function ( ) {
          var minValue = parseFloat(slider.bootstrapSlider("getAttribute", "min")),
              maxValue = parseFloat(slider.bootstrapSlider("getAttribute", "max")),
              currentValue = parseFloat(this.value.replace(/[\.]/g, '').replace(/[,]/g, '.'));

          if ( currentValue >= minValue && currentValue <= maxValue ) {
            if ( value.hasClass('error-value-percentage') ) {
              value.removeClass('error-value-percentage');
              alert.hide();
            }
            slider.bootstrapSlider("setValue", currentValue, true);
          } else {
            value.addClass('error-value-percentage');
            alert.show();
          }
        });

      });
    },
    _initTooltips : function ( ) {
      $('[data-toggle="tooltip"]').tooltip();
    },
    _closeButtons : function ( ) {
      $("[data-close]").close();
    },
    _hackIeBtnActive: function() {
      var buttons = $('button', '.show-code');
      var activeClass = 'active';
      function addActive() {
        $(this).addClass(activeClass).parent().addClass(activeClass);
      }
      function removeActive() {
        $(this).removeClass(activeClass).parent().removeClass(activeClass);
      }

      buttons.mousedown(addActive);
      buttons.mouseup(removeActive);
    },
    init : function ( ) {
      this._initSliders();
      this._initTooltips();
      this._closeButtons();
      this._hackIeBtnActive();
    }
  };

  $(document).ready(function ( ) {
      APP.init();
  });

})( jQuery );
