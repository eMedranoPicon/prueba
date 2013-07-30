// Maps
var geocoder;
var map;
var markersArray = [];

var apiUrl = "https://sopragroupux.appspot.com/_ah/api/eventendpoint/v1/event";
$.ajax({
	url : apiUrl,
	dataType : 'json',
	contentType : 'application/json',
	type : "GET",
	success : function(data) {
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

function loadGapi() {
	// Set the API key
	gapi.client.setApiKey('AIzaSyAtZxrypY61jER7FI4O25BEt2-nTxNX0UE');
	// Set: name of service, version and callback function
	gapi.client.load('event', 'v1', getEvents);
}

function getEvents() {
	var req = gapi.client.event.listEvent();
	req.execute(function(data) {
		showList(data);
	});
}
// plot initial point using geocode instead of coordinates (works just fine)
function initialize() {
	geocoder = new google.maps.Geocoder();
	latlang = geocoder.geocode({
		'address' : 'Valencia'
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