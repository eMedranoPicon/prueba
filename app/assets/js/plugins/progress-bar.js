var progressBar = (function() {

    var $bar_container, porcentaje_complete, max_porcentaje, umbral, speed_default,
        max_width, porcentaje, previsto, gastado;

    max_width            = 899;
    porcentaje_complete  = 100;
    max_porcentaje       = 200;
    umbral               = 25;
    speed_default        = 450;


    function init($bar_container_arg, previsto_arg, gastado_arg) {
        $bar_container = $bar_container_arg;

        if(gastado_arg === undefined) {
            porcentaje = previsto_arg;
        }
        else {
            previsto = previsto_arg;
            gastado = gastado_arg;
            porcentaje = (gastado / previsto) * porcentaje_complete;
        }
    }


    function setMaxWidth(w) {
        max_width = w;
    }

    function animate(startWidth, endWidth, speed) {
        var $progress_bar;

        $progress_bar = $bar_container.find('.progress-bar');
        if (speed === undefined)
            speed = speed_default;

        $progress_bar.addClass('no-transitions');
        $progress_bar.width(startWidth);
        setTimeout(
            function() {
                $progress_bar.removeClass('no-transitions');
                $progress_bar.width(endWidth);
            },
            speed
        );
    }

    function updateProgressBar() {
        var new_bar;

        if(porcentaje <= porcentaje_complete)   new_bar = createNormalBar();
        else                                    new_bar = createOverLoadedBar();

        $bar_container.html(new_bar);

        animateBar();

    }

    function animateBar(speed) {
        var aria_value, bar_width, $dotted_line;

        $dotted_line = $bar_container.find('.dotted-line');

        if(porcentaje <= porcentaje_complete){
            aria_value = porcentaje;
            bar_width = porcentaje;

            animate(0, porcentaje+'%', speed);
        }
        else {
            if ((porcentaje - max_porcentaje) >= 0) {
                aria_value = 0;
                bar_width = porcentaje_complete;
            }
            else {
                aria_value = (max_porcentaje - porcentaje);
                bar_width = (porcentaje - porcentaje_complete);
            }

            animate(porcentaje_complete+'%', aria_value+'%', speed);
        }
    }

    function createNormalBar() {
        var previsto_entero, previsto_decimal, gastado_entero, gastado_decimal, new_bar;

        previsto_entero     =   previsto.toString().split('.')[0];
        previsto_decimal    =   previsto.toString().split('.')[1];
        gastado_entero      =   gastado.toString().split('.')[0];
        gastado_decimal     =   gastado.toString().split('.')[1];

        if (previsto_decimal === undefined)     previsto_decimal = '00';
        if (gastado_decimal === undefined)      gastado_decimal = '00';

        new_bar             =   '';

        if (porcentaje == porcentaje_complete)
            new_bar +=  '<span class="triangulo_izq full"></span>';

        new_bar +=      '<div class="progress border-radius-less">';
        new_bar +=      '   <div class="progress-bar border-radius-less" role="progressbar" aria-valuenow="'+ porcentaje +'" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>';
        if (porcentaje > 0 && porcentaje != porcentaje_complete)
            new_bar +=  '   <span class="triangulo_izq"></span>';

        new_bar +=      '</div>'+
                        '<div class="text-container">' +
                        '   <div class="bar-text-container expected">'+
                        '     <div class="text-content">'+
                        '       <span class="number primary">'+previsto_entero+'</span>,'+
                        '     </div>'+
                        '     <div class="text-content">'+
                        '       <span class="decimal primary">'+previsto_decimal+'</span>'+
                        '     </div>'+
                        '   <div class="text-content">'+
                        '       <span class="coin secondary">€</span>'+
                        '   </div>'+
                        '   </div>'+
                        '   <div class="bar-text-container spent">'+
                        '       <div class="text-content">'+
                        '           <span class="number primary">'+gastado_entero+'</span>,'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="decimal primary">'+previsto_decimal+'</span>'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="coin secondary">€</span>'+
                        '       </div>'+
                        '   </div>'+
                        '</div>';
        return new_bar;
    }

    function createOverLoadedBar() {
        var  previsto_entero, previsto_decimal, gastado_entero, gastado_decimal, new_bar, aria_value, bar_width;

        previsto_entero     =   previsto.toString().split('.')[0];
        previsto_decimal    =   previsto.toString().split('.')[1];
        gastado_entero      =   gastado.toString().split('.')[0];
        gastado_decimal     =   gastado.toString().split('.')[1];

        if (previsto_decimal === undefined)     previsto_decimal = '00';
        if (gastado_decimal === undefined)      gastado_decimal = '00';

        new_bar             =   '';

        if ((porcentaje - max_porcentaje) >= 0){
            aria_value = 0;
            bar_width = porcentaje_complete;
        }
        else {
            aria_value = (max_porcentaje - porcentaje);
            bar_width = (porcentaje - porcentaje_complete);
        }

        new_bar +=      '<span class="triangulo_izq-overload"></span>'+
                        '<div class="progress over-loaded border-radius-less">'+
                        '   <div class="progress-bar border-radius-less" role="progressbar" aria-valuenow="'+aria_value+'" aria-valuemin="0" aria-valuemax="100" style="width: '+aria_value+'%"></div>'+
                        '</div>'+
                        '<div class="line-container">';

        if (aria_value > umbral) {
            new_bar +=  '   <div class="dotted-line" style="width: '+bar_width+'%"></div>'+
                        '   <div class="bar-text-container expected">'+
                        '       <div class="icon-container">'+
                        '           <i class="warning icon-warning"></i>'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="number primary">'+previsto_entero+'</span>,'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="decimal primary">'+previsto_decimal+'</span>'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="coin secondary">€</span>'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="text">Superando presupuesto</span>'+
                        '       </div>'+
                        '   </div>';
        }
        else {
            new_bar +=  '   <div class="dotted-line right" style="margin-right: '+((porcentaje_complete - bar_width) -0.2 )+'%"></div>'+
                        '   <div class="bar-text-container expected right">'+
                        '       <div class="icon-container">'+
                        '           <i class="warning icon-warning"></i>'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="number primary">'+previsto_entero+'</span>,'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="decimal primary">'+previsto_decimal+'</span>'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="coin secondary">€</span>'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="text">Superando presupuesto</span>'+
                        '       </div>'+
                        '   </div>';
        }

        if (aria_value > umbral) {
            new_bar +=  '   <div class="bar-text-container spent">'+
                        '       <div class="text-content">'+
                        '           <span class="number primary">'+gastado_entero+'</span>,'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="decimal primary">'+gastado_decimal+'</span>'+
                        '       </div>'+
                        '       <div class="text-content">'+
                        '           <span class="coin secondary">€</span>'+
                        '       </div>'+
                        '   </div>';
        }

        new_bar += '</div>';

        if(aria_value <= umbral) {
            new_bar +=  '<div class="bar-text-container spent right">'+
                        '   <div class="text-content">'+
                        '       <span class="number primary">'+gastado_entero+'</span>,'+
                        '   </div>'+
                        '   <div class="text-content">'+
                        '       <span class="decimal primary">'+gastado_decimal+'</span>'+
                        '   </div>'+
                        '   <div class="text-content">'+
                        '       <span class="coin secondary">€</span>'+
                        '   </div>'+
                        '</div>';
        }

        return new_bar;
    }

    function getPorcentajeComplete() {
        return porcentaje_complete;
    }

    return {
        init: init,

        setMaxWidth: setMaxWidth,

        updateProgressBar: updateProgressBar,

        animateBar: animateBar,

        createNormalBar: createNormalBar,

        createOverLoadedBar: createOverLoadedBar,

        getPorcentajeComplete: getPorcentajeComplete,
    };

}());
