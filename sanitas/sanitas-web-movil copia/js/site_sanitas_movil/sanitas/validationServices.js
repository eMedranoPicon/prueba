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
	
	var email = $("#email").val();
	if (!validateEmail(email)){
		$("#eemail").show();
		$("#liemail").attr("class","mensajeerror");
		ok = false;
	}else{
		$("#liemail").attr("class","");
	}

	var telefono = $("#telefono").val();
	if (!validateTfno(telefono)){
		$("#etelefono").show();
		$("#litelefono").attr("class","mensajeerror");
		ok = false;
	}else{
		$("#litelefono").attr("class","");
	}
	
	var hora = $("#hora").val();
	if (!validateTime(hora)){
		$("#ehora").show();
		$("#lihora").attr("class","mensajeerror");
		//ok = false;
	}else{
		$("#lihora").attr("class","");
	}
	
	if (ok){
		var confirmation = "<div class='confirmacion'><span>Sus datos han sido enviados correctamente.<br />En breve nos pondremos con contacto con usted.</span></div>";
		$("#formuField").html(confirmation);
	}
	
	return false;
}