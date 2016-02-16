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
    var elems = $(this).closest('.container.st-content').find('.modules-container');
    var thisElem = $(this).closest('.fila').find('.modules-container');
    for(var e=0; e < elems.length; e++){
      if($(elems[e]).hasClass('slidedown') && !$(elems[e]).is(thisElem))
        slideUpDown($(elems[e]));
    }
    slideUpDown($(this).closest('.fila').find('.modules-container'));
  });

  // SLIDE UP/DOWN SUBELEMENT
  $(".receipt-detail-content .element-container, .modules-container .prestamo-detail-content .element-container")
    .on('click', function() {
      slideUpDown($(this));
      slideUpDown($(this).find('.triangle'));
      slideUpDown($(this).next('.subelement-container'));
    });

  // CHANGE SUBELEMENT CHECK
  $(".receipt-detail-content .subelement-container .content, .modules-container .prestamo-detail-content .subelement-container .content")
    .on('click', function() {
      var element = $(this).find('.check');
      reverseClass(element, 'icon-check', 'icon-check-green');
    });


  // MODULE ALERTS
  // SLIDE UP/DOWN ALERTS
  $(".receipt-detail-content .element-container-alerts, .prestamo-detail-container .element-container-alerts")
    .on('click', function() {
      var elem = $(this).closest('.fila').find('.alerts-container');
      changeModuleContainerHeight($(this), elem.css('height'));
      if($(this).is('.receipt-detail-content .element-container-alerts'))
        slideUpDown($(this).closest('.fila').find('.receipt-detail-container'));
      else {
        slideUpDown($(this).closest('.fila').find('.prestamo-detail-container'));
      }
      slideUpDown(elem);
    });

  // RETURN TO PRINCIPAL
  $(".alerts-container .button-module, .alerts-container.prestamo .button-module")
    .on('click', function() {
      var elem;
      if($(this).is('.alerts-container.prestamo .button-module')){
        elem = $(this).closest('.fila').find('.prestamo-detail-container');
      }
      else {
        elem = $(this).closest('.fila').find('.receipt-detail-container');
      }
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
      if(!elem.find('.warning-container').hasClass('hidden'))
        elem.find('.warning-container').addClass('hidden');
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
        var elem = $(this).closest('.fila').find('.receipt-detail-container');
        var warning = $(this).closest('.devolver-baja-module-content').find('.warning-container');

        slideUpDown($(this).closest('.devolver-baja-container'));
        slideUpDown(elem);
        changeModuleContainerHeight($(this), elem.css('height'));
      }
    });

  // CANCEL
  $(".devolver-baja-module-content .cancel")
    .on('click', function() {
        var elem = $(this).closest('.fila').find('.receipt-detail-container');
        var warning = $(this).closest('.devolver-baja-module-content').find('.warning-container');

        slideUpDown($(this).closest('.devolver-baja-container'));
        slideUpDown(elem);
        changeModuleContainerHeight($(this), elem.css('height'));
    });


  // MODULE PRESTAMO
  // AMORTIZAR PRESTAMO
  $(".modules-container .prestamo-detail-content .button-module.prestamo")
    .on('click', function() {
        var elem = $(this).closest('.fila').find('.modules-container');
        slideUpDown(elem);
    });

});
