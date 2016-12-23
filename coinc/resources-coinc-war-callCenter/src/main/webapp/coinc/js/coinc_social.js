var popupStatusFB = 0;
var popupStatusTWITTER = 0;
var popupStatusMail = 0;
var popupStatusBlog = 0;

function fadeOutPopupFB() {
	popupStatusFB = 0;
	$("#backgroundPopupFB").fadeOut("slow");
	$("#popupContactFB").fadeOut("slow");
}	

function fadeOutPopupTWITTER() {
	popupStatusTWITTER = 0;
	$("#backgroundPopupTWITTER").fadeOut("slow");
	$("#popupContactTWITTER").fadeOut("slow");
}

function fadeOutPopupMail() {
	popupStatusMail = 0;
	$("#backgroundPopupMail").fadeOut("slow");
	$("#popupContactMail").fadeOut("slow");
}	

function fadeOutPopupBlog() {
	popupStatusBlog = 0;
	$("#backgroundPopupBlog").fadeOut("slow");
	$("#popupContactBlog").fadeOut("slow");
}	

function hidePopupTWITTER() {
	$("#popupContactTWITTER").hide();
	
}
function hidePopupFB() {			
	$("#popupContactFB").hide();			
}
function hidePopupMail() {			
	$("#popupContactMail").hide();			
}
function hidePopupBlog() {			
	$("#popupContactBlog").hide();			
}

function loadPopupFB() {
	if (popupStatusFB == 0) {
		centerPopupFB();			
		$("#backgroundPopupFB").css({ "opacity" : "0.7" });
		$("#backgroundPopupFB").fadeIn("slow");
		$("#popupContactFB").fadeIn("slow");
		popupStatusFB = 1;
	}
}

function centerPopupFB() {
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#popupContactFB").height();
	var popupWidth = $("#popupContactFB").width();
	$("#popupContactFB").css({"position" : "fixed","top" : windowHeight / 2 - popupHeight / 2,"left" : windowWidth / 2 - popupWidth / 2});
	$("#backgroundPopupFB").css({
		"height" : windowHeight
	});
}

function loadPopupTWITTER() {			
	if (popupStatusTWITTER == 0) {
		centerPopupTWITTER();
		$("#backgroundPopupTWITTER").css({ "opacity" : "0.7" });
		$("#backgroundPopupTWITTER").fadeIn("slow");
		$("#popupContactTWITTER").fadeIn("slow");
		popupStatusTWITTER = 1;
	}
}

function centerPopupTWITTER() {
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#popupContactTWITTER").height();
	var popupWidth = $("#popupContactTWITTER").width();
	$("#popupContactTWITTER").css({"position" : "fixed","top" : windowHeight / 2 - popupHeight / 2,"left" : windowWidth / 2 - popupWidth / 2});
	$("#backgroundPopupTWITTER").css({
		"height" : windowHeight
	});
}
function loadPopupMail() {			
	if (popupStatusMail == 0) {
		centerPopupMail();
		$("#backgroundPopupMail").css({ "opacity" : "0.7" });
		$("#backgroundPopupMail").fadeIn("slow");
		$("#popupContactMail").fadeIn("slow");
		popupStatusMail = 1;
		
		if( $.browser.msie ){
			$('#copymail').click(function() {
				window.clipboardData.setData('text', $('#urlmail').val()); 
				$('#urlmail').css('background','#70a41c');
			});			
		}
		else {
			$('#copymail').zclip({
		        path:'/res/coinc/js/ZeroClipboard.swf',
		        copy:function(){return $('#urlmail').val();},
		        beforeCopy:function(){
		            $('#urlmail').css('background','#70a41c');
		            $(this).css('color','orange');
		        },
		        afterCopy:function(){
		            $('#urlmail').css('background','#70a41c');
		            $(this).css('color','#70a41c');
		            $(this).next('.check').show();
		        }
		    });
		}
	}
}

function centerPopupMail() {
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#popupContactMail").height();
	var popupWidth = $("#popupContactMail").width();
	$("#popupContactMail").css({"position" : "fixed","top" : windowHeight / 2 - popupHeight / 2,"left" : windowWidth / 2 - popupWidth / 2});
	$("#backgroundPopupMail").css({
		"height" : windowHeight
	});
}

function loadPopupBlog() {			
	if (popupStatusBlog == 0) {
		centerPopupBlog();
		$("#backgroundPopupBlog").css({ "opacity" : "0.7" });
		$("#backgroundPopupBlog").fadeIn("slow");
		$("#popupContactBlog").fadeIn("slow");
		popupStatusBlog = 1;
		
		if( $.browser.msie ){
			$('#copyblog').click(function() {
				window.clipboardData.setData('text', $('#urlblog').val()); 
				$('#urlblog').css('background','#70a41c');
			});			
		}
		else {
			$('#copyblog').zclip({
		        path:'/res/coinc/js/ZeroClipboard.swf',
		        copy:function(){return $('#urlblog').val();},
		        beforeCopy:function(){
		            $('#urlblog').css('background','#70a41c');
		            $(this).css('color','orange');
		        },
		        afterCopy:function(){
		            $('#urlblog').css('background','#70a41c');
		            $(this).css('color','#70a41c');
		            $(this).next('.check').show();
		        }
		    });
		}
	}
	
}

function centerPopupBlog() {
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#popupContactBlog").height();
	var popupWidth = $("#popupContactBlog").width();
	$("#popupContactBlog").css({"position" : "fixed","top" : windowHeight / 2 - popupHeight / 2,"left" : windowWidth / 2 - popupWidth / 2});
	$("#backgroundPopupBlog").css({
		"height" : windowHeight
	});
}

$(document).ready(function() {
	hidePopupFB();
	hidePopupTWITTER();
	hidePopupMail();
	hidePopupBlog();
	
});

function updatePageTextBoxes() {
	if(bitlyURL!=null) {
		if($('#urlmain1')!=null) {
			$('#urlmain1').val(bitlyURL);
		}
		if($('#urlblog')!=null) {
			$('#urlblog').val(bitlyURL);
		}
		if($('#urlmail')!=null) {
			$('#urlmail').val(bitlyURL);
		}
	}
}


function updateTwitterButton() {
	if(bitlyURL!=null) {
		$('#tweetBtn iframe').remove();
		
		var tweetBtn = $('<a />')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-url', bitlyURL )
        .attr('data-via', 'COINC_es' )
        .attr('data-lang', 'es' )
        .attr('data-size', 'large' )
        .attr('data-count', 'vertical' );
		
        if(dodeposit) {
        	tweetBtn.attr('data-text', 'Estoy ahorrando con COINC. Mira mi meta y participa si quieres: ');
        }
        else { 
        	tweetBtn.attr('data-text', 'Estoy ahorrando con COINC. Mira mi meta: ');
        }
	    $('#tweetBtn').append(tweetBtn);
	    twttr.widgets.load();
	}
}

function callback(response) {
	if(response==null) {
		return;
	}
	if (!response || response.error) {  
		$('#fbconnect_div').html('<p style="vertical-align: top;">No se pudo publicar en Facebook.</p>');
    } else { 
    	$('#fbconnect_div').html('<p><div style="margin-left:86px; float:left;"><img src="/res/coinc/images/iconos/ico_ok.png" /></div> <div style="margin-top:3px; margin-left:8px; float:left;" class="tipo_14">Contenido publicado.</div></p>');  
    }  
}