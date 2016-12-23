$.fn.toggle = function(event, action) {
	if (arguments.length == 0) {
		this.addClass('slidemenu');
		if (true) { //TODO: only if transform supported
			this.addClass('transform');
		}
	} else {
		this.addClass('transition');
		if (arguments.length > 1) {
			if (arguments[1] == 'open') {
				this.removeClass('closed');
			} else if (arguments[1] == 'close') {
				this.addClass('closed');
			}
		} else {
			this.toggleClass('closed');
			event.preventDefault();
		}
		//$('body > article').prepend('<p>' + event.type + '</p>');
	}
	return this;
};
var setupmenu = function() {
	var menu = $('.closed, .open');
	menu.toggle();
	var menucontrol = $('<a href="#"><img src="img/menu.svg" alt="Menú" /></a>');//TODO: i18n
	menucontrol.on('click', function(event) {menu.toggle(event);});
	//menucontrol.on('tapone', function(event) {menu.toggle(event);});
	$('body > nav').before(menucontrol);
	$('body > article').on('click', function(event) {menu.toggle(event, 'close')});
	//$('body > article').on('tapone', function(event) {menu.toggle(event, 'close')});
	//$(window).on('swipeleft', function(event) {menu.toggle(event, 'close')});
	//$(window).on('swiperight', function(event) {menu.toggle(event, 'open')});
};
var svgfallback = function() {
	$('img[src$=".svg"]').each(function(index, element) {
		var jqElement = $(element);
		//TODO: pass other attributes
		var obj = $('<span><object type="image/svg+xml" data="' + jqElement.attr('src') + '" role="img" title="' + jqElement.attr('alt') + '" class="' + jqElement.attr('class') + '"><param name="src" value="' + jqElement.attr('src') + '" /><img src="' + jqElement.attr('src').replace(/\.svg$/g, '.png') + '" alt="' + jqElement.attr('alt') + '" class="' + jqElement.attr('class') + '" /></object></span>');
		jqElement.replaceWith(obj);
	});
};
			
var svgfallback_bak = function() {
	var svgsupported = false;
	if (document.createElementNS){if (document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect){svgsupported = true;}}
	if (!svgsupported) {
		$('img[src$=".svg"]').each(function(index,element) {
			element.src = element.src.replace(/\.svg$/g, '.png');
		});
	}
};

$(document).ready(function() {
	setupmenu();
	svgfallback();
    var logo = $('object[data="img/logo.svg"]');
    if (logo) {
    	logo.parent().on('mouseover', function(event) {$($(this).children().prop('contentDocument')).find('#Artboard-2').attr('fill', '#FFFF00');});
    	logo.parent().on('mouseout', function(event) {$($(this).children().prop('contentDocument')).find('#Artboard-2').attr('fill', '#FFFFFF');});
    }
});
$(window).load(function() {
	//further widget configuration: rollbacks, listeners, etc
});
