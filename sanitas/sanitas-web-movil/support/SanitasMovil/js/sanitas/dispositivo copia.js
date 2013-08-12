// JavaScript Document

var agent=navigator.userAgent.toLowerCase(); 
var is_android = agent.indexOf('android') > -1;// && ua.indexOf('mobile');
var is_iphone = (agent.indexOf('iphone')!='-1'); 
var is_ipad = (agent.indexOf('ipad')!='-1'); 

var windowWidth = $(window).width();

//detectar densidad
var pr = 1;
if(window.devicePixelRatio !== undefined)
    pr = window.devicePixelRatio;
if (pr>=1.5){
    //hacer algo
	
}


$(document).ready(function() {


$(".black-background").on("touchstart", false);
$("nav ul").on("touchmove", true);


$('nav ul').mouseenter(function(){
});

$('.black-background').mouseenter(function(){
	});	
	
	$('nav div strong').toggle(function() {
		$('nav ul li').css("width","100%");
		$('nav ul').css("overflow-y","auto");
		$('nav div').css("margin-top", "-3px");
		$('.black-background').css("opacity",.8);
		$('.black-background').css("display","block");
		$('nav div strong').css("background-position","-500px -436px");	
		$('nav ul').animate({height: '190px'}, 200, 'easeInOutQuad', function() {
		 });


	}, function() {
		$('nav div').css("margin-top", "-15px");
		$('.black-background').css("display","none");
		$('nav div strong').css("background-position","-500px bottom");	
	 	$('nav ul').animate({height: '0'}, 200, function() {
			$('nav').css("height","auto");	
		});
	});
});






//detectar densidad
if (windowWidth <= 767){

$(document).scroll( function () {
		var posicionScroll=$(document).scrollTop();
		$('nav').css("display","none");	
		//
		 if(posicionScroll >= 61){
			$('nav').css("position","fixed");	
			$('nav').css("top","0px");
			$('nav').fadeIn();
			//$('nav div').animate({marginTop: '-15px'}, 100);	
			//$('nav').css("margin-top","15px");
		 }
		//
		 if(posicionScroll==0){
			//$('nav').animate({top: '62px'}, 500);	
			$('nav').css("top","62px");	
			$('nav').css("position","absolute");	
			$('nav').fadeIn();
			}


	});





}