$(document).bind('ready', function(){

		$(window).resize(function(){
			SearchOptionsPosition();
			HomeOptionsPosition();
		});

		//$.doTimeout('homeOptions', 250, function(){HomeOptionsPosition();});
		HomeOptionsPosition();

		function HomeOptionsPosition(){
			var w = $('#header').width();
			var cw = $('#homeOptions').width();
			$('#homeOptions').css('left',(w/2)-(cw/2));
		}

		//$.doTimeout('searchOptions', 250, function(){SearchOptionsPosition();});
		SearchOptionsPosition();

		function SearchOptionsPosition(){
			var w = $('#header').width();
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
					$('.pnl').css({'height':'0px','opacity':'0'});
					$(this).addClass('active');
					$('#'+pnl).css({'height': String(window_h)+'px','opacity':'1'});
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
			//$(this).parent().fadeOut('fast');
			$(this).css('visibility', 'hidden').parent().css('visibility', 'hidden');
		});

		$.doTimeout('searchOptionsActive', 1500, function(){
			$('.msg').css('display','none').css('visibility','visible').fadeIn('slow');
			$('.content-arrow-left').fadeIn('slow').fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut('slow');
			$('.content-arrow-right').fadeIn('slow').fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut('slow');
		});

		$('#indexFavourites').click(function(){
			var window_h = $(window).height();
			if(!$(this).hasClass('active')){
				$(this).addClass('active');
				$('#pnlDialog .message span').text('Índice incluido en favoritos');
				$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			}
			else{
				$(this).removeClass('active');
				$('#pnlDialog .message span').text('Índice eliminado de favoritos');
				$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			}
		});

		$('#valueFavourites').click(function(){
			var window_h = $(window).height();
			if(!$(this).hasClass('active')){
				$(this).addClass('active');
				$('#pnlDialog .message span').text('Valor incluido en favoritos');
				$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			}
			else{
				$(this).removeClass('active');
				$('#pnlDialog .message span').text('Valor eliminado de favoritos');
				$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			}
		});

		$('#inputPin').click(function(){
//			var g5 = $('#g5').val();
			var window_h = $(window).height();

//            if ($('#g5').attr('data-first')) {
//                $('#g5').removeAttr('data-first');
                $('#pinDialog').css({'height': String(window_h)+'px','opacity':'1'});
                return;
//            }

			if(g5 === ''){
				$('#pnlDialog .message span').text('La coordenada introducida no es correcta');
				$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			}
			else if(!isNumber(g5)){
				$('#pnlDialog .message span').text('No dispone de saldo suficiente para realizar la operación');
				$('#pnlDialog').css({'height': String(window_h)+'px','opacity':'1'});
			}
			else{
				$('#pnlDialog .message span').text('Para confirmar esta operación, pulse sobre la coordenada G-8 de su tarjeta de claves:');
				$('#pnlDialog.g8').css({'height': String(window_h)+'px','opacity':'1'});
			}
		});

        $('#pinDialog .top input.ui-btn-hidden').on('click', function() {
            if ($('#inputPin').val().length < 2 && isNumber($(this).val())) {
                $('#inputPin').val($('#inputPin').val() + '' + $(this).val());
            }

            if ($('#inputPin').val().length >= 2) {
                $('#pinDialog.g8').css({'height':'0px','opacity':'0'});
            }
        });

        $('#pinDialog .bottom input.ui-btn-hidden').on('click', function() {
            $('#inputPin').val('');
        });

		function isNumber(n) {
		  return !isNaN(parseFloat(n)) && isFinite(n);
		}

		$('#btnCloseDialog').click(function(){
			$('#pnlDialog').css({'height':'0px','opacity':'0'});
		});

		$('#btnCloseDialog.g8, .ui-close-button').click(function(){
			$('#pinDialog.g8').css({'height':'0px','opacity':'0'});
		});

		//$.doTimeout('NavSettings', 1000, function(){
			NavSettingsClose();
			$('.nav-settings').css('opacity','1');
		//});

		function NavSettingsOpen(){
			$('.nav-settings').css('left','0px');
			$('.nav-settings').addClass('open');
		}
		function NavSettingsClose(){
			var w = $(window).width();
			var p = (w*12.5)/100;
			$('.nav-settings').css('left',p-w);
			$('.nav-settings').removeClass('open');
		}

		var w = $(window).width();
		var ba = $('.list-position .ui-li-divider .ui-block-b').width();
		var bb = $('.list-position .ui-li-divider .ui-block-c').width();
		var b = ba+bb;
		$('.nav-buttons').css('width', b);
		$('.btnGroups').css('width', b-35);
		NavButtonsClose();

		function NavButtonsOpen(){
			$('.nav-buttons').css('left', w-b);
			$('.nav-buttons').addClass('open');
		}
		function NavButtonsClose(){
			$('.nav-buttons').css('left', w-50);
			$('.nav-buttons').removeClass('open');
		}
		$('.btn-nav-settings').click(function(){
			if($(this).parent().hasClass('open')){
				$(this).parent().css('left', w-50);
				$(this).parent().removeClass('open');
			}
			else{
				$(this).parent().css('left', w-b);
				$(this).parent().addClass('open');
			}
		});

		$('.nav-settings a.link-inherit').click(function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			}
			else{
				var grp = $(this).parent().attr('group');
				$('.'+grp+' a.link-inherit').removeClass('active');
				$(this).addClass('active');
			}
		});
		$('#btn-nav-settings').click(function(){
			if($('.nav-settings').hasClass('open')){NavSettingsClose();}
			else{NavSettingsOpen();}
		});

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
				$(this).removeClass('ui-radio-off').addClass('ui-radio-on');
				$(this).find('.ui-icon').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on');
				$(this).parent().find('input').attr('checked','checked');
			}
			else{
				$(this).removeClass('ui-radio-on').addClass('ui-radio-off');
				$(this).find('.ui-icon').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off');
				$(this).parent().find('input').removeAttr('checked');
			}
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

		$('select').change(function(){
			var selected = $(this).find('option:selected').html();
			$(this).parent().find('.ui-btn-inner .ui-btn-text span').html(selected);
		});

		$('.tab-menu ul li').click(function(){
			if(!$(this).hasClass('tab-always-active')){
				var arr = $('.tab-menu ul li');
				$.each(arr, function(){ $(this).removeClass('active');});
				$(this).addClass('active');
			}
		});

		$('.choice-menu li a').click(function(){
			if(!$(this).hasClass('active')){
				$(this).parent().parent().find('.ui-btn').removeClass('active');
				$(this).addClass('active');
			}
		});

        if ($('#mi_posicion_logado.miposicion').length) {
            $('.listview.collapsible-list-standar').find('.table').each(function() { $(this).find('.ui-block-c').first().show(); });

            var ocultar = function(elemento) {
                var lista = $('#' + $(elemento).attr('data-list'));

                lista.find('.table').each(function() {
                    var col = 0,
                        bloques = $(this).find('.ui-block-c'),
                        data_col = parseInt($(elemento).attr('data-col').match(/([0-9]+)/)[0], 10);

                    bloques.hide();

                    bloques.each(function() {
                        var siguiente = (data_col + 1) >= bloques.length ? 0 : data_col + 1;

                        if (col === siguiente) {
                            $(this).show();
                        }

                        col++;
                    });
                });
            };

            $('.chgvalues-title').on('click', function() {
                ocultar($(this));
            });
        }

		/*  Cookies modal 2014-05-29 */
        var hideCookiesAdd = function(){
        	$('#cookies-panel-background').hide();
        	$('#cookies-panel-content').hide();
        }
        var window_h = $(window).height();
        var window_w = $(window).width();
        var contentPadding = 20;
        var panelWidth = $('#cookies-panel-content').width();
        $('#cookies-panel-background').css({'height': String(window_h)+'px'});
        $('#cookies-panel-content').css({'top': '45px' ,'left':window_w/2 - (panelWidth/2)-contentPadding, 'opacity':'1'});
        $('#cookiesAdd').click(function(){
        	alert("políticas sobre cookies ;) ");
        })
        $('#cookiesAccept').click(function(){
        	hideCookiesAdd();
        })
});