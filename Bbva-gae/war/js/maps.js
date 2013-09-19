//Maps
var geocoder;
var map;
var markersArray = [];
var markersArrayLat = [];
var markersArrayLong = [];
var markersArrayAddress = [];
var LATITUDE_DEFAULT = 40;
var LONGITUDE_DEFAULT = -3;
var bbvaIcon = {url: '/img/bbva-icon.png',
        size: new google.maps.Size(20, 32),
        origin: new google.maps.Point(0,0),
        scaledSize:new google.maps.Size(20, 32),
        anchor: new google.maps.Point(10, 32)};    
var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
    new google.maps.Size(40, 37),
    new google.maps.Point(0, 0),
    new google.maps.Point(12, 35));

function initialize() {
	geocoder = new google.maps.Geocoder();
	
	// Centrar Espa�a
	var myLatlngIni = new google.maps.LatLng(LATITUDE_DEFAULT,
			LONGITUDE_DEFAULT);
	var myOptions = {
		center : myLatlngIni,
		zoom : 6,
		mapTypeControl: true,
	    mapTypeControlOptions: {
	      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
	    },
	    zoomControl: true,
	    zoomControlOptions: {
	      style: google.maps.ZoomControlStyle.SMALL
	    },
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map-canvas-event"), myOptions);
	marker = new google.maps.Marker({
		map : map,
		position : myLatlngIni,
        icon: bbvaIcon,
        shadow: pinShadow
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
	/*Zoom*/
	map.setZoom(16);

}

function newEventMap() {
	console.log('Limpiado Mapa');
	var mapOptions = {
		center : new google.maps.LatLng(LATITUDE_DEFAULT, LONGITUDE_DEFAULT),
		zoom : 8,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	map.setCenter(mapOptions);

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
						position : myLatlng,
		                icon: bbvaIcon,
		                shadow: pinShadow
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
								title : results[0].formatted_address,
								icon: bbvaIcon,
				                shadow: pinShadow
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
	mapEvents();
});