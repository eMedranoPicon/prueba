// Token
var calendarToken;
var jEvent = [];
var jEventCalendar;


/*
 * comprobamos que tengamos token, si lo tenemos, no lo volvemos a pedir.
 * 
 * */
function onlyOnce(){
	var unavez = localStorage.getItem('calendarToken_local');
	if (unavez==null){
		auth();
	} else{
		return;
	}
}

function auth() {	
	var config = {
		'client_id' : '785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com',
		'scope' : 'https://www.googleapis.com/auth/calendar'
	};
	gapi.auth.authorize(config, function(data) {
		console.log('login complete');	
		var tokenText = data.token_type + ' ' + data.access_token;
		localStorage.setItem('calendarToken_local',tokenText);
		onlyOnce = 'dentro';
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
			//Haced lo que quieras con el loadEvent

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
	
	var audience = document.getElementById("audience").value;

	var tags = document.getElementById("tags").value;

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
			// similar behavior as clicking on a link
			createEventCalendar(idEvent);	

		},
		error : function(xhr, ajaxOptions, thrownError) {
			console.error("Event list error: " + xhr.status);
		}
	});

}
/*
 * Comprobacio si es guardado o update
 */
function saveOrUpdate(){
	
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

/* Load al final*/
$(document).ready(function() {
	//loadGapi();
});