/*
 * Controladores genéricos para los módulos
 */
 $(document).ready(function () {
   "use strict";
    function notifications() {

        var $root,
            $proveedores,
            $receiptModule,
            $prestamoModule,
            $alertsModule,
            $devolverBajaModule;

        var rootName          = '.zonaNotificaciones',
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

    }

    notifications();

});
