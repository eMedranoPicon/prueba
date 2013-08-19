// Token
var calendarToken;
var jEvent = [];
var jEventCalendar;


function auth() {
	var config = {
		'client_id' : '785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com',
		'scope' : 'https://www.googleapis.com/auth/calendar',
		'immediate' : true
	};
	gapi.auth.authorize(config, function(data) {
		console.log('login complete');
		var tokenText_auto = data.token_type + ' ' + data.access_token;
		localStorage.setItem('calendarToken_local', tokenText_auto);		
	});
	gapi.client.setApiKey('AIzaSyBXuLdZ43wnWNuBltblkukaj97WDfArpfE');

}

function loadGapi() {
	// Set the API key
	gapi.client.setApiKey('AIzaSyBXuLdZ43wnWNuBltblkukaj97WDfArpfE');

}

function getEvents() {
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
function jEvenBuilder() {	
	// AddressDetails -  Point location a retrieve lat and long.
	previewMap();	
	//timeout to wait for response
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
		//address details
		var completeAddress = localStorage.getItem('maps_completeaddress');		
		var lat = localStorage.getItem('maps_latitude');
		var long = localStorage.getItem('maps_longitude');		
		var address = [completeAddress,lat,long];
		
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
		} ];

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
			console.log("success -> creating calendar in the background");
			//autorizando la peticion
			auth();			
			$('#confirmaEvento').modal('show');
			//creacion evento background
			localStorage.setItem('calendarId', data.id);
			//esperando respuesta token
			setTimeout(function() {
				gapi.client.load('calendar', 'v3',createEventCalendar);
			}, 700);
			
					
			

		},
		error : function(xhr, ajaxOptions, thrownError) {
			console.error("Event list error: " + xhr.status);
		}
	});

}
/*
 * Comprobacio si es guardado o update
 */
function saveOrUpdate() {

	if (document.getElementById("idEvent").value == "") {
		jEvenBuilder();
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
	//
});