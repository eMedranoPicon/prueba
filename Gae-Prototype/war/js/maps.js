
/*
 * Funcion base de Js . Google Maps
 * 
 * ver 0.1 - recoge los campos relativos a la direccion completa, busca en google maps.
 * 
 * PENDIENTE: Pintar los eventos en el Mapa
 */
var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(40, -4);
  var mapOptions = {
    zoom: 6,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  console.log(mapOptions);
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function codeAddress() {
	  var street = document.getElementById('address').value;
	  var zipcode = document.getElementById('zipcode').value;
	  var city = document.getElementById('city').value;
	  var country = document.getElementById('country').value;
	  
	  var fulladdress = street+', '+zipcode+', '+city+', '+country;
	  
	  geocoder.geocode( { 'address': fulladdress}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      map.setCenter(results[0].geometry.location);
	      var marker = new google.maps.Marker({
	          map: map,
	          position: results[0].geometry.location
	      });
	      console.log(results[0].geometry.location);
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}

google.maps.event.addDomListener(window, 'load', initialize);