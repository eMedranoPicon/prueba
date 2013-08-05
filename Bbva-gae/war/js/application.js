//Maps
var geocoder;
var map;
var markersArray = [];

$( document ).ready(function() {
	
});

function loadGapi() {
	
	// Set the API key
	gapi.client.setApiKey('AIzaSyBnkjKWRpoH56-ldf7vSVEb2JreDZdab6M');
	// Set: name of service, version and callback function
	gapi.client.load('evento', 'v5', getEvents);

}

function getEvents() {
	
	var req = gapi.client.evento.listEvent();
	req.execute(function(data) {
		console.log('Events List: Conseguido correctamente');
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
	});
}
// plot initial point using geocode instead of coordinates (works just fine)
function initialize() {
	geocoder = new google.maps.Geocoder();
	latlang = geocoder.geocode({
		'address' : 'Segovia'
	}, function(results, status) { // use latlang to enter city instead of
		// coordinates
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			marker = new google.maps.Marker({
				map : map,
				position : results[0].geometry.location
			});
			markersArray.push(marker);
		} else {
			alert("Geocode was not successful for the following reason: "
					+ status);
		}
	});
	var myOptions = {
		center : latlang,
		zoom : 6,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		navigationControlOptions : {
			style : google.maps.NavigationControlStyle.SMALL
		}
	};
	map = new google.maps.Map(document.getElementById("map-canvas-front"),
			myOptions);
}

function codeAddresses(address) {
	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			marker = new google.maps.Marker({
				map : map,
				position : results[0].geometry.location
			});
			// markersArray.push(marker);
		} else {
			alert("Geocode was not successful for the following reason: "
					+ status);
		}
	});
}
google.maps.event.addDomListener(window, 'load', initialize);


function noenter(e) {
    e = e || window.event;
    var key = e.keyCode || e.charCode;
    return key !== 13; 
}


/* Funcion de prueba para crear eventos */
function jEvenBuilder(){
	
	// var id = document.getElementById("idEvent");
	
	var id = Math.floor(2001 + Math.random()*2000);
	
	var street = document.getElementById("street").value;
	var zipcode = document.getElementById("zipcode").value;
	var city = document.getElementById("city").value;
	var country = document.getElementById("country").value;
	
	var address = [street,zipcode,city,country];
	
	var audienceOne = document.getElementById("audience").value;
	var audience = [audienceOne];
	
	var tagsOne = document.getElementById("tags").value;
	var tags = [tagsOne];
	
	var title = document.getElementById("title").value;
	var host = "dummy host"; // debería crear user.getUserid();
	var dateStart = document.getElementById("dateStart").value;
	var dateEnd = document.getElementById("dateEnd").value;
	var description = document.getElementById("description").value;
	var urlEvent = document.getElementById("urlEvent").value;
	var urlImg = document.getElementById("urlImg").value;
	var jEvent = [{"name":"address", "value": address}, {"name":"audience", "value": audience}, {"name":"tags", "value": tags},{"name":"title", "value": title},{"name":"host", "value": host},{"name":"address", "value": address},{"name":"dateStart", "value": dateStart},{"name":"dateEnd", "value": dateEnd},{"name":"description", "value": description},{"name":"id", "value": id},{"name":"urlImg", "value": urlImg},{"name":"urlEvent", "value": urlEvent}];	

	var options = {};
	for (var i=0; i < jEvent.length; i++){
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
function saveEvent(jEvent){
	 /* stop form from submitting normally */
	  event.preventDefault();	  
	   
	var apiUrl = "https://sopragroupux.appspot.com/_ah/api/evento/v5/event";
	$.ajax({
		url : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		data:jEvent,
		type : "POST",
		success: function(){
	          console.log("success");
	           $("#resultjs").html('submitted successfully');
	        // similar behavior as clicking on a link
	        createEventCalendar(calendarToken,jEvent);
	        window.location.href = "/event-list.jsp";
	        
	      },
		error : function(xhr, ajaxOptions, thrownError) {
			console.error("Event list error: " + xhr.status);
		}
	});
	
	
		
}

var calendarToken;

function createEventCalendar(calendarToken) {
	var tokenText = calendarToken.token_type+' '+calendarToken.access_token;
	var apiUrl = "/calendar/v3/calendars/72o4s6adl0uhbebjssl4dpraeo@group.calendar.google.com/events?sendNotifications=false&key=785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com";
	
    
	args = {
		path : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		body : resource,
		headers : {'Authorization':tokenText},
		method : "POST",
		callback:function(resp) 
		{ 
			console.log(resp); 
		}
			
	}
	gapi.client.request(args);

}

function readCalendar(token) {

	var apiUrl = "/calendar/v3/calendars/72o4s6adl0uhbebjssl4dpraeo@group.calendar.google.com/events?key=785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com";
	
    var tokenText = token.token_type+' '+token.access_token;
	args = {
		path : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		headers : {'Authorization':tokenText},
		method : "GET",
		callback:function(resp) 
		{ 
			console.log(resp); 
		}
			
	}
	gapi.client.request(args);

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

