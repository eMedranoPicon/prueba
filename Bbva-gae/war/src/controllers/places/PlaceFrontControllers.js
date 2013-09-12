/**
 * PlaceEditController Controlador de edicion de Places
 */

function PlaceDetailController($scope, $http, $routeParams, $rootScope, $location, sharedService) {
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
			 //sharedService.prepForBroadcastLatLong($scope.place.latitude,$scope.place.longitud);
		} else {
			$scope.showError = true;
			$scope.textError = "Lugar de Interes" + idPlace + "no encontrado";
		}
	}

}

function PlaceMapHomeController($scope,$http,$rootScope,sharedService)
{
	console.log(' controller : PlaceMapHomeController');

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

function PlaceMapFrontController($scope,$http,$rootScope,sharedService)
{
		console.log(' controller : PlaceMapFrontController');

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


    //$scope.myMarkers.splice(0, $scope.myMarkers.length);
    function removeAllMarkers()
    {
      angular.forEach($scope.myMarkers, function(marker) {
        marker.setMap(null);
      });
    }


    function calcLatLon(calle,cp,ciudad,pais)
    {
      var address = calle + "," +cp+","+ciudad+","+pais;
      geocoder = new google.maps.Geocoder();

      geocoder.geocode
       (
          {
            'address' : address
          },
          function(results, status)
          {
              if (status == google.maps.GeocoderStatus.OK)
              {
                  console.log('calcLatLon array : ' + results[0].geometry.location + "lat(): "+results[0].geometry.location.lat()+ " lng(): "+results[0].geometry.location.lng());
                  sharedService.latitud = results[0].geometry.location.lat();
                  sharedService.longitud = results[0].geometry.location.lng();
                  $scope.latitud = results[0].geometry.location.lat();
                  $scope.longitud = results[0].geometry.location.lng();
                  upDateMap(results[0].geometry.location)
              }
              else
              {
                console.log("Geocode was not successful for the following reason: " + status);
              }
          }
        );
    }


    $scope.$on('handleBroadcast', function()
    {
    	console.log('LANZADO EVENTO DESDE EL CLICK');
    	
    	$scope.latitud = sharedService.latitud;
        $scope.longitud = sharedService.longitud;
        $scope.calleBdc = sharedService.calleBdc;
        $scope.cpBdc = sharedService.cpBdc;
        $scope.ciudadBdc = sharedService.ciudadBdc;
        $scope.paisBdc = sharedService.paisBdc;
        
        calcLatLon($scope.calleBdc,$scope.cpBdc,$scope.ciudadBdc,$scope.paisBdc);
    });


    $scope.$watch('latitud', function()
    {        
        calcLatLon(sharedService.calleBdc,sharedService.cpBdc,sharedService.ciudadBdc,sharedService.paisBdc);
    });
    
}
