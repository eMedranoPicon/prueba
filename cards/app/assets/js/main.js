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
    _addressForm : function ( ) {
      $(".address").addressForm();
    },
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
        })

        value.on("blur", function ( ) {
          var minValue = parseFloat(slider.data("slider-min")),
              maxValue = parseFloat(slider.data("slider-max")),
              currentValue = parseFloat(this.value.replace(/[\.]/g, '').replace(/[,]/g, '.'));

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
    _contractCardChooseType: function ( ) {
      var cashPayment = $("#cash-payment"),
          instalmentPayment = $("#instalment-payment"),
          btnSubmit = $("#btn-contract-card");

      cashPayment.on("click", function ( ) {
        if ( !cashPayment.hasClass("selected") ) {
          instalmentPayment.removeClass("selected");
          cashPayment.toggleClass("selected");
          if ( btnSubmit.is(":disabled") ) {
            btnSubmit.prop('disabled', false);
          }
        }
      });

      instalmentPayment.on("click", function ( ) {
        if ( !instalmentPayment.hasClass("selected") ) {
          cashPayment.removeClass("selected");
          instalmentPayment.toggleClass("selected");
          if ( btnSubmit.is(":disabled") ) {
            btnSubmit.prop('disabled', false);
          }
        }
      });

    },
    _contractCardSelectPaymentMethod: function ( ) {
      $('input[type=radio][name=paymode]').change(function() {
          if (this.value === 'percentage') {
            $("#quantitySlider").fadeOut(500, function ( ) {
              $("#percentageSlider").fadeIn(500);
            });

          } else {
            $("#percentageSlider").fadeOut(500, function ( ) {
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
      var timeline = $('.timeline');
      timeline.accordionSoft();

      // MODULE PRINCIPAL
      // DESPLEGAR DETALLES
      timeline.find('.bank-note__actions')
        .on('click', function ( e ) {
          var self = $(this),
              menuContainer = self.closest('.month-view__content').find('.module'),
              selfMenu = self.parents('.bank-note').find('.module');

          for (var i=0; i < menuContainer.length; i++){
            var mc = menuContainer.eq(i);
            mc.parents('.bank-note').find('.bank-note__actions').removeClass('selected');
            if(mc.hasClass('slidedown') && !mc.is(selfMenu)) {
              slideContainer(mc);
            }
          }
          if(selfMenu.hasClass('slideup')) {
            self.addClass('selected');
          }
          slideContainer(selfMenu);
        });

    },
    _hackIeBtnActive: function() {
      var buttons = $('button');
      var activeClass = 'active';
      function addActive() {
        $(this).addClass(activeClass);
      }
      function removeActive() {
        $(this).removeClass(activeClass);
      }

      buttons.mousedown(addActive);
      buttons.mouseup(removeActive);
    },
    init : function ( ) {
      this._addressForm();
      this._initSliders();
      this._contractCardChooseType();
      this._contractCardSelectPaymentMethod();
      this._closeButtons();
      this._initChart();
      this._timeline();
      this._selectPaidForm();
      this._hackIeBtnActive();
    }
  };

  $(document).ready(function ( ) {
      APP.init();
  });

})( jQuery );
