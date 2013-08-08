var desplegables_IE_general_atodosabiertos = new Array();
var desplegables_IE_general_ocultos = new Array();
var abiertos = 0;
var controles = 0;




$(document).ready(function() {

  controles = $('h2[class^="especiSelector"]').length;
  contrPestSup = 2;
  DesplegablesBusqueda();
  $("#redes").hide();  
  $(".MsgBox").hide();
   var especialidadhidden =  $('#especialidadhidden').val();
   if(especialidadhidden != '' && especialidadhidden != 'e' ){        
       //$('#control1').click();      
       $("h2[name=" + especialidadhidden + "]").click();
       
   } 
  
  
    for (var j=0;j<controles;j++){
      $("#oculto"+j).toggle();
      //$("#oculto"+j).click();
    }
  });

function iniContentEspecialidad(controles){
 
  $(".contentEspecialidad").show();
	for (var j=0;j<controles;j++){
		var ind = j;
  
		desplegables_IE_general_ocultos[j] = false;
		$("#oculto"+ind).click(function () {
                        var nameOculto = $(this).attr("name");
			                        
                        //if($("#"+nameOculto).html() == ''){
                           // getDetalleJson(nameOculto);
                        //}
                        $("#"+nameOculto).toggle();
                        cadenaImg = $(this).find('img');
                    
                        if ($(cadenaImg).attr('src') == '../../../../../../wcm/idc/groups/public/documents/digitalmedia/flechaUpMedico.gif') {
                          $(cadenaImg).attr('src','../../../../../../wcm/idc/groups/public/documents/digitalmedia/flechaDownMedico.gif');
                          $("#"+nameOculto).hide();
                        }
                        else{
                          $(cadenaImg).attr('src','../../../../../../wcm/idc/groups/public/documents/digitalmedia/flechaUpMedico.gif');
                           $("#"+nameOculto).show();
                    }
		});
	}
  
}

function addLinks(id){

  $('div[name^="control"]').show();
	$('div[name^="control0"]').show();
	$("#control"+id).click(function () {
		if (!desplegables_IE_general_atodosabiertos[id]){
			//$("#control"+id).html("Ocultar");
			//url("../images/flechaDownMedico.gif") no-repeat scroll right center transparent
			desplegables_IE_general_atodosabiertos[id] = true;
			//$(this).css('background','url("../images/flechaDownMedico.gif") no-repeat scroll right center transparent');
			abiertos = abiertos + 1;
		}
		else
		{
			//$("#control"+id).html("Leer");
			desplegables_IE_general_atodosabiertos[id] = false;
			//$(this).css('background','url("../images/flechaUpMedico.gif") no-repeat scroll right center transparent');
			abiertos = abiertos -1;
		}
  
		$(".especiSelector"+id).toggle();
		$(".especiSelector"+id).show();
		$('div[name^="control'+id+'"]').toggle();
	});   
}

function DesplegablesBusqueda(){
	
	for (var j=0;j<contrPestSup;j++){
		//$("#oculto"+j).hide();
		$(".especiSelector"+j).hide();
		desplegables_IE_general_atodosabiertos[j] = false;
		addLinks(j);
	}
	iniContentEspecialidad(controles);

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

/*Se añade redes.hide para controlar el desplegable de compartir*/
function showPrint(){
 if ($(".MsgBox").is(':visible')){
 $(".MsgBox").hide();
 $(".redesBiblio").css({'height':'20px'});
 //clear20
 if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
 $("#clear1").css('height','20');
 }
 }
 else{
 $(".MsgBox").show();
 $("#redes").hide();
 $(".redesBiblio").css({'height':'20px'});
 if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
 $("#clear1").css('height','20');
 }
 }
} 
function confirmation() {
 if (($('#miEmail').val() == '') || ($('#emailAmigo').val() == '')) {
 alert ("Debe introducir su correo y el de su amigo") ;
 }
 else if (validarEmail($('#miEmail').val()) && validarEmail($('#emailAmigo').val()))
 {
 var answer = confirm("¿Quieres enviar el email?");
 if (answer){
 $('#enviarPorMailAmigo').submit();
 alert ("Tu email ha sido enviado");
 }
 } else {
 alert ("Email incorrecto");
 }
} 
function validarEmail(email) {

   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

   if(reg.test(email) == false) {
      return false;
   }
   else
   {
      return true;
   }

}

/*INT-1774 funcion getDetalleJson quitada del jsp*/
/*Script para recuperar las poblaciones */
function getDetalleJson(especialidad){
    
    var infra = $('#IdInfraestructura').val();
    var proveedor = $('#IdProveedor').val();
    var provincia = $('#IdProvincia').val();
    var poblacion = $('#IdPoblacion').val();
    
          
    $.ajax({      
    url: "/sanitas/pages/medicoscentros/ajax/detalleSolapaJSON.jsp?infra=" + infra + "&prestador=" + proveedor + "&especialidad="+especialidad+"&provincia=" + provincia + "&poblacion=" + poblacion,      
    context: document.body,
    success: function(data){        
      $('#' +especialidad).html(data);        
    } 
  });    
}
