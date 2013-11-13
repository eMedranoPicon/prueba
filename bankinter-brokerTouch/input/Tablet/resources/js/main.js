$(document).bind('ready', function(){

	$(window).bind('orientationchange', function(event){
		if (event.orientation == 'portrait') {
			$.doTimeout('contentOptions', 350, function(){ContentOptionsPosition(0);});
		}
		else {
			$.doTimeout('contentOptions', 350, function(){ContentOptionsPosition(50);});
		}
	});

	$(window).resize(function(){HomeOptionsPosition();});

	ContentOptionsPosition(0);
	function ContentOptionsPosition(d){

		var window_h = $(window).height();
		var window_w = $(window).width();
		var header_h = $('#header').height();
		var footer_h = $('#footer-inner').height();
		var h = window_h - (header_h + footer_h - 90);

		var	primary_h = $('.content .primary').height();
		var	secondary_h = $('.content .secondary').height();
		var	secondary_w = $('.content .secondary').width();

		if ($('.lightboxOpen').length > 0){
			var id = $('.lightboxOpen').attr('id');
			OpenLightBox(id);
		}

		if(window_w > 800){
			if ($('.content .secondary .list-container').length > 0){
				$('.content .primary').height(h);
				$('.content .secondary').height(h);
				var title_h = 0;
				var circles_h = 0;
				if ($('.secondary #title').length > 0){var title_h = $('.secondary #title').height();}
				if ($('.secondary .circle-values-items').length > 0){circles_h = $('.secondary .circle-values-items').height();}
				$('.content .secondary .list-container').height(h - (title_h + circles_h + d));
			}

			if ($('.content-arrow-right').length > 0){
				$('.content-arrow-right').css({'top':(window_h/2)-(43/2),'left':(secondary_w-36)});
				$('.content-arrow-left').css({'top':(window_h/2)-(43/2),'left':6});
			}
		}
		else{
			var content_arrow_h = (secondary_h/2)-(43/2) + primary_h + header_h;

			if ($('.content-arrow-right').length > 0){
				$('.content-arrow-right').css({'top':content_arrow_h,'left':(secondary_w-36)});
				$('.content-arrow-left').css({'top':content_arrow_h,'left':6});
			}

			var title_h = 0;
			if ($('.secondary #title').length > 0){var title_h = $('.secondary #title').height();}

			$('.list-container-portrait').height(h - (primary_h + title_h + d));
		}
	}

	HomeOptionsPosition();
	function HomeOptionsPosition(){
		var w = $('.content .primary').width();
		var cw = $('#homeOptions').width();
		$('#homeOptions').css('left',(w/2)-(cw/2));

		var window_h = $(window).height();
		$('.content .secondary').height(window_h);
	}

	SearchOptionsPosition();
	function SearchOptionsPosition(){
		var w = $('#searchOptionsBox').width();
		var cw = $('#searchOptions').width();
		$('#searchOptions').css('left',(w/2)-(cw/2));
	}

	$('#footer ul li').click(function(){
		var pnl = $(this).attr('rel');
		if(pnl != ''){
			var window_h = $(window).height();
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$('#'+pnl).css({'height':'0px','opacity':'0'});
			}
			else{
				$('#footer ul li').removeClass('active');
				$('.pnl').css({'height':'0px','opacity':'0','padding-top':'0px'});
				$(this).addClass('active');

				var h = (window_h/2);
				var pt = (window_h/2);

				if(h < 350 && pnl != 'pnlSearch'){
					h = window_h-180;
					pt = 180;
				}
				else if(pnl == 'pnlSearch'){
					h = window_h-80;
					pt = 80;
				}

				$('#'+pnl).css({'padding-top': String(pt)+'px'}).delay(500).css({'height': String(h)+'px','opacity':'1'});
				var id = $(this).attr('id');
			}
		}
	});

	$('.order-arrow').click(function(){
		if($(this).hasClass('desc')){$(this).removeClass('desc').addClass('asc');}
		else{$(this).removeClass('asc').addClass('desc');}
	});

	$('.btnPnl').click(function(){
		$('#footer ul li.active').click();
	});

	$('#msgClose').click(function(){
		$(this).parent().fadeOut('fast');
	});

	$('.tab-menu ul li').click(function(){
		if(!$(this).hasClass('tab-always-active')){
			var arr = $('.tab-menu ul li');
			$.each(arr, function(){ $(this).removeClass('active');});
			$(this).addClass('active');
		}
	});

	$('#btnInfo').click(function(e){
		OpenLightBox('pnlInfo');
		return false;
	});

    $('#tabSesionAyer,#tabExpectativasHoy').click(function(e){
        $('#comment1,#comment2').toggle();
        return false;
    });


    $('#btnSesionAyer,#btnExpectativasHoy').click(function(e){
		OpenLightBox('pnl' + this.id.substr(3));
		return false;
	});

	$('#btnLogin').click(function(e){
		OpenLightBox('pnlLogin');
		return false;
	});

	$('#btnLogout').click(function(e){
		OpenLightBox('pnlLogout');
		return false;
	});

	$('#btnGears').click(function(e){
		OpenLightBox('pnlGears');
		return false;
	});

	$('#btnDefine').click(function(e){
		$('.lightboxLeft').hide();
		$('.lightboxRight').show();
	//	$('.lightboxCenter').show();
	});

	$('#btnUpdateOrder').click(function(e){
		$('.lightboxLeft').hide();
		$('.lightboxRight').hide();
		$('.lightboxCenter').show();
	});

	$('#btnCancelOrder').click(function(e){
		$('.lightboxLeft').hide();
		$('.lightboxCenter').hide();
		$('.lightboxRight').show();
	});

	$('#btnG5Cancel').click(function(e){
		$('.lightboxLeft').hide();
		$('.lightboxCenter').hide();
		$('.lightboxRight').hide();
		$('.lightboxResultRight').show();
	});

	$('#btnG5Update').click(function(e){
		$('.lightboxLeft').hide();
		$('.lightboxCenter').hide();
		$('.lightboxRight').hide();
		$('.lightboxResultCenter').show();
	});

	$('#btnG5Buy').click(function(e){
		$('.lightboxLeft').hide();
		$('.lightboxRight').show();
	});

	$('#btnGraphic').click(function(e){
		OpenLightBox('pnlGraphic');
		return false;
	});

	$('.gears-icon').click(function(e){
		OpenLightBox('pnlGraphic');
		return false;
	});

	$('.list-value .ui-btn').click(function(e){
		if (!$(this).parent().hasClass('list-warrant')){
			OpenLightBox('pnlNews');
		}
		return false;
	});

	function OpenLightBox(pnl){
		var window_h = $(window).height();
		var footer_h = $('#footer-inner').height();
		var lightbox_h = $('#'+pnl+' .lightbox').height();

		var t = ((window_h - footer_h)/2) + (lightbox_h/2);
		var pt = (window_h - footer_h) - t;
		var h = window_h - pt;

		$('#'+pnl).css({'padding-top': String(pt)+'px'}).delay(500).css({'height': String(h)+'px','opacity':'1'}).addClass('lightboxOpen');
	}

	$('#pnlInfo .close').click(function(){
		CloseLightBox('pnlInfo');
	});

	$('#pnlLogin .close').click(function(){
		CloseLightBox('pnlLogin');
	});

	$('#pnlGears .close').click(function(){
		CloseLightBox('pnlGears');
	});

    $('#pnlSesionAyer .close').click(function(){
		CloseLightBox('pnlSesionAyer');
	});

    $('#pnlExpectativasHoy .close').click(function(){
		CloseLightBox('pnlExpectativasHoy');
	});

	$('#pnlGears .close-right').click(function(){
		$('.lightboxRight').hide();
		$('.lightboxLeft').show();
	});

	$('#pnlCompra .close-result').click(function(){
		$('.lightboxRight').hide();
		$('.lightboxCenter').hide();
		$('.lightboxResultRight').hide();
		$('.lightboxResultCenter').hide();
		$('.lightboxLeft').show();
		CloseLightBox('pnlCompra');
	});

	$('#pnlCompra .close-center, #pnlCompra .close-right').click(function(){
		$('.lightboxRight').hide();
		$('.lightboxCenter').hide();
		$('.lightboxLeft').show();
	});

	$('#pnlGraphic .close').click(function(){
		CloseLightBox('pnlGraphic');
	});

	$('#pnlNews .close').click(function(){
		CloseLightBox('pnlNews');
	});

	function CloseLightBox(pnl){
		$('#'+pnl).css({'height':'0px','opacity':'0'}).removeClass('lightboxOpen');
	}

	$('.ui-collapsible .ui-collapsible-heading').click(function(e){
		if($(this).parent().hasClass('ui-collapsible-collapsed')){
			$(this).parent().removeClass('ui-collapsible-collapsed')
			$(this).removeClass('ui-collapsible-heading-collapsed')
			$(this).parent().find('.ui-collapsible-content').removeClass('ui-collapsible-content-collapsed');
			$(this).parent().find('.ui-collapsible-heading .ui-icon').removeClass('ui-icon-plus').addClass('ui-icon-minus');
		}
		else{
			$(this).parent().addClass('ui-collapsible-collapsed')
			$(this).addClass('ui-collapsible-heading-collapsed')
			$(this).parent().find('.ui-collapsible-content').addClass('ui-collapsible-content-collapsed');
			$(this).parent().find('.ui-collapsible-heading .ui-icon').removeClass('ui-icon-minus').addClass('ui-icon-plus');
		}
	});

	$('.ui-radio .ui-btn').click(function(){
		if($(this).hasClass('ui-radio-off')){
			$(this).parent().parent().find('.ui-radio .ui-btn').removeClass('ui-radio-on').addClass('ui-radio-off').find('.ui-icon').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off');
			$(this).removeClass('ui-radio-off').addClass('ui-radio-on');
			$(this).find('.ui-icon').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on');
			$(this).parent().find('input').attr('checked','checked');
		}
		/*
		else{
			$(this).removeClass('ui-radio-on').addClass('ui-radio-off');
			$(this).find('.ui-icon').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off');
			$(this).parent().find('input').removeAttr('checked');
		}
		*/
	});

	$('.ui-checkbox .ui-btn').click(function(){
		if($(this).hasClass('ui-checkbox-off')){
			$(this).removeClass('ui-checkbox-off').addClass('ui-checkbox-on');
			$(this).find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
			$(this).parent().find('input').attr('checked','checked');
		}
		else{
			$(this).removeClass('ui-checkbox-on').addClass('ui-checkbox-off');
			$(this).find('.ui-icon').removeClass('ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
			$(this).parent().find('input').removeAttr('checked');
		}
	});

	$('.list-index li').click(function(){
		if (!$(this).hasClass('ui-btn-active') && !$(this).hasClass('ui-li-divider')){
			$('.list-index li.ui-btn-active').removeClass('ui-btn-active');
			$(this).addClass('ui-btn-active');
		}
	});

	$('.list-orders li').click(function(){
		if (!$(this).hasClass('ui-btn-active')){
			$('.list-orders li.ui-btn-active').removeClass('ui-btn-active');
			$(this).addClass('ui-btn-active');
		}
	});

	$('select').change(function(){
		var selected = $(this).find('option:selected').html();
		$(this).parent().find('.ui-btn-inner .ui-btn-text span').html(selected);
	});

	$('.choice-menu li a').click(function(){
		if(!$(this).hasClass('active')){
			$(this).parent().parent().find('.ui-btn').removeClass('active');
			$(this).addClass('active');
		}
	});

	$('#btnComisiones').click(function(e){
		OpenLightBox('pnlComisiones');
		return false;
	});

	$('#pnlComisiones .close').click(function(){
		CloseLightBox('pnlComisiones');
	});

	$('#btnCompra').click(function(e){
		OpenLightBox('pnlCompra');
		return false;
	});

	$('#pnlCompra .close').click(function(){
		CloseLightBox('pnlCompra');
	});

	$('#btnTest').click(function(e){
		OpenLightBox('pnlTest');
		return false;
	});

	$('#pnlTest .close').click(function(){
		CloseLightBox('pnlTest');
	});

	$('#btnResumen').click(function(e){
		OpenLightBox('pnlResumen');
		return false;
	});

	$('#pnlResumen .close').click(function(){
		CloseLightBox('pnlResumen');
	});

	$('#btnConfirmacion').click(function(e){
		OpenLightBox('pnlConfirmacion');
		return false;
	});

	$('#pnlConfirmacion .close').click(function(){
		CloseLightBox('pnlConfirmacion');
	});

	$('#btnCloseDialog').click(function(){
		$('#pnlDialog').css({'height':'0px','padding-top':'0px','opacity':'0'});
	});

	$('#btnCloseDialog.g8').click(function(){
		$('#pnlDialog.g8').css({'height':'0px','padding-top':'0px','opacity':'0'});
	});

	$('#btnDeep').click(function(){
		if ($('.deep-content').hasClass('active')){
			$('.deep-content').removeClass('active');
			$(this).removeClass('values-prices-up').addClass('values-prices');
		}
		else{
			$('.deep-content').addClass('active');
			$(this).removeClass('values-prices').addClass('values-prices-up');
		}
		return false;
	});

	$('.order-info-title').click(function(){
		if($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
		}
		else{
			$(this).parent().addClass('active');
		}
		return false;
	});
	$('.btnOrderDetails').click(function(){
		if($(this).parent().parent().parent().parent().parent().parent().find('.order-row-info').hasClass('active')){
			$(this).parent().parent().parent().parent().parent().parent().find('.order-row-info').removeClass('active');
			$(this).removeClass('arrow-up').addClass('arrow');
		}
		else{
			$(this).parent().parent().parent().parent().parent().parent().find('.order-row-info').addClass('active');
			$(this).removeClass('arrow').addClass('arrow-up');
		}
		return false;
	});

	/*
	$('#btnOrderCancel').click(function(){
		return false;
	});
	$('#btnOrderUpdate').click(function(){
		return false;
	});
	*/

	function OpenDialog(pnl){
		var window_h = $(window).height();
		var footer_h = $('#footer-inner').height();
		var lightbox_h = $('#'+pnl+' .pnl-small').height();

		var t = ((window_h - footer_h)/2) + (lightbox_h/2);
		var pt = (window_h - footer_h) - t;
		var h = window_h - pt;

		$('#'+pnl).css({'padding-top': String(pt)+'px'}).delay(500).css({'height': String(h)+'px','opacity':'1'});
	}

	$('#indexFavourites').click(function(){
		var window_h = $(window).height();
		if(!$(this).hasClass('active')){
			$(this).addClass('active');
			$('#pnlDialog .message span').text('Índice incluido en favoritos');
			//$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			OpenDialog('pnlDialog');
		}
		else{
			$(this).removeClass('active');
			$('#pnlDialog .message span').text('Índice eliminado de favoritos');
			//$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			OpenDialog('pnlDialog');
		}
	});

	$('#valueFavourites').click(function(){
		var window_h = $(window).height();
			if(!$(this).hasClass('active')){
			$(this).addClass('active');
			$('#pnlDialog .message span').text('Valor incluido en favoritos');
			//$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			OpenDialog('pnlDialog');
		}
		else{
			$(this).removeClass('active');
			$('#pnlDialog .message span').text('Valor eliminado de favoritos');
			//$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			OpenDialog('pnlDialog');
		}
	});

	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	/*
	$('#btnG5').click(function(){
		var g5 = $('#g5').val();
		var window_h = $(window).height();

		if(g5 == ''){
			$('#pnlDialog .message span').text('La coordenada introducida no es correcta');
			$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			OpenDialog('pnlDialog');
		}
		else if(!isNumber(g5)){
			$('#pnlDialog .message span').text('No dispone de saldo suficiente para realizar la operación');
			$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			OpenDialog('pnlDialog');
		}
		else{
			$('#pnlDialog .message span').text('Para confirmar esta operación, pulse sobre la coordenada G-8 de su tarjeta de claves:');
			$('#pnlDialog.g8').css({'height': String(window_h)+'px','opacity':'1'});
			OpenDialog('pnlDialog.g8');
		}
	});
	*/

	$('.g5').focus(function(){
		var g5 = $('.g5').val();
		var window_h = $(window).height();
		$('#pnlDialog.g8').css({'height': String(window_h)+'px','opacity':'1'});
		OpenDialog('pnlDialog.g8');
	});

    $('#pnlDialog .top input.ui-btn-hidden').on('click', function() {
        if ($('.g5').val().length < 2 && isNumber($(this).val())) {
            $('.g5').val($('.g5').val() + '' + $(this).val());
        }
        if ($('.g5').val().length >= 2) {
            $('#pnlDialog.g8').css({'height':'0px','padding-top':'0px','opacity':'0'});
        }
    });

	$('.etf-sector-nav .etf-graphic-item').click(function(){
		$('.etf-sector-nav .etf-graphic-item').removeClass('active');
		$(this).addClass('active');
	});

	$('.etf-country-nav .etf-graphic-item').click(function(){
		$('.etf-country-nav .etf-graphic-item').removeClass('active');
		$(this).addClass('active');
	});

	$.doTimeout('searchOptionsActive', 1500, function(){
		$('.msg').fadeIn('slow');
		$('.content-arrow-left').fadeIn('slow').fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut('slow');
		$('.content-arrow-right').fadeIn('slow').fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut('slow');
	});

});