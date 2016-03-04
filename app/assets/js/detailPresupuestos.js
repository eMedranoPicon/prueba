/*
  Controladores de la pagina detail
*/
var detailPresupuestos = (function() {

  var flipContainerHoverClass;

  var namespace = '.detail-presupuestos';

  var $root,
      $header,
      $proveedores;


  // JQUERY CONTROLLERS
  function initControllers(hoverClass) {

    flipContainerHoverClass = hoverClass;

    $root = $(namespace);

    $header = $root.find('.detail-header');

    $proveedores = $root.find('.detail-proveedores');


    /************************************************
    ***************** DETAIL HEADER *****************
    *************************************************/

    // SLIDE UP/DOWN EDIT PRESENT PREVISION
    $header.on('click', '.edit-present', function() {
        var $editPresentContainer = $(this).closest('.section-header').find(".edit-present-container");
        slideUpDown($editPresentContainer);

      });

    // SLIDE UP/DOWN RETURN PRESENT PREVISION
    $header.on('click', '.edit-present.icon-return-circle', function() {
        var $returnPresentContainer = $(this).closest('.section-header').find(".return-present-container");
        slideUpDown($returnPresentContainer);
      });

    // VALIDAR MODIFICACIÓN DEL MES PRESENTE
    $header.on("click", ".check-edit", function() {
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
      $header.find(".icon-check-circle, .icon-check-circle-orange")
        .hover ( function() {
          reverseClass($(this), 'icon-check-circle', 'icon-check-circle-orange');
        });


    // TRATAMIENTO DEL RETURN DE AJUSTE MANUAL
    $header.on("click", '.check-return', function() {
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
      });

    // RESTAURAR EL VALOR FUTURO POR DEFECTO
    $header.on('click', '.info-future .edit-return', function(event) {
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
    $header.on('click', '.future-detail-edit', function(e) {
      if (!$(this).closest('.flip-container').hasClass(flipContainerHoverClass)) {
        $(this).closest('.flip-container').addClass(flipContainerHoverClass);
        var $labelInput = $(this).closest('.flip-container').find(".label-input");
        var $flipper = $(this).closest('.flipper');
        $flipper.find('.input-future').show().focus();
        $labelInput.on('click', function() {
          $flipper.find('.input-future').show().focus();
        });
      }
    });

    // TRATAMIENTO DEL INPUT DEL MES FUTURO
    $header.find('.input-future')
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
    $header.on('click', '.future-detail-check', function(event) {
      var $labelInput = $(this).closest('.flipper').find('.modify-data .label-input');
      var $flipContainer = $(this).closest('.flip-container');
      var value = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
      $flipContainer.find('.front .price').html(value);
      $flipContainer.removeClass(flipContainerHoverClass).find('.future-detail-edit').removeClass('icon-edit-white future-detail-edit').addClass('icon-return-circle edit-return');
      event.stopPropagation();
    });



    /************************************************
    ***************** PROVEEDORES *******************
    *************************************************/

    // SLIDE UP/DOWN CONTENIDO
    $proveedores.find(
      ".proveedores-header > .dot-container,"+
      ".proveedores-content .icon-ex-container i")
      .on('click', function() {
        var $elems;
        var $section = $(this).closest('.proveedores-container').find('.proveedores-content');
        var $box = $section.find('.elements-box');
        var height = parseInt($box.css('height').split('px')[0]) + 100;
        var $dot = $('.detail-proveedores .proveedores-header > .dot-container');

        if ($section.hasClass("slideup")) {
          $section.css('max-height', height+'px');
          slideUpDown($section);
          $dot.addClass('ocult');
        } else {
          $elems = $(this).closest('.proveedores-content').find('.module');
          for(var e=0; e < $elems.length; e++){
            if($($elems[e]).hasClass('slidedown')){
              modules.slideContainer($($elems[e]));
            }
          }
          $section.css('max-height', 0);
          slideUpDown($section);
          $dot.removeClass('ocult');
        }
      });

    // SLIDE UP/DOWN ALERTS
    $proveedores.find(
      ".proveedores-content i," +
      ".proveedores-content .alerts-module-content .button-module," +
      ".alerts-container .button-module," +
      ".alerts-container.prestamo .button-module")
      .on('click', function() {
        var $thisContainer = $(this).closest('.element-container').find('.modules-container');
        var $elems = $(this).closest('.elements-box').find('.modules-container');

        for(var e=0; e < $elems.length; e++){
          if($($elems[e]).hasClass('slidedown') && !$($elems[e]).is($thisContainer)){
            modules.slideContainer($($elems[e]));
          }
        }
        modules.slideContainer($thisContainer);
      });
  }

  return {
    initControllers: initControllers
  };
})();
