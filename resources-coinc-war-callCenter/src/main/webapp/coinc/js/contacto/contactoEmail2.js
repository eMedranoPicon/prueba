//ancho de los campos
$(".content_campos_form").css( "width", "560px" );
//posicion de la decoracion
if($("#eNombreMsg").length != 0 &&  $("#eCorreoMsg").length != 0 ) {
	$(".ic_email_3").css( "margin-top", "280px" );
}else if( ($("#eNombreMsg").length != 0 &&  $("#eCorreoMsg").length == 0 ) || ($("#eNombreMsg").length == 0 &&  $("#eCorreoMsg").length != 0 ) ) {
	$(".ic_email_3").css( "margin-top", "259px" );
}else{
	$(".ic_email_3").css( "margin-top", "230px" );
}
//pintamos recuadro rojo y posicionamos el error
if($("#eNombreMsg").length != 0) {	
	$("#eNombreMsg").css( "margin-top", "36px" );
	$("#eNombreMsg").css( "margin-left", "-167px" );
	$("#eNombreMsg").css( "margin-bottom", "20px" );	
	document.getElementById("homeForm2:nombre").setAttribute("class","caja_text_model01_error rounded");
}
//pintamos recuadro rojo y posicionamos el error
if($("#eCorreoMsg").length != 0) {
	$("#eCorreoMsg").css( "margin-top", "36px" );
	$("#eCorreoMsg").css( "margin-left", "-167px" );
	$("#eCorreoMsg").css( "margin-bottom", "20px" );
	document.getElementById("homeForm2:email").setAttribute("class","caja_text_model01_error rounded");
}
//pintamos recuadro rojo
if($("#eMensajeMsg").length != 0) {
	document.getElementById("homeForm2:mensajeEmail").setAttribute("class","caja_text_model01_error rounded");
}
//posicionamos el error
if($("#ePrivMsg").length != 0) {
	$("#ePrivMsg").css( "margin-top", "36px" );
	$("#ePrivMsg").css( "margin-left", "-217px" );
	$("#ePrivMsg").css( "margin-bottom", "10px" );		
}
//movemos al ancla si hay error
if($("#eNombreMsg").length != 0 || $("#eCorreoMsg").length != 0 || $("#ePrivMsg").length != 0 || $("#eMensajeMsg").length != 0) {	
	scrollToAnchorSlow('scrollAnchor');
}
//si se recarga y no hay errores limpio datos
if($("#eNombreMsg").length == 0 && $("#eCorreoMsg").length == 0 && $("#ePrivMsg").length == 0 && $("#eMensajeMsg").length == 0) {		
	document.getElementById("homeForm2:nombre").value = "";
	document.getElementById("homeForm2:email").value = "";
	document.getElementById("homeForm2:mensajeEmail").value = "";
	document.getElementById("homeForm2:checkBox").checked =false ;
	$(".imagenOk").hide();
}