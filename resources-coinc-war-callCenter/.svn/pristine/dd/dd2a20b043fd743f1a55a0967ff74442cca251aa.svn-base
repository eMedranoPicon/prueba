function showContactForm() {
	$('#formLoggedUser').css("display", "inherit");
}

function checkSmsOtp(e) {
	var status = e.status; // Can be "begin", "complete" or "success".

    switch (status) {
        case "begin": // Before the ajax request is sent.
        	
            break;

        case "complete": // After the ajax response is arrived.
        	
            break;

        case "success": // After update of HTML DOM based on ajax response..
        	var htmlError = $('#signMessage').html();
        	if (!htmlError || htmlError.length == 0) {
        		$('.sms .feedback').addClass('hidden');
        		$('#commandReloadAfterSign').click();
        	} else {
        		$('.sms .feedback').removeClass('hidden');
        	}
            break;
    }
}

function showSignDocument(e) {
	var status = e.status; // Can be "begin", "complete" or "success".

    switch (status) {
        case "begin": // Before the ajax request is sent.
        	
            break;

        case "complete": // After the ajax response is arrived.
        	
            break;

        case "success": // After update of HTML DOM based on ajax response..
        	$('#panelSendSmsOtp').css("display", "inherit");
            break;
    }
}

function closeLoginPopup() {
//	$('#closeLoginPopup').click();
	location.reload();
}

function reloadPage() {
	location.reload();
}

function logginUser() {
	var login = $('#loginPopup').val();
	var password = $('#passwordPopup').val();
	
	$('#formHeader\\:login').val(login);
	$('#formHeader\\:password').val(password);
	
	$('#formHeader\\:enter_map').click();
}

function recoverPass() {
	var email = $('#loginPopupEmailRecover').val();
	
	$('#formHeader\\:emailForRecover').val(email);
	
	$('#formHeader\\recoverBtn').click();
}

$(document).ready(function () {
//	$("#formContact input").keypress(function(event) {
//	    if (event.keyCode == 13) {
//	        return false;
//	    }
//	});
	
//	$('#labelHeadHistorico').click(function() {
//		if($('#headHistorico').prop("checked")) {
//			$(this).closest('li').css('background-color', 'transparent');
//		} else {
//			$(this).closest('li').css('background-color', '#71a51d');
//		}
//	});
	
	
	$("#loginPopup").keypress(function(event){
		if(event.keyCode == 13){
	        $(this).closest('.form-group').find('.contact-button').click();
	    }
	});
	
	$("#passwordPopup").keypress(function(event){
	    if(event.keyCode == 13){
	        $(this).closest('.form-group').find('.contact-button').click();
	    }
	});
});

function inputFile() {
	$('#idTracking').val($('#idTrackingHidden').val());
    $("#archivoContact").click(); //simulamos pulsacion del boton input file y mandamos el form para carga rel doc
}

function postFilesData1() {
	$("#uploadDocument").submit();
}

function downloadFile(index) {
	$('#contactListRepeat\\:' + index + '\\:commandDownloadFile').click();
}

function downloadFileManager(index) {
	$('#contactListRepeat\\:' + index + '\\:commandDownloadFileManager').click();
}

function downloadFileRecentMessage() {
	$('#commandDownloadFileRecentMessage').click();
}