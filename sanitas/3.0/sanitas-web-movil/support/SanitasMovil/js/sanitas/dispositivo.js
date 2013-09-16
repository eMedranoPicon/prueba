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


//$(".black-background").on("touchstart", false);
//$("nav ul").on("touchmove", true);


$('nav ul').mouseenter(function(){
});

$('.black-background').click(function(){
	});	
	

});


window. onorientationchange = function ( ) {
		$('nav div').css("margin-top", "-15px");
		$('.black-background').fadeOut();
		$('nav div strong').css("background-position","-500px bottom");	
		$('nav ul').css("height", "0px")	

//corregir imagen centro//
var altoDiv	=$("#referenceDiv").height();
var altoTotal = altoDiv-5;
$('.staticSummaryCenter img').css("height",altoTotal);	
$('.staticSummaryCenter img').css("width",'auto');	
$('.staticSummaryCenter img').css("display",'block');	
$('.staticSummaryCenter img').css("margin",'auto');	
$('.staticSummaryCenter').css("overflow", 'hidden');	
$('.staticSummaryCenter').css("text-align", 'center');	

//corregir imagen centro//




}




