/**
 * PlaceEditController Controlador de edicion de Places
 */

function PlaceDetailController($scope, $http, $routeParams, $rootScope, $location,mapView) {
	console.log(' controller : PlaceDetailController');
	$scope.URL_API = 'https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/';
	$scope.showError = false;
	$scope.textError = "";
	$scope.is_backend_ready = false
	$scope.showEditLayout = false;
	
	$scope.typePlaceSelect = [ {
		'type' : '',
		'description' : ''
	}, {
		'type' : 'Restaurante',
		'description' : 'Restaurante'
	}, {
		'type' : 'Museo',
		'description' : 'Museo'
	}, {
		'type' : 'Plaza',
		'description' : 'Plaza'
	}, {
		'type' : 'Gimnasio',
		'description' : 'Gimnasio'
	}, {
		'type' : 'Centro Covenciones',
		'description' : 'Centro Convenciones'
	} ];

	if (angular.isUndefined($scope.places)) {
		console.log('recargar el scope');
		$http
				.get($scope.URL_API)
				.success(function(data) {
					$scope.showError = false;
					$scope.textError = "";
					$scope.is_backend_ready = true;
					$scope.places = data.items;
					getPlace($routeParams.id);

				})
				.error(
						function(data, status) {
							$scope.textError = "Error al cargar los datos. Por favor, intentalo mas tarde";
							$scope.is_backend_ready = false;
							$scope.showError = true;
						});
	} else {
		console.log('llamada a getPlace');
		getPlace($routeParams.id);
	}

	function getPlace(idPlace) {

		$scope.indexPlace = findIndexById(idPlace, $scope.places);

		if ($scope.indexPlace != -1) {
			$scope.place = $scope.places[$scope.indexPlace];
			$scope.showDetailLayout = true;	
			//			 
			 mapView.setLat($scope.place.latitude); 
			 //mapView.setLong($scope.place.longitud);
			 
			 
			/* $scope.$on('LongChanged', function(event, x) {
			        $scope.longitud = x;
			    }); */
			 $scope.$on('LatChanged', function(event, y) {
			        $scope.latitude = y;
			    }); 
			 
			 
			///
		} else {
			$scope.showError = true;
			$scope.textError = "Lugar de Interes" + idPlace + "no encontrado";
		}
	}
	
	

}

function PlaceMapHomeController($scope,$http,$rootScope)
{
	console.log(' controller : PlaceMapHomeController');
	$scope.URL_API = 'https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/';
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
        $scope.$digest();
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


function removeAllMarkers()
{
  angular.forEach($scope.myMarkers, function(marker) {
    marker.setMap(null);
  });
}

$http.get($scope.URL_API).success(function(data)
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
    $scope.textError = "Error al cargar los datos. Por favor, intentalo m�s tarde";
    $scope.is_backend_ready = false;
    $scope.showError = true;
});

    
}

function PlaceMapFrontController($scope,$http,$rootScope,mapView)
{
	console.log(' controller : PlaceMapFrontController');
	$scope.URL_API = 'https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/';
    $scope.myMarkers = [];
    var LATITUDE_DEFAULT = 40.42;
    var LONGITUDE_DEFAULT =  -3.7;
    
    $scope.showError = false;
    $scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Listado de Lugares de Interes";
    
    //mapView.setLat($scope.place.latitude); 
	//mapView.setLong($scope.place.longitud);
	 
	 
	/*$scope.$on('LongChanged', function(event, x) {
	        $scope.longitud = x;
	    }); 
	$scope.$on('LatChanged', function(event, y) {
	        $scope.latitude = y;
	    }); */
    
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
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

    var ll = new google.maps.LatLng(LATITUDE_DEFAULT, LONGITUDE_DEFAULT);

    $scope.mapOptions = {
        center: ll,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Markers should be added after map is loaded
    $scope.onMapIdle = function()
    {
       if ($scope.myMarkers === undefined)
        {
            var marker = new google.maps.Marker({
                map: $scope.myMap,
                position: ll,
                icon: bbvaIcon,
                shadow: pinShadow
            });
            $scope.myMarkers = [marker, ];
        }

        //hace que se ejecuten los watch
        $scope.$digest();
    };


    function upDateMap(latLon)
    {
        $scope.myMap.setCenter(latLon);
        removeAllMarkers();
        addMarker(latLon);
        /*Zoom*/
        $scope.myMap.setZoom(16);
    }


    function addMarker(pos)
    {
      $scope.myMarkers.push(new google.maps.Marker({
          map : $scope.myMap,
          position : pos,
          icon: bbvaIcon,
          shadow: pinShadow
      }));
    };


    function removeAllMarkers()
    {
      angular.forEach($scope.myMarkers, function(marker) {
        marker.setMap(null);
      });
    }
      
   /* $scope.$on('LongChanged', function(event, x) {
        $scope.longitud = x; 
    $scope.$on('LatChanged', function(event, y) {
        $scope.latitudeess = y;
    });*/
    
    
    var ladecima  = new google.maps.LatLng($scope.latitude,$scope.longitud);
    //upDateMap(ladecima);
    
    $scope.init = function(lat, long)
    {
    	console.log('ladecima ');
    	console.log(lat+' - '+long);
    };
}

