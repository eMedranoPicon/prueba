$(document).ready(function () {
  "use strict";

  // MASK FOR INPUTS
  $(":input").inputmask();

  // SLIDE UP/DOWN EDIT PRESENT PREVISION
  $(".detail-header .edit-present")
    .on('click', function() {
      var $editPresentContainer = $(this).closest('.section-header').find(".edit-present-container");
      slideUpDown($editPresentContainer);

    });

  // SLIDE UP/DOWN RETURN PRESENT PREVISION
  $(".detail-header .edit-present.icon-return-circle")
    .on('click', function() {
      var $returnPresentContainer = $(this).closest('.section-header').find(".return-present-container");
      slideUpDown($returnPresentContainer);
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
      .hover ( function() {
        reverseClass($(this), 'icon-check-circle', 'icon-check-circle-orange');
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
    .hover ( function() {
        reverseClass($(this), 'icon-check-circle', 'icon-check-circle-orange');
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

});
