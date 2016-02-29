$(document).ready(function () {
  "use strict";

  function modules() {

    var countDevBaja = 0;

    var marginTop = 10;


    // FUNCTIONS FOR MODULES
    function rebootWarning($context) {
      var $elems, $warning;
      var $container = $context.closest('.modules-container');

      $elems = $container.find('.devolver-baja-container');
      for(var e=0; e < $elems.length; e++) {
        $warning = $($elems[e]).find('.warning-container');
        if(!$warning.hasClass('hidden'))
          $warning.addClass('hidden');
      }
      countDevBaja = 0;
    }

    function slideContainer($context) {
      var $container = $context.closest('.modules-container');
      var h = $container.find('.slidedown .module-inner-content').outerHeight() + marginTop;
      if ($container.hasClass("slideup")) {
        $container.removeClass("slideup").addClass("slidedown");
        $container.css('height', h+'px');
      } else {
        $container.removeClass("slidedown").addClass("slideup");
        $container.removeAttr('style');
      }
    }

    function clearStyle($content) {
      $content.css('height', 0);
    }

    function changeToSubModule($previousElem, $subModule, $container) {
      var h;

      slideUpDown($previousElem);
      slideUpDown($subModule);
      clearStyle($previousElem);

      h = $subModule.find('.module-inner-content').outerHeight() + marginTop;
      $subModule.css('height', h+'px');
      h = h + marginTop;
      $container.css('height', h+'px');
    }


    /************************************************
    ***************** TIMELINE **********************
    *************************************************/

    // MODULE PRINCIPAL
    // DESPLEGAR DETALLES
    $('.timeline .fila .button-details')
    .on('click', function(event) {
      var $elems = $(this).closest('.st-accordion').find('.modules-container');
      var $thisElem = $(this).closest('.fila').find('.modules-container');
      for(var e=0; e < $elems.length; e++){
        if($($elems[e]).hasClass('slidedown') && !$($elems[e]).is($thisElem)){
          slideContainer($($elems[e]));
          rebootWarning($($elems[e]));
        }
      }
      slideContainer($thisElem);
      rebootWarning($thisElem);
    });

    // SLIDE UP/DOWN SUBELEMENT
    $(".receipt-detail-content .element-container, .modules-container .prestamo-detail-content .element-container")
      .on('click', function() {
        var $elem = $(this).closest('.module-inner-content');
        var $subE = $(this).next('.subelement-container');
        var $childs = $subE.find('.content');
        var h = $childs.length * $($childs[0]).outerHeight();

        slideUpDown($(this).find('.triangle'));
        if($subE.hasClass('slideup')){
          $subE.css('height', h+'px');
          h = $elem.outerHeight() + h + marginTop;
        }
        else {
          clearStyle($subE);
          h = $elem.outerHeight() - h + marginTop;
        }
        slideUpDown($subE);
        $(this).closest('.modules-container').css('height', h+'px');
      });

    // CHANGE SUBELEMENT CHECK
    $(".receipt-detail-content .subelement-container .content, .modules-container .prestamo-detail-content .subelement-container .content")
      .on('click', function() {
        var $element = $(this).find('.check');
        reverseClass($element, 'icon-check', 'icon-check-green');
      });


    // MODULE ALERTS (TIMELINE)
    // SLIDE DOWN ALERTS
    $(".timeline .receipt-detail-content .element-container-alerts .name-container,"+
      ".timeline .receipt-detail-content .element-container-alerts .icon-container,"+
      ".timeline .prestamo-detail-content .element-container-alerts .name-container,"+
      ".timeline .prestamo-detail-container .element-container-alerts .icon-container")
      .on('click', function() {
        var $previousElem, h;
        var $container = $(this).closest('.modules-container');
        var $elem = $container.find('.alerts-container');

        if($(this).closest('.element-container-alerts').is('.receipt-detail-content .element-container-alerts')){
          $previousElem = $container.find('.receipt-detail-container');
        }
        else {
          $previousElem = $container.find('.prestamo-detail-container');
        }

        changeToSubModule($previousElem, $elem, $container);
      });

    // RETURN TO PRINCIPAL / SLIDE UP ALERTS
    $(".timeline .alerts-container .button-module, .timeline .alerts-container.prestamo .button-module")
      .on('click', function() {
        var $elem, $container, $content;

        $container = $(this).closest('.modules-container');
        $content = $(this).closest('.alerts-container');
        if($(this).is('.alerts-container.prestamo .button-module')){
          $elem = $(this).closest('.fila').find('.prestamo-detail-container');
        }
        else {
          $elem = $(this).closest('.fila').find('.receipt-detail-container');
        }

        changeToSubModule($content, $elem, $container);
      });


    // MODULES DEVOLVER Y BAJA
    // SLIDE DOWN DEVOLVER Y BAJA
    $(".receipt-detail-content .button-module,"+
      ".receipt-detail-content .bottom-container .link")
      .on('click', function() {
        var $elem;
        var $container = $(this).closest('.modules-container');
        var $previousElem = $container.find('.receipt-detail-container');

        countDevBaja = 0;
        if($(this).is(".receipt-detail-content .button-module")) {
          $elem = $(this).closest('.fila').find('.devolver-baja-container.devolver');
        }
        else {
          $elem = $(this).closest('.fila').find('.devolver-baja-container.baja');
        }

        changeToSubModule($previousElem, $elem, $container);
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
        var $elem, $previousElem, h;
        var $container = $(this).closest('.modules-container');
        var $warning = $(this).closest('.devolver-baja-module-content').find('.warning-container');

        $previousElem = $(this).closest('.devolver-baja-container');
        if(countDevBaja === 0){
          $warning.removeClass('hidden');
          countDevBaja++;
          h = $previousElem.outerHeight() + $warning.outerHeight() + marginTop;
          $container.css('height', h+'px');
        }
        else {
          $elem = $container.find('.receipt-detail-container');
          rebootWarning($(this));
          changeToSubModule($previousElem, $elem, $container);
        }
      });

    // CANCEL
    $(".devolver-baja-module-content .cancel")
      .on('click', function() {
        var $container = $(this).closest('.modules-container');
        var $previousElem = $(this).closest('.devolver-baja-container');
        var $elem = $container.find('.receipt-detail-container');

        rebootWarning($(this));
        changeToSubModule($previousElem, $elem, $container);
      });


    // MODULE PRESTAMO
    // AMORTIZAR PRESTAMO
    $(".modules-container .prestamo-detail-content .button-module.prestamo")
      .on('click', function() {

        slideContainer($(this));
      });



    /************************************************
    ***************** PROVEEDORES *******************
    *************************************************/

    // SLIDE UP/DOWN CONTENIDO
    $(".detail-proveedores .proveedores-header > .dot-container, .detail-proveedores .proveedores-content .icon-ex-container i")
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
              slideContainer($($elems[e]));
            }
          }
          $section.css('max-height', 0);
          slideUpDown($section);
          $dot.removeClass('ocult');
        }
      });

    // SLIDE UP/DOWN ALERTS
    $(".detail-proveedores .proveedores-content i," +
      ".detail-proveedores .proveedores-content .alerts-module-content .button-module," +
      ".detail-proveedores .alerts-container .button-module," +
      ".detail-proveedores .alerts-container.prestamo .button-module")
      .on('click', function() {
        var $thisContainer = $(this).closest('.element-container').find('.modules-container');
        var $elems = $(this).closest('.elements-box').find('.modules-container');
        
        for(var e=0; e < $elems.length; e++){
          if($($elems[e]).hasClass('slidedown') && !$($elems[e]).is($thisContainer)){
            slideContainer($($elems[e]));
          }
        }
        slideContainer($thisContainer);
      });

  }

  modules();

});
