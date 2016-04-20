/*
 * Controladores genéricos para los módulos
 */
 $(document).ready(function () {
   "use strict";
    function modules() {

        var $root,
            $proveedores,
            $receiptModule,
            $prestamoModule,
            $alertsModule,
            $devolverBajaModule;

        var rootName          = '.modules-container',
            proveedoresName   = '.detail-presupuestos .detail-proveedores',
            receiptName       = '.receipt-detail-content',
            prestamoName      = '.prestamo-detail-content',
            alertsName        = '.alerts-module-content',
            devolverBajaName  = '.devolver-baja-module-content';


        var countDevBaja = 0,
            marginTop = 10;


        // FUNCTIONS FOR MODULES
        function slideContainer($context) {
            var $container = $context.closest('.modules-container');
            var h = $container.find('.slidedown .module-inner-content').outerHeight() + marginTop;
            $container.find('.slidedown.module-content').height(h);
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

            slideContainer($previousElem);
            slideUpDown($previousElem);
            clearStyle($previousElem);
            setTimeout(
                function(){
                    slideUpDown($subModule);


                    h = $subModule.find('.module-inner-content').outerHeight() + marginTop;
                    $subModule.css('height', h+'px');
                    h = h + marginTop;
                    slideContainer($subModule);
                    $container.css('height', h+'px');
                },
                600
            );
        }

        // JQUERY CONTROLLERS
        $root               = $(rootName);
        $proveedores        = $(proveedoresName);
        $receiptModule      = $root.find(receiptName);
        $prestamoModule     = $root.find(prestamoName);
        $alertsModule       = $root.find(alertsName);
        $devolverBajaModule = $root.find(devolverBajaName);


        /***************************************
        ******* RECEIPT PRESTAMO MODULES *******
        ***************************************/

        // SLIDE UP/DOWN SUBELEMENT
        $root.find(
            ".receipt-detail-content .element-container,"+
            ".prestamo-detail-content .element-container")
        .on('click', function() {
            var $elem, $subElem, $subE, $childs, h;

            $elem = $(this).closest('.module-inner-content');
            $subE = $(this).next('.subelement-container');
            $childs = $subE.find('.content');
            h = $childs.length * $($childs[0]).outerHeight();

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
            $(this).closest('.module-content').css('height', h+'px');
        });

        // CHANGE SUBELEMENT CHECK
        $root.find(
            ".receipt-detail-content .subelement-container .content,"+
            ".prestamo-detail-content .subelement-container .content")
        .on('click', function() {
            var $element = $(this).find('.check');
            reverseClass($element, 'icon-check', 'icon-check-green');
        });

        //STOP PROPAGATION IF INPUT IS CLICKED
        $root.find(
            ".receipt-detail-content .subelement-container .content input,"+
            ".prestamo-detail-content .subelement-container .content input")
        .on('click', function(e) {
            e.stopPropagation();
        });

        // AMORTIZAR PRESTAMO
        $root.find(".prestamo-detail-content .button-module.prestamo")
        .on('click', function() {
            var $button_row = $(this).closest('.fila').find('.button-details');

            if($button_row.hasClass('selected')) {
              $button_row.removeClass('selected');
            }
            slideContainer($(this));
        });


        // SLIDE DOWN DEVOLVER Y BAJA
        $receiptModule.find(
            ".button-module,"+
            ".bottom-container .link")
        .on('click', function() {
            var $elem, $container, $previousElem;

            $container = $(this).closest('.modules-container');
            $previousElem = $container.find('.receipt-detail-container');
            countDevBaja = 0;

            if($(this).is(".receipt-detail-content .button-module")) {
                $elem = $(this).closest('.fila').find('.devolver-baja-container.devolver');
            }
            else {
                $elem = $(this).closest('.fila').find('.devolver-baja-container.baja');
            }
            changeToSubModule($previousElem, $elem, $container);
          });



        /************************************
        ******* DEVOLVER BAJA MODULES *******
        ************************************/

        // HOVER ENLACE SMS
        $devolverBajaModule.find(".link-container")
        .hover(function() {
            $(this).find('i').addClass('icon-hover');
            $(this).find('a').addClass('hover');
        }, function() {
            $(this).find('i').removeClass('icon-hover');
            $(this).find('a').removeClass('hover');
        });

        // CONFIRM OR CANCEL
        $devolverBajaModule.on('click', ".confirm, .cancel", function() {
            var $elem, $previousElem, $container;

            $container      = $(this).closest('.modules-container');
            $previousElem   = $(this).closest('.devolver-baja-container');
            $elem           = $container.find('.receipt-detail-container');

            changeToSubModule($previousElem, $elem, $container);
        });


        /********************************************
        ***************** TIMELINE ******************
        ********************************************/

        var $timeline_root = $('.timeline');

        // MODULE PRINCIPAL
        // DESPLEGAR DETALLES
        $timeline_root.find('.fila .button-details')
        .on('click', function(event) {
          var $elems = $(this).closest('.st-accordion').find('.modules-container');
          var $thisElem = $(this).closest('.fila').find('.modules-container');
          for(var e=0; e < $elems.length; e++){
            $($elems[e]).closest('.fila').find('.button-details').removeClass('selected');
            if($($elems[e]).hasClass('slidedown') && !$($elems[e]).is($thisElem)) {
              slideContainer($($elems[e]));
            }
          }
          if($thisElem.hasClass('slideup')) {
            $(this).addClass('selected');
          }
          slideContainer($thisElem);
        });

        // MODULE ALERTS (TIMELINE)
        // SLIDE DOWN ALERTS
        $timeline_root.find(
          ".receipt-detail-content .element-container-alerts .icon-container,"+
          ".prestamo-detail-content .element-container-alerts .icon-container")
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
        $timeline_root.find(
          ".alerts-container .button-module,"+
          ".alerts-container.prestamo .button-module")
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
                          slideContainer($($elems[e]));
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
                      slideContainer($($elems[e]));
                  }
              }
              slideContainer($thisContainer);
          });

    }

    modules();

});
