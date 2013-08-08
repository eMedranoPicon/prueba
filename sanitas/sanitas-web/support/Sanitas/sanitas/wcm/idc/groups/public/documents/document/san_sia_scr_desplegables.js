var cpInicial = "";
$(document).ready(function(){
  jQuery.extend(jQuery.expr[ ":" ],{ reallyvisible : function (a) { return !(jQuery(a).is(':hidden') || jQuery(a).parents(':hidden').length); }});
  cpInicial = $("#codPostal").val();
  novisible();
}); 
var todosabiertos = false;
var todosabiertosBis = false;
var todosabiertos2 = false;
var todosabiertos3 = false;
var todosabiertos4 = false;
var todosabiertos5 = false;

var todosabiertosarray = new Array(false,false, false, false, false,false);
var todosabiertoshome = new Array(false, false, false, false);

function initDesplegables(){
  $("#restolinks3").hide();
  $("#restolinks4").hide();
  $("#restolinks").hide();
  $("#restolinks2").hide();
  $("#restolinks5").hide();
  
 hovermenus();
 
  finDePie('');
  finDePie('2');
  finDePie('3');
  finDePie('4');
  finDePie('5');
}
  
function initDesplegablesHome(){

  $(".olista").hide();
  $("#ltodosH").hide();
  $("#ltodosH2").hide();
  $("#ltodosH3").hide();
  $("#ltodosH4").hide();
  hovermenus();
  
  restoLinks();
  restoLinks2();
  restoLinks3();
  restoLinks4();
  buscaOcultos('');
  buscaOcultos('2');
  buscaOcultos('3');
  buscaOcultos('4');
}
function buscaOcultos(num){
  
  if (num == "")
     { 
       $("#cajaInferior1").find(".olista").each(function(){
              
              $("#ltodosH").show();
              
            }); 
     }
   else
   {
  $("#cajaInferior"+num).find(".olista").each(function(){
              
              $("#ltodosH"+num).show();
              
            }); 
   }
}

/*function restoLinks(num){

     if (num == "")
     { 
      posicion = "0";
     }
     else
     {
      posicion = num;
     }
        
	$(".todos").click(function () {
  
         if (!todosabiertoshome[posicion]){
            $("#"+this.parentNode.id).find("#ltodos").html("Ocultar");
            todosabiertoshome[posicion] = true;
          }
          else
          {
            $("#"+this.parentNode.id).find("#ltodos").html("Ver todos");
            todosabiertoshome[posicion]= false;
          }
              
          $("#"+this.parentNode.id).find(".olista").each(function(){
              $(this).toggle("slow");
            });
         
		
	});   
}
*/
function restoLinks(){
 
	$("#todosH").click(function () {
		if (!todosabiertos){
			$("#ltodosH").html("Ocultar");
			todosabiertos = true;
     
		}
		else
		{
			$("#ltodosH").html("Ver todos");
			todosabiertos = false;
     
		}
    $("#cajaInferior1").find(".olista").each(function(){
        $(this).toggle("slow");
      }); 
	});   
}

function restoLinks2(){
 
	$("#todosH2").click(function () {
		if (!todosabiertos2){
			$("#ltodosH2").html("Ocultar");
			todosabiertos2 = true;
     
		}
		else
		{
			$("#ltodosH2").html("Ver todos");
			todosabiertos2 = false;
     
		}
    $("#cajaInferior2").find(".olista").each(function(){
        $(this).toggle("slow");
      }); 
	});   
}

function restoLinks3(){
 
	$("#todosH3").click(function () {
		if (!todosabiertos3){
			$("#ltodosH3").html("Ocultar");
			todosabiertos3 = true;
     
		}
		else
		{
			$("#ltodosH3").html("Ver todos");
			todosabiertos3 = false;
      
		}
    $("#cajaInferior3").find(".olista").each(function(){
        $(this).toggle("slow");
      });
   
	});   
}

function restoLinks4(){
 
	$("#todosH4").click(function () {
		if (!todosabiertos4){
			$("#ltodosH4").html("Ocultar");
			todosabiertos4 = true;
      
		}
		else
		{
			$("#ltodosH4").html("Ver todos");
			todosabiertos4 = false;
      
		}
    $("#cajaInferior4").find(".olista").each(function(){
        $(this).toggle("slow");
      });
   
	});   
}
function normalizaNom(nombres){

    nombres =nombres.replace("&aacute;","a");
    nombres =nombres.replace("&eacute;","e");
    nombres =nombres.replace("&iacute;","i");
    nombres =nombres.replace("&oacute;","o");
    nombres =nombres.replace("&uacute;","u");
    nombres =nombres.replace("&ntilde;","n");
  return nombres;
}
var despliegue = true;
function hovermenus(evt){
//block

	$(function (evt) {
	
        $(".menuhov").hover(            
			function (evt) { 
            $(this).find(".norm").css({'color':'#fff'});
				$(this).find("h3").css({'background':'#126891'});
        for (a=1;a <= 6; a++){
          if($("#campo" + a).length > 0){
            $(this).find("#campo" + a).html("<div class='inicioCapaMenu' ><\/div><strong>" + $('input[name=textoDesple' + a +']').val() + "<\/strong>");
          }
        }
        for (a=1;a <= 6; a++){
          for (b=1;b <= 6; b++){
            for (c=1;c <= 2; c++){
              if($("#txtsub" + a + b + c ).length > 0){        
                $(this).find("#txtsub" + a + b + c ).html($('input[name=textoSubDesple' + a + b + c + ']').val());
              }
            }
          }
        }
                $(this).find(".capaMenu").show();
         //aqui se meten los valores para omniture
		 if (normalizaNom($(this).find(".norm").html()).search("<")==-1)
			{if (despliegue) //evita el event bubbling para chrome
				{
				  s=s_gi(s_account); 
				  s.linkTrackVars='events,eVar62'; 
				  s.linkTrackEvents='event77';
				  s.eVar62=normalizaNom($(this).find(".norm").html());
				  s.events="event77";
				  s.tl(this,'o',normalizaNom($(this).find(".norm").html()));
				  evt.stopPropagation(); //evita el event bubbling
				  despliegue=false;
				}
					else
				{
					despliegue=true;
				}
				//background:url(../images/fondoBotCabecera.gif) 5px 0px no-repeat
				}
            },
            function () {
				$(this).find("h3").css({'background':'none'});
				$(this).find(".norm").css({'color':'#FFFFFF'});
                $(this).find(".capaMenu").hide();
            }
			
           
            //$(this).find("h3").innerHTML;
            
            
        );
    });
	$(function () {
        $(".nodesp").hover(
            function () {
				//alert("dd");
				$(this).find(".norm").css({'color':'#FFF'});
				$(this).find("h3").css({'background':'#126891'});
            },
            function () {
				$(this).find("h3").css({'background':'none'});
        $(this).find(".norm").css({'color':'#FFFFFF'});
            }
        );
    });
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
 

function adjust(){
	var ncapas = $('.capaMenu').length;
	//alert(ncapas);
	for (c=1;c <= ncapas; c++){
		var neles = $('.menu0'+c).find('h4').length;
		var nwidth = neles * 150;
                if (nwidth != 0 && neles != 6){
                 $('.menu0'+c).attr("style","width:"+nwidth+"px;");   
                }
	}
}

function finDePie(visible){
	/*$("#todos"+visible).click(function () {
		if (!eval("todosabiertos"+visible)){
			$("#ltodos"+visible).html("Ocultar");
			eval("todosabiertos" + visible + " = true");
		}
		else
		{
			$("#ltodos"+visible).html("Ver todos");
			eval("todosabiertos" + visible + " = false");
		}
    $("#restolinks"+visible).toggle("slow");	
	}); */ 
  
 
  $("#todos"+visible).click(function () {
      if (visible == "")
     { 
      posicionarray = "0";
     }
     else
     {
      posicionarray = visible;
     }
 
		if (!todosabiertosarray[posicionarray]){
			$("#ltodos"+visible).html("Ocultar");
			todosabiertosarray[posicionarray] = true;
		}
		else
		{
			$("#ltodos"+visible).html("Ver todos");
			todosabiertosarray[posicionarray]= false;
		}
    $("#restolinks"+visible).toggle("fast");
    
	});
}

/*function finDePie2 (visible){
    
  if(visible == 3){
    if (!todosabiertos3){
    
			$("#ltodos"+visible).html("Ocultar");
			todosabiertos3 = true;
      $("#restolinks"+ visible).show();
		}
		else
		{
			$("#ltodos"+visible).html("Ver todos");
			todosabiertos3 = false;
      $("#restolinks"+ visible).hide();
		}
		$("#restoLinks"+visible).toggle("slow");
  }
    
    //////////////////////////
     if(visible == 2){
		if (!todosabiertos2){
    
			$("#ltodos"+visible).html("Ocultar");
			todosabiertos2 = true;
      $("#restolinks"+ visible).show();
		}
		else
		{
			$("#ltodos"+visible).html("Ver todos");
			todosabiertos2 = false;
      $("#restolinks"+ visible).hide();
		}
		$("#restoLinks"+visible).toggle("slow");
	}
  
  ///////////////////////
   if(visible == ''){
		if (!todosabiertosBis){
    
			$("#ltodos"+visible).html("Ocultar");
			todosabiertosBis = true;
      $("#restolinks"+ visible).show();
		}
		else
		{
			$("#ltodos"+visible).html("Ver todos");
			todosabiertosBis = false;
      $("#restolinks"+ visible).hide();
		}
		$("#restoLinks"+visible).toggle("slow");
	}
  ///////////////////
     if(visible == 4){
		if (!todosabiertos4){
    
			$("#ltodos"+visible).html("Ocultar");
			todosabiertos4 = true;
      $("#restolinks"+ visible).show();
		}
		else
		{
			$("#ltodos"+visible).html("Ver todos");
			todosabiertos4 = false;
      $("#restolinks"+ visible).hide();
		}
		$("#restoLinks"+visible).toggle("slow");
	}
  ////////////////////////
     if(visible == 5){
		if (!todosabiertos5){
    
			$("#ltodos"+visible).html("Ocultar");
			todosabiertos5 = true;
      $("#restolinks"+ visible).show();
		}
		else
		{
			$("#ltodos"+visible).html("Ver todos");
			todosabiertos5 = false;
      $("#restolinks"+ visible).hide();
		}
		$("#restoLinks"+visible).toggle("slow");
	}
}*/

function restoImagenes(){
 
	$("#mostra").click(function () {
		if (!todosabiertosBis){
			$("#mostra").html("Ocultar");
			todosabiertosBis = true;
     
		}
		else
		{
			$("#mostra").html("Ver todos");//con la almoadilla accedo al id de la clase
			todosabiertosBis = false;
     
		}
    $(".cajaBiblioBig").find(".olista").each(function(){//con el punto accedo directamente a la clase
        $(this).toggle("slow");
      }); 
	});   
}


/*funcion para que despliegue el icono de compartir de redes sociales de la pagina para un articulo de la biblioteca de salud*/
function showShare(){
	if ($(".shareBiblio").is(':visible')){
		$(".shareBiblio").hide();
		$(".redesBiblio").css({'height':'30px'});
		//clear20
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			$("#clear1").css('height','20');
		}
	}
	else{  
		$(".shareBiblio").show();
    $("#TopMsg").hide();
		$(".redesBiblio").css({'height':'185px'});
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			$("#clear1").css('height','40');
		}
	}
}

/*funcion para que despliegue el icono de compartir de redes sociales de la pagina para un articulo de la biblioteca de salud*/
/*function showShare(){
	if ($(".shareBiblio").is(':visible')){
		$(".shareBiblio").hide();
		$(".redesBiblio").css({'height':'40px'});
		//clear20
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			$("#clear1").css('height','20');
		}
	}
	else{  
		$(".shareBiblio").show();
		$(".redesBiblio").css({'height':'185px'});
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			$("#clear1").css('height','40');
		}
	}
}*/
 
 /*Se a�ade redes.hide para controlar el desplegable de compartir*/
function showPrint(){
	if ($(".MsgBox").is(':visible')){
		$(".MsgBox").hide();
		$(".redesBiblio").css({'height':'30px'});
		//clear20
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			$("#clear1").css('height','20');
		}
	}
	else if($(".MsgBox").val() != null){  
		$(".MsgBox").show();
     $("#redes").hide();
		$(".redesBiblio").css({'height':'450px'});
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			$("#clear1").css('height','40');
		}
	}
}
 
 
/*function showPrint(){
	if ($(".MsgBox").is(':visible')){
		$(".MsgBox").hide();
		$(".redesBiblio").css({'height':'40px'});
		//clear20
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			$("#clear1").css('height','20');
		}
	}
	else{  
		$(".MsgBox").show();
		$(".redesBiblio").css({'height':'370px'});
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			$("#clear1").css('height','40');
		}
	}
} */
 
function showPrint2(){
	if ($(".MsgBoxSeguros").is(':visible')){
		$(".MsgBoxSeguros").hide();
		//$(".redesBiblio").css({'height':'30px'});
		//clear20
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			//$("#clear1").css('height','20');
		}
	}
	else{  
		$(".MsgBoxSeguros").show();
		//$(".redesBiblio").css({'height':'370px'});
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			//$("#clear1").css('height','40');
		}
	}
	if ($(".MsgBoxSeguros2").is(':visible')){
		$(".MsgBoxSeguros2").hide();
		//$(".redesBiblio").css({'height':'30px'});
		//clear20
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			//$("#clear1").css('height','20');
		}
	}
	else{  
		$(".MsgBoxSeguros2").show();
		//$(".redesBiblio").css({'height':'370px'});
		if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
			//$("#clear1").css('height','40');
		}
	}
}  
 
//funcion para rellenar las estrellas cuando haya pulsado la valoracion de articulo
  function rellenaEstrellas(nEstrella ){
   if($("#estrellaMarcada").val() == 'desmarcado'){
      for (c=1;c <= nEstrella ; c++){
        $("#estrellaValorac"+c).css('background','url(/sanitas/wcm/idc/groups/public/@san/@san/@0/documents/digitalmedia/estrella.gif)');
      }
      $("#estrellaMarcada").val('marcado');    
       getValoracionMediaJson(nEstrella);
    }
   
  }
//funcion para marcar las estrellas cuando se sobreponga 
function mouseOver(nEstrella)
                { 
                
                if($("#estrellaMarcada").val() == 'desmarcado'){
                   for (c=1;c <= nEstrella ; c++){
               
                  $("#estrellaValorac"+c).css('background','url(/sanitas/wcm/idc/groups/public/@san/@san/@0/documents/digitalmedia/estrella.gif)');
                  
                   }
                }}
                
//funcion para desmacrar las estrellas cuando se sobreponga 
 function mouseOut(nEstrella)
                {
                // alert('onmouseout' + nEstrella);
                  if($("#estrellaMarcada").val() == 'desmarcado'){
                    for (c=1;c <= nEstrella ; c++){
                    
                      $("#estrellaValorac"+c).css('background','url(/sanitas/wcm/idc/groups/public/@san/@san/@0/documents/digitalmedia/estrellaVacia.gif)');
                    }
                  }
                }
                
                
function pintarEstrellas(media){        
   for (c=0;c <= 4 ; c++){
     if( media >= (c+0.0001) ){
      $("#estrella"+c).attr("src", '/sanitas/wcm/idc/groups/public/@san/@san/@0/documents/digitalmedia/estrella.gif' );
     }
     else{
  
      $("#estrella"+c).attr("src", '/sanitas/wcm/idc/groups/public/@san/@san/@0/documents/digitalmedia/estrellaVacia.gif' );
    }
  }
}

function getValoracionMediaJson(valoracion){
  var codArt = $("#idArticulo").val(); 
  var codSeccion = $("#idSeccion").val(); 
  var totalVotos = $("#total_votos").html();
  var valoracion_antigua = parseFloat($("#valoracion_media").html().replace(',','.'))/2;
  var tipo_contenido = 41;
  if ($('#spanInfo').html() != null){
      tipo_contenido = 19;
  }

  $.ajax({
    url: "/sanitas/pages/utils/json/valoracionesArticulo.jsp?valoracion_seleccionada=" + valoracion + "&valoracion_antigua=" + valoracion_antigua + "&totalVotos=" + totalVotos + "&id_articulo=" + codArt + "&id_seccion=" + codSeccion +"&tipo_contenido=" + tipo_contenido,   
    context: document.body,
    success: function(data){
                   
      var jsonData = eval(data);                  
      var media_result = jsonData[0].media;
      var media_formateada = jsonData[0].media_formateada;
      $("#valoracion_media").html(media_formateada); 
      var total = $("#total_votos").html();
     
      $("#total_votos").html(parseInt(total) + 1);
      pintarEstrellas(media_result);
   } 
  });    
}
/*Funcion para pintar el aviso legal de los articulos de la biblioteca*/
function pintarTextoLegal(){
  if($('#textoNota').length){
          
    $.ajax({
      url: "/sanitas/pages/consejosSalud/textoCondicionesUso.jsp",
      context: document.body,
      success: function(data){
      $('#textoNota').html(data);
      }
      }); 
  }
}


/*Funcion para volver a poner los textos de edad y cp, usuario y pass en la home*/
function ponerTexto(obj, texto){
   

  if(obj==null){
   var dia = $("#dia").val();
   var mes = $("#mes").val();
   var anyo = $("#anyo").val();
   var dia2 = $("#dia2").val();
   var mes2 = $("#mes2").val();
   var anyo2 = $("#anyo2").val();
   var cp = $("#codPostal").val();
   var cp1 = $("#formulario1 ul .CP #codPostal").val();
   var cp2 = $("#formulario2 ul .CP input").val();
   var cp3 = $("#cPostal").val();
   var login = $("#loginVO.alias").html();
   var pass =$("#loginVO.contrasenia").html();
   



   if (dia == ''){
    $("#dia").val("dd");    
   }
   
   if(mes == ''){
    $("#mes").val("mm");    
   }
   
   if(anyo == ''){
    $("#anyo").val("aaaa");           
   }
   
   if (dia2 == ''){
    $("#dia2").val("dd");    
   }
   
   if(mes2 == ''){
    $("#mes2").val("mm");    
   }
   
   if(anyo2 == ''){
    $("#anyo2").val("aaaa");           
   }
   if (cp == ''){
    $("#codPostal").val("Código postal");
   }
   if (cp1 == ''){
    $("#formulario1 ul .CP #codPostal").val("Código postal");
   }
   if (cp2 == ''){
    $("#formulario2 ul .CP input").val("Codigo postal");
   }
   if (cp3 == ''){
    $("#cPostal").val($("#cPostal").attr("alt"));
   }
  if (login == ''){
    $("[id='loginVO.alias']").val("Usuario");
  }
  if (pass == ''){
    $("[id='loginVO.contrasenia']").val("Clave");
  }
  }
  else{
  if(obj.value == ''){
    obj.value=texto;
  }
  }
}

$(document).ready(function(){
    $("#dia").keyup(function(e){
       var dia = $("#dia") .val();
       if(dia.length == 2 && e.which != 9 && e.which != 16){
           $("#mes").focus();
           if($("#mes").val() == 'mm'){
            $("#mes").val('');
           }
       }
    });
    
     $("#mes").keyup(function(e){
       var mes = $("#mes") .val();
       if(mes.length == 2 && e.which != 9 && e.which != 16 ){
           $("#anyo").focus();
           if($("#anyo").val() == 'aaaa'){
            $("#anyo").val('');
           }
       }
    });
    
    $("#anyo").keyup(function(e){
       var anyo = $("#anyo") .val();
       if(anyo.length == 4 && e.which != 9 && e.which != 16 ){
           if(document.URL.indexOf("seguros_medicos/cuadro_medico/index.html") > 0){
               $("#cPostal").focus();
               }else{
                   $("#codPostal").focus();
           }
       }
    });

});

//Codigo temporal para borrar null en el menu.abrirMapa(<script type="text/javascript">
$(document).ready(function(){
   var nombre = $(".contenedorLoginMenu .coldcha div p").text();  
   nombre = nombre.replace(" null", " ");
   $(".contenedorLoginMenu .coldcha div p").text(nombre);
});

//Codigo temporal para modificar html entities en popup recordar datos.
$(document).ready(function(){      
   var parrafoPrimero = $("#centrado p:first").text();
   parrafoPrimero = parrafoPrimero.replace("Å„","Ã±");
   parrafoPrimero = parrafoPrimero.replace("&nacute;","&ntilde;");
   $("#centrado p:first").html(parrafoPrimero);
});
function cambiarDiaMes(element,e){
  var dia = element.value;
       if(dia.length == 2 && e.which != 9 && e.which != 16){
           $("#mes2").focus();
           if($("#mes2").val() == 'mm'){
            $("#mes2").val('');
           }
       }
}

function cambiarMesAnyo(element,e){
  var mes = element.value;
       if(mes.length == 2 && e.which != 9 && e.which != 16){
           $("#anyo2").focus();
           if($("#anyo2").val() == 'aaaa'){
            $("#anyo2").val('');
           }
       }
}

function cambiarAnyoCp(element,e){
  var anyo = element.value;
       if(anyo.length == 4 && e.which != 9 && e.which != 16){
           $("#codPostal2").focus();
           if($("#codPostal2").val() == 'Código postal'){
            $("#codPostal2").val('');
           }
       }
}
function cambiarAnyoCpostal(element,e){
  var anyo = element.value;
       if(anyo.length == 4 && e.which != 9 && e.which != 16){
           $("#cPostal").focus();
	   if($("#cPostal").val() == $("#cPostal").attr("alt")){
              $("#cPostal").val('');
           } 
       }
}
function novisible(){
	$("#tab1 span:first").attr("style","display:none");
}
//Etiquetado boton cita medica
function btnCitaMedica(){
  s=s_gi(s_account); 
  s.linkTrackVars='events,eVar69'; 
  s.linkTrackEvents='event87';
  s.eVar69="home:link";
  s.events="event87";
  s.tl(this,'o','boton pedir cita');
}
