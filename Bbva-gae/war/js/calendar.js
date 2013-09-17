function createEventCalendar() {
	// recogemos variables de localstorage
	var CALENDAR_ID='72o4s6adl0uhbebjssl4dpraeo@group.calendar.google.com';
	var tokenText = localStorage.getItem('calendarToken_local');
	var idCalendar = localStorage.getItem('calendarId');

	var host = document.getElementById("host").value;

	// address details
	var address = localStorage.getItem('maps_completeaddress');

	var title = document.getElementById("title").value;
	var description = document.getElementById("description").value;
	var urlEvent = document.getElementById("urlEvent").value;

	String
	dateStart = document.getElementById("dateStart").value;
	String
	dateEnd = document.getElementById("dateEnd").value;

	var dateStartFormatted = ISODateString(dateStart);
	var dateEndFormatted = ISODateString(dateEnd);

	jEventCalendar = {
		"summary" : title,
		"location" : address,
		"start" : {
			"dateTime" : dateStartFormatted
		},
		"end" : {
			"dateTime" : dateEndFormatted
		}
	};

	var request = gapi.client.calendar.events.insert({
		'calendarId' : CALENDAR_ID,
		'resource' : jEventCalendar
	});
	request.execute(function(resp, status) {		
		//Creado en Calendar, conseguido id.
		jEventBuilder(resp.id,resp.sequence);		
		
	});

}

/* use a function for the exact format desired... */
function ISODateString(stringDate) {
	var dateParts = stringDate.split("");
	// troceandolo
	var anno = dateParts.slice(6, 10).join("");
	var mes = dateParts.slice(3, 5).join("");
	mes = mes - 1; // meses son numberos 0-11
	var dia = dateParts.slice(0, 2).join("");
	var hora = dateParts.slice(11, 13).join("");
	var minuto = dateParts.slice(14, 16).join("");
	// new Date(yyyy,mm,dd,hh,mm)
	// dd/mm/yyyy hh:mm
	var d = new Date(anno, mes, dia, hora, minuto);
	function pad(n) {
		return n < 10 ? '0' + n : n
	}
	return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-'
			+ pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':'
			+ pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z'
}

function validateDateRange() {

	String
	dateStart = document.getElementById("dateStart").value;
	String
	dateEnd = document.getElementById("dateEnd").value;

	var dateStartFormatted = ISODateString(dateStart);
	var dateEndFormatted = ISODateString(dateEnd);

	if (dateStartFormatted < dateEndFormatted) {
		// $('#dateEndLabel').removeClass('error').addClass('valid');
		$(":submit").removeAttr("disabled");
	} else {
		// $('#dateEndLabel').removeClass('valida').addClass('error');
		alert('fechas incorrectas');
		$(":submit").attr("disabled", true);
	}

}