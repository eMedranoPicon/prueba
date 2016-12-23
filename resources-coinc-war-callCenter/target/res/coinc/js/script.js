elige_notificacion_mostrada = false;
id_notificacion_actual = 0;
metaExtId = "";

$( document ).ready(function() {

    /*Selector Elige una Meta */
    $('.js-openDropdown').on('click', function() {

        if  ($(this).hasClass('isOpen') ){
            $(this).removeClass('isOpen');
        } else {
            $(this).addClass('isOpen');
        };

        $(this).children('span').toggleClass('ico-flecha-abajo ico-flecha-arriba')

    });

    $('.dropdown_placeholder > li').on('click',function() {
        if  ($(this).hasClass('isCurrent') ){
        } else {
            $(this).parent().children().removeClass('isCurrent');
            $(this).addClass('isCurrent');
        }
    });

    /* Dropdown de acciones */

    (function($, window, document, undefined) {
        var $html = $('html');

        $html.on('click.ui.dropdown tap.ui.dropdown', '.js-dropdown', function(e) {
            e.preventDefault();
            $(this).toggleClass('is-open');
        });

        $html.on('click.ui.dropdown tap.ui.dropdown', '.js-dropdown [data-dropdown-value]', function(e) {
            e.preventDefault();
            var $self = $(this);
            var $dropdown = $self.parents('.js-dropdown');
            $dropdown.find('.js-dropdown__input').val($self.data('dropdown-value'));
            $dropdown.find('.js-dropdown__current').text($self.text());
        });

        $html.on('click.ui.dropdown tap.ui.dropdown', function(e) {
            var $target = $(e.target);
            if (!$target.parents().hasClass('js-dropdown')) {
                $('.js-dropdown').removeClass('is-open');
            }
        });
    })(jQuery, window, document);

    /*Alternar respuesta */
    $('.alternar-btn').on('click',function(e) {
        $(this).parent().parent().parent().find('.contenido').toggleClass('mostrar-todo mostrar-menos');
        var puntos = $(this).parent().parent().parent().find('.puntos_suspensivos');
        $(this).parent().parent().parent().find('.puntos_suspensivos').toggleClass('visivle no-visible');
        $(this).toggleClass('mas menos');
        e.preventDefault();
    });

    $('.alternar-btn-error').on('click',function(e) {
        $(this).parent().parent().parent().prev().toggleClass('mostrar-todo mostrar-menos');
        $(this).toggleClass('mas menos');
        e.preventDefault();
    });

    /* Mostrar y Ocultar Elige Meta */
    $("#formST").hide();
    $('.eligeMeta').hide();

    $('.icono_cerrar2').on('click',function(e) {
        $(this).closest('.eligeMeta').slideUp();
        $(this).parent('.caja_detalleinfo').slideUp();
        e.preventDefault();
        $('.botondashboard').removeClass('active');
    });

    $('.icoinfo').on('click', function(e){
        $(this).parents('.cajacoinc').next().slideToggle();
        e.preventDefault();

    });

    //init_eligeMetaComercial();
    $('.js-boton-mostrar').on('click', function(e) {
        //Cambiar la clase de la flecha si es distinta y lo oculta
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parents().next('.eligeMeta').slideUp();
            if($(this).attr("name") == "ahorrar-ahora" || $(this).attr("name") == "amazon"){
                if ($('#eligeMetaNotificaciones').offset()){
                    var act_top = $('#eligeMetaNotificaciones').offset().top-86;
                    $('#eligeMetaNotificaciones').css('top',act_top+'px');
                }
            }
        }else if ($(this).attr("name") == "ahorrar"){
            $('.botondashboard').removeClass('active');
            $(this).parents().next('.eligeMeta').slideUp();
            $(this).addClass('active');
            $(this).parents().next('.eligeMeta').find('.flecha').css("left", "72%");
            $(this).parents().next('.eligeMeta').slideDown();
        }else if ($(this).attr("name") == "retirar"){
            $('.botondashboard').removeClass('active');
            $(this).parents().next('.eligeMeta').slideUp();
            $(this).addClass('active');
            $(this).parents().next('.eligeMeta').find('.flecha').css("left", "91%");
            $(this).parents().next('.eligeMeta').slideDown();
        }else if ($(this).attr("name") == "ahorrar-ahora"){
            if($(this).parents().next('.eligeMeta').css("display") == 'none'){
                if ($('#eligeMetaNotificaciones').offset()){
                    var act_top = $('#eligeMetaNotificaciones').offset().top+86;
                    $('#eligeMetaNotificaciones').css('top',act_top+'px');
                }
            }
            $('.botondashboard').removeClass('active');
            $(this).parents().next('.eligeMeta').slideUp();
            $(this).addClass('active');
            $(this).parents().next('.eligeMeta').find('.flecha').css("left", "38%");
            $(this).parents().next('.eligeMeta').slideDown();
            //abre_eligeMetaComercial();
        }else if ($(this).attr("name") == "amazon"){
            if($(this).parents().next('.eligeMeta').css("display") == 'none'){
                if ($('#eligeMetaNotificaciones').offset()){
                    var act_top = $('#eligeMetaNotificaciones').offset().top+86;
                    $('#eligeMetaNotificaciones').css('top',act_top+'px');
                }
            }
            $('.botondashboard').removeClass('active');
            $(this).parents().next('.eligeMeta').slideUp();
            $(this).addClass('active');
            $(this).parents().next('.eligeMeta').find('.flecha').css("left", "59%");
            $(this).parents().next('.eligeMeta').slideDown();
            //abre_eligeMetaComercial();
        }else if ($('.botondashboard').hasClass('active')) {
            $('.botondashboard').removeClass('active');
            $(this).parents().next('.eligeMeta').slideUp();
            $(this).addClass('active');
            $(this).parents().next('.eligeMeta').find('.flecha').css("left", $(this).offset().left+5);
            $(this).parents().next('.eligeMeta').slideDown();
        }else{
            $(this).addClass('active');
            $(this).parents().next('.eligeMeta').find('.flecha').css("left", $(this).offset().left+5);
            $(this).parents().next('.eligeMeta').slideDown();
        };
        e.preventDefault();
    });
    $('.nuevactivada').on('click',function(e){
        if (e.target.className.indexOf('botondashboard') < 0){
            $(this).fadeOut(function(){
                $(this).prev().fadeIn();
            });
        };
    });

    $('.nuevameta a').on('click',function(e){
        $(this).parent().fadeOut(function(){
            $(this).next().fadeIn();
        });
        e.preventDefault();
    });

    $(".verAlerts").click(function(event) {

        console.log("verAlertas");
        var span = $(this).find("span")[0];

        if($(this).hasClass('vermenos')){
            $(window).scrollTop($('.zonaNotificaciones').offset().top);
        }

        elimina_class_nueva();
        if($(this).hasClass('vermenos')){
            cierra_eligeMeta(function(){});
        }
        var h = 0;
        $('.caja_notificaciones').each(function(){
            if(h>2){
                $(this).toggleClass("ocultar-notificacion ver-notificacion");
            }
            h++;
        });

        if($(".ocultar-notificacion").length >0){
            $(span).html('Ver todas');
            $(this).removeClass('vermenos');
            $(this).addClass('vermas');
        }else{
            $(span).html('Ver menos');
            $(this).removeClass('vermas');
            $(this).addClass('vermenos');
        }

        addMoreText();

        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();
    });

    function elimina_class_nueva() {
        setTimeout(function() {
            $(".caja_notificaciones.nueva").filter(':visible').removeClass('nueva');
            var list=document.getElementsByClassName('actualizaEvents')[0];
            if(list!=null){
                list.click();
            }
        }, 10000);
    };
    $(".cerrar-notificacion").click(function () {
        cerrarNotificacion(this);
    });

    elimina_class_nueva();
    var h = 0;
    $('.caja_notificaciones').each(function(){
        if(h>2){
            $(this).addClass('ocultar-notificacion');
        }
        if(h%3===0){
            $(this).addClass("clear-left");
        }
        h++;
    });
    var XX = 120;
    addMoreText();

    $('.noTieneAsignacion').click(function(){
        $(this).parents('.eligeMetaNotificaciones').find('.elementoFormularioNotificacionesAbajo').removeClass('visible').addClass('no-visible');
        $(this).parents('.eligeMetaNotificaciones').find('div.elementoFormularioNotificacionesArriba').find('.botondashboard').removeClass('no-mostrar-boton-elegirMeta').addClass('mostrar-boton-elegirMeta');
        $(this).parents('.eligeMetaNotificaciones').removeClass('alto').addClass('bajo');
        $(this).parents('.eligeMetaNotificaciones').prev().animate({ marginBottom: '115px'}, { duration: 500, queue: false });
        $(this).parents('.eligeMetaNotificaciones').animate({ height: '50px', padding: "24px 0 25px 0"}, { duration: 500, queue: false });
    });
    $('.tieneAsignacion').click(function(){
        $(this).parents('.eligeMetaNotificaciones').find('div.elementoFormularioNotificacionesArriba').find('.botondashboard').removeClass('mostrar-boton-elegirMeta').addClass('no-mostrar-boton-elegirMeta');
        $(this).parents('.eligeMetaNotificaciones').removeClass('bajo').addClass('alto');
        $(this).parents('.eligeMetaNotificaciones').prev().animate({ marginBottom: '155px'}, { duration: 500, queue: false });
        $(this).parents('.eligeMetaNotificaciones').animate({ height: '90px', padding: "24px 0 25px 0"}, { duration: 500, queue: false });
    });

    $(".caja_notificaciones").css("margin-bottom","0");
});

function addMoreText(){
    $('.contenido').each(function(){
        //if($.trim($(this).text()).length > XX){
        var botonMas = $(this).next().next('.botonera').find('.alternar-btn');
        var ptsSusp = $(this).next('.puntos_suspensivos');

        if(this.scrollHeight > $(this).innerHeight()){

            if($(botonMas).hasClass('no-visible')){
                $(botonMas).removeClass('no-visible');
                $(botonMas).addClass('visible');
            }

            if($(ptsSusp).hasClass('no-visible')){
                $(ptsSusp).removeClass('no-visible');
                $(ptsSusp).addClass('visible');
            }
        }
    });
}

function mostrar_notificaciones(){
    var h = 0;
    $('.caja_notificaciones').each(function(){
        if(h>2){
            $(this).toggleClass("ocultar-notificacion ver-notificacion");
        }
        h++;
    });
    $('.vermas span').text("Ver meno0000s");
    $('.vermas').removeClass("vermas");
    $('.vermas').addClass("vermenos");
}

function init_eligeMetaComercial(){
    console.log("cierra_eligeMetaComercial");
    // Removemos el estilo de display
    $("#eligeMetaComercial").css("display","");
    // Recogemos el estilo que quede
    var styleDiv = $("#eligeMetaComercial").attr("style");
    $("#eligeMetaComercial").attr("style", "display: block !important; "+styleDiv);
    $("#eligeMetaComercial").slideUp();
}

function abre_eligeMetaComercial(){
    console.log("abre_eligeMetaComercial");
    // Removemos el estilo de display
    $("#eligeMetaComercial").css("display","");
    // Recogemos el estilo que quede
    var styleDiv = $("#eligeMetaComercial").attr("style");
    ($("#eligeMetaComercial").is(":visible"))? $("#eligeMetaComercial").attr("style", "display: none !important; "+styleDiv) : $("#eligeMetaComercial").attr("style", "display: block !important; "+styleDiv);
    // $("#cajaNotificaciones-"+id_notificacion).animate({ marginBottom: '155px'}, { duration: 500, queue: false });
}

function cierra_eligeMeta(callback){
    $('.eligeMeta').css({"z-index":"0","height":"0px","padding":"0"});
    $('.eligeMeta').slideUp();
    $('.caja_detalleinfo').slideUp();
    $(".caja_notificaciones").css("margin-bottom","0");
    $('.botondashboard').removeClass('active');
    $(".eligeMetaNotificaciones").removeClass("active");
    id_notificacion_abierta = 0;
    if (elige_notificacion_mostrada){
        if(callback){
            setTimeout(function() { callback(); }, 500);
        }
    }else{
        if(callback){
            callback();
        }
    }
}

function abreOcultaFormEligeMeta(id_notificacion, extId){
    metaExtId = extId;
    showHideChoosingMetaSp();
    abre_eligeMeta(id_notificacion, true);
}

function showHideChoosingMetaSp(){
    if( metaExtId == "null" ){
        $("#formCT").hide();
        $("#formST").show();
        metaExtId = "";

        if($("#eligeMetaNotificaciones").hasClass("alto")){
            $("#eligeMetaNotificaciones").addClass("resized");
            $("#eligeMetaNotificaciones").css("height", "50px");
            $('.eligeMetaNotificaciones').find('.elementoFormularioNotificacionesAbajo').removeClass('visible').addClass('no-visible');
            $('.eligeMetaNotificaciones').find('div.elementoFormularioNotificacionesArriba').find('.botondashboard').removeClass('no-mostrar-boton-elegirMeta').addClass('mostrar-boton-elegirMeta');
            $('.eligeMetaNotificaciones').removeClass('alto').addClass('bajo');
        }
    }else{
        $("#formST").hide();
        $("#formCT").show();

        if($("#eligeMetaNotificaciones").hasClass("resized")){
            $('.eligeMetaNotificaciones').find('div.elementoFormularioNotificacionesArriba').find('.botondashboard').removeClass('mostrar-boton-elegirMeta').addClass('no-mostrar-boton-elegirMeta');
            $('.eligeMetaNotificaciones').removeClass('bajo').addClass('alto');
            $("#eligeMetaNotificaciones").css("height", "90px");
            $('.eligeMetaNotificaciones').find('.elementoFormularioNotificacionesAbajo').removeClass('no-visible').addClass('visible');
            $('.eligeMetaNotificaciones').find('div.elementoFormularioNotificacionesArriba').find('.botondashboard').removeClass('mostrar-boton-elegirMeta').addClass('no-mostrar-boton-elegirMeta');
            $("#eligeMetaNotificaciones").removeClass("resized")
        }
    }
}

function abre_eligeMeta(id_notificacion, show){
    if(typeof show == "undefined") showHideChoosingMetaSp();

    if( $("#eligeMetaNotificaciones").hasClass("active") || $("#eligeMetaOpcionSelec").hasClass("active") || $("#eligeMetaReparto").hasClass("active") ){
        $(".eligeMetaNotificaciones").removeClass("active");
        $(".eligeMetaNotificaciones").css("display","none");
        $(".caja_notificaciones").css("margin-bottom","0");
    }
    if(id_notificacion_abierta != id_notificacion){
        id_notificacion_abierta=id_notificacion;
        var top = $("#cajaNotificaciones-"+id_notificacion).offset().top + 191 +"px";
        var left = $("#cajaNotificaciones-"+id_notificacion).offset().left + 160 +"px";
        $('#eligeMetaNotificaciones .flecha').css('left',left);
        $(".eligeMetaNotificaciones").css({"display":"none","position":"absolute","left":"0","z-index":"1","top":top,"height":"0px","padding":"0"});
        $("#eligeMetaNotificaciones").css({"display":"inline-block","position":"absolute","left":"0","z-index":"1","top":top,"height":"0px","padding":"0"});
        $("#eligeMetaNotificaciones").addClass("active");
        if($("#eligeMetaNotificaciones").hasClass("alto")){
            $("#cajaNotificaciones-"+id_notificacion).animate({ marginBottom: '155px'}, { duration: 500, queue: false });
            $("#eligeMetaNotificaciones").animate({ height: '90px', padding: "24px 0 25px 0"}, { duration: 500, queue: false });
        }else{
            $("#cajaNotificaciones-"+id_notificacion).animate({ marginBottom: '115px'}, { duration: 500, queue: false });
            $("#eligeMetaNotificaciones").animate({ height: '50px', padding: "24px 0 25px 0"}, { duration: 500, queue: false });
        }
        elige_notificacion_mostrada = true;
    }else{
        id_notificacion_abierta=0;
    }
}

function muestra_eligeMeta(id_notificacion){
    if($("#eligeMetaNotificaciones").css("height") != "0px"){
        cierra_eligeMeta(function(){});
        elige_notificacion_mostrada = false;
    }else{
        cierra_eligeMeta(function(){
            abre_eligeMeta(id_notificacion);
        });
    }
}

function muestra_elementoFormularioNotificaciones(id_elemento){
    $('.elementoFormularioNotificacionesAbajo').removeClass('visible').addClass('no-visible');
    $('#elementoFormularioNotificacionesAbajo_'+id_elemento+'_').removeClass('no-visible').addClass('visible');
}


function cambiarValorComercial23(){
    var formV = ($("#eligeMetaEventos #formCT").is(":visible"))? $("#eligeMetaEventos #formCT") : $("#eligeMetaEventos #formST");
    idMeta = $(formV).find('.isCurrent [name*="idMetaSelected"]').val();
    $(formV).find('[name*="idGoalSelected"]').val(idMeta);
    $(formV).find('[name*="idEventSelected"]').val(id_notificacion_abierta);
    if($(formV).find('[name*="event"]')) $(formV).find('[name*="event"]').val(id_notificacion_abierta);

    return true;
}

function cambiarValorSecondList(){
    var formV = ($("#eligeMetaEventos #formCT").is(":visible"))? $("#eligeMetaEventos #formCT") : $("#eligeMetaEventos #formST");
	idMeta = $(formV).find('.isCurrent [name*="idMetaSelected"]').val();
	$(formV).find('[name*="idGoalSelected"]').val(idMeta);
	userId = $(formV).find('.visible .isCurrent [name*="ssgUser"]').val();
	$(formV).find('[name*="userId"]').val(userId);
	itemType = $(formV).find('.visible .isCurrent [name*="itemType"]').val();
	$(formV).find('[name*="item"]').val(itemType);
	$(formV).find('[name*="idEventSelected"]').val(id_notificacion_abierta);
    return true;
}

function cambiarValorOpcionMail(){
    optionSelect = $('#eligeMetaOpcionSelecMail').find('.isCurrent [name*="option"]').val();
    $('#eligeMetaOpcionSelecMail').find('[name*="optionSelect"]').val(optionSelect);
    return true;
}



function cierra_eligeMetaMail(callback){
    $('.eligeMeta').css({"z-index":"0","height":"0px","padding":"0"});
    $('.eligeMeta').slideUp();
    $('.caja_detalleinfo').slideUp();
    $(".caja_notificaciones").css("margin-bottom","0");
    $('.botondashboard').removeClass('active');
    $(".eligeMetaNotificaciones").removeClass("active");
    id_notificacion_abierta = 0;
    if (elige_notificacion_mostrada){
        if(callback){
            setTimeout(function() { callback(); }, 500);
        }
    }else{
        if(callback){
            callback();
        }
    }
}

function abre_eligeMetaMail(id_notificacion){
    if( $("#eligeMetaNotificaciones").hasClass("active") || $("#eligeMetaOpcionSelec").hasClass("active") || $("#eligeMetaReparto").hasClass("active") ){
        $(".eligeMetaNotificaciones").removeClass("active");
        $(".eligeMetaNotificaciones").css("display","none");
        $(".caja_notificaciones").css("margin-bottom","0");
    }
    if(id_notificacion_abierta != id_notificacion){
        id_notificacion_abierta=id_notificacion;
        var top = $("#cajaNotificaciones-"+id_notificacion).offset().top + 191 +"px";
        var left = $("#cajaNotificaciones-"+id_notificacion).offset().left + 160 +"px";
        $('#eligeMetaOpcionSelecMail .flecha').css('left',left);
        $(".eligeMetaNotificaciones").css({"display":"none","position":"absolute","left":"0","z-index":"1","top":top,"height":"0px","padding":"0"});
        $("#eligeMetaOpcionSelecMail").css({"display":"inline-block","position":"absolute","left":"0","z-index":"1","top":top,"height":"0px","padding":"0"});
        $("#eligeMetaOpcionSelecMail").addClass("active");
        if($("#eligeMetaOpcionSelecMail").hasClass("alto")){
            $("#cajaNotificaciones-"+id_notificacion).animate({ marginBottom: '155px'}, { duration: 500, queue: false });
            $("#eligeMetaOpcionSelecMail").animate({ height: '90px', padding: "24px 0 25px 0"}, { duration: 500, queue: false });
        }else{
            $("#cajaNotificaciones-"+id_notificacion).animate({ marginBottom: '115px'}, { duration: 500, queue: false });
            $("#eligeMetaOpcionSelecMail").animate({ height: '50px', padding: "24px 0 25px 0"}, { duration: 500, queue: false });
        }
        $('#eligeMetaOpcionSelecMail').find('[name*="idEventSelected"]').val(id_notificacion);
        elige_notificacion_mostrada = true;
    }else{
        id_notificacion_abierta=0;
    }
}

function muestra_eligeMetaMail(id_notificacion){
    if($("#eligeMetaOpcionSelecMail").css("height") != "0px"){
        cierra_eligeMetaMail(function(){});
        elige_notificacion_mostrada = false;
    }else{
        cierra_eligeMeta(function(){
            abre_eligeMetaMail(id_notificacion);
        });
    }
}



function cambiarValorOpcionReparto(){
    optionSelect = $('#eligeMetaReparto').find('.isCurrent [name*="option"]').val();
    $('#eligeMetaReparto').find('[name*="optionSelect"]').val(optionSelect);
    return true;
}

function cierra_eligeMetaReparto(callback){
    $('.eligeMeta').css({"z-index":"0","height":"0px","padding":"0"});
    $('.eligeMeta').slideUp();
    $('.caja_detalleinfo').slideUp();
    $(".caja_notificaciones").css("margin-bottom","0");
    $('.botondashboard').removeClass('active');
    $(".eligeMetaNotificaciones").removeClass("active");
    id_notificacion_abierta = 0;
    if (elige_notificacion_mostrada){
        if(callback){
            setTimeout(function() { callback(); }, 500);
        }
    }else{
        if(callback){
            callback();
        }
    }
}

function abre_eligeMetaReparto(id_notificacion){
    if( $("#eligeMetaNotificaciones").hasClass("active") || $("#eligeMetaOpcionSelec").hasClass("active") || $("#eligeMetaReparto").hasClass("active") ){
        $(".eligeMetaNotificaciones").removeClass("active");
        $(".eligeMetaNotificaciones").css("display","none");
        $(".caja_notificaciones").css("margin-bottom","0");
    }
    if(id_notificacion_abierta != id_notificacion){
        id_notificacion_abierta=id_notificacion;
        var top = $("#cajaNotificaciones-"+id_notificacion).offset().top + 191 +"px";
        var left = $("#cajaNotificaciones-"+id_notificacion).offset().left + 160 +"px";
        $('#eligeMetaReparto .flecha').css('left',left);
        $(".eligeMetaNotificaciones").css({"display":"none","position":"absolute","left":"0","z-index":"1","top":top,"height":"0px","padding":"0"});
        $("#eligeMetaReparto").css({"display":"inline-block","position":"absolute","left":"0","z-index":"1","top":top,"height":"0px","padding":"0"});
        $("#eligeMetaReparto").addClass("active");
        if($("#eligeMetaReparto").hasClass("alto")){
            $("#cajaNotificaciones-"+id_notificacion).animate({ marginBottom: '155px'}, { duration: 500, queue: false });
            $("#eligeMetaReparto").animate({ height: '90px', padding: "24px 0 25px 0"}, { duration: 500, queue: false });
        }else{
            $("#cajaNotificaciones-"+id_notificacion).animate({ marginBottom: '115px'}, { duration: 500, queue: false });
            $("#eligeMetaReparto").animate({ height: '50px', padding: "24px 0 25px 0"}, { duration: 500, queue: false });
        }
        $('#eligeMetaReparto').find('[name*="idEventSelectedReparto"]').val(id_notificacion);
        elige_notificacion_mostrada = true;
    }else{
        id_notificacion_abierta=0;
    }
}

function muestra_eligeMetaReparto(id_notificacion){
    if($("#eligeMetaOpcionSelecMail").css("height") != "0px"){
        cierra_eligeMetaReparto(function(){});
        elige_notificacion_mostrada = false;
    }else{
        cierra_eligeMeta(function(){
            abre_eligeMetaReparto(id_notificacion);
        });
    }
}

function cerrarNotificacion(clickElement){
    $(clickElement).parent().parent().parent().hide('fast', function() {
        $(clickElement).remove();
        $('.caja_notificaciones').removeClass('clear-left');
        var h = 0;
        $('.zonaNotificaciones .container .caja_notificaciones').each(function(){
            if(h<3 && $(clickElement).hasClass('ocultar-notificacion')){
                $(clickElement).toggleClass("ocultar-notificacion ver-notificacion");
            }
            if(h%3===0){
                $(clickElement).addClass("clear-left");
            }
            h+=1;
        });
        elimina_class_nueva();
        if($('#eligeMetaNotificaciones').hasClass('alto')){
            var hermano2 = $('#cajaNotificaciones-'+id_notificacion_abierta).offset().top+145;
            var hermano2Left = $('#cajaNotificaciones-'+id_notificacion_abierta).offset().left+125;
            $('#eligeMetaNotificaciones .flecha').css('left',hermano2Left+'px');
            $('#eligeMetaNotificaciones').css('top',hermano2+'px');
            $('#eligeMetaNotificaciones').css('height','90px');
            $('#cajaNotificaciones-'+id_notificacion_abierta).css('margin-bottom','155px');
        }else{
            var hermano2 = $('#cajaNotificaciones-'+id_notificacion_abierta).offset().top+105;
            var hermano2Left = $('#cajaNotificaciones-'+id_notificacion_abierta).offset().left+125;
            if ($('#eligeMetaNotificaciones').offset()){
                $('#eligeMetaNotificaciones .flecha').css('left',hermano2Left+'px');
                $('#eligeMetaNotificaciones').css('top',hermano2+'px');
            }
            $('#cajaNotificaciones-'+id_notificacion_abierta).css('margin-bottom','115px');
        }
        window.location.hash = '#eligeMetaNotificaciones';
    });
}

function cerrarNotificacionDomi(clickElement) {

    var parent = $(clickElement).parents(".caja_notificaciones");
    if (parent[0]) parent = parent[0];

    if (parent) {
        $(parent).hide('fast', function () {
            $(clickElement).remove();
            $('.caja_notificaciones').removeClass('clear-left');
            var h = 0;
            $('.zonaNotificaciones .container .caja_notificaciones').each(function () {
                if (h < 3 && $(clickElement).hasClass('ocultar-notificacion')) {
                    $(clickElement).toggleClass("ocultar-notificacion ver-notificacion");
                }
                if (h % 3 === 0) {
                    $(clickElement).addClass("clear-left");
                }
                h += 1;
            });
        });
    }
}

function volverDomiDniUpload(){
    //var desplegable = "div[id*='cajaNotificaciones-" + edEv+"']";
    var desplegable = "#"+$("#hiddenIdModalDNI").val();

    var dniCloser = $(desplegable).find("div[id='dniCloser']")[0];
    var formulariomasdatos = $(desplegable).find("div[id*='formulariomasdatos']")[0];
    var formu = $(desplegable).find("div[id='formu']")[0];
    var compDatos = $(formu).find("a")[0];

    $(dniCloser).removeClass("hidden");
    $(formulariomasdatos).addClass("hidden");
    $(compDatos).addClass("hidden");
}