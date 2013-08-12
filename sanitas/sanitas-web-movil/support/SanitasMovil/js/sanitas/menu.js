// JavaScript Document
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
	$('nav ul li').css("width",widthMenuitems+'%');	

	// Colocar menu 