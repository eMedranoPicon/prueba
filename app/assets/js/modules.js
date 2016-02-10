$(document).ready(function () {
  "use strict";
  var countDevBaja = 0;

  //FUNCTIONS
  function changeModuleContainerHeight(context, h) {
    context.closest('.fila').find('.modules-container').css('height', h+'px');
  }

  // MODULE PRINCIPAL
  // DESPLEGAR DETALLES
  $('.timeline .fila .button-details')
  .on('click', function(event) {
    slideUpDown($(this).closest('.fila').find('.modules-container'));
  });

  // SLIDE UP/DOWN SUBELEMENT
  $(".receipt-detail-content .element-container")
    .on('click', function() {
      slideUpDown($(this));
      slideUpDown($(this).find('.triangle'));
      slideUpDown($(this).next('.subelement-container'));
    });

  // CHANGE SUBELEMENT CHECK
  $(".receipt-detail-content .subelement-container .content")
    .on('click', function() {
      var element = $(this).find('.check');
      reverseClass(element, 'icon-check', 'icon-check-green');
    });


  // MODULE ALERTS
  // SLIDE UP/DOWN ALERTS
  $(".receipt-detail-content .element-container-alerts")
    .on('click', function() {
      var elem = $(this).closest('.fila').find('.alerts-container');
      changeModuleContainerHeight($(this), elem.css('height'));
      slideUpDown($(this).closest('.fila').find('.receipt-detail-container'));
      slideUpDown(elem);
    });

  // RETURN TO PRINCIPAL
  $(".alerts-container .button-module")
    .on('click', function() {
      var elem = $(this).closest('.fila').find('.receipt-detail-container');
      changeModuleContainerHeight($(this), elem.css('height'));
      slideUpDown($(this).closest('.fila').find('.alerts-container'));
      slideUpDown(elem);
    });


  // MODULES DEVOLVER Y BAJA
  // SLIDE UP/DOWN DEVOLVER Y BAJA
  $(".receipt-detail-content .button-module,"+
    ".receipt-detail-content .bottom-container .link")
    .on('click', function() {
      countDevBaja = 0;
      var elem;
      if($(this).is(".receipt-detail-content .button-module")) {
        elem = $(this).closest('.fila').find('.devolver-baja-container.devolver');
      }
      else {
        elem = $(this).closest('.fila').find('.devolver-baja-container.baja');
      }
      slideUpDown($(this).closest('.fila').find('.receipt-detail-container'));
      slideUpDown(elem);
      changeModuleContainerHeight($(this), elem.css('height')+90);
    });

  //HOVER ENLACE SMS
  $(".devolver-baja-module-content .link-container")
    .hover(function() {
      $(this).find('i').addClass('icon-hover');
      $(this).find('a').addClass('hover');
    }, function() {
      $(this).find('i').removeClass('icon-hover');
      $(this).find('a').removeClass('hover');
    });

  // CONFIRM
  $(".devolver-baja-module-content .confirm")
    .on('click', function() {
      if(countDevBaja == 0){
        $(this).closest('.devolver-baja-module-content').find('.warning-container').removeClass('hidden');
        countDevBaja++;
      }
      else {
        countDevBaja = 0;
        var elem = $(this).closest('.fila').find('.receipt-detail-container');
        var warning = $(this).closest('.devolver-baja-module-content').find('.warning-container');

        if(!warning.hasClass('hidden'))
          warning.addClass('hidden');

        slideUpDown($(this).closest('.devolver-baja-container'));
        slideUpDown(elem);
        changeModuleContainerHeight($(this), elem.css('height'));
      }
    });

  // CANCEL
  $(".devolver-baja-module-content .cancel")
    .on('click', function() {
        countDevBaja = 0;
        var elem = $(this).closest('.fila').find('.receipt-detail-container');
        var warning = $(this).closest('.devolver-baja-module-content').find('.warning-container');

        if(!warning.hasClass('hidden'))
          warning.addClass('hidden');

        slideUpDown($(this).closest('.devolver-baja-container'));
        slideUpDown(elem);
        changeModuleContainerHeight($(this), elem.css('height'));
    });

});
