
function EventsMapListController($scope,$http,$rootScope,$location)
{
		console.log(' controller : PlaceMapList');

		$rootScope.titlePageText3 = $location.path();

		$scope.myMarkers = [];
	    $scope.latitud = 0;
	    $scope.longitud = 0;
	    var LATITUDE_DEFAULT = 40.416949;
	    var LONGITUDE_DEFAULT =  -3.703347;

	    $scope.showError = false;
	    $scope.textError = "";
	    $scope.is_backend_ready = false;
	    $scope.textTitle = "Listado de Lugares de Interes";

	    var pinColor = "0066AE";
	    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
	        new google.maps.Size(21, 34),
	        new google.maps.Point(0,0),
	        new google.maps.Point(10, 34));
	    var bbvaIcon = {url: '/img/bbva-icon.png',
	            size: new google.maps.Size(20, 32),
	            origin: new google.maps.Point(0,0),
	            scaledSize:new google.maps.Size(20, 32),
	            anchor: new google.maps.Point(10, 32)};
	    /*var bbvaShadow = {url: 'https://developers.google.com/maps/documentation/javascript/examples/images/beachflag.png',
	            size: new google.maps.Size(20, 32),
	            origin: new google.maps.Point(0,0),
	            anchor: new google.maps.Point(0, 32)};*/

	    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
	        new google.maps.Size(40, 37),
	        new google.maps.Point(0, 0),
	        new google.maps.Point(12, 35));

	    var ll = new google.maps.LatLng(LATITUDE_DEFAULT, LONGITUDE_DEFAULT);

	    $scope.mapOptions = {
	        center: ll,
	        zoom: 6,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };


	    //Markers should be added after map is loaded
	    $scope.onMapIdle = function()
	    {
	       if ($scope.myMarkers === undefined)
	        {
	            var marker = new google.maps.Marker({
	                map: $scope.myMap,
	                position: ll
	            });
	            $scope.myMarkers = [marker, ];
	        }

	        //hace que se ejecuten los watch
	        //$scope.$digest();
	    };


	    function addMarker(pos)
	    {
	      $scope.myMarkers.push(new google.maps.Marker({
	          map : $scope.myMap,
	          position : pos
	      }));
	    };

    function addMarkerComplete(pos, title)
    {
      $scope.myMarkers.push(new google.maps.Marker({
          map : $scope.myMap,
          position : pos,
          title : title,
          icon: bbvaIcon,
          shadow: pinShadow
      }));
    };


    //$scope.myMarkers.splice(0, $scope.myMarkers.length);
    function removeAllMarkers()
    {
      angular.forEach($scope.myMarkers, function(marker) {
        marker.setMap(null);
      });
    }

    //$http.get('https://sopragroupux.appspot.com/_ah/api/place/v1/place/').success(function(data)
    $http.get('https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/').success(function(data)
    {
        $scope.showError = false;
        $scope.textError = "";
        $scope.is_backend_ready = true;
        $scope.places = data.items;

        for ( p in  $scope.places) {
        	latlong = new google.maps.LatLng($scope.places[p].latitude, $scope.places[p].longitud);
        	addMarkerComplete(latlong , $scope.places[p].fullAddress );
        }

      }).error(function(data, status)
      {
        $scope.textError = "Error al cargar los datos. Por favor, intentalo más tarde";
        $scope.is_backend_ready = false;
        $scope.showError = true;
    });



}


