/**
* PlaceEditController
* Controlador de edicion de Places
*/

function PlaceEditController($scope, $http, $routeParams, $rootScope, sharedService)
{
	console.log(' controller : PlaceEditController');
	
	$scope.showError = false;
    $scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Editar lugar de interes";
    $scope.showEditLayout = false;

    if (angular.isUndefined($scope.places))
    {
        console.log('recargar el scope');
        //$http.get('https://sopragroupux.appspot.com/_ah/api/place/v1/place/').success(function(data)
        $http.get('https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/').success(function(data)
        {
            $scope.showError = false;
            $scope.textError = "";
            $scope.is_backend_ready = true;
            $scope.places = data.items;
            getPlace($routeParams.id);

        }).error(function(data, status)
        {
              $scope.textError = "Error al cargar los datos. Por favor, intentalo mas tarde";
              $scope.is_backend_ready = false;
              $scope.showError = true;
        });
    }
    else
    {
        console.log('llamada a getPlace');
        getPlace($routeParams.id);
    }


    function getPlace(idPlace)
    {

        $scope.indexPlace = findIndexById(idPlace,$scope.places);

        if ($scope.indexPlace != -1)
        {
            $scope.place = $scope.places[$scope.indexPlace];
            sharedService.prepForBroadcast($scope.place.latitude, $scope.place.longitude,$scope.place.street, $scope.place.zipcode, $scope.place.city, $scope.place.country);
        }
        else {
            $scope.showError = true;
            $scope.textError = "Lugar de Interes" + idPlace + "no encontrado";
        }
    }

    $scope.updatePlace = function()
    {

    	console.log('EventPlaceController :'+$scope.place)
    	
		$http.put('https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/', $scope.place).success(function()
        //$http.put('https://sopragroupux.appspot.com/_ah/api/place/v1/place', $scope.place).success(function()
        {
            console.log('Guardando');
            $('#confirmaPlace').modal('show');

        }).error(function(data, status)
        {
              $scope.textError = "Error al insertar los datos. Por favor, intentelo mas tarde";
              $scope.showError = true;
        });
    }
    
    $scope.handleClick = function(lat,lon,calle,cp,ciudad,pais)
    {
        sharedService.prepForBroadcast(lat,lon,calle,cp,ciudad,pais);
    };


    $scope.$on('handleBroadcast', function()
    {
        $scope.latitud = sharedService.latitud;
        $scope.longitud = sharedService.longitud;
        $scope.calleBdc = sharedService.calleBdc;
        $scope.cpBdc = sharedService.cpBdc;
        $scope.ciudadBdc = sharedService.ciudadBdc;
        $scope.paisBdc = sharedService.paisBdc;

        console.log('sharedService en PlaceEditController datos: '+ $scope.latitud + ' ' + $scope.longitud + ' calle: ' + $scope.calleBdc+ ' cpBdc: ' + $scope.cpBdc+ ' ciudadBdc: ' + $scope.ciudadBdc+ ' paisBdc: ' + $scope.paisBdc);
    });
    
    $scope.updatePlaceLocation = function()
    {
      
    	var address = $scope.place.street + "," +$scope.place.zipcode+","+$scope.place.city+","+$scope.place.country;      

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
						localStorage.setItem('scope_maps_stnumber',
								components.street_number);
					}

					if (!(typeof components.route === 'undefined')) {
						// address number
						localStorage.setItem('scope_maps_stname',
								components.route);
					}
					
					$scope.place.street = localStorage.getItem('scope_maps_stname') + ' '
					+ localStorage.getItem('scope_maps_stnumber');

					if (!(typeof components.locality === 'undefined')) {
						// ciudad
						$scope.place.city = components.locality;
					}

					if (!(typeof components.country === 'undefined')) {
						// ciudad
						$scope.place.country = components.country;
					}

					if (!(typeof components.postal_code === 'undefined')) {
						// zipcode
						$scope.place.zipcode = components.postal_code;
					}

					// lat
					$scope.place.latitude =	results[0].geometry.location.lat();
					// long
					$scope.place.longitud = results[0].geometry.location.lng();
					$scope.place.fullAddress = results[0].formatted_address;
            	                
                  $scope.updatePlace();
              }
              else
              {
                console.log("Geocode was not successful for the following reason: " + status);
                $scope.updatePlace();
              }
          }
        );
    }

}