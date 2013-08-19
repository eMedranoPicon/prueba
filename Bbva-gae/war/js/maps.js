//Maps
var geocoder;
var map;
var markersArray = [];

// plot initial point using geocode instead of coordinates (works just fine)

function initialize() 
{
		  // Handler for .ready() called.
		console.log('initialize  maps');
		
	    var mapOptions = {
	      center: new google.maps.LatLng(40.397, -3.644),
	      zoom: 8,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    var map = new google.maps.Map(document.getElementById("map-canvas"),
	        mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
	 
	




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
             console.log(results);	
             cleanAddress();
             var address_components = results[0].address_components;
             
             var components={}; 
             jQuery.each(address_components, function(k,v1) {jQuery.each(v1.types, function(k2, v2){components[v2]=v1.long_name});});
             
             console.log(components);
             
             if (!(typeof components.street_number === 'undefined')) {
            	//address  number
            	 localStorage.setItem('maps_stnumber', components.street_number);
              }
             
             if (!(typeof components.route === 'undefined')) {
             	//address  number
             	 localStorage.setItem('maps_stname', components.route);
               }
             
             if (!(typeof components.locality === 'undefined')) {
            	 //ciudad
              	 localStorage.setItem('maps_city', components.locality);
                }
             
             if (!(typeof components.country === 'undefined')) {
            	 //ciudad
              	 localStorage.setItem('maps_country', components.country);
                }
             
             if (!(typeof components.postal_code === 'undefined')) {
            	 //ciudad
              	 localStorage.setItem('maps_zipcode', components.postal_code);
                }
             
             
             
             //lat  
              localStorage.setItem('maps_latitude', results[0].geometry.location.mb);	
              //long  
              localStorage.setItem('maps_longitude', results[0].geometry.location.nb);
              //complete address
              localStorage.setItem('maps_completeaddress', results[0].formatted_address);
              //centerMap
              localStorage.setItem('maps_centro', results[0].formatted_address);
              
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

function cleanAddress(){	
	localStorage.setItem('maps_stnumber',"");
	localStorage.setItem('maps_stname',"");
	localStorage.setItem('maps_city',"");
	localStorage.setItem('maps_country',"");
	localStorage.setItem('maps_zipcode',"");
	localStorage.setItem('maps_centro',"");
	
}
