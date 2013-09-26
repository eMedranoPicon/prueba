// Web Movil JavaScript Document

function validateLogin(){
	
	var response = true;
		
	if (document.getElementById("loginVO.alias")==null || document.getElementById("loginVO.alias").value ==""){
		$("#errorUsuario").attr("style", "display:block");
		$("#liUsuario").attr("class", "mensajeerror");
		response = false;
	} 
	
	if (document.getElementById("loginVO.contrasenia")==null || document.getElementById("loginVO.contrasenia").value ==""){
		$("#errorPassword").attr("style", "display:block");
		$("#liPassword").attr("class", "mensajeerror");
		response = false;
	}
	return response;
}

function validateLoginCleaner(){
	
	$("#errorUsuario").attr("style", "display:none");
	$("#liUsuario").removeAttr("class");
	$("#errorPassword").attr("style", "display:none");
	$("#liPassword").removeAttr("class");
	
}

function validateCalculate(){
	
	var response = true;
	
	$(".err").hide();

	var day  = $("#dia option:selected").val();
	
	if (day == "0"){
		$("#edate").show();
		$("#lidate").attr("class","mensajeerror");
		response = false;
	} else {
		$("#lidate").attr("class","");
	}
	
	var cp = $("#codPostal").val();
	if (!validateCp(cp)){
		//alert("err");
		$("#ecp").show();
		$("#licp").attr("class","mensajeerror");
		response = false;
	}else{
		$("#licp").attr("class","");
	}

	return response;
}

function validateCalculateCleaner(){
	
	$("#errorUsuario").attr("style", "display:none");
	$("#liUsuario").removeAttr("class");
	$("#errorPassword").attr("style", "display:none");
	$("#liPassword").removeAttr("class");
	
}

$(document).ready(function() {
	$(".err").hide();
});

function validateVoid(campo){
}

function validateCp(campo){
        var filter = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/;
        // utilizamos test para comprobar si el parametro valor cumple la regla
        if(filter.test(campo))
            return true;
        else
            return false;
}

function validateTime(campo){
        var filter = /^(0[1-9]|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        // utilizamos test para comprobar si el parametro valor cumple la regla
        if(filter.test(campo))
            return true;
        else
            return false;
}

function validateTfno(campo){
        var filter = /^[0-9]{2,3}-? ?[0-9]{6,7}$/;
        // utilizamos test para comprobar si el parametro valor cumple la regla
        if(filter.test(campo))
            return true;
        else
            return false;
}

function validateEmail(campo){
     // creamos nuestra regla con expresiones regulares.
        var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        // utilizamos test para comprobar si el parametro valor cumple la regla
        if(filter.test(campo))
            return true;
        else
            return false;
}

function validateRatiosServicios(){
	$(".err").hide();
	var ok = true;
	
	var nombre = $("#nombre").val();
	if ( nombre == null || nombre == "" ){
		$("#enombre").show();
		$("#linombre").attr("class","mensajeerror");
		ok = false;
	}else{
		$("#linombre").attr("class","");
	}
	
	var email = $("#mailPropio").val();
	if (!validateEmail(email)){
		$("#eemail").show();
		$("#liemail").attr("class","mensajeerror");
		ok = false;
	}else{
		$("#liemail").attr("class","");
	}

	var telefono = $("#telefonoBannerForm").val();
	if (!validateTfno(telefono)){
		$("#etelefono").show();
		$("#litelefono").attr("class","mensajeerror");
		ok = false;
	}else{
		$("#litelefono").attr("class","");
	}
	
	var hora = document.getElementById("selectHoras").selectedIndex;
	if ( hora == null || hora == "0" ){
		$("#ehora").show();
		$("#lihora").attr("class","mensajeerror");
		ok = false;
	}else{
		$("#lihora").attr("class","");
	}
	
	var grupo = document.getElementById("grupo").selectedIndex;
	if ( grupo == null || grupo == "0" ){
		$("#ecliente").show();
		$("#licliente").attr("class","mensajeerror");
		ok = false;
	}else{
		$("#licliente").attr("class","");
	}
	
	var policy = document.getElementById('politicaPrivacidad').checked;
	if ( !policy ){
		$("#epolicy").show();
		$("#lipolicy").attr("class","mensajeerror");
		$("#lipolicy").show();
		ok = false;
	}else{
		$("#lipolicy").attr("class","");
		$("#lipolicy").hide();
	}
	
	if (ok){
		$('#enviarPorMailSolicitaInfo').submit();
	}
	
	return false;
}







