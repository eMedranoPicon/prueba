// JavaScript Document

$(document).ready(function() {
	
//Scroll//	
setInterval(function () {
nextPage();
}, 5000);
	
	//

	//
//Scroll//		


$('html, body').animate({scrollTop:0}, 'fast');
	//
	
var ua = navigator.userAgent;
var checker = {
  iphone: ua.match(/(iPhone|iPod|iPad)/),
  blackberry: ua.match(/BlackBerry/),
  android: ua.match(/Android/)
};
	


	if (checker.android)
  $('nav').css("position","absolute");	
  $('nav').css("top","62px");	
	
	// Colocar menu 
	var menuItems=$("nav ul li").length;
	var widthMenuitems = 99/menuItems;
	var heightMenuitems=menuItems*43;
	$('nav ul li').css("width",widthMenuitems+'%');	

	// Colocar menu 

//tamaño navegador//


$(window).resize(function() {
tamano();

});
	
	
function tamano(){
    var ventana_ancho = $(window).width();
    var ventana_alto = $(window).height();

	if(ventana_ancho>707){
			
			$('nav ul li').css("width",widthMenuitems+'%');	
		
		}else{
			$('nav ul li').css("width",100+'%');	
			
			}
	
	
	
}		
	  
	  
//tamaño navegador//
	
//condicional Menu
var openMenu=false;

if (windowWidth <= 767){

//botonera//
	$('nav div strong').toggle(function() {
		$('nav ul li').css("width","100%");
		$('nav ul').css("overflow-y","auto");
		$('nav div').css("margin-top", "-3px");
		$('.black-background').css("opacity",.8);
		$('.black-background').fadeIn();
		$('nav div strong').css("background-position","-500px -436px");	
		$('nav ul').css("height", heightMenuitems)
		//add
		$('nav').css("position","absolute");	
		$('html, body').animate({scrollTop:0}, 'fast');
		openMenu=true;
		//add

	}, function() {
		$('nav div').css("margin-top", "-15px");
		$('.black-background').fadeOut();
		$('nav div strong').css("background-position","-500px bottom");	
		$('nav ul').css("height", "0px")
		openMenu=false;
	});
	
//botonera//


$(document).scroll( function () {
		var posicionScroll=$(document).scrollTop();
		//$('nav').css("display","none");	
		//
		 if(posicionScroll >= 61 && openMenu==false){
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
//condicional Menu





	
// Slider home
 var autoStart = true;

  $('#slider-home').royalSlider({
    autoHeight: true,
    arrowsNav: false,
    fadeinLoadedSlide: true,
    controlNavigationSpacing: 0,
    controlNavigation: 'bullets',
    imageScaleMode: 'fill',
    imageAlignCenter:true,
    loop: true,
    loopRewind: false,
	navigateByClick:false,
    numImagesToPreload: 6,
    keyboardNavEnabled: false,
    autoScaleSlider: true,  
    autoScaleSliderWidth: 486,     
    autoScaleSliderHeight: 315,
	autoPlay: {
		enabled: true,
		delay:5000,
        enabled: autoStart
	},
	
	
	
  }).data('royalSlider');
  
 //trayecto// 
$('.modoTrayecto a').click(function() {
	$('.modoTrayecto ul li').find('a').removeClass('on');
	$(this).addClass('on');

 });
 //trayecto//   

//contacto//

$('.content.contact-home h3').click(function() { 

	$('.content.contact-home').find('li').removeClass('activa');
	$(this).parent().addClass('activa');

});

//contacto//


 //accodeon// 
$('article.hospitales .box-grey.accordeon  li h3').click(function() {
	$('article.hospitales .box-grey.accordeon').find('li').removeClass('activa');
	$(this).parent().addClass('activa');

 });
 //accodeon// 
 //añade asegurado// 
 
 
$('.add-user').click(function() {
	$(this).parent().parent().next().addClass('activa');
	$(this).parent().css("display","none");	
	$(this).parent().parent().css("border-bottom","1px solid #e5e5e5");	
	$(this).parent().parent().find('span.close.asegurado').css("display","none");	
 });


 
$('.close.asegurado').click(function() {
		$(this).parent().removeClass('activa');
		$(this).parent().prev().find('.box-white').css("display","block");
		$(this).parent().prev().find('span.close.asegurado').css("display","block");	
		
 });
 
 //añade asegurado// 
 
    $('#toggleAutoPlayBtn').click(function() {
            // optionally change button text, style e.t.c.
            if(autoStart) {
                $(this).html('pause');
				$(this).css("background-position","-50px -292px");	
				
	            } else {

                $(this).html('play');
				$(this).css("background-position","-12px -292px");	
            }
            autoStart = !autoStart;
            
            $('#slider-home').royalSlider('toggleAutoPlay');
     });
// Slider home






});






function reseta(){
	$('section.elige section div').css("display","none");	
	$('section.elige ul.tipo-seguro a').removeClass("on");
	$('.tabs h2').removeClass("on");
	$('#tab1').css("display","none");	
	$('#tab2').css("display","none");	
	$('#tab3').css("display","none");	
	$('#tab4').css("display","none");	
	$('#tab5').css("display","none");	

	$('#contentListadoCentros').css("display","none");	
	$('#mapagoogle').css("display","none");	
	
	$('ul.tipo-seguro.resultado li').find('a').removeClass('on');
	
	}

function showBusqueda(bot,elemento) {
	$(elemento).toggle(0)
	$(bot).addClass("on");
	
	}
function showLayer(bot,elemento) {
	reseta();

	$(elemento).toggle(0)
	$(bot).addClass("on");
		
	
	}
	
function showSeguro(bot,elemento) {
	
	$('#recomendados').css("display","none");	
	$('#todos').css("display","none");	
	$('li.opc1 a').removeClass("on");
	$('li.opc2 a').removeClass("on");
	
	
	$(elemento).toggle(0)
	$(bot).addClass("on");
	
	}
	
