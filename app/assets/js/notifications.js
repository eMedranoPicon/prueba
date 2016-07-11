/*
 * Controladores genéricos para los módulos
 */
 $(document).ready(function () {
   "use strict";
    function notifications() {

        var $notification,
            $dropdown,
            $input;

        var notificationName  = '.zonaNotificaciones',
            dropdownName      = '.dropdown-container',
            inputName         = '.input-month';


        var budget_list = ['Vivienda', 'Formación', 'Tarjeta', 'Seguros', 'Otros', 'Educación', 'Préstamos'],
            month_list  = ['Mensual', 'Bimensual', 'Trimestral', 'Semestral', 'Anual', ''],
            budget_selected = 0,
            month_selected  = 0,
            min_input   = 1,
            max_input   = 12;



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
        $notification = $(notificationName);

        $dropdown     = $notification.find(dropdownName);

        $input        = $dropdown.find(".dropdown-content li "+ inputName);


        // CONFIG THE INPUTS
        setMinMaxInput($input, min_input, max_input);


        // OPEN/CLOSE DROPDOWN
        $dropdown.find(".dropdown-head")
        .on('click', function() {

            var $content = $(this).next();
            slideUpDown($content);

        });


        // SELECT ELEMENT
        $dropdown.find(".dropdown-content li").not('.input-month-container')
        .on('click', function() {
            var selected_index;
            var $_this          = $(this),
                $container      = $_this.closest('.dropdown-container'),
                isBudget        = $container.hasClass('budget'),
                $head           = $container.find('.dropdown-head .text-head'),
                prev_text       = $head.text(),
                $elems          = $_this.parent().children(),
                selected_text   = $_this.find('span').text();

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

            slideUpDown($_this.closest('.dropdown-content'));
        });


        // ENTER INPUT MONTH
        $input.keyup(function(event){
            event.preventDefault();
            if(event.which == 13 && $(this).val() !== ''){
                var selected_index, months_text = 'meses';
                var $_this          = $(this),
                    $container      = $_this.closest('.dropdown-container'),
                    $head           = $container.find('.dropdown-head .text-head'),
                    prev_text       = $head.text(),
                    $elems          = $_this.closest('.dropdown-list').children();


                $elems.each(function(index, value) {
                    if ( $(this).find('span').text() === prev_text ) {
                        $(this).removeClass('hidden');
                    }
                });

                if ( $_this.val() === '1' )
                    months_text = 'mes';

                $head.text($_this.val() + ' ' + months_text);

                $head.addClass('confirm');

                slideUpDown($_this.closest('.dropdown-content'));
            }
        });


        // CONFIRM SELECTION
        $notification.find(".botonera-selector .check-selection")
        .on('click', function() {
            var confirm     = false,
                $header  = $(this).siblings('.dropdown-container').find('.text-head'),
                $confirm_text = $(this).closest('.caja_notificaciones').find('.confirm-text');


            $header.each(function() {
                if ($(this).hasClass('confirm'))
                    confirm = true;
            });
            if (confirm) {
                $(this).find('i').removeClass('icon-check').addClass('icon-check-green');
                $confirm_text.removeClass('hidden');
            }

        });


        // OPEN/CLOSE LINK CATEGORY ALERT MODULE
        $notification.find(
          ".botonera-link .change-category-link," +
          ".alerts-container .button-module," +
          ".alerts-container .button-module")
          .on('click', function(e) {
              e.preventDefault();
              var $container = $(this).closest('.caja_notificaciones').find('.modules-container');
              slideUpDown($container);
          });


    }

    notifications();

});
