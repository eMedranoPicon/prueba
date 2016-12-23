/*_____________________________________________________________________menu mobile*/
$(document).ready(function() {
   
    // ////////////////////////////////////posiciona el menú en la barra lateral derecha
    $('#right-menu').sidr({
        name: 'sidr',
        side: 'right'        
    });
    // /////////////////////////////////////////////////////////////////////////////////                                  

    // //////////////////////////////////////////////////// Esconde menú mobile al pulsar fuera
    $('.container, footer.footer').click(function() {
        if ($('#sidr').css('display') == 'block') {
                $.sidr('close');
        }
        $(".responsive-menu-button").removeClass("activo");
    });
    // ///////////////////////////////////////////////////////////////////////////////////
					

    $('.sidrClassCoinc').click(function(){
        $('.sidrMenuCoinc').slideToggle();
        var heightUser = $('.sidr-class-user').outerHeight(); 
        if(heightUser > 55){
                $('.sidr-class-user').animate({height: "48px"}, 400);
        }else{
                $('.sidr-class-user').animate({height: "175px"}, 400);
        }
        $('.sidr-class-animatedArrowCoinc').toggleClass('turned');
    });		

    $('.sidrClassMetas').click(function(){
        $('.sidrMenuMetas').slideToggle();
        var heightUser = $('.sidr-class-user').outerHeight(); 
        if(heightUser > 55){
                $('.sidr-class-user').animate({height: "48px"}, 400);
        }else{
                $('.sidr-class-user').animate({height: "175px"}, 400);
        }
        $('.sidr-class-animatedArrowMetas').toggleClass('turned');
    });	

	    $('.sidrClassAhorradores').click(function(){
        $('.sidrMenuAhorradores').slideToggle();
        var heightUser = $('.sidr-class-user').outerHeight(); 
        if(heightUser > 55){
                $('.sidr-class-user').animate({height: "48px"}, 400);
        }else{
                $('.sidr-class-user').animate({height: "175px"}, 400);
        }
        $('.sidr-class-animatedArrowAhorradores').toggleClass('turned');
    });	
					

    // //////////////////////////////////////////////////// navegación buttons				
        $('.link_registrate').click(function(){
            location.href='#';
        })					

        $('.link_tutoriales').click(function(){
        	location.href='#';
        })

        $('.link_preguntas_frecuentes').click(function(){
            location.href='preguntas-frecuentes.html';
        })

        $('.link_contacto').click(function(){
            location.href='#';
        })

        $('.link_ahorrar').click(function(){
            location.href='como-ahorrar-mas-rapido.html';
        })

        $('.link_compartometa').click(function(){
            location.href='como-crear-un-bote-comun-o-meta-colectiva.html';
        })	              
    // ///////////////////////////////////////////////////////////////////////////////////
    
    


    // //////////////////////////////////////////////////// menú preguntas frecuentes
    $('.item-queescoinc').click(function(){        
        $('.group-queescoinc a').css('display','block');
    });

    $('.item-queescoinc').click(function(){ 
            if ($(this).hasClass('active')){

            }else{
                $('.item').removeClass('curver-top-right curver-bottom-right'); 		
                $('.item-comodarsedealta').addClass('curver-top-right'); 


                $('.group').css('display','none');
                $('.item').removeClass('active');
                $('.item').addClass('no-active'); 

                $('.item > h2').removeClass('active-green');
                $('.item > h2').addClass('regular-color'); 		

                $('ul.group-queescoinc').css('display','block');
                $('.item-queescoinc').removeClass('no-active');
                $('.item-queescoinc').addClass('active');		
                }
    });    
      
    $('.item-comodarsedealta').click(function(){ 	
            if ($(this).hasClass('active')){

            }else{
                $('.group').css('display','none');
                $('.item').removeClass('active');
                $('.item').addClass('no-active'); 

                $('.item > h2').removeClass('active-green');
                $('.item > h2').addClass('regular-color'); 	
		$('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');
		$('.item-queescoinc').addClass('curver-first-bottom-right');
                
                $('.item-problemasdeacceso').addClass('curver-top-right'); 
                $('.group-comodarsedealta').css('display','block');
                $('.item-comodarsedealta').removeClass('no-active');
                $('.item-comodarsedealta').addClass('active');
                $('.item-comodarsedealta h2').addClass('active-green');
		}	
    });
    
      $('.item-problemasdeacceso').click(function(){ 
            if ($(this).hasClass('active')){
			
            }else{
                $('.group').css('display','none');
                $('.item').removeClass('active');
                $('.item').addClass('no-active'); 

                $('.item > h2').removeClass('active-green');
                $('.item > h2').addClass('regular-color'); 	
		$('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');
	
                $('.item-queescoinc').addClass('curver-first-top-left'); 
                $('.item-comodarsedealta').addClass('curver-bottom-right'); 
                $('.item-informacioncuenta').addClass('curver-top-right'); 
		
                $('ul.group-problemasdeacceso').css('display','block');
                $('.item-problemasdeacceso').removeClass('no-active');
                $('.item-problemasdeacceso').addClass('active');
                $('.item-problemasdeacceso h2').addClass('active-green');
		}	
    });  

    $('.item-informacioncuenta').click(function(){ 
            if ($(this).hasClass('active')){

            }else{
                $('.group').css('display','none');
                $('.item').removeClass('active');
                $('.item').addClass('no-active'); 

                $('.item > h2').removeClass('active-green');
                $('.item > h2').addClass('regular-color'); 	
                $('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');

                $('.item-problemasdeacceso').addClass('curver-bottom-right'); 
                $('.item-ahorrometas').addClass('curver-top-right'); 

                $('ul.group-informacioncuenta').css('display','block');
                $('.item-informacioncuenta').removeClass('no-active');
                $('.item-informacioncuenta').addClass('active');
                $('.item-informacioncuenta h2').addClass('active-green');
		}	
    }); 
    
    $('.item-ahorrometas').click(function(){ 
            if ($(this).hasClass('active')){

            }else{
                $('.group').css('display','none');
                $('.item').removeClass('active');
                $('.item').addClass('no-active'); 

                $('.item > h2').removeClass('active-green');
                $('.item > h2').addClass('regular-color'); 	
                $('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');

                $('.item-informacioncuenta').addClass('curver-bottom-right'); 
                $('.item-presupuestos').addClass('curver-top-right'); 		
                
                $('ul.group-ahorrometas').css('display','block');
                $('.item-ahorrometas').removeClass('no-active');
                $('.item-ahorrometas').addClass('active');
                $('.item-ahorrometas').addClass('active-green');
		}	
    }); 
    

    
    
    $('.item-presupuestos').click(function(){ 
        if ($(this).hasClass('active')){

        }else{
            $('.group').css('display','none');
            $('.item').removeClass('active');
            $('.item').addClass('no-active'); 

            $('.item > h2').removeClass('active-green');
            $('.item > h2').addClass('regular-color'); 	
            $('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');

            $('.item-ahorrometas').addClass('curver-bottom-right'); 
            $('.item-prestamos').addClass('curver-top-right'); 	
            
            $('ul.group-presupuestos').css('display','block');
            $('.item-presupuestos').removeClass('no-active');
            $('.item-presupuestos').addClass('active');
            $('.item-presupuestos').addClass('active-green');
	}	
}); 
    
    
        
    $('.item-prestamos').click(function(){ 
        if ($(this).hasClass('active')){

        }else{
            $('.group').css('display','none');
            $('.item').removeClass('active');
            $('.item').addClass('no-active'); 

            $('.item > h2').removeClass('active-green');
            $('.item > h2').addClass('regular-color'); 	
            $('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');

            $('.item-presupuestos').addClass('curver-bottom-right'); 
            $('.item-metajunior').addClass('curver-top-right'); 	
            
            $('ul.group-prestamos').css('display','block');
            $('.item-prestamos').removeClass('no-active');
            $('.item-prestamos').addClass('active');
            $('.item-prestamos').addClass('active-green');
	}	
}); 
    
    $('.item-metajunior').click(function(){ 
        if ($(this).hasClass('active')){

        }else{
            $('.group').css('display','none');
            $('.item').removeClass('active');
            $('.item').addClass('no-active'); 

            $('.item > h2').removeClass('active-green');
            $('.item > h2').addClass('regular-color'); 	
            $('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');

            $('.item-prestamos').addClass('curver-bottom-right'); 
            $('.item-cuentasasociadas').addClass('curver-top-right'); 	
            
            $('ul.group-metajunior').css('display','block');
            $('.item-metajunior').removeClass('no-active');
            $('.item-metajunior').addClass('active');
            $('.item-metajunior').addClass('active-green');
	}	
}); 
    
    $('.item-cuentasasociadas').click(function(){ 
            if ($(this).hasClass('active')){

            }else{
                $('.group').css('display','none');
                $('.item').removeClass('active');
                $('.item').addClass('no-active'); 

                $('.item > h2').removeClass('active-green');
                $('.item > h2').addClass('regular-color'); 	
                $('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');
		
                $('.item-metajunior').addClass('curver-bottom-right'); 
                $('.item-compartirmetas').addClass('curver-top-right'); 
		
                $('ul.group-cuentasasociadas').css('display','block');
                $('.item-cuentasasociadas').removeClass('no-active');
                $('.item-cuentasasociadas').addClass('active');
                $('.item-cuentasasociadas').addClass('active-green');
		}	
    });   
    
    
    $('.item-compartirmetas').click(function(){ 
            if ($(this).hasClass('active')){

            }else{
                $('.group').css('display','none');
                $('.item').removeClass('active');
                $('.item').addClass('no-active'); 

                $('.item > h2').removeClass('active-green');
                $('.item > h2').addClass('regular-color'); 	
                $('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');
			
                $('.item-cuentasasociadas').addClass('curver-bottom-right'); 
                $('.item-ahorro-metas-colectivas').addClass('curver-top-right'); 
                $('ul.group-compartirmetas').css('display','block');
                $('.item-compartirmetas').removeClass('no-active');
                $('.item-compartirmetas').addClass('active');
                $('.item-compartirmetas').addClass('active-green');
		}	
    });   
    
    $('.item-ahorro-metas-colectivas').click(function(){ 
            if ($(this).hasClass('active')){

            }else{
                $('.group').css('display','none');
                $('.item').removeClass('active');
                $('.item').addClass('no-active'); 

                $('.item > h2').removeClass('active-green');
                $('.item > h2').addClass('regular-color'); 	
                $('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');


                $('.item-compartirmetas').addClass('curver-bottom-right'); 
                $('.item-ahorrocoinc').addClass('curver-top-right'); 
                $('ul.group-ahorro-metas-colectivas').css('display','block');
                $('.item-ahorro-metas-colectivas').removeClass('no-active');
                $('.item-ahorro-metas-colectivas').addClass('active');
                $('.item-ahorro-metas-colectivas').addClass('active-green');
		}	
    });   

    
    $('.item-ahorrocoinc').click(function(){ 
            if ($(this).hasClass('active')){

            }else{
                $('.group').css('display','none');
                $('.item').removeClass('active');
                $('.item').addClass('no-active'); 

                $('.item > h2').removeClass('active-green');
                $('.item > h2').addClass('regular-color'); 	
                $('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');

                $('.item-ahorro-metas-colectivas').addClass('curver-bottom-right'); 
                $('.item-darsedebaja').addClass('curver-top-right'); 
                $('ul.group-ahorrocoinc').css('display','block');
                $('.item-ahorrocoinc').removeClass('no-active');
                $('.item-ahorrocoinc').addClass('active');
                $('.item-ahorrocoinc').addClass('active-green');
		}	
    });   
    
     
    
    $('.item-darsedebaja').click(function(){ 
            if ($(this).hasClass('active')){

            }else{
                $('.group').css('display','none');
                $('.item').removeClass('active');
                $('.item').addClass('no-active'); 

                $('.item > h2').removeClass('active-green');
                $('.item > h2').addClass('regular-color'); 	
                $('.item').removeClass('curver-top-right curver-bottom-right curver-first-bottom-right');	

                $('.item-ahorrocoinc').addClass('curver-bottom-right'); 
                $('ul.group-darsedebaja').css('display','block');
                $('.item-darsedebaja').removeClass('no-active');
                $('.item-darsedebaja').addClass('active');
                $('.item-darsedebaja').addClass('active-green');
		}	
    });   

    
    // ///////////////////////////////////////////////////////////////////////////////////

    $('.item-queescoinc-b').click(function(){ 
        if ($(this).hasClass('active')){
                $('.item-b').removeClass('active');
                $('.group-b').hide();					
        }else{
                $('.item-b').removeClass('active');	
                $('.group-b').hide();
                $('.group-queescoinc-b').show();
                $('.item-queescoinc-b').addClass('active');		
        }
    }); 
	
    $('.item-comodarsedealta-b').click(function(){ 
        if ($(this).hasClass('active')){
                $('.item-b').removeClass('active');
                $('.group-b').hide();					
        }else{
                $('.item-b').removeClass('active');
                $('.group-b').hide();
                $('.group-comodarsedealta-b').show();
                $('.item-comodarsedealta-b').addClass('active');		
        }
    }); 	

    $('.item-problemasdeacceso-b').click(function(){ 
        if ($(this).hasClass('active')){
                $('.item-b').removeClass('active');
                $('.group-b').hide();			
        }else{
                $('.item-b').removeClass('active');
                $('.group-b').hide();
                $('.group-problemasdeacceso-b').show();
                $('.item-problemasdeacceso-b').addClass('active');		
        }
    }); 
	
    $('.item-informacioncuenta-b').click(function(){ 
        if ($(this).hasClass('active')){
                $('.item-b').removeClass('active');
                $('.group-b').hide();					
        }else{
                $('.item-b').removeClass('active');
                $('.group-b').hide();
                $('.group-informacioncuenta-b').show();
                $('.item-informacioncuenta-b').addClass('active');		
        }
    }); 

	$('.item-ahorrometas-b').click(function(){ 
            if ($(this).hasClass('active')){
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();				
            }else{
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();
                    $('.group-ahorrometas-b').show();
                    $('.item-ahorrometas-b').addClass('active');			
            }
    }); 
	
	
	
	$('.item-presupuestos-b').click(function(){ 
        if ($(this).hasClass('active')){
                $('.item-b').removeClass('active');
                $('.group-b').hide();				
        }else{
                $('.item-b').removeClass('active');
                $('.group-b').hide();
                $('.group-presupuestos-b').show();
                $('.item-presupuestos-b').addClass('active');			
        }
}); 
	
	
	$('.item-prestamos-b').click(function(){ 
        if ($(this).hasClass('active')){
                $('.item-b').removeClass('active');
                $('.group-b').hide();				
        }else{
                $('.item-b').removeClass('active');
                $('.group-b').hide();
                $('.group-prestamos-b').show();
                $('.item-prestamos-b').addClass('active');			
        }
}); 
	
	$('.item-metajunior-b').click(function(){ 
        if ($(this).hasClass('active')){
                $('.item-b').removeClass('active');
                $('.group-b').hide();				
        }else{
                $('.item-b').removeClass('active');
                $('.group-b').hide();
                $('.group-metajunior-b').show();
                $('.item-metajunior-b').addClass('active');			
        }
}); 
	
	$('.item-cuentasasociadas-b').click(function(){ 
            if ($(this).hasClass('active')){
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();				
            }else{
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();
                    $('.group-cuentasasociadas-b').show();
                    $('.item-cuentasasociadas-b').addClass('active');			
            }
	}); 	
														
	$('.item-compartirmetas-b').click(function(){ 
            if ($(this).hasClass('active')){
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();				
            }else{
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();
                    $('.group-compartirmetas-b').show();
                    $('.item-compartirmetas-b').addClass('active');			
            }
	}); 

	$('.item-ahorro-metas-colectivas-b').click(function(){ 
            if ($(this).hasClass('active')){
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();				
            }else{
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();
                    $('.group-ahorro-metas-colectivas-b').show();
                    $('.item-ahorro-metas-colectivas-b').addClass('active');			
            }
	}); 
	
	$('.item-ahorrocoinc-b').click(function(){ 
            if ($(this).hasClass('active')){
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();				
            }else{
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();
                    $('.group-ahorrocoinc-b').show();
                    $('.item-ahorrocoinc-b').addClass('active');			
            }
	}); 

	$('.item-darsedebaja-b').click(function(){ 
            if ($(this).hasClass('active')){
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();				
            }else{
                    $('.item-b').removeClass('active');
                    $('.group-b').hide();
                    $('.group-darsedebaja-b').show();
                    $('.item-darsedebaja-b').addClass('active');			
            }
	}); 	
	
    // //////////////////////////////////////////////////// contacta-con-nosotros
	if($("body").hasClass("contacta_con_nosotros")){	

    $('#mostrar_telefono').css('backgroundColor', '#eeebda');
    $('#mostrar_telefono').css('color', '#000');    
    $('#mostrar_email').css('border-bottom', 'dotted 1px #b5b0a0');
                    
    $('#mostrar_telefono').click(function(evento) {
        $('#grupoTelefono').show();
        $('#grupoEmail').hide();
        $('#mostrar_email').css('backgroundColor', '#eeebda');
        $('#mostrar_telefono').css('backgroundColor', '#fff');        
        $('#mostrar_telefono').css('border-bottom', 'dotted 1px #b5b0a0');
        $('#mostrar_email').css('border-bottom', 'dotted 0px');  
        $('#mostrar_telefono').css('color', '#70a41c');   
        $('#mostrar_email').css('color', '#000');
    });

    $('#mostrar_email').click(function(evento) {
        $('#grupoEmail').show();
        $('#grupoTelefono').hide();
        $('#mostrar_telefono').css('backgroundColor', '#eeebda');
        $('#mostrar_email').css('backgroundColor', '#fff');
        $('#mostrar_email').css('border-bottom', 'dotted 1px #b5b0a0');
        $('#mostrar_telefono').css('border-bottom', 'dotted 0px');
        $('#mostrar_email').css('color', '#70a41c');   
        $('#mostrar_telefono').css('color', '#000');
    });
	};	
	
	
});//end document ready




