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
    _initPopUp : function () {
      $(".edit-info").on('mouseover', function() {
        $(this).attr('src', 'images/icons/editar_verde.png');
      });
      $(".edit-info").on('mouseout', function() {
        $(this).attr('src', 'images/icons/editar_gris.png');
      });
      $(document).on('click', function(e) {
        var container = $(".pop-up-info"),
            icon = $('.edit-info');

        if(!container.is(e.target) && container.has(e.target).length === 0 &&
           !container.hasClass('hidden') && !icon.is(e.target)) {
             container.toggleClass('hidden');
        }
      });
      $(".edit-info").on('click', function() {
        $('.pop-up-info').toggleClass('hidden');
      });
    },
    _closeAlert : function () {
      $('.alert__close').on('click', function () {
        var alert = $(this).closest('.alt-close');
        if (this.type == "button") {
          var alertdown = $(this).closest('.alert-down');
          alert = alertdown.prev();

          if(alertdown.next().hasClass('alert-down__message')) {
            var message = alertdown.next();
            message.animate({
              opacity: '0.2',
              height: 'toggle'
            }, "slow");
          }

          alertdown.animate({
            opacity: '0.2',
            height: 'toggle'
          }, "slow");
        }
        if (alert.next().hasClass('alert-down') && this.type != "button") {
          var down = alert.next();
          if (down.next().hasClass('alert-down')) {
            var down2 = down.next();
            down2.animate({
              opacity: '0.2',
              height: 'toggle'
            }, "slow");
          }

          down.animate({
            opacity: '0.2',
            height: 'toggle'
          }, "slow");
        }

        alert.animate({
          opacity: '0.2',
          height: 'toggle'
        }, "slow");
      });
    },
    _changeCaret : function () {
      $('.alert-caret').on('click', function() {
        $(this).find('img').toggleClass('alert-caret__icon');
      });
    },
    _toggleText : function () {
      $('.details-more img').on('click', function() {
        if ($(this).attr('aria-expanded') === 'false') {
          $(this).attr('src','images/icons/ico_menos.png');
          $(this).prev().hide();
        } else {
          $(this).attr('src','images/icons/ico_mas.png');
          $(this).prev().show();

        }
      });
    },
    init : function ( ) {
      this._initSliders();
      this._initTooltips();
      this._closeButtons();
      this._hackIeBtnActive();
      this._initPopUp();
      this._closeAlert();
      this._changeCaret();
      this._toggleText();
    }
  };

  $(document).ready(function ( ) {
      APP.init();
  });

})( jQuery );
