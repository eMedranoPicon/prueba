elige_notificacion_mostrada = false;
id_notificacion_actual = 0;

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
    
    $('.vermas').on('click',function(e) {
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
      $(this).toggleClass('vermas vermenos');
      e.preventDefault();
    });
    
    $(".vermas span").click(function () {
        $(this).text(function(i, v){
           return v === 'Ver todas' ? 'Ver menos' : 'Ver todas'
        });
        if($(this).parent().hasClass('vermenos')){
            $(window).scrollTop($('.zonaNotificaciones').offset().top);
        }
    });

    function elimina_class_nueva() {
      setTimeout(function() {
        $(".caja_notificaciones.nueva").filter(':visible').removeClass('nueva');
    document.getElementsByClassName('actualizaEvents')[0].click();
      }, 10000);
    };
    $(".cerrar-notificacion").click(function () {
      $(this).parent().parent().parent().hide('fast', function() {
        $(this).remove();
        $('.caja_notificaciones').removeClass('clear-left');
        var h = 0;
        $('.zonaNotificaciones .container .caja_notificaciones').each(function(){
          if(h<3 && $(this).hasClass('ocultar-notificacion')){
            $(this).toggleClass("ocultar-notificacion ver-notificacion");
          }
          if(h%3===0){
            $(this).addClass("clear-left");
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
  var XX = 150;
    $('.contenido').each(function(){
      if($.trim($(this).text()).length > XX){
        var a = $(this).find('.alternar-btn');
        $(this).next().next('.botonera').find('.alternar-btn').toggleClass('no-visible visible');
        $(this).next('.puntos_suspensivos').toggleClass('no-visible visible');
      }
    });
    $('.contenido').each(function(){
      if($.trim($(this).text()).length > XX){
        $(this).next('.botonera').find('.alternar-btn-error').toggleClass('no-visible visible');
      }
    });
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

function mostrar_notificaciones(){
	var h = 0;
	$('.caja_notificaciones').each(function(){
		if(h>2){
			$(this).toggleClass("ocultar-notificacion ver-notificacion");
		}
		h++;
	});
	$('.vermas span').text("Ver menos");
	$('.vermas').toggleClass('vermas vermenos');
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



function abre_eligeMeta(id_notificacion){
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
	idMeta = $('#eligeMetaEventos').find('.isCurrent [name*="idMetaSelected"]').val();
	$('#eligeMetaEventos').find('[name*="idGoalSelected"]').val(idMeta);
	$('#eligeMetaEventos').find('[name*="idEventSelected"]').val(id_notificacion_abierta);
	return true;
}

function cambiarValorSecondList(){
	idMeta = $('#eligeMetaEventos').find('.isCurrent [name*="idMetaSelected"]').val();
	$('#eligeMetaEventos').find('[name*="idGoalSelected"]').val(idMeta);
	userId = $('#eligeMetaEventos').find('.visible .isCurrent [name*="ssgUser"]').val();
	$('#eligeMetaEventos').find('[name*="userId"]').val(userId);
	itemType = $('#eligeMetaEventos').find('.visible .isCurrent [name*="itemType"]').val();
	$('#eligeMetaEventos').find('[name*="item"]').val(itemType);
	$('#eligeMetaEventos').find('[name*="idEventSelected"]').val(id_notificacion_abierta);
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