function createEventCalendar(calendarToken, idEvent) {
	var tokenText = calendarToken.token_type + ' ' + calendarToken.access_token;
	var apiUrl = "/calendar/v3/calendars/72o4s6adl0uhbebjssl4dpraeo@group.calendar.google.com/events?sendNotifications=false&key=785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com";

	var host = document.getElementById("host").value;

	var street = document.getElementById("street").value;
	var zipcode = document.getElementById("zipcode").value;
	var city = document.getElementById("city").value;
	var country = document.getElementById("country").value;

	var address = street + ', ' + zipcode + ', ' + city + ', ' + country;

	var title = document.getElementById("title").value;
	var description = document.getElementById("description").value;
	var urlEvent = document.getElementById("urlEvent").value;

	Date
	dateStart = document.getElementById("dateStart").value;
	Date
	dateEnd = document.getElementById("dateEnd").value;

	var dateStartFormatted = ISODateString(dateStart); // prints something like
														// 2009-09-28T19:03:12Z
	var dateEndFormatted = ISODateString(dateEnd);

	jEventCalendar = {
		"summary" : title,
		"location" : address,
		"start" : {
			"dateTime" : dateStartFormatted
		},
		"end" : {
			"dateTime" : dateEndFormatted
		},
		"id" : idEvent,
		"htmlLink" : urlEvent
	};

	args = {
		path : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		body : jEventCalendar,
		headers : {
			'Authorization' : tokenText
		},
		method : "POST",
		callback : function(resp) {
			console.log('Guardado en Google Calendar');
			console.log(resp);
			setTimeout(function() {
				window.location.href = "/backend/events-list.jsp#/events-table-list";
			}, 1000);		    
		}

	}

	gapi.client.request(args);

}

function readCalendar(token) {

	var apiUrl = "/calendar/v3/calendars/72o4s6adl0uhbebjssl4dpraeo@group.calendar.google.com/events?key=785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com";

	var tokenText = token.token_type + ' ' + token.access_token;
	args = {
		path : apiUrl,
		dataType : 'json',
		contentType : 'application/json',
		headers : {
			'Authorization' : tokenText
		},
		method : "GET",
		callback : function(resp) {			
			console.log(resp);
			
		}

	}
	gapi.client.request(args);

}
