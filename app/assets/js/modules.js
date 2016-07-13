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


        var marginTop         = 10,
            marginProveedores = 100,
            borderWidth       = 2,
            speed             = 450,
            flipContainerHoverClass;

        if( Modernizr.csstransitions )
            flipContainerHoverClass = 'hover';
        else
            flipContainerHoverClass = 'modern-hover';



        // FUNCTIONS FOR MODULES
        function slideContainer($context) {
            var $container = $context.closest('.modules-container');
            var h = $container.find('.active .module-inner-content').outerHeight() + marginTop + borderWidth;
            //$container.find('.active.module-content').height(h);
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

        function changeAttrNoTransition($element, attr, value) {
            $element.addClass('no-transitions');
            $element.css(attr, value);
            setTimeout( function() { $element.removeClass('no-transitions'); }, 1 );
        }

        function changeToSubModule($previousElem, $subModule, $container) {
            var $flipContainer, h;

            $flipContainer = $container.find('.flip-container');

            if( !$subModule.hasClass('front') ) {
                $subModule.addClass('back');
            }
            $subModule.removeClass('hidden');

            h = $subModule.find('.module-inner-content').outerHeight();

            changeAttrNoTransition($subModule, 'height', h+'px');
            h = h + marginTop + borderWidth;

            changeAttrNoTransition($container, 'height', h+'px');

            setTimeout( function() {
                if( !$subModule.hasClass('front') )
                    $flipContainer.addClass(flipContainerHoverClass);
                else
                    $flipContainer.removeClass(flipContainerHoverClass);
            }, 1 );

            if( !$previousElem.hasClass('front') ) {
                setTimeout( function() {
                    $previousElem.addClass('hidden');
                    $previousElem.removeClass('back');
                }, speed );
            }

            $subModule.addClass('active');
            $previousElem.removeClass('active');
        }

        function changeEditButton($context, hide) {
            var $parent = $context.closest('.text-container, .custom-alert-row');
            var $label  = $parent.find('.label-money');
            var $input  = $parent.find('.input-money');
            var $edit   = $parent.find('.edit-money, .edit-subalert');
            var $check  = $edit.closest('.icon-container').find('.check-money, .check-subalert');

            $context.hide();
            if (hide) {
                $check.hide();
                $input.hide();
                $label.text($input.val());
                $label.show();
                $edit.show();
            }
            else {
                $label.hide();
                $input.text($label.val());
                $input.show();
                $check.show();
            }
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
                if ( Modernizr.csstransitions )
                    h = $elem.outerHeight() + h + marginTop;
                else
                    h = $elem.outerHeight() + marginTop;
            }
            else {
                clearStyle($subE);
                if ( Modernizr.csstransitions )
                    h = $elem.outerHeight() - h + marginTop;
                else
                    h = $elem.outerHeight() + marginTop;
            }
            slideUpDown($subE);
            h += borderWidth;
            $(this).closest('.modules-container').css('height', h+'px');
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



        /************************************
        ******* ALERTS MODULE ***************
        ************************************/

        // EDIT VALUE FROM ALERT AND SUBALERT
        $alertsModule.on('click', ".text-container .edit-money, .submodule .edit-subalert", function() {
            changeEditButton($(this), false);
        });

        // CONFIRM EDIT
        $alertsModule.on('click', '.check-money, .check-subalert', function(event){
            changeEditButton($(this), true);
        });

        // CONFIRM EDIT WITH ENTER KEY FROM ALERT AND SUBALERT
        $alertsModule.on('keyup', '.input-money', function(event){
            if(event.which == 13){
                changeEditButton($(this), true);
            }
        });

        // SLIDE UP/DOWN SUBMODULE
        $alertsModule.on('click', '.fila-alert .submodule-button', function() {
            var $submodule = $(this).closest('.fila-alert').find('.submodule');
            if ($submodule.hasClass("slideup")) {
                $submodule.removeClass("slideup").addClass("slidedown");
            } else {
                $submodule.removeClass("slidedown").addClass("slideup");
            }
        });

        // HOVER CHECK
        $alertsModule.find('.check-money, .check-subalert').hover (
            function() {
                $(this).addClass('icon-hover');
            }, function() {
                $(this).removeClass('icon-hover');
            }
        );


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
          ".proveedores-content .alerts-button," +
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
