var flag=false;
var currentScroll = 1;
var running=false;

$(window).load(function(){


	$(".fondo_imagen").waypoint(function() {
		
		$('.img_background').addClass('animated fadeIn');
		$('.infoCabecera h1').addClass('animated fadeInslideInDown delay1');
		$('.infoCabecera .caracteristicas-block').addClass('animated slideInUp delay1');
		$('.infoCabecera .caracteristicas .servicio').addClass('animated fadeIn delay1');
		
	}, { offset: '100%'});		
	
	$(".seccion1").waypoint(function() {
		
		$('.seccion1 .icon-title').addClass('animated fadeInslideInDown');
		$('.seccion1 h6').addClass('animated fadeInslideInDown');
		$('.seccion1 p').addClass('animated fadeInslideInDown');
		$('.seccion1 .imagenAsoc img').addClass('animated fadeInslideInRight');
		$('.seccion1 .btn').addClass('animated fadeIn delay1');
		
	}, { offset: '90%'});	

	$(".seccion2").waypoint(function() {
		
		$('.seccion2 .icon-title').addClass('animated fadeInslideInDown');
		$('.seccion2 h6').addClass('animated fadeInslideInDown');
		$('.seccion2 p').addClass('animated fadeInslideInDown');
		$('.seccion2 .imagenAsoc img').addClass('animated fadeInslideInRight');
		$('.seccion2 .btn').addClass('animated fadeIn delay1');
		
	}, { offset: '90%'});	

	$(".seccion3").waypoint(function() {
		$('.seccion3 .icon-title').addClass('animated fadeInslideInDown');
		$('.seccion3 h6').addClass('animated fadeInslideInDown');
		$('.seccion3 p').addClass('animated fadeInslideInDown');
		$('.seccion3 .imagenAsoc img').addClass('animated fadeInslideInRight');
		$('.seccion3 .btn').addClass('animated fadeIn delay1');
		if(!running){	
			flag=false;
		}	
	}, { offset: '90%'});

	$(".seccion3").waypoint(function() {
		if(!running){	
			flag=false;
		}	
	}, { offset: '10%'});	


	/** FRAMES **/
		
		$('.seccion4 h6').waypoint(function() {
			
			initAnimation();
			flag=true;
		}, { offset: '15%'});	
	
});



function initAnimation(){
	if(!flag){
		playInterval();
	}		
}


function step(current){
	if((current >0) && (current <=3)){
		$('.frame-pagination span').text(current);
	}	
}


function playInterval(){

	playFrames(67,299);

}

function showTitle(scroll){

	if(scroll>3){
		$('.title-scroll').css('opacity','0');
	}
	
	else{
		$('.title-scroll').css('opacity','1');
		$('.title-scroll').hide();
		$('.title-scroll'+scroll).show();
	}	
}


function playFrames(init,end){
	running = true;
	var current = init;
	
	if(init < end){
		var interval = setInterval(function(){ 

			$('.frame').removeClass('active');
			$('.frame'+current).addClass('active');
			
			if(current == end){
				clearInterval(interval);
				running = false;
			}
			
			current++;
			
			if(current <= 67 ){
				showTitle(1);
				step(1);
			}		

			else if(current <= 153 ){
				showTitle(2);
				step(2);
			}	

			else if(current <= 255 ){
				showTitle(3);
				step(3);
			}	

			else if(current <= 299 ){
				showTitle(4);
				step(4);
			}				
			
		}, 40);
	}
	
	else{
		
		
		var interval = setInterval(function(){ 
			$('.frame').removeClass('active');
			$('.frame'+current).addClass('active');
			
			if(current == end){
				clearInterval(interval);	
			}
			
			current--;
			
			if(current <= 67 ){
				showTitle(1);
			}		

			else if(current <= 153 ){
				showTitle(2);
			}	

			else if(current <= 255 ){
				showTitle(3);
			}	

			else if(current <= 255 ){
				showTitle(4);
			}				
			
		}, 40);		
	}
}
