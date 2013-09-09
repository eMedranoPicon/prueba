// Token
var calendarToken;
var jEvent = [];
var jEventCalendar;

/* Funcion de prueba para crear eventos */
function jEventBuilder(idCalendar,idCalSequence) {	
	
	// timeout to wait for response
		var idEvent = document.getElementById("idEvent").value;

		var host = document.getElementById("host").value;

		var audience = document.getElementById("audience").value;

		var tags = document.getElementById("tags").value;

		var title = document.getElementById("title").value;
		var dateStart = document.getElementById("dateStart").value;
		var dateEnd = document.getElementById("dateEnd").value;
		var description = document.getElementById("description").value;
		var urlEvent = document.getElementById("urlEvent").value;
		var urlImg = document.getElementById("urlImg").value;

		// address details
		var street = localStorage.getItem('maps_stname') + ' '
				+ localStorage.getItem('maps_stnumber');
		if (street == 'undefined') {
			street = "";
		}
		var zipcode = localStorage.getItem('maps_zipcode');
		if (zipcode == 'undefined') {
			zipcode = "";
		}
		var city = localStorage.getItem('maps_city');
		if (city == 'undefined') {
			city = "";
		}
		var country = localStorage.getItem('maps_country');
		if (country == 'undefined') {
			country = "";
		}

		var completeAddress = localStorage.getItem('maps_completeaddress');
		var lat = localStorage.getItem('maps_latitude');
		var long = localStorage.getItem('maps_longitude');

		// formatted.
		var address = [ street, zipcode, city, country, completeAddress, lat,
				long ];

		jEvent = [ {
			"name" : "audience",
			"value" : audience
		}, {
			"name" : "tags",
			"value" : tags
		}, {
			"name" : "title",
			"value" : title
		}, {
			"name" : "host",
			"value" : host
		}, {
			"name" : "address",
			"value" : address
		}, {
			"name" : "dateStart",
			"value" : dateStart
		}, {
			"name" : "dateEnd",
			"value" : dateEnd
		}, {
			"name" : "description",
			"value" : description
		}, {
			"name" : "urlImg",
			"value" : urlImg
		}, {
			"name" : "urlEvent",
			"value" : urlEvent
		},{
			"name" : "idCalendar",
			"value" : idCalendar
		},{
			"name" : "idCalSequence",
			"value" : idCalSequence
		}];

		var options = {};
		for ( var i = 0; i < jEvent.length; i++) {
			var key = jEvent[i].name;
			var val = jEvent[i].value;
			options[key] = val;
		}
		var jsonString = JSON.stringify(options);
		console.log(jsonString);
		return saveEvent(jsonString);
}

/*
 * Function to save event. Requires jSON object
 */
function saveEvent(jEvent) {     
	console.log('SaveEvent');
	var apiUrl = "https://sopragroupux.appspot.com/_ah/api/evento/v5/event";
	$.ajax({
		url : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		data : jEvent,
		type : "POST",
		success : function(data) {
			console.log('Evento creado correctamente');
			$('#confirmaEvento').modal('show');
		},
		error : function(xhr, ajaxOptions, thrownError) {
			console.error("Event list error: " + xhr.status);
		}
	});

}
/*
 * Comprobacio si es guardado o update
 */
function insertEvent() {

	if (document.getElementById("idEvent").value == "") {
		// AddressDetails - Point location a retrieve lat and long.
		previewMap();
		createEventCalendar();		
	} else {
		console.log('Requiere Object Json and Id');
	}

}

/* Load al final */
$(document).ready(function() {

});

function noenter(e) {
	e = e || window.event;
	var key = e.keyCode || e.charCode;
	return key !== 13;
}