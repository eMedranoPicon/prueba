/*
Controladores de la pagina detail
*/
$(document).ready(function () {
    "use strict";
    function detailPresupuestos() {

        var flipContainerHoverClass;

        if( Modernizr.csstransitions )
            flipContainerHoverClass = 'hover';
        else
            flipContainerHoverClass = 'modern-hover';


        var namespace = '.detail-presupuestos';

        var $root,
            $header,
            $proveedores,
            $bar_container,
            $progress_bar,
            porcentaje_complete,
            speed;


        function animateDetailBar() {
            var bar_width, porcentaje;

            bar_width   = parseFloat($progress_bar.attr('aria-valuenow'));

            if($progress_bar.parent('.progress').hasClass('over-loaded'))
                porcentaje  = (porcentaje_complete - bar_width) + porcentaje_complete;
            else
                porcentaje  = bar_width;

            progressBar.init($bar_container, porcentaje);
            progressBar.animateBar(speed);
        }


        // JQUERY CONTROLLERS

        $root                   = $(namespace);
        $header                 = $root.find('.detail-header');
        $proveedores            = $root.find('.detail-proveedores');
        $bar_container          = $header.find('.section-header.actived .bar-container');
        $progress_bar           = $bar_container.find('.progress-bar');
        porcentaje_complete     = progressBar.getPorcentajeComplete();
        speed                   = 450;

        /************************************************
        ***************** DETAIL HEADER *****************
        *************************************************/

        // ANIMATE PROGRESS BAR WHEN PAGE IS LOADED
        animateDetailBar();

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

        // TRATAR PULSACIÓN ENTER DURANTE MODIFICACIÓN DEL MES PRESENTE
        $header.find('.edit-present-container .edit-text')
        .keyup(function(event){
            if(event.keyCode == 13){
                $header.find('.check-edit').click();
            }
        });

        // VALIDAR MODIFICACIÓN DEL MES PRESENTE
        $header.on("click", ".check-edit", function() {
            var $section, value, $infoPresent, previsto, gastado;

            $section    = $(this).closest('.section-header');
            value       = $section.find(".edit-present-container .edit-text").val().split(',');
            gastado     = stringToInt($section.find(".spent .number").html()) + ( parseInt($section.find(".spent .decimal").html()) / 100 );
            previsto    = stringToInt(value[0]) + (parseInt(value[1]) / 100);
            $infoPresent = $section.find(".info-present");


            $infoPresent.find(".price").html( value[0]+"," );
            $infoPresent.find(".decimal").html( value[1] );
            $infoPresent.find(".edit-present").removeClass("icon-edit-white").addClass("icon-return-circle");
            $section.find(".bar-text-container.expected .number").html( value[0] );
            $section.find(".bar-text-container.expected .decimal").html( value[1] );
            $section.find(".edit-present-container").removeClass("slidedown").addClass("slideup");
            $section.find(".box-container-edit").addClass("hidden");
            $section.find(".box-container-return").removeClass("hidden");

            progressBar.init($section.find('.bar-container'), previsto, gastado);
            progressBar.updateProgressBar();
        });

        // CAMBIO DE ICONO A NARANJA
        $header.find(".icon-check-circle, .icon-check-circle-orange")
        .hover ( function() {
            reverseClass($(this), 'icon-check-circle', 'icon-check-circle-orange');
        });


        // TRATAMIENTO DEL RETURN DE AJUSTE MANUAL
        $header.on("click", '.check-return', function() {
            var $section, value, $infoPresent, previsto, gastado;

            $section    = $(this).closest('.section-header');
            value       = $section.find(".return-text-container").find(".return-text").html().split(',');
            $infoPresent = $section.find(".info-present");
            gastado     = stringToInt($section.find(".spent .number").html()) + ( $section.find(".spent .decimal").html() / 100 );
            previsto    = stringToInt(value[0]) + (parseInt(value[1]) / 100);

            $infoPresent.find(".price").html( value[0]+"," );
            $infoPresent.find(".decimal").html( value[1] );
            $infoPresent.find(".edit-present").removeClass("icon-return-circle").addClass("icon-edit-white");
            $section.find(".bar-text-container.expected .number").html( value[0] );
            $section.find(".bar-text-container.expected .decimal").html( value[1] );
            $section.find(".edit-present-container").removeClass("slidedown").addClass("slideup");
            $section.find(".box-container-edit").removeClass("hidden");
            $section.find(".box-container-return").addClass("hidden");

            progressBar.init($section.find('.bar-container'), previsto, gastado);
            progressBar.updateProgressBar();
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
            var $flipper, value;

            $flipper    = $(this).closest('.flipper');
            value       = $(this).val().split(',');

            $(this).hide();
            $flipper.find('.label-input').show();
            $flipper.find('.value').html(value[0]);
            $flipper.find('.decimal').html(value[1]);
        })
        .on('focus', function() {
            var $labelInput, value;

            $labelInput = $(this).closest('.flipper').find('.label-input');
            value       = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
            $labelInput.hide();
            $(this).val(value);
        })
        .one('focus', function() {
            var $labelInput, value;

            $labelInput = $(this).closest('.flipper').find('label-input');
            value       = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
            $(this).closest('.flipper').find('.info-future .init-value').html(value);
        })
        .keyup(function(event){
            if(event.keyCode == 13){
                $header.find('.future-detail-check').click();
            }
        });

        // VALIDAR LOS DATOS DEL MES FUTURO
        $header.on('click', '.future-detail-check', function(event) {
            var $labelInput, $flipContainer, value;

            $labelInput     = $(this).closest('.flipper').find('.modify-data .label-input');
            $flipContainer  = $(this).closest('.flip-container');
            value           = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();

            $flipContainer.find('.front .price').html(value);
            $flipContainer.removeClass(flipContainerHoverClass).find('.future-detail-edit').removeClass('icon-edit-white future-detail-edit').addClass('icon-return-circle edit-return');
            event.stopPropagation();
        });

    }

    detailPresupuestos();
});
