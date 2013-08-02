//Maps
var geocoder;
var map;
var markersArray = [];

function loadGapi() {
	// Set the API key
	gapi.client.setApiKey('AIzaSyBnkjKWRpoH56-ldf7vSVEb2JreDZdab6M');
	// Set: name of service, version and callback function
	gapi.client.load('evento', 'v2', getEvents);
}

function getEvents() {
	var req = gapi.client.event.listEvent();
	req.execute(function(data) {
		console.log(data);
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


function noenter(e) {
    e = e || window.event;
    var key = e.keyCode || e.charCode;
    return key !== 13; 
}

$(document).ready(function() 
		{
	setTimeout(function() {
		loadGapi();
		});
