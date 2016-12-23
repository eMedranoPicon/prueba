//metodo que pasandole el id del elemento mueve la pantalla hasta su posicion
function scrollToAnchorGeneric(objectId){
   
    //posicion del id
	var objectTopPosition = jQuery('#'+objectId).offset().top;		
	//movemos a su posicion
	$('html, body').animate({scrollTop:objectTopPosition}, 'slow');
	return false;   
}


function scrollToAnchorSlow(objectId){
	 //ver  scrollToAnchorGeneric
	return scrollToAnchorGeneric(objectId,'slow','lineal');
        
}