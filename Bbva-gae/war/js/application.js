//Maps
var geocoder;
var map;
var markersArray = [];
// Token
var calendarToken = null;
var jEvent = [];
var jEventCalendar;

/*
 * comprobamos que tengamos token, si lo tenemos, no lo volvemos a pedir.
 *
 * */
function oneAuth(){

	if(calendarToken == null){
		auth();
	} else {
		return;
	}

}

function auth() {
	var config = {
		'client_id' : '785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com',
		'scope' : 'https://www.googleapis.com/auth/calendar'
	};
	gapi.auth.authorize(config, function() {
		console.log('login complete');
		console.log(gapi.auth.getToken());
		calendarToken = gapi.auth.getToken();
	});
}

/*
$(document).ready(function() {

});
*/

// function loadGapi() {
//
// // Set the API key
// gapi.client.setApiKey('AIzaSyBnkjKWRpoH56-ldf7vSVEb2JreDZdab6M');
// // Set: name of service, version and callback function
// gapi.client.load('evento', 'v5', getEvents);
//
// }

function getEvents() {
	gapi.client.setApiKey('AIzaSyBnkjKWRpoH56-ldf7vSVEb2JreDZdab6M');
	var apiUrl = "https://sopragroupux.appspot.com/_ah/api/evento/v5/event";
	$.ajax({
		url : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		type : "GET",
		success : function(data) {
			console.log('Lista Eventos: Conseguido correctamente');
			console.log(data);
			for ( var j in data.items) {

				for ( var i in data.items[j]) {
					markersArray[i] = data.items[j].address;
					console.log(markersArray[i].toString());
					codeAddresses(markersArray[i].toString());
					break;
				}
				console.log(j);
			}

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

	if (document.getElementById("idEvent").value == "") {
		var idEvent = Math.floor(2001 + Math.random() * 2000);
	} else {
		var idEvent = document.getElementById("idEvent").value;
	}
	var host = document.getElementById("host").value;

	var street = document.getElementById("street").value;
	var zipcode = document.getElementById("zipcode").value;
	var city = document.getElementById("city").value;
	var country = document.getElementById("country").value;

	var address = [ street, zipcode, city, country ];
	var addressMaps = street + ', ' + zipcode + ', ' + city + ', ' + country;

	var audienceOne = document.getElementById("audience").value;
	var audience = [ audienceOne ];

	var tagsOne = document.getElementById("tags").value;
	var tags = [ tagsOne ];

	var title = document.getElementById("title").value;
	var dateStart = document.getElementById("dateStart").value;
	var dateEnd = document.getElementById("dateEnd").value;
	var description = document.getElementById("description").value;
	var urlEvent = document.getElementById("urlEvent").value;
	var urlImg = document.getElementById("urlImg").value;
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
		"name" : "id",
		"value" : idEvent
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
	codeAddresses(addressMaps);
	console.log(addressMaps);
	return saveEvent(jsonString);
}

/*
 * Function to save event. Requires jSON object
 */
function saveEvent(jEvent, idEvent) {

	var apiUrl = "https://sopragroupux.appspot.com/_ah/api/evento/v5/event";
	$.ajax({
		url : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		data : jEvent,
		type : "POST",
		success : function() {
			console.log("success");
			$("#resultjs").html('Evento creado correctamente.');
			// similar behavior as clicking on a link
			createEventCalendar(calendarToken, idEvent);

		},
		error : function(xhr, ajaxOptions, thrownError) {
			console.error("Event list error: " + xhr.status);
		}
	});

}


function deleteEvent(id) {
	gapi.client.setApiKey('AIzaSyBnkjKWRpoH56-ldf7vSVEb2JreDZdab6M');
	var apiUrl = "https://sopragroupux.appspot.com/_ah/api/evento/v5/event/"+id;
	$.ajax({
		url : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		type : "DELETE",
		success : function(data) {
			console.log('Evento Borrado con id:'+id);
			console.log(data);
		},
		error : function(xhr, ajaxOptions, thrownError) {
			console.error("Event list error: " + xhr.status);
		}
	});
}