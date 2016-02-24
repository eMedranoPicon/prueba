$(document).ready(function () {
  "use strict";

  // MASK FOR INPUTS
  $(":input").inputmask();

  // SLIDE UP/DOWN EDIT PRESENT PREVISION
  $(".detail-header .edit-present")
    .on('click', function() {
      var $section = $(this).closest('.section-header');
      if ($section.find(".edit-present-container").hasClass("slideup")) {
        $section.find(".edit-present-container").removeClass("slideup").addClass("slidedown");
      } else {
        $section.find(".edit-present-container").removeClass("slidedown").addClass("slideup");
      }
    });

  // SLIDE UP/DOWN RETURN PRESENT PREVISION
  $(".detail-header .edit-present.icon-return-circle")
    .on('click', function() {
      var $section = $(this).closest('.section-header');
      if ($section.find(".return-present-container").hasClass("slideup")) {
        $section.find(".return-present-container").removeClass("slideup").addClass("slidedown");
      } else {
        $section.find(".return-present-container").removeClass("slidedown").addClass("slideup");
      }
    });

  // VALIDAR MODIFICACIÓN DEL MES PRESENTE
  $(".detail-header .check-edit")
    .on("click", function() {
      var $section = $(this).closest('.section-header');
      var value = $section.find(".edit-present-container .edit-text").val().split(',');
      var infoPresent = $section.find(".info-present");
      infoPresent.find(".price").html( value[0]+"," );
      infoPresent.find(".decimal").html( value[1] );
      infoPresent.find(".edit-present").removeClass("icon-edit-white").addClass("icon-return-circle");
      $section.find(".bar-text-container.expected .number").html( value[0] );
      $section.find(".bar-text-container.expected .decimal").html( value[1] );
      $section.find(".edit-present-container").removeClass("slidedown").addClass("slideup");
      $section.find(".box-container-edit").addClass("hidden");
      $section.find(".box-container-return").removeClass("hidden");
    });

    // CAMBIO DE ICONO A NARANJA
    $(".detail-header .icon-check-circle, .detail-header .icon-check-circle-orange")
      .hover (
        function() {
          $(this).removeClass('icon-check-circle').addClass('icon-check-circle-orange');
        }, function() {
          $(this).addClass('icon-check-circle').removeClass('icon-check-circle-orange');
        }
      );


  // TRATAMIENTO DEL RETURN DE AJUSTE MANUAL
  $(".detail-header .check-return")
    .on("click", function() {
      var $section = $(this).closest('.section-header');
      var value = $section.find(".return-text-container").find(".return-text").html().split(',');
      var infoPresent = $section.find(".info-present");
      infoPresent.find(".price").html( value[0]+"," );
      infoPresent.find(".decimal").html( value[1] );
      infoPresent.find(".edit-present").removeClass("icon-return-circle").addClass("icon-edit-white");
      $section.find(".bar-text-container.expected .number").html( value[0] );
      $section.find(".bar-text-container.expected .decimal").html( value[1] );
      $section.find(".edit-present-container").removeClass("slidedown").addClass("slideup");
      $section.find(".box-container-edit").removeClass("hidden");
      $section.find(".box-container-return").addClass("hidden");
    })
    .hover (
      function() {
        $(this).removeClass('icon-check-circle').addClass('icon-check-circle-orange');
      }, function() {
        $(this).addClass('icon-check-circle').removeClass('icon-check-circle-orange');
      }
    );

  // RESTAURAR EL VALOR FUTURO POR DEFECTO
  $(document).on('click', '.detail-header .info-future .edit-return', function(event) {
    $(this).addClass('icon-edit future-detail-edit').removeClass('icon-return-circle edit-return');
    var $flipper = $(this).closest('.flipper');
    var value = $flipper.find('.info-future .init-value').val();
    $flipper.find('.info-future .price').html(value);
    value = value.split(',');
    $flipper.find('.label-input').show();
    $flipper.find('.value').html(value[0]);
    $flipper.find('.decimal').html(value[1]);

  });

  // ACCEDE A LA EDICIÓN DEL PRESUPUESTO FUTURO
  $(document).on('click', '.detail-header .future-detail-edit', function(e) {
    if (!$(this).closest('.flip-container').hasClass("hover")) {
      $(this).closest('.flip-container').addClass("hover");
      var $labelInput = $(this).closest('.flip-container').find(".label-input");
      var $flipper = $(this).closest('.flipper');
      $flipper.find('.input-future').show().focus();
      $labelInput.on('click', function() {
        $flipper.find('.input-future').show().focus();
      });
    }
  });

  // TRATAMIENTO DEL INPUT DEL MES FUTURO
  $('.detail-header .input-future')
    .on('blur', function() {
      var $flipper = $(this).closest('.flipper');
      var value = $(this).val().split(',');
      $(this).hide();
      $flipper.find('.label-input').show();
      $flipper.find('.value').html(value[0]);
      $flipper.find('.decimal').html(value[1]);
    })
    .on('focus', function() {
      var $labelInput = $(this).closest('.flipper').find('.label-input');
      var value = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
      $labelInput.hide();
      $(this).val(value);
    })
    .one('focus', function() {
      var $labelInput = $(this).closest('.flipper').find('label-input');
      var value = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
      $(this).closest('.flipper').find('.info-future .init-value').html(value);
  });

  // VALIDAR LOS DATOS DEL MES FUTURO
  $('.detail-header .future-detail-check').on('click', function(event) {
    var $labelInput = $(this).closest('.flipper').find('.modify-data .label-input');
    var $flipContainer = $(this).closest('.flip-container');
    var value = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
    $flipContainer.find('.front .price').html(value);
    $flipContainer.removeClass('hover').find('.future-detail-edit').removeClass('icon-edit-white future-detail-edit').addClass('icon-return-circle edit-return');
    event.stopPropagation();
  });



  /************************************************
  ***************** PROVEEDORES *******************
  *************************************************/

  // SLIDE UP/DOWN CONTENIDO
  $(".detail-proveedores .proveedores-header > .dot-container, .detail-proveedores .proveedores-content .icon-ex-container i")
    .on('click', function() {
      var $section = $(this).closest('.proveedores-container').find('.proveedores-content');
      var $box = $section.find('.elements-box');
      var height = parseInt($box.css('height').split('px')[0]) + 100;
      var $dot = $('.detail-proveedores .proveedores-header > .dot-container');
      if ($section.hasClass("slideup")) {
        $section.css('max-height', height+'px');
        $section.removeClass("slideup").addClass("slidedown");
        $dot.addClass('ocult');
      } else {
        var $elems = $(this).closest('.proveedores-content').find('.module');
        for(var e=0; e < $elems.length; e++){
          if($($elems[e]).hasClass('slidedown')){
            slideUpDown($($elems[e]));
            slideUpDown($($elems[e]).find('.module-content'));
          }
        }
        $section.css('max-height', 0);
        $section.removeClass("slidedown").addClass("slideup");
        $dot.removeClass('ocult');
      }
    });


  // SLIDE UP/DOWN ALERTS
  $(".detail-proveedores .proveedores-content i," +
    ".detail-proveedores .proveedores-content .alerts-module-content .button-module")
    .on('click', function() {
      var $thisElem = $(this).closest('.element-container').find('.module');
      var $thisElem2 = $thisElem.find('.module-content');
      var $elems = $(this).closest('.elements-box').find('.module');
      for(var e=0; e < $elems.length; e++){
        if($($elems[e]).hasClass('slidedown') && !$($elems[e]).is($thisElem)){
          slideUpDown($($elems[e]));
          slideUpDown($($elems[e]).find('.module-content'));
        }

      }
      slideUpDown($thisElem);
      slideUpDown($thisElem2);
    });

});
