// Token
var calendarToken;
var jEvent = [];
var jEventCalendar;

function loadGapi() {
	// Set the API key
	gapi.client.setApiKey('AIzaSyBXuLdZ43wnWNuBltblkukaj97WDfArpfE');

}

function getEvents() {
	gapi.client.evento.listEvent.execute(function(resp) {
		console.log('cargado desde gapi');
		console.log(resp);
	});

	var apiUrl = "https://sopragroupux.appspot.com/_ah/api/evento/v5/event";
	$.ajax({
		url : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		type : "GET",
		success : function(data) {
			console.log('Lista Eventos: Conseguido correctamente');
			console.log(data);
			// Haced lo que quieras con el loadEvent

		},
		error : function(xhr, ajaxOptions, thrownError) {
			console.error("Event list error: " + xhr.status);
		}
	});
}

function noenter(e) {
	e = e || window.event;
	var key = e.keyCode || e.charCode;
	return key !== 13;
}

/* Funcion de prueba para crear eventos */
function jEventBuilder(idCalendar) {
	// AddressDetails - Point location a retrieve lat and long.
	previewMap();
	// timeout to wait for response
	setTimeout(function() {
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
		console.log(street);
		var zipcode = localStorage.getItem('maps_zipcode');
		if (zipcode == 'undefined') {
			zipcode = "";
		}
		console.log(zipcode);
		var city = localStorage.getItem('maps_city');
		if (city == 'undefined') {
			city = "";
		}
		console.log(city);
		var country = localStorage.getItem('maps_country');
		if (country == 'undefined') {
			country = "";
		}
		console.log(country);

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
	}, 500);

}

/*
 * Function to save event. Requires jSON object
 */
function saveEvent(jEvent) {

	var apiUrl = "https://sopragroupux.appspot.com/_ah/api/evento/v5/event";
	$.ajax({
		url : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		data : jEvent,
		type : "POST",
		success : function(data) {
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
		createEventCalendar();
	} else {
		console.log('Requiere Objec Json and Id');
	}

}

/**
 * Funcion para borrar evento sin usar Angular
 */
function deleteEvent_notused(id) {
	gapi.client.setApiKey('AIzaSyBXuLdZ43wnWNuBltblkukaj97WDfArpfE');
	var apiUrl = "https://sopragroupux.appspot.com/_ah/api/evento/v5/event/"
			+ id;
	$.ajax({
		url : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		type : "DELETE",
		success : function(data) {
			console.log('Evento Borrado con id:' + id);
			console.log(data);
		},
		error : function(xhr, ajaxOptions, thrownError) {
			console.error("Event list error: " + xhr.status);
		}
	});
}

/* Load al final */
$(document).ready(function() {

});