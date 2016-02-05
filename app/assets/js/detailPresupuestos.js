$(document).ready(function () {
  "use strict";

  // MASK FOR INPUTS
  $(":input").inputmask();

  // SLIDE UP/DOWN EDIT PRESENT PREVISION
  $(".detail-header .edit-present")
    .on('click', function() {
      if ($(".edit-present-container").hasClass("slideup")) {
        $(".edit-present-container").removeClass("slideup").addClass("slidedown");
      } else {
        $(".edit-present-container").removeClass("slidedown").addClass("slideup");
      }
    });

  // SLIDE UP/DOWN RETURN PRESENT PREVISION
  $(".detail-header .edit-present.icon-return-circle")
    .on('click', function() {
      if ($(".return-present-container").hasClass("slideup")) {
        $(".return-present-container").removeClass("slideup").addClass("slidedown");
      } else {
        $(".return-present-container").removeClass("slidedown").addClass("slideup");
      }
    });

  // VALIDAR MODIFICACIÓN DEL MES PRESENTE
  $(".detail-header .check-edit")
    .on("click", function() {
      var value = $(".edit-present-container").find(".edit-text").val().split(',');
      var infoPresent = $(".info-present");
      infoPresent.find(".price").html( value[0]+"," );
      infoPresent.find(".decimal").html( value[1] );
      infoPresent.find(".edit-present").removeClass("icon-edit-white").addClass("icon-return-circle");
      $(".bar-text-container.expected").find(".number").html( value[0] );
      $(".bar-text-container.expected").find(".decimal").html( value[1] );
      $(".edit-present-container").removeClass("slidedown").addClass("slideup");
      $(".box-container-edit").addClass("hidden");
      $(".box-container-return").removeClass("hidden");
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
      var value = $(".return-text-container").find(".return-text").html().split(',');
      var infoPresent = $(".info-present");
      infoPresent.find(".price").html( value[0]+"," );
      infoPresent.find(".decimal").html( value[1] );
      infoPresent.find(".edit-present").removeClass("icon-return-circle").addClass("icon-edit-white");
      $(".bar-text-container.expected").find(".number").html( value[0] );
      $(".bar-text-container.expected").find(".decimal").html( value[1] );
      $(".edit-present-container").removeClass("slidedown").addClass("slideup");
      $(".box-container-edit").removeClass("hidden");
      $(".box-container-return").addClass("hidden");
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
    var value = $('.info-future .init-value').val();
    $('.info-future .price').html(value);
    value = value.split(',');
    $('.label-input').show();
    $('.value').html(value[0]);
    $('.decimal').html(value[1]);

  });

  // ACCEDE A LA EDICIÓN DEL PRESUPUESTO FUTURO
  $(document).on('click', '.detail-header .future-detail-edit', function(e) {
    if (!$(this).closest('.flip-container').hasClass("hover")) {
      $(this).closest('.flip-container').addClass("hover");
      var $labelInput = $(this).closest('.flip-container').find(".label-input");
      $('.detail-header .input-future').show().focus();
      $labelInput.on('click', function() {
        $('.detail-header .input-future').show().focus();
      });
    }
  });

  // TRATAMIENTO DEL INPUT DEL MES FUTURO
  $('.detail-header .input-future')
    .on('blur', function() {
      var value = $(this).val().split(',');
      $(this).hide();
      $('.label-input').show();
      $('.value').html(value[0]);
      $('.decimal').html(value[1]);
    })
    .on('focus', function() {
      var $labelInput = $('.label-input');
      var value = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
      $labelInput.hide();
      $(this).val(value);
    })
    .one('focus', function() {
      var $labelInput = $('.detail-header .modify-data .label-input');
      var value = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
      $('.info-future .init-value').html(value);
  });

  // VALIDAR LOS DATOS DEL MES FUTURO
  $('.detail-header .future-detail-check').on('click', function(event) {
    var $labelInput = $('.detail-header .modify-data .label-input');
    var value = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
    $(this).closest('.flip-container').find('.front .price').html(value);
    $(this).closest('.flip-container').removeClass('hover').find('.future-detail-edit').removeClass('icon-edit-white future-detail-edit').addClass('icon-return-circle edit-return');
    event.stopPropagation();
  });


  /******* TIMELINE *********/

  //DESPLEGAR DETALLES
  $('.timeline .fila .button-details').on('click', function(event) {
    var element = $(this).closest('.fila').find('.row-detail-container');
    if (element.hasClass("slideup")) {
      element.removeClass("slideup").addClass("slidedown");
    } else {
      element.removeClass("slidedown").addClass("slideup");
    }
  });

});
