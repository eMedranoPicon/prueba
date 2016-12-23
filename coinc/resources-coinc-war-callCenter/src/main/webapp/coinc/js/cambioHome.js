$(document).ready(function() {
//Script para cambio rápido de estilo del home
	var carpetaImagenesHome = "homeOtono2015";
	var marginImagen1 ="-9px";
	var marginImagen2 ="-3px";
	var marginImagen3 ="1px";
	var marginImagen4 ="0px";
	
	
	
	//selecciono todos los elementos que usan las siguientes clases y cambio sus propiedades
	//Circulos
	$(".capa_2_Ahorrahome5New").css({
		"margin-top": marginImagen1,
		"background": "url(/res/coinc/css/img/"+carpetaImagenesHome+"/cerditoFrontal.png) no-repeat center top scroll transparent"});
	$(".capa_2_Ahorrahome5New").hover(function(){
		$(".capa_2_Ahorrahome5New").css("background", "url(/res/coinc/css/img/"+carpetaImagenesHome+"/cerditoFrontal-hover.png) no-repeat center top scroll transparent");
		$(".home-btn-pie-1").css("color","#979799");
		$(".home-btn1-text").css("color","#979799");
		$(".home-btn2-text").css("color","#979799");
		}, function(){
		$(".capa_2_Ahorrahome5New").css("background", "url(/res/coinc/css/img/"+carpetaImagenesHome+"/cerditoFrontal.png) no-repeat center top scroll transparent");
		$(".home-btn-pie-1").css("color","#ffffff");
		$(".home-btn1-text").css("color","#ffffff");
		$(".home-btn2-text").css("color","#ffffff");

	}); 	

	$(".capa_2_Ahorrahome1New").css({
		"margin-top": marginImagen1,
		"background": "url(/res/coinc/css/img/"+carpetaImagenesHome+"/cerdito.png) no-repeat center top scroll transparent"});
	$(".capa_2_Ahorrahome1New").hover(function(){
		$(".capa_2_Ahorrahome1New").css("background", "url(/res/coinc/css/img/"+carpetaImagenesHome+"/cerdito-hover.png) no-repeat center top scroll transparent");
		$(".home-btn-pie-2").css("color","#979799");
		}, function(){
		$(".capa_2_Ahorrahome1New").css("background", "url(/res/coinc/css/img/"+carpetaImagenesHome+"/cerdito.png) no-repeat center top scroll transparent");
		$(".home-btn-pie-2").css("color","#ffffff");
	}); 
	$(".capa_2_Ahorrahome4New").css({
		"margin-top": marginImagen4,
		"background": "url(/res/coinc/css/img/"+carpetaImagenesHome+"/4regaloamazon.png) no-repeat center top scroll transparent"});
	$(".capa_2_Ahorrahome4New").hover(function(){
		$(".capa_2_Ahorrahome4New").css("background", "url(/res/coinc/css/img/"+carpetaImagenesHome+"/4regaloamazon-hover.png) no-repeat center top scroll transparent");
		$(".home-btn-pie-3").css("color","#979799");
		}, function(){
		$(".capa_2_Ahorrahome4New").css("background", "url(/res/coinc/css/img/"+carpetaImagenesHome+"/4regaloamazon.png) no-repeat center top scroll transparent");
		$(".home-btn-pie-3").css("color","#ffffff");
	}); 
	//header
	$(".logo a").css("background", "url(/res/coinc/images/"+carpetaImagenesHome+"/logo.png) no-repeat top left");
		
	//Imagenes cabecera
	$(".cabecera_homecerdito_v2").css("background", "url(/res/coinc/css/img/"+carpetaImagenesHome+"/cabecera.png) no-repeat scroll center top");
	$(".cabecera_homecerdito_v22").css("background", "url(/res/coinc/images/"+carpetaImagenesHome+"/cabeceraReg.png) no-repeat scroll center top");
	$(".letras_registro").css("background", "url(/res/coinc/images/"+carpetaImagenesHome+"/letras.png) no-repeat scroll");
// 	$(".cabecera_homecerdito_v3_l").css("background", "url(/res/coinc/images/"+carpetaImagenesHome+"/columnaCabeceraIzq.png) repeat-x");
// 	$(".cabecera_homecerdito_v3_r").css("background", "url(/res/coinc/images/"+carpetaImagenesHome+"/columnaCabeceraDer.png) repeat-x");
	$(".cabecera_homecerdito_v33_r").css("background", "url(/res/coinc/images/"+carpetaImagenesHome+"/columnaCabeceraIzqReg.png) repeat-x");
	$(".cabecera_homecerdito_v33_l").css("background", "url(/res/coinc/images/"+carpetaImagenesHome+"/columnaCabeceraDerReg.png) repeat-x");

	//dimensiones
	//$(".cabecera_homecerdito_v2").css("height","673px","width","100%"); --primavera
	$(".cabecera_homecerdito_v2").css("height","845px","width","100%");
	$(".cabecera_homecerdito_v22").css("height","495px","width","100%");
	
	//extender imagen de cabecera
	$(".cabecera_homecerdito_v2").css("background-size","cover");
	$(".cabecera_homecerdito_v22").css("background-size","cover");
});
