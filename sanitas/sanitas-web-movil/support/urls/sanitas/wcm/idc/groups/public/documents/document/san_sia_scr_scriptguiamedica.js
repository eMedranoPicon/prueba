/*******************************************************/
/*Script para la implementacion de los radioButtons de la busqueda avanzada*/
$(document).ready(function() {
	jQuery.extend(
	jQuery.expr[ ":" ],
	{ reallyvisible : function (a) { return !(jQuery(a).is(':hidden') || jQuery(a).parents(':hidden').length); }}
	);
	$(".camposOpciones").hide();
  
  settings = {
          tl: { radius: 6 },
          tr: { radius: 6 },
          bl: { radius: 0 },
          br: { radius: 0 },
          autoPad: true,
          validTags: ["div"]
      }
  settings2 = {
          tl: { radius: 3 },
          tr: { radius: 3 },
          bl: { radius: 3 },
          br: { radius: 3 },
          autoPad: true,
          validTags: ["a"]
      }	  
  settings3 = {
          tl: { radius: 0 },  
          tr: { radius: 3 },
          bl: { radius: 0},
          br: { radius: 0 },
          autoPad: true,
          validTags: ["div"]
      }	  	  

    
	 /*if($('.busquedasGuardadasbot').length>0){ 
       $('.busquedasGuardadasbot').corner(settings2);	  
       $('.paddingBusquedas').corner(settings3);
       $('.redondeada').corner(settings);
   }*/
  var fixed_visual = true;
  //fixdesp el click
  //navifix el toggle
  $("#fixdesp").click(function () {
    if(!fixed_visual){
      fixed_visual = true;
      //$('#navifix').slideUp();
      //$('#fixme').css('bottom','-150px');
      $('#fixme').animate({
        'bottom': '-=143'
      });
    }
    else{
      fixed_visual = false;
      //$('#fixme').css('bottom','0px');
      //$('#navifix').slideDown();
      $('#fixme').animate({
        'bottom': '+=143'
      });
    }
  });

  
  switch ($("input[name='rad']:checked").val())
	{
		case 'BuscaCentro':  
        $("#centro").show();
        $('#botBuscar').attr("style","margin-top:0px;");
        $('#buscando3').attr("style","margin-top:0px;");
        $('#camposOpciones').attr("style","margin-top: 0px; / margin-top:-23px;");
        $('#medico').attr("class","camposOpciones");
        
		break;
		case 'BuscaProximidad':
        $("#proximidad").show();
        $('#botBuscar').attr("style","margin-top:0px;");
        $('#buscando3').attr("style","margin-top:0px;");
        $('#camposOpciones').attr("style","margin-top: 0px; / margin-top:-23px;");
        $('#medico').attr("class","camposOpciones");
		break;
		case 'BuscaMedico':	
        $("#medico").show();
        $('#botBuscar').attr("style","margin-top:50px;");
        $('#buscando3').attr("style","margin-top:50px;");
        $('#camposOpciones').attr("style","margin-top: 0px; / margin-top:-70px;");
        $('#medico').attr("class","camposOpcionesMedico");
        
		break;
		default: 
			
		break;
	}
  
});
function adjust(){
  var ncapas = $('.capaMenu').length;
  //alert(ncapas);
  for (c=1;c <= ncapas; c++){
    var neles = $('.menu0'+c).find('h4').length;
    var nwidth = neles * 130;
    $('.menu0'+c).attr("style","width:"+nwidth+"px;");
  }
}


/*Script para recuperar las poblaciones desde el servidor*/
  function getPoblacionesJson(){
      $.ajax({
      url: "/sanitas/pages/medicoscentros/ajax/poblacionJSON.jsp?provincia="+$('#provinciaHomeMedicos').val(),
      
      context: document.body,
      success: function(data){
        var options = '';
        var jsonData = eval(data);
        options += "<option value='l'>Poblacion<\/option>";
        for (var i = 0; i < jsonData.length; i++) {
          options += '<option value="' + jsonData[i].id + '">' + jsonData[i].desc + '</option>';
        }
        $('#Localidad').html(options);
      } 
    });    
  }
/*Script para recuperar las especialidades desde el servidor*/
  function getSubespecialidadesJson(){
  var tmp ="";
  if($('#pestanaMedico').hasClass('on')){
            tmp = "cuadromedico";        
        }else if($('#pestanaDental').hasClass('on')){
            tmp = "cuadrodental";            
        }else if($('#pestanaPruebas').hasClass('on')){
            tmp = "pruebasdiagnosticas";
        }else if($('#pestanaUrgencias').hasClass('on')){
            tmp = "urgencias";
        }
      $.ajax({
      url: "/sanitas/pages/medicoscentros/ajax/subespecialidadJSON.jsp?especialidad="+$('#Especialidad').val()+"&tipoBusqueda="+ tmp,
      context: document.body,
      success: function(data){
        var options = '';
        var jsonData = eval(data);
         options += "<option value='s'>Subespecialidad<\/option>";
        for (var i = 0; i < jsonData.length; i++) {
          options += '<option value="' + jsonData[i].id + '">' + jsonData[i].desc + '</option>';
        }
        $('#SubEspecialidad').html(options);
      } 
    });    
  }
function getNomPestana(){
    var pestana = null;
    if ($('#pestanaMedico').hasClass('on')){
    pestana = "cuadro-medico";
    }
    if ($('#pestanaDental').hasClass('on')){
    pestana = "cuadro-dental";
    }
    if ($('#pestanaPruebas').hasClass('on')){
    pestana = "pruebas-diagnosticas";
    }
    if ($('#pestanaUrgencias').hasClass('on')){
    pestana = "urgencias";
    }
    return pestana;
}

function guardarBusqueda(nombre){
      if($('#provinciaHomeMedicos').val()!="p"){
      nombre = nombre + "-" + $('#provinciaHomeMedicos').val();
      }
      if($('#Localidad').val()!="l"){
      nombre = nombre + "-" + $('#Localidad').val();
      }
      if($('#Especialidad').val()!="e"){
      nombre = nombre + "-" + $('#Especialidad').val();
      }
      if($('#SubEspecialidad').val()!="s"){
      nombre = nombre + "-" + $('#SubEspecialidad').val();
      }
      if($('#CPostal').val()!="C.P." && $('#CPostal').val()!=""){
      nombre = nombre + "-" + $('#CPostal').val();
      }
      if($('#InputBuscaCentro').val()!="" && $('#InputBuscaCentro').val()!="Indica el nombre del centro"){
      nombre = nombre + "-" + $('#InputBuscaCentro').val();
      }
      if($('#BuscaProximidadCampo').val()!="" && $('#BuscaProximidadCampo').val()!="Calle, numero, barrio, poblacion, provincia, CP"){
      nombre = nombre + "-" + $('#BuscaProximidadCampo').val();
      }
      if($('#BuscaNombre').val()!="" && $('#BuscaNombre').val()!="Indica el nombre del medico"){
      nombre = nombre + "-" + $('#BuscaNombre').val();
      }
      if($('#BuscaIdioma').val()!="" && $('#BuscaIdioma').val()!="i"){
      nombre = nombre + "-" + $('#BuscaIdioma').val();
      }
      if($('#Sexo').val()!="" && $('#Sexo').val()!="Sexo"){
      nombre = nombre + "-" + $('#Sexo').val();
      }
        $.ajax({
      url: "/sanitas/pages/medicoscentros/ajax/ajaxGuardadoBusqueda.jsp?descBusqueda="+nombre,
      
      context: document.body,
      success: function(data){
        var options = '';
        var jsonData = eval(data);
        if(data.status="OK"){
          alert("guardada la busqueda");
          $('#formGuardar').submit();
          $('#popupDni1').hide();
          
        }
      } 
    });
}

/*Script para contruir la url firendly de la busqueda y navegar a ella*/
 
    
  function buscaGeneralPortada2(){
      
      $('#datos').val("borrar");
      var retorno = false;
      if ($('#provincia').val()=="p"){
        
        $('#msgError2').attr("class","mensajeErrorPeque");
        $('#msgError2').html("Selecciona una provincia");
        $('#msgError2').show();
        $("#cajaForm2").attr("style", "height:244px;");
        $("#cajaForm1").attr("style", "height:244px;"); //esto es para que las dos cajas tengan el mismo tamano        
        $("#msgError").attr("class","mensajeErrorVacio");
        $("#msgError").html("");
        
        provincia=$('#provincia').val();
      }
      else{
        $('#msgError2').attr("class","noseve");
        $("#cajaForm1").attr("style", "height:205px;");
        $("#cajaForm2").attr("style", "height:205px;");
        $('#msgError').attr("class","noseve");
        
        provincia=$('#provincia').val();
        OmniturePortadaGuia();
        retorno = true;
      }
      if ($('#especialidad').val()=="e" ||$('#especialidad').val()=="Especialidad" ){
        especialidad="e";
      }
      else{
        especialidad=$('#especialidad').val();
      }
     
     
      var url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/busqueda-guia-medica/cuadro-medico/" + provincia + "/l/" + especialidad + "/s";
      if(retorno){
      $('#formPortada2').attr('action',url);
      $('#formPortada2').submit(); 
      }
       ///cuadro-medico/" + provincia + "/l/" + especialidad + "/s  
          
      return retorno;      
     }
    /*Script para contruir la url firendly de la busqueda y navegar a ella*/
  function buscaAvanzada(){
    var retorno = false;
    if ($('#provinciaHomeMedicos').val()=="p"){
        //provincia="p";
        $('#msgError').attr("class","mensajeErrorGrand");
        $('#msgError').html("Selecciona una Provincia");
      
    }
    else{
      provincia=$('#provinciaHomeMedicos').val();
      retorno = true;
      OmnitureGuiaBtnBuscar("avanzada");
    }
    
    if ($('#Localidad').val()=="l"){
      localidad="l";
    }
    else{
      localidad=$('#Localidad').val();
    }
    
    if ($('#Especialidad').val()=="e" && !$('#pestanaMedico').hasClass('on') ){
        $('#espeError').attr("class","error");
        retorno=false;
    }
    else{
      especialidad=$('#Especialidad').val();
      $('#espeError').attr("class","noseve");
      if(retorno==true){
         
         retorno=true;
      }
    }    
    
    if ($('#SubEspecialidad').val()=="s"){
      subespecialidad="s";
    }
    else{
      subespecialidad=$('#SubEspecialidad').val();
    }
    
    cp=$('#CPostal').val();
    $('#CPostalUrl').val($('#CPostal').val());
    
    if(cp!=null && cp!='C.P.' && cp!=''){
        mostrarMapaLista(cp);
      
    }
    if( subespecialidad=="s" && ($('#CPostal').val()=="C.P." || $('#CPostal').val()==""))
    {
    buscaGeneral();
    $('#buscando2').attr("class","loader");
    }
    else if (subespecialidad!=null && subespecialidad!='s' && subespecialidad!=''){
 
         if (provincia=="p"){
        $('#provinciaError').attr("class","error");
        $('#provinciaError').show();
      }
      else if(cp==null || cp=='C.P.' || cp==''){
      
      
        $('#buscando2').attr("class","loader");
        var url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/"+(esDniTarjeta())+$('#busquedaGuia').html()+"/"+ getNomPestana() +"/" + provincia + "/" + localidad + "/" + especialidad + "/"+subespecialidad
        $("#form2").attr("action",url); 
        $("#form2").submit();
      }
    }
    return false;
    
    }
    

/**Control de desplegables **/
    
var atodosabiertos = new Array();
var controles = 2;

$(document).ready(function() {
  DesplegablesBusqueda();
 
  $('#selectProv').change(function(){
    $(this).find('option').first().remove();
    $(this).bind('change',null);
  });


});

function addLinks(id){
if($(".formNIF").find(".producto").html()!=null){

    $('#producto').attr("disabled","disabled");
}

}

function despliegaBusq(id) {
        $("#oculto"+id).toggle();
      
        if (!atodosabiertos[id]){
            //$("#control"+id).html("Ocultar");
            atodosabiertos[id] = true;
            if(atodosabiertos[id+1]){
                $("#form"+(id+3)).find(".boxButton").hide();
                $("#form"+(id+2)).find(".boxButton").show();
                $("#oculto"+(id+1)).hide();
                atodosabiertos[id+1] = false;
            }else{
                $("#form"+(id+2)).find(".boxButton").show();
                $("#form"+(id+1)).find(".boxButton").hide();
            }
            if(id == 1){
              //$("#oculto"+(id-1)).show();
              //atodosabiertos[id-1] = true;
              $("#form"+(id)).find(".boxButton").hide();
            }
        }
        else
        {
            //$("#control"+id).html("Leer");
            atodosabiertos[id] = false;
            
                $("#form"+(id+2)).find(".boxButton").hide();
                $("#form"+(id+1)).find(".boxButton").show();
            
            if(id == 0){
              $("#form"+(id+3)).find(".boxButton").hide();
              $("#oculto"+(id+1)).hide();
     
              atodosabiertos[id+1] = false;
            }
            if(id == 1){
              if(atodosabiertos[id-1]){
                  $("#form"+(id)).find(".boxButton").hide();
                  $("#form"+(id+1)).find(".boxButton").show();
              }else{                          
                  $("#form"+(id)).find(".boxButton").show();
                  $("#form"+(id+1)).find(".boxButton").hide();
              }
            }
        }    
   
          $('#lscentros').attr("style","position:relative;top:0px");
    }
function despliegaBusqInicio(id) {
        $("#oculto"+id).toggle();
      
        if (!atodosabiertos[id]){
            //$("#control"+id).html("Ocultar");
            atodosabiertos[id] = true;
            if(atodosabiertos[id+1]){
                $("#form"+(id+3)).find(".boxButton").hide();
                $("#form"+(id+2)).find(".boxButton").show();
                $("#oculto"+(id+1)).hide();
                atodosabiertos[id+1] = false;
            }else{
                $("#form"+(id+2)).find(".boxButton").show();
                $("#form"+(id+1)).find(".boxButton").hide();
            }
            if(id == 1){
              //$("#oculto"+(id-1)).show();
              //atodosabiertos[id-1] = true;
              $("#form"+(id)).find(".boxButton").hide();
              if($('#Subespecialidad').val()!="s" || ($('#CPostal').val()!="C.P." && $('#CPostal').val()!="" )){
                        $("#oculto"+(id-1)).show();
                        atodosabiertos[id-1] = true;
                  }
              $("#form"+(id)).find(".boxButton").hide();    
              $("#form"+(id+1)).find(".boxButton").hide(); 
              $("#form"+(id+2)).find(".boxButton").show();
            }
            if(id ==  0){
             
              if($('#Subespecialidad').val()!="s" || ($('#CPostal').val()!="C.P." && $('#CPostal').val()!="" )){
                        $("#oculto"+(id)).show();
                        atodosabiertos[id] = true;
                  }
              $("#form1").find(".boxButton").hide();    
              $("#form2").find(".boxButton").show(); 
              $("#form3").find(".boxButton").hide();   
            }
        }
        else
        {
            //$("#control"+id).html("Leer");
            atodosabiertos[id] = false;
            
                $("#form"+(id+2)).find(".boxButton").hide();
                $("#form"+(id+1)).find(".boxButton").show();
            
            if(id == 0){
              $("#form"+(id+3)).find(".boxButton").hide();
              $("#form"+(id+2)).find(".boxButton").show();
              $("#form"+(id+1)).find(".boxButton").hide();
              $("#oculto"+(id+1)).hide();
              $("#oculto"+(id)).show();
              atodosabiertos[id+1] = false;
            }
            if(id == 1){
              if(atodosabiertos[id-1]){
                  $("#form"+(id)).find(".boxButton").hide();
                  $("#form"+(id+1)).find(".boxButton").show();
              }else{                          
                  $("#form"+(id)).find(".boxButton").show();
                  $("#form"+(id+1)).find(".boxButton").hide();
              }
            }
        }    
   
          $('#lscentros').attr("style","position:relative;top:0px");
    }

function DesplegablesBusqueda(){    
    for (var j=0;j<controles;j++){
        $("#oculto"+j).hide(); if($('#BuscaProximidadCampo').val()!="" && $('#BuscaProximidadCampo').val()!="Calle, numero, barrio, poblacion, provincia, CP"){
        despliegaBusqInicio(1);
     }
        atodosabiertos[j] = false;
        addLinks(j);
    }
    
  switch ($("input[name='rad']:checked").val())
	{
 
		case 'BuscaCentro': 
    if($('#InputBuscaCentro').val()!="" && $('#InputBuscaCentro').val()!="Indica el nombre del centro"){
       despliegaBusqInicio(1);
    }
		break;
		case 'BuscaProximidad':
    
     if($('#CPostal').val()!="C.P." && $('#CPostal').val()!=""){
        despliegaBusqInicio(0); 
    }
		break;
		case 'BuscaMedico':	
    if(($('#BuscaNombre').val()!="" && $('#BuscaNombre').val()!="Indica el nombre del medico")||($('#BuscaIdioma').val()!="" && $('#BuscaIdioma').val()!="i")||($('#Sexo').val()!="" && $('#Sexo').val()!="Sexo")){
        despliegaBusqInicio(1);
    }
		break;
    default:
        /*Al eliminar la opcion de busqueda avanzada se para este comportamiento*/
        /*if ($('#SubEspecialidad').val()!="s" || ($('#CPostal').val()!="C.P." && $('#CPostal').val()!="") ){
          despliegaBusqInicio(0);
        }*/
        
    break;

    
	}  

} 


function enableBusquedaAvanzada(id){
	/*if (jQuery.browser.msie && jQuery.browser.version == "8.0"){
if (abiertos == 0) {$('#lscentros').attr("style","position:relative;top:0px");}
if (abiertos == 1) {$('#lscentros').attr("style","position:relative;top:80px");}
if (abiertos == 2) {$('#lscentros').attr("style","position:relative;top:160px");}
}*/

  
  if ($("#control" + id).is('')){
      
  }
  
  
	var toplscentros = $("#lscentros").css('top');
  var abiertos = $("#lscentros").css('top');
	//alert(toplscentros);
	if ($("#" + id).is(':reallyvisible')){
		$("#"+id).hide();
		//alert ($(this+":checked"));
	if (jQuery.browser.msie && (jQuery.browser.version == "8.0" || jQuery.browser.version == "7.0") ){ 
			if (abiertos == 0) {$('#lscentros').attr("style","position:relative;top:0px");}
			if (abiertos == 1) {$('#lscentros').attr("style","position:relative;top:80px");}
			if (abiertos == 2) {$('#lscentros').attr("style","position:relative;top:160px");}
		}
	}
	else{
		$(".camposOpciones").hide();   
		if (jQuery.browser.msie && (jQuery.browser.version == "8.0" || jQuery.browser.version == "7.0") ){    
			
			if (abiertos == 1) {$('#lscentros').attr("style","position:relative;top:80px");}
			if (abiertos == 2) {$('#lscentros').attr("style","position:relative;top:160px");}
      
		}
		//$("#"+id).show();
	}
	if ($("#" + id)){

$("#"+id).show();
}
}
function busquedaMasOpciones(){
	var retorno = false;
  var cp=$('#CPostal').val();
  $('#CPostalUrl').val($('#CPostal').val());
	if ($('#provinciaHomeMedicos').val()=="p"){
		provincia="p";

    
	}
	else{
		provincia=$('#provinciaHomeMedicos').val();
    OmnitureGuiaBtnBuscar("mas opciones de busqueda");
	}
  
	if ($('#Localidad').val()=="l"){
		localidad="l";
	}
	else{
		localidad=$('#Localidad').val();
	}
    if ($('#Especialidad').val()=="e" && !$('#pestanaMedico').hasClass('on') ){
       
        $('#msgError').attr("class","mensajeErrorGrand");
        $('#msgError').html("Selecciona una Especialidad");
        retorno=false;
    }
    else{
      especialidad=$('#Especialidad').val();
      if(!$('#pestanaMedico').hasClass('on')){
       
        $('#msgError').attr("class","noseve");
      }
      if(retorno==true){
         $('#buscando3').attr("class","loader");
         $('#msgError').attr("class","noseve");
         retorno=true;
      }
    }    
	if ($('#SubEspecialidad').val()=="s"){
		subespecialidad="s";
	}
	else{
		subespecialidad=$('#SubEspecialidad').val();
	}
	if ($('#CPostal').val()==""){
		cpostal="cp";
	}
	else{
		cpostal=$('#CPostal').val();
     if ($('#Especialidad').val()=="e" ){
       
        $('#msgError').attr("class","mensajeErrorGrand");
        $('#msgError').html("Selecciona una Especialidad");
        retorno=false;
    }
    else{
      especialidad=$('#Especialidad').val();
    }
	}
  


  
	switch ($("input[name='rad']:checked").val())
	{
		case 'BuscaCentro':
      $('#msgError').attr("class","noseve");
      var centro = "";
    	if($('#InputBuscaCentro').val()=="" || $('#InputBuscaCentro').val()=="Indica el nombre del centro"){
            centro="c";
      }else{                      
            centro = $('#InputBuscaCentro').val();
      }
      
            
      
      if(centro=="c" && provincia!="p"){
          buscaGeneral();
      }else if(centro=="c" && provincia=="p"){
              $('#msgError').attr("class","mensajeErrorGrand");
              $('#msgError').html("Selecciona una Provincia e introduce un Centro");
      }else
      {
      if ($('#provinciaHomeMedicos').val()=="p"){
        provincia="p";
        retorno=false;
        $('#msgError').attr("class","mensajeErrorGrand");
        $('#msgError').html("Selecciona una Provincia");
      }
      else{
        retorno=true;
        if (retorno==true){
          $('#buscando3').attr("class","loader");
          $('#msgError').attr("class","noseve");
        }
      $('#buscando3').attr("class","loader");
     
      buscarCentro(provincia,localidad,especialidad,subespecialidad,centro);
      }
   
    }
      
		break;
		case 'BuscaProximidad':
      $('#opcionesError').attr("class","noseve");
     if(($('#BuscaProximidadCampo').val()=="" || $('#BuscaProximidadCampo').val()=="Calle, numero, barrio, poblacion, provincia, CP") && provincia=="p"){

      $('#msgError').attr("class","mensajeErrorGrand");
      $('#msgError').html("Introduce valores para la busqueda por proximidad");
      }else if(($('#BuscaProximidadCampo').val()=="" || $('#BuscaProximidadCampo').val()=="Calle, numero, barrio, poblacion, provincia, CP") && provincia!="p"){          
          buscaGeneral();
          $('#msgError').attr("class","noseve");
      }else if( provincia!="p" && especialidad!="e"){	
      $('#msgError').attr("class","noseve");
      $('#buscando3').attr("class","loader");
			mostrarMapaLista($('#BuscaProximidadCampo').val());
      retorno=true;
      }else if ($('#provinciaHomeMedicos').val()=="p"){
        provincia="p";
        retorno=false;
        $('#msgError').attr("class","mensajeErrorGrand");
        $('#msgError').html("Selecciona una Provincia");
      }
      break;
      
		case 'BuscaMedico':
    $('#opcionesError').attr("class","noseve");
          	if ($('#BuscaIdioma').val()=="" || $('#BuscaIdioma').val()=="i"){
		idioma="i";
	}
	else{
		idioma=$('#BuscaIdioma').val();
	}
  	if ($('#Sexo').val()=="" || $('#Sexo').val()=="Sexo" ){
		sexo="sx";
	}
	else{
		sexo=$('#Sexo').val();
	}
	if ($('#BuscaNombre').val()=="" ||$('#BuscaNombre').val()=="Indica el nombre del medico" ){
	 var	medico="m";
	}
	else{
		medico=$('#BuscaNombre').val();
	}
      				if((medico=="m" && sexo=="sx" && idioma=="i") && provincia=="p"){
        				
                retorno=false;
			
                }else if((medico=="m" && sexo=="sx" && idioma=="i") && provincia!="p"){
                    buscaGeneral();
                }else if(provincia=="p"){

                    $('#msgError').attr("class","mensajeErrorGrand");
                    $('#msgError').html("Selecciona una Provincia");

				}else{
					retorno=true;
          $('#buscando3').attr("class","loader");
					buscarMedico(provincia,localidad,especialidad,subespecialidad,medico,idioma,sexo);  
				}
			 
		break;
		default: 
			 $('#opcionesError').attr("class","error");
		break;
	}
	/**if ($('#provinciaHomeMedicos').val()=="p"){
		provincia="p";
		retorno=false;
    $('#provinciaError').attr("class","error");
	}
	else{
		provincia=$('#provinciaHomeMedicos').val();
	}**/
	return retorno;
}

//INT-1880
function cambiarProducto(select){
  var navega = true;
  var id = select.id;
  var url="http://www.sanitas.es/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/";
  if($('#'+id).val()=="prod"){             
      navega = false;
  }else{
      //OmniturePortadaGuia();
      
      $('#productoCliente').val(select.value);
      url = url+ $('#'+id).val();
  }

  if(navega){
    $('#cambiaProducto').attr('action',url);
    $('#cambiaProducto').submit();
  }
  
}


function criteriosBusquedaPortada(){
var navega = true;
var url="http://www.sanitas.es/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/";
switch($("input[name='rad2']:checked").val()){
    
    case "nif":
   
    if($('#numDocumento').val()=="" || $('#numDocumento').val()=="Documento"){
          
          $('#msgError').attr("class","mensajeErrorPeque");
          $('#msgError').html("Introduce el n&uacute;mero del documento");                  
          $('#cajaForm1').attr("style", "height:244px;");
          $('#cajaForm2').attr("style", "height:244px;");
          //$(".imgHomeCentros").attr("style", "height:468px;");
          $('#msgError2').attr("class","mensajeErrorVacio");
          $('#msgError2').html("");          
          navega = false;
          
    }else{
          $('#docOculto').val($('#numDocumento').val());
          $('#tarjetaOculta').val("");
          
          
           $.ajax({
          url: "/sanitas/pages/medicoscentros/ajax/compruebaDni.jsp?dni="+$('#numDocumento').val().toUpperCase()+"&tipoDoc="+$('#NIF').val(),
          
          context: document.body,
          success: function(data){
            var jsonData = eval(data);
            if(jsonData=='OK'){
                $("#tipoDocumento").val($("#NIF").val()); 
                OmniturePortadaGuia();
                $("#msgError").attr("class","noseve");
                $("#msgError").hide();
                $("#msgError2").attr("class","noseve");
                $("#msgError2").hide();        
                $("#cajaForm1").attr("style", "height:205px;");
                $("#cajaForm2").attr("style", "height:205px;");  
               // $(".imgHomeCentros").attr("style", "height:415px;");
                var urldest = 'http://www.sanitas.es/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/dni/busqueda-guia-medica/';                
                $('#formPortada1').attr('action',urldest);
                $('#formPortada1').submit();
            }else {
              cambiaEstilo()
              $('#popupDni1').show();
            }
          } 
        });    
        navega=false;//ponemos false por que no queremos que navegue con el formulario
        
    }

    break;
    case "numTarjeta":
    if($('#numTarjeta').val()=="" || $('#numTarjeta').val()=="Numero de tarjeta"){
   
          $("#msgError").attr("class","mensajeErrorPeque");
          $("#msgError").html("Introduce el n&uacute;mero de la tarjeta");          
          $("#cajaForm1").attr("style", "height:244px;");
          $("#cajaForm2").attr("style", "height:244px;"); //esto es para que las dos cajas tengan el mismo tamano          
          //$(".imgHomeCentros").attr("style", "height:468px;");
          $("#msgError2").attr("class","mensajeErrorVacio");
          $("#msgError2").html("");          

          navega = false;
    }else{
         
          $('#docOculto').val("");
          $("#msgError").attr("class","noseve");
          $("#msgError").hide();           
           $.ajax({
          url: "/sanitas/pages/medicoscentros/ajax/compruebaTarjeta.jsp?tarjeta="+$('#numTarjeta').val(),
          
          context: document.body,
          success: function(data){
          var jsonData = eval(data);
          if(jsonData=='OK'){
                OmniturePortadaGuia();
                $("#msgError").attr("class","noseve");
                $("#msgError").hide();
                $("#msgError2").attr("class","noseve");
                $("#msgError2").hide();        
                $("#cajaForm1").attr("style", "height:205px;");
                $("#cajaForm2").attr("style", "height:205px;");
               // $(".imgHomeCentros").attr("style", "height:415px;");
                var urldest = 'http://www.sanitas.es/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/tarjeta/busqueda-guia-medica/';
                $('#tarjetaOculta').val($('#numTarjeta').val());
                $('#formPortada1').attr('action',urldest);
                $('#formPortada1').submit();                
            }else {              
              navega=false;              

              $("#msgError").attr("class","mensajeErrorPeque");
              $("#msgError").html("Introduce el n&uacute;mero correcto");
              $("#msgError").show();
              $("#cajaForm1").attr("style", "height:244px;");
              $("#cajaForm2").attr("style", "height:244px;"); //esto es para que las dos cajas tengan el mismo tamano          
             // $(".imgHomeCentros").attr("style", "height:468px;");
              $("#msgError2").attr("class","mensajeErrorVacio");
              $("#msgError2").html("");                          
             
            }
          } 
        }); 
       navega=false;   
    }
    break;
    case "producto":
    if($('#producto').val()=="prod"){
        
          $("#msgError").attr("class","mensajeErrorPeque");
          $("#msgError").html("Selecciona un  producto");          
          $("#cajaForm1").attr("style", "height:244px;");
          $("#cajaForm2").attr("style", "height:244px;"); //esto es para que las dos cajas tengan el mismo tamano          
          //$(".imgHomeCentros").attr("style", "height:468px;");
          $("#msgError2").attr("class","mensajeErrorVacio");
          $("#msgError2").html("");        
          
        navega = false;
    }else{
        OmniturePortadaGuia();
        $("#msgError").attr("class","noseve");
        $("#msgError").hide();
        $("#msgError2").attr("class","noseve");
        $("#msgError2").hide();        
        $("#cajaForm1").attr("style", "height:205px;");
        $("#cajaForm2").attr("style", "height:205px;"); //esto es para que las dos cajas tengan el mismo tamano 
        //$(".imgHomeCentros").attr("style", "height:415px;");
        url = url+ $('#producto').val();
    }
        
    break;
    default:
      navega = false;
              
    break;
}
  if(navega){
    $('#formPortada1').attr('action',url);
    $('#formPortada1').submit();
  }
}
function criteriosBusqueda2(){
var navega = true;
switch($("input[name='rad2']:checked").val()){
    case "nif":
    if($('#numDocumento').val()=="" || $('#numDocumento').val()=="Documento"){
          $("#dniError").attr("class","error");
          $("#dniError").show();
          navega = false;
    }else{
          $('#docOculto').val($('#numDocumento').val());
          $('#tarjetaOculta').val("");
          $("#dniError").attr("class","noseve");
          $("#dniError").hide();
           var url="http://www.sanitas.es/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/descarga-guia-medica/index.html";
    }
    break;
    case "numTarjeta":
    if($('#numTarjeta').val()=="" || $('#numTarjeta').val()=="Tarjeta"){
          $("#tarjetaError").attr("class","error");
          $("#tarjetaError").show();
          navega = false;
    }else{
          OmnitureDescargaGuia();
          $('#tarjetaOculta').val($('#numTarjeta').val());
          $('#docOculto').val("");
          $("#tarjetaError").attr("class","noseve");
          $("#tarjetaError").hide(); 
          $("#tarjetaOk").hide();
           var url="http://www.sanitas.es/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/descarga-guia-medica/index.html";
    }
    break;
    case "producto":
     if($('#producto').val()=="prod"){
        $("#productoError").attr("class","error");
        $("#productoError").show();
        navega = false;
    }else{
        OmnitureDescargaGuia();
        $("#productoError").attr("class","noseve");
        $("#productoError").hide();
         var url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/descarga-guia-medica/"+ $('#producto').val();
    }         
        
    break;
    default:
       navega=false;       
    break;
}
    if(navega){
 
  $('#formDescarga1').attr('action',url);
  $('#formDescarga1').submit();
    }
}


function buscarCentro(provincia,localidad,especialidad,subespecialidad,centro){
  //Hay que resolver como montar esta url para oficinas colaboradoras
  var url = "";
if($('#producto').val()!="prod" && $('#producto').val()!=null ){
     url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/"+(esDniTarjeta())+$('#producto').val()+"/"+ getNomPestana() +"/buscar-centro/" + provincia + "/" + localidad + "/" + especialidad + "/"+subespecialidad+"/"+centro;
}else{
     url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/"+(esDniTarjeta())+$('#busquedaGuia').html()+"/"+ getNomPestana() +"/buscar-centro/" + provincia + "/" + localidad + "/" + especialidad + "/"+subespecialidad+"/"+centro;
}
if($('#CPostal').val()!="" && $('#CPostal').val()!="C.P." ){
    var cp = $('#CPostal').val();
    guardarCoordenadasDireccion(cp,url);
}else{
$('#form3').attr('action',url);
  $('#form3').submit();
}  
}
function buscarMedico(provincia,localidad,especialidad,subespecialidad,medico,idima,sexo){
//Sexo e idioma se separan con una _ debidop al exceso de parametros
var url = "";
if($('#producto').val()!="prod" && $('#producto').val()!=null ){
 url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/"+(esDniTarjeta())+$('#producto').val()+"/"+ getNomPestana() +"/buscar-medico/" + provincia + "/" + localidad + "/"  + especialidad + "/" + subespecialidad + "/" + medico + "/"  + idioma + "_"  + sexo; 
}else{
 url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/"+(esDniTarjeta())+$('#busquedaGuia').html()+"/"+ getNomPestana() +"/buscar-medico/" + provincia + "/" + localidad + "/"  + especialidad + "/" + subespecialidad + "/" + medico + "/"  + idioma + "_"  + sexo; 
}
if($('#CPostal').val()!="" && $('#CPostal').val()!="C.P." ){
    var cp = $('#CPostal').val();
    guardarCoordenadasDireccion(cp,url);
}else{
$('#form3').attr('action',url);
  $('#form3').submit();
} 
}
function busquedaCliente(){
    var url="/sanitas/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/busqueda-guia-medica";
  $('#form1').attr('action',url);
  $('#form1').submit();
}

function validaProductoGuiaMedica() {

    if ( $('#producto1').val() == "prod" ) {

        $('#msgError').html("Selecciona un Producto");        
        $('#msgError').attr("class","mensajeErrorGrand");
        return false;
    }else if($('#producto2').val() == "prod" ){
        $('#msgError').html("Selecciona un Producto");        
        $('#msgError').attr("class","mensajeErrorGrand");
        return false;
    }else {

        $('#msgError').attr("class","noseve");
        return true;
    }
    
}
function validaNombre(){
 if($('#numDocumentoPop1').val()!="" && $('#numDocumentoPop1').val()!="Documento"){
       $("#dniErrorPop1").attr("class","noseve");
      $("#dniErrorPop1").hide();
 }else{
       $("#dniErrorPop1").attr("class","errorIcon");
      $("#dniErrorPop1").html("");
      $("#dniErrorPop1").show();
 }
} 
/*Esta funcion se encarga de manejar el popup primero del dni
 * coge el dni introducir por el usuarioy lo envia por ajax, en el caso de que el status sea ok
 * realiza la navegacion a la pagina de buquedas, si no es OK, presenta el siguiente popup*/
function enviarDni(){

   if($('#numDocumentoPop1').val()!="" && $('#numDocumentoPop1').val()!="Documento"){
      $('#docOculto2Pop1').val($('#numDocumentoPop1').val());
      $("#dniErrorPop1").attr("class","noseve");
      $("#dniErrorPop1").hide();
      var tipoDoc = $('#formDni1 ul li select').val();

     $.ajax({
          url: "/sanitas/pages/medicoscentros/ajax/compruebaDni.jsp?dni="+$('#numDocumentoPop1').val().toUpperCase()+"&tipoDoc="+tipoDoc,
          
          context: document.body,
          success: function(data){            
            var jsonData = eval(data);          
            if(jsonData=='OK'){
                $("#tipoDocumento2").val($("#formDni1 select").val());
                $('#tarjetaOcultaPop1').val("");
                url = '/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/busqueda-guia-medica';
                $('#formDni1').attr('action',url);
                $('#formDni1').submit();
            }else {
              $('#popupDni1').hide();
              $('#popupDni2').show();
            }
          } 
        });    
   } else {
      $("#dniErrorPop1").attr("class","errorIcon");
      $("#dniErrorPop1").html("");
      $("#dniErrorPop1").show();
      //$('#docOculto2').val($('#numDocumento').val());
   }
}

function BorrarDatosPortada(id){
  var documento = "Documento";
  var tarjeta = "Numero de tarjeta";
  
 var productoguia = "prod";
  var sel = "";
  var prov ="p";
  switch (id){

      case 1:
          $('#numDocumento').attr("value", sel);
          $('#numDocumento').attr("class", "Black1");
          $("#cajaForm2").attr("style", "height:205px;"); //esto es para que las dos cajas tengan el mismo tamano
          $('#numTarjeta').attr("value", tarjeta);
          $('#producto').attr("value", productoguia);
          $('#checkNIF').attr("checked", true);
          $("#msgError2").attr("class","noseve");
          $("#msgError").attr("class","noseve");

          $("#cajaForm1").attr("style", "height:205px;");
         // $(".imgHomeCentros").attr("style", "height:415px;");

      break;
      case 2:
          $('#numDocumento').attr("value", documento);          
              
          $('#numTarjeta').attr("value", sel);
          $('#numTarjeta').attr("class", "Black2");
          $('#producto').attr("value", productoguia);
          $('#checknumTarjeta').attr("checked", true);
          $("#cajaForm2").attr("style", "height:205px;"); //esto es para que las dos cajas tengan el mismo tamano
          $("#msgError2").attr("class","noseve");
          $("#msgError").attr("class","noseve");

          $("#cajaForm1").attr("style", "height:205px;");
         // $(".imgHomeCentros").attr("style", "height:415px;");
      break;
      case 3: //este caso era para el producto
          $('#numDocumento').attr("value", documento);           
          $('#numTarjeta').attr("value", tarjeta);
          $('#producto').attr("value", productoguia);
          $('#checkproducto').attr("checked", true);

      break;
      case 4: //este caso es para la provincia
          $('#provincia').attr("value", prov);

      break;
      case 11:
          $('#numDocumento').attr("class", "numDocumento");
      break;
      case 22:
          $('#numTarjeta').attr("class", "numTarjeta");
      break;
      case 33:
          $('#CPostal').attr("value", sel);
      break;
      case 44:
          $('#CPostalUrl').attr("value", sel);
      break;
      default:
      break;
  }
  
}
function BorrarDni(){
    $('#borrarDni').val("borrar");
    $('#docOculto').val("");
    $('#form1').submit(); 
}
function BorrarTarjeta(){
    $('#borrarTarjeta').val("borrar");
    $('#tarjetaOculta').val("");
    $('#form1').submit(); 
}
function nuevaSeleccion(){
 
   var val=$("#Especialidad option:selected").html(); 
   $('#seleccionado').val(val);
}
  function borrar(id){
 
  switch (id){
      case "prov":
          if($('#provinciaHomeMedicos').val()=="p"){

          }else{
              $('#provinciaError').attr("class","noseve")
          }
          $('#CPostal').val("C.P.");
          $('#BuscaProximidadCampo').val("Calle, numero, barrio, poblacion, provincia, CP");
      break;
      
      case "pob":

          $('#CPostal').val("C.P.");
          $('#BuscaProximidadCampo').val("Calle, numero, barrio, poblacion, provincia, CP");
      break;
      case "espe":
          if($('#Especialidad').val()=="e"){

          }else{
              $('#espeError').attr("class","noseve");
          }
       
      break;
      case "r1":
          $('#RadBuscaProximidad').attr("checked","checked");
          $('#RadBuscaCentro').attr("checked","");
          $('#RadBuscaMedico').attr("checked","");
          $('#opcionesError').attr("class","noseve");
          $('#BuscaProximidadCampo').val("Calle, numero, barrio, poblacion, provincia, CP");
          $('#botBuscar').attr("style","margin-top:0px;");
          $('#buscando3').attr("style","margin-top:0px;");
          $('#camposOpciones').attr("style","margin-top: 0px; / margin-top:-23px;");
          $('#medico').attr("class","camposOpciones");
          $('#medico').hide();
      break;
      case "r2":
          $('#RadBuscaProximidad').attr("checked","");
          $('#RadBuscaCentro').attr("checked","checked");
          $('#RadBuscaMedico').attr("checked","");
          $('#opcionesError').attr("class","noseve");
          $('#InputBuscaCentro').val("Indica el nombre del centro");
          $('#botBuscar').attr("style","margin-top:0px;");
          $('#buscando3').attr("style","margin-top:0px;");
          $('#camposOpciones').attr("style","margin-top: 0px; / margin-top:-23px;");
          $('#medico').attr("class","camposOpciones");
          $('#medico').hide();
      break;
      case "r3":
          $('#RadBuscaProximidad').attr("checked","");
          $('#RadBuscaCentro').attr("checked","");
          $('#RadBuscaMedico').attr("checked","checked");
          $('#opcionesError').attr("class","noseve");
          $('#BuscaNombre').val("Indica el nombre del medico");
          $('#botBuscar').attr("style","margin-top:50px;");
          $('#buscando3').attr("style","margin-top:50px;");
          $('#medico').attr("class","camposOpcionesMedico");
          
      break;
      case "nombre":
          $('#BuscaNombre').val("");
          $('#medicoError').attr("class","noseve");
          
      break;
      case "centro":
         
          $('#InputBuscaCentro').val("");
          $('#centroError').attr("class","noseve");
      break;
      case "prox":
          $('#CPostal').val("C.P.");
          $('#CPostalUrl').val('');
          $('#BuscaProximidadCampo').val("");
          $('#direccionError').attr("class","noseve");
      break;
      default:
      break;
  }
     $('#lscentros').attr("style","position:relative;top:0px");
  
  }
  function buscaGeneral(){
    var retorno = false;
 
    retorno = validaProductoGuiaMedica();
    if (!retorno) {return retorno;}
    
    retorno = false;
         
    if ($('#provinciaHomeMedicos').val()=="p"){
        
        $('#msgError').attr("class","mensajeErrorGrand");
        $('#msgError').html("Selecciona una Provincia");
    }
    else{
      
      $('#msgError').attr("class","noseve");
      provincia=$('#provinciaHomeMedicos').val();
      $('#oculto0').hide();
      $('#oculto1').hide();
      $('#bgeneral').show();
      retorno = true;      
      OmnitureGuiaBtnBuscar("estandar");
    }
if($('#producto').val()!="prod" && $('#producto').val()!=null ){var guia = $('#producto').val(); }
    if ($('#Especialidad').val()=="e" && !$('#pestanaMedico').hasClass('on') ){
      
        $('#msgError').attr("class","mensajeErrorGrand");
        $('#msgError').html("Selecciona una Especialidad");
        retorno=false;
    }
    else{
      especialidad=$('#Especialidad').val();
      
      if(retorno==true){
          if($('#pestanaMedico').hasClass('on')){
            $('#buscando1').attr("class","loader");
          }
         if(!$('#pestanaMedico').hasClass('on')){
              
              $('#msgError').attr("class","noseve");
         }
         retorno=true;
      }
    }    
    
    if ($('#Localidad').val()=="l"){
      localidad="l";
    }
    else{
      localidad=$('#Localidad').val();
    }
    
    if ($('#Especialidad').val()=="e"){
      especialidad="e";
    }
    else{
      especialidad=$('#Especialidad').val();
    }
    
    //Hay que resolver como montar esta url para oficinas colaboradoras
   
    
     
    if(retorno){
    var url = "";      

if($('#producto').val()!="prod" && $('#producto').val()!=null ){
        url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/"+(esDniTarjeta())+$('#producto').val()+"/" + getNomPestana() + "/" + provincia + "/" + localidad + "/" + especialidad + "/s";
    }else{
      url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/"+(esDniTarjeta())+($('#busquedaGuia')!=null ? $('#busquedaGuia').html() : "busqueda-guia-medica")+"/" + getNomPestana() + "/" + provincia + "/" + localidad + "/" + especialidad + "/s";
    }
       $("#form1").attr("action",url);
       $("#form1").submit();
    }
    
  return retorno;
    }
    
/*function nif(dni) {
  if(dni!="" && $("#NIF").val()== 0 ){
    numero = dni.substr(0,dni.length-1);
    letras = dni.substr(dni.length-1,1);
    numero = numero % 23;
    letra='TRWAGMYFPDXBNJZSQVHLCKET';
    letra=letra.substring(numero,numero+1);
    if (letra!=letras) {
                $("#dniError").attr("class","error");
            $("#dniError").show();
    }
  }
}*/

function SubmitDniPopup1(){
    var navega=true;
    if($('#numDocumento').val()=="" || $('#numDocumento').val()=="Documento"){
          $("#dniError").attr("class","error");
          $("#dniError").show();
          navega = false;
    }else{
          $('#docOculto2').val($('#numDocumento').val());
          $("#dniError").attr("class","noseve");
          $("#dniError").hide();
    }
  if(navega){
    $('#form1').submit();
  }
}
function validaNombre1(cadena){
          if(cadena =="" ){
                $("#dniErrorPop1").attr("class","errorIcon");
                $("#dniErrorPop1").html("");
                $("#dniErrorPop1").show();
           
            }else{
                
                $("#dniErrorPop1").attr("class","okIcon");
                $("#dniErrorPop1").html("");
                
            }
}
function validaNombre2(cadena){
          if(cadena =="" ){
                $("#nombreError").attr("class","errorIcon");
                $("#nombreError").html("");
                $("#nombreError").show();
           
            }else{
                
                $("#nombreError").attr("class","okIcon");
                $("#nombreError").html("");
                
            }
}
function validaTelefono(cadena){
            if( !(/^\d{9}$/.test(cadena)) ) {
                $("#telefonoError").attr("class","errorIcon");
                $("#telefonoError").html("");
                $("#telefonoError").show();
             

            }else{
                
                $("#telefonoError").attr("class","okIcon");
                $("#telefonoError").html("");
            }
}
function validaApellidos(cadena){
            if(cadena=="" ){
                $("#apellidosError").attr("class","errorIcon");
                $("#apellidosError").html("");
                $("#apellidosError").show();
             
            }else{
                   
                $("#apellidosError").attr("class","okIcon");
                $("#apellidosError").html("");
            }
}
function validaCorreo(cadena){
            if(cadena =="" ){
                $("#emailError").attr("class","errorIcon");
                $("#emailError").html("");
                $("#emailError").show();
         
            }else{
                var valor = $('#correo').val();
                var re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;
                if(!re.exec(valor))    {
             
                    $("#emailError").attr("class","errorIcon");
                    $("#emailError").html("");
                    $("#emailError").show();
                }else{
             
                    $("#emailError").attr("class","okIcon");
                    $("#emailError").html("");              
                }

            }
}
function validaTarjeta(cadena){
                if( !(/^\d{18}$/.test(cadena)) ) {
                $("#tarjetaError").attr("class","errorIcon");
                $("#tarjetaError").html("");
                $("#tarjetaError").show();

            }else{
                
                $("#tarjetaError").attr("class","okIcon");
                $("#tarjetaError").html("");
                $("#tarjetaOk").hide();
            }
            if( !(/^\d{18}$/.test(cadena))) {
                $("#tarjetaErrorP").attr("class","errorIcon");
                $("#tarjetaErrorP").html("");
                $("#tarjetaErrorP").show();
              
            }else{
                
                $("#tarjetaErrorP").attr("class","okIcon");
                $("#tarjetaErrorP").html("");
                
            }
}
 function ValidarDniPopUp2(){
          $(".boxButton").attr("style","right:78px;");
          var navega=true;
            if($('#nombre').val()=="" ){
                $("#nombreError").attr("class","errorIcon");
                $("#nombreError").html("");
                $("#nombreError").show();
                navega = false;
            }else{
                
                $("#nombreError").attr("class","okIcon");
                $("#nombreError").html("");
                
            }
           
            if( !(/^\d{9}$/.test($('#telefono').val())) ) {
                $("#telefonoError").attr("class","errorIcon");
                $("#telefonoError").html("");
                $("#telefonoError").show();
                navega = false;

            }else{
                
                $("#telefonoError").attr("class","okIcon");
                $("#telefonoError").html("");
            }
            if($('#apellidos').val()=="" ){
                $("#apellidosError").attr("class","errorIcon");
                $("#apellidosError").html("");
                $("#apellidosError").show();
                navega = false;
            }else{
                   
                $("#apellidosError").attr("class","okIcon");
                $("#apellidosError").html("");
            }
            if($('#correo').val()=="" ){
                $("#emailError").attr("class","errorIcon");
                $("#emailError").html("");
                $("#emailError").show();
                navega = false;
            }else{
                var valor = $('#correo').val();
                var re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;
                if(!re.exec(valor))    {
                    navega = false;
                    $("#emailError").attr("class","errorIcon");
                    $("#emailError").html("");
                    $("#emailError").show();
                }else{
                   
                    $("#emailError").attr("class","okIcon");
                    $("#emailError").html("");              
                }

            }
            if( !(/^\d{18}$/.test($('#tarjeta').val())) ) {
                $("#tarjetaError").attr("class","errorIcon");
                $("#tarjetaError").html("");
                $("#tarjetaError").show();
                navega = false;
            }else{
                
                $("#tarjetaError").attr("class","okIcon");
                $("#tarjetaError").html("");
                $("#tarjetaOk").hide();
            }
            if( !(/^\d{18}$/.test($('#tarjeta').val())) ) {
                $("#tarjetaErrorP").attr("class","errorIcon");
                $("#tarjetaErrorP").html("");
                $("#tarjetaErrorP").show();
                navega = false;
            }else{
                
                $("#tarjetaErrorP").attr("class","okIcon");
                $("#tarjetaErrorP").html("");
                
            }
          if(navega){
          $.ajax({
      url: "/sanitas/grabar-formulario?msForm="+$('#msForm').val()+"&msUrlError="+$('#msUrlError').val()+"&msUrl="+$('#msUrl').val()+"&nombre="+$('#nombre').val()+"&apellidos="+$('#apellidos').val()+"&tarjeta="+$('#tarjeta').val()+"&telefono="+$('#telefono').val()+"&correo="+$('#correo').val()+"&asunto=Formulario Dni Incorrecto",
      
      
      context: document.body,
      success: function(data){
       $('#popupDni3').show();
      } 
    });    
          
  
/****** AQUI HAY QUE HACER EL SUBMIT DEL FOPRMULARIO POR AJAX A DEONDE CORRESPONDA 
    $('#formPop2').submit();
    
    ******************************************/
    $('#popupDni2').hide();
    $('#popupDni3').show();
  }
 }
        
function BorrarDocumento(){
    var sel = "";
    $('#numDocumento').attr("value", sel);
    $('#numDocumentoPop1').attr("value", sel);
    $("#dniError").hide();
}

function OmniturePortadaGuia(){

var nif = $('#numDocumento').val();
var tarjeta = $('#numTarjeta').val();
var producto = $('#producto option:selected').text();
var provincia = $('#provincia').val();
var espe = $('#especialidad').val();

    if ( nif != 'Documento'){

        s=s_gi(s_account);
        s.linkTrackVars='events,eVar66';
        s.linkTrackEvents='event84';
        s.eVar66="home medicos y centros:cliente:documento de identidad";
        s.events='event84'+ (omnitureSessionId ? (':'+omnitureSessionId) :'');        
        s.tl(this,'o','boton buscar');
    }
    
    if ( tarjeta != 'Numero de tarjeta'){
    
        s=s_gi(s_account);
        s.linkTrackVars='events,eVar66';
        s.linkTrackEvents='event84';
        s.eVar66="home medicos y centros:cliente:tarjeta";
        s.events='event84'+ (omnitureSessionId ? (':'+omnitureSessionId) :'');
        s.tl(this,'o','boton buscar');
    }
    
    /*INT-1975 => Eliminamos el marcado omniture para productos*/
    /*
    if ( producto != 'Producto'){
     
        s=s_gi(s_account);
        s.linkTrackVars='events,eVar66';
        s.linkTrackEvents='event84';
        s.eVar66="home medicos y centros:cliente: "+producto;
        s.events='event84'+ (omnitureSessionId ? (':'+omnitureSessionId) :'');         
        s.tl(this,'o','boton buscar');
        
    }*/
    
    //este es para el caso de no clientes
    if ( provincia != 'p'){
    
        s=s_gi(s_account);
        s.linkTrackVars='events,eVar66';
        s.linkTrackEvents='event84';
        s.eVar66="home medicos y centros:no cliente: "+provincia+(espe != "Especialidad" ? ":"+espe : "");;
        s.events='event84'+ (omnitureSessionId ? (':'+omnitureSessionId) :'');        
        s.tl(this,'o','boton buscar');
       
    }
}

function OmnitureGuiaBtnBuscar(tipo){
var tipoRadio = "";
        switch ($("input[name='rad']:checked").val())
	{
		case 'BuscaCentro':  
    if($('#InputBuscaCentro').val()!="" && $('#InputBuscaCentro').val()!="Indica el nombre del centro"){
       tipoRadio =  " - centro";
    }    
        
		break;
		case 'BuscaProximidad':
     if($('#BuscaProximidadCampo').val()!="" && $('#BuscaProximidadCampo').val()!="Calle, numero, barrio, poblacion, provincia, CP"){
       tipoRadio = " - proximidad";
     }   
		break;
		case 'BuscaMedico':	
    if(($('#BuscaNombre').val()!="" && $('#BuscaNombre').val()!="Indica el nombre del medico")||($('#BuscaIdioma').val()!="" && $('#BuscaIdioma').val()!="i")||($('#Sexo').val()!="" && $('#Sexo').val()!="Sexo")){
        tipoRadio = " - medico";
    }    
        
		break;
		default: 
			
		break;
	}
        var tmp = ""; //compruebo la pestana que esta activa para pasarselo por omniture
        if($('#pestanaMedico').hasClass('on')){
            tmp = "cuadro medico";        
        }else if($('#pestanaDental').hasClass('on')){
            tmp = "cuadro dental";            
        }else if($('#pestanaPruebas').hasClass('on')){
            tmp = "pruebas diagnosticas";
        }else if($('#pestanaUrgencias').hasClass('on')){
            tmp = "urgencias";
        }
        
        s=s_gi(s_account);
        s.linkTrackVars='events,eVar67';
        s.linkTrackEvents='event85';
        s.eVar67= tmp + ":" + tipo + tipoRadio;
        s.events='event85'+ (omnitureSessionId ? (':'+omnitureSessionId) :'');
        s.tl(this,'o','boton buscar');
        
}

function OmnitureDescargaGuia(){
      
    var tarjeta = $('#numTarjeta').val();
    var producto = $('#producto option:selected').text();
      
    if ( tarjeta != 'Tarjeta'){ 
        s=s_gi(s_account);
        s.linkTrackVars='events,eVar70';
        s.linkTrackEvents='event89';
        s.eVar70= "tarjeta";
        s.events='event89'+ (omnitureSessionId ? (':'+omnitureSessionId) :'');
        s.tl(this,'o','boton buscar');
       
    }
    
    if ( producto != 'Producto'){ 
   
        s=s_gi(s_account);
        s.linkTrackVars='events,eVar70';
        s.linkTrackEvents='event89';
        s.eVar70= "producto:"+producto;
        s.events='event89'+ (omnitureSessionId ? (':'+omnitureSessionId) :'');
        s.tl(this,'o','boton buscar');
        
    }
    
        
}


//Funcion que comprueba si se ha pulsado la tecla enter, y en tal caso, hace submit del formulario
function submitenter(myfield,e,id)
{
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;


if (keycode == 13)
   {  
   switch (id){
      case "cliente":
         $('#botBuscar').click();
      break;
      case "nocliente":
         $('#botBuscar2').click();
      break;
      case "general":
        $('#bgeneral').click();
      break;
      case "avanzada":
       $('#bavanzada').click();
      break;
      case "masOpciones":
        $('#botBuscar').click();
      break;
      case "descarga":
        $('#botDescarga').click();
      break;
      case "pop1":
        $('#botPop1').click();
      break;
      case "pop2":
        $('#botPop2').click();
      break;
  }

   return false;
   }
else
   return true;
}
function borrarNombre(){
    var vacio = "";
    $('#nomBusq').attr("value", vacio);
}


function esDniTarjeta(){
    var esTarjeta = $('#numtarjeta')!=null && $('#numtarjeta').val()!=null && $('#numtarjeta').val() != '' &&  $('#numtarjeta').val() != 'undefined';    
    var esDNI = $('#usuariopordni')!=null && $('#usuariopordni').val()!=null && $('#usuariopordni').val() != '' &&  $('#usuariopordni').val() != 'undefined';    
    return (esTarjeta ?'tarjeta/' : '')+(esDNI ?'dni/' : '');    
}
function cambiaEstilo(){
$('#botonesCabecera').attr("class","noseve2");

}
function quitarEstilo(){
$('#botonesCabecera').attr("class","botonesEmpresas");
}

/*FUNCIONES PARA LA NUEVA SECCION DE ESPECIALIDADES MEDICAS DE HOSPITALES*/

/*funcion para pintar las subespecialidades*/
function getSubEspeCM(){
  var prestador = $("#prestador").html();  
  var provincia = $("#provincia").html();
  var poblacion = $("#poblacion").html();
  var infra = $("#infra").html();
  var especialidad = $("#especialidades").val();
  var nombreCentro = $("#nombreCentro2").html();
  
  if(especialidad == null){
    especialidad = "todas";
  }
  if(especialidad != 'todas'){
    $.ajax({
        url: "/sanitas/pages/medicoscentros/ajax/subEspeJSON.jsp?prestador="+prestador+"&provincia="+ provincia+"&poblacion="+ poblacion+"&infra="+ infra+"&especialidad="+ especialidad+"&centro="+ nombreCentro,
        context: document.body,
        success: function(data){       
        $('.contentEspe').html(data);
          
          var lista = "";    
          lista = document.getElementById("especialidades");
          indiceSeleccionado = lista.selectedIndex;          
          opcionSeleccionada = lista.options[indiceSeleccionado];
          var urlOpcion = opcionSeleccionada.text;

            var centro = $("#nombreCentro").val();
            centro = centro.replace(/-/g, " ");
    
          s=s_gi(s_account); 
          s.linkTrackVars='prop14'; 
          s.linkTrackEvents='None'; 
          s.prop14=centro + ":" + urlOpcion;
          s.tl(this,'e','Click en especialidad');
          
        } 
      });    
  }else{
    $.ajax({
        url: "/sanitas/pages/medicoscentros/ajax/subEspeJSON.jsp?prestador="+prestador+"&provincia="+ provincia+"&poblacion="+ poblacion+"&infra="+ infra+"&especialidad="+ especialidad + "&todas=si",
        context: document.body,
        success: function(data){       
        $('.contentEspe').html(data);
         
        } 
      });   
  }
}

function getEspeCM(especialidad){
  var prestador = $("#prestador").html();  
  var provincia = $("#provincia").html();
  var poblacion = $("#poblacion").html();
  var infra = $("#infra").html();
  var nombreCentro = $("#nombreCentro2").html();
  
  $.ajax({
        url: "/sanitas/pages/medicoscentros/ajax/subEspeJSON.jsp?prestador="+prestador+"&provincia="+ provincia+"&poblacion="+ poblacion+"&infra="+ infra+"&especialidad="+ especialidad+"&centro="+ nombreCentro,
        context: document.body,
        success: function(data){       
        $('.contentEspe').html(data);
         
        } 
      });

 document.getElementById("todas").selected= false;
 document.getElementById(especialidad).selected= true;
  
}

function omniturePedirCita(){
    var nombreCentro = $("#nombreCentro").html();
    
    s=s_gi(s_account);
    s.linkTrackVars='events,eVar58';
    s.linkTrackEvents='event87';
    s.events='event87'+ (omnitureSessionId ? (':'+omnitureSessionId) :'');
    s.eVar58='microsite milenium ' + nombreCentro;
    s.tl(this,'o','boton pedir cita');
    $('#formPedirCita').attr("action","https://www.sanitas.es/misanitas/online/clientes/citas/index.html");
    $('#formPedirCita').submit(); 
}

function inicializarAPIMasOpciones(){
  var calssScript = $('#scriptAPI').attr('class');
  if (calssScript == null){
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.id = "scriptAPI";
     script.className = "cargadoOK";
     script.src = "http://maps.google.es/maps/api/js?v=3.6.2&amp;sensor=false&amp;language=es&amp;client=gme-bupa&amp;channel=Sanitas-guiamedica-web&amp;callback=busquedaMasOpciones";
     document.body.appendChild(script);
   }else{
      busquedaMasOpciones();
   }  
}
$(document).ready(function(){
  var sc_socid = $("#sc_socid").val();
  if(sc_socid != null && sc_socid == "sc_socid" && !getCookie("sc_socid")){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + 365);
    var c_value = "true" + "; expires=" + exdate.toUTCString() + ";path=/";
    document.cookie = "sc_socid" + "=" + c_value;
  }
});


function getCookie(c_name)
{
  var i,x,y,ARRcookies=document.cookie.split(";");
  
  for (i=0;i<ARRcookies.length;i++){
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name)
      {
      return true;
      }
  }
  
  return false;
}
