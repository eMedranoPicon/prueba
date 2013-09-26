
var arr_clicks = new Array();
var go = true;
var stop = true;
var back = true;
var indice = 0;
var time = 0;
var automatico = true;
var imgDir = '';
var boolControl = true;
var boolButtons = true;
var nombresOmniture = []; //array global donde guardaremos los nopmbres dados a las slides
var nombresOmniture2 = []; //array global para guardar los nombres del carrusel pequeno

//funciones para guardar las variables de los carruseles
function setVarCarruselPequeno(nombres){

    nombresOmniture2 = nombres;
}

function setVarCarruselGrande(paramImgDir, paramTime, paramBoolControl, paramAutomatico, nombres){

  imgDir = paramImgDir;
  time = paramTime;
  boolControl = paramBoolControl;
  automatico = paramAutomatico;
  nombresOmniture = nombres;

}

function cargaCarruseles2() {
  /*paramImgDir, paramTime, paramBoolControl, paramAutomatico, nombres
  imgDir = paramImgDir;
  time = paramTime;
  boolControl = paramBoolControl;
  automatico = paramAutomatico;
  nombresOmniture = nombres;
	lanzaSlide1();*/
  
 //estas son las dos llamadas a funciones por lo que los carruseles no se ven
cargaCarruselGrande();

/* if ($(this).find(".tagsCarrusel").html() != null){
     cargaCarruselGrande();
  }*/
  if ($("#totalcarr") && $("#totalcarr").html() != null){
    cargaCarruselPequeno();
  }
  lanzaSlide1();
	lanzaSlide2();
  if(nombresOmniture.length > 0){
    normalizaNombres(nombresOmniture);
    cargaOmniture();
  }

  if(nombresOmniture2.length > 0){
    normalizaNombres(nombresOmniture2);
    //cargaOmniture2();
  }
  
  $("#slider").css({'visibility':'visible'});
  $("#sliderinferior").css({'visibility':'visible'});
  $("#totalcarr").css({'visibility':'visible'});
  if(!automatico){
    $('#slider').cycle('pause');
  }
  hoverSlide();
  boton(0);
  
}

function normalizaNombres(NormaNombres){
  
  for(i = 0;i < NormaNombres.length;i++){
/*    NormaNombres[i] =NormaNombres[i].replace("á","a");
    NormaNombres[i] =NormaNombres[i].replace("é","e");
    NormaNombres[i] =NormaNombres[i].replace("í","i");
    NormaNombres[i] =NormaNombres[i].replace("ó","o");
    NormaNombres[i] =NormaNombres[i].replace("ú","u");
    NormaNombres[i] =NormaNombres[i].replace("ñ","n");*/
    
    NormaNombres[i] =NormaNombres[i].replace("&aacute;","a");
    NormaNombres[i] =NormaNombres[i].replace("&eacute;","e");
    NormaNombres[i] =NormaNombres[i].replace("&iacute;","i");
    NormaNombres[i] =NormaNombres[i].replace("&oacute;","o");
    NormaNombres[i] =NormaNombres[i].replace("&uacute;","u");
    NormaNombres[i] =NormaNombres[i].replace("&ntilde;","n");
    
    NormaNombres[i] = jQuery.trim(NormaNombres[i]);
  }
  
}
//Esta funcio pone el onclick en todos los enlaces de cada slide. 
//Pra ello busca los divs del div con id slider y dentro de cada uno 
//pone una funcion que da valor a las variables de omniture
function cargaOmniture(){
    
    $('#slider').find('div').each(function(){
      $(this).find("a").each(
        function(){
        //El unbind es para evitar que el evento se dispare dos veces debido a un problema de jquery
          $(this).unbind('click').bind('click',
            function(event){
              s=s_gi(s_account);
              s.linkTrackVars='events,eVar36';
              s.linkTrackEvents='event52';
              s.eVar36="Superior "+ omniPath + ": "+nombresOmniture[indice];
              s.events="event52";
              s.tl(this,'o',nombresOmniture[indice]);
              event.stopPropagation(); //evita el event bubbling
              
          
            });
        });
      
    });
}
//funciones para el Omniture de los carrusel pequeños
function lanzaSlideOmniture(){
//nombres2
//nombresOmniture2 = nombres2;
 /*if(nombresOmniture2.length > 0){
    nombresOmniture2 = normalizaNombres(nombresOmniture2);
    cargaOmniture2();
  }*/
  $('.promosNews').show();
  $('.flechaBackNews').show();
  $('.flechaGoNews').show();
	$("#sliderinferior").jCarouselLite({
        btnNext: "#al",
        btnPrev: "#de"
    });
}

/*function cargaOmniture2(){
    
    $('#sliderinferior').find('li').each(function(){
      $(this).find("a").each(
        function(){
        
        //El unbind es para evitar que el evento se dispare dos veces debido a un problema de jquery
          $(this).unbind('click').bind('click',
            function(event){
              alert($(this).find("id").html());
              
              s=s_gi('bupasanitasprod,bupaglobalprod');
              s.linkTrackVars='events,eVar36';
              s.linkTrackEvents='event52';
              s.eVar36="Inferior: "+nombresOmniture2[i];
              s.events="event52";
              s.tl(this,'o',nombresOmniture2[i]);
              event.stopPropagation(); //evita el event bubbling
              
            });
            i++;
        });
      
    });
}*/
function mandarOmniture(id){

  s=s_gi(s_account);
  s.linkTrackVars='events,eVar36';
  s.linkTrackEvents='event52';
  s.eVar36="Inferior: "+nombresOmniture2[id];
  s.events="event52";
  s.tl(this,'o',nombresOmniture2[id]);
  


}

function cargaCarruseles(paramImgDir, paramTime, paramBoolControl, paramAutomatico ) {
  imgDir = paramImgDir;
  time = paramTime;
  boolControl = paramBoolControl;
  automatico = paramAutomatico;
	lanzaSlide1();
	lanzaSlide2();
  $("#slider").css({'visibility':'visible'});
  $("#sliderinferior").css({'visibility':'visible'});
  $("#totalcarr").css({'visibility':'visible'});
  if(!automatico){
    $('#slider').cycle('pause');
  }
  boton(0);
  
}

function lanzaSlide1(){
  $('.promosNews').show();
  $('.flechaBackNews').show();
  $('.flechaGoNews').show();
	$("#sliderinferior").jCarouselLite({
        btnNext: "#al",
        btnPrev: "#de",
       visible: 4  //Esto es para que se vean 4 elementos en Fase 2
    });
    hoverSlide();
}

function hoverSlide(){
  $(".capaTexto").hide();
  $(".lhover").show();
  $(function () {
    $(".lihov").hover(
      function () {
        $(this).find("a").show();
        $(this).find("div").show();
        $(this).find(".lhover").hide();
      },
      function () {
        $(this).find("a").hide();
        $(this).find("div").hide();
        $(this).find(".lhover").show();
      }
    );
  });
} 

function lanzaSlide2(){

if(boolControl){
    $('#slider').before('<div class="fondoPoints"></div><ul id="nav">').cycle({ 
      fx:     'scrollHorz', 
      speed:  'slow', 
      timeout: 0,
      prev:    '#prev',
          next:    '#next',
          delay: -2000,
      pager:  '#nav',
      pagerAnchorBuilder: function(idx, slide) { 
        return '<a href="#"><img alt="ir a la foto ' + (idx + 1) + '" name="redondo" src="' + imgDir + 'pointg.gif" id="bot' + idx + '" onclick="boton(' + idx + ')"/></a>'; 
      } 
    });
  
  
    $('#slider').cycle({ 
      fx:     'scrollHorz', 
      timeout: time*1000, 
      delay:  -2000,
      before: onLanza
    });	
    
    //buttons = jQuery('[src=' + imgDir + 'point.gif]');
    buttons = jQuery('img[name]');
    //alert(buttons[0]);
    jQuery.each(buttons, function(index, value) {
      arr_clicks[index] = true;
      jQuery(value).hover(
        function(){
          if (arr_clicks[index]) $(this).attr("src",imgDir + "pointg.gif");
            //alert("a");
        },
        function(){
          if (arr_clicks[index]) $(this).attr("src",imgDir + "point.gif");
            //alert("b");
        }
      );
    });
    jQuery("#go").hover(
      function(){
        if (go) $(this).attr("src",imgDir + "flechagog.gif");
          //alert("a");
        },
      function(){
        if (go) $(this).attr("src",imgDir + "flechago.gif");
          //alert("b");
      }
    );
    jQuery("#stop").hover(
      function(){
        if (stop) $(this).attr("src",imgDir + "pauseg.gif");
          //alert("a");
        },
      function(){
        if (stop) $(this).attr("src",imgDir + "pause.gif");
          //alert("b");
      }
    );
    jQuery("#back").hover(
      function(){
        if (back) $(this).attr("src",imgDir + "flechabackg.gif");
          //alert("a");
        },
      function(){
        if (back) $(this).attr("src",imgDir + "flechaback.gif");
          //alert("b");
      }
    );
}
}

function pause(){
	if (!stop){
		//alert("reanuda");
		stop = true;
		$('#slider').cycle('resume');
		jQuery("#stop").attr("src",imgDir + "pause.gif");
	}
	else{
		for (i=0;i < arr_clicks.length;i++){
			arr_clicks[i] = true;
		}
		go = true; stop = false; back = true;
		/*jQuery.each(buttons, function(index, value) {
			jQuery(value).attr("src",imgDir + "point.gif");
		});*/
		jQuery("#go").attr("src",imgDir + "flechago.gif");
		jQuery("#back").attr("src",imgDir + "flechaback.gif");
		jQuery("#stop").attr("src",imgDir + "pauseg.gif");
		$('#slider').cycle('pause');
	}
}

function changeImgNext(){

	var locindice = indice;
	if (locindice ==  (arr_clicks.length - 1)){
		arr_clicks[locindice] = true;
		jQuery("#bot"+locindice).attr("src",imgDir + "point.gif");
		locindice = 0;
		indice = 0;
		jQuery("#bot"+locindice).attr("src",imgDir + "pointg.gif");
		arr_clicks[locindice] = false;
	}
	else{
		arr_clicks[locindice] = true;
		jQuery("#bot"+locindice).attr("src",imgDir + "point.gif");
		locindice ++;
		indice ++;
		arr_clicks[locindice] = false;
		jQuery("#bot"+locindice).attr("src",imgDir + "pointg.gif");
	}
	/*for (i=0;i < arr_clicks.length;i++){
		arr_clicks[i] = true;
	}*/
	go = false; stop = true; back = true;
	/*jQuery.each(buttons, function(index, value) {
		jQuery(value).attr("src",imgDir + "point.gif");
	});*/
	jQuery("#stop").attr("src",imgDir + "pause.gif");
	jQuery("#back").attr("src",imgDir + "flechaback.gif");
	jQuery("#go").attr("src",imgDir + "flechago.gif"); //antes g
  
  if(!automatico){
    $('#slider').cycle('pause');
  }
  
    //marca de omniture para presentacion de slide
  if(nombresOmniture.length > 0 && indice >= 0){
    s=s_gi(s_account);
    s.linkTrackVars='events,eVar36';
    s.linkTrackEvents='event51';
    s.eVar36="Superior "+ omniPath + ": "+nombresOmniture[indice];
    s.events="event51";
    s.tl(this,'o',nombresOmniture[indice]);
  }

}

function changeImgPrev(){
	var locindice = indice;
	if (locindice ==  0){
		arr_clicks[locindice] = true;
		jQuery("#bot"+locindice).attr("src",imgDir + "point.gif");
		locindice = arr_clicks.length - 1;
		indice = arr_clicks.length - 1;
		jQuery("#bot"+locindice).attr("src",imgDir + "pointg.gif");
		arr_clicks[locindice] = false;
	}
	else{
		arr_clicks[locindice] = true;
		jQuery("#bot"+locindice).attr("src",imgDir + "point.gif");
		locindice --;
		indice --;
		arr_clicks[locindice] = false;
		jQuery("#bot"+locindice).attr("src",imgDir + "pointg.gif");
	}
	/*for (i=0;i < arr_clicks.length;i++){
		arr_clicks[i] = true;
	}*/
	go = true; stop = true; back = false;
	/*jQuery.each(buttons, function(index, value) {
		jQuery(value).attr("src",imgDir + "point.gif");
	});*/
	jQuery("#stop").attr("src",imgDir + "pause.gif");
	jQuery("#go").attr("src",imgDir + "flechago.gif");
	jQuery("#back").attr("src",imgDir + "flechaback.gif"); //antes g
  
  if(!automatico){
    $('#slider').cycle('pause');
  }
  
    //marca de omniture para presentacion de slide
  if(nombresOmniture.length > 0 && indice >= 0){
    s=s_gi(s_account);
    s.linkTrackVars='events,eVar36';
    s.linkTrackEvents='event51';
    s.eVar36="Superior "+ omniPath + ": "+nombresOmniture[indice];
    s.events="event51";
    s.tl(this,'o',nombresOmniture[indice]);
  }

}

function boton(id){
    indice = id;
	jQuery.each(buttons, function(index, value) {
		jQuery(value).attr("src",imgDir + "point.gif");
	});		
	jQuery("#stop").attr("src",imgDir + "pause.gif");
	jQuery("#go").attr("src",imgDir + "flechago.gif");
	jQuery("#back").attr("src",imgDir + "flechaback.gif");
	for (i=0;i < arr_clicks.length;i++){
		arr_clicks[i] = true;
	}
	go = true; stop = true; back = true;
	arr_clicks[id] = false;
	jQuery("#bot" + id).attr("src",imgDir + "pointg.gif");
/*	$('#slider').cycle({ 
		fx:     'scrollRight', 
		timeout: time*1000, 
		delay:  -2000,
		before: onLanza
	});*/
  
  if(!automatico){
    pause();
  }
  
      //marca de omniture para presentacion de slide
  if(nombresOmniture.length > 0 && indice >= 0){
    s=s_gi(s_account);
    s.linkTrackVars='events,eVar36';
    s.linkTrackEvents='event51';
    s.eVar36="Superior "+ omniPath + ": "+nombresOmniture[indice];
    s.events="event51";
    s.tl(this,'o',nombresOmniture[indice]);
  }
}

function onLanza(){
	var total = arr_clicks.length;
	if (total == 0){
		arr_clicks[0] = false;
		jQuery("#bot0").attr("src",imgDir + "pointg.gif");
		indice ++;
	}
	else{
		if (indice == total - 1){
			arr_clicks[indice -1] = true;
			jQuery("#bot" + indice).attr("src",imgDir + "point.gif");
			arr_clicks[indice] = false;
      indice = 0;
			jQuery("#bot"+indice).attr("src",imgDir + "pointg.gif");
			
		}
		else{
			arr_clicks[indice] = false;
			jQuery("#bot"+(indice + 1)).attr("src",imgDir + "pointg.gif");
			if (indice == 0) {
				arr_clicks[total -1] = true;
				jQuery("#bot" + indice).attr("src",imgDir + "point.gif");
			}
			else{
				arr_clicks[indice -1] = true;
				jQuery("#bot" + indice).attr("src",imgDir + "point.gif");
			}
			indice ++;
		}
	}
  
  //marca de omniture para presentacion de slide
  if(nombresOmniture.length > 0 && indice >= 0){
    /*s=s_gi(s_account);
    s.linkTrackVars='events,eVar36';
    s.linkTrackEvents='event51';
    s.eVar36="Superior "+ omniPath + ": "+nombresOmniture[indice];
    s.events="event51";
    s.tl(this,'o',nombresOmniture[indice]);*/
  }
	//alert(indice);
}