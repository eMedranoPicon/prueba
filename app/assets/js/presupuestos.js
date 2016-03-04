/*
  Controladores de la pagina index
*/
var presupuestos = (function() {

  var flipContainerHoverClass;


  // JQUERY CONTROLLERS
  function initControllers(hoverClass) {

    flipContainerHoverClass = hoverClass;

    // SLIDE UP/DOWN CALENDAR
    $(".calendary-interaction")
      .on('click', function() {

        slideUpDown( $('ul.calendary') );
      })
      .hover (
        function() {
          $(this).find('.icon-calendar-new').addClass('icon-hover');
        }, function() {
          $(this).find('.icon-calendar-new').removeClass('icon-hover');
        }
      );

    // HOVER EN LOS ICONOS DE LOS PRESUPUESTOS FUTUROS
    $(".icon-edit, .check-future, .icon-edit-white") .hover(
      function() {
        $(this).addClass('icon-hover');
      }, function() {
        $(this).removeClass('icon-hover');
      }
    );

    // TRAS MODIFICAR LOS DATOS DE UN PRESUPUESTO FUTURO
    $('.check-future').on('click', function(event) {
      $(this).closest('.flip-container').removeClass(flipContainerHoverClass).find('.icon-edit').removeClass('icon-edit').addClass('icon-return-circle edit-return');
      event.stopPropagation();
    });

    // RESTAURAR EL VALOR POR DEFECTO
    $('.presupuestos .info-general.front').on('click', 'i.edit-return', function() {
      var value;
      var id = $(this).data('id');

      $(this).addClass('icon-edit').removeClass('icon-return-circle edit-return');
      value = $('#init-value' + id).val().split(',');
      $('#label-input' + id).show();
      $('.value'+id).html(value[0]);
      $('.decimal'+id).html(value[1]);
    });

    // ACCEDE A LA EDICIÓN DEL PRESUPUESTO FUTURO
    $('.presupuestos .info-general.front').on('click', '.icon-edit', function() {
      var $labelInput, labelID;
      var $flip = $(this).closest('.flip-container');

      if (!$flip.hasClass(flipContainerHoverClass)) {
        $flip.addClass(flipContainerHoverClass);
        $labelInput = $flip.find(".label-input");
        if($labelInput.length){
          labelID = $labelInput.attr('for');
          $('#'+labelID).show().focus();
          $labelInput.on('click', function() {
            $('#'+labelID).show().focus();
          });
        }
      }
    });

    // TRATAMIENTO DEL INPUT
    $('.my-input')
      .on('blur', function() {
        var id = $(this).data('id');
        var value = $(this).val().split(',');
        $(this).hide();
        $('#label-input' + id).show();
        $('.value'+id).html(value[0]);
        $('.decimal'+id).html(value[1]);
      })
      .on('focus', function() {
        var $labelInput = $('#label-input' + $(this).data('id'));
        var value = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
        $labelInput.hide();
        $(this).val(value);
      })
      .one('focus', function() {
        var $labelInput = $('#label-input' + $(this).data('id'));
        var value = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
        $('#init-value' + $(this).data('id')).html(value);
    });
  }

  return {
    initControllers: initControllers
  };
})();
