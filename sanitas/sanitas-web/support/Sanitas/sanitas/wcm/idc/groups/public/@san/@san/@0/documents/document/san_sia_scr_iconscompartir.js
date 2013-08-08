$(document).ready(function() {
    $('#boxButtonEnv').click(function() {
        local_confirmation_compartir();
    });
});
    
    
    var validacionCaptcha = false;
    function validarEmail(email){
   		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
  	   		return true;
  	  	}else{
    	 	return false;
    	} 
	}
    function validarMiEmail(){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var email = $('#miEmail').val();
         if ($('#miEmail').val() == '' || reg.test(email) == false) {
            $('#miEmailVal').attr("class","errorIcon");
        }else{
            if(reg.test(email)){
            $('#miEmailVal').attr("class","okIcon");
            }
        }
    }
    function validarAmigoEmail(){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
     var email = $('#emailAmigo').val();
         if ($('#emailAmigo').val() == '' || reg.test(email) == false ) {
            $('#emailAmigoVal').attr("class","errorIcon");
        }else{
           if(reg.test(email)){
            $('#emailAmigoVal').attr("class","okIcon");
           }
        }
    }
	function validarCaptcha(){
		var imagencaptcha = $('#alinearimagen').val();
		$.ajax({
            url: "/sanitas/pages/medicoscentros/ajax/captchaIconos.jsp?imagenCaptchar="+imagencaptcha,
            context: document.body,
            success: function(data){       
              var salida = data;
              if (salida.indexOf("true") > 0){
                  validacionCaptcha = true;
                  $('#miCaptchaVal').attr("class","okIcon");
              }else{
              	$('#miCaptchaVal').attr("class","errorIcon");
              }
            }
          });
    }
	function local_confirmation_compartir() {
  		if (validarEmail($('#miEmail').val()) && validarEmail($('#emailAmigo').val()) && $('#asunto').val() != '' && validacionCaptcha)
   		{
        	$('#enviarPorMailAmigo').submit(); 
        	alert("Su email ha sido enviado");
    	}
	}
	$(document).ready(function() {
		$('#boxButtonEnv').attr("onclick", "validarCaptcha();validarMiEmail();validarAmigoEmail();local_confirmation_compartir();topdiv.click()"); 
	});