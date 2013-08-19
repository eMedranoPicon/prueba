//Maps
var geocoder;
var map;
var markersArray = [];
var locationPage = window.location;

// plot initial point using geocode instead of coordinates (works just fine)
function initialize() {

	console.log('initialize  maps')
	geocoder = new google.maps.Geocoder();
	latlang = geocoder.geocode({
		'address' : 'Madrid'
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
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
		navigationControlOptions : {
			style : google.maps.NavigationControlStyle.SMALL
		}
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
}

if (locationPage.toString().match("/event-edit/")!=null)
{

}




function codeAddresses(address) {
	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			marker.setMap(null);
			marker = new google.maps.Marker({
				map : map,
				position : results[0].geometry.location
			});
		} else {
			alert("Geocode was not successful for the following reason: "
					+ status);
		}
	});
}



function previewMap() {
	var street = document.getElementById("street").value;
	var zipcode = document.getElementById("zipcode").value;
	var city = document.getElementById("city").value;
	var country = document.getElementById("country").value;

	var address = street + ', ' + zipcode + ', ' + city + ', ' + country;
	var result = getLatLong(address);
	console.log(result);

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

function getLatLong(address){

    geocoder.geocode({'address':address},function(results, status){
            if (status == google.maps.GeocoderStatus.OK) {
               //lat
              localStorage.setItem('maps_latitude', results[0].geometry.location.mb);
              //long
              localStorage.setItem('maps_longitude', results[0].geometry.location.nb);
              //complete address
              localStorage.setItem('maps_completeaddress', results[0].formatted_address);
              map.setCenter(results[0].geometry.location);
              marker.setMap(null);
              marker = new google.maps.Marker({
  				map : map,
  				position : results[0].geometry.location
  			  });

              console.log('Saved in localstorage');

            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }

     });

}
