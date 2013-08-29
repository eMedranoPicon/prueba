//Maps
var geocoder;
var map;
var markersArray = [];
var markersArrayLat = [];
var markersArrayLong = [];
var markersArrayAddress = [];
var LATITUDE_DEFAULT = 40;
var LONGITUDE_DEFAULT = -3;

// plot initial point using geocode instead of coordinates (works just fine)
function initialize() {
	geocoder = new google.maps.Geocoder();
	// var myLatlngIni = new
	// google.maps.LatLng(localStorage.getItem('maps_latitude'),localStorage.getItem('maps_longitude'));

	// Centrar Espa�a
	var myLatlngIni = new google.maps.LatLng(LATITUDE_DEFAULT,
			LONGITUDE_DEFAULT);
	var myOptions = {
		center : myLatlngIni,
		zoom : 6,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		navigationControlOptions : {
			style : google.maps.NavigationControlStyle.SMALL
		}
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
	marker = new google.maps.Marker({
		map : map,
		position : myLatlngIni
	});
	marker.setVisible(false);
}

google.maps.event.addDomListener(window, 'load', initialize);

function previewMap() {
	console.log('entrado preview');
	var street = document.getElementById("street").value;
	var zipcode = document.getElementById("zipcode").value;
	var city = document.getElementById("city").value;
	var country = document.getElementById("country").value;

	var address = street + ', ' + zipcode + ', ' + city + ', ' + country;
	var result = getLatLong(address);
	console.log(result);

}

function newEventMap() {
	console.log('Limpiado Mapa');
	var mapOptions = {
		center : new google.maps.LatLng(LATITUDE_DEFAULT, LONGITUDE_DEFAULT),
		zoom : 8,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	map.setCenter(mapOptions);
	// map = new google.maps.Map(document.getElementById("map-canvas"),
	// mapOptions);

}

function mapEvents() {

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
					markersArrayLat[i] = data.items[j].address[5];
					markersArrayLong[i] = data.items[j].address[6];
					markersArrayAddress[i] = data.items[j].address[4];
					var myLatlng = new google.maps.LatLng(markersArrayLat[i],
							markersArrayLong[i]);
					console
							.log(markersArrayLat[i] + ', '
									+ markersArrayLong[i]);
					console.log(markersArrayAddress[i]);

					marker = new google.maps.Marker({
						map : map,
						title : markersArrayAddress[i],
						position : myLatlng
					});
					map.setCenter(myLatlng);
					break;
				}
				// console.log(j);
			}

		},
		error : function(xhr, ajaxOptions, thrownError) {
			console.error("Event list error: " + xhr.status);
		}
	});
}

function getLatLong(address) {

	geocoder
			.geocode(
					{
						'address' : address
					},
					function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							console.log(results);
							cleanAddress();
							/*
							 * Magia Json
							 */
							var address_components = results[0].address_components;
							var components = {};
							jQuery.each(address_components, function(k, v1) {
								jQuery.each(v1.types, function(k2, v2) {
									components[v2] = v1.long_name
								});
							});
							/*
							 * Fin Magia
							 */
							console.log(components);

							if (!(typeof components.street_number === 'undefined')) {
								// address number
								localStorage.setItem('maps_stnumber',
										components.street_number);
							}

							if (!(typeof components.route === 'undefined')) {
								// address name
								localStorage.setItem('maps_stname',
										components.route);
							}

							if (!(typeof components.locality === 'undefined')) {
								// ciudad
								localStorage.setItem('maps_city',
										components.locality);
							}

							if (!(typeof components.country === 'undefined')) {
								// ciudad
								localStorage.setItem('maps_country',
										components.country);
							}

							if (!(typeof components.postal_code === 'undefined')) {
								// ciudad
								localStorage.setItem('maps_zipcode',
										components.postal_code);
							}

							// lat
							localStorage.setItem('maps_latitude',
									//results[0].geometry.location.mb);
									results[0].geometry.location.lat());
							// long
							localStorage.setItem('maps_longitude',
									//results[0].geometry.location.nb);
									results[0].geometry.location.lng());
							// complete address
							localStorage.setItem('maps_completeaddress',
									results[0].formatted_address);
							// centerMap
							localStorage.setItem('maps_centro',
									results[0].formatted_address);

							map.setCenter(results[0].geometry.location);
							marker.setMap(null);
							marker.setVisible(true);
							marker = new google.maps.Marker({
								map : map,
								position : results[0].geometry.location,
								title : results[0].formatted_address
							});

						} else {
							alert("Geocode was not successful for the following reason: "
									+ status);
						}

					});

}

function cleanAddress() {
	localStorage.setItem('maps_stnumber', "");
	localStorage.setItem('maps_stname', "");
	localStorage.setItem('maps_city', "");
	localStorage.setItem('maps_country', "");
	localStorage.setItem('maps_zipcode', "");
	localStorage.setItem('maps_centro', "");

}

/* Load al final */
$(document).ready(function() {
	// auth();
});

$(window).bind("load", function() {
	// funciona
	// previewMap();
});
