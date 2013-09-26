   
        function validarEmail(email){
              if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
              $('#emailPropioVal').attr("class","okIconBannerForm");
                return true;
              }else{
              $('#emailPropioVal').attr("class","errorIconBannerForm");
              return false;
              } 
        }
            
            
            //Funcion que comprueba si una cadena de texto tiene un numero
            function has_numbers(text){
              var numbers="0123456789";
                 for(i=0; i< text.length; i++){
                    if (numbers.indexOf(text.charAt(i),0)!=-1){
                       return 1;
                    }
                 }
                 return 0;
            }
                
            function validarRadioButton(){
                  //---Validar Radio
                        var s="No";
                 
                        for ( var i = 0; i < document.enviarPorMailSolicitaInfo.grupo.length; i++ )
                            {
                                if ( document.enviarPorMailSolicitaInfo.grupo[i].checked ){
                                ;
                                $('#grupoVal').attr("class","okIconBannerForm");
                                s= "Si";
                                
                                return true;
                               }
                             }
                        if ( s == "No" ){
                        
                        $('#grupoVal').attr("class","errorIconBannerForm");
                        return false;
                        }
                  //---Fin validar radio.
            

            }
            
            function validaPoliticaPrivacidad(){
            
                elemento = document.getElementById('politicaPrivacidad').checked;
                
                
                if( !elemento ) {
                $('#checkBoxVal').attr("class","mensajeErrorPeque");
                  $('#checkBoxVal').html("Debes aceptar la politica de privacidad");
                  
                    
                    return false;
                }
                else{
                    $('#checkBoxVal').attr("class","noseve")
                    $('#checkBoxVal').html("");
                    return true;
                }
            
            }
            
            
            function validaComboHoras(){
                 
                var horas = document.getElementById("selectHoras").selectedIndex;
                if( horas == null || horas == 0 ) {
                  $('#horaVal').attr("class","errorIconBannerForm");
                  return false;
                }
                else{
                  $('#horaVal').attr("class","okIconBannerForm");
                  return true;
                }
            }
       
            function validarEmailPropio(){
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var email = $('#mailPropio').val();
                 if ($('#mailPropio').val() == '' || reg.test(email) == false) {
                    $('#emailPropioVal').attr("class","errorIconBannerForm");
                }else{
                    if(reg.test(email)){
                    $('#emailPropioVal').attr("class","okIconBannerForm");
                    }
                }
            }
            
            function validarNombre(){
                
                var result = has_numbers($('#nombre').val());
                if ($('#nombre').val() == '' || !isNaN($("#nombre").val()) || result != 0){
                    $('#nombreVal').attr("class","errorIconBannerForm");
                    return false;
                }else{
                    $('#nombreVal').attr("class","okIconBannerForm");
                    return true;
                }
            }
            
            function validarTelefono(){
            
              var numInicio='false';
              var eltelefono = $('#telefonoBannerForm').val();
                            
              if(eltelefono.charAt(0)==9 || eltelefono.charAt(0)==7 || eltelefono.charAt(0)==6){
                numInicio= 'true';    
              }
              else{
                numInicio= 'false';
              }
                  
              if(isNaN($("#telefonoBannerForm").val()) || numInicio == 'false' || $("#telefonoBannerForm").val() == '' || $("#telefonoBannerForm").val().length != 9){
                $('#telefonoBannerVal').attr("class","errorIconBannerForm");
                return false;
              }else{
                $('#telefonoBannerVal').attr("class","okIconBannerForm");
                return true;
              }
            }
            
            function comprueboTelefono(){
                var numeroInicial='false';
                var telefonoCompleto=$('#telefonoLLamame').val();
                
                if(telefonoCompleto.charAt(0)==9 || telefonoCompleto.charAt(0)==7 || telefonoCompleto.charAt(0)==6){
                  numeroInicial= 'true';
                }
                else{
                  numeroInicial= 'false';
                }
                
                if(isNaN(telefonoCompleto) || numeroInicial == 'false' || telefonoCompleto == '' || telefonoCompleto.length != 9){
                  $('#telefonoLLamameVal').attr("class","errorIconBannerForm");
                  return false;
                
                }else{
                $('#telefonoLLamameVal').attr("class","okIconBannerForm");
                return true;
                
              }
            }

                      
            function local_confirmation() {
                  
            validarEmailPropio();
            validarNombre();
            validarTelefono();
            validaPoliticaPrivacidad();
            validaComboHoras();
            validarRadioButton();
            
            
            var urlActual = normalize($('#seccion').val()) ;
            var urlSite = $('#valorSiteCat').val();
            
            if(urlSite != null && urlSite != ''){
                urlActual = urlSite;
            }
            
            if (validarEmail($('#mailPropio').val()) && validarNombre() &&  validarTelefono() && validaPoliticaPrivacidad() && validaComboHoras() && validarRadioButton()){
            
              s=s_gi(s_account); 
              s.linkTrackVars = 'products,events'; 
              s.linkTrackEvents = 'event75'; 
              s.events='event75'+ (omnitureSessionId ? (':'+omnitureSessionId) :'')
              s.products = 'servicios de salud; '+urlActual; 
			  s.tl(this, 'o', 'enviar formulario servicios salud');
	      
             // trackConversion(urlActual); 
	      
	      
	      
              $('#enviarPorMailSolicitaInfo').submit();
                
                alert ("Tu email ha sido enviado");   
              }
              
              
              }
              
              
              
            function teLlamamos(){
            
            var urlActual = $('#seccionPadre').val();
            comprueboTelefono();
              if (comprueboTelefono()){
                $('#enviarPorMailLlamame').submit();
                alert ("Tu email ha sido enviado");   
              
              }
              else{
                  alert ("El telefono introducido no es correcto");
              }
            
            
            }
        
            
        
	
      // para quitar los acentos
          var normalize = (function() { 
              var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
                  to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc", 
                  mapping = {}; 
          
              for(var i = 0, j = from.length; i < j; i++ ) 
                  mapping[ from.charAt( i ) ] = to.charAt( i ); 
          
              return function( str ) { 
                  var ret = []; 
                  if(str){
                      for( var i = 0, j = str.length; i < j; i++ ) { 
                          var c = str.charAt( i ); 
                          if( mapping.hasOwnProperty( str.charAt( i ) ) ) 
                              ret.push( mapping[ c ] ); 
                          else 
                              ret.push( c ); 
                      } 
                  }
                  return ret.join( '' ); 
              } 
          
          })();   

	//formulario solicita Cita
	function local_confirmation_cita() {
                  
		validarEmailPropioCita();
		validarNombreCita();
		validarTelefonoCita();
		validaPoliticaPrivacidadCita();
		validaComboHorasCita();
		validarRadioButtonCita();
		validaComboCentrosCita();
		
		
		var urlActual = normalize($('#seccion').val()) ;
		
		
		if (validarEmailCita($('#mailPropioCita').val()) && validarNombreCita() &&  validarTelefonoCita() && validaPoliticaPrivacidadCita() && validaComboHorasCita() && validarRadioButtonCita() && validaComboCentrosCita()){
		
		  s=s_gi(s_account); 
		  s.linkTrackVars = 'products,events'; 
		  s.linkTrackEvents = 'event75'; 
		  s.events='event75'+ (omnitureSessionId ? (':'+omnitureSessionId) :'')
		  s.products = 'servicios de salud; '+urlActual; 
		  s.tl(this, 'o', 'enviar formulario servicios salud');
	  
		 // trackConversion(urlActual); 
                 var urlSalida = "/sanitas/formmailsolicitacita";
                 $('#enviarPorMailSolicitaCita').attr("action",urlSalida);
	  
	  
	  
		  $('#enviarPorMailSolicitaCita').submit();
			
			alert ("Tu email ha sido enviado");   
		 }
		  
		  
	}
        
        //formulario solicita Cita
	function local_confirmation_contra() {
                  
		validarEmailPropioCita();
		validarNombreCita();
		validarTelefonoCita();
		validaPoliticaPrivacidadCita();
		validaComboHorasCita();
		
		
		var urlActual = normalize($('#seccion').val()) ;
		
		
		if (validarEmailCita($('#mailPropioCita').val()) && validarNombreCita() &&  validarTelefonoCita() && validaPoliticaPrivacidadCita() && validaComboHorasCita()){
		
		  s=s_gi(s_account); 
		  s.linkTrackVars = 'products,events'; 
		  s.linkTrackEvents = 'event75'; 
		  s.events='event75'+ (omnitureSessionId ? (':'+omnitureSessionId) :'')
		  s.products = 'servicios de salud; '+urlActual; 
		  s.tl(this, 'o', 'enviar formulario servicios salud');
	  

	  
	  
	  
		  $('#enviarPorMailSolicitaContra').submit();
			
			alert ("Tu email ha sido enviado");   
		 }
		  
		  
	}

	function validarEmailPropioCita(){
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var email = $('#mailPropioCita').val();
		 if ($('#mailPropioCita').val() == '' || reg.test(email) == false) {
			$('#emailPropioValCita').attr("class","errorIconBannerForm");
		}else{
			if(reg.test(email)){
			$('#emailPropioValCita').attr("class","okIconBannerForm");
			}
		}
	}
	function validarNombreCita(){
                
		var result = has_numbers($('#nombreCita').val());
		if ($('#nombreCita').val() == '' || !isNaN($("#nombreCita").val()) || result != 0){
			$('#nombreValCita').attr("class","errorIconBannerForm");
			return false;
		}else{
			$('#nombreValCita').attr("class","okIconBannerForm");
			return true;
		}
	}	
	function validarTelefonoCita(){
            
	  var numInicio='false';
	  var eltelefono = $('#telefonoBannerFormCita').val();
					
	  if(eltelefono.charAt(0)==9 || eltelefono.charAt(0)==7 || eltelefono.charAt(0)==6){
		numInicio= 'true';    
	  }
	  else{
		numInicio= 'false';
	  }
		  
	  if(isNaN($("#telefonoBannerFormCita").val()) || numInicio == 'false' || $("#telefonoBannerFormCita").val() == '' || $("#telefonoBannerFormCita").val().length != 9){
		$('#telefonoBannerValCita').attr("class","errorIconBannerForm");
		return false;
	  }else{
		$('#telefonoBannerValCita').attr("class","okIconBannerForm");
		return true;
	  }
	}
	function validaPoliticaPrivacidadCita(){
            
		elemento = document.getElementById('politicaPrivacidadCita').checked;
		
		
		if( !elemento ) {
		$('#checkBoxValCita').attr("class","mensajeErrorPeque");
		  $('#checkBoxValCita').html("Debes aceptar la politica de privacidad");
		  
			
			return false;
		}
		else{
			$('#checkBoxValCita').attr("class","noseve")
			$('#checkBoxValCita').html("");
			return true;
		}
	
	}
	function validaComboHorasCita(){
                 
		var horas = document.getElementById("selectHorasCita").selectedIndex;
		if( horas == null || horas == 0 ) {
		  $('#horaValCita').attr("class","errorIconBannerForm");
		  return false;
		}
		else{
		  $('#horaValCita').attr("class","okIconBannerForm");
		  return true;
		}
	}
	function validarRadioButtonCita(){
		  //---Validar Radio
				var s="No";
		 
				for ( var i = 0; i < document.enviarPorMailSolicitaCita.grupoCita.length; i++ )
					{
						if ( document.enviarPorMailSolicitaCita.grupoCita[i].checked ){
						;
						$('#grupoValCita').attr("class","okIconBannerForm");
						s= "Si";
						
						return true;
					   }
					 }
				if ( s == "No" ){
				
				$('#grupoValCita').attr("class","errorIconBannerForm");
				return false;
				}
		  //---Fin validar radio.
	

	}
	function validarEmailCita(email){
		  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
		  $('#emailPropioValCita').attr("class","okIconBannerForm");
			return true;
		  }else{
		  $('#emailPropioValCita').attr("class","errorIconBannerForm");
		  return false;
		  } 
	}
	function validaComboCentrosCita(){
                 
		var horas = document.getElementById("selectCentro").selectedIndex;
		if( horas == null || horas == 0 ) {
		  $('#centroValCita').attr("class","errorIconBannerForm");
		  return false;
		}
		else{
		  $('#centroValCita').attr("class","okIconBannerForm");
		  return true;
		}
	}
        
$(document).ready(function() {
$('.bupapest a').click(function () {
	if (!$(this).hasClass('active')){
		$('.bupapest a').toggleClass("active");
		$('.cajaDere-ssalud').toggleClass("ocultar");
	}
		return false;
		});
});
