var flag=false;
var currentScroll = 1;

$(window).load(function(){


	$(".fondo_imagen").waypoint(function() {
		
		$('.img_background').addClass('animated fadeIn');
		$('.infoCabecera h1').addClass('animated fadeInslideInDown delay1');
		$('.infoCabecera .caracteristicas-block').addClass('animated slideInUp delay1');
		$('.infoCabecera .caracteristicas .servicio').addClass('animated fadeIn delay1');
		
	}, { offset: '100%'});		
	
	$(".seccion1").waypoint(function() {
		
		$('.seccion1 .icon-title').addClass('animated fadeInslideInDown');
		$('.seccion1 h2').addClass('animated fadeInslideInDown');
		$('.seccion1 p').addClass('animated fadeInslideInDown');
		$('.seccion1 .imagenAsoc img').addClass('animated fadeInslideInRight');
		$('.seccion1 .btn').addClass('animated fadeIn delay1');
		
	}, { offset: '80%'});	

	$(".seccion2").waypoint(function() {
		
		$('.seccion2 .icon-title').addClass('animated fadeInslideInDown');
		$('.seccion2 h2').addClass('animated fadeInslideInDown');
		$('.seccion2 p').addClass('animated fadeInslideInDown');
		$('.seccion2 .imagenAsoc img').addClass('animated fadeInslideInRight');
		$('.seccion2 .btn').addClass('animated fadeIn delay1');
		
	}, { offset: '80%'});	

	$(".seccion3").waypoint(function() {
		$('.seccion3 .icon-title').addClass('animated fadeInslideInDown');
		$('.seccion3 h2').addClass('animated fadeInslideInDown');
		$('.seccion3 p').addClass('animated fadeInslideInDown');
		$('.seccion3 .imagenAsoc img').addClass('animated fadeInslideInRight');
		$('.seccion3 .btn').addClass('animated fadeIn delay1');
	}, { offset: '80%'});			


	/** FRAMES **/
		var once=false;
		var fromDown=false;
		var fromUp=true;
		$(document).scroll(function(){
			
		 console.log($(window).scrollTop() +':'+ document.getElementById('seccion4').offsetTop);
			 if($(window).scrollTop() >= document.getElementById('seccion4').offsetTop){
				
				 if(fromUp){
					 initAnimation();
					 initAnimationTouch();
					 fromUp=false;
					 fromDown=true; 
				 }
				 
				 if(!once){
					initAnimation();
					initAnimationTouch();
					once=true;
				 }	

			 }
			 
			 else if($('.seccion4').offset().top > $(window).scrollTop()){
				 
				if(fromDown){ 
					initAnimation();
					initAnimationTouch();
					fromDown=false;
					fromUp=true;
				}
			 }

			
		});
		
		/*
		$('.seccion4 h2').waypoint(function() {
			
			
		}, { offset: '15%'});	*/
	
});

function disableScroll(){

	$(window).bind('scroll mousewheel ', function(e){
		e.preventDefault();
		return false;
	});
	
    $(window).bind('keyup keypress keydown',function(e){
		
		var tecla = (document.all) ? event.keyCode : event.which;
		
		if((tecla == 37) || (tecla == 38) || (tecla == 39) || (tecla == 40)){
			e.preventDefault();
			return false;
		}	
		
	});	
	
} 

function disableTouchmove(){
	$(window).bind('touchmove', function(e){
		e.preventDefault();
		return false;
	});	
}



function initAnimation(){
	
	disableScroll();	
	
	$('body').on('mousewheel', function(event) {		
		if(event.deltaY > 0){
			/** RUEDA HACIA ARRIBA **/
			
			if(currentScroll > 1){
				
				if(!flag){
					flag=true;
					currentScroll --;
					playInterval(currentScroll,event.deltaY);
					step(currentScroll);
				}
			}
			else{
				if(!flag){
					enableScroll();
					$('body').off('mousewheel');
				}
			}
		}
		else{
			/** RUEDA HACIA ABAJO **/
			
			if(currentScroll < 4){
				if(!flag){
					flag=true;	
					currentScroll ++;
					step(currentScroll);
					playInterval(currentScroll,event.deltaY);
				}	
			}
			else{
				if(!flag){	
					enableScroll();
					$('body').off('mousewheel');
				}
			}
		}	
	});	
}


function initAnimationTouch(){
	disableTouchmove();

	$('body').swipe({
		swipeUp:function(event, direction, distance, duration, fingerCount) {
			
			if(currentScroll < 4){

				if(!flag){
					flag=true;	
					currentScroll ++;
					step(currentScroll);
					playInterval(currentScroll,-1);
				}	
			}
			
			else{
				if(!flag){	
					enableTouchmove();
					$('body').swipe("destroy");	
				}
			}		
		}
		
	});
	
	$('body').swipe({
		swipeDown:function(event, direction, distance, duration, fingerCount) {
			
			if(currentScroll > 0){
				
				if(!flag){
					flag=true;
					currentScroll --;
					playInterval(currentScroll,1);
					step(currentScroll);
				}
			}
			else{
				if(!flag){
					enableTouchmove();
					$('body').swipe("destroy");
				}
			}			
		}
	});	

}

function enableScroll() {
    $(window).unbind('scroll keyup mousewheel keypress keydown');
}

function enableTouchmove() {
    $(window).unbind('touchmove');
}


function step(current){
	if((current >0) && (current <=3)){
		$('.frame-pagination span').text(current);
	}	
}


function playInterval(interval,direction){

		if(direction < 0){
			switch(interval){
					
				case 2:
					showTitle(interval);
					playFrames(67,153);
					break;
					
				case 3:
					showTitle(interval);
					playFrames(154,255);
					break;
				
				case 4:
					showTitle(interval);
					playFrames(256,299);
					break;
			}
		}
		
		else{
			switch(interval){
					
				case 1:
					showTitle(interval);
					playFrames(153,67);
					break;
					
				case 2:
					showTitle(interval);
					playFrames(255,154);
					break;
				
				case 3:
					showTitle(interval);
					playFrames(299,256);
					break;
		}		
	}	
	
	return flag;
}

function showTitle(scroll){

	if(scroll>3){
		$('.seccion4 h2, .title-scroll').css('opacity','0');
	}
	
	else{
		$('.seccion4 h2, .title-scroll').css('opacity','1');
		$('.title-scroll').hide();
		$('.title-scroll'+scroll).show();
	}	
}


function playFrames(init,end){

	var current = init;
	
	if(init < end){
		var interval = setInterval(function(){ 

			$('.frame').removeClass('active');
			$('.frame'+current).addClass('active');
			
			if(current == end){
				clearInterval(interval);
				flag=false;
			}
			
			current++;
			
		}, 40);
	}
	
	else{
		
		
		var interval = setInterval(function(){ 
			$('.frame').removeClass('active');
			$('.frame'+current).addClass('active');
			
			if(current == end){
				clearInterval(interval);	
				flag=false;
			}
			
			current--;
			
		}, 40);		
	}
}
