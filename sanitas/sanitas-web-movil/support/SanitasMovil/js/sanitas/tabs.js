// JavaScript Document
$(document).ready(function() {

// Colocar menu

	var numTabs=$(".tabs h2").length;
	var widthTabsitems = 100/numTabs;
	$('.tabs h2').css("width",widthTabsitems+'%');
	$('.tabs li:nth-child(2) h2').css("left",widthTabsitems+'%')
	$('.tabs li:nth-child(3) h2').css("left",(widthTabsitems*2+'%'))
	$('.tabs li:nth-child(4) h2').css("left",(widthTabsitems*3+'%'))
	$('.tabs li:nth-child(5) h2').css("left",(widthTabsitems*4+'%'))

	// Colocar menu
	if(numTabs<4) {
		$('head').prepend('<link href="support/SanitasMovil/css/tabs.css" media="screen" rel="stylesheet" type="text/css" />');
		$('.tabs h2').addClass("min");

	} else{
		$('.tabs h2').addClass("max");
		$('.box-grey .tabs ul').css("margin-bottom",0);

		}


});
