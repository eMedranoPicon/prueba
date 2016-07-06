/*
 * Controladores genéricos para los módulos
 */
 $(document).ready(function () {
   "use strict";
    function notifications() {

        var $notification;

        var notificationName  = '.zonaNotificaciones';

        var budget_list = ['Vivienda', 'Formación', 'Tarjeta', 'Seguros', 'Otros', 'Educación', 'Préstamos'],

            month_list  = ['Mensual', 'Bimensual', 'Trimestral', 'Semestral', 'Anual', ''],

            budget_selected = 0,

            month_selected  = 0;



        // FUNCTIONS
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

        /*****************************
        ****** JQUERY CONTROLLERS ****
        *****************************/
        $notification       = $(notificationName);


        // OPEN/CLOSE DROPDOWN
        $notification.find(".dropdown-head")
        .on('click', function() {

            var $content = $(this).next();
            slideUpDown($content);

        });


        // SELECT ELEMENT
        $notification.find(".dropdown-content li").not('.input-month-container')
        .on('click', function() {
            var list, selected_index;
            var $_this          = $(this),
                $container      = $_this.closest('.dropdown-container'),
                isBudget        = $container.hasClass('budget'),
                $head           = $container.find('.dropdown-head .text-head'),
                prev_text       = $head.text(),
                $elems          = $_this.parent().children(),
                selected_text   = $_this.find('span').text();

            list = (isBudget) ? budget_list : month_list;

            $elems.each(function(index, value) {
                if ( $(this).is($_this) ) {
                    selected_index = index;
                    $(this).addClass('hidden');
                }
                if ( $(this).find('span').text() === prev_text ) {
                    $(this).removeClass('hidden');
                }
            });

            if (isBudget) {
                $head.text(budget_list[selected_index]);
            }
            else {
                $head.text(month_list[selected_index]);
            }

            $head.addClass('confirm');
        });


    }

    notifications();

});
