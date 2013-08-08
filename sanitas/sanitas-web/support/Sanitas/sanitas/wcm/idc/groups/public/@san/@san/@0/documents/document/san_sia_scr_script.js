$(function() {
//    $("pre").corner("8px");
});

//**********************************************************************************************************
// Funcion que submitea el formulario, si la validacion es correcta para un usuario
//**********************************************************************************************************
function accesoUsuario() {
 if (validaCamposUsuario()) {
 document.form_valida_cliente.opcion.value = "";
 document.form_valida_cliente.submit();
 }
} 


//**********************************************************************************************************
// Funcion que solo permite introducir cifras y letras
//**********************************************************************************************************
function esCifraoLetra(event) {
 if ((event.keyCode > 47 && event.keyCode < 58 )
 || (event.keyCode > 64 && event.keyCode < 91)
 || (event.keyCode > 96 && event.keyCode < 123)
 || (event.keyCode==44)|| (event.keyCode==46)|| (event.keyCode==64)|| (event.keyCode==95)|| (event.keyCode==127)
 )
 event.returnValue = event.keyCode;
 else event.returnValue = false;
}

//**********************************************************************************************************
// Funcion que solo permite introducir cifras
//**********************************************************************************************************
 function esCifra(event) {
 if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;
} 

//**********************************************************************************************************
// Funcion que establece un action para un formulario pasado como parametro.
//**********************************************************************************************************
function setSeccion(object, gestion_poliza, action) {
 document.getElementById(gestion_poliza).action = action + object.options[object.selectedIndex].id;
} 

function valida_guia(){
 var retorno = false;
    if ($('#provincia').val()=="p"){
      //TODO multiidioma
      alert("Se ha de indicar la provincia");
    }
    else{
      provincia=$('#provincia').val();
      retorno = true;
    }
    
    if ($('#especialidad').val()=="e"){
      especialidad="e";
    }
    else{
      especialidad=$('#especialidad').val();
    }
    
    //Hay que resolver como montar esta url para oficinas colaboradoras
    var url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/busqueda-guia-medica/cuadro-medico/" + provincia + "/l/" + especialidad + "/s";
    
    $("#encuentranos").attr("action",url); 
    if(retorno){
        $("#encuentranos").attr("onsubmit","");
        //omniture en el boton buscar de la portada
        s=s_gi('bupasanitasprod,bupaglobalprod');
        s.linkTrackVars='events,eVar66';
        s.linkTrackEvents='event84';
        s.eVar66="home sanitas:no soy cliente: "+provincia+(especialidad != "e" ? ":"+especialidad : "");
        s.events='event84'+ (omnitureSessionId ? (':'+omnitureSessionId) :'');
        s.tl(this,'o','boton buscar');
      
       $("#encuentranos").submit();
    }else{
      
      return retorno;
    }
}

function recuperaPassword(ctx) {

 /*if (document.acceso_usuario.text_usuario.value == ""){
 alert("El usuario es obligatorio");
 }else{*/
 document.acceso_usuario.action = ctx+"/usuario/recupera-password";
 document.acceso_usuario.estado_peticion.value = "recupera_pregunta";
 document.acceso_usuario.submit();
 //}
} 


function limpiar(elemento, texto) {
 if (elemento.value == texto ) {
      elemento.value = '';
 } 
} 


 function limpiarCamposVaciosContr (textoEdad, textoCP ){
      limpiar(document.getElementById("edad"), textoEdad);
      limpiar(document.getElementById("codPostal"), textoCP);
      
 }

// Script para escribir s�lo n�meros
function numbersonly(myfield, e, dec)
{
var key;
var keychar;

if (window.event)
   key = window.event.keyCode;
else if (e)
   key = e.which;
else
   return true;
keychar = String.fromCharCode(key);

// control keys
if ((key==null) || (key==0) || (key==8) || 
    (key==9) || (key==13) || (key==27) )
   return true;

// numbers
else if ((("0123456789").indexOf(keychar) > -1))
   return true;

// decimal point jump
else if (dec && (keychar == "."))
   {
   myfield.form.elements[dec].focus();
   return false;
   }
else
   return false;
}

/**Funcion de devolucion de datos de la imagen seleccionada en la plantilla de busqueda de mimagesnes*/
function notifySpecificDocSelect(mForm)
{
window.ext = window.top.opener.WCM.GetExternal(window.top);
// Prepare notify event to IntradocClient control.
var selectedDocsStr = "";

selectedDocsStr += "@Properties LocalData\nClientEvent=SelectDocumentInInfo\n";
selectedDocsStr += "dID=";
var dID = mForm.dID.value;
selectedDocsStr += dID + "\n";
selectedDocsStr += "dDocName=";
var dDocName = mForm.dDocName.value;
selectedDocsStr += dDocName;
selectedDocsStr += "\ndDocTitle=";
var title = mForm.dDocTitle.value;
selectedDocsStr += "Title title"+ "\n";

var altTag = title;
var titleTag = title;
var docUrl = "";


if( mForm && mForm.renLabel_UrlEncoded && mForm.renLabel_UrlEncoded.value && mForm.renLabel_UrlEncoded.value.toLowerCase() != "web")
{
docUrl = "/sanitasresidencial/wcm/idc/idcplg?IdcService=GET_FILE&dID=" + docId + "&dDocName=" + encodeURIComponent(dDocName) + "&Rendition=" + mForm.renLabel_UrlEncoded.value;
}
else if( mForm && mForm.docURL && mForm.docURL.value )
{
docUrl = mForm.docURL.value;
}
if( docUrl != "")
selectedDocsStr += "DocUrl=" + docUrl + "\n";

selectedDocsStr += "@end\n";

if (window.ext && window.ext.Close)
{
// Close window.open type window
window.ext.Close( { "docUrl": docUrl, "dDocName": dDocName, "docId": dID, "dDocTitle": title, "altTag": altTag } );
}
}

 
function MostrarInfo(){
    $('#litextoInfo').toggle();
}
//**********************************************************************************************************
// Funcion que submitea el formulario de empresas (previa validación de los datos)
//**********************************************************************************************************
function validarDatosFormEmpresas() {
 if (validacionEmpresas()) {
  $("[id='loginVO.password']").val(encodeURIComponent($("[id='loginVO.password']").val()));
  $("#form_valida_empresa").submit();
 }
} 

//**********************************************************************************************************
// Funcion que valida los datos del formulario de empresas
//**********************************************************************************************************
function validacionEmpresas() {
  var numPoliza = $("[id='loginVO.identificadorPoliza']").val();
  var departamento = $("[id='loginVO.identificadorDepartamento']").val();
  var contrasenia = $("[id='loginVO.password']").val();
  if ((/\s/.test(numPoliza)) || (/\s/.test(departamento)) || (/\s/.test(contrasenia))){
    $("#errorDatos").attr("class","errorIcon");
    return false;
  }
  return true;
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
  
  var idioma = getIdioma();
  if(especialidad == null){
    especialidad = "todas";
  }
  if(especialidad != 'todas'){
    $.ajax({
        url: "/sanitas/pages/medicoscentros/ajax/subEspeJSON.jsp?prestador="+prestador+"&provincia="+ provincia+"&poblacion="+ poblacion+"&infra="+ infra+"&especialidad="+ especialidad+"&centro="+ nombreCentro+"&idioma="+ idioma,
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
        url: "/sanitas/pages/medicoscentros/ajax/subEspeJSON.jsp?prestador="+prestador+"&provincia="+ provincia+"&poblacion="+ poblacion+"&infra="+ infra+"&especialidad="+ especialidad + "&todas=si"+"&idioma="+ idioma,
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
  
  var idioma = getIdioma();
  $.ajax({
        url: "/sanitas/pages/medicoscentros/ajax/subEspeJSON.jsp?prestador="+prestador+"&provincia="+ provincia+"&poblacion="+ poblacion+"&infra="+ infra+"&especialidad="+ especialidad+"&centro="+ nombreCentro+"&idioma="+ idioma,
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

/*Funcion para mostrar los banners en las especialidades Milenium*/
var bannersActivos = '';
function muestraBanner(){
  
  if (bannersActivos != '' && bannersActivos != null){
    ocultaBanners(bannersActivos)
  }
  var idEspecialidad = $("#especialidades").val();
  var idBanner = $('#Banner'+idEspecialidad).val();
  bannersActivos = idBanner;
  if (bannersActivos != '' && bannersActivos != null){
    muestraBanners(bannersActivos);
  }
}

function ocultaBanners(banners){
  var idBannerAOcultar = '';
  var arrayBanners = banners.split("|");
  for (i=0;i<arrayBanners.length;i++){
    idBannerAOcultar = arrayBanners[i];
    $('#'+idBannerAOcultar).attr("class","noseve");
  }  
}

function muestraBanners(banners){
  var idBannerAMostrar = '';
  var arrayBanners = banners.split("|");
  for (i=0;i<arrayBanners.length;i++){
    idBannerAMostrar = arrayBanners[i];
    $('#'+idBannerAMostrar).attr("class","mostrar");
  }  
}


/*Script para recuperar las poblaciones desde el servidor*/
  function getDetalleJson2(especialidad){
    //$('#imagen' +especialidad).attr("src","/sanitas/wcm/idc/groups/public/documents/digitalmedia/loader-1.gif");
      $.ajax({      
                url: "/sanitas/pages/medicoscentros/ajax/detalleSolapaJSON.jsp?infra=<%=beanDetalle.getIdInfraestructura()%>&prestador=<%=beanDetalle.getIdProveedor()%>&especialidad="+especialidad+"&provincia=<%=beanDetalle.getIdProvincia()%>&poblacion=<%=beanDetalle.getIdPoblacion()%>",      
                context: document.body,
                success: function(data){$('#' +especialidad).html(data);} 
            }); 
   }
    
//Devuelve id idioma segun la url
function getIdioma(){
  var idioma = 3
  var url = document.URL;
  if(url.indexOf("http://www.sanitas.es/en/") != -1){
    idioma = 17;
  }

  return idioma;
} 

 
//**********************************************************************************************************
// Tracking de Campañas
//**********************************************************************************************************
var campaigns = {
 "GConversions":
[{"tipo":"cnv","nombre":"Aumento de pecho","id":1031292476,"label":"s63NCKa4rQQQvIzh6wM","T2oTrack":null,"Mmind":296494},
{"tipo":"cnv","nombre":"Aumento y reduccion de pecho","id":1031292476,"label":"s63NCKa4rQQQvIzh6wM","T2oTrack":null,"Mmind":296494},
{"tipo":"rmk","nombre":"Aumento y reduccion de pecho","id":null,"label":"","T2oTrack":null,"Mmind":296479},
{"tipo":"cnv","nombre":"Cirugia","id":996519598,"label":"-vh5CPLf4gMQrt2W2wM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Cirugia Laser Ocular","id":1031292476,"label":"I9xCCMaS8gIQvIzh6wM","T2oTrack":null,"Mmind":309159},
{"tipo":"cnv","nombre":"Determinacion del sexado fetal en sangre materna","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Disfuncion erectil","id":996519598,"label":"-vh5CPLf4gMQrt2W2wM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Escleroterapia con microespuma","id":953151403,"label":"E10jCNWTlAUQq9-_xgM","T2oTrack":null,"Mmind":309160},
{"tipo":"rmk","nombre":"Escleroterapia con microespuma","id":953151403,"label":"XLkxCM2h1AUQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Eyaculacion precoz","id":996519598,"label":"-vh5CPLf4gMQrt2W2wM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Huella genetica","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Microespuma","id":953151403,"label":"E10jCNWTlAUQq9-_xgM","T2oTrack":null,"Mmind":309160},
{"tipo":"rmk","nombre":"Microespuma","id":953151403,"label":"XLkxCM2h1AUQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Presbicia (Vista Cansada)","id":null,"label":"","T2oTrack":null,"Mmind":296497},
{"tipo":"rmk","nombre":"Presbicia (Vista Cansada)","id":null,"label":"","T2oTrack":null,"Mmind":296483},
{"tipo":"cnv","nombre":"Reconocimiento Medico Ginecologico","id":null,"label":"","T2oTrack":null,"Mmind":296496},
{"tipo":"rmk","nombre":"Reconocimiento Medico Ginecologico","id":null,"label":"","T2oTrack":null,"Mmind":296481},
{"tipo":"cnv","nombre":"Reduccion de pecho","id":1031292476,"label":"s63NCKa4rQQQvIzh6wM","T2oTrack":null,"Mmind":296494},
{"tipo":"cnv","nombre":"Reproduccion Asistida","id":1031292476,"label":"Ni3oCI6x9wEQvIzh6wM","T2oTrack":null,"Mmind":296492},
{"tipo":"rmk","nombre":"Reproduccion Asistida","id":1031292476,"label":"MbLMCJ6kjAQQvIzh6wM","T2oTrack":null,"Mmind":296477},
{"tipo":"cnv","nombre":"Salud sexual","id":996519598,"label":"-vh5CPLf4gMQrt2W2wM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Sanitas Cordon Umbilical","id":1031292476,"label":"cbGQCK7M5gEQvIzh6wM","T2oTrack":null,"Mmind":296493},
{"tipo":"rmk","nombre":"Sanitas Cordon Umbilical","id":1031292476,"label":"GflWCJaljAQQvIzh6wM","T2oTrack":null,"Mmind":296478},
{"tipo":"cnv","nombre":"Test de intolerancia alimentaria","id":null,"label":"","T2oTrack":null,"Mmind":296495},
{"tipo":"rmk","nombre":"Test de intolerancia alimentaria","id":null,"label":"","T2oTrack":null,"Mmind":296480},
{"tipo":"cnv","nombre":"Test genetico de cancer de colon","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Test genetico de cancer de mama","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Test genetico de cancer de prostata","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Test genetico de degeneracion macular","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Test genetico de glaucoma","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Test genetico de paternidad","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Test genetico de predisposicion a la obesidad","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Test genetico de riesgo cardiovascular","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Test genetico prenatal no invasivo","id":953151403,"label":"ird0CN3S3wQQq9-_xgM","T2oTrack":null,"Mmind":null},
{"tipo":"cnv","nombre":"Unidad del Varon","id":996519598,"label":"-vh5CPLf4gMQrt2W2wM","T2oTrack":null,"Mmind":296498},
{"tipo":"rmk","nombre":"Unidad del Varon","id":996519598,"label":"nbqMCJqExQQQrt2W2wM","T2oTrack":null,"Mmind":296484}]
}
var url=location.href;
var ref=document.referrer;
var urlClean=url.substring(0,url.indexOf('?'));
var refClean=ref.substring(0,ref.indexOf('?'));
var urlpath=document.location.pathname;
var urlpathClean=urlpath.substring(0,urlpath.indexOf('?'));
var google_conversion_id = "";
var google_custom_params = window.google_tag_params;
var google_remarketing_only = "";
var google_conversion_label = "";
var sitio=window.location.host

function tracksSalud()
        {
	
	var producto
	if (typeof normalize!='undefined'){
	//alert ('existe funcion');
		 producto=normalize($('#seccion').val());}
    
	else {return false}
	//var producto= "Reproduccion Asistida"		

	
	//lanzamos la conversión de Site Catalyst
	if ((url.indexOf('cargaTrack=true')!=-1)&&(urlClean==refClean)){
	trackSC(producto)
	}
	//alert(producto);
	for (var x = 0 ; x < campaigns.GConversions.length ; x++) {
		if (producto==campaigns.GConversions[x].nombre){
		//alert('producto matcheado')
			if ((campaigns.GConversions[x].tipo=='cnv')&&(campaigns.GConversions[x].id!=null)&&(url.indexOf('cargaTrack=true')!=-1)){
			//alert('es Google conversion!!!!')
			trackGA(campaigns.GConversions[x].id,campaigns.GConversions[x].label,'cnv' ) 
			 }
			if ((campaigns.GConversions[x].tipo=='rmk')&&(campaigns.GConversions[x].id!=null)&&(url.indexOf('cargaTrack=true')==-1)){
			trackGA(campaigns.GConversions[x].id,campaigns.GConversions[x].label ,'rmk')
			//alert('es Google remarketing!!!!')	
			 }
			if ((campaigns.GConversions[x].T2oTrack!="")&&(url.indexOf('cargaTrack=true')!=-1)&&(ref.indexOf('sem')!=-1)){
			//alert('es de T20!!!!')
			trackT2o(campaigns.GConversions[x].T2oTrack) 
			 }
			if (campaigns.GConversions[x].Mmind!=null){
			//alert('Mmind!!!!')
			trackMmind(campaigns.GConversions[x].Mmind,campaigns.GConversions[x].tipo ) 
			 }

		}
	}
}

function trackSC(convSC){
			  s=s_gi(s_account); 
              s.linkTrackVars = 'products,events'; 
              s.linkTrackEvents = 'event75' 
              s.events='event75'+ (omnitureSessionId ? (':'+omnitureSessionId) :'')
              s.products = 'servicios de salud;'+convSC; 
              s.tl(this, 'o', 'enviar formulario servicios salud');
}

function trackGA(id,label,tipo) {
google_conversion_id = id;
google_custom_params = window.google_tag_params;
	if (tipo=='rmk'){
	google_remarketing_only = true;
	}
google_conversion_label = label;
	  
		  document.write = function(text) 
		  {
			$('body').append(text);
		  };
			$.getScript('../../../../../../../www.googleadservices.com/pagead/conversion.js');
	  
	
	  
 }
 
 
 function trackT2o(code){
		$('<iframe id="iframet2o" height="1px" width="1px" frameborder="0">').appendTo('body');
	    var d = new Date();
		var urlt2o = 'http://ofertasexclusivas.es/trackt2o/?Microsite='+code+'&cod_t2o='+d.getTime();
		$('#iframet2o').attr("src",urlt2o);
}


 function trackT2o(code){
		$('<iframe id="iframet2o" height="1px" width="1px" frameborder="0">').appendTo('body');
	    var d = new Date();
		var urlt2o = 'http://ofertasexclusivas.es/trackt2o/?Microsite='+code+'&cod_t2o='+d.getTime();
		$('#iframet2o').attr("src",urlt2o);
}

function trackMmind(id, tipo) {
	//alert(id+'--'+tipo)
	var ebRand = Math.random()+'';
	ebRand = ebRand * 1000000;
	if (tipo=='cnv'){
		if (url.indexOf('cargaTrack=true')!=-1){
	//alert('Es de Lead')
		$('body').append('<scr'+'ipt src="HTTP://bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&amp;ActivityID='+id+'&amp;rnd=' + ebRand + '"></scr' + 'ipt>');
		}
	}
	else if (url.indexOf('cargaTrack=true')==-1) {
	//alert('Es de Landing')
		$('body').append('<scr'+'ipt src="HTTP://bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&amp;ActivityID='+id+'&amp;rnd=' + ebRand + '"></scr' + 'ipt>');

		}
}

function trackMath(mtid, mtadid,tipo) {
	//alert(id+'--'+tipo)
	if (tipo=='cnv'){
		if (url.indexOf('cargaTrack=true')!=-1){
	//alert('Es de Lead')
		$('body').append('<img src="http://pixel.mathtag.com/event/img?mt_id='+mtid+'&mt_adid='+mtadid+'&v1=&v2=&v3=&s1=&s2=&s3=" width="1" height="1"/>');
		}
	}
	else if (url.indexOf('cargaTrack=true')==-1) {
	//alert('Es de Landing')
		$('body').append('<img src="http://pixel.mathtag.com/event/img?mt_id='+mtid+'&mt_adid='+mtadid+'&v1=&v2=&v3=&s1=&s2=&s3=" width="1" height="1"/>');

		}
}

 function trackDbclick(cat){
	
        var axel = Math.random() + "";
		var a = axel * 10000000000000;
		$('<iframe src="http://4144044.fls.doubleclick.net/activityi;src=4144044;type=invmedia;cat='+cat+';ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>').appendTo('body');
	  
}

$(document).ready(function()
        {

if (urlpath.indexOf('servicios_salud')!=-1){tracksSalud()}
else if (urlpath=='http://www.sanitas.es/'){

			if (sitio=='www.sanitas.es'){
			trackMmind('271898','rmk')
			}
			else if  (sitio=='centromedicomilenium-labuhaira.sanitas.es'){
			trackMmind('310145','rmk')
			}
}
else if (urlpath=='http://www.sanitas.es/sanitas/seguros/es/particulares/seguros_medicos/index.html'){trackMmind('305306','rmk')}
else if(urlpath=='http://www.sanitas.es/sanitas/seguros/es/particulares/seguros_medicos/cuadro_medico/sanitas-mas-salud/resumen/index.html'){trackMmind('305307','rmk')}
else if(urlpath=='http://www.sanitas.es/sanitas/seguros/es/particulares/dental/clinicas-dentales-milenium/index.html'){trackDbclick('rcws5416')}

  // Inicio INT-2492, INT-2421, INT-2688
  if ($("#tipo_asunto_busco").html() != null) {
    $("#tipo_asunto_busco option[value='39']").remove();
  }

  if ($("#tipo_seguro").html() != null) {
    $("#tipo_seguro option[value='9']").remove();
    $("#tipo_seguro option[value='8']").remove();
    $("#tipo_seguro option[value='6']").remove();
    $("#tipo_seguro option[value='19']").remove();
    $("#tipo_seguro option[value='5']").remove();
    $("#tipo_seguro option[value='114']").remove();
	
	// Inicio INT-2870
	$("#tipo_seguro option[value='83']").remove();
	$("#tipo_seguro option[value='84']").remove();
	$("#tipo_seguro option[value='82']").remove();
	$("#tipo_seguro option[value='137']").remove();
	// Fin INT-2870
  }
  // Fin INT-2492, INT-2421, INT-2688
  
  // Inicio INT-2876, INT-2908
  if ($("#horario").html() != null) {
    $("#horario option[value='0']").remove();
    $("#horario option[value='3']").remove();
  }
  if ($("#fourth") != null) {
    window.scrollTo(0, 0);
  }
  // Fin INT-2876, INT-2908
  
  ancho();

		}
	);

function ancho() {
  if ($('#header').html() != null) {
     if ($('#header').attr("class") == "header dental") {
       $('ul[class=coberturas]').attr("class","coberturas ancho");
     }
     if ($('#header').attr("class") == "header dental21") {
       $('ul[class=coberturas]').attr("class","coberturas ancho");
     }
     if ($('#header').attr("class") == "header dental-milenium") {
       $('ul[class=coberturas]').attr("class","coberturas ancho");
     }
  }
}