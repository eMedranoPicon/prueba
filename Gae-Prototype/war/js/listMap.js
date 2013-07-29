var geocoder;
var map;
var markersArray = [];

//plot initial point using geocode instead of coordinates (works just fine)
  function initialize() {
    geocoder = new google.maps.Geocoder();
     latlang = geocoder.geocode( { 'address': 'Valencia'}, function(results, status) { //use latlang to enter city instead of coordinates 
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
                });
            markersArray.push(marker);

            }
            else{
            alert("Geocode was not successful for the following reason: " + status);
            }
        });
    var myOptions = {
        center: latlang, zoom: 6, mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        }
    };
     map = new google.maps.Map(document.getElementById("map-canvas-front"),
        myOptions);
     plotMarkers();
  }

///////////////////////////////////////////////////////////
//Everything below this line is for attempting to plot the markers

  var locationsArray = ['Sevilla','Barcelona', 'Madrid'];

  function plotMarkers(){
for(var i = 0; i < locationsArray.length; i++){

  codeAddresses(locationsArray[i]);

}
  }

  function codeAddresses(address){
    geocoder.geocode( { 'address': address}, function(results, status) { 
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
                });
            //markersArray.push(marker); 
            }
            else{
            alert("Geocode was not successful for the following reason: " + status);
            }
  });
  }

      google.maps.event.addDomListener(window, 'load', initialize);